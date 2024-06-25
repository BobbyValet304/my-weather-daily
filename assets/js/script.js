const city = document.getElementById("city");
console.log(city);
const button = document.getElementById("button");
console.log(button);

const apiKey = "a3b102ac114ea74aa1f96137737c509b";

function getCoords(city) {
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`; // We are using a template literal, which allows us to create a string that can pass our variables
  fetch(apiUrl)
    .then((response) => {
      return response.json(); // 200, 400, 500
    })
    .then((data) => {
      console.log(data); // This data variable should contain 5 results (array of objects)
      // From the first result, take the lat and lon and create variables for them
      const lat = data[0].lat;
      const lon = data[0].lon;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      // You can then run a second fetch request to get the weather data using the lat and lon variables you created above
      fetch(weatherUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data); // This data variable should contain the weather data for the city you passed in
          // From here, it is a matter of creating and appending elements (refer to module 4, activity 7 and 8)
          const cityName = document.createElement("h1");
          cityName.textContent = data.city.name;
          document.body.appendChild(cityName);
          // Look at  the acceptance criteria and see what data from the api you need to append to the page
          // TIP, you need to filter the list key in the data object to return new days
        });
    });
}

// Create a function that pulls the array of cities from local storage and creates and appends them as a button to the page
// add an event listener to the buttons so that when they are clicked, it will run the getCoords function
// TIP you can add an event listener to the div element that contains all the buttons so that way you don't have to add an event listener to each individual button (event.target))

button.addEventListener("click", () => {
  console.log(city.value); // We are now able to get the city from the input
  // Take this city and use it to fetch weather data
  getCoords(city.value); // London
  const cities = JSON.parse(localStorage.getItem("city")) || []; // If the key "city" is empty, then it will be an empty array
  cities.push(city.value);
  localStorage.setItem("city", JSON.stringify(cities));
  // Clear the input field
  city.value = ""; // This will clear the input field
});
