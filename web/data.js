var changes = [
    {
        "name": "No change (%)",
        "uri": "http://melodi.irit.fr/ontologies/change.owl#NoChange",
        "color": "#ffe119"
    },
    {
        "name": "Low change (%)",
        "uri": "http://melodi.irit.fr/ontologies/change.owl#LowChange",
        "color": "#4363d8"
    },
    {
        "name": "Middle change (%)",
        "uri": "http://melodi.irit.fr/ontologies/change.owl#MidChange",
        "color": "#f58231"
    },
    {
        "name": "High change (%)",
        "uri": "http://melodi.irit.fr/ontologies/change.owl#HighChange",
        "color": "#3cb44b"
    }
]
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
        "prefix oau: <http://melodi.irit.fr/ontologies/administrativeUnits.owl#> "
        + "prefix geo: <http://www.opengis.net/ont/geosparql#> "
        + "select ?uri ?name  where { "
        + "?uri a oau:Commune . "
        + "?uri oau:hasName ?name.}"
}


var featureQueries2 =
{
    "station":
        "prefix mfo: <http://melodi.irit.fr/ontologies/mfo.owl#>"
        + "prefix geo: <http://www.opengis.net/ont/geosparql#>  "
        + "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> "
        + "select ?name where "
        + "{ ?s a mfo:MeteoStation. "
        + "?s rdfs:label  ?name . "
        + "}",
    "tile":
        "prefix mfo:<http://melodi.irit.fr/ontologies/mfo.owl#> "
        + "prefix geo:<http://www.opengis.net/ont/geosparql#> "
        + "prefix grid:<http://melodi.irit.fr/ontologies/grid.owl#> "
        + "select ?name where "
        + "{"
        + "?s a grid:Tile. "
        + "?s grid:id ?name."
        + "}",
    "region":
        "prefix oau: <http://melodi.irit.fr/ontologies/administrativeUnits.owl#> "
        + "prefix geo: <http://www.opengis.net/ont/geosparql#> "
        + "select ?name where { "
        + "?u a oau:Region . "
        + "?u oau:hasName ?name. }",
    "departement":
        "prefix oau: <http://melodi.irit.fr/ontologies/administrativeUnits.owl#> "
        + "prefix geo: <http://www.opengis.net/ont/geosparql#> "
        + "select ?name  where { "
        + "?u a oau:Departement . "
        + "?u oau:hasName ?name.}"
}

var wktQueries =
{
    "station":
        "prefix mfo: <http://melodi.irit.fr/ontologies/mfo.owl#>"
        + "prefix geo: <http://www.opengis.net/ont/geosparql#>  "
        + "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> "
        + "select ?name ?wkt where "
        + "{ ?s a mfo:MeteoStation. "
        + "?s rdfs:label  ?name . "
        + "?s geo:hasGeometry ?geo."
        + "?geo geo:asWKT ?wkt."
        + "}",
    "tile":
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
    "region":
        "prefix oau: <http://melodi.irit.fr/ontologies/administrativeUnits.owl#> "
        + "prefix geo: <http://www.opengis.net/ont/geosparql#> "
        + "select ?name ?wkt where { "
        + "?u a oau:Region . "
        + "?u oau:hasName ?name. "
        + "?u oau:hasSpatialRepresentation ?s. "
        + "?s geo:hasGeometry ?geo. "
        + "?geo geo:asWKT ?wkt. }"
    ,
    "departement":
        "prefix oau: <http://melodi.irit.fr/ontologies/administrativeUnits.owl#> "
        + "prefix geo: <http://www.opengis.net/ont/geosparql#> "
        + "select ?name ?wkt where { "
        + "?u a oau:Departement . "
        + "?u oau:hasName ?name. "
        + "?u oau:hasSpatialRepresentation ?s. "
        + "?s geo:hasGeometry ?geo. "
        + "?geo geo:asWKT ?wkt. }"
};


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
    "prefix": "l-mfo",
    "uri": "http://melodi.irit.fr/lod/mfo/"
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
    "prefix": "l-vy",
    "uri": "http://melodi.irit.fr/lod/vineyard/"
},

