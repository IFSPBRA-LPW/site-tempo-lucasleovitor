import  {criarCidade}  from "./data.js";
const form = document.querySelector('form')
form.addEventListener("submit",async (e)=>{
    e.preventDefault()
    const input = document.querySelector('input').value
    renderizar( await criarCidade(input))
})
const climaHoraHTML = document.getElementById('clima-hora')
const semanaHTML = document.getElementById('semana')
const detalhar = document.getElementById('detalhar')
const momento = document.getElementById('clima-momento')
const secaoEsquerda = document.getElementById('secao-equerda')
const buttonEscuro = document.getElementById('modo-cor')
let status = 'dia'
const body = document.querySelector('body')
const listaModoEscuro = [body,climaHoraHTML,detalhar,momento,secaoEsquerda]

buttonEscuro.addEventListener('click',()=>{

    if (status == 'noite'){
        for(let i = 0;i<listaModoEscuro.length;i++){
            listaModoEscuro[i].classList.add('light')
            listaModoEscuro[i].classList.remove('dark')
        }
        buttonEscuro.innerHTML = '☀️'
        status = 'dia'
    }
    else{
        buttonEscuro.innerHTML = '🌙'
        status = 'noite'
        for(let i = 0;i<listaModoEscuro.length;i++){
            listaModoEscuro[i].classList.remove('light')
            listaModoEscuro[i].classList.add('dark')
        }
        
    }
    console.log(status)
})

function climaHoje(city,country,date,icon,temperature,feelsLike,humidity,wind,precipitation){
    function climaMomento(city,country,date,icon,temperature){
        const img = document.createElement('img')
        img.src = icon
        const cityHTML = document.getElementById('city')
        cityHTML.innerHTML = ''
        const tempMomentoHTML = document.getElementById('temp-momento')
        tempMomentoHTML.innerHTML = ''
        temperature = `${temperature}°  `
        cityHTML.innerText = `${city} , ${country}\n${date}`
        tempMomentoHTML.append(img,temperature)
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
    semanaHTML.innerHTML = '';
    for(let i = 0; i<daily.length;i++){
        semanaHTML.append(criarDia(daily[i]))
    }
    function criarDia(daily){
        const div = document.createElement('div')
        const day = document.createElement('p')
        const variacao = document.createElement('div')
        const img = document.createElement('img')
        const max = document.createElement('p')
        const min = document.createElement('p')
        

        div.classList.add('dia')
        variacao.classList.add('variacao')

        
        day.innerText = daily['day']
        img.src = daily['icon']
        max.innerText = `${daily['max']}°C `
        min.innerText =` / ${daily['min']}°C`
        variacao.append(max,min)
        div.append(day,img,variacao)
        return div
    }


}
function climaHora(hourly){
    climaHoraHTML.innerHTML = ''
    for(let i = 0; i < hourly.length;i++){
        climaHoraHTML.append(criarHora(hourly[i]))
    }
    function criarHora(hourly){
        const div = document.createElement('div')
        const timeDiv = document.createElement('div')
        const time = document.createElement('p')
        const temp = document.createElement('p')
        const img = document.createElement('img')
        img.src = hourly['time'][0]
        div.classList.add('hora')

        time.innerHTML = hourly['time'][1]
        temp.innerText = hourly['temp']
        timeDiv.append(img,time)
        div.append(timeDiv,temp)
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
renderizar(await criarCidade('Rio de Janeiro'))

