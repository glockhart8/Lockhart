var properties = 
{
    latitude: 0,
    longitude: 0,
    address: null,
    map: null,
    nearbyStops: null,
    stop: null
};

$(document).ready(function() {
    var input = document.getElementById("address");
    input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submitAddress").click();
        }
    });

    getLocation();
    loadSchedules();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            properties.latitude = position.coords.latitude;
            properties.longitude = position.coords.longitude;
            console.log(properties);
            initMap();
        });
    }
}

function loadSchedules() {
    $.get("https://transit.land/api/v1/routes.geojson?operated_by=o-c2kx-spokanetransitauthority&per_page=false", function(data) {
        console.log(data);    
    });
}

function submitAddress() {
    properties.address = $("#address").val();
    $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${properties.address}&key=AIzaSyBUE_C_LQsv_0OCdoQeQj-SVG_zPSoZSQw`, function (data) {
        properties.latitude = data.results[0].geometry.location.lat;
        properties.longitude = data.results[0].geometry.location.lng;
        $.get(`https://transit.land/api/v1/stops.geojson?lat=${properties.latitude}&lon=${properties.longitude}&r=500`, function (data) {
            loadMap();
            getNearbyStops();
            getNeabyRoutes();
        });
    });
}

function initMap() {
    properties.map = L.map('mapid').setView([properties.latitude, properties.longitude], 10);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiam9lcmlkZGxlcyIsImEiOiJjanAzbTc4M2YwYmZyM3FtbmhuOWhrejQ3In0.pDae8Os8quDRm4ybj7LgBw'
    }).addTo(properties.map);
}

function loadMap() {
    properties.map.setView([properties.latitude, properties.longitude], 14);
}

function getStopInfo() {
    var stopId = $("#busstop-id").val();
    // $.get(`https://transit.land/api/v1/stops?onestop_id=${stopId}`, function(data) { });
    var temp = new Date();
    var strNow = `${temp.getHours()}:${temp.getMinutes()}:00`;
    var strL8r = `${temp.getHours() + 2}:${temp.getMinutes()}:00`;
    $.get(`https://transit.land/api/v1/schedule_stop_pairs?destination_onestop_id=${stopId}&date=today&origin_departure_between=${strNow},${strL8r}&per_page=false`, function(data) {
        console.log(data);
        let pairs = data.schedule_stop_pairs;
        for (let i = 0; i < pairs.length; i++) {
            $.get(`https://transit.land/api/v1/routes?onestop_id=${pairs[i].route_onestop_id}`, function(data) {
                var routeNum = data.routes[0].name;        
                $("#stop-info").append(pairs[i].destination_arrival_time + ", Route #" + routeNum + '<br>');
            });
           
        }
    });
}

function getNearbyStops() {
    $.get(`https://transit.land/api/v1/stops.geojson?lat=${properties.latitude}&lon=${properties.longitude}&r=1000`, function(data) {
        properties.nearbyStops = data.features;    
        for (let i = 0; i < properties.nearbyStops.length; i++) {
            let lat = properties.nearbyStops[i].geometry.coordinates[1];
            let long = properties.nearbyStops[i].geometry.coordinates[0];
            let id = properties.nearbyStops[i].id;
            let latlong = L.latLng(lat, long);
            let marker = L.marker(latlong);
            marker.bindPopup(`<b>OneStop ID: ${id}<br>Lat: ${lat}<br>Long: ${long}</b>`);
            marker.on("click", function(event) {
                var temp = event.target;
                console.log(temp);
            });
            marker.addTo(properties.map);
        }
    });
}

function getNeabyRoutes() {
    let southwestLat = properties.latitude - 0.1;
    let southwestLong = properties.longitude - 0.1;
    let northeastLat = properties.latitude + 0.1;
    let northeastLong = properties.longitude + 0.1;
    $("#route-info").empty();
    $.get(`https://transit.land/api/v1/routes?bbox=${southwestLong},${southwestLat},${northeastLong},${northeastLat}`, function(data) {
        console.log(data);
        for (let i = 0; i < data.routes.length; i++) {
            $("#route-info").append("<br>" + data.routes[i].operated_by_name + "<br>Route #" + data.routes[i].name + "<br>Route OneStop ID: " + data.routes[i].onestop_id + "<br>");
        }
    });
}
