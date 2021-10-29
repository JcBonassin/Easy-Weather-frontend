const api = new Api() 
// let api1 = document.querySelector(".api1")
const list = document.querySelector(".ajax-section .cities");

function bindEventListeners() {
    // document.getElementById('weather-form').addEventListener('click', LogindisplayForm)
    document.getElementById('form').addEventListener('click', displayForm)
    // document.getElementById('categories').addEventListener('click', renderCategories)
}


async function renderUsers() {
    const userdata = await api.fetchUsers()
    console.log(userdata)
}

// function LogindisplayForm() {
    // let formDiv = document.querySelector("#new-form")
    // let html = `
// 
        // <form id="login-form">
        // <input type="text" name="username" id="username-field" class="login-form-field" placeholder="Username">
        // <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
        // <input type="submit" value="Login" id="login-form-submit">
        // <span class="msg"></span>
        // </form>
    // `
    // formDiv.innerHTML = html
    // document.querySelector("weather-form").addEventListener("submit", renderLocationWeatherRequest)    
// }



const init = () => {
    bindEventListeners()
    renderLocationWeather()
}


// const weatherData = api.fetchData() 
// console.log(weatherData)


async function renderLocationWeather() {
    const data =  await api.fetchData()
    .then(data => {
        const { location, location_weather} = data;


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
)}

    function displayForm() {
        let formDiv = document.querySelector(".weather-form")
        let html = `
            <form>
            <input type="text" placeholder="Search for a city">
            <button type="submit">Ask</button>
            <span class="msg"></span>
            </form>
        `
        formDiv.innerHTML = html
        document.querySelector("form").addEventListener("submit", renderLocationWeatherRequest)    
    }

   
 
     async function renderLocationWeatherRequest() {
     
        let id = document.querySelector("input").value
     
         const data = await api.fetchWeatherRequest(id) 
     
         console.log(data)
         
             const li = document.createElement("li");
                     li.classList.add("city");
     
                     const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                         data.location.current.weather[0]["icon"]
                          }.svg`;
     
                     const markup = `
                       <h2 class="city-name" data-name="${id[0].toUpperCase() + id.slice(1)},${data.location_weather.data.address.country_code}">  
                         <span>${id[0].toUpperCase() + id.slice(1)}</span>
                         <sup>${data.location_weather.data.address.country_code.toUpperCase()}</sup>
                       </h2>
                       <div class="city-temp">${Math.round(data.location.current.temp)}<sup>°F</sup></div>
     
                       <figure>
                             <img class="city-icon" src="${icon}" alt="${
                             data.location.current.weather[0]["description"]
                                 }">
                     
                       <figcaption>${data.location.current.weather[0]["description"]}</figcaption>
                       </figure>
                     `;
                     li.innerHTML = markup;
                     list.appendChild(li);
                     clearForm()
                     console.log(li);
     }    
  

        function clearForm() {
            let formDiv = document.querySelector('.weather-form')
            formDiv.innerHTML = ""
        }

        init()




    
        
             
        
 




 








