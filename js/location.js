
function isValidLocation(event) {
    const input = document.querySelector("#city")
    const city_name = input.value
    console.log(city_name)
    /**
     * Ajax code here
     */
}

function displayNames(value) {
    input_bar.value = value
    removeElements()
}

function removeElements() {
    let items = document.querySelectorAll(".list-items")
    items.forEach((item) => {
        item.remove()
    })
}

function getSuggestions(event) {
    removeElements()
    if (event.target.value.length < 3) {
        return
    }
    /**
     * Ajax code here
     */
    let cities_unordered = [
        "Visakhapatnam",
        "Vijayawada",
        "Guntur",
        "Nellore",
        "Rajamahendravaram",
        "Kurnool",
        "Kakinada",
        "Tirupati",
        "Kadapa",
        "Eluru",
        "Vizianagaram",
        "Anantapur",
        "Nandyal",
        "Ongole",
        "Adoni",
        "Madanapalle",
        "Machilipatnam",
        "Tenali",
        "Proddatur",
        "Chittoor",
        "Hindupur",
        "Srikakulam",
        "Bhimavaram",
        "Tadepalligudem",
        "Guntakal",
        "Dharmavaram",
        "Gudivada",
        "Narasaraopet",
        "Kadiri",
        "Tadipatri",
        "Mangalagiri",
        "Chilakaluripet",
    ]
    let cities = cities_unordered.sort()
    let val = event.target.value
    const list = document.querySelector(".list")
    for (let city of cities) {
        if (city.toLowerCase().startsWith(val.toLowerCase())) {
            let listItem = document.createElement("li")
            listItem.classList.add("list-items")
            listItem.style.cursor = "pointer"
            listItem.setAttribute("onclick", `displayNames('${city}')`)
            let word = "<b>" + city.slice(0, val.length) + "</b>" + city.slice(val.length)
            listItem.innerHTML = word
            list.appendChild(listItem)
        }
    }
}

const set_button = document.querySelector("#submitlocation")
const input_bar = document.querySelector("#city")

set_button.addEventListener("click", isValidLocation)
input_bar.addEventListener("keyup", getSuggestions)
