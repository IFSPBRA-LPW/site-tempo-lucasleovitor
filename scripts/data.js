import { API_KEY } from "./config.js"
export async function getDadosAPI(city){
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`
    )
    if (!response.ok){
        throw new Error ("Erro na busca da API")
    }
    let dados = await response.json()
    console.log(dados)
    return criarCidade(dados)
   
}

export function cidadePadrao(){
    let cidade= { 
        city: "RJ", 
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
    return cidade
}

export function criarCidade(bruto){
    diario = bruto['forescast']['forecastday']
    let cidade= { 
        city: bruto['location']['name'], 
        country: bruto['location']['country'], 
        date: "Tuesday, Aug 5, 2025", 
        icon: bruto['current']['condition']['icon'], 
        temperature: bruto['current']['temp_c'], 
        feelsLike: bruto['current']['feelslike_c'], 
        humidity: bruto['current']['humidity'], 
        wind: bruto['current']['gust_kph'], 
        precipitation: bruto['current']['precip_mm'], 
        daily: [ 
        // { day: "Tue", icon: "🌧", max: 20, min: 14 }, 
        // { day: "Wed", icon: "🌧", max: 21, min: 15 }, 
        // { day: "Thu", icon: "☀", max: 24, min: 14 }, 
        // { day: "Fri", icon: "☀", max: 25, min: 13 }, 
        // { day: "Sat", icon: "⛈", max: 21, min: 15 }, 
        // { day: "Sun", icon: "☁", max: 25, min: 16 }, 
        // { day: "Mon", icon: "🌫", max: 24, min: 15 }, 
        ], //PAREI AQUI
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
    for(let i = 0; i < diario.length;i++){
        dia = {day: DiaSemana(diario[i]['date']), icon:diario[i]['day']['condition']['icon'], max: diario[i]['day']['maxtemp_c'], min: diario[i]['day']['mintemp_c']
        }
        cidade[daily].append(dia)
    }
    return cidade
}

function DiaSemana(data) {
    dias=['Seg','ter','Qua','Qui','Sex','Sab','Dom']
    return dias[data.getDay(data)]; // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
}