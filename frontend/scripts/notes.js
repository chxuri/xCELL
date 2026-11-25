

async function getNotes()
{
    const response = await fetch("http://localhost:8080/notes", {
        method: "GET",
        credentials: "include"
    });

    const notes = await response.json();

}