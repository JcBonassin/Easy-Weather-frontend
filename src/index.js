    const newUser = new User()
    const api = new Api() 
    const weather = new Weather() 
    const loginButton = document.querySelector("#form")
    const userLogin = document.querySelector(".login")
    const list = document.querySelector(".ajax-section .cities")
    const msg = document.querySelector(".msg")
    const weatherLocation = new Location()
    

    $(window).on("hashchange", function () {
        if (location.hash.slice(1) == "signup") {
            $(".page").addClass("extend");
            $("#login").removeClass("active");
            $("#signup").addClass("active");
        } else {
            $(".page").removeClass("extend");
            $("#login").addClass("active");
            $("#signup").removeClass("active");
        }
    });

    $(window).trigger("hashchange");


   

    async function renderLogin() {
        let formDiv = document.querySelector(".login")
        let html = ` 
        <div class="box">
        <div class="page">
            <div class="header">
                <a id="login" class="active" href="#login">login</a>
                <a id="signup" href="#signup">signup</a>
            </div>
            <div id="errorMsg"></div>
            <div class="content">
                <form class="login" name="loginForm" onsubmit="validateLoginForm(); return false;">
                    <input type="email" name="email" id="logEmail" placeholder="Email">
                    <input type="password" name="password" id="logPassword" placeholder="Password">
                    <br><br>
                    <input type="submit" value="Login">
                    <a href="#">Forgot Password?</a>
                </form>
                <form class="signup" name="signupForm" onsubmit="validateSignupForm(); return false;">
                    <input type="text" name="name" id="signName" placeholder="Username">
                    <input type="email" name="email" id="signEmail" placeholder="Email">
                    <input type="password" name="password" id="signPassword" placeholder="Password"><br>
                    <input type="submit" value="SignUp">
                </form>
            </div>
        </div>
    </div>

    <style> 

    body{
        margin: 0;
        padding: 0;
        background-size: cover;
        background-repeat: no-repeat;
        font-family : Verdana,Tahoma, sans-serif;
    }
    
    .box{
        width: 380px;
        height: 500px;
        background-color:#39CCCC;
        padding: 20px;
        margin: 8% auto 0;
        text-align: center;
        position: relative;
        box-sizing: border-box;
        flex-direction: column;
    }
    
    .box img{
        width:100px;
        margin-top:-50px ;
    }
    
    .header {
        width: 300px;
        height: 50px;
        text-transform: uppercase;
        display: inline-flex;
        padding-top: 20px;
        padding-bottom: 0;
        justify-content: space-between;
    }
    
    .header a {
        font-size: 20px;
        text-decoration: none;
        color: #ffffff;
        display: inline-flex;
        padding-left: 25px;
        padding-right: 25px;
        justify-content: center;
        cursor:pointer;
    }
    
    .header .active {
        color: #df80ff;
        font-weight: bold;
        position: relative;
    }
    
    .header .active:after {
        position: absolute;
        border: none;
        content: "";
    }
    
    #errorMsg{
        color:red;
        text-align: center;
        font-size: 12px;
        padding-bottom: 20px; 
    }
    
    .content{
        display: inline-flex;
        overflow: hidden;
    }
    
    form {
        position: relative;
        display: inline-flex;
        width: 100%;
        height: 100%;
        flex-shrink: 0;
        flex-direction: column;
        transition: right 0.5s;
    }
    
    .login a{
        text-decoration: none;
        color: #ffffff;
        font-size: 15px;
        text-align: center;
        cursor: pointer;
    }
    
    .extend form {
        right: 100%;
    }
    
    input[type=text], input[type=password], input[type=email]{
        display:block;
        position: relative;
        border: 4px solid #ffffff;
        padding: 12px;
        margin-bottom: 15px;
        width: 100%;
         box-sizing: border-box;
        font-size: 17px;
        outline: none;
    }
    
    input[type=text]:hover,  input[type=password]:hover, input[type=email]:hover{
        border: 4px solid #df80ff;
    }
    
    input[type=submit]{
        display:block;
        position: relative;
        border: 3px solid #df80ff;
        padding: 12px;
        margin-bottom: 20px;
        width: 100%;
        border-radius: 25px;
        background-color:#600080 ;
        text-align:center;
        font-size: 20px;
        color: #ffffff;
        cursor:pointer;
        outline: none;
    }
        
    input[type=submit]:hover{
         background-color:#ffffff;
         color: #000000;
         font-weight: bold;
    }
    input[type=checkbox]{
        background-color:#df80ff;
    }
    #check{
        margin-top: 10px;
        text-align: left;
        color: #ffffff;
        font-size: 15px;
    }
    </style>      
    `
    formDiv.innerHTML = html
    }


    async function validateLoginForm() {
        const loginemail = document.getElementById("logEmail").value;
        const loginpassword = document.getElementById("logPassword").value;
    
        if (loginemail == "" || loginpassword == "") {
            document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
            return false;
        }
    
        else if (loginpassword.length < 2) {
            document.getElementById("errorMsg").innerHTML = "Your password must include atleast 8 characters"
            return false;
        }
        else {
            const data = await api.postUser(loginemail, loginpassword, false);
            // alert("Successfully logged in");
            return true;
        }
    }

    async function validateSignupForm() {
        const signUpUsername = document.getElementById("signName").value;
        const signUpEmail = document.getElementById("signEmail").value;
        const signUpPassword = document.getElementById("signPassword").value;

        console.log(signUpEmail)
    
        if (signUpEmail == "" || signUpUsername == "" || signUpPassword == "") {
            document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
            return false;
        }
    
        else if (signUpPassword.length < 3) {
            document.getElementById("errorMsg").innerHTML = "Your password must include atleast 8 characters"
            return false;
        }
        else {
            const dataNewUser = await api.createUser(signUpUsername, signUpEmail, signUpPassword, false);
            // alert("Successfully signed up");
            return true;
        }
    }

    async function renderLocationWeather() {

        const data =  await api.fetchData()


        .then(data => {
            const { location, location_weather} = data;
                console.log(data)

                const li = document.createElement("li");
                li.classList.add("city");
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                    location.current.weather[0]["icon"]
                    }.svg`;

                const markup = `
                <button type="button"><span class="sr-only" id="locationId"></span></button>
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
                document.querySelector(".ajax-section .city").addEventListener("click", LocationDeleteCard);
        }
    )}

    async function allLocation(userId) {
        let locationsUsers = api.fetchLocation(userId)
    }

    async function displayForm(e) {
        let formDiv = document.querySelector("#weather-form")
        let html = `
            <form>
            <input type="text" placeholder="Type a city">
            <button type="submit">Ask</button>
            <span class="msg"></span>
            </form>
        `
        formDiv.innerHTML = html
        document.querySelector("form").addEventListener("submit", createLocation)    
    }

    async function createLocation(e) {
        e.preventDefault()

        const listItems = list.querySelectorAll(".ajax-section .city");
        const listItemsArray = Array.from(listItems);
        const msg = document.querySelector(".msg")

        let name = document.querySelector("input").value;

        if (name === "") {
            document.querySelector(".msg").textContent = "Please don't leave this box blank"
            return;
            }

        if (listItemsArray.length > 0) {
            const filteredArray = listItemsArray.filter(el => {
              let content = "";
              
              if (name.includes(",")) {
                
                if (name.split(",")[1].length > 2) {
                    name = name.split(",")[0];
                  content = el
                    .querySelector(".city-name span")
                    .textContent.toLowerCase();
                } else {
                  content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
              } else {
               
                content = el.querySelector(".city-name span").textContent.toLowerCase();
              }
              return content == name.toLowerCase();
            });
        

            if (filteredArray.length > 0) {
                msg.textContent = `You already know the weather in ${
                 filteredArray[0].querySelector(".city-name span").textContent
                }. Please try another city`;
                return;
            }     
        }   

        let data = await api.fetchWeatherRequest(name);
        console.log(data)

        if (data === undefined) {
            msg.textContent = "Please search for a valid city";
            return       
        } else {
            let nameValid = await api.fetchCreateLocation(name)
            console.log(nameValid)
        }

    } 
    

    async function renderAllLocationWeather(name, id, user_id) {

        const dataLocation =  await api.fetchWeatherRequest(name) 

            const li = document.createElement("li");
                    li.classList.add("city");
                    li.id = `${id}`;
                    const icon = `https://openweathermap.org/img/wn/${
                        dataLocation.location.current.weather[0]["icon"]
                        }@2x.png`;
    
                    const markup = `
                    <button type="button"><span class="sr-only" id="locationId">${id}</span></button>
                        
                    <h2 class="city-name" data-name="${name[0].toUpperCase() + name.slice(1)},${dataLocation.location_weather.data.address.country_code}">   
                        <span class="nameID">${name[0].toUpperCase() + name.slice(1)}</span>
                        <sup>${dataLocation.location_weather.data.address.country_code.toUpperCase()}</sup>
                    </h2>
                    <div class="city-temp">${Math.round(dataLocation.location.current.temp)}<sup>°C</sup></div>
    
                    <figure>
                            <img class="city-icon" src="${icon}" alt="${
                                dataLocation.location.current.weather[0]["description"]
                                }">
                    
                    <figcaption>${dataLocation.location.current.weather[0]["description"]}</figcaption>
                    </figure>
                    
                    `;
                    li.innerHTML = markup;
                    list.append(li);
                    clearForm();
                    displayForm();
                    list.querySelectorAll('.ajax-section .city')
                    .forEach(input => input.addEventListener('click', deleteCard));
    }    

    async function clearForm() {
            let formDiv = document.querySelector('#weather-form')
            formDiv.innerHTML = ""
        }

        async function welcomeLoggin(){
            swal("Welcome!", ", You are logged in", "success");
        }

    
        async function deleteCard(e) {

            let listItems = e.currentTarget.id;
            api.locationDelete(listItems)
            let deleteItem = e.currentTarget
            console.log(listItems) 
            deleteItem.remove("city");
        }


        







