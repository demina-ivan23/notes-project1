const noteTitleDraww = document.querySelector('.noteAdditionTitle').value;
const noteTextDraww = document.querySelector('.addNoteTextarea').value  
let noteTitleDraw = noteTitleDraww;
let noteTextDraw = noteTextDraww;
 document.querySelector('.noteAdditionTitle').addEventListener('input', (event) => {
 noteTitleDraw = event.target.value;
 console.log(noteTitleDraw);
});
document.querySelector('.addNoteTextarea').addEventListener('input', (event) => {
     noteTextDraw = event.target.value;
    
     console.log(noteTextDraw);
});
// 'Back' button functionality

document.querySelector('.backButton').addEventListener('click', () => {
    const redirectUrl = '/index.html';
    if(noteTextDraw == "" && noteTitleDraw == ""){
        window.location.href = redirectUrl;    
    }
    else{   
            document.querySelector('#unsavedChangeAlert').classList.remove('hidden');
       
    }
});
document.querySelector('.submitExitButton').addEventListener('click', () => {
    document.querySelector('#unsavedChangeAlert').classList.add('hidden');
    const redirectUrl = '/index.html';
    window.location.href = redirectUrl;    

})
document.querySelector('.cancelExitButton').addEventListener('click', () => {
    document.querySelector('#unsavedChangeAlert').classList.add('hidden');
        
})
// Adding a note
document.querySelector('.saveButton').addEventListener('click', () => {
const notesObject = {
  id: Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
  title: noteTitleDraw,
  noteText: noteTextDraw
};   
  
let notesObjectArray = JSON.parse(localStorage.getItem('notesObjectArray')) || [];
  
notesObjectArray.push(notesObject);
window.localStorage.setItem('notesObjectArray', JSON.stringify(notesObjectArray));
console.log(notesObject.id);
window.location.href = "index.html";
});
