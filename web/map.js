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
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://cyan.ups-tlse.fr:8080/geoserver/Theia_OSO/wms?',
        serverType: 'geoserver',
        params: { 'LAYERS': 'Theia_OSO:Classif_France2014_refV3v7_regionClimat_ColorIndexed_4urban', 'TILED': true }
    })
})


IGNCadastreLayer = new ol.layer.Tile({
    title: 'Parcelles cadastrales IGN OK',
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://wxs.ign.fr/4i3ybkskcwog7hzyfw32fbub/geoportail/r/wms?',
        params: { 'LAYERS': 'CADASTRALPARCELS.PARCELS', 'TILED': true, 'style':'bdparcellaire' }
    })
})

ViticultureLayer= new ol.layer.Tile({
    title: 'Viticulture',
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://wxs.ign.fr/4i3ybkskcwog7hzyfw32fbub/geoportail/r/wms?',
        params: { 'LAYERS': 'Aire-Parcellaire', 'TILED': true }
    })
})

IGNVegetationLayer= new ol.layer.Tile({
    title: 'Vegetation IGN OK',
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://wxs.ign.fr/4i3ybkskcwog7hzyfw32fbub/geoportail/v/wms?',
        params: { 'LAYERS': 'BDTOPO-GEOPO-VEGETATION_WLD_WGS84G', 'TILED': true }
    })
})

SPOT2017= new ol.layer.Tile({
    title: 'Vegetation IGN OK',
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://wxs.ign.fr/4i3ybkskcwog7hzyfw32fbub/geoportail/r/wms?',
        params: { 'LAYERS': 'ORTHOIMAGERY.ORTHOPHOTOS.ORTHO-EXPRESS.2017', 'TILED': true }
    })
})

SPOT2018= new ol.layer.Tile({
    title: 'Vegetation IGN OK',
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://wxs.ign.fr/4i3ybkskcwog7hzyfw32fbub/geoportail/r/wms?',
        params: { 'LAYERS': 'ORTHOIMAGERY.ORTHOPHOTOS.ORTHO-EXPRESS.2018', 'TILED': true }
    })
})






IGNRPG2016 = new ol.layer.Tile({
    title: 'RPG IGN 2016 OK',
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://wxs.ign.fr/4i3ybkskcwog7hzyfw32fbub/geoportail/r/wms?',
        params: { 'LAYERS': 'LANDUSE.AGRICULTURE2016', 'TILED': true }
    })
})

IGNRPG2017 = new ol.layer.Tile({
    title: 'RPG IGN 2017 OK',
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://wxs.ign.fr/4i3ybkskcwog7hzyfw32fbub/geoportail/r/wms?',
        params: { 'LAYERS': 'LANDUSE.AGRICULTURE2017', 'TILED': true }
    })
})


CLC2018 = new ol.layer.Tile({
    title: 'Corine LC 2018',
    visible: false,
    source: new ol.source.TileWMS({
        url: 'https://wxs.ign.fr/corinelandcover/geoportail/r/wms?',
        params: { 'LAYERS': 'LANDCOVER.CLC18_FR', 'TILED': true}
    })
})

CLC2012 = new ol.layer.Tile({
    title: 'Corine LC 2012R',
    visible: false,
    source: new ol.source.TileWMS({
        url: 'https://wxs.ign.fr/corinelandcover/geoportail/r/wms?',
        params: { 'LAYERS': 'LANDCOVER.CLC12R_FR', 'TILED': true}
    })
})

//viticol:AOC-VITICOLES:aire_parcellaire
//	CADASTRALPARCELS.PARCELLAIRE_EXPRESS:parcelle
//RPG.2017:parcelles_graphiques
//RPG.2017:ilots_anonymes
//RPG.2016:parcelles_graphiques




mapDraw.addLayer(SPOT2017);
mapDraw.addLayer(SPOT2018);
mapDraw.addLayer(ViticultureLayer);
mapDraw.addLayer(TileLayer);
mapDraw.addLayer(CLC2018);
mapDraw.addLayer(CLC2012);
mapDraw.addLayer(IGNRPG2016);
mapDraw.addLayer(IGNRPG2017);
mapDraw.addLayer(IGNVegetationLayer);
mapDraw.addLayer(IGNCadastreLayer);
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
CesbioLayer.setOpacity(0.3);
CLC2018.setVisible(false);
CLC2018.setZIndex(0);
CLC2018.setOpacity(0.3);
CLC2012.setVisible(false);
CLC2012.setZIndex(0);
CLC2012.setOpacity(0.3);
IGNCadastreLayer.setVisible(false);
IGNCadastreLayer.setOpacity(0.4);

IGNRPG2016.setVisible(false);
IGNRPG2016.setZIndex(0);
IGNRPG2016.setOpacity(0.3);

SPOT2017.setVisible(false);
SPOT2017.setZIndex(0);
SPOT2017.setOpacity(0.3);


SPOT2018.setVisible(false);
SPOT2018.setZIndex(0);
SPOT2018.setOpacity(0.3);

ViticultureLayer.setVisible(false);
ViticultureLayer.setZIndex(0);
ViticultureLayer.setOpacity(0.3);


IGNRPG2017.setVisible(false);
IGNRPG2017.setZIndex(0);
IGNRPG2017.setOpacity(0.3);

IGNVegetationLayer.setVisible(false);
IGNVegetationLayer.setZIndex(0);
IGNVegetationLayer.setOpacity(0.3);





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

