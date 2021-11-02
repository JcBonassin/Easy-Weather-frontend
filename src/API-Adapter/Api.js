class Api {
    constructor() {
        this.baseURL = "http://localhost:7000/"
    }

    async fetchUsers() {
        let response = await fetch(this.baseURL + `/users`)
        let data = await response.json()
        return data
    }

    async postUser(email, password, registerUser) {
        let data = {
          user: {
            email,
            password
          }
        }
        // console.log(data)

        let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(data)
          }
          const fetchURL = registerUser ? `${this.baseURL}users` : `${this.baseURL}login`;
        //   const welcome = registerUser ? 'signed up' : 'logged in';
        
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
                // console.log(data.user.id)
                loginButton.remove();
                userLogin.remove();
                welcomeLoggin();
                // alert(`Succesfully ${welcome} - Hello!`);
                // renderLocationWeather();
                allLocation(data.user.id);
                // rederAllLocations();
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
        //   const welcome = registerUser ? 'signed up' : 'logged in';
        // console.log(fetchURL)

        
          fetch(fetchURL, configObj)
            .then(resp => resp.json())
            .then(data => { 
                if (data.errors) {
                username = '';
                email = '';
                password = '';
                alert(data.errors);
              } else {
                // let newUser = new User(data.username, data.email, data.id)
                // console.log(newUser)
                window.sessionStorage.currentUsername = data.user.username;
                window.sessionStorage.currentEmail = data.user.email;
                window.sessionStorage.currentUserId = data.user.id;
                loginButton.remove();
                userLogin.remove();
                welcomeLoggin();
                // alert(`Succesfully ${welcome} - Hello!`);
                // renderLocationWeather();
                allLocation(data.user.id);
                // rederAllLocations();
                displayForm()  
            }
        });  
    }



    async fetchURL() {
        const fetchURL = registerUser ? `${this.baseURL}users` : `${this.baseURL}login`;
        // const myWording = registerUser ? 'signed up' : 'logged_in';
        let response = await fetch(fetchURL)
        console.log(response)    
}
     

    async fetchData() {
        let response = await fetch(this.baseURL);
        let data = await response.json();
        return data
        
    }

    async fetchWeatherRequest(name) {

        // const msg = document.querySelector(".msg")

        let res = await fetch(this.baseURL + `locations/${name}`);
        if (res.status >= 200 && res.status <= 299) {
            let data = await res.json()
        //    await this.fetchCreateLocation(name)
            return data;
          console.log(data);
        } else {
        //   msg.textContent = "Please search for a valid city";
          console.log(res.status, res.statusText);
        }
        // let res = await fetch(this.baseURL + `locations/${name}`)
        // let data = await res.json()
        // console.log(data)
        // return data   
    }
      

    async fetchLocation(userId) {
        const fetchURL =  `${this.baseURL}users/${userId}/user_locations`;  
        // `${this.baseURL}locations`; 
        fetch(fetchURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // Include the encrypted token for back-end authorization
            // Authorization: `Bearer ${window.sessionStorage.accessToken}`
          }
        })
        .then(resp => resp.json())
        // .then(data => console.log(data));
        .then(response => {
          response.locations.forEach(location => {
            //   const nameId = location.user_id
            //   console.log(nameId)
            //  console.log(userId)
            const thislocation = new Location(location.id, location.name, location.user_id);
            // console.log(thislocation)
            // this.renderAllLocationWeather();
            renderAllLocationWeather(location.name, location.id, location.user_id);
            // renderLocationWeatherRequest(id);
            // thislocation.renderLocationWeatherRequest
            // thisEvent.renderEventCard();
          });
        //   console.log(response);
        })
        // .catch(err => alert(err));
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
        // console.log(configObj)

        fetch(fetchURL,configObj)
        .then(resp => resp.json())
        // .then(data => console.log(data));
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
            // Include the encrypted token for back-end authorization
            // Authorization: `Bearer ${window.sessionStorage.accessToken}`
          }
        }
      
        fetch(`${this.baseURL}locations/${nameId}`, configObj) 
        .then(function(response) {
            // console.log(response);
            // if (confirm('Are you sure you want to delete?')) {
                // clearcard()
                // console.log('deleted.');
            //   } else {
                // return
                // console.log('Thing was not saved to the database.');
            //   }
        //   alert("Deletion successful - location removed");
        //    clearcard()  
        })
        // .catch(err => alert(err));
      }

      async locationUpdate() {

        const fetchURL =  `${this.baseURL}locations`;

        fetch(fetchURL, {
          method: 'GET',
          headers: {
          }
        })
        .then(resp => resp.json())
        // .then(data => console.log(data))
        .then(response => {
            response.forEach(location => {
                const thislocation = [location.name, location.id, location.user_id]
                console.log(thislocation)
                renderAllLocationWeather(location.name, location.id, location.user_id)
            }
            )}
        )}


}

 
