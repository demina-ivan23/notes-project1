import Note from './note.js';

const ObjectToChange = Note.createNoteFromObject(JSON.parse(localStorage.getItem('ObjectToChange')));
document.querySelector('.noteEditionTitle').value = ObjectToChange.title;
document.querySelector('.editNoteTextarea').value = ObjectToChange.noteText;
let noteTitleUnchanged = ObjectToChange.title;
let noteTextUnchanged = ObjectToChange.noteText;

let noteTitleChanged = ObjectToChange.title;
let noteTextChanged = ObjectToChange.noteText;
let newNoteColor = ObjectToChange.noteColor;
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
document.querySelector('.visibilityButton').addEventListener('click', () => {
    document.querySelector('#visAlert').classList.remove('hidden');
    let colors = document.querySelector('.visAlertColorBtns').children;
    let colorsArray = Array.from(colors);
    colorsArray.forEach(color =>  {
        color.addEventListener('click', () => {
            color.classList.add('activeColor');
            
            let colorsArrayFiltered = colorsArray.filter(notThatColor => notThatColor !== color);
            
            colorsArrayFiltered.forEach(notThatColor => {
                notThatColor.classList.remove('activeColor');
             });
             
             document.querySelector('.visAlertOkBtn').addEventListener('click', () => {
                 let thatColor = Array.from(color.classList).find(className => !className.includes('activeColor'));
                 newNoteColor = thatColor;
                 
                 document.querySelector('#visAlert').classList.add('hidden');
                 
             });
         });
     });
 });

document.querySelector('.saveButton').addEventListener('click', () => {
if(noteTextChanged === '' || noteTitleChanged === ''){
    document.querySelector('#emptyFieldsAlert').classList.remove('hidden');

    document.querySelector('.emptyFieldsAlertOkBtn').addEventListener('click', () => {
    document.querySelector('#emptyFieldsAlert').classList.add('hidden');
        
    });


}else{

    const changedObject = ObjectToChange;
    changedObject.setText(noteTextChanged);
    changedObject.setTitle(noteTitleChanged);
    changedObject.setColor(newNoteColor);
    
    let notesObjectArray = JSON.parse(localStorage.getItem('notesObjectArray'));
    notesObjectArray = notesObjectArray.filter(note => note.id !== ObjectToChange.id);
    notesObjectArray.unshift(changedObject);
    localStorage.setItem('notesObjectArray', JSON.stringify(notesObjectArray));
    localStorage.setItem('ObjectToChange', '');
    window.location.href = 'index.html';
}
})












































