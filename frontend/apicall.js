let domain = 'http://192.168.3.105:8080';

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

function deleteFromServer(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    };

    return fetch(domain+ '/rest/notes/' + id, requestOptions);
}