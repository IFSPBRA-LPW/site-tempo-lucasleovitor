import  {criarCidade,cidadePadrao}  from "./data.js";
const form = document.querySelector('form')
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const input = document.querySelector('input').value
    var a = criarCidade(input)
})

function climaHoje(city,country,date,icon,temperature,feelsLike,humidity,wind,precipitation){
    function climaMomento(city,country,date,icon,temperature){
        
        const cityHTML = document.getElementById('city')
        const tempMomentoHTML = document.getElementById('temp-momento')

        cityHTML.innerText = `${city} , ${country}\n${date}`
        tempMomentoHTML.innerHTML = `${icon}  ${temperature}° `
    }
    climaMomento(city,country,date,icon,temperature)

    const sensacaoHTML = document.getElementById('v-sensacao')
    const umidadeHTML = document.getElementById('v-umidade')
    const ventoHTML = document.getElementById('v-vento')
    const precipitacaoHTML = document.getElementById('v-precipitacao')

    sensacaoHTML.innerHTML = feelsLike
    umidadeHTML.innerHTML = humidity
    ventoHTML.innerHTML = wind
    precipitacaoHTML.innerHTML = precipitation
}

function semana(daily){
    const semanaHTML = document.getElementById('semana')
    for(let i = 0; i<daily.length;i++){
        semanaHTML.append(criarDia(daily[i]))
    }
    function criarDia(daily){
        const div = document.createElement('div')
        const day = document.createElement('p')
        const variacao = document.createElement('div')
        const icon = document.createElement('p')
        const max = document.createElement('p')
        const min = document.createElement('p')
        

        div.classList.add('dia')
        variacao.classList.add('variacao')

        
        day.innerText = daily['day']
        icon.innerText = daily['icon']
        max.innerText = daily['max']
        min.innerText = daily['min']
        variacao.append(max,min)
        div.append(day,icon,variacao)
        return div
    }


}
function climaHora(hourly){
    const climaHoraHTML = document.getElementById('clima-hora')
    for(let i = 0; i < hourly.length;i++){
        climaHoraHTML.append(criarHora(hourly[i]))
    }
    function criarHora(hourly){
        const div = document.createElement('div')
        const time = document.createElement('p')
        const temp = document.createElement('p')

        div.classList.add('hora')

        time.innerText = hourly['time']
        temp.innerText = hourly['temp']

        div.append(time,temp)
        return div
    }
}



function renderizar(cityWeather){
    climaHoje(cityWeather['city'],cityWeather['country'],cityWeather['date'],cityWeather['icon'],cityWeather['temperature'], cityWeather['feelsLike'],cityWeather['humidity'],
        cityWeather['wind'], cityWeather['precipitation']
    )
    semana(cityWeather['daily'])
    climaHora(cityWeather['hourly'])
}
renderizar(cidadePadrao())