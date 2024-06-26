const city = document.getElementById("city");
console.log(city);
const button = document.getElementById("button");
console.log(button);
const buttonArea = document.getElementById("button-area");
const weatherResults = document.getElementById("weather-results");
const futureContainer = document.getElementById("future-forecast");

const apiKey = "a3b102ac114ea74aa1f96137737c509b";
cityWeather();
function getCoords(city) {
  const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`; // We are using a template literal, which allows us to create a string that can pass our variables
  fetch(apiUrl)
    .then((response) => {
      return response.json(); // 200, 400, 500
    })
    .then((data) => {
      console.log(data); // This data variable should contain 5 results (array of objects)
      // From the first result, take the lat and lon and create variables for them
      const lat = data[0].lat;
      const lon = data[0].lon;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
      // You can then run a second fetch request to get the weather data using the lat and lon variables you created above
      fetch(weatherUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data); // This data variable should contain the weather data for the city you passed in
          // From here, it is a matter of creating and appending elements (refer to module 4, activity 7 and 8)
          weatherResults.innerHTML = ""; // Clear the future div before appending new data
          const cityName = document.createElement("h1");
          cityName.textContent = data.city.name;
          weatherResults.appendChild(cityName);
          const date = document.createElement("p");
          date.textContent = data.list[0].dt_txt;
          weatherResults.appendChild(date);
          const icon = document.createElement("img");
          icon.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
          weatherResults.appendChild(icon);
          const weather = document.createElement("p");
          weather.textContent = data.list[0].weather[0].description;
          weatherResults.appendChild(weather);
          const temp = document.createElement("p");
          temp.textContent = data.list[0].main.temp + "°F";
          weatherResults.appendChild(temp);
          const humidity = document.createElement("p");
          humidity.textContent = data.list[0].main.humidity + "%";
          weatherResults.appendChild(humidity);
          const windSpeed = document.createElement("p");
          windSpeed.textContent = data.list[0].wind.speed + " mph";
          weatherResults.appendChild(windSpeed);

          // Look at  the acceptance criteria
          futureContainer.innerHTML = ""; // Clear the future div before appending new data and see what data from the api you need to append to the page
          for (let index = 0; index < data.list.length; index++) {
            const element = data.list[index];

            if (element.dt_txt.split(" ")[1] === "12:00:00") {
              console.log(element); // Each element should be a new day
              // Make a div for the future forecast in html
              // Append the data for each element that is required in the acceptance criteria
              const future = document.createElement("div");

              const date = document.createElement("p");
              date.textContent = element.dt_txt;
              future.appendChild(date);
              const icon = document.createElement("img");
              icon.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
              future.appendChild(icon);
              const weather = document.createElement("p");
              weather.textContent = element.weather[0].description;
              future.appendChild(weather);
              const temp = document.createElement("p");
              temp.textContent = element.main.temp + "°F";
              future.appendChild(temp);
              const humidity = document.createElement("p");
              humidity.textContent = element.main.humidity + "%";
              future.appendChild(humidity);
              const windSpeed = document.createElement("p");
              windSpeed.textContent = element.wind.speed + " mph";
              future.appendChild(windSpeed);

              futureContainer.appendChild(future); // Append the future div to the future-forecast div
            }
          }
        });
    });
}

// Create a function that pulls the array of cities from local storage and creates and appends them as a button to the page
function cityWeather() {
  const cityButton = JSON.parse(localStorage.getItem("city")) || [];
  buttonArea.innerHTML = ""; // If the key "city" is empty, then it will be an empty array
  cityButton.forEach((city) => {
    const button = document.createElement("button");
    button.textContent = city;
    buttonArea.appendChild(button);
    button.addEventListener("click", () => {
      getCoords(city);
    });
  });
}
// add an event listener to the buttons so that when they are clicked, it will run the getCoords function

// TIP you can add an event listener to the div element that contains all the buttons so that way you don't have to add an event listener to each individual button (event.target))

button.addEventListener("click", () => {
  console.log(city.value); // We are now able to get the city from the input
  // Take this city and use it to fetch weather data
  getCoords(city.value); // London
  const cities = JSON.parse(localStorage.getItem("city")) || []; // If the key "city" is empty, then it will be an empty array
  const existingCity = cities.find((element) => element === city.value);
  if (!existingCity) {
    cities.push(city.value);
    localStorage.setItem("city", JSON.stringify(cities));
  }
  // Clear the input field
  city.value = ""; // This will clear the input field
  cityWeather();
});
