import Note from './note.js';
// Redirection to a notes creation page
document.querySelector('.addButton').addEventListener('click', () => {
    const redirectUrl = 'add-note.html';
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
// Note searching
document.querySelector('.searchButton').addEventListener('click', () => {
document.querySelector('#searchAlert').classList.remove('hidden');

const notesArray = JSON.parse(localStorage.getItem('notesObjectArray'));

const renderNotes = (searchQuery) => {
    const notesContainer = document.querySelector('.notesContainerForSearch');
    notesContainer.innerHTML = ''; // Clear existing notes
  
    const filteredNotes = notesArray.filter((note) => {
      // Customize the conditions based on your search criteria
      return (
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.noteText.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    if (filteredNotes.length === 0) {

        let matchNotFoundImg = document.createElement('img');
        matchNotFoundImg.classList.add('matchNotFoundImg');
        matchNotFoundImg.src = 'images/cuate.png';
        matchNotFoundImg.alt = '';
      
        let matchNotFoundText = document.createElement('p');
        matchNotFoundText.innerText = 'Match not found. Try searching something else';
        matchNotFoundText.classList.add('matchNotFoundText'); 

        let containerForSearch = document.querySelector('.notesContainerForSearch');
        containerForSearch.innerHTML = '';
        containerForSearch.appendChild(matchNotFoundImg);
        containerForSearch.appendChild(matchNotFoundText);

      
        containerForSearch.classList.add('matchNotFoundContainer');
      }
      
  else{

      filteredNotes.forEach((note) => {
          let noteObjectSearch = Note.createNoteFromObject(note);
          let noteElement = noteObjectSearch.getHtml();
          document.querySelector('.notesContainerForSearch').classList.remove('matchNotFoundContainer');
          document.querySelector('.notesContainerForSearch').appendChild(noteObjectSearch.getHtml());   
          noteElement.addEventListener('click', () => {
            editNote(note);
          });
        });
    }
        
        
    };
    renderNotes('');
    const searchInput = document.querySelector('.searchAlertInput');
    searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value.trim();
        renderNotes(searchQuery);
        let noteElementsContainer = document.querySelector('.notesContainerForSearch');
        let noteElements = noteElementsContainer.querySelectorAll('.note');
        console.log(noteElements);
        noteElements.forEach((noteElement) => {
         console.log(noteElement);
          noteElement.addEventListener('click', () => {
          editNote(noteElement);
          });
        });
    });
    renderNotes('');
    let noteElementsContainer = document.querySelector('.notesContainerForSearch');
    let noteElements = noteElementsContainer.querySelectorAll('.note');
    console.log(noteElements);
    noteElements.forEach((noteElement) => {
     console.log(noteElement);
      noteElement.addEventListener('click', () => {
      editNote(noteElement);
      });
    });
});
document.querySelector('.searchAlertCloseButton').addEventListener('click', () => {
    document.querySelector('#searchAlert').classList.add('hidden');
    location.reload();
    
});

