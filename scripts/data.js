import { API_KEY } from "./config.js"
import {criarObjetoCidade} from './index.js'
export {API_KEY} from "./config.js"

async function getDadosAPI(city){
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`
    )
    if (!response.ok){
        throw new Error ("Erro na busca da API")
    }
    return response.json()
}
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const input = document.querySelector('input').value
    function criarCidade(dados){
        
    }
    criarCidade(getDadosAPI(input))
})

function criarCidade(dados){
    const cityWeather = { 
    city: dados[''], 
    country: "Brazil", 
    date: "Tuesday, Aug 5, 2025", 
    icon: "☀", 
    temperature: 40, 
    feelsLike: 20, 
    humidity: 40, 
    wind: 10, 
    precipitation: 0, 
    daily: [ 
    { day: "Tue", icon: "🌧", max: 20, min: 14 }, 
    { day: "Wed", icon: "🌧", max: 21, min: 15 }, 
    { day: "Thu", icon: "☀", max: 24, min: 14 }, 
    { day: "Fri", icon: "☀", max: 25, min: 13 }, 
    { day: "Sat", icon: "⛈", max: 21, min: 15 }, 
    { day: "Sun", icon: "☁", max: 25, min: 16 }, 
    
    { day: "Mon", icon: "🌫", max: 24, min: 15 }, 
    ], 
    hourly: [ 
    { time: "☀3 PM", temp: 20 }, 
    { time: "☀4 PM", temp: 20 }, 
    { time: "☀5 PM", temp: 20 }, 
    { time: "☁6 PM", temp: 19 }, 
    { time: "☁7 PM", temp: 18 }, 
    { time: "☁8 PM", temp: 18 }, 
    { time: "☁9 PM", temp: 17 }, 
    ], 
}
}

