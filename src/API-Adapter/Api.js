class Api {
    constructor() {
        this.baseURL = "http://localhost:7000/"
    }

    async postUser(email, password, registerUser) {
        let data = {
          user: {
            email,
            password
          }
        }  

        let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(data)
          }
          const fetchURL = registerUser ? `${this.baseURL}users` : `${this.baseURL}login`;
        
          fetch(fetchURL, configObj)
            .then(resp => resp.json())
            .then(data => { 
                if (data.errors) {
                email = '';
                password = '';
                alert(data.errors);
              } else {
                window.sessionStorage.currentUsername = data.user.username;
                window.sessionStorage.currentUserId = data.user.id;
                loginButton.remove();
                userLogin.remove();
                welcomeLoggin();
                logoutButton();
                allLocation(data.user.id);
                displayForm()  
            }
        });  
    }


    async createUser(username, email, password, registerUser) {
        let data = {
          user: {
            username,
            email,
            password
          }
        }
        console.log(data)

        let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(data)
          }
          const fetchURL = registerUser ? `${this.baseURL}login` : `${this.baseURL}users`;
       
          fetch(fetchURL, configObj)
            .then(resp => resp.json())
            .then(data => { 
                if (data.errors) {
                username = '';
                email = '';
                password = '';
                alert(data.errors);
              } else {
                window.sessionStorage.currentUsername = data.user.username;
                window.sessionStorage.currentEmail = data.user.email;
                window.sessionStorage.currentUserId = data.user.id;
                loginButton.remove();
                userLogin.remove();
                welcomeLoggin();
                logoutButton();
                allLocation(data.user.id);
                displayForm()  
            }
        });  
    }


    async fetchURL() {
        const fetchURL = registerUser ? `${this.baseURL}users` : `${this.baseURL}login`;
        let response = await fetch(fetchURL)
        console.log(response)    
}
     

    async fetchData() {
        let response = await fetch(this.baseURL);
        let data = await response.json();
        return data
        
    }

    async fetchWeatherRequest(name) {
        let res = await fetch(this.baseURL + `locations/${name}`);
        if (res.status >= 200 && res.status <= 299) {
            let data = await res.json()
            return data;
        } else {
          console.log(res.status, res.statusText);
        }
    }
      

    async fetchLocation(userId) {
        const fetchURL =  `${this.baseURL}users/${userId}/user_locations`;  
        fetch(fetchURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(resp => resp.json())
        .then(response => {
          document.querySelector('.cities').addEventListener('click', (e) => {
            if (e.target.closest(".sr-only-button")) {
              console.log(e.target)
              deleteCard(e)
            }
          })

          // try code for no locations
          // const listItems = list.querySelectorAll(".ajax-section .city");
          // const listItemsArray = Array.from(listItems);
          // const msg = document.querySelector(".msg");
          // console.log(msg)
          // const locationNumber = Array.prototype.slice.call(document.getElementsByClassName('city'))
          // console.log(locationNumber)
          // if (listItemsArray.length === 0) {
            // console.log("here")
            // document.querySelector(".msg").innerHTML = " you dont have any Locations yet"
          // } 

          response.locations.forEach(location => {
            const thislocation = new Location(location.id, location.name, location.user_id);
            renderAllLocationWeather(location.name, location.id, location.user_id);
          });
      
        })
      }


    async fetchCreateLocation(name, id, user_id) { 
    let data = {
        location: { 
          name,
          id, 
          user_id: window.sessionStorage.currentUserId
        }
      }
  
        let configObj = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        const fetchURL =  `${this.baseURL}locations`;

        fetch(fetchURL,configObj)
        // .then(data => console.log(data));
        .then(resp => resp.json())
        .then(resp => {
            if (resp.message) {
              alert(resp.message);
            } else {
              let newLocation = new Location(resp.name, resp.id, resp.user_id)
              console.log(newLocation)
              renderAllLocationWeather(resp.name, resp.id, resp.user_id)

            }
        })
    }


      async locationDelete(nameId) {
        const configObj = {
          method: 'DELETE',
          headers: {
          }
        }
      
        fetch(`${this.baseURL}locations/${nameId}`, configObj) 
        .then(function(response) {
        })
      }

      async sessionEnd(id) {
          
        const configObj = {
          method: 'POST',
          headers: {
          }
        }

        fetch (`${this.baseURL}${id}`, configObj)
        .then(function(response) {

          if (confirm('Are you sure you want logout?')) {
            end();
          } else {
            return
          }
        })

      }
}

 
