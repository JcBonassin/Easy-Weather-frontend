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

      async locationUpdate() {

        const fetchURL =  `${this.baseURL}locations`;

        fetch(fetchURL, {
          method: 'GET',
          headers: {
          }
        })
        .then(resp => resp.json())
        .then(response => {
            response.forEach(location => {
                const thislocation = [location.name, location.id, location.user_id]
                console.log(thislocation)
                renderAllLocationWeather(location.name, location.id, location.user_id)
            }
            )}
        )}
}

 
