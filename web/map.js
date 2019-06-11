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

var mousePositionControl0 = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position0'),
    undefinedHTML: ''
});



/* var map = new ol.Map({
    controls: ol.control.defaults({
        attribution: false,
        zoom: false,
        rotate: false,
        collapsible: false

    }).extend([mousePositionControl0]),
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
}); */

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

var cursorHoverStyle = "pointer";
var target = mapDraw.getTarget();
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



mapDraw.on("pointermove", function (evt) {
    //  var mouseCoordInmapDrawPixels = [event.originalEvent.offsetX, event.originalEvent.offsetY];
    if (clickToShow) {
        //detect feature at mouse coords
        var hit = mapDraw.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
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
mapDraw.addOverlay(overlay);






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

FeatureVectorSource = new ol.source.Vector({
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

FeatureLayer = new ol.layer.Vector({
    source: FeatureVectorSource
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

CesbioLayer = new ol.layer.Tile({
    title: '2014 Stratification 4 urban classes',
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://cyan.ups-tlse.fr:8080/geoserver/Theia_OSO/wms?',
        serverType: 'geoserver',
        params: { 'LAYERS': 'Theia_OSO:Classif_France2014_refV3v7_regionClimat_ColorIndexed_4urban', 'TILED': true }
    })
})

mapDraw.addLayer(TileLayer);
mapDraw.addLayer(StationLayer);
mapDraw.addLayer(RegionLayer);
mapDraw.addLayer(DepartementLayer);
mapDraw.addLayer(RSLayer);
mapDraw.addLayer(DrawLayer);
mapDraw.addLayer(FeatureLayer);
mapDraw.addLayer(vector);
mapDraw.addLayer(CesbioLayer);
TileLayer.setVisible(false);
StationLayer.setVisible(false);
RegionLayer.setVisible(false);
DepartementLayer.setVisible(false);
CesbioLayer.setVisible(false);
CesbioLayer.setZIndex(0);
CesbioLayer.setOpacity(0.2);


mapDraw.on('singleclick', function (evt) {
    if (clickToShow) {
        mapDraw.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {

            let uri = feature.get("uri");
            // alert(uri);
            content.innerHTML = '<b> Name:</b>' + feature.get("name") + '</br><b>URI:</b> ' + uri;//+
            //    '</br><a class="ui-button ui-widget ui-corner-all" href="javascript:viewFeature(\'' + uri + '\');">View</a>';

            overlay.setPosition(evt.coordinate);
            viewFeature(uri);
        });
    }
    // var coordinate = evt.coordinate;
});







draw.on('drawend', function (event) {
    let feat = event.feature;
    let co = format.writeGeometry(feat.getGeometry().transform('EPSG:3857', 'EPSG:4326'), { decimals: 4 });
    $('#drawncoords').html(co);
    alert("The geometry is: " + co + "\n" + "Click RESET draw another one.")
    mapDraw.removeInteraction(draw);
    clickToShow = true;
    $('#geom').val($('#drawncoords').html());
    $('#geom').attr('title', $('#geom').val());
    $('#btnSearch').click();
    $('#geoviz').css('margin-top', (Math.floor((window.innerHeight - $('#geoviz').offsetHeight) / 2) + 'px'));


});

