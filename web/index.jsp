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
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
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
                <input type='hidden' id='featureuri'>
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
                        <input type="checkbox" checked="checked" id="cboxdatetime"> <span class="glyphicon glyphicon-calendar"></span>
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
                        <button type="button" id='btnsem' data-toggle="modal" data-target="#semdialog"
                            class="btn btn-success"> Add </button>
                    </div>

                </div>
            </div>
            <div class="col-md-1">
                <button type="button" id='btnGraphic' class="btn btn-success">Graphical mode</button>
                <button type="button" id='btnSearch' class="btn btn-success"> <span
                        class="glyphicon glyphicon-search"></span>
                    Search
                </button>
            </div>
        </div>




        <div id='graphic'><canvas id='meteochart'> </canvas></div>
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
            <div id='title7'> </div>
            <div id='list7'></div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="geoviz">
        <div class="modal-dialog modal-lg">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <button class="close modalMinimize"> <i class='fa fa-minus'></i> </button>
                    <h4 class="modal-title">Draw the geolocation. Double click to finish drawing.</h4>
                </div>
                <div class="modal-body">
                    <div id="mouse-position" class="mouse-position"></div>
                    <div id="mapcontainerDraw">
                        <div id="mapDraw" class="map"></div>
                        <div id="popup" class="ol-popup">
                            <a href="#" id="popup-closer" class="ol-popup-closer"></a>
                            <div id="popup-content"></div>

                        </div>

                    </div>

                    <div id='layers'>
                        <input type="checkbox" name='layer' value='cadastre'> Cadastre<br>
                        <input type="checkbox" name='layer' value='clc2012'> CLC 2012<br>
                        <input type="checkbox" name='layer' value='clc2018'> CLC 2018<br>
                         <input type="checkbox" name='layer' value='rpg2016'> RPG 2016<br>
                        <input type="checkbox" name='layer' value='rpg2017'> RPG 2017<br>
                        <input type="checkbox" name='layer' value='spot2017'> SPOT 2017<br>
                        <input type="checkbox" name='layer' value='spot2018'> SPOT 2018<br>
                        <input type="checkbox" name='layer' value='vit'> Viticulture<br>
                        <input type="checkbox" name='layer' value='veg'>Vegetation<br>
                        <input type="checkbox" name='layer' value='cesbio'> Cesbio LC 2014<br>
                        <input type="checkbox" name='layer' value='tile'> Sentinel tile <br>
                        <input type="checkbox" name='layer' value='station'> Meteo Station <br>
                        <input type="checkbox" name='layer' value='region'> Region <br>
                        <input type="checkbox" name='layer' value='departement'> Departement <br>

                    </div>
                    <div id='drawncoords'></div>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-success" id="btnWKTReset">Reset</button>
                    <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>



    <!-- Modal -->
    <div class="modal fade mymodal" id="querydialog" role="dialog">
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

    <div class="modal fade" id="semdialog" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Semantic</h4>
                </div>
                <div class="modal-body">
                    <select id="listseml1" size="8" multiple='multiple'>
                        <option value="1" selected='selected'>NDVI index</option>
                        <option value="2">Change detection level</option>
                        <option value="3"> Vineyard health survey </option>
                    </select>
                    <select id="listseml21" size="8" multiple='multiple'> </select>
                    <select id="listseml22" size="8" multiple='multiple'> </select>
                    <select id="listseml23" size="8" multiple='multiple'> </select>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id='btnAddSem'>Add</button>
                    <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade mymodal" id="prefixesdialog" role="dialog">
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

    <script src="map.js"></script>
    <script src="ep.js"></script>
    <script src="main.js"></script>
</body>

</html>