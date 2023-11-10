// Redirection to a notes creation page
document.querySelector('.addButton').addEventListener('click', () => {
    const redirectUrl = '/add-note.html';
    window.location.href = redirectUrl;
});
// Showing notes
const showNotes = () => {

    let notesObject = JSON.parse(window.localStorage.getItem('notesObject')) || {};
 if(Object.keys(notesObject).length !== 0){
     document.querySelector('.notePlaceholder').classList.add('hidden');
     for (let noteTitle in notesObject) {
         if (notesObject.hasOwnProperty(noteTitle)) {
            const note = document.createElement('div');
            note.className = "note";
            
            const title = document.createElement('div');
            title.className = "noteTitle";
            title.innerText = noteTitle;
            
            const noteText = document.createElement('div');
            noteText.classList = "noteText";
            noteText.innerText = notesObject[noteTitle];
            
            note.appendChild(title);
            note.appendChild(noteText);
            
            document.querySelector('.notesWrapper').appendChild(note);   
         }
        }
    }   
}

(() => {
    showNotes();
})();

//Notes editing

document.querySelector('.note').addEventListener('click', () => {
window.location.href = 'edit-note.html';
})
