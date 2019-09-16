
const Day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const iconValue = {
    CLEARDAY: 'clear-day',
    CLEARNIGHT: 'clear-night',
    RAIN: 'rain',
    SNOW: 'snow',
    SLEET: 'sleet',
    WIND: 'wind',
    FOG: 'fog',
    CLOUDY: 'cloudy',
    PARTLY_CLOUDY_DAY: 'partly-cloudy-day',
    PARTLY_CLOUDY_NIGHT: 'partly-cloudy-night'
}


function initGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, fail);
    }
    else {
        alert("Sorry, your browser does not support geolocation services.");
    }
}


function success(position) {
    //ADD your keys here. My keys are located in a key.js file but are not included in the sample code for security reasons.
    var dsKey = "a65049349aa4d90bfca3ccd8a6c27b7a";
    var googleApiKey= "AIzaSyDlOHl9DL3xZhgs5-DkYfhXtt2PjWFwUjo";
    fetchLocation(googleApiKey, position.coords.latitude, position.coords.longitude)
    fetchWeatherReport(dsKey, position.coords.latitude, position.coords.longitude)
}


function fail() {
    //You could default to your favorite city like Kernersville, NC the home of Coder Foundry!
    alert("Sorry, your browser does not support geolocation services.");
}

function fetchLocation(apiKey, latitude, longitude) {
    //you don't need a proxy but you need secure your key in the google developer console. 
    var googleApiLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    fetch(googleApiLink)
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Work with JSON data here
            //Set values for the location we picked the 4 object in the results becuase show the approximate address
            document.getElementById("location").innerHTML = data.results[4].formatted_address;
        })
        .catch(err => {
            // Do something for an error here
            throw (`Sorry, An Error occured.  ${err}`);
        })
}

function fetchWeatherReport(apiKey, latitude, longitude) {
    //to avoid the cors issue you need to run through a proxy or make the call server side.
    var DsProxyLink = `https://cors-anywhere.herokuapp.com/`;
    var DsApiLink = `${DsProxyLink}https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?exclude=minutely,alerts,flags`;

    fetch(DsApiLink)
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Work with JSON data here
            var resultsHTML = "";
            var tableHTML = "";
            var summary = data.currently.summary;
            var temperature = data.currently.temperature;
            var icon = data.currently.icon;
            var precipProbability = data.currently.precipProbability;
            var humidity = data.currently.humidity;
            var windSpeed = data.currently.windSpeed
            var timestamp = new Date(data.currently.time * 1000);
            var forecastDate = `${Day[timestamp.getDay()]} ${Month[timestamp.getMonth()]} ${timestamp.getDate()}`
            //Set values for the current conditions
            document.getElementById("summary").innerHTML = summary;
            document.getElementById("currentTemp").innerHTML = `${Math.round(temperature)}&deg`;
            document.getElementById("weatherIcon").src = getICON(icon);
            document.getElementById("percipitation").innerHTML = `Precipitation ${precipProbability * 100}%`;
            document.getElementById("humidity").innerHTML = `Humidity ${Math.round(humidity * 100)}%`;
            document.getElementById("wind").innerHTML = `Winds ${Math.round(windSpeed)} mph`;
            //render the forecasts tabs
            document.getElementById("weeklyForecast").innerHTML = renderWeeklyForecast(data.daily);
        })
        .catch(err => {
            // Do something for an error here
            throw (`Sorry, An Error occured.  ${err}`);
        })
}

//render the correct icon

function getICON(icon) {
    switch (icon) {
        case iconValue.CLEARDAY:
            return "Images/Clear Day.png";
        case iconValue.CLOUDY:
            return "Images/Cloudy.png";
        case iconValue.PARTLY_CLOUDY_DAY:
            return "Images/Partly Cloudy.png";
        case iconValue.CLEARNIGHT:
            return "Images/Clear Night.png";
        case iconValue.PARTLY_CLOUDY_NIGHT:
            return "Images/Cloudy Night.png";
        case iconValue.RAIN:
            return "Images/Rain.png";
        case iconValue.SNOW: 
            return "Images/Snow.png";
        case iconValue.SLEET:
            return "Images/Sleet.png";
        default:
            return "Images/Clear Day.png";
    }
}

//render the weekly forecast
function renderWeeklyForecast(fcData) {
    let resultsHTML = "";
    rowcount = fcData.data.length;
    if (rowcount > 8) {
        rowcount = 8;
    }
    for (i = 0; i < rowcount; i++) {
        let timestamp = new Date(fcData.data[i].time * 1000);
        let dayTime = Day[timestamp.getDay()];
        let summary = fcData.data[i].summary;
        let tempHigh = `${Math.round(fcData.data[i].temperatureHigh)}&deg High`;
        let tempLow = `${Math.round(fcData.data[i].temperatureLow)}&deg Low`;
        resultsHTML += renderColumn(dayTime, summary, tempHigh, tempLow);
    }
    return resultsHTML;
}

//template function to render grid columns
function renderColumn(dayTime, summary, tempHigh, tempLow) {
    return `<div class="col border forecast"><center class="border2">${dayTime}</center><center>${tempHigh}<br>${tempLow}<br>${summary}</center></div>`
}
