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
const reference = ref(database, "dogs")
let saveEl = document.getElementById("save-el")
let countEl = document.getElementById("count-el")
let count = 0
let incrementBtn = document.getElementById("increment-btn")
let saveBtn = document.getElementById("save-btn")
let resetBtn= document.getElementById("reset-btn")

onValue(reference, function(snapdog) {
    const snapdogdoesexist = snapdog.exists()
    if (snapdogdoesexist) {
        const dogs = Object.values(snapdog.val())
        saveEl.textContent = dogs.join(" - ") + " - "
}
})
incrementBtn.addEventListener("click", function(){
    count += 1
    countEl.textContent = count
    
})

saveBtn.addEventListener("click", function() {
    let countStr = count + " - "
    saveEl.textContent += countStr
    push(reference, count)
    countEl.textContent = 0
    count = 0
    
})
resetBtn.addEventListener("click", function() {
    saveEl.textContent = "Previous entries: "
    countEl.textContent = 0
    count = 0
    remove(reference)
})
