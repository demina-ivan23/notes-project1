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

const notes = document.querySelectorAll('.note');

function editNote(note) {
    const noteId = note.querySelector('.noteId').innerText;
    const noteTitle = note.querySelector('.noteTitle').innerText;
    const noteText = note.querySelector('.noteText').innerText;
    
    let noteObjToEdit = {
        id: noteId,
        title: noteTitle,
        noteText: noteText
    };
    
    window.localStorage.setItem('ObjectToChange', JSON.stringify(noteObjToEdit));
    window.location.href = 'edit-note.html';
}

function deleteNote(id) {
   Note.deleteNoteById(id);
}

notes.forEach((noteToListen) => {
    let notePressTimer;

    noteToListen.addEventListener('touchstart', () => {
        notePressTimer = setTimeout(() => {
            noteToListen.classList.add('deleteCard');
        }, 2500);
    });

    noteToListen.addEventListener('touchend', () => {
        clearTimeout(notePressTimer);
        noteToListen.addEventListener('click', () => {
        if (noteToListen.classList.contains('deleteCard')) {
            
               document.querySelector('#deleteAlert').classList.remove('hidden');
               document.querySelector('.cancelDelButton').addEventListener('click', () => {
                location.reload();
               });
               document.querySelector('.submitDelButton').addEventListener('click' , () => {
               let noteId = noteToListen.querySelector('.noteId').innerText;
               deleteNote(noteId);
               location.reload();
               });

            } else {
                    
                    editNote(noteToListen);
                    
            }
        }); 

    });
    noteToListen.addEventListener('touchmove', () => {
        clearTimeout(notePressTimer);
        noteToListen.removeAttribute('data-touch-start');
      });  
     
});

