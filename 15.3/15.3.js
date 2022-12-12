

const wsUri = "wss://echo-ws-service.herokuapp.com";
const btn = document.getElementById("button");
const output = document.getElementById("output");
const chatOutput = document.querySelector(".chat_output");    

function pageLoaded() {
  const infoOutput = document.querySelector(".info_output");
  
  const input = document.querySelector(".inp");
  const sendBtn = document.querySelector(".btn");
  
  let socket = new WebSocket(wsUri);
  
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  }
  
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }
  
  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  }
  
  sendBtn.addEventListener("click", sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  }
  
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }
}




    
    btn.addEventListener("click", getLocation);
    
    function getLocation() {
      if ("geolocation" in navigator) {
        let locationOptions = {
          enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
      } else {
        writeOutput("Ваш браузер не поддерживает функцию определения местоположения");
      }
    }
    
    function locationSuccess(data) {
       
      let link = `https://www.openstreetmap.org/#map=14/${data.coords.latitude}/${data.coords.longitude}`;
      
      writeOutput(`<a href="${link}" target="_blank">Вы находитесь здесь</a>`);
    }
    
    function locationError() {
      writeOutput("При получении местоположения произошла ошибка");
    }
    
    function writeOutput(message) {
        
            let messageHTML = `<div class="recieved">${message}</div>`;
            chatOutput.innerHTML += messageHTML;
          }
  document.addEventListener("DOMContentLoaded", pageLoaded);