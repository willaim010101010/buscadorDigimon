const searchButton = document.getElementById("searchDigimonBtn")
const digimonIdInput = document.getElementById("digimonId")
const digimonDetails = document.getElementById("digimonDetails")

const API_BASE_URL = "https://digimon-api.vercel.app/api/digimon"

function searchDigimon() {
    const  name = digimonIdInput.value.trim()
    if(!name){
        alert("Ingrese nombre correcto")
        return
    }

    fetch(`${API_BASE_URL}/name/${name}`)
        .then((response) => {
            if(!response.ok){
                throw new Error("Digimon no encontrado")
            }
            return response.json()
        })
        .then((data) => {
            if(Array.isArray(data) && data.length > 0){
                displeyDigimonDetails(data[0])
                console.log(data);
            } else {
                throw new Error("No se encotraron datos")
            }
        })
        .catch((error) => {
            console.error("Error al botener Digimon: ", error)
            digimonDetails.innerHTML = `<p>Error: ${error.message}</p>`
        })
}

searchButton.addEventListener("click", searchDigimon)

function displeyDigimonDetails(digimon){
    digimonDetails.innerHTML = `
        <div class="digimon-image-container">
            <img src="${digimon.img}" class="digimon-image">
            <span class="digimon-level">${digimon.level}</span>
        </div>
        <h2 class="digimon-name">${digimon.name}</h2>
    `
}

digimonIdInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        searchDigimon()
    }
})
const toggleCheckbox = document.getElementById("darkModeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (savedTheme === "dark") {
        toggleCheckbox.checked = true;
    }
}

toggleCheckbox.addEventListener("change", function () {
    if (this.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
});
