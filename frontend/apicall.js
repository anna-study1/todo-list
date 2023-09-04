let domain = 'http://localhost:8080';

function sendNoteToServer(note) {
    let textDate = note.dateTime.toLocaleString();
    let tempNote = {...note};
    tempNote.dateTime = textDate;
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tempNote)
        
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
            notes.forEach( (note, index) => notes[index].dateTime = new Date(notes[index].dateTime));
            return data; // Pass the data to the next promise in the chain
        });
}

function deleteFromServer(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    };

    return fetch(domain+ '/rest/notes/' + id, requestOptions);
}