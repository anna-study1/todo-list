window.addEventListener('load', (event) => {
    getNoteFromServer()
    .then(showNotes);

});

document.getElementById('submit').addEventListener("click", saveAndShowNotes);
let notes = [];
let color;

let colorButtons = document.querySelectorAll("[id^='bg-']");

for (let i = 0; i < colorButtons.length; i++) {
    colorButtons[i].addEventListener("click", function () {
        color = this.id;
    });
}

function saveAndShowNotes() {
    saveNote();
    clearInputNote();
    showNotes();
}

function showNotes() {
    fillTableNotes();
    addEventToCheckboxes();
    addEventToDeleteButtons();
    addEventToEditButtons();
    showCount();
}

function saveNote() {
    let text = document.getElementById('new-note').value;

    let note = {
        text: text,
        isCompleted: false,
        color: color
    };

    sendNoteToServer(note)
        .then(getNoteFromServer)
        .then(showNotes)
        .catch(error => {
            console.error('Error:', error);
        });
}

function clearInputNote() {
    document.getElementById('new-note').value = '';
}

function fillTableNotes() {

    let table = document.getElementById('table');
    table.innerHTML = '';
    for (let i = 0; i < notes.length; i++) {
        table.innerHTML = table.innerHTML + '<tr><td>' +
            '<input ' +
            'id="checkbox-' + i + '" ' +
            'type="checkbox"' +
            getStyleCheckBox(notes[i].isCompleted) +
            '>' +
            '</td>' +
            '<td class="text-white p-3 mb-2 ' + notes[i].color + '"' +
            getStyleLineThrough(notes[i].isCompleted) +
            'id="note-text-' + i + '">' +
            '<div class="divText">' + (i + 1) + '. ' + notes[i].text + '</div></td>' +
            '<td ><button type="button" id="btnEdit-' + i + '" class="btn btn-secondary custom-btn">Edit</button></td>' +
            '<td ><button type="button" id="btnDelete-' + i + '" class="btn btn-secondary custom-btn">Delete</button></td>' +
            '</tr>';
    }
}

function getStyleCheckBox(isComplete) {
    if (isComplete) {
        return 'checked';
    }
    return '';
}

function getStyleLineThrough(isComplete) {
    if (isComplete) {
        return 'style="text-decoration: line-through" ';
    }
    return '';
}

function addEventToCheckboxes() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", markComplete);
    }
}

function markComplete() {
    const isChecked = this.checked;
    let index = this.id.split('-')[1];

    if (isChecked) {
        notes[index].isCompleted = true;
        document.querySelector('#note-text-' + index).style.textDecoration = "line-through";
    } else {
        notes[index].isCompleted = false;
        document.querySelector('#note-text-' + index).style.textDecoration = "none";
    }
    updateAndShow(notes[index]);
}

function updateAndShow(note) {
    updateNoteOnServer(note)
    .then(getNoteFromServer)
    .then(showNotes)
    .catch(error => {
        console.error('Error:', error);
    });
}

function addEventToDeleteButtons() {
    let deleteButtons = document.querySelectorAll("[id^='btnDelete-']");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteNote);
    }
}

function deleteNote() {
    let index = this.id.split('-')[1];
    let id = notes[index].id;

    deleteFromServer(id)
        .then(getNoteFromServer)
        .then(showNotes)
        .catch(error => {
            console.error('Error:', error);
        });
}


function addEventToEditButtons() {
    let editButtons = document.querySelectorAll("[id^='btnEdit-']");
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", editNote);
    }
}

function editNote(){
    let index = this.id.split('-')[1];
    let tdWithText = document.querySelectorAll(".text-white");
    let divWithTexts = document.querySelectorAll(".divText");
    divWithTexts[index].style.display = "none";

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", notes[index].text);
    tdWithText[index].appendChild(input);

    let saveBtn = document.createElement("button");
    saveBtn.setAttribute("type", "button");
    saveBtn.innerHTML= "&#10003;";
    saveBtn.setAttribute("class", "btn btn-secondary custom-btn update");
    tdWithText[index].appendChild(saveBtn);
    addEventToSaveButtons(index, input);

    let cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("type", "button");
    cancelBtn.innerHTML= "&#128473;";
    cancelBtn.setAttribute("class", "btn btn-secondary custom-btn cancel");
    tdWithText[index].appendChild(cancelBtn);
    addEventToCancelButton(divWithTexts[index], input, saveBtn, cancelBtn);
 }

function addEventToSaveButtons(index, input){
    let saveButton = document.querySelector(".update");
    saveButton.addEventListener("click", () => { updateNote(index, input); });
}

function updateNote(index, input) {
    let text = input.value;
    notes[index].text = text;
    updateAndShow(notes[index]);
}

function addEventToCancelButton(divWithText, input, saveBtn, cancelBtn){
    let cancelButton = document.querySelector(".cancel");
     cancelButton.addEventListener("click", () => { cancelNote(divWithText, input, saveBtn, cancelBtn); });
}

function cancelNote(divWithText, input, saveBtn, cancelBtn){
    divWithText.style.display = "block";
    input.style.display = "none";
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
}

function showCount() {
    let total = document.querySelector('.total');

    total.innerHTML = "Notes total: " + notes.length;

    let complete = document.querySelector('.complete');

    let notesCompleted = notes.filter(function (el) {
        return el.isCompleted;
    }
    );
    complete.innerHTML = "Notes completed: " + notesCompleted.length;

    let uncomplete = document.querySelector('.uncomplete');
    uncomplete.innerHTML = "Notes uncompleted: " + (notes.length - notesCompleted.length);
}









