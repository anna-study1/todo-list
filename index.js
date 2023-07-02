let submit = document.getElementById('submit');
submit.addEventListener("click", saveAndShowNotes);
let notes = [];


function saveAndShowNotes() {
    saveNote();
    clearInputNote();
    showNotes();
}

function showNotes() {
    fillTableNotes();
    addEventToCheckboxes();
    addEventToDeleteButtons();
}


function saveNote() {
    let text = document.getElementById('new-note').value;

    let note = {
        text: text,
        isCompleted: false
    };
    notes.push(note);
}

function clearInputNote() {
    document.getElementById('new-note').value = '';
}

function fillTableNotes() {
    
    let table = document.getElementById('table');
    table.innerHTML = '';
    for (let i = 0; i < notes.length; i++) {
        table.innerHTML = table.innerHTML + '<tr><td>' +
        '<input '+
        'id="checkbox-' + i + '" '+
        'type="checkbox"'+
        getStyleCheckBox(notes[i].isCompleted) +
        '>'+
        '</td>' +
        '<td ' +
        getStyleLineThrough(notes[i].isCompleted) +
        'id="note-text-' + i + '">' +
        (i+1) + '. '+ notes[i].text  +'</td>'+
        '<td><button type="button" id="btnDelete-' +i + '" class="btn btn-secondary">Del</button></td>'+
        '</tr>';

    }
}
function getStyleCheckBox(isComplete){
    if (isComplete){
        return 'checked';
    }
    return '';
}

function getStyleLineThrough(isComplete){
    if (isComplete){
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
}

function addEventToDeleteButtons(){
    let deleteButtons = document.querySelectorAll("[id^='btnDelete-']");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteNote);
    }
}

function deleteNote() {
    let index = this.id.split('-')[1];
    notes.splice(index, 1);
    showNotes();
}


