const profile = document.querySelector("#profilePic");

async function loadUser()
{
    const response = await fetch("https://xcell-backend.onrender.com/user", {credentials: "include"});
    const notePad = document.getElementById("notePad");

    if(response.ok)
    {
        const user = await response.json();
        const arr = user.name.split(" ");
        if(notePad)
        {
            document.getElementById("noteOverlay").style.display = "none";
        }
        document.getElementById("topRight").textContent = "Hello, " + arr[0] + "!";
        document.getElementById("topRight").removeAttribute("href");
        document.getElementById("profilePic").style.width = "40px";
        document.getElementById("profilePic").style.marginLeft = "15px";
        document.getElementById("profilePic").src = user.picture;
        console.log("Profile picture URL:", user.picture);
        console.log("Image element:", document.getElementById("profilePic"));
        const indexLogIn = document.getElementById("indexLogIn")
        if(indexLogIn)
        {
            indexLogIn.style.display = "none";
            document.getElementById("indexTutorial").classList.add("center-button");
        }
    }
    else
    {

        if(notePad)
        {
            document.getElementById("noteOverlay").style.display = "block";
        }
    }
}

async function getCsrfToken()
{
    const response = await fetch("https://xcell-backend.onrender.com/csrf", {credentials: "include"});
    
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


const signOutButton = document.getElementById("profilePic");
// const logInRIGHT = document.getElementById("topRight");
// const indexLogIn = document.getElementById("indexLogIn");

// if(logInRIGHT)
// {
//     logInRIGHT.addEventListener("click", () => {
//         loadUser();
//     });
// }

// if(indexLogIn)
// {
//     indexLogIn.addEventListener("click", () => {
//         loadUser();
//     });
// }

if(signOutButton)
{
    signOutButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (confirm("Are you sure you want to sign out?")) {
        fetch("https://xcell-backend.onrender.com/logout", {
            method: "POST",
            credentials: "include"
        }).then(() => {
            window.location.href = "/frontend/pages/index.html";
        });
    }
    });

}