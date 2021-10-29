    const newUser = new User()
    const api = new Api() 
    const weather = new Weather() 
    const loginButton = document.querySelector("#form")
    const userLogin = document.querySelector(".login")
    const list = document.querySelector(".ajax-section .cities")
    // const msg = document.querySelector(".top-banner .msg")
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


    // const users = api.fetchUsers();
    // console.log(users)

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
     //   document.querySelector("form").addEventListener("submit", validateLoginForm)

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



    //   async function renderUser() {
        // const email = document.querySelector('.login input').value;
        // const emailSignup = document.querySelector('.signup #submitsignin').value;
        // const password = document.querySelector('#logPassword').value;
        // console.log(emailSignup)
        // const data = await api.postUser(email, password, false);
        // const dataNewUser = await api.createUser(username, email, password, false);
        // console.log(data)     
    // }


    // async function renderUserSignUp()  {
    // const signUp = document.querySelector('#submitsignin');
    // const usernameSign = document.querySelector('#signName');
    // console.log(usernameSign)
    // const emailSign = document.querySelector('#signName');
    // const passwordSign = document.querySelector('#signPassword');
    // signUp.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   api.createUser(usernameSign, emailSign, passwordSign, true);
    // })
// 
    // }

    async function renderLocationWeather() {

        const data =  await api.fetchData()


        .then(data => {
            const { location, location_weather} = data;
                console.log(data)

                const li = document.createElement("li");
                li.classList.add("city");

                // const cityElements = document.querySelectorAll(".ajax-section .city");
                // for (const i = 0; i < cityElements.length; i++)
                // cityElements[i].id = 'abc-' + i;


                // const div = document.createElement('div');
                // div.id = 'abc-';

            
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
                // console.log(li)
                // list.querySelectorAll('.ajax-section .city')
                // .forEach(input => input.addEventListener('click', deleteCard));
                document.querySelector(".ajax-section .city").addEventListener("click", LocationDeleteCard);
        }
    )}

    async function allLocation() {
        let locationsUsers = api.fetchLocation()
        // console.log(locationsUsers)   
    }

    async function displayForm(e) {
        let formDiv = document.querySelector("#weather-form")
        let html = `
            <form>
            <input type="text" placeholder="Search for a city">
            <button type="submit">Ask</button>
            <span class="msg"></span>
            </form>
        `
        formDiv.innerHTML = html
        document.querySelector("form").addEventListener("submit", createLocation)    
    }

    async function createLocation(e) {
        e.preventDefault()

        let name = document.querySelector("input").value;
        // console.log(name)
        let data = await api.fetchCreateLocation(name)
    }


    async function renderAllLocationWeather(name, id, user_id) {

        // const locationId = name
        //  console.log(locationId) 

        const dataLocation =  await api.fetchWeatherRequest(name) 

        
    
        console.log(dataLocation)  
         
    
            const li = document.createElement("li");
                    li.classList.add("city");
                    li.id = `${id}`;

                    // const cityElements = document.querySelectorAll(".ajax-section .city");
                    // for (const i = 0; i < cityElements.length; i++)
                    // cityElements[i].id = `${id}`;
// 
                    // const div = document.createElement('div');
                    // div.id = `${id}`;

            
                    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                        dataLocation.location.current.weather[0]["icon"]
                        }.svg`;
    
                    const markup = `
                    <button type="button"><span class="sr-only" id="locationId">${id}</span></button>
                        
                    <h2 class="city-name" data-name="${name[0].toUpperCase() + name.slice(1)},${dataLocation.location_weather.data.address.country_code}">   
                        <span class="nameID">${name[0].toUpperCase() + name.slice(1)}</span>
                        <sup>${dataLocation.location_weather.data.address.country_code.toUpperCase()}</sup>
                    </h2>
                    <div class="city-temp">${Math.round(dataLocation.location.current.temp)}<sup>°F</sup></div>
    
                    <figure>
                            <img class="city-icon" src="${icon}" alt="${
                                dataLocation.location.current.weather[0]["description"]
                                }">
                    
                    <figcaption>${dataLocation.location.current.weather[0]["description"]}</figcaption>
                    </figure>
                    
                    `;
                    li.innerHTML = markup;
                    list.append(li); 
                    clearForm()
                    displayForm()

                    // document.addEventListener('DOMContentLoaded', function() {
                        // const listItems = list.querySelectorAll(".ajax-section .city");
                        // let cards = document.querySelectorAll('.ajax-section .city')
                        // for(let city in listItems) {
                            // listItems[city].addEventListener('click', deleteCard);
                        // }
                        // 
                    // })

                    list.querySelectorAll('.ajax-section .city')
                    .forEach(input => input.addEventListener('click', deleteCard));
                    
                    //  document.querySelectorAll(".button1").addEventListener("click", deleteCard);

                    // const listItems = list.querySelectorAll(".ajax-section .city");
                    // listItems.addEventListener('click', function(e) {
                        // this.removeChild(e.target);
                    //   })
             


                    //  const element = document.querySelectorAll('.button1');
                        // if (element.length !== 0) {
                        //   for (var i=0; i<element.length; i++) {
                            // element[i].addEventListener("click", function () {
                            //   alert('click');
                            // });
                        //   }
                        // }


                        // const deleteLinks = document.querySelectorAll('.button1');
                            // for (var i = 0; i < deleteLinks.length; i++) {
                                // deleteLinks[i].addEventListener('click', function (deleteCard) {
                                    // deleteCard.preventDefault();
                                // 
                                    // var choice = confirm("sure u want to delete?");
                                    // if (choice) {
                                        // return true;
                                    // }
                                // });
                            // }
                    //  closeWeatherCard ()
                    //  console.log(li);    
                    
                    // const listItems = list.querySelectorAll(".ajax-section .city");
                    // const listItemsArray = Array.from(listItems);

                    // console.log(listItems)
                        }    



    async function renderLocationWeatherRequest() {


        let id = document.querySelector("input").value
        console.log(id)  
        // console.log(listItemsArray)

        const data = await api.fetchWeatherRequest(id) 


        console.log(data)  
        
    
            const li = document.createElement("li");
                    li.classList.add("city");
                    
    
                    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                        data.location.current.weather[0]["icon"]
                        }.svg`;
    
                    const markup = `
                        <div>
                        <button type="button"><span class="sr-only" id="locationId">${id}</span></button>
                        </div>
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
                    console.log(li)
                    clearForm()
                    displayForm()  
                    api.locationUpdate()
                    //  allLocation()
                    //closeWeatherCard ()                
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

            // if (confirm('Are you sure you want to delete?')) {
                // let idDelete = await api.locationDelete(listItems)
                // console.log('deleted.');
            //   } else {
                // return
                // console.log('Thing was not saved to the database.');
            //   }
            // let idDelete = await api.locationDelete(listItems)
            console.log(listItems) 
            deleteItem.remove("city");


            // let listItems = e.currentTarget;
            // listItems.remove("city");

            // let idtry =  document.getElementById("locationId").innerHTML;
            // console.log(idtry) 
            // let idDelete = await api.locationDelete(listItems)
            // console.log(idDelete)   
        }

        async function LocationDeleteCard(e) {
            let listItemsWeather = e.currentTarget;
            console.log(listItems)
            listItemsWeather.remove("city");
            
        }

        async function clearcard(e) {

            let listItems = e.currentTarget;
            console.log(listItems) 
            // listItems.remove("city");

            // const childEles = document.querySelectorAll('.city');
            // console.log(childEles)
// 
            // childEles.querySelectorAll("button1").forEach(function (childEle) {
                // childEle.classList.remove("button1");
            // });

            // Iterate the collection and remove "myClass" from all decendants
            // for(let x = 0; x < childEles.length; x++){
                // childEles[x].classList.remove("button1");
            // }
            // childEles.innerHTML = ""

            // let formDiv = document.querySelector(".ajax-section .city")
            // console.log(formDiv)
            // formDiv.innerHTML = ""
        }



        







