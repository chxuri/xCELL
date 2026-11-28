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


const nucleusA = document.getElementById("nucleusA");
const cytoskeletonA = document.getElementById("cytoskeletonA");
const cytoskeleton2 = document.getElementById("cytoskeleton2");
const cellMembraneA = document.getElementById("cellMembraneA");
const smoothERA = document.getElementById("smoothERA");
const roughERA = document.getElementById("roughERA");
const nucleolusA = document.getElementById("nucleolusA");
const golgiA = document.getElementById("golgiA");
const vesicle1 = document.getElementById("vesicle1");
const vesicle2 = document.getElementById("vesicle2");
const mitochondria1 = document.getElementById("mitochondria1");
const mitochondria2 = document.getElementById("mitochondria2");
const ribosomes = document.getElementById("ribosomes");

const organelleTitle = document.getElementById("organelleTitleWords");
const organelleContent = document.getElementById("organelleContentWords");

nucleusA.addEventListener("click", () => {
    selectOrganelle(nucleusA, 
        "nucleus", 
        "The rest of the nucleus contains the genetic material (DNA), protects the cell’s genetic information, replicates DNA before cell division, and transcribes genes into messenger RNA to direct all other cell organelles such as instructing other organelle functions as needed.")
});

golgiA.addEventListener("click", () => {
    selectOrganelle(golgiA, 
        "golgi Apparatus", 
        "The golgi acts as cell postal office and finishing center. It receives transport vesicles with proteins and lipids from the endoplasmic reticulums, modifies and tags these vesicles with molecular addresses, then packages them into secretory vesicles for delivery, and then ships these vesicles.")
});

vesicle1.addEventListener("click", () => {
    selectOrganelle(vesicle1, 
        "lysosome/vesicle", 
        "Lysosomes are vesicles that break down waste material in the cell by fusing to the material and using its digestive enzymes. Vesicles are tiny sacs enclosed by membranes that carry molecules, traveling through cytoplasm.")
    });
vesicle2.addEventListener("click", () => {
    selectOrganelle(vesicle2, 
        "lysosome/vesicle", 
        "Lysosomes are vesicles that break down waste material in the cell by fusing to the material and using its digestive enzymes. Vesicles are tiny sacs enclosed by membranes that carry molecules, traveling through cytoplasm.")
});

smoothERA.addEventListener("click", () => {
    selectOrganelle(smoothERA, 
        "smooth endoplasmic reticulum", 
        "The Smooth ER is a network of membrane tubes that build lipids (fats and hormones), detoxifies drugs and poison, helps build new cell membrane, and stores calcium ions.")
});

roughERA.addEventListener("click", () => {
    selectOrganelle(roughERA, 
        "rough endoplasmic reticulum", 
        "The Rough ER is a network of flattened membrane sacs studded with ribosomes. The RER builds, folds, and packages proteins that are meant to be exported out of the cell. The RER also helps builds new membrane and helps create lysosomes.")
});

nucleolusA.addEventListener("click", () => {
    selectOrganelle(nucleolusA, 
        "nucleolus", 
        "The nucleolus is a dense area inside the nucleus that primarily reads ribosomal DNA, produces ribosomal RNA, and combines it with proteins to assemble future ribosomes.")
});

mitochondria1.addEventListener("click", () => {
    selectOrganelle(mitochondria1, 
        "mitochondria", 
        "Mitochondria uses cellular respiration to convert chemical energy from food (like glucose) and oxygen into ATP, which is the main type of energy used to fuel almost everything done by the cell.")
});

mitochondria2.addEventListener("click", () => {
    selectOrganelle(mitochondria2, 
        "mitochondria", 
        "Mitochondria uses cellular respiration to convert chemical energy from food (like glucose) and oxygen into ATP, which is the main type of energy used to fuel almost everything done by the cell.")
});

cytoskeleton2.addEventListener("click", () => {
    selectOrganelle(cytoskeleton2, 
        "cytoskeleton", 
        "Cytoskeletons are a network of protein fibers that act as the cell’s internal highway system, guiding vesicles through the cytoplasm.")
});


cytoskeletonA.addEventListener("click", () => {
    selectOrganelle(cytoskeletonA, 
        "cytoskeleton", 
        "Cytoskeletons are a network of protein fibers that act as the cell’s internal highway system, guiding vesicles through the cytoplasm.")
});

cellMembraneA.addEventListener("click", () => {
    selectOrganelle(cellMembraneA, 
        "cell membrane", 
        "Cell membrane acts as a flexible gate controlling what enters and leaves the cell.")
});

ribosomes.addEventListener("click", () => {
    selectOrganelle(ribosomes, 
        "free ribosomes", 
        "Free ribosomes create proteins that stay and work in the cell.")
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

