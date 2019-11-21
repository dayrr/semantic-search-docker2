$('#geom').prop("disabled", true);
$('#feature').prop("disabled", false);
var queryJSON = '?handle=download&format=SPARQL%2FJSON&submit=Query&view=HTML&query='
var queryGeoJSON = '?handle=download&format=GeoJSON&submit=Query&view=HTML&query='
var json = [];

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

$('#btnWKTReset').click(function () {
  FeatureVectorSource.clear();
  clickToShow = false;
  mapDraw.addInteraction(draw);
});


$('#cboxdatetime').change(function () {
  // if ($(this).prop('checked')) {
  //   $("#dtend").removeAttr("disabled");
  //   $("#dtstart").removeAttr("disabled");
  // }
  // else {
  //   $("#dtend").attr("disabled", "disabled");
  //   $("#dtstart").attr("disabled", "disabled")
  // }

});

$('#cboxgeo').change(function () {
  // if ($(this).prop('checked')) {
  //   $("input[name='geoloc']").removeAttr("disabled");
  // }
  // else {
  //   $("input[name='geoloc']").attr("disabled", "disabled");
  // }

});

$('#cboxsem').change(function () {
  // if ($(this).prop('checked')) {
  //   $("#btnsem").removeAttr("disabled");
  //   $("#listsem").removeAttr("disabled");
  // }
  // else {
  //   $("#btnsem").attr("disabled", "disabled");
  //   $("#listsem").attr("disabled", "disabled");
  // }
});


function loadWKT(ds) {

  let query = host + queryJSON + encodeURIComponent(wktQueries[ds]);
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
      $.each(FeatureLayers, function (idx, layer) {
        if (layer['name'] === ds)
          layer['layer'].getSource().addFeature(f);
      })

    });
  });
}


