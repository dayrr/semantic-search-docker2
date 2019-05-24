
$('#geom').prop("disabled", true);
$('#feature').prop("disabled", false);
var queryJSON = '?handle=download&format=SPARQL%2FJSON&submit=Query&view=HTML&query='
var queryGeoJSON = '?handle=download&format=GeoJSON&submit=Query&view=HTML&query='

function loadWKT(ds) {
  let query = host + queryJSON + encodeURIComponent(wktQueries[ds]);
  //$("#wktloading").html('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
  $.getJSON(query, function (result) {

    $.each(result['results']['bindings'], function (index, value) {
      name = value['name']['value'];
      listnames.push(name + ' (' + ds + ')');
      wkt = value['wkt']['value'];
      let f = format.readFeature(value['wkt']['value'], {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      });

      f.set('name', name);
      f.setId(name);
      //f.setStyle(getStyle(item.Heading, item.Length, item.Type));
      switch (ds) {
        case 'tile':
          TileVectorSource.addFeature(f);
          break;
        case 'station':
          StationVectorSource.addFeature(f);
          break;
        case 'region':
          RegionVectorSource.addFeature(f);
          break;
        case 'departement':
          DepartementVectorSource.addFeature(f);
          break;
      }
    });
  });
  // $("#wktloading").html('');
}




$('#btnWKTReset').click(function () {
  FeatureVectorSource.clear();
  mapDraw.addInteraction(draw);
  clickToShow = false;

});




$('#geosearch input:radio').click(function () {
  //draw on the map
  if ($(this).val() === 'geom') {
    $('#geom').prop("disabled", false);
    $('#feature').prop("disabled", true);
    $("#geoviz").modal({ backdrop: false });
    $("#geoviz").draggable({
      handle: ".modal-header"
    });
    setTimeout(function () { mapDraw.updateSize(); }, 1000);
    mapDraw.addInteraction(draw);
  } else {
    $('#geom').prop("disabled", true);
    $('#feature').prop("disabled", false);
    mapDraw.removeInteraction(draw);

  }
});

$('#cboxdatetime').change(function () {
  if ($(this).prop('checked')) {
    $("#dtend").removeAttr("disabled");
    $("#dtstart").removeAttr("disabled");
  }
  else {
    $("#dtend").attr("disabled", "disabled");
    $("#dtstart").attr("disabled", "disabled")
  }

});

$('#cboxgeo').change(function () {
  if ($(this).prop('checked')) {
    $("input[name='geoloc']").removeAttr("disabled");
  }
  else {
    $("input[name='geoloc']").attr("disabled", "disabled");
  }

});

$('#cboxsem').change(function () {
  if ($(this).prop('checked')) {
    $("#btnsem").removeAttr("disabled");
    $("#listsem").removeAttr("disabled");
  }
  else {
    $("#btnsem").attr("disabled", "disabled");
    $("#listsem").attr("disabled", "disabled");
  }
});


$('#layers input:checkbox').click(function () {
  if ($(this).is(':checked'))
    switch ($(this).val()) {
      case 'tile':
        if (TileVectorSource.getFeatures().length === 0)
          loadWKT('tile');
        TileLayer.setVisible(true);
        break;
      case 'station':
        if (StationVectorSource.getFeatures().length === 0)
          loadWKT('station');
        StationLayer.setVisible(true);
        break;
      case 'region':
        if (RegionVectorSource.getFeatures().length === 0)
          loadWKT('region');
        RegionLayer.setVisible(true);
        break;
      case 'departement':
        if (DepartementVectorSource.getFeatures().length === 0)
          loadWKT('departement');
        DepartementLayer.setVisible(true);
        break;
    }
  else
    switch ($(this).val()) {
      case 'tile':
        TileLayer.setVisible(false);
        break;
      case 'station':
        StationLayer.setVisible(false);
        break;
      case 'region':
        RegionLayer.setVisible(false);
        break;
      case 'departement':
        DepartementLayer.setVisible(false);
        break;
    }
});

var table = [];
var tableheader = [];
var json = [];

