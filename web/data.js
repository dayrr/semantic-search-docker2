var WMSServices = [{
    "name": "Cesbio2014",
    "url": "http://cyan.ups-tlse.fr:8080/geoserver/Theia_OSO/wms?",
    "layers": "Theia_OSO:Classif_France2014_refV3v7_regionClimat_ColorIndexed_4urban"
},
{
    "name": "Cadastral",
    "url": "http://wxs.ign.fr/nxs15w617bw96zo31sbc2za8/geoportail/r/wms?",
    "layers": "CADASTRALPARCELS.PARCELS"
},
{
    "name": "Viticulture",
    "url": "http://wxs.ign.fr/nxs15w617bw96zo31sbc2za8/geoportail/r/wms?",
    "layers": "Aire-Parcellaire"
},

{
    "name": "SPOT2017",
    "url": "http://wxs.ign.fr/nxs15w617bw96zo31sbc2za8/geoportail/r/wms?",
    "layers": "ORTHOIMAGERY.ORTHOPHOTOS.ORTHO-EXPRESS.2017"
},
{
    "name": "SPOT2018",
    "url": "http://wxs.ign.fr/nxs15w617bw96zo31sbc2za8/geoportail/r/wms?",
    "layers": "ORTHOIMAGERY.ORTHOPHOTOS.ORTHO-EXPRESS.2018"
},

{
    "name": "RPG2016",
    "url": "http://wxs.ign.fr/nxs15w617bw96zo31sbc2za8/geoportail/r/wms?",
    "layers": "LANDUSE.AGRICULTURE2016"
},


{
    "name": "RPG2017",
    "url": "http://wxs.ign.fr/4i3ybkskcwog7hzyfw32fbub/geoportail/r/wms?",
    "layers": "LANDUSE.AGRICULTURE2017"
},

{
    "name": "CorineLC2018",
    "url": "https://wxs.ign.fr/corinelandcover/geoportail/r/wms?",
    "layers": "LANDCOVER.CLC18_FR"
},

{
    "name": "CorineLC2012R",
    "url": "https://wxs.ign.fr/corinelandcover/geoportail/r/wms?",
    "layers": "LANDCOVER.CLC18_FR"
},
];





var changes = [
    {
        "name": "No change (%)",
        "uri": "http://melodi.irit.fr/ontologies/cd.owl#NoChange",
        "class":"change:NoChange", 
        "color": "#ffe119",
        "key": "No"
    },
    {
        "name": "Low change (%)",
        "uri": "http://melodi.irit.fr/ontologies/cd.owl#LowChange",
        "class":"change:LowChange", 
        "color": "#4363d8",
        "key": "Low"
    },
    {
        "name": "Middle change (%)",
        "uri": "http://melodi.irit.fr/ontologies/cd.owl#MidChange",
        "class":"change:MidChange", 
        "color": "#f58231",
        "key": "Mid"

    },
    {
        "name": "High change (%)",
        "uri": "http://melodi.irit.fr/ontologies/change.owl#HighChange",
        "class":"change:HighChange", 
        "color": "#3cb44b",
        "key": "High"

    }
];
var ndvis = [
    {
        "name": "Low vegetation (%)",
        "uri": "http://melodi.irit.fr/ontologies/ndvi.owl#LowVegetation",
        "color": "#4363d8",
        "key": "Low"
    },
    {
        "name": "Middle vegetation (%)",
        "uri": "http://melodi.irit.fr/ontologies/ndvi.owl#MidVegetation",
        "color": "#f58231",
        "key": "Mid"

    },
    {
        "name": "High vegetation (%)",
        "uri": "http://melodi.irit.fr/ontologies/ndvi.owl#HighVegetation",
        "color": "#3cb44b",
        "key": "High"
    }
];

var damages = [
    {
        "name": "No damage (%)",
        "uri": "http://melodi.irit.fr/ontologies/vineyard.owl#None",
        "color": "#ffe119"
    },
    {
        "name": "Low damage (%)",
        "uri": "http://melodi.irit.fr/ontologies/vineyard.owl#Low",

        "color": "#4363d8"
    },
    {
        "name": "Middle damage (%)",
        "uri": "http://melodi.irit.fr/ontologies/vineyard.owl#Mid",
        "color": "#f58231"
    },
    {
        "name": "High damage (%)",
        "uri": "http://melodi.irit.fr/ontologies/vineyard.owl#High",
        "color": "#3cb44b"
    }
    ,
    {
        "name": "Very high damage (%)",
        "uri": "http://melodi.irit.fr/ontologies/vineyard.owl#VeryHigh",
        "color": "#8cb49b"
    }
];

