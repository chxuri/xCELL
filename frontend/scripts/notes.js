
//issue to fix: pfp sometimes goes away

async function getNotes()
{
    const response = await fetch("http://localhost:8080/notes", {
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

    dateElement.textContent = "date";
    deleteElement.textContent = "delete";
    editElement.textContent = "edit";

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