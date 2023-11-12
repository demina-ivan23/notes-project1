export default class Note{
    constructor(title, text){
this.title = title;
this.noteText = text;
this.id = this.generateId;
    }
    generateId(){
       this.id = Date.now().toString() + Math.floor(Math.random() * 1000).toString()
    }
    setId(id){
        this.id = id
    }

    getHtml(){
        const note = document.createElement('div');
        note.className = "note";
        
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

    static createNoteFromObject({id, title, noteText}){
        let result = new Note(title, noteText);
        result.setId(id);
        return result;

    }
}