# Map background + Pin location

This result is a join of two exercise, the [Pin Location Scale](https://github.com/jrcaro/map_obligatory) and the [Map Background Scale](https://github.com/Lemoncode/d3js-typescript-examples/tree/master/02-maps/01-scale-background-countries). 
![map affected coronavirus](./content/backgroundPin.JPG "affected coronavirus")
So we start from the previous exercise and add some code.

As the buttons are already added in _./src/index.html_, the only file to modify will be _./src/index.ts. The first step will be create a color range scale to change colors by the number of affected.
```diff
+var color = d3
+  .scaleThreshold<number, string>()
+  .domain([0, 20, 500, 1000, 2000, 5000, 9000])
+  .range([
+    "#ffffff",
+    "#cfc5e5",
+    "#a78cc7",
+    "#8652a5",
+    "#923BA4",
+    "#68007e",
+    "#000000"
+  ]);
```
Also we need a function to change the color background of the commuties based in the number of afected people in that community. We have two different stats so this function has to be able to assign the color background with all of them.
```diff
+const assignCCAABackgroundColor = (
+  CCAAName: string,
+  infected: ResultEntry[]
+) => {
+  const item = infected.find(item => item.name === CCAAName);
+  return item ? color(item.value) : color(0);
+};
```
Then, it's necessary a function to update the color when the buttons are clicked. This function access to all the paths of the previous created and change the style attribute with the new data.
```diff
+const updateCCAABackground = (infected: ResultEntry[]) => {
+  const paths = svg.selectAll("path")
+  paths
+  .style("fill", function(d: any) {
+    return assignCCAABackgroundColor(d.properties.NAME_1, infected);
+  })
+  .attr("d", geoPath as any);
+};
```
To set a default style we have to add this lines with the february data.
```diff
svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
+  .style("fill", function(d: any) {
+    return assignCCAABackgroundColor(d.properties.NAME_1, infectedFebruary);
+  })
  .attr("d", geoPath as any);
```
Finally, add the update function to the buttons.
```diff
document
  .getElementById("init")
  .addEventListener("click", function handleInfectedFebruary() {
+    updateCCAABackground(infectedFebruary);
    updateCircles(infectedFebruary);
  });

document
  .getElementById("actual")
  .addEventListener("click", function handleInfectedMarch() {
+    updateCCAABackground(infectedMarch);
    updateCircles(infectedMarch);
  });
```
