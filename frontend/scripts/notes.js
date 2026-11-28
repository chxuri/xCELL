
//issue to fix: note length limit??
//make sure to make scroll bar visible when exceeds certain length

async function getNotes()
{
    const response = await fetch("https://xcell-backend.onrender.com/notes", {
        method: "GET",
        credentials: "include"
    });

    const notes = await response.json();
    
    return notes;
}

function createNote(noteJSON)
{
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    const noteTopElement = document.createElement("div");
    noteTopElement.classList.add("note-top");

    const dateElement = document.createElement("div");
    dateElement.classList.add("note-date", "note-top-left");

    const noteTopRightElement = document.createElement("div");
    noteTopRightElement.classList.add("note-top-right");

    const editElement = document.createElement("a");
    editElement.classList.add("edit-note", "small-button");

    const deleteElement = document.createElement("a");
    deleteElement.classList.add("delete-note", "small-button");

    const titleElement = document.createElement("div");
    titleElement.classList.add("note-title");

    const contentElement = document.createElement("div");
    contentElement.classList.add("note-content");


    noteElement.appendChild(noteTopElement);

    noteTopElement.appendChild(dateElement);

    noteTopElement.appendChild(noteTopRightElement);

    noteTopRightElement.appendChild(editElement);
    noteTopRightElement.appendChild(deleteElement);

    noteElement.appendChild(titleElement);
    noteElement.appendChild(contentElement);


    titleElement.textContent = noteJSON.title;
    contentElement.textContent = noteJSON.content;
    deleteElement.textContent = "delete";
    editElement.textContent = "edit";

    noteElement.dataset.id = noteJSON.id;


    let isEditing = false;

    let titleInputElement;
    let contentInputElement;

    
    deleteElement.addEventListener("click", async () => {

        if(isEditing)
        {
            titleInputElement.replaceWith(titleElement);
            contentInputElement.replaceWith(contentElement);

            deleteElement.textContent = "delete";
            editElement.textContent = "edit";

            isEditing = false;
        }
        else
        {
            const csrfToken = await getCsrfToken();
            const response = await fetch(`https://xcell-backend.onrender.com/notes/${noteElement.dataset.id}`, {
            method: "DELETE",
            headers: {"X-XSRF-TOKEN": csrfToken},
            credentials: "include"
            });

            if(response.ok)
            {
                noteElement.remove();
                alert("Note deleted!");
            }
            else
            {
                alert("Note couldn't be deleted!");     
            }
        }
    });

    editElement.addEventListener("click", async () => {
        if(!isEditing)
        {
            titleInputElement = document.createElement("input");
            contentInputElement = document.createElement("textarea");

            titleInputElement.value = titleElement.textContent;
            contentInputElement.value = contentElement.textContent;

            titleElement.replaceWith(titleInputElement);
            contentElement.replaceWith(contentInputElement);

            deleteElement.textContent = "cancel";
            editElement.textContent = "save";
            
            isEditing = true;
        }
        else if(isEditing)
        {   
            
            const noteData = {
            title: titleInputElement.value,
            content: contentInputElement.value
            };
            const csrfToken = await getCsrfToken();
            const response = await fetch(`https://xcell-backend.onrender.com/notes/${noteElement.dataset.id}`, {
                method: "PUT",
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
                titleElement.textContent = titleInputElement.value;
                contentElement.textContent = contentInputElement.value;
                titleInputElement.replaceWith(titleElement);
                contentInputElement.replaceWith(contentElement);

                deleteElement.textContent = "delete";
                editElement.textContent = "edit";

                isEditing = false;
                alert("Note saved!");
            }
            else
            {
                alert("Note couldn't be saved!");
            }
            
        }

    });

    return noteElement;
}

async function displayNotes()
{
    console.log("test");
    //await bc getNotes is an async func
    const notes = await getNotes();
    const container = document.getElementById("notesContainer");
    notes.forEach((note) => {
        container.appendChild(createNote(note));
    })
}

displayNotes();