{
    "prefix": "l-admin",
    "uri": "http://melodi.irit.fr/lod/administrativeUnit/"
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
    "prefix": "ndvi",
    "uri": "http://melodi.irit.fr/ontologies/ndvi.owl#"
},

{
    "prefix": "g-ndvi",
    "uri": "http://melodi.irit.fr/lod/ndvi/"
},

{
    "prefix": "l-grid",
    "uri": "http://melodi.irit.fr/lod/grid/"
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
    "prefix": "meteo-evt",
    "uri": "http://melodi.irit.fr/ontologies/eventMeteo.owl#"
},
{
    "prefix": "l-meteo-evt",
    "uri": "http://melodi.irit.fr/lod/eventMeteo/"
},
{
    "prefix": "l-change",
    "uri": "http://melodi.irit.fr/lod/change/"
},
{
    "prefix": "change",
    "uri": "http://melodi.irit.fr/ontologies/change.owl#"
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
    "prefix": "owl",
    "uri": "http://www.w3.org/2002/07/owl#"
},
{
    "prefix": "prov",
    "uri": "http://www.w3.org/ns/prov-o#"
}

];

var queries = [{
    "query": "SELECT ?commune ?name ?insee \n WHERE \n" +
        " { \n ?commune a admin:Commune. \n" +
        " ?commune admin:hasName ?name. \n" +
        " ?commune admin:hasSpatialRepresentation ?sp. \n" +
        " ?commune owl:sameAs ?insee. " +
        " ?sp geo:hasGeometry ?geo. \n" +
        " ?geo geo:asWKT ?wkt. \n spatialfilter" +
        "  } ", "title": "Administrative units dataset"
},

{
    "query": "SELECT ?obs ?tile ?dt \n" +
        "WHERE {  \n" +
        "?obs a eom:EarthObservation. \n" +
        "?obs sosa:hasFeatureOfInterest ?tile. \n" +
        "?tile geo:hasGeometry ?geo.  \n" +
        "?geo geo:asWKT ?wkt. \n spatialfilter" +
        "?tile grid:id ?tileId. \n" +
        "?obs sosa:resultTime ?dt. \n tempofilter" +
        "} limit 200", "title": "Earth observation dataset"
},


{
    "query": "SELECT ?obs ?place ?dt ?description \n" +
        " WHERE {  \n" +
        "?obs a meteo-evt:Observation. \n" +
        "?obs sosa:hasFeatureOfInterest ?place.  \n" +
        "?place admin:hasSpatialRepresentation ?fea.  \n" +
        "?fea geo:hasGeometry ?geo.  \n" +
        "?geo geo:asWKT ?wkt. \n spatialfilter" +
        "?obs sosa:hasResult ?result. \n" +
        "?obs sosa:resultTime ?dt. \n tempofilter" +
        "?result rdfs:comment  ?description. \n" +
        "} limit 200", "title": "Forecast bulletin dataset"
},


{
    "query": "SELECT ?obs ?feature ?c ?dt ?procedure ?sensor ?value \n WHERE \n" +
        "{ \n" +
        "?obs a mfo:Observation. \n" +
        "?obs sosa:hasFeatureOfInterest ?feature. \n" +
        "?feature mfo:contains ?c.  \n" +
        "?c admin:hasSpatialRepresentation ?sp. \n" +
        "?sp geo:hasGeometry ?geo. \n" +
        "?geo geo:asWKT ?wkt. \n spatialfilter" +
        "?obs sosa:resultTime ?dt. \n tempofilter" +
        "?obs sosa:hasResult ?result. \n" +
        "?result qudt-1-1:numericValue ?value. \n" +
        "?obs sosa:observedProperty ?obsprop. \n" +
        "?obs sosa:madeBySensor ?sensor. \n" +
        "?obs sosa:usedProcedure ?procedure. \n" +
        "} limit 200", "title": "Weather Forecast dataset"
},

{
    "query": "Select ?unit ?sp ?change ?dti1 ?dti2 ?highChangePercentage \n WHERE \n{ \n" +
        " ?unit a admin:Commune. \n" +
        " ?unit admin:hasSpatialRepresentation ?sp. \n" +
        " ?sp geo:hasGeometry ?geo. \n" +
        " ?geo geo:asWKT ?wkt. \n spatialfilter" +
        "?unit change:hasChange ?change. \n" +
        "?changeType change:hasClass ?change. \n" +
        " ?changeType time:hasTime ?timeInterval.  \n intervalfilter" +
        " ?change change:hasChangePercentage ?highChangePercentage. \n" +
        "} limit 200", "title": "Change detection results"
},

{
    "query": "SELECT ?obs ?foi ?dti1 ?dti2 ?deterioration \n" +
        " WHERE \n{  \n" +
        " ?obs a vy:VineyardObservation. \n" +
        " ?obs vy:hasFeatureOfInterest ?foi. \n" +
        " ?foi admin:hasSpatialRepresentation ?fea. \n" +
        " ?fea geo:hasGeometry ?geo. \n" +
        " ?geo geo:asWKT ?wkt. \n spatialfilter" +
        " ?obs vy:hasTime ?timeInterval.   \n intervalfilter" +
        " ?obs vy:hasDeterioration ?deterioration. \n" +
        "} limit 200", "title": "Vineyard health survey"
},
{
    "query": " SELECT ?a ?dt ?n ?p \n" +
        "   WHERE { \n" +
        "   ?featurefilterDoc ndvi:hasNdvi ?n. \n" +
        "   ?n prov:wasGeneratedBy ?a. \n" +
        "   ?a prov:startedAtTime ?dti. \n instantfilter" +
        "   ?n ndvi:hasNdviPercentage ?p. \n" +
        "} limit 200", "title": "NDVI computation"
}

];