var mesures = [
    {
        "name": "Atmospheric Pressure (Pa)",
        "uri": "pmer",
        "color": "aqua"
    },
    {
        "name": "Atmospheric Pressure Variation (Pa)",
        "uri": "tend",
        "color": "black"
    },
    {
        "name": "Wind Direction (DegreeAngle)",
        "uri": "dd",
        "color": "blue"
    },
    {
        "name": "Wind Speed (m/s)",
        "uri": "ff",
        "color": "fuchsia"
    },
    {
        "name": "Temperature (Kelvin)",
        "uri": "t",
        "color": "green"
    },
    {
        "name": "Temperature 2 (Kelvin)",
        "uri": "td",
        "color": "lime"
    },
    {
        "name": "Humidity (%)",
        "uri": "u",
        "color": "maroon"
    },

    {
        "name": "Visibility (m)",
        "uri": "vv",
        "color": "navy"
    },

    //   {
    //        "name":"Atmospheric Pressure (Pa)",
    //        "uri":"ww"
    //    },

    {
        "name": "Cloud Cover (octa)",
        "uri": "hbas",
        "color": "olive"
    },
    {
        "name": "Station Atmospheric Pressure (Pa)",
        "uri": "pres",
        "color": "orange"
    },
    {
        "name": "Ground Temperature (Kelvin)",
        "uri": "tminsol",
        "color": "purple"
    },
]

var featureQueries =
{

    "commune":
        "select ?uri ?name  where { "
        + "?uri a admin:Commune. "
        + "?uri admin:name ?name.}"
}


var prefixes = [{
    "prefix": "sosa",
    "uri": "http://www.w3.org/ns/sosa/"
},
{
    "prefix": "time",
    "uri": "http://www.w3.org/2006/time#"
},

{
    "prefix": "mfo",
    "uri": "http://melodi.irit.fr/ontologies/mfo.owl#"
},


{
    "prefix": "qudt-1-1",
    "uri": "http://qudt.org/1.1/schema/qudt#"
},

{
    "prefix": "qudt-unit-1-1",
    "uri": "http://qudt.org/1.1/vocab/unit#"
},

{
    "prefix": "vy",
    "uri": "http://melodi.irit.fr/ontologies/vineyard.owl#"
},



{
    "prefix": "geo",
    "uri": "http://www.opengis.net/ont/geosparql#"
},

{
    "prefix": "admin",
    "uri": "http://melodi.irit.fr/ontologies/administrativeUnits.owl#"
},

{
    "prefix": "strdf",
    "uri": "http://strdf.di.uoa.gr/ontology#"
},


{
    "prefix": "ndvi",
    "uri": "http://melodi.irit.fr/ontologies/ndvi.owl#"
},


{
    "prefix": "grid",
    "uri": "http://melodi.irit.fr/ontologies/grid.owl#"
},
{
    "prefix": "geof",
    "uri": "http://www.opengis.net/def/function/geosparql/"
},

{
    "prefix": "eom",
    "uri": "http://melodi.irit.fr/ontologies/eom.owl#"
},


{
    "prefix": "xsd",
    "uri": "http://www.w3.org/2001/XMLSchema#"
},


{
    "prefix": "mfe",
    "uri": "http://melodi.irit.fr/ontologies/mfe.owl#"
},

{
    "prefix": "change",
    "uri": "http://melodi.irit.fr/ontologies/cd.owl#"
},
{
    "prefix": "rdf",
    "uri": "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
},
{
    "prefix": "rdfs",
    "uri": "http://www.w3.org/2000/01/rdf-schema#"
},
{
    "prefix": "dcat",
    "uri": "http://www.w3.org/ns/dcat#"
},

{
    "prefix": "owl",
    "uri": "http://www.w3.org/2002/07/owl#"
},
{
    "prefix": "prov-o",
    "uri": "http://www.w3.org/TR/prov-o/"
}

];


