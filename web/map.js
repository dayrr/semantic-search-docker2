var format = new ol.format.WKT();
var features = [];
var listnames = [];
var WMSLayers = [];
var FeatureLayers = [];
var clickToShow = false; //click on features to display their info or not

var source = new ol.source.Vector({ wrapX: false });
var draw = new ol.interaction.Draw({
    source: source,
    type: "Polygon",
});

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: ''
});

var mapDraw = new ol.Map({
    controls: ol.control.defaults({
        attribution: false,
        zoom: false,
        rotate: false,
        collapsible: false

    }).extend([mousePositionControl]),
    target: 'mapDraw',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([1.7, 46.7]),
        zoom: 6
    }),
    controls: [
        new ol.control.Zoom(),
        new ol.control.ScaleLine()
    ]
});

var target = mapDraw.getTarget();
var jTarget = typeof target === "string" ? $("#" + target) : $(target);
mapDraw.on("pointermove", function (evt) {
    if (clickToShow) {
        //detect feature at mouse coords
        var hit = mapDraw.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            return true;
        });

        if (hit) {
            jTarget.css("cursor", "pointer");
        } else {
            jTarget.css("cursor", "");
        }
    }
});

StationVectorSource = new ol.source.Vector({
    features: null      //add an array of features
});

TileVectorSource = new ol.source.Vector({
    features: null      //add an array of features
});

FeatureVectorSource = new ol.source.Vector({
    features: null      //add an array of features
});


RegionVectorSource = new ol.source.Vector({
    features: null      //add an array of features
});

RSVectorSource = new ol.source.Vector({
    features: null      //add an array of features
});

DrawingVectorSource = new ol.source.Vector({
    features: null      //add an array of features
});

DepartementVectorSource = new ol.source.Vector({
    features: null      //add an array of features
});

StationLayer = new ol.layer.Vector({
    source: StationVectorSource
});

FeatureLayer = new ol.layer.Vector({
    source: FeatureVectorSource,
    renderBuffer: 400
});


RSLayer = new ol.layer.Vector({
    source: RSVectorSource
});

TileLayer = new ol.layer.Vector({
    source: TileVectorSource
});

RegionLayer = new ol.layer.Vector({
    source: RegionVectorSource
});

DepartementLayer = new ol.layer.Vector({
    source: DepartementVectorSource
});

DrawLayer = new ol.layer.Vector({
    source: DrawingVectorSource
});


FeatureLayers.push({ "name": "Departement", "layer": DepartementLayer });
FeatureLayers.push({ "name": "Region", "layer": RegionLayer });
FeatureLayers.push({ "name": "Station", "layer": StationLayer });
FeatureLayers.push({ "name": "S2Tile", "layer": TileLayer });

$.each(WMSServices, function (idx, wms) {
    let tile = new ol.layer.Tile({
        title: wms['name'],
        visible: false,
        zIndex: 0,
        opacity: 0.3,
        source: new ol.source.TileWMS({
            url: wms['url'],
            params: { 'LAYERS': wms['layers'], 'TILED': true }
        })
    });
    WMSLayers.push({ "name": wms['name'], "layer": tile });
});


$.each(WMSLayers, function (idx, layer) {

    mapDraw.addLayer(layer["layer"]);
});

$.each(FeatureLayers, function (idx, layer) {
    layer['layer'].setVisible(false);
    mapDraw.addLayer(layer["layer"]);
});

mapDraw.addLayer(FeatureLayer);
mapDraw.addLayer(DrawLayer);
//viticol:AOC-VITICOLES:aire_parcellaire
//	CADASTRALPARCELS.PARCELLAIRE_EXPRESS:parcelle
//RPG.2017:parcelles_graphiques
//RPG.2017:ilots_anonymes
//RPG.2016:parcelles_graphiques


mapDraw.on('singleclick', function (evt) {
    if (clickToShow) {
        mapDraw.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            if (layer === FeatureLayer) {
                let id = feature.getId();
                viewFeature(id);
                //FeatureVectorSource.addFeatures(feature);
                feature.setStyle(null);
                FeatureVectorSource.refresh();
                mapDraw.updateSize();
            }
        });
    }
});

draw.on('drawend', function (event) {
    FeatureVectorSource.clear();
    let feat = event.feature;
    let co = format.writeGeometry(feat.getGeometry().transform('EPSG:3857', 'EPSG:4326'), { decimals: 4 });
    $('#drawncoords').html(co);
    //alert("The geometry is: " + co + "\n" + "Click RESET draw another one.")
    mapDraw.removeInteraction(draw);
    clickToShow = true;
    $('#geom').val($('#drawncoords').html());
    $('#geom').attr('title', $('#geom').val());
    search();
});

