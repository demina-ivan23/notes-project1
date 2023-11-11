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
            const note = document.createElement('div');
            note.className = "note";
            
            const title = document.createElement('div');
            title.className = "noteTitle";
            title.innerText = noteObject.title;
            
            const noteText = document.createElement('div');
            noteText.classList = "noteText";
            noteText.innerText = noteObject.noteText;
            
            const noteId = document.createElement('div');
            noteId.classList = 'noteId hidden';
            noteId.innerText = noteObject.id;
            console.log(noteId.innerText)
            note.appendChild(title);
            note.appendChild(noteText);
            note.appendChild(noteId);
            
            document.querySelector('.notesWrapper').appendChild(note);   
                
            
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
})
