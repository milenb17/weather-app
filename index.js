const KELVIN = 273.15
// takes in city string, returns promise that resolves as object with weather info and rejects as error with message.
function getWeather(city) {
	return new Promise(function(resolve, reject) {
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ec2d2b93a4e370d1362c6057208187a0`, {mode: 'cors'})
		.then(function(response) {
			if (!response.ok) {
				console.log("response error")
				if (response.status === 404) {
					// enter valid city name
					throw new Error('Invalid city name');
				}
				else {
					// throw another error
					throw new Error('Something went wrong');
				}      
			}
			else {
			   return response.json();
			}
		})
		.then(function(response) {
			console.log('success');
			const weatherInfo = {name: response.name, temp: response.main.temp, feelsLike: response.main.feels_like, description: response.weather[0].description};
			resolve(weatherInfo);
		})
		.catch(function(error) {
			reject(error);
		})
	})
}

function formEventListener() {
	form = document.querySelector('#city');
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const city = document.querySelector('#input').value;
		getWeather(city)
		.then(response => displayWeather(response, 'c'))
		.catch(error => alert(error))
		form.reset();
	})
}

function displayWeather(weatherInfo, unit) {
	const div = document.querySelector('.weather');
	div.innerHTML = '';
	if (unit === 'c') {
		weatherInfo.temp = Math.round((weatherInfo.temp- KELVIN)*10) / 10;
		weatherInfo.feelsLike = Math.round((weatherInfo.feelsLike - KELVIN)*10) / 10
	}
	div.textContent = JSON.stringify(weatherInfo);
	console.log(weatherInfo.description);
	getGifURL(weatherInfo.description)
		.then(function(response) {
			const img = document.createElement('img');
			img.src = response;
			div.appendChild(img);
		})
}
function getGifURL(description) {
	return new Promise(function(resolve, reject) {
		fetch(`https://api.giphy.com/v1/gifs/translate?api_key=Uj4UBRPqtrEoMabQnWpv8ZF8ri8WI7RH&s=${description}`, {mode: 'cors'})
		.then(function(response) {
		return response.json();
		})
		.then(function(response) {
		resolve(response.data.images.original.url);
		})
		.catch(function(error) {
			reject('Error');
		})
	})
}

formEventListener();
