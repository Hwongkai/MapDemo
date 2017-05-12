/**
 * Created by huangkai on 2017/5/12.
 */
var map;
var output = document.getElementById("output");
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    var marker = new google.maps.Marker({
        position: {lat: -34.397, lng: 150.644},
        title:"Hello World!"
    });

// To add the marker to the map, call setMap();
    marker.setMap(map);
}

function findPlace() {

    var myplace = document.getElementById("input_val").value;
    console.log(myplace)
    var geocoder = new google.maps.Geocoder();//创建geocoder服务
    /* 调用geocoder服务完成转换 */
    geocoder.geocode( { 'address': myplace}, function(results, status) {
        console.log(results);
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            infowindow = new google.maps.InfoWindow({
                content: results[0].geometry.location.lat()+' , '+results[0].geometry.location.lng(),
                maxWidth: 200
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });
            if(results.length<3){
                map.setZoom(12)
            }
            output.innerHTML = "There are " + results.length + " for searching ' "+ myplace+"' ";

            for(i=0;i<results.length;i++){
                var pElement = document.createElement("p");
                var textnode = document.createTextNode("\n"+results[i].geometry.location);
                output.appendChild(pElement);
                pElement.appendChild(textnode);
            }

        } else {
            output.innerHTML = "Geocode was not successful for the following reason: " + status;

        }
    });

}

function geoFindMe() {



    if (!navigator.geolocation){
        output.innerHTML = "<p>您的浏览器不支持地理位置</p>";
        return;
    }

    function success(position) {
        output.innerHTML="";
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        var pElement = document.createElement("p");
        var textnode = document.createTextNode("Where you are :("+ latitude+" , "+longitude + " ).");
        output.appendChild(pElement);
        pElement.appendChild(textnode);


        var marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude,},
            title:"Here you are!"
        });
        marker.setMap(map);
        map.setCenter(new google.maps.LatLng(latitude, longitude));
        map.setZoom(12);

    };

    function error() {
        output.innerHTML = "无法获取您的位置";
    };

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
}