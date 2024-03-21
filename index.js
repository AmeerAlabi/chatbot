const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatBox = document.querySelector(".chatbox");
const API_KEY = "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";
 
const inputUnitHeight = chatInput.scrollHeight;

sendChatBtn.addEventListener("click" , handleChat );
const chatToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

function handleChat (){
    userMessage = chatInput.value.trim();
    if (!userMessage) return ;

    chatInput.style.height  = `${inputUnitHeight}px`;


   chatBox.appendChild (createChatLi(userMessage , "outgoing"));
   chatBox.scrollTo (0, chatBox.scrollHeight);

   setTimeout(() => {
    const incomngChatLi =  createChatLi ("thinking..." , "incoming")
    chatBox.appendChild (incomngChatLi);
    chatBox.scrollTo (0, chatBox.scrollHeight);
    generateResponse(incomngChatLi);
   }, 600);

}
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
      chatLi.classList.add("chat", className) 
      let chatContent = className === "outgoing" ? `<p>${message} </p>` : `<span>🤖</span> <p>${message} </p>`;
      chatLi.innerHTML  = chatContent;
      return chatLi
}

 const generateResponse = (incomngChatLi)  => {
    const API_URL = " https://api.openai.com/v1/chat/completions";
    const messageElement = incomngChatLi.querySelector("p");
    const requestOptions = {
        method : "POST" , 
        headers : {
            "content-Type" : "application/json" , 
            "Authorization" : `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            "messages": [
              {
                role: "user",
                content: userMessage
              } ]
        })
    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
      messageElement.textContent = data.choices[0].message.content;
    }).catch ((error) => {
      messageElement.textContent = "Oops! Something went wrong . please try again";
    }).finally(() =>    chatBox.scrollTo (0, chatBox.scrollHeight));
 }

chatToggler.addEventListener("click" , () => document.body.classList.toggle("show-chatbot"));
chatbotCloseBtn.addEventListener("click" , () => document.body.classList.remove("show-chatbot"));


chatInput.addEventListener("input" , () => {
  chatInput.style.height  = `${inputUnitHeight}px`;
  chatInput.style.height  = `${ chatInput.scrollHeight}px`;
})




chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat();
  }
});
