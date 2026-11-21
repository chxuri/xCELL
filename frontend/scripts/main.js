const button = document.getElementById("testButton");
const response = document.getElementById("response");


async function loadUser()
{
    console.log("in loadUser");
    const response = await fetch("http://localhost:8080/user", {credentials: "include"});
    const user = await response.json();

    document.getElementById("topRight").textContent = user.name;
}

loadUser();