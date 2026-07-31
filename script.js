const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");


async function sendMessage() {

    let message = userInput.value.trim();

    if (message === "") {
        return;
    }


    // Show user message
    let userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.innerText = message;

    chatBox.appendChild(userMessage);


    userInput.value = "";


    // Send message to backend
    try {

        let response = await fetch("https://sandhiyaa.pythonanywhere.com/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        let data = await response.json();


        // Show AI response
        let botMessage = document.createElement("div");
        botMessage.className = "bot-message";
        botMessage.innerText = data.reply;

        chatBox.appendChild(botMessage);


    }

    catch(error) {

        let botMessage = document.createElement("div");
        botMessage.className = "bot-message";
        botMessage.innerText = "⚠️ Cannot connect to AI server.";

        chatBox.appendChild(botMessage);

    }


    chatBox.scrollTop = chatBox.scrollHeight;

}


// Press Enter button
userInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        sendMessage();
    }

});