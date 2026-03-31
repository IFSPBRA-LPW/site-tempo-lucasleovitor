import { API_KEY } from "./config.js"
async function getDadosAPI(city){
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`
    )
    if (!response.ok){
        throw new Error ("Erro na busca da API")
    }
    let dados = await response.json()
    return dados
   
}
export async function criarCidade(input){
    try{
        var bruto = await getDadosAPI(input)
        console.log(bruto)
    }catch (error) {
        console.error("Erro ao processar cidade:", error.message)
    }
    let diario = bruto['forecast']['forecastday']
    let horario = bruto['forecast']['forecastday'][0]['hour']
    let cidade= { 
        city: bruto['location']['name'], 
        country: bruto['location']['country'], 
        date: "Tuesday, Aug 5, 2025", 
        icon: bruto['current']['condition']['icon'], 
        temperature: bruto['current']['temp_c'], 
        feelsLike: `${bruto['current']['feelslike_c']}°C`, 
        humidity: `${bruto['current']['humidity']}%`, 
        wind: `${bruto['current']['gust_kph']}kpm`, 
        precipitation: `${bruto['current']['precip_mm'] * 100}%`, 
        daily: [ ],
        hourly: [],
    }
    for(let i = 0; i < diario.length;i++){
        let dia = {day: diaSemana(diario[i]['date']), icon:diario[i]['day']['condition']['icon'], max: diario[i]['day']['maxtemp_c'], min: diario[i]['day']['mintemp_c']
        }
        cidade['daily'].push(dia)
    }
    for(let i = 15;i<22;i++){
        let hora = {time:[horario[i]['condition']['icon'],`${i}hr`], temp:`${horario[i]['feelslike_c']}°C`}
        cidade['hourly'].push(hora)
    }

    return cidade
}

function diaSemana(dia) {
    let dias=['Dom','Seg','ter','Qua','Qui','Sex','Sab']
    const data = new Date(dia + "T12:00:00")
    return dias[data.getDay()]
}