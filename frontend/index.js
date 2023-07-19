let domain = 'http://192.168.3.104:8080';
window.addEventListener('load', (event) => {
    getNoteFromServer()
    .then(showNotes);
});

let submit = document.getElementById('submit');
submit.addEventListener("click", saveAndShowNotes);
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

function sendNoteToServer(note) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(note)
    };

    return fetch(domain+ '/rest/notes', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data.id);
            return data; // Pass the data to the next promise in the chain
        });
}

function updateNoteOnServer(note) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(note)
    };

    return fetch(domain+ '/rest/notes/' + note.id, requestOptions);

}

function getNoteFromServer() {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    };

    return fetch(domain+ '/rest/notes', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            notes = data;
            return data; // Pass the data to the next promise in the chain
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
            (i + 1) + '. ' + notes[i].text + '</td>' +
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

    updateNoteOnServer(notes[index])
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

function deleteFromServer(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    };

    return fetch(domain+ '/rest/notes/' + id, requestOptions);

}



function changeText() {
   
}






