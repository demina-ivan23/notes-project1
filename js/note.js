export default class Note{
    constructor(title, text, color){
this.title = title;
this.noteText = text;
this.noteColor = color;
console.log(this.noteColor);
this.id = this.generateId();
    }
    generateId(){
       return Date.now().toString() + Math.floor(Math.random() * 1000).toString()
    }
    setId(id){
        this.id = id
    }

    getHtml(){
        const note = document.createElement('div');
        const colorClasses = this.noteColor ? this.noteColor : '';
        note.classList = `note ${colorClasses}`;

        
        const title = document.createElement('div');
        title.className = "noteTitle";
        title.innerText = this.title;
        
        const noteText = document.createElement('div');
        noteText.classList = "noteText";
        noteText.innerText = this.noteText;
        
        const noteId = document.createElement('div');
        noteId.classList = 'noteId hidden';
        noteId.innerText = this.id;
        console.log(noteId.innerText)
        note.appendChild(title);
        note.appendChild(noteText);
        note.appendChild(noteId);
        return note;
        
    }
    setText(text){
  this.noteText = text;
    }
    setTitle(title){
this.title = title;       
    }
    setColor(color){
        this.noteColor = color;
    }

    static createNoteFromObject({id, title, noteText, noteColor}){
        let result = new Note(title, noteText, noteColor);
        result.setId(id);
        return result;

    }
    static deleteNoteById(id) {
        let notes = JSON.parse(localStorage.getItem('notesObjectArray')) || [];
       notes.filter(note => note.id !== id);
       notes = notes.filter(note => note.id !== id);
       localStorage.setItem('notesObjectArray', JSON.stringify(notes));
    }
}