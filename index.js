let button = document.getElementById('button');
button.addEventListener("click", saveAndShowNotes);
let notes = [];

function saveAndShowNotes() {
    saveNote();
    clearInputNote();
    fillTableNotes();
    addEventToCheckboxes();
}

function saveNote() {
    let text = document.getElementById('new-note').value;
    notes.push(text);
}

function clearInputNote() {
    document.getElementById('new-note').value = '';
}

function fillTableNotes() {
    let table = document.getElementById('table');
    table.innerHTML = '';
    for (let i = 0; i < notes.length; i++) {
        table.innerHTML = table.innerHTML + '<tr><td><input id="checkbox-' + i + '" type="checkbox"></td><td id="note-text-' + i + '">' + (i+1) + '. '+ notes[i] + '</td></tr>';
        
    }
}

function addEventToCheckboxes() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", markComplete);
    }
}

function markComplete() {
    const isChecked = this.checked;
    let number = this.id.split('-')[1];

    if (isChecked) {
        document.querySelector('#note-text-' + number).style.textDecoration = "line-through";
    } else {
        document.querySelector('#note-text-' + number).style.textDecoration = "none";
    }
}

