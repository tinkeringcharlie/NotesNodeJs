console.log("Starting App.js");

const notes = require("./notes.js");
const _ = require("lodash");
const process = require("process");
const yargs = require("yargs");

const argv = yargs
    .command('add','Adds a note',{
        title:{
            describe: "Title for the note",
            demand: true,
            alias: 't'
        },
        body:{
            describe:"The body of the note",
            demand: true,
            alias: 'b'
        }
    })
    .command('list', 'Lists all the notes')
    .command('remove', 'Removes a note', {
        title:{
            describe: "Title for the note",
            demand: true,
            alias: 't'
        }
    })
    .command('read', 'Reads a note', {
        title:{
            describe: "Title for the note",
            demand: true,
            alias: 't'
        }
    })
    .help()
    .argv;
    
console.log("ARGS", argv);

var printNote = (note) => {
    console.log('----------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
} 

if (argv._[0] === "add"){
    let note = notes.addNote(argv.title, argv.body);
    if(_.isUndefined(note)){
        console.log(`Could not add the note because the title, ${argv.title}, already exists.`);
    }
    else{
        console.log(`Successfully added the note ${argv.title}`);
    }    
} else if (argv._[0] === "list"){
    var allNotes = notes.listAllNotes();
    console.log("Listing all notes");
    allNotes.forEach(note => {
        printNote(note);
    });
} else if (argv._[0] === "remove"){
    let noteRemoved = notes.removeNote(argv.title);
    console.log(noteRemoved ? 'Note removed' : 'Note could not be found')
} else if (argv._[0] === "read"){
    let note = notes.readNote(argv.title);
    if(_.isUndefined(note)){;
        console.log(`The note with the title ${argv.title} was not found.`);
    }
    else{
        printNote(note)
    }
} else if(argv._[0] === undefined){
    console.log('No Command was entered');
} else {
    console.log(`Command not known: ${argv._[0]}`);
}

