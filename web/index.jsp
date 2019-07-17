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
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-treeview/1.2.0/bootstrap-treeview.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-treeview/1.2.0/bootstrap-treeview.min.js"></script>

    <script src="data.js"></script>
    <script src="jquery.easy-autocomplete.min.js"></script>
    <script src="jquery.easy-autocomplete.min.js"></script>
    <link href="semsearch.css" rel="stylesheet">
    <link href="easy-autocomplete.min.css" rel="stylesheet">
    <title>Semantic search</title>
</head>

<body>
    <input type='hidden' id='featureuri'>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <input type="checkbox" checked="checked" id="cboxdatetime"> <span
                            class="glyphicon glyphicon-calendar"></span>
                        When</div>
                    <div class="panel-body"> From <input type="date" id="dtstart" value="2017-04-01" min="2016-01-01"
                            max="2018-12-31">
                        To <input type="date" id="dtend" value="2017-05-01" min="2016-01-01" max="2018-12-31"></div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading"> <input type="checkbox" id="cboxsem"><span
                            class="glyphicon glyphicon-book"></span> What</div>
                    <div id="semantictree"></div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading"> <input type="checkbox" checked='checked' id="cboxgeo"><span
                            class="glyphicon glyphicon-map-marker"></span> Where</div>
                    <div class="panel-body" id="geosearch">
                        Search for a village <input id="feature" type="text" data-placement="top"
                            title="Please enter (a part of) the village name">
                        <button type="button" id='btnVillageSearch' class="btn btn-success">
                            <span class="fas fa-map-marked"></span>
                            Locate
                        </button>
                        <div id='drawncoords'></div>
                        <div id=" mouse-position" class="mouse-position"></div>
                        <div id="mapcontainerDraw">
                            <div id="mapDraw" class="map"></div>


                        </div>
                        <div style="text-align: center">
                            <button type="button" class="btn btn-success" id="btnWKTReset"> <span
                                    class="fas fa-redo-alt"></span> Clear all and Redraw </button>

                        </div>
                        <div id='layers'>
                            <div class="panel panel-default">
                                <div class="panel-heading">Map background layers (WMS)</div>
                                <div class="panel-body" id="WMSLayers">
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">Feature layers </div>
                                <div class="panel-body" id="FeatureLayers">

                                </div>
                            </div>
                        </div>
                        <div id='drawncoords'></div>


                    </div>
                </div>

            </div>
            <div class="col-md-8">
                <div id="village"></div>
                <div class="floatright">
                    <button type="button" id='btnGraphic' class="btn btn-success">Tabular mode</button>
                </div>
                <canvas id='meteochart'> </canvas>
                <div id='tabularresults'>
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
            </div>
        </div>
    </div>

    <script src="map.js"></script>
    <script src="ep.js"></script>
    <script src="main.js"></script>
</body>

</html>