function loadJSON(num, q, title) {
  $.getJSON(q, function (result) {
    var str = "[";
    var heads = result['head']['vars'];
    var data = result['results']['bindings'];
    var th = [];
    $.each(heads, function (index2, col) {
      th.push({ "title": col, "field": col });
    });
    $.each(data, function (index, row) {
      str = str + "{";
      $.each(heads, function (index2, col) {
        str = str + '"' + col + '":"' + row[col]['value'] + '",';
      });
      str = str.replace(/,\s*$/, "");
      str = str + "},";
    });
    str = str.replace(/,\s*$/, "");
    str = str + ']';
    let t = new Tabulator("#list" + num, {
      data: JSON.parse(str),
      columns: th,
      height: "250px"

    });
    table.push(t);
    tableheader.push(th);
    json.push(str);
    let html = "<h3>" + title + '</h3><div class="submenu"><button type="button"  onclick="downloadCSV(' + num + ')" class="btn btn-success">Export CSV</button><button type="button" class="btn btn-success" data-toggle="modal" data-target="#querydialog" data-query="' + num + '">Open query</button><button type="button" class="btn btn-success" data-toggle="modal" data-target="#ontology" data-onto="' + num + '">View ontology</button></div>';
    $("#title" + num).html(html);
  });
}

var rs = [];
var rslayer;
function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  var items = location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}

//var spatialfilter = "";
//var tempofilter = "";
var prefixesToQuery = "";
var currentQueries = [];

