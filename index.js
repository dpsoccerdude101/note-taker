
const app = (function(){
    var model = {
        createTimestamp: function(){
            return new Date(Date.now()).toDateString()
        },
        preliminaryData: [ // The "source of truth" will be localStorage, but this data just prepopulates for a new instance
            {
                content: 'Add timestamp feature in lower right corner of note', 
                timestamp: new Date(Date.now()).toDateString()
            },
            {
                content: 'Add feature to delete a note', 
                timestamp: new Date(Date.now()).toDateString()
            },
            {
                content: 'Add feature to clear local storage', 
                timestamp: new Date(Date.now()).toDateString()
            }
        ],
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify(this.preliminaryData);
            }
        },
        add: function(obj) {
            if (localStorage.notes) {
                let data = JSON.parse(localStorage.notes);
                data.push(obj);
                localStorage.notes = JSON.stringify(data);
                return
            }
            localStorage.notes = JSON.stringify([obj])
        },
        delete: function(note){
            let data = JSON.parse(localStorage.notes);
            let filteredData = data.filter(d => note !== d.content);
            localStorage.notes = JSON.stringify(filteredData);
        },
        getAllNotes: function() {
            if (localStorage.notes) {
                return JSON.parse(localStorage.notes);
            } 
            return []
        },
        removeAllNotes: function(){
            localStorage.removeItem('notes')
        }
    };


    var controller = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                timestamp: model.createTimestamp()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },
        clear: function(e){
            // e.preventDefault()
            model.removeAllNotes()
            view.render()
        },
        remove: function(note) {
            model.delete(note)
            view.render()
        },
        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = document.querySelector('#notes');
            let newNoteForm = document.querySelector('#new-note-form');
            let newNoteContent = document.querySelector('#new-note-content');
            newNoteForm.addEventListener('submit', function(e){
                e.preventDefault()
                controller.addNewNote(newNoteContent.value);
                newNoteContent.value = '';
            });
            view.render();
        },
        render: function(){
            let htmlStr = '';
            controller.getNotes().forEach(function(note){
                htmlStr += `<li class="note">
                        <span class="close" onclick="app.remove('${note.content}')">⨯</span> 
                        ${note.content} 
                        <span class="note-date">${note.timestamp}</span>
                    </li>`;
            });
            this.noteList.innerHTML = htmlStr ;
            console.log(localStorage.notes ? JSON.parse(localStorage.notes) : 'notes empty')
        }
    };

    controller.init();

    return {
        model,
        remove: controller.remove,
        clear: controller.clear,
        view
    }
})();
