var format = new ol.format.WKT();
var features = [];
var listnames = [];
var clickToShow = false; //click on features to display their info or not
var draw = new ol.interaction.Draw({
    source: source,
    type: "Polygon",
    style: drawStyle,

});

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: ''
});

var map = new ol.Map({
    controls: ol.control.defaults({
        attribution: false,
        zoom: false,
        rotate: false,
        collapsible: false

    }).extend([mousePositionControl]),
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([1.7, 46.7]),
        zoom: 6
    })
});

var cursorHoverStyle = "pointer";
var target = map.getTarget();
var jTarget = typeof target === "string" ? $("#" + target) : $(target);
var source = new ol.source.Vector({ wrapX: false });
var vector = new ol.layer.Vector({
    source: source,
    style: drawStyle
});
var drawStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'red',
        width: 2
    })
});



map.on("pointermove", function (evt) {
    //  var mouseCoordInMapPixels = [event.originalEvent.offsetX, event.originalEvent.offsetY];
    if (clickToShow) {
        //detect feature at mouse coords
        var hit = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            // alert(feature.get('name'));
            return true;
        });

        if (hit) {
            jTarget.css("cursor", cursorHoverStyle);
        } else {
            jTarget.css("cursor", "");
        }
    }
});


// Affichage des infos d'un navire 
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
}));
map.addOverlay(overlay);

closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

StationVectorSource = new ol.source.Vector({
    features: null      //add an array of features
    //,style: iconStyle     //to set the style for all your features...
});

TileVectorSource = new ol.source.Vector({
    features: null      //add an array of features
    //,style: iconStyle     //to set the style for all your features...
});

RegionVectorSource = new ol.source.Vector({
    features: null      //add an array of features
    //,style: iconStyle     //to set the style for all your features...
});

RSVectorSource = new ol.source.Vector({
    features: null      //add an array of features
    //,style: iconStyle     //to set the style for all your features...
});

DrawingVectorSource = new ol.source.Vector({
    features: null      //add an array of features
    //,style: iconStyle     //to set the style for all your features...
});

DepartementVectorSource = new ol.source.Vector({
    features: null      //add an array of features
    //,style: iconStyle     //to set the style for all your features...
});

StationLayer = new ol.layer.Vector({
    source: StationVectorSource
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

map.addLayer(TileLayer);
map.addLayer(StationLayer);
map.addLayer(RegionLayer);
map.addLayer(DepartementLayer);
map.addLayer(RSLayer);
map.addLayer(DrawLayer);
TileLayer.setVisible(false);
StationLayer.setVisible(false);
RegionLayer.setVisible(false);
DepartementLayer.setVisible(false);

map.on('singleclick', function (evt) {
    if (clickToShow) {
        map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            if (feature.getGeometry().getType() === "LineString")
                content.innerHTML = '<b> ID:</b>' + feature.get("id") + '</br><b>Land cover L1 </b> ' + feature.get("lc") + '</br><b>Land cover L2 </b> ' + feature.get("lc2") + '</br><b>Land cover L3 </b> ' + feature.get("lc3") + "</br><a class=\"ui-button ui-widget ui-corner-all\" href='javascript:go(\"" + feature.get("mmsi") + "\")'>Info</a>";
            else
                content.innerHTML = '<b> ID:</b>' + feature.get("id") + '</br><b>Name:</b>' + feature.get("name") + "</br><a class=\"ui-button ui-widget ui-corner-all\" href='javascript:go(\"" + feature.get("mmsi") + "\")'>Info</a>";

            overlay.setPosition(evt.coordinate);
        });
    }
    // var coordinate = evt.coordinate;
});



map.addLayer(vector);


draw.on('drawend', function (event) {
    let feat = event.feature;
    let co = format.writeGeometry(feat.getGeometry().transform('EPSG:3857', 'EPSG:4326'), { decimals: 4 });
    $('#drawncoords').html(co);
    alert("The geometry is: " + co + "\n" + "Click OK top accept or draw another one.")


    // map.removeInteraction(draw);
});

