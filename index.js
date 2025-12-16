//weather app
//queryselector is used because we didn't write id but class for styles\
//querySelector return class's first child
const weatherform=document.querySelector(".weatherform");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="2561c1b25e6731310ab610ca59285d1b";

weatherform.addEventListener("submit", async event=>{
    event.preventDefault();
    const city=cityInput.value;
    if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter a city");
    }

});
async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response= await fetch(apiUrl);
    console.log(response);
    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }
    return await response.json();

}
function displayWeatherInfo(data){
    const{name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;
        card.textContent="";
        card.style.display="flex";
        const cityDisplay= document.createElement("h1");
        const tempDisplay=document.createElement("p");
        const humidityDisplay=document.createElement("p");
        const descDisplay=document.createElement("p");
        const weatherEmoji=document.createElement("p");

        cityDisplay.textContent=city;
        tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
        humidityDisplay.textContent=`Humidity:${humidity}`;
        descDisplay.textContent=description;
        weatherEmoji.textContent=getWeatherEmoji(id);

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);
        

        
}
function getWeatherEmoji(weatherId){
    switch(true)
    {
        case (weatherId>= 200 && weatherId<300):
            return "⛈️";
        case (weatherId>=300 && weatherId<500):
            return "🌧️";       
        case (weatherId>=500 && weatherId<600):
            return "🌧️";    
        case (weatherId>=600 && weatherId<700):
            return "❄️";   
        case (weatherId>=700 && weatherId<800):
            return "😶‍🌫️";      
        case (weatherId===800):
            return "☀️";   
        case(weatherId>800 && weatherId<900):
            return "💭";
        default:
            return "❓"          
    }

}
function displayError(message){
    const errrorDisplay=document.createElement("p");
    errrorDisplay.textContent=message;
    errrorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errrorDisplay)

}