$('#btnSearch').click(function () {
  // alert($('#cboxgeo').prop('checked'));
  let tempofilter = "";
  let intervalfilter = "";
  let instantfilter = "";
  let semanticfilter = "";
  if ($('#cboxdatetime').prop('checked')) {
    tempofilter = '?dt time:inXSDDateTime ?dti. \n FILTER(?dti>="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime) \n';
    intervalfilter = "?timeInterval time:hasBeginning/time:inXSDDateTime ?dti1. \n" +
      " ?timeInterval time:hasEnd/time:inXSDDateTime ?dti2. \n" +
      ' FILTER((?dti1 >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti1<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime) || (?dti2 >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti2<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime)). \n';
    instantfilter = ' FILTER(?dti >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime). \n';
  }
  if ($('#cboxsem').prop('checked')) {

    semanticfilter = "<" + $("#listseml2" + $("#listseml1 option:selected").val() + "  option:selected").val() + ">";
  }
  // alert(intervalfilter);
  let tempoorder = "";
  if ($('#cboxdatetime').prop('checked'))
    tempoorder = " \n ORDER BY (?dti) \n";
  let spatialfilter = "";
  let spatialfilter2 = "";
  if ($('#cboxgeo').prop('checked')) {
    spatialfilter = 'filter(geof:sfContains("' + $('#geom').val() + '"^^geo:wktLiteral, ?wkt)) \n';
    spatialfilter2 = 'filter(geof:sfContains(?wkt, "' + $('#geom').val() + '"^^geo:wktLiteral)) \n ';
  }
  let q = ""
  let link = "";
  let query = "";
  if ($('#cboxsem').prop('checked')) {

    query = queriesFeatureSemantic[$("#listseml1 option:selected").val() - 1]['query'];
    query = query.replace('semanticfilter', semanticfilter);
  }
  else {
    if ($('input:radio[name=geoloc]').filter('[value=geom]').prop('checked') === true) {
      query = queriesDoc[0]['query'];
    }
    else {
      query = queriesFeature[0]['query'];
      query = query.replace('?featurename', $("#featureuri").val());
    }
  }

  query = query.replace('tempofilter', tempofilter);
  query = query.replace('intervalfilter', intervalfilter);
  query = query.replace('spatialfilter', spatialfilter);
  query = query.replace('instantfilter', instantfilter);
  alert(query);
  query = prefixesToQuery + query;
  link = host + queryGeoJSON + encodeURIComponent(query);
  var format = new ol.format.GeoJSON();
  //loadJSON(i, link, queries[i]['title']);

  $.getJSON(link, function (result) {
    let features = (new ol.format.GeoJSON()).readFeatures(result, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    FeatureVectorSource.clear();
    FeatureVectorSource.addFeatures(features);
    $("#geoviz").modal({ backdrop: false });
    $("#geoviz").draggable({
      handle: ".modal-header"
    });
    setTimeout(function () { mapDraw.updateSize(); }, 1000);
    let ext = FeatureVectorSource.getFeatures()[0].getGeometry().getExtent();
    let center = ol.extent.getCenter(ext);
    //alert(center);
    mapDraw.setView(new ol.View({
      projection: 'EPSG:3857',//or any projection you are using
      center: [center[0], center[1]],//zoom to the center of your feature
      zoom: 11 //here you define the levelof zoom
    }));
    clickToShow = true;

    /* 
                    $.each(result['results']['bindings'], function (index, value) {
                        name = value['name']['value'];
                        wkt = value['wkt']['value'];
                        uri = value['uri']['value'];
                        let f = format.readFeature(value['wkt']['value'], {
                            dataProjection: 'EPSG:4326',
                            featureProjection: 'EPSG:3857'
                        });
    
                        f.set('name', name);
                        f.set('uri', uri);
                        f.setId(name);
                        //f.setStyle(getStyle(item.Heading, item.Length, item.Type));
                        FeatureVectorSource.addFeature(f);
    
                    }); */
  });




  /* for (i = 0; i < queriesDOC.length; i++) {
      if (i === 0 && !$('#cboxgeo').prop('checked')) continue;
      let query = queries[i]['query'];
      query = query.replace('tempofilter', tempofilter);
      query = query.replace('intervalfilter', intervalfilter);
      query = query.replace('spatialfilter', spatialfilter);
      currentQueries.push({ "query": query, "title": queries[i]['title'] });
      query = prefixesToQuery + query;
      link = host + queryJSON + encodeURIComponent(query);
      loadJSON(i, link, queries[i]['title']);
  } */

});


var featureLookup = [];
function loadFeatureLookup() {
  $.each(featureQueries, function (type, query) {
    $.getJSON(host + queryJSON + encodeURIComponent(query), function (result) {
      $.each(result['results']['bindings'], function (key, val) {
        featureLookup.push({ "name": val['name']['value'], "desc": type, "uri": val['uri']['value'] });
      });
    });
  });
}

function loadGeoJSON(q, name) {
  var table = "<table id='list' class='w3-table-all w3-hoverable' title='Click on a hyperlink to browse, click on a row to view objet'><thead><tr class='w3-blue'>";
  RSVectorSource.clear();
  $.getJSON(q, function (data) {
    if (data.features.length === 0)
      return;
    str = ''
    let n = 1;
    //let fea = new ol.format.GeoJSON().readFeatures(data, {
    //    dataProjection: 'EPSG:4326',
    //    featureProjection: 'EPSG:3857'
    // });
    $.each(data.features[0].properties, function (name, da) {
      if (name !== 'ID')
        table = table + "<th>" + name + "</th>";
    });
    table = table + '</tr></thead>';

    $.each(data.features, function (key, val) {
      rs.push(val.geometry);
      str = str + '<tr>';
      $.each(val.properties, function (i, j) {
        if (j.toString().indexOf('http') !== -1)
          str = str + '<td><a href="#">' + j + '</a></td>';
        else
          str = str + '<td>' + j + '</td>';
        //f.set(j, i);
      });
      //f.setId(n);
      //f.setStyle(getStyle(item.Heading, item.Length, item.Type));
      //  RSVectorSource.addFeatures(fea);
      //listnames.push(value['name']['value'] + ' (departement)');
      n = n + 1;
      str = str + '</tr>';
    });
    table = table + str + "</tbody></table>";
    $('#list').append("<h4> " + name + "</h4><div class='result'>" + table + "<div>");
  });
}



function downloadCSV(idx) {
  table[idx].download("csv", "data.csv");
}

function replaceAll(str, replaceWhat, replaceTo) {
  var re = new RegExp(replaceWhat, 'g');
  return str.replace(re, replaceTo);
}

uri = "uri";
function toogle() {
  if (uri === 'uri') {
    $.each(json, function (idx, js) {
      $.each(prefixes, function (i, prefix) {
        js = replaceAll(js, prefix['uri'], prefix['prefix'] + ':');
      });
      let t = new Tabulator("#list" + idx, {
        data: JSON.parse(js),
        columns: tableheader[idx],
        height: "250px"
      });

    });
    uri = 'pre';
  }
  else {
    $.each(json, function (idx, js) {
      $.each(prefixes, function (i, prefix) {
        js = replaceAll(js, prefix['prefix'] + ':', prefix['uri']);

      });

      let t = new Tabulator("#list" + idx, {
        data: JSON.parse(js),
        columns: tableheader[idx],
        height: "250px"
      });
    });
    uri = 'uri';
  }
}

var semantic = [];

$("#btnAddSem").click(function () {
  let idxsem = $("#listseml1 option:selected").val();
  //alert(idxsem);
  $("#listsem").append('<option value="' + $("#listseml2" + idxsem + "  option:selected").val() + '">' + $("#listseml2" + idxsem + "  option:selected").text() + '</option>');
  $('#semdialog').modal('hide');
});

$("#listseml1").change(function () {

  for (i = 1; i <= queriesSemantic.length; i++) {
    $("#listseml2" + i).hide();
    //alert(i); 
  }

  $("#listseml2" + $(this).val()).show();

});



$(document).ready(function () {



  t = new Tabulator("#prefixestable", {
    data: prefixes,
    fitColumns: true,
    columns: [{ title: "Prefix", field: "prefix", width: 90 },
    { title: "URI", field: "uri", width: 500 }],
    height: "350px"
  });

  $.each(prefixes, function (idx, prefix) {
    prefixesToQuery = prefixesToQuery + "PREFIX " + prefix['prefix'] + ":<" + prefix['uri'] + "> \n";
  });

  if (findGetParameter("sdate") != null || findGetParameter("geom") != null) {
    if (findGetParameter("sdate") != null) {
      $('#cboxdatetime').prop('checked', true);
      $('#dtstart').val(findGetParameter("sdate"));
      $('#dtend').val(findGetParameter("edate"));
    }

    if (findGetParameter("geom") != null) {
      $('#cboxgeo').prop('checked', true);
      $('#geom').val(findGetParameter("geom"));
      $('input:radio[name=geoloc]').filter('[value=geom]').prop('checked', true);
    }
    // alert(1);
    $('#btnSearch').click();

  }

  $("#btnsem").attr("disabled", "disabled");
  $("#listsem").attr("disabled", "disabled");
  $("input[name='geoloc']").attr("disabled", "disabled");
  $("#dtend").attr("disabled", "disabled");
  $("#dtstart").attr("disabled", "disabled")
  $('#geom').prop("disabled", true);
  $('#feature').prop("disabled", true);
  boxes = $('.col-md-4');
  maxHeight = Math.max.apply(
    Math, boxes.map(function () {
      return $(this).height();
    }).get());
  boxes.height(maxHeight);

  loadFeatureLookup();

  var options = {
    data: featureLookup,
    getValue: "name",
    template: {
      type: "description",
      fields: {
        description: "desc"
      }
    },
    list: {
      match: {
        enabled: true
      },
      onSelectItemEvent: function () {
        var value = $("#feature").getSelectedItemData().name;

        $("#featureuri").val(value).trigger("change");
      }
    },
    theme: "square"
  };

  $("#feature").easyAutocomplete(options);


  var $content, $modal, $apnData, $modalCon;
  $content = $(".min");


  $(".modalMinimize").on("click", function () {

    $modalCon = "geoviz";
    $apnData = $('#geoviz');
    $modal = "#" + $modalCon;
    $(".modal-backdrop").addClass("display-none");
    $($modal).toggleClass("min");
    if ($($modal).hasClass("min")) {
      $(".minmaxCon").append($apnData);
      $(this).find("i").toggleClass('fa-minus').toggleClass('fa-clone');

    }
    else {
      $(".container").append($apnData);
      $(this).find("i").toggleClass('fa-clone').toggleClass('fa-minus');

    };

  });

  $("button[data-dismiss='modal']").click(function () {

    $(this).closest(".mymodal").removeClass("min");

    $(".container").removeClass($apnData);

    $(this).next('.modalMinimize').find("i").removeClass('fa fa-clone').addClass('fa fa-minus');

  });

  //Load all semantic possible
  i = 1;
  $.each(queriesSemantic, function (index, query) {
    let ar = loadSemantic(host + queryJSON + encodeURIComponent(prefixesToQuery + query['query']), i);
    semantic.push(ar);

    $("#listseml2" + i).css("display", "none");
    i++;
  });




});

$('li').on('click', function (e) {
  e.preventDefault();
  var $a = $(this).children('a');
  if ($a.attr('href') === 'toogle')
    toogle();
  if ($a.attr('href') === 'vineyard')
    window.location = window.location.replace("index.jsp", "index.jsp?sdate=2017-04-01&edate=2017-05-01&geom=POLYGON((-0.5361%2045.2022,1.1338%2045.1402,0.9756%2044.0386,-0.6768%2044.0386,-0.5361%2045.2022))#");

});

$('#querydialog').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  var query_number = button.data('query')
  var modal = $(this)
  //modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('#query').val(currentQueries[query_number]['query']);
});

