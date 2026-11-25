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