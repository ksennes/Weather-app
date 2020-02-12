window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/836e63713c3de5593f5aa2275f83dc5c/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => setData(data));
        });
    }

    function setData(data) {
        const {temperature, summary, icon} = data.currently;

        //set DOM elements from the API
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;

        setIcons(icon, document.querySelector('.icon'));

        //Change temperature
        temperatureSection.addEventListener('click', ()=>{
            if(temperatureSpan.textContent === 'F') {
                temperatureSpan.textContent = 'C';
                temperatureDegree.textContent = `${calculateCelsius(temperature).toFixed(2)}`;
            } else {
                temperatureSpan.textContent = 'F';
                temperatureDegree.textContent = `${temperature}`;
            }
        });
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }

    function calculateCelsius(temperature) {
        return (temperature - 32) * (5 / 9);
    }
});