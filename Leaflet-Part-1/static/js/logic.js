let myMap = L.map("map", {
    center: [35, -115],
    zoom: 7
  });


  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

  d3.json(url).then(function (response) {
    console.log(response);
    features = response.features

   //limits the amount of earthquakes looped
   let marker_limit = 1000

    for (let i = 0; i < marker_limit; i++) {

        //grabs the coordinates of each earthquake
        let location = features[i].geometry;

        //grabs the depth of each earthquake
        let depth = location.coordinates[2];

        //grabs the location of the earthquake
        let placer = features[i].properties.place;

        //grabs the magnitude of each earthquake
        let magnitude = features[i].properties.mag;

        // makes the markers more visisble on the map
        let markerRadius = magnitude * 20000;
    
        let circleColor 
            if (depth >= -10 && depth < 10) circleColor = '#008000'; // green
            else if (depth >= 10 && depth < 30) circleColor = '#90EE90'; // hopefully light green
            else if (depth >= 30 && depth < 50) circleColor = '#FFFF00'; // yellow
            else if (depth >= 50 && depth < 70) circleColor = '#FCD299'; // hopefully llght orange
            else if (depth >= 70 && depth < 90) circleColor = '#FFA500'; // orange
            else circleColor = '#FF0000'; // red


// tests the output of each number to make sure each is correct
//console.log(`cord 1 is : ${location.coordinates[1]}`);
//console.log(`cord 2 is : ${location.coordinates[0]}`);
//console.log(`depth is : ${depth}`);
//console.log(`magnitude is : ${magnitude})

        if (location)
         {
            L.circle(
                [location.coordinates[1], location.coordinates[0] ],
                {radius: markerRadius, 
                color: circleColor
            }).bindPopup(`<h1>Earthquake Data</h1>  <h3> Magnitude: ${magnitude}</h3><h3> Depth: ${depth}</h3></h3> Location: ${placer}<h3>`).addTo(myMap);
        }
    }//above for loop end bracket



 // Set up the legend.
 let legend = L.control({ position: "bottomright" });
 legend.onAdd = function() {
   //creating div tag, and info legend class
   let div = L.DomUtil.create("div", "info legend");
   let limits = geojson.options.limits;
   let colors = geojson.options.colors;
   let labels = [];

   // Add the minimum and maximum.
   let legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
     "<div class=\"labels\">" +
       "<div class=\"min\">" + limits[0] + "</div>" +
       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
     "</div>";

   div.innerHTML = legendInfo;

   limits.forEach(function(limit, index) {
     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
   });

   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
   return div;
 };

 // Adding the legend to the map
 legend.addTo(myMap);

});





       /*Legend Setup*/
//    var legend = L.control({position: 'bottomright'});

//    legend.onAdd = function (map)
//     {
   
//        var div = L.DomUtil.create('div', 'info legend'),
//            grades = [-10, 10, 30, 50, 70, 90],
//            labels = [];
   
//        // loop through our density intervals and generate a label with a colored square for each interval
//        for (var i = 0; i < grades.length; i++)
//         {
//            div.innerHTML +=
//                '<i style="background:' + circleColor(grades[i] + 1) + '"></i> ' +
//                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//        }
   
//        return div;
//    };
   
//    legend.addTo(myMap);


// });

 