import Note from './note.js';
const noteTitleDraww = document.querySelector('.noteAdditionTitle').value;
const noteTextDraww = document.querySelector('.addNoteTextarea').value  
let noteTitleDraw = noteTitleDraww;
let noteTextDraw = noteTextDraww;
let noteColor = null;
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
    const redirectUrl = 'index.html';
    if(noteTextDraw == "" && noteTitleDraw == ""){
        window.location.href = redirectUrl;    
    }
    else{   
            document.querySelector('#unsavedChangeAlert').classList.remove('hidden');
       
    }
});
document.querySelector('.submitExitButton').addEventListener('click', () => {
    document.querySelector('#unsavedChangeAlert').classList.add('hidden');
    const redirectUrl = 'index.html';
    window.location.href = redirectUrl;    

})
document.querySelector('.cancelExitButton').addEventListener('click', () => {
    document.querySelector('#unsavedChangeAlert').classList.add('hidden');
        
})
// Visbility button

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
                noteColor = thatColor;
                console.log(noteColor); 
                document.querySelector('#visAlert').classList.add('hidden');
                
            });
        });
    });
});

document.querySelector('.visAlertCancelBtn').addEventListener('click', () => {
document.querySelector('#visAlert').classList.add('hidden');     
});

// Adding a note

document.querySelector('.saveButton').addEventListener('click', () => {
 if(noteTitleDraw === "" || noteTextDraw === ""){
    document.querySelector('#emptyFieldsAlert').classList.remove('hidden');
    document.querySelector('.emptyFieldsAlertOkBtn').addEventListener('click', () => {
    document.querySelector('#emptyFieldsAlert').classList.add('hidden');
        
    });
 }
 else{
     console.log(noteColor);
     const noteObject = new Note(noteTitleDraw, noteTextDraw, noteColor);
     let notesObjectArray = JSON.parse(localStorage.getItem('notesObjectArray')) || [];
     
     
     notesObjectArray.push(noteObject);
     window.localStorage.setItem('notesObjectArray', JSON.stringify(notesObjectArray));
     console.log(noteObject.id);
     window.location.href = "index.html";
    }
});


