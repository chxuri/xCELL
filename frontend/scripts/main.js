const button = document.getElementById("testButton");
const response = document.getElementById("response");

button.addEventListener("click", async function() 
{
    const result = await fetch("http://localhost:8080/login");
    const message = await result.text();
    response.textContent = message;
})