var table = [];
var tableheader = [];
var chartdata;
Chart.defaults.line.spanGaps = true;
function loadGraph() {
  var ctx = $("#meteochart")[0].getContext('2d');
  chartdata = { labels: [], datasets: [] };
  var myChart = new Chart(ctx, {
    type: 'line',
    data: chartdata,
    options: {
      scales: {
        yAxes: [{
          id: 'A',
          type: 'linear',
          position: 'left',
        }, {
          id: 'B',
          type: 'linear',
          position: 'right',
          ticks: {
            max: 100,
            min: 0
          }
        }],
        xAxes: [{
          type: 'time',
          distribution: 'series',
          time: {
            unit: 'day'
          },
          ticks: {
            source: 'data',
            autoSkip: true
          }
        }],

      }
    }
  });

  //Draw meteo measures
  if (json[3] != null)
    $.each(mesures, function (idx, mesure) {
      let filtered = json[3].filter(function (item) {
        return item.procedure === "http://melodi.irit.fr/resource/Procedure/" + mesure['uri'];
      });

      let chartlb = $(filtered).map(function () {
        return this['dti'].substr(0, 10);
      }).get()


      let chartval = $(filtered).map(function () {
        return this['value'];
      }).get()

      if (chartdata.labels === undefined || chartdata.labels.length == 0)
        chartdata.labels = chartlb;
      chartdata.datasets.push({
        data: chartval,
        label: mesure['name'],
        yAxisID: 'A',
        hidden: true,
        fill: false,
        pointRadius: 2,
        lineTension: 0.5,
        borderWidth: 2,
        borderColor: mesure['color']
      });
    });

  //Draw quicklook
  let obsList = [];
  let obsData = [];
  if (json[2] != null) {
    for (i = 0; i < chartdata.labels.length; i++) {
      let imgsrc = '';
      for (j = 0; j < json[2].length; j++)
        if (chartdata.labels[i] === json[2][j]['dti'].substr(0, 10))
          if (json[2][j]['quicklook'] != "None")
            imgsrc = json[2][j]['quicklook'];
      if (imgsrc === '') {
        obsList.push("");
        obsData.push(null);
      }
      else {
        let img = new Image(64, 64);
        img.src = imgsrc;
        obsList.push(img);
        obsData.push(0);
      }
    }

    chartdata.datasets.push({
      data: obsData,
      label: 'S2',
      yAxisID: 'B',
      pointStyle: obsList
    });
  }

  //Draw changes lines
  if (json[4] != null)
    $.each(changes, function (idx, change) {
      let filtered = json[4].filter(function (item) {
        return item.change.indexOf(change.key) > 0;
      });
      // alert(filtered.length)

      let changeval = new Array(chartdata.labels.length).fill(null);
      $.each(filtered, function (i, row) {
        for (j = 0; j < chartdata.labels.length; j++)
          if (chartdata.labels[j] >= row['dti1'].substr(0, 10) && chartdata.labels[j] <= row['dti2'].substr(0, 10))
            changeval[j] = row['percentage'];
      });


      chartdata.datasets.push({
        data: changeval,
        label: change['name'],
        yAxisID: 'B',
        fill: false,
        hidden: true,
        pointRadius: 3,
        borderWidth: 3,
        borderColor: change['color']
      });
    });

  /* //Draw damage lines
   if(json[5]!=null)
   $.each(damages, function (idx, damage) {
     let filtered = json[5].filter(function (item) {
       return item.deterioration === damage['uri'];
     });
 
 
     let damageval = new Array(chartdata.labels.length).fill(null);
     $.each(filtered, function (i, row) {
       for (j = 0; j < chartdata.labels.length; j++)
         if (chartdata.labels[j] >= row['dti1'].substr(0, 10) && chartdata.labels[j] <= row['dti2'].substr(0, 10)) {
 
           if (row['deterioration'].indexOf("VeryHigh") > 0)
             damageval[j] = 80;
           else
             if (row['deterioration'].indexOf("High") > 0)
               damageval[j] = 65;
             else
               if (row['deterioration'].indexOf("Mid") > 0)
                 damageval[j] = 50;
               else
                 if (row['deterioration'].indexOf("Low") > 0)
                   damageval[j] = 30;
                 else
                   damageval[j] = 0;
         }
 
     });
 
     
       chartdata.datasets.push({
         data: damageval,
         label: damage['name'],
         yAxisID: 'B',
         fill: false,
     hidden: true,
         pointRadius: 3,
         borderWidth: 3,
         borderColor: damage['color']
       });
   });
   
 */
  //Draw ndvi
  if (json[5] != null)

    $.each(ndvis, function (idx, ndvi) {
      let filtered = json[5].filter(function (item) {
        return item.ndvi.indexOf(ndvi.key) > 0;
      });


      let ndvival = new Array(chartdata.labels.length).fill(null);
      $.each(filtered, function (i, row) {
        for (j = 0; j < chartdata.labels.length; j++)
          if (chartdata.labels[j] == row['dti'].substr(0, 10)) {
            ndvival[j] = row['percentage'];
            // alert(row['percentage']);

          }

      });


      chartdata.datasets.push({
        data: ndvival,
        label: ndvi['name'],
        yAxisID: 'B',
        fill: false,
        hidden: true,
        pointRadius: 3,
        borderWidth: 3,
        borderColor: ndvi['color']
      });

    });


  myChart.update();
  $("#meteochart").height("800px");
}

var prefixesToQuery = "";

function showOnMap(feats, clear = true) {
  if (clear === true)
    FeatureVectorSource.clear();
  if (feats.length > 0) {
    FeatureVectorSource.addFeatures(feats);
    //FeatureVectorLayer.setStyle(styleFunction);
    let ext = FeatureVectorSource.getFeatures()[0].getGeometry().getExtent();
    let center = ol.extent.getCenter(ext);
    //alert(center);
    mapDraw.setView(new ol.View({
      projection: 'EPSG:3857',//or any projection you are using
      center: [center[0], center[1]],//zoom to the center of your feature
      zoom: 11 //here you define the levelof zoom
    }));
    clickToShow = true;
    mapDraw.removeInteraction(draw);
  }
}