var queriesFeature = [{
    "query": "SELECT ?uri ?name ?wkt \n WHERE \n" +
        " { \n ?uri a admin:Commune. \n" +

        " ?uri admin:hasName ?name. \n" +
        " filter(?name=\"?featurename\"^^<http://www.w3.org/2001/XMLSchema#String>). \n" +
        " ?uri admin:hasSpatialRepresentation ?sp. \n" +
        " ?uri owl:sameAs ?insee. " +
        " ?sp geo:hasGeometry ?geo. \n" +
        " ?geo geo:asWKT ?wkt. \n" +
        "  } ", "title": "Administrative units dataset"
}];

var queriesSemantic = [{
    "query": "SELECT ?lv ?label  \n" +
        " WHERE \n" +
        "  { ?lv rdfs:subClassOf ndvi:VegetationLevel. \n" +
        "   ?lv rdfs:label ?label. \n" +
        "   } ", "title": "NDVI Level"

},
{
    "query": "SELECT ?lv ?label  \n" +
        " WHERE \n" +
        "  { ?lv rdfs:subClassOf change:Change. \n" +
        "   ?lv rdfs:label ?label. \n" +
        "   } ", "title": "Change Level"

},
{
    "query": "SELECT ?lv ?label \n WHERE \n" +
        " { ?lv a vy:DeteriorationLevel. \n" +
        " ?lv rdfs:label ?label. \n" +
        "  } ", "title": "Deterioration Level"

}
]



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


]