var queryVillage = [{
    "query": "SELECT ?uri ?name ?wkt \n WHERE \n" +
        " { \n ?uri a admin:Commune. \n" +
        " ?uri admin:name ?name. \n" +
        " filter(?uri=<http://melodi.irit.fr/resource/Commune/?featureURI>). \n" +
        " ?uri geo:hasGeometry ?geo. \n" +
        " ?geo geo:asWKT ?wkt. \n" +
        "  } ", "title": "Administrative units dataset"
}];

var semantictree = [
    {
        text: "Change level",
        nodes: [
            {
                text: "No change",
                uri: "<http://melodi.irit.fr/ontologies/change.owl#NoChange>",
                class:"change:NoChange", 
            },
            {
                text: "Low change",
                uri: "<http://melodi.irit.fr/ontologies/change.owl#LowChange>",
                class:"change:LowChange", 
            },
            {
                text: "Middle change",
                uri: "<http://melodi.irit.fr/ontologies/change.owl#MidChange>",
                class:"change:MidChange", 
            },
            {
                text: "High change",
                uri: "<http://melodi.irit.fr/ontologies/change.owl#HighChange>",
                class:"change:HighChange", 
            }
        ]
    }
	/*,
    {
        text: "NDVI level",
        nodes: [
            {
                text: "Low vegetation",
                uri: "<http://melodi.irit.fr/ontologies/ndvi.owl#LowVegetation>"
            },
            {
                text: "Middle vegetation",
                uri: "<http://melodi.irit.fr/ontologies/ndvi.owl#MidVegetation>"
            },
            {
                text: "High vegetation",
                uri: "<http://melodi.irit.fr/ontologies/ndvi.owl#HighVegetation>"
            }
        ]
    },
    {
        text: "Vinyard health damage level",
        nodes: [
            {
                text: "No damage",
                uri: "<http://melodi.irit.fr/ontologies/vineyard.owl#None>"
            },
            {
                text: "Low damage",
                uri: "<http://melodi.irit.fr/ontologies/vineyard.owl#Low>"
            },
            {
                text: "Middle damage",

                uri: "<http://melodi.irit.fr/ontologies/vineyard.owl#Mid>"
            },
            {
                text: "High damage",

                uri: "<http://melodi.irit.fr/ontologies/vineyard.owl#High>"
            },
            {
                text: "Very high damage",

                uri: "<http://melodi.irit.fr/ontologies/vineyard.owl#VeryHigh>"
            }
        ]
    }
	*/
];



var wktQueries =
{
    "Station":
        "prefix mfo: <http://melodi.irit.fr/ontologies/mfo.owl#>"
        + "prefix geo: <http://www.opengis.net/ont/geosparql#>  "
        + "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> "
        + "select ?name ?wkt where "
        + "{ ?s a mfo:Station. "
        + "?s mfo:name  ?name . "
        + "?s geo:hasGeometry ?geo."
        + "?geo geo:asWKT ?wkt."
        + "}",
    "S2Tile":
        "prefix mfo:<http://melodi.irit.fr/ontologies/mfo.owl#> "
        + "prefix geo:<http://www.opengis.net/ont/geosparql#> "
        + "prefix grid:<http://melodi.irit.fr/ontologies/grid.owl#> "
        + "select ?name ?wkt where "
        + "{"
        + "?s a grid:Tile. "
        + "?s grid:id ?name."
        + "?s geo:hasGeometry ?geo. "
        + " ?geo geo:asWKT ?wkt. "
        + "}",
    "Region":
        "prefix oau: <http://melodi.irit.fr/ontologies/administrativeUnits.owl#> "
        + "prefix geo: <http://www.opengis.net/ont/geosparql#> "
        + "select ?name ?wkt where { "
        + "?u a oau:Region . "
        + "?u oau:name ?name. "
        + "?u geo:hasGeometry ?geo. "
        + "?geo geo:asWKT ?wkt. }"
    ,
    "Departement":
        "prefix oau: <http://melodi.irit.fr/ontologies/administrativeUnits.owl#> "
        + "prefix geo: <http://www.opengis.net/ont/geosparql#> "
        + "select ?name ?wkt where { "
        + "?u a oau:Departement . "
        + "?u oau:name ?name. "
        + "?u geo:hasGeometry ?geo. "
        + "?geo geo:asWKT ?wkt. }"
};