function showVillage(insee) {
  let query = queryVillage[0]['query'];
  query = query.replace('?featureURI', insee);
  query = prefixesToQuery + query;
  link = host + queryGeoJSON + encodeURIComponent(query);
  let format = new ol.format.GeoJSON();
  let feats;
  let village;
  $.getJSON(link, function (result) {
    village = format.readFeatures(result, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    showOnMap(village, true);

  });
}

function searchByVillage(insee) {
  let query = queryVillage[0]['query'];
  query = query.replace('?featureURI', insee);
  query = prefixesToQuery + query;
  link = host + queryGeoJSON + encodeURIComponent(query);
  let format = new ol.format.GeoJSON();
  let feats;
  let village;
  $.getJSON(link, function (result) {
    village = format.readFeatures(result, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    showOnMap(village, true);
    // showOnMap(feats);  
  });

  $.getJSON(link, function (result) {
    feats = format.readFeatures(result, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:4326'
    });
    $('#drawncoords').html(new ol.format.WKT().writeGeometry(feats[0].getGeometry())); 
    clickToShow = true;
    search();
  });


}

function search() {
  let tempofilter = "";
  let intervalfilter = "";
  let instantfilter = "";
  let instantfilterzone = "";
  let semanticfilter = "";
  if ($('#cboxdatetime').prop('checked')) {
    tempofilter = '?dt time:inXSDDateTime ?dti. \n FILTER(?dti>="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime) \n';
    intervalfilter = "?timeInterval time:hasBeginning/time:inXSDDateTime ?dti1. \n" +
      " ?timeInterval time:hasEnd/time:inXSDDateTime ?dti2. \n" +
      ' FILTER((?dti1 >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti1<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime) || (?dti2 >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti2<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime)). \n';
    instantfilter = ' FILTER(?dti >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime). \n';
    instantfilterzone = ' FILTER(?dti >="' + $('#dtstart').val() + 'T00:00:00+00:00"^^xsd:dateTime && ?dti<="' + $('#dtend').val() + 'T00:00:00+00:00"^^xsd:dateTime). \n';
  }

  // alert(intervalfilter);
  let tempoorder = "";
  if ($('#cboxdatetime').prop('checked'))
    tempoorder = " \n ORDER BY (?dti) \n";
  let spatialfilter = "";
  let spatialfilter2 = "";
  let semfilter="";
  if ($('#cboxgeo').prop('checked')) {
    spatialfilter = 'filter(geof:sfContains("' + $('#drawncoords').html() + '"^^geo:wktLiteral, ?wkt)) \n';
    spatialfilter2 = 'filter(geof:sfContains(?wkt, "' + $('#drawncoords').html() + '"^^geo:wktLiteral)) \n ';
  }
  let q = ""
  let link = "";
  let query = "";
  if ($('#cboxsem').prop('checked')) {
    let sem = $('#semantictree').treeview('getSelected');
    if (sem[0]['uri'].indexOf("change") > 0)
    {
      query = queriesFeatureSemantic[1]['query'];
      semfilter = sem[0]['class'];
    }
    else
      if (sem[0]['uri'].indexOf("vineyard") > 0)
        query = queriesFeatureSemantic[0]['query'];
      else
        query = queriesFeatureSemantic[2]['query'];
    query = query.replace('semanticfilter', sem[0]['uri']);
  }
  else {

    query = queriesDoc[0]['query'];

  }

  query = query.replace('tempofilter', tempofilter);
  query = query.replace('intervalfilter', intervalfilter);
  query = query.replace('spatialfilter', spatialfilter);
  query = query.replace('instantfilter', instantfilter);
  query = query.replace('instantfilterzone', instantfilterzone);
  query = query.replace('semfilter', semfilter);
  //alert(query);
  query = prefixesToQuery + query;
  link = host + queryGeoJSON + encodeURIComponent(query);
  var format = new ol.format.GeoJSON();
  //loadJSON(i, link, queries[i]['title']);
  let = new ol.format.GeoJSON();
  let feats;
  $.getJSON(link, function (result) {
    let feats = (new ol.format.GeoJSON()).readFeatures(result, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    showOnMap(feats, false);
  });
}


var featureLookup = [];
function loadFeatureLookup() {
  $.each(featureQueries, function (type, query) {
    query = prefixesToQuery + query;
    $.getJSON(host + queryJSON + encodeURIComponent(query), function (result) {
      $.each(result['results']['bindings'], function (key, val) {
        featureLookup.push({ "name": val['name']['value'], "desc": val['uri']['value'].substring(val['uri']['value'].length - 5), "uri": val['uri']['value'] });
      });
    });
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



$(document).ready(function () {
  $.each(prefixes, function (idx, prefix) {
    prefixesToQuery = prefixesToQuery + "PREFIX " + prefix['prefix'] + ":<" + prefix['uri'] + "> \n";
  });
  $("#WMSLayers").html();
  $.each(WMSLayers, function (idx, wms) {
    $("#WMSLayers").append("<input type='checkbox' name='layers' value='" + wms['name'] + "'>" + wms['name']);
  });
  $("#FeatureLayers").html();
  $.each(FeatureLayers, function (idx, feat) {
    $("#FeatureLayers").append("<input type='checkbox' name='layers' value='" + feat['name'] + "'>" + feat['name']);
  });


  $('#layers input:checkbox').click(function () {
    let val = $(this).val();
    let checked = $(this).is(':checked');
    $.each(FeatureLayers, function (idx, layer) {
      if (layer['name'] === val) {

        if (checked) {
          if (layer['layer'].getSource().getFeatures.length <= 0)
            loadWKT(layer['name']);
          layer['layer'].setVisible(true);
          // alert("Setvisible" + layer['name']);
          return;
        }
        else {
          layer['layer'].setVisible(false);
          return;
        }
      }
    });

    $.each(WMSLayers, function (idx, layer) {
      if (layer['name'] === val) {

        if (checked) {
          // alert("Setvisible" + layer['name']);
          layer['layer'].setVisible(true);
          return;
        }
        else {
          layer['layer'].setVisible(false);
          return;
        }
      }
    });

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
    $('#btnSearch').click();

  }

  loadFeatureLookup();
  var options = {
    data: featureLookup,
    getValue: function (element) {
      return element.name + " - " + element.desc;
    },
    /* template: {
       type: "description",
       fields: {
         description: "desc"
       }
     },
     */
    list: {
      match: {
        enabled: true
      },
      onSelectItemEvent: function () {
        var value = $("#feature").getSelectedItemData().desc;
        $("#featureuri").val(value);
        showVillage(value);
      },

      onChooseEvent: function () {
        var value = $("#feature").getSelectedItemData().desc;
        $("#featureuri").val(value);
        searchByVillage(value);
      }
    },
    theme: "square"
  };

  $("#feature").easyAutocomplete(options);

  $('#btnGraphic').hide();
  $('#semantictree').treeview({ data: semantictree });
  $('#semantictree').treeview('expandAll', { silent: true });
  let treeViewObject = $('#semantictree').data('treeview');
  let allCollapsedNodes = treeViewObject.getCollapsed();
  let allExpandedNodes = treeViewObject.getExpanded();
  let allNodes = allCollapsedNodes.concat(allExpandedNodes);

  treeViewObject.selectNode(allNodes[2].nodeId);
  $('#feature').tooltip();
});



function loadInfo(num, q, title) {
  let str = "";
  //alert(title);
  $.getJSON(q, function (result) {
    let str = "[";
    let heads = result['head']['vars'];
    let data = result['results']['bindings'];
    let th = [];
    let height = "250px";
    if (data.length < 4)
      height = "100px";
    else
      if (data.length < 10)
        height = "150px";

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
    if (data.length > 0) {
      let t = new Tabulator("#list" + num, {
        data: JSON.parse(str),
        columns: th,
        height: height

      });
      table[num] = t;;
      tableheader[num] = th;

      json[num] = JSON.parse(str);

      let html = "<h3>" + title + '</h3><div class="submenu"><button type="button"  onclick="downloadCSV(' + num + ')" class="btn btn-success">Export CSV</button></div>';
      //<button type="button" class="btn btn-success" data-toggle="modal" data-target="#querydialog" data-query="' + num + '">Open query</button><button type="button" class="btn btn-success" data-toggle="modal" data-target="#ontology" data-onto="' + num + '">View ontology</button>
      $("#title" + num).html(html);
    }
    else
      json[num] = null;
    //alert(title);
  });
}





$('#btnGraphic').click(function () {
  $('#tabularresults').toggle();
  $('#meteochart').toggle();
  if ($('#btnGraphic').html() == "Show chart") {
    $('#btnGraphic').html("Show tabulars");
    loadGraph();
  }
  else {
    $('#btnGraphic').html("Show chart");
  }
});


function viewFeature(id) {
  //$('#tabularresults').hide();
  $('#btnGraphic').html("Show chart");
  let WKTformat = new ol.format.WKT();
  let featuregeom = WKTformat.writeGeometry(FeatureVectorSource.getFeatureById(id).getGeometry().transform('EPSG:3857', 'EPSG:4326'), { decimals: 3 });
  let uri = FeatureVectorSource.getFeatureById(id).get("uri");
  let parcel = uri;
  let landcover = FeatureVectorSource.getFeatureById(id).get("landcover");
  $("#village").html("<h3> Parcel: " + parcel.substring(parcel.lastIndexOf("/") + 1) + "(LC: " + landcover.substring(landcover.lastIndexOf("/") + 1) + ")</h3>");
  let tempofilter = "";
  let intervalfilter = "";
  let instantfilter = "";
  let instantfilterzone = "";
  if ($('#cboxdatetime').prop('checked')) {
    tempofilter = '?dt time:inXSDDateTime ?dti. \n FILTER(?dti>="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime) \n';
    intervalfilter = "?timeInterval time:hasBeginning/time:inXSDDateTime ?dti1. \n" +
      " ?timeInterval time:hasEnd/time:inXSDDateTime ?dti2. \n" +
      ' FILTER((?dti1 >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti1<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime) || (?dti2 >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti2<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime)). \n';
    instantfilter = ' FILTER(?dti >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime). \n';
    instantfilterzone = ' FILTER(?dti >="' + $('#dtstart').val() + 'T00:00:00+00:00"^^xsd:dateTime && ?dti<="' + $('#dtend').val() + 'T00:00:00+00:00"^^xsd:dateTime). \n';


  }
  // alert(intervalfilter);             
  let spatialfilterDoc = 'filter(geof:sfContains(?wkt, "' + featuregeom + '"^^geo:wktLiteral)) \n ';
  let featureURI = '<' + uri + '>';
  for (i = 0; i < queriesDoc.length; i++) {
    let query = queriesDoc[i]['query'];
    query = query.replace('tempofilter', tempofilter);
    query = query.replace('intervalfilter', intervalfilter);
    query = query.replace('instantfilterzone', instantfilterzone);
    query = query.replace('instantfilter', instantfilter);
    query = query.replace('spatialfilterDoc', spatialfilterDoc);
    query = query.replace('?featurefilterDoc', featureURI);
    //</div>alert(query);
    query = prefixesToQuery + query;
    link = host + queryJSON + encodeURIComponent(query);
    //alert("call " + queriesDoc[i]['title']);
    loadInfo(i, link, queriesDoc[i]['title']);
  }

  //setTimeout(function () { loadGraph(); }, 5000);
  $('#btnGraphic').show();
  $('#meteochart').hide();
  $('#tabularresults').show();

}