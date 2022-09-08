const socket = io()
let name1;
let textarea = document.querySelector('#textarea')
let  messageArea = document.querySelector('.message__area')


do{
    name1 = prompt("Enter your name: ")
}while(!name1)

textarea.addEventListener('keyup',(e)=>{
    if(e.key === "Enter"){
        sendMessage(e.target.value)
    }
})


function sendMessage(message){
    let msg = {
        user: name1,
        message: message
    }

    //Apend the msg in msg box
    appendMessage(msg,'outgoing')
    textarea.value=""
    scrollToBottom()

    //send to server
    socket.emit('messageevent',msg)





}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}




//receive msg
socket.on('messageevent',(msg) =>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})




//scroll to bottom fucntion
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}