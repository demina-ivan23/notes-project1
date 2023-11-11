const ObjectToChange = JSON.parse(localStorage.getItem('ObjectToChange'));
document.querySelector('.noteEditionTitle').value = ObjectToChange.title;
document.querySelector('.editNoteTextarea').value = ObjectToChange.noteText;
let noteTitleUnchanged = ObjectToChange.title;
let noteTextUnchanged = ObjectToChange.noteText;

let noteTitleChanged = ObjectToChange.title;
let noteTextChanged = ObjectToChange.noteText;

document.querySelector('.noteEditionTitle').addEventListener('input', (event) => {
    noteTitleChanged = event.target.value;
   });
   document.querySelector('.editNoteTextarea').addEventListener('input', (event) => {
        noteTextChanged = event.target.value;
   });
document.querySelector('.backButton').addEventListener( 'click', () => {

    if(noteTextUnchanged === noteTextChanged && noteTitleUnchanged === noteTitleChanged){
        localStorage.setItem('ObjectToChange', ''); 
        window.location.href = "index.html";
    }
    else{
        document.querySelector('#unsavedChangeAlert').classList.remove('hidden');
        document.querySelector('.cancelExitButton').addEventListener('click', () => {
          document.querySelector('#unsavedChangeAlert').classList.add('hidden');
          
        });
        document.querySelector('.submitExitButton').addEventListener('click', () => {
            window.location.href = 'index.html'
        })
    }

});

document.querySelector('.saveButton').addEventListener('click', () => {
 const changedObject = {
    id: ObjectToChange.id,
    title: noteTitleChanged,
    noteText: noteTextChanged
 };
 let notesObjectArray = JSON.parse(localStorage.getItem('notesObjectArray'));
 notesObjectArray = notesObjectArray.filter(note => note.id !== ObjectToChange.id);
 notesObjectArray.unshift(changedObject);
 localStorage.setItem('notesObjectArray', JSON.stringify(notesObjectArray));
 localStorage.setItem('ObjectToChange', '');
 window.location.href = 'index.html';
})












