//return a array of (level, label) for one semantic 
function loadSemantic(q, n) {
  let ar = new Array();
  $.getJSON(q, function (result) {
    var heads = result['head']['vars'];
    var data = result['results']['bindings'];
    $.each(data, function (index, row) {
      let couple = new Array();
      $.each(heads, function (index2, col) {
        couple.push(row[col]['value']);

      });
      $("#listseml2" + n).append('<option value="' + couple[0] + '">' + couple[1] + '</option>');



    });

  });
  // alert(ar.length);
  return ar;
}

function loadInfo(num, q, title) {
  var str = "";
  $.getJSON(q, function (result) {
    var str = "[";
    var heads = result['head']['vars'];
    var data = result['results']['bindings'];
    var th = [];
    $.each(heads, function (index2, col) {
      th.push({ "title": col, "field": col });
    });
    $.each(data, function (index, row) {
      str = str + "{";
      $.each(heads, function (index2, col) {
        str = str + '"' + col + '":"' + row[col]['value'] + '",';
      });
      str = str.replace(/,\s*$/, "");
      str = str + "},";
    });
    str = str.replace(/,\s*$/, "");
    str = str + ']';
    let t = new Tabulator("#list" + num, {
      data: JSON.parse(str),
      columns: th,
      height: "250px"

    });
    table.push(t);
    tableheader.push(th);
    json.push(str);
    let html = "<h3>" + title + '</h3><div class="submenu"><button type="button"  onclick="downloadCSV(' + num + ')" class="btn btn-success">Export CSV</button><button type="button" class="btn btn-success" data-toggle="modal" data-target="#querydialog" data-query="' + num + '">Open query</button><button type="button" class="btn btn-success" data-toggle="modal" data-target="#ontology" data-onto="' + num + '">View ontology</button></div>';
    $("#title" + num).html(html);


    /*    var heads = result['head']['vars'];
       var data = result['results']['bindings'];
       var th = [];
       $.each(heads, function (index2, col) {
           th.push({ "title": col, "field": col });
       });
       $.each(data, function (index, row) {
 
           $.each(heads, function (index2, col) {
               str = str + '"' + col + '":"' + row[col]['value'] + '",';
           });
           str = str.replace(/,\s*$/, "");
           str = str + "<br/>";
       });
       alert(str);
       $("#title" + num).html("<h3>" + title + '</h3>');
       $("#list" + num).html(str);
       return str; */

  });
}


