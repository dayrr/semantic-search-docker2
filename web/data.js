var featureQueries =
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
        " ?changeHigh change:hasChangePercentage ?highChangePercentage. \n" +
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
}

];

