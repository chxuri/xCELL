const title = document.getElementById("noteTitle");
const content = document.getElementById("noteContent");
const saveBtn = document.getElementById("saveNote");
const clearBtn = document.getElementById("clearNote");


saveBtn.addEventListener("click", async () =>
{
    const titleText = title.value;
    const contentText = content.value;

    if(titleText.trim() == "")
    {
        alert("Please enter a title!");
        return;
    }
    else if(contentText.trim() == "")
    {
        alert("Please fill out the content field!");
        return;
    }

    const noteData = {
        title: titleText,
        content: contentText
    };

    //await keyword to ensure actual response not a promise
    const csrfToken = await getCsrfToken();

    const response = await fetch("http://localhost:8080/notes", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "X-XSRF-TOKEN": csrfToken
            },
            //turns object into json
            body: JSON.stringify(noteData),
            credentials: "include"
    });

    if(response.ok)
    {
        alert("Note saved!");
        title.value = "";
        content.value = "";
    }
    else
    {
        alert("Error in saving note :(");
    }
});

clearBtn.addEventListener("click", () => {
    title.value = "";
    content.value = "";
});


const nucleus = document.getElementById("nucleusA");
const organelleTitle = document.getElementById("organelleTitleWords");
const organelleContent = document.getElementById("organelleContentWords");

nucleus.addEventListener("click", () => {
    selectOrganelle(nucleus, 
        "nucleus", 
        "Contains the cell's DNA and helps control cell activities.")
});

function removeHighlight()
{
    const organelles = document.querySelectorAll(".organelle");

    organelles.forEach(organelle => {
        organelle.classList.remove("selectedOrganelle");
    });
}

function selectOrganelle(organelle, title, content)
{
    removeHighlight();
    organelle.classList.add("selectedOrganelle");
    organelleTitle.textContent = title;
    organelleContent.textContent = content;

}