function viewFeature(uri) {

  let WKTformat = new ol.format.WKT();
  let featuregeom;
  $.each(FeatureVectorSource.getFeatures(), function (index, feat) {
    if (feat.get('uri') === uri) {
      featuregeom = WKTformat.writeGeometry(feat.getGeometry().transform('EPSG:3857', 'EPSG:4326'), { decimals: 3 })
      return false;
    }
  });



  let tempofilter = "";
  let intervalfilter = "";
  let instantfilter = "";
  if ($('#cboxdatetime').prop('checked')) {
    tempofilter = '?dt time:inXSDDateTime ?dti. \n FILTER(?dti>="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime) \n';
    intervalfilter = "?timeInterval time:hasBeginning/time:inXSDDateTime ?dti1. \n" +
      " ?timeInterval time:hasEnd/time:inXSDDateTime ?dti2. \n" +
      ' FILTER((?dti1 >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti1<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime) || (?dti2 >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti2<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime)). \n';
    instantfilter = ' FILTER(?dti >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime). \n';

  }
  // alert(intervalfilter);             
  let spatialfilterDoc = 'filter(geof:sfContains(?wkt, "' + featuregeom + '"^^geo:wktLiteral)) \n ';
  let featureURI = '<' + uri + '>';


  let content = "";
  for (i = 1; i < queriesDoc.length; i++) {

    let query = queriesDoc[i]['query'];
    query = query.replace('tempofilter', tempofilter);
    query = query.replace('intervalfilter', intervalfilter);
    query = query.replace('instantfilter', instantfilter);
    query = query.replace('spatialfilterDoc', spatialfilterDoc);
    query = query.replace('?featurefilterDoc', featureURI);
    alert(query);
    query = prefixesToQuery + query;
    link = host + queryJSON + encodeURIComponent(query);
    loadInfo(i, link, queriesDoc[i]['title']);

  }
  //  $("#featureinfo").html(content);

}