var queriesFeatureSemantic = [{
    "query": "SELECT ?uri ?name ?wkt \n" +
        " WHERE \n{  \n" +
        " ?obs a vy:VineyardObservation. \n" +
        " ?obs vy:hasDeterioration semanticfilter. \n" +
        " ?obs vy:hasFeatureOfInterest ?uri. \n" +
        " ?uri admin:hasName ?name. \n" +
        " ?uri admin:hasSpatialRepresentation ?fea. \n" +
        " ?fea geo:hasGeometry ?geo. \n" +
        " ?geo geo:asWKT ?wkt. \n spatialfilter" +
        " ?obs vy:hasTime ?timeInterval.   \n intervalfilter" +
        "} limit 200", "title": "Commune by vineyard health survey"

},




{
    "query": "Select ?uri ?wkt ?landcover\n" +
        "WHERE \n { \n" +
        "?change a semfilter. \n"+
        "?change dcat:dataset ?ds. \n" +
        "?uri change:hasChangeCatalog ?ds. \n" +
        "?uri geo:hasGeometry/geo:asWKT ?wkt. \n spatialfilter" +
        "?change change:hasPercentage ?percentage. \n" +
        "filter(?percentage>=30) \n" +
        "?activity prov-o:generated ?ds. \n" +
        "?activity prov-o:usedImage1 ?img1. \n" +
        "?activity prov-o:usedImage2 ?img2. \n" +
        "?img1 sosa:resultTime ?dt1. \n" +
        "?img2 sosa:resultTime ?dt2. \n" +
        "?uri admin:hasLandCover ?lc. \n" +
        "?lc admin:name ?landcover. \n" +
        "} limit 1000",


    "title": "Parcel by change level"

},

{
    "query": "SELECT distinct ?uri ?name ?wkt \n" +
        "   WHERE { \n" +
        "   ?uri ndvi:hasNdvi ?ndvi. \n" +
        "   ?ndvi a semanticfilter. \n" +
        "   ?ndvi prov:wasGeneratedBy ?action. \n" +
        "   ?action prov:startedAtTime ?dti. \n instantfilter" +
        "   ?ndvi ndvi:hasNdviPercentage ?percentage. filter(?percentage >= 10). \n" +
        "   ?uri admin:hasSpatialRepresentation ?fea. \n" +
        "   ?uri admin:hasName ?name. \n" +
        "   ?fea geo:hasGeometry/geo:asWKT ?wkt. \n spatialfilter} limit 200", "title": "Commune by ndvi"

}];


