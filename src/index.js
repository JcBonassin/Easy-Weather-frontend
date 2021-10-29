const form = document.querySelector(".top-banner form");
const list = document.querySelector(".ajax-section .cities");
const input = document.querySelector(".top-banner input");
const home = document.querySelector(".ajax-section .cities");
const msg = document.querySelector(".top-banner .msg");
const baseURL = "http://localhost:7000/";

function capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

// const locationsURL = `${baseURL}/locations/1`;

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;
  const url = `http://localhost:7000/locations/${inputVal}`;
  console.log(url)

  fetch(url).then( 
    (response) => {
        response.json()
        .then(data => {
            const { location, location_weather} = data;

            console.log(data)
    
                const li = document.createElement("li");
                li.classList.add("city");

                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                    location.current.weather[0]["icon"]
                     }.svg`;

                const markup = `
                  <h2 class="city-name" data-name="${inputVal},${location_weather.data.address.country_code}">  
                    <span>${capitalize(inputVal)}</span>
                    <sup>${location_weather.data.address.country_code.toUpperCase()}</sup>
                  </h2>
                  <div class="city-temp">${Math.round(location.current.temp)}<sup>°F</sup></div>

                  <figure>
                        <img class="city-icon" src="${icon}" alt="${
                        location.current.weather[0]["description"]
                            }">
                
                  <figcaption>${location.current.weather[0]["description"]}</figcaption>
                  </figure>
                `;
                li.innerHTML = markup;
                list.appendChild(li);
                console.log(li)
             })
             .catch(() => {
              msg.textContent = "Please enter a valid city ";
            });
            
    }
)
  msg.textContent = ""; 
  form.reset();
  input.focus();
});
  
 

fetch(baseURL).then( 
    (response) => {
        response.json()
        .then(data => {
            const { location, location_weather} = data;

            console.log(data)
    
                const li = document.createElement("li");
                li.classList.add("city");

                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                    location.current.weather[0]["icon"]
                     }.svg`;

                const markup = `
                  <h2 class="city-name" data-name="${location_weather[0]["data"]["city"]},${location_weather[0]["data"]["country"]}"> Current city,
                    <span>${location_weather[0]["data"]["city"]}</span>
                    <sup>${location_weather[0]["data"]["country"]}</sup>
                  </h2>
                  <div class="city-temp">${Math.round(location.current.temp)}<sup>°F</sup></div>

                  <figure>
                        <img class="city-icon" src="${icon}" alt="${
                        location.current.weather[0]["description"]
                            }">
                
                  <figcaption>${location.current.weather[0]["description"]}</figcaption>
                  </figure>
                `;
                li.innerHTML = markup;
                list.appendChild(li);
                console.log(li)
             }
            
        )
    }
)


    