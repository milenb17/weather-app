function getWeather(city) {
    return new Promise(function(resolve, reject) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ec2d2b93a4e370d1362c6057208187a0`, {mode: 'cors'})
        .then(function(response) {
            if (!response.ok) {
                if (response.status === 404) {
                    // enter valid city name
                    throw new Error('Enter valid city name');
                }
                else {
                    // throw another error
                    throw new Error('Something went Wrong');
                }      
            }
            else {
                return response.json();
            }
            
        })
    })
   
        
        .then(function(response) {
            console.log('success');
            console.log(response);
            const info = {name: response.name, temp: response.main.temp, feelsLike: response.main.feels_like, description: response.weather[0].description};
            return info;
        })
        .catch(function(err) {
            console.log(err);
        })
}
getWeather('toronto');