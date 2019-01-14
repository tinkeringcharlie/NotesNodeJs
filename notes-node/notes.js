const fs = require("fs");
console.log("Starting Notes.js");

var addNote = (title, body) => {
    let notes = getNotes();
    let note = {
        title,
        body
    }

    var duplicateNotes = notes.filter((note) => note.title === title);
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var listAllNotes = () => {
    return getNotes();
};

var readNote = (title) => {
    let notes = getNotes();
     
    let filteredFoundNotes = notes.filter((note) =>{
        return note.title === title;
    });

    if(filteredFoundNotes.length > 0){
        return filteredFoundNotes[0];
    }
}

var removeNote = (title) => {
    let notes = getNotes();
    let filteredTitleNoteOut = notes.filter((note) =>{
        return note.title !== title;
    })
    saveNotes(filteredTitleNoteOut);
    return notes.length !== filteredTitleNoteOut.length;
}

var getNotes = () => {
    try{
        let notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);

    } catch (e){
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}

module.exports = {
    addNote,
    listAllNotes,
    readNote,
    removeNote
};