var queriesDoc = [{
    "query": "SELECT ?uri ?name ?wkt \n WHERE \n" +
        " { \n ?uri a admin:Commune. \n" +
        " ?uri admin:hasName ?name. \n" +
        " ?uri admin:hasSpatialRepresentation ?sp. \n" +
        " ?uri owl:sameAs ?insee. " +
        " ?sp geo:hasGeometry ?geo. \n" +
        " ?geo geo:asWKT ?wkt. \n spatialfilter" +
        "  } ", "title": "Administrative units dataset"
},

{
    "query": "SELECT ?observation ?tile ?level ?dti ?cloudCover ?link ?size ?quicklook \n" +
        "WHERE {  \n" +
        "?observation a eom:EarthObservation. \n" +
        "?observation sosa:hasFeatureOfInterest ?tile. \n" +
        "?tile geo:hasGeometry ?geo.  \n" +
        "?geo geo:asWKT ?wkt. \n spatialfilterDoc" +
        "?tile grid:id ?tileId. \n" +
        "?observation sosa:resultTime ?dt. \n tempofilter" +
        "?observation sosa:hasResult ?result. " +
        "?result eom:browse ?browse." +
        "?browse eom:fileName ?quicklook. " +
        "?result eom:product ?product. " +
        "?product eom:fileName ?link." +
        "?product eom:size ?size. " +
        "?product eom:cloudCover ?cloudCover. " +
        "?observation eom:processingLevel ?level. } order by ?dti", "title": "Earth observation dataset"
},


{
    "query": "SELECT ?observation ?place ?dti ?description \n" +
        " WHERE {  \n" +
        "?observation a meteo-evt:Observation. \n" +
        "?observation sosa:hasFeatureOfInterest ?place.  \n" +
        "?place admin:hasSpatialRepresentation ?fea.  \n" +
        "?fea geo:hasGeometry ?geo.  \n" +
        "?geo geo:asWKT ?wkt. \n spatialfilterDoc" +
        "?observation sosa:hasResult ?result. \n" +
        "?observation sosa:resultTime ?dt. \n tempofilter" +
        "?result rdfs:comment  ?description. \n" +
        "} limit 200", "title": "Forecast bulletin dataset"
},


{
    "query": "SELECT ?observation ?dti ?procedure ?sensor ?value \n WHERE \n" +
        "{ \n" +
        "?observation a mfo:Observation. \n" +
        "?observation sosa:hasFeatureOfInterest ?feature. \n" +
        "?feature mfo:contains ?featurefilterDoc.  \n" +
        "?observation sosa:resultTime ?dt. \n tempofilter" +
        "?observation sosa:hasResult ?result. \n" +
        "?result qudt-1-1:numericValue ?value. \n" +
        "?observation sosa:observedProperty ?obsprop. \n" +
        "?observation sosa:madeBySensor ?sensor. \n" +
        "?observation sosa:usedProcedure ?procedure. \n" +
        "} order by ?dti", "title": "Weather Forecast dataset"
},

{
    "query": "Select ?change ?type ?dti1 ?dti2 ?percentage \n WHERE \n{ \n" +

        " ?featurefilterDoc change:hasChange ?change. \n" +
        " ?changeType change:hasClass ?change. \n" +
        " ?changeType time:hasTime ?timeInterval.  \n intervalfilter" +
        " ?change change:hasChangePercentage ?percentage. \n" +
        " ?change rdf:type ?type. } order by ?type ?dti1", "title": "Change detection results"
},

{
    "query": "SELECT ?observation ?dti1 ?dti2 ?deterioration \n" +
        " WHERE \n{  \n" +
        " ?observation a vy:VineyardObservation. \n" +
        " ?observation vy:hasFeatureOfInterest ?featurefilterDoc. \n" +
        " ?observation vy:hasTime ?timeInterval.   \n intervalfilter" +
        " ?observation vy:hasDeterioration ?deterioration. \n" +
        "} limit 200", "title": "Vineyard health survey"
},
{
    "query": " SELECT ?ndvi ?dti ?n ?percentage \n" +
        "   WHERE { \n" +
        "   ?featurefilterDoc ndvi:hasNdvi ?ndvi. \n" +
        "   ?ndvi prov:wasGeneratedBy ?action. \n" +
        "   ?action prov:startedAtTime ?dti. \n instantfilter" +
        "   ?ndvi ndvi:hasNdviPercentage ?percentage. \n" +
        "} limit 200", "title": "NDVI computation"
}





];

