const profile = document.querySelector("#profilePic");


async function loadUser()
{
    console.log("in loadUser");
    const response = await fetch("http://localhost:8080/user", {credentials: "include"});
    const user = await response.json();
    const arr = user.name.split(" ");
    document.getElementById("topRight").textContent = "Hello, " + arr[0] + "!";
    document.getElementById("topRight").removeAttribute("href");
    document.getElementById("profilePic").style.width = "40px";
    document.getElementById("profilePic").style.marginLeft = "15px";
    document.getElementById("profilePic").src = user.picture;
    const indexLogIn = document.getElementById("indexLogIn")
    if(indexLogIn)
    {
        indexLogIn.style.display = "none";
        document.getElementById("indexTutorial").classList.add("center-button");
    }
}

async function getCsrfToken()
{
    const response = await fetch("http://localhost:8080/csrf", {credentials: "include"});
    
    const csrfCookie = document.cookie.split("; ").find(cookie => cookie.startsWith("XSRF-TOKEN="));

    return csrfCookie ? decodeURIComponent(csrfCookie.substring("XSRF-TOKEN=".length)): null;
}


//style this later??
profile.addEventListener("click", function(e)
{
    if(confirm("Log out?"))
    {
        console.log(true);
    }
})

loadUser();