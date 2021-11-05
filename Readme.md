![Easy Weather](https://user-images.githubusercontent.com/72950188/140430595-8c8bad48-77e2-4889-ac7e-f3e86858a098.png)
<div align="center" > 
<p>With this Ruby on Rails and JavaScrip based webapp, you can easily check the weather in any city.</p>
</div>

# Hello 

Welcome to Easy Weather! 

This is a single page application ("SPA") for checking the weather. 


So what can I do with this app: 

- Open you own profile or account.
- Check the weather in any city and delete it.
-  It gives you 1 unit system: 
  - Metric (temperatures in Celsius)

## Important information 

Before running the App is important to: 

- Sign up for a API key on [OPENWEATHERMAP](https://openweathermap.org/). It's free

Please don't forget to create a `.env` for the root of the project. This will hide your API Keys and avoid being published on your repository in case you fork it. 

Inside the `.env` file add the following 3 lines of code:

```cassandraql
API_KEY = YOURKEY
API_NEWS = YOURKEY
etc........ 
```

"Voila" to the next step.... 

## Getting Started

To get the application started you must install Ruby on Rails and sqlite3 on your computer.


Before running your server, you will need to install the gems and add content to your database manually or you can use the seeds some data:

To install the gems first cd into <a href="https://github.com/JcBonassin/Easy_weather_api_backend"></a> and run the following:

```sh
bundle install
```

To run your migrations and update your db/schema.rb file to match the structure of the database, run the following:

```sh
rails db:create
```

```sh
rails db:migrate
```

To create data in the database, run the following:
```sh
rails db:seed
```

```sh
rails s -p 7000 ( Optional to run your backend in pararel with your frontend)
```

- Clone the repo: git clone https://github.com/JcBonassin/Easy-Weather-frontend.git
- Install gems bundle install
- cd to Easy-weather-js file
- Start the server with npx lite-server (Install lite-serve in case you need to: https://www.npmjs.com/package/lite-server )
- Navigate to your local server http://localhost:3000/


## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

- Fork the Project
- Create your Feature Branch (git checkout -b feature/AmazingFeature)
- Commit your Changes (git commit -m 'Add some AmazingFeature')
- Push to the Branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## Contact
Connect/Follow me:

[[Linkedin]: https://www.linkedin.com/in/jcbonassin/]
[[Twitter]: https://twitter.com/jcbonassin?lang=en]
[[Dev.to]: https://dev.to/jcbonassin]

## Copyright and License

- This project is licensed under the terms of the [MIT License](https://opensource.org/licenses/MIT).

- Copyright (c) 2021, [Jc Bonassin](https://www.jcbonassin.net/).


