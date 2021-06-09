const weather = document.querySelector(".js-weather");


const COORDS = 'coords';
const API_KEY = '6b422f217a28ebaf7c13e677ad9b6f82';


function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}



function saveCoords(coordsObj){
    // 저장 COORDS 컬럼에, OBJECT을 JSON으로 
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));

}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // 저장할 OBJECT 만들기
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
}


function handleGeoError(){
    console.log("Cant Access Geo Location");
}


function askForCoords(){
    // navigator API -> 유저 위치 정보등 획득가능
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init(){
    loadCoords();
}  


init();