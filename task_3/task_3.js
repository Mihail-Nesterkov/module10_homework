const wsUrl = "wss://echo-ws-service.herokuapp.com";

const output = document.querySelector('.display');
const input = document.getElementById('input');
const btn = document.getElementById('btn');
const btnGeo = document.getElementById('btnGeo')

let websocket;

function writeToScreen(message){
    let pre =
        document.createElement('div');
    pre.style.overflowWrap = 'break-word';
    pre.setAttribute('class', 'clientD')
    pre.innerHTML = `<p>${message}</p>`;
    output.appendChild(pre);
}

function writeToScreenServer(message){
    let pre =
        document.createElement('div');
    pre.style.overflowWrap = 'break-word';
    // pre.style.wordWrap = "break-word";
    pre.setAttribute('class', 'serverD')
    pre.innerHTML = `${message}`;
    output.appendChild(pre);
}
websocket = new WebSocket(wsUrl);
websocket.onmessage = function (evt){
    writeToScreenServer('<p class="server">Server: ' + evt.data+'</p>')
}

btn.addEventListener('click', () => {
    const message = `${input.value}`;
    writeToScreen('Client: ' + message);
    websocket.send(message)
    input.value = '';
})

const error = () =>{
    let err = document.createElement('p')
    err.innerHTML = 'Не удается получить ваше местоположение.';
    output.appendChild(err);

}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let geod = `Широта ${latitude}, Долгота ${longitude}<br><a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Ссылка на карту</a>`
    writeToScreen(geod);
}
btnGeo.addEventListener('click', () => {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error)
    }else output.textContent = 'Гео-локация не поддерживается вашим браузером'
})