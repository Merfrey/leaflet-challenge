// function createMap(data){

//     let myMap3 = L.map("map", {
//         center: [40.7128, -95.0059],
//         zoom: 4,
//         layers: [data]
//       });
    
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       }).addTo(myMap3);
    
//       let mapStyle = {
//         color: "brown",
//         fillColor: "pink",
//         fillOpacity: 0.3,
//         weight: 1.5
//       }
//     }
//       function createMarkers(features){ // response is the url
    
//               let earthquakeMarkers = []
          
//                 for (let x in features){
//                  let station = features[x]// station is an object that's inside the stations array
    
//                       earthquakeMarkers.push(createPin(station))
//                   }
    
//                   createMap(L.layerGroup(earthMarkers))
    
//             }
//     //function will take in station, and output earthquake marker
//             function createPin(station){
//               Jan2022 = station["2022-01-31"]
//               Feb2022 = station["2022-02-28"]
//               Mar2022 = station["2022-03-31"]
//               Apr2022 = station["2022-04-30"]
//               May2022 = station["2022-05-31"]
//               June2022 = station["2022-06-30"]
//               July2022 = station["2022-07-31"]
//               Aug2022 = station["2022-08-31"]
//               Sep2022 = station["2022-09-30"]
//               Oct2022 = station["2022-10-31"]
//               Nov2022 = station["2022-11-30"]
//               Dec2022 = station["2022-12-31"]
//               Jan2023 = station["2023-01-31"]
//               Feb2023 = station["2023-02-28"]
//               Mar2023 = station["2023-03-31"]
//               Apr2023 = station["2023-04-30"]
//               May2023 = station["2023-05-31"]
//               June2023 = station["2023-06-30"]
//               July2023 = station["2023-07-31"]
//               Aug2023 = station["2023-08-31"]
//               Sep2023 = station["2023-09-30"]
    
//     let latDif = Math.abs(station.CountyLat - station.RegionLat)
//     let lngDif = Math.abs(station.CountyLng - station.RegionLng)
    
//     let totalDif = Math.sqrt((latDif * latDif) + (lngDif * lngDif))
    
//     let pinColor 
//               if (totalDif < 0.15) pinColor = '#FFFF00'; //yellow
//               else if (totalDif < 0.25) pinColor = '#FF0000'; // red FF0000
//               else if (totalDif < 0.5) pinColor = '#FFA500'; //orange
//               else if (totalDif < 1) pinColor = '#008000'; // green #008000
//               else if (totalDif < 2) pinColor = '#800080'; // purple #800080
//               else pinColor = '#000000';
    
//               //sets the css style for the marker/pins
//               const markerHtmlStyles = `
//               background-color: ${pinColor};
//               width: 1rem;
//               height: 1rem;
//               display: block;
//               left: -0.5rem;
//               top: -0.5rem;
//               position: relative;
//               border-radius: 3rem 3rem 0;
//               transform: rotate(45deg);
//               border: 1px solid #000000`
            
//             const myIcon = L.divIcon({
//               className: "my-custom-pin",
//              iconAnchor: [0, 24],
//               html: `<span style="${markerHtmlStyles}" />`
//             })
     
//                    let earthquakeMarker = L.marker([station.RegionLat, station.RegionLng],{icon: myIcon}).bindPopup("<h3>County: " +station.CountyName + "</h3>")
    
//               return earthquakeMarker;
//             }
    
//               d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(createMarkers)
    





let myMap = L.map("map", {
    center: [35, -120],
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

   //let marker_limit = features.length //chose all the markers
   let marker_limit = 1000

    for (let i = 0; i < marker_limit; i++) {
        let location = features[i].geometry; //featuers[0] is the index location 0]
        if (location) {
            L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
        }
    }

})