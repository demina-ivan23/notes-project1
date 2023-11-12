import Note from './note.js';
// Redirection to a notes creation page
document.querySelector('.addButton').addEventListener('click', () => {
    const redirectUrl = '/add-note.html';
    window.location.href = redirectUrl;
});
// Showing notes
const showNotes = () => {

    let notesObjectArray = JSON.parse(window.localStorage.getItem('notesObjectArray')) || [];
    if(notesObjectArray.length !== 0){
            document.querySelector('.notePlaceholder').classList.add('hidden');
            for (let noteObject of notesObjectArray) {
            
            const note = Note.createNoteFromObject(noteObject);
            document.querySelector('.notesWrapper').appendChild(note.getHtml());   
                
            
        }   
     }
}

(() => {
    showNotes();
})();

//Notes editing
const notes = document.querySelectorAll('.note');
for(let noteToListen of notes)
noteToListen.addEventListener('click', (event) => {
    const note = event.currentTarget;
    const noteId = note.querySelector('.noteId').innerText;
    const noteTitle = note.querySelector('.noteTitle').innerText;
    const noteText = note.querySelector('.noteText').innerText;
    let noteObjToEdit = {
        id: noteId,
        title: noteTitle,
        noteText: noteText
    }
    window.localStorage.setItem('ObjectToChange', JSON.stringify(noteObjToEdit))
     window.location.href = 'edit-note.html';
});