var queriesDoc = [
    {
        "query": "Select ?contenance ?number ?landcover ?village (strdf:area(strdf:transform(?wkt, <http://www.opengis.net/def/crs/EPSG/2154>))/10000 as ?area_ha) \n WHERE \n{ \n" +
            " ?parcel a admin:Parcel." +
            " filter(?parcel = ?featurefilterDoc). \n" +
            " ?parcel admin:contenance ?contenance. \n" +
            " ?parcel admin:hasLandCover ?lc. \n" +
            " ?lc admin:name ?landcover. \n" +
            " ?parcel admin:belongsTo ?village.   \n" +
            " ?parcel admin:number ?number.  \n" +
            " ?parcel geo:hasGeometry/geo:asWKT ?wkt.}\n", "title": "Cadastral"
    },
    {
        "query": "SELECT ?village ?name ?population ?area ?insee \n WHERE \n" +
            " { \n ?featurefilterDoc admin:belongsTo ?village. \n" +
            " ?village admin:name ?name. \n" +
            " ?village admin:population ?population. \n" +
            " ?village admin:area ?area. \n" +
            " ?village owl:sameAs ?insee. " +
            "  } ", "title": "Administrative unit"
    },

    {
        "query": "SELECT ?observation ?tile ?dti ?type ?link ?size ?quicklook \n" +
            "WHERE {  \n" +
            "?observation a eom:EarthObservation. \n" +
            "?observation sosa:hasFeatureOfInterest ?tile. \n" +
            "?tile geo:hasGeometry/geo:asWKT ?wktTile. \n " +
            "?featurefilterDoc geo:hasGeometry/geo:asWKT ?wktP. \n" +
            "filter(geof:sfContains(?wktTile, ?wktP)). \n" +
            "?observation sosa:resultTime ?dti. \n instantfilter" +
            "?observation sosa:hasResult ?result. " +
            "?result eom:browseFileName  ?quicklook. " +
            "?result eom:title   ?product. " +
            "?result eom:fileName  ?link." +
            "?result eom:fileSize ?size. " +
            "?result eom:type ?type. " +
            " } order by ?dti", "title": "Earth observation"
    },




    {
        "query": "SELECT ?observation ?dti ?procedure ?sensor ?value \n WHERE \n" +
            "{ \n" +
            "?featurefilterDoc admin:belongsTo ?village. \n" +
            "?feature mfo:includes ?village. \n" +
            "?observation a mfo:Observation. \n" +
            "?observation sosa:hasFeatureOfInterest ?feature. \n" +
            "?observation sosa:resultTime ?dti. \n instantfilter" +
            "?observation sosa:hasResult ?result. \n" +
            "?result qudt-1-1:numericValue ?value. \n" +
            "?observation sosa:observedProperty ?obsprop. \n" +
            "?observation sosa:madeBySensor ?sensor. \n" +
            "?observation sosa:usedProcedure ?procedure. \n" +
            "} order by ?dti", "title": "Weather forecast"
    },


    {
        "query": "Select ?change ?dti1 ?dti2 ?percentage \n WHERE \n{ \n" +
            "?featurefilterDoc change:hasChangeCatalog ?ds. \n" +
            "?change dcat:dataset ?ds. \n" +
            "?change change:hasPercentage ?percentage. \n" +
            "?activity prov-o:generated ?ds. \n" +
            "?activity prov-o:usedImage1 ?img1. \n" +
            "?activity prov-o:usedImage2 ?img2. \n" +
            "?img1 sosa:resultTime ?dti1. \n" +
            "?img2 sosa:resultTime ?dti2. \n" +
            "} order by ?dti1", "title": "Change detection"
    },


    /*
    {
        "query": "SELECT ?observation ?dti1 ?dti2 ?deterioration \n" +
            " WHERE \n{  \n" +
            " ?observation a vy:VineyardObservation. \n" +
            " ?observation vy:hasFeatureOfInterest ?featurefilterDoc. \n" +
            " ?observation vy:hasTime ?timeInterval.   \n intervalfilter" +
            " ?observation vy:hasDeterioration ?deterioration. \n" +
            "} limit 200", "title": "Vineyard health survey"
    },
    */
    {
        "query": " SELECT ?ndvi ?dti ?percentage \n" +
            "   WHERE { \n" +
            "   ?featurefilterDoc ndvi:hasNDVICatalog ?ds. \n" +
            "   ?ndvi dcat:dataset ?ds. \n" +
            "   ?ndvi ndvi:hasPercentage ?percentage.  \n" +
            "   ?activity prov-o:generated ?ds. \n" +
            "   ?activity prov-o:used ?img. \n" +
            "	?img sosa:resultTime ?dti. instantfilterzone" +
            "} order by ?dti", "title": "NDVI"
    },
    {
        "query": "SELECT ?observation ?dti ?place ?title ?keyword  ?topic ?fact ?description \n" +
            " WHERE {  \n" +
            "?observation a mfe:Event. \n" +
            "?observation mfe:hasFeatureOfInterest ?place.  \n" +
            "?place geo:hasGeometry/geo:asWKT ?wktPlace. \n" +
            "?featurefilterDoc geo:hasGeometry/geo:asWKT ?wktP. \n" +
            "filter(geof:sfContains(?wktPlace, ?wktP)). \n" +
            "?observation mfe:title ?title. \n" +
            "?observation mfe:keyword ?keyword. \n" +
            "?observation mfe:topic ?topic. \n" +
            "?observation mfe:fact ?fact. \n" +
            "?observation mfe:description ?description. \n" +
            "?observation mfe:startDate ?dti. \n instantfilterzone" +
            "} limit 200", "title": "Weather newsletters"
    }

];


