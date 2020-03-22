import * as d3 from "d3";
import * as topojson from "topojson-client";
const spainjson = require("./spain.json");
const d3Composite = require("d3-composite-projections");
import { infectedFebruary } from "./stats";

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 1024)
  .attr("height", 800)
  .attr("style", "background-color: #FBFAF0");

const aProjection = d3Composite
  .geoConicConformalSpain()
  .scale(3300)
  .translate([500, 400]);

const geoPath = d3.geoPath().projection(aProjection);
const geojson = topojson.feature(spainjson, spainjson.objects.ESP_adm1);

// Data and color scale
var data = d3.map();
var colorScheme = d3.schemeBlues[6];
var colorScale = d3.scaleThreshold()
    .domain([1, 6, 11, 26, 101, 1001])
    .range(<any>colorScheme);

// Let's paint first the map
svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("d", geoPath as any);
