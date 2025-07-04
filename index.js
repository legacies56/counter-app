import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js"
import { getDatabase,
    ref,
    push,
    onValue,
    remove
 } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js"

const firedatabase = {
    databaseURL: "https://lead-tracker-app-d8574-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(firedatabase)
const database = getDatabase(app)
const reference = ref(database, "counts")
let saveEl = document.getElementById("save-el")
let countEl = document.getElementById("count-el")
let count = 0
let incrementBtn = document.getElementById("increment-btn")
let saveBtn = document.getElementById("save-btn")
let resetBtn= document.getElementById("reset-btn")
let suppressDisplay = false
let copy = reference.toString()


onValue(reference, function(checkexists) {
    const checkexist = checkexists.exists()
    if (suppressDisplay) return
    if (checkexist) {
        const counts = Object.values(snapdog.val())
        saveEl.textContent = copy + " - "
}
})
incrementBtn.addEventListener("click", function(){
    count += 1
    countEl.textContent = count
    
})

// ...existing code...

saveBtn.addEventListener("click", function() {
    let countStr = count + " - "
    saveEl.textContent += countStr
    push(reference, count)

    // Store in localStorage
    let savedCounts = localStorage.getItem("savedCounts")
    if (savedCounts) {
        savedCounts += countStr
    } else {
        savedCounts = countStr
    }
    localStorage.setItem("savedCounts", savedCounts)

    countEl.textContent = 0
    count = 0
})

// On page load, restore from localStorage
window.addEventListener("DOMContentLoaded", function() {
    let savedCounts = localStorage.getItem("savedCounts")
    if (savedCounts) {
        saveEl.textContent += savedCounts
    }
})
// ...existing code...
resetBtn.addEventListener("click", function() {
    count = 0
    countEl.textContent = 0
    suppressDisplay = true
    localStorage.removeItem("savedCounts")
    // Optionally, clear only the current session's display:
    saveEl.textContent = "Previous entries: "
})


