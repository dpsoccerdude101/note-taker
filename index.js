

    var model = {
        createTimestamp(){
            return new Date(Date.now()).toDateString()
        },
        data: [{content: 'Add timestamp feature in lower right corner of note', timestamp: new Date(Date.now()).toDateString()},
        {content: 'Add feature to delete a note', timestamp: new Date(Date.now()).toDateString()},
        {content: 'Add feature to clear local storage', timestamp: new Date(Date.now()).toDateString()}],
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify(this.data);
            }
        },
        add: function(obj) {
            let data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        delete: function(obj){
            let data = JSON.parse(localStorage.notes);
            data.filter(d => timestamp !== obj.timestamp);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        },
        removeAllNotes(){
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
        clear(e){
            e.preventDefault()
            model.removeAllNotes()
            view.init()
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
                htmlStr += `<li class="note" data-time="${note.timestamp}">
                        ${note.content}
                    </li>`;
            });
            this.noteList.innerHTML = htmlStr ;
        }
    };

    controller.init();
