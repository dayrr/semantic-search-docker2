<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script src="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/build/ol.js"></script>
    <link rel="stylesheet" href="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/css/ol.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tabulator/4.2.3/js/tabulator.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tabulator/4.2.3/css/tabulator.min.css" rel="stylesheet">
    <script src="data.js"></script>
    <script src="jquery.easy-autocomplete.min.js"></script>
    <link href="semsearch.css" rel="stylesheet">
    <link href="easy-autocomplete.min.css" rel="stylesheet">
    <title>Semantic search</title>
</head>

<body>

    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="index.jsp">Semantic search</a>
            </div>
            <ul class="nav navbar-nav">
                <li class="active" data-toggle="modal" data-target="#prefixesdialog"><a href="#">Prefixes</a></li>
                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Ontologies<span
                            class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">MFO</a></li>
                        <li><a href="#">AU</a></li>
                        <li><a href="#">Change</a></li>
                        <li class="divider"></li>
                        <li><a href="#">NDVI</a></li>
                    </ul>
                </li>
                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Use cases <span
                            class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li data-toggle="tooltip" data-placement="bottom"
                            title="In this use case, let's examinate the vineyard health in the Aquitaine region (tile T30YQ) in avril 2017. Contextual data are queried to explain the situation.">
                            <a href="vineyard"> </a>Vineyard health</a></li>
                    </ul>
                </li>
                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Option <span
                            class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="toogle">Toogle prefixes</a></li>
                        <li><a href="#">Visualisation</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>


    <div class="container-fluid">

        <div class="row">
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <input type="checkbox" id="cboxdatetime"> <span class="glyphicon glyphicon-calendar"></span>
                        Date time</div>
                    <div class="panel-body"> From <input type="date" id="dtstart" value="2017-04-01" min="2016-01-01"
                            max="2018-12-31">
                        To <input type="date" id="dtend" value="2017-05-01" min="2016-01-01" max="2018-12-31"></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading"> <input type="checkbox" id="cboxgeo"><span
                            class="glyphicon glyphicon-map-marker"></span> Location</div>
                    <div class="panel-body" id="geosearch"><input name='geoloc' value='geom' type="radio">
                        Map: <input id="geom" type="text" placeholder="..." title="...">
                        <input name='geoloc' value='feature' type="radio" checked='cheked'> Feature <input id="feature"
                            type="text"></div>
                </div>

            </div>
            <div class="col-md-3">
                <div class="panel panel-default">
                    <div class="panel-heading"> <input type="checkbox" id="cboxsem"><span
                            class="glyphicon glyphicon-book"></span> Semantic</div>
                    <div class="panel-body"> <select id="listsem" size="2" multiple> </select>
                        <button type="button" id='btnsem' class="btn btn-success"> Add </button></div>
                </div>

            </div>
            <div class="col-md-1">
                <button type="button" id='btnSearch' class="btn btn-success"> <span
                        class="glyphicon glyphicon-search"></span>
                    Search
                </button>
            </div>
        </div>



        <div id='list'>
            <div id='title0'> </div>
            <div id='list0'> </div>
            <div id='title1'> </div>
            <div id='list1'> </div>
            <div id='title2'> </div>
            <div id='list2'></div>
            <div id='title3'> </div>
            <div id='list3'> </div>
            <div id='title4'> </div>
            <div id='list4'> </div>
            <div id='title5'> </div>
            <div id='list5'> </div>
            <div id='title6'> </div>
            <div id='list6'></div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="geoviz">
            <div class="modal-dialog modal-lg">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Draw the geolocation. Double click to finish drawing.</h4>
                    </div>
                    <div class="modal-body">
                        <div id="mouse-position" class="mouse-position"></div>
                        <div id="mapcontainer">
                            <div id="map" class="map"></div>
                            <div id="popup" class="ol-popup">
                                <a href="#" id="popup-closer" class="ol-popup-closer"></a>
                                <div id="popup-content"></div>
                                <div id="traj"></div>
                            </div>

                        </div>
                        <div id='layers'>
                            <input type="checkbox" name='layer' value='tile'> Tile <br>
                            <input type="checkbox" name='layer' value='station'> Station <br>
                            <input type="checkbox" name='layer' value='region'> Region <br>
                            <input type="checkbox" name='layer' value='departement'> Departement <br>
                            <div id='wktloading'>popopopopop</div>
                        </div>
                        <div id='drawncoords'></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" id="btnWKTOK">OK</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>



        <!-- Modal -->
        <div class="modal fade" id="querydialog" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Query</h4>
                    </div>
                    <div class="modal-body">
                        <textarea class="form-control" rows="15" id="query"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success">Run</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="prefixesdialog" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">List of prefixes</h4>
                    </div>
                    <div class="modal-body">
                        <div id="prefixestable"></div>
                    </div>
                    <div class="modal-footer">

                        <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <script src="map.js"></script>
    <script src="ep.js"></script>
    <script>

        $('#geom').prop("disabled", true);
        $('#feature').prop("disabled", false);
        var queryJSON = '?handle=download&format=SPARQL%2FJSON&submit=Query&view=HTML&query='
        var queryGeoJSON = '?handle=download&format=GeoJSON&submit=Query&view=HTML&query='

        function loadWKT(ds) {
            let query = host + queryJSON + encodeURIComponent(wktQueries[ds]);
            $("#wktloading").html('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
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
            $("#wktloading").html('');
        }

        $('#btnWKTOK').click(function () {
            $('#geom').val($('#drawncoords').html());
            $('#geom').attr('title', $('#geom').val());
            $('#geoviz').modal('hide');
        });


        $('#geosearch input:radio').click(function () {
            //draw on the map
            if ($(this).val() === 'geom') {
                $('#geom').prop("disabled", false);
                $('#feature').prop("disabled", true);
                $("#geoviz").modal('show');
                setTimeout(function () { map.updateSize(); }, 1000);
                map.addInteraction(draw);
            } else {
                $('#geom').prop("disabled", true);
                $('#feature').prop("disabled", false);
                map.removeInteraction(draw);

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

        var spatialfilter = "";
        var tempofilter = "";
        var prefixesToQuery = "";
        var currentQueries = [];

        $('#btnSearch').click(function () {
            //alert($('#cboxgeo').prop('checked'));
            let tempofilter = "";
            let intervalfilter = "";
            if ($('#cboxdatetime').prop('checked')) {
                tempofilter = '?dt time:inXSDDateTime ?dti. \n FILTER(?dti>="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime) \n';
                intervalfilter = "?timeInterval time:hasBeginning/time:inXSDDateTime ?dti1. \n" +
                    " ?timeInterval time:hasEnd/time:inXSDDateTime ?dti2. \n" +
                    ' FILTER((?dti1 >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti1<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime) || (?dti2 >="' + $('#dtstart').val() + 'T00:00:00"^^xsd:dateTime && ?dti2<="' + $('#dtend').val() + 'T00:00:00"^^xsd:dateTime)). \n';
            }
            //alert(intervalfilter);
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
            if (!$('#cboxwkt').prop('checked')) {
                currentQueries = [];
                for (i = 0; i < queries.length; i++) {
                    if (i === 0 && !$('#cboxgeo').prop('checked')) continue;
                    let query = queries[i]['query'];
                    query = query.replace('tempofilter', tempofilter);
                    query = query.replace('intervalfilter', intervalfilter);
                    query = query.replace('spatialfilter', spatialfilter);
                    currentQueries.push({ "query": query, "title": queries[i]['title'] });
                    query = prefixesToQuery + query;
                    link = host + queryJSON + encodeURIComponent(query);
                    loadJSON(i, link, queries[i]['title']);
                }
            }
        });

        var featureLookup = [];
        function loadFeatureLookup() {
            $.each(featureQueries, function (type, query) {
                $.getJSON(host + queryJSON + encodeURIComponent(query), function (result) {
                    $.each(result['results']['bindings'], function (key, val) {
                        featureLookup.push({ "name": val['name']['value'], "desc": type });
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

        $('body').on('click', 'td a', function (e) {
            e.stopPropagation();
            window.open("RDFD.jsp?query=" + escape($(this).text().trim()), '', 'height=800,width=1500');
        });

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
                    }
                },
                theme: "square"
            };

            $("#feature").easyAutocomplete(options);
            // $('#feature').autocomplete({
            //   lookup: featureLookup,
            // onSelect: function (suggestion) {
            //    alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
            //}
            //});

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
        })
    </script>
</body>

</html>