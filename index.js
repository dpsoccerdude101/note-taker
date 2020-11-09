(function () {
  var model = {
    data: [
      { content: "Add timestamp feature in lower right corner of note" },
      { content: "Add feature to delete a note" },
      { content: "Add feature to clear local storage" },
    ],
    init: function () {
      if (!localStorage.notes) {
        localStorage.notes = JSON.stringify(this.data);
      }
    },
    add: function (obj) {
      let data = JSON.parse(localStorage.notes);
      data.push(obj);
      console.log(data);
      localStorage.notes = JSON.stringify(data);
    },
    remove: function (obj) {
      console.log(obj);
      let data = JSON.parse(localStorage.notes);
      let tempData = data.filter((user) => user.content != obj);
      console.log(tempData);
      localStorage.notes = JSON.stringify(tempData);
    },
    getAllNotes: function () {
      return JSON.parse(localStorage.notes);
    },
  };

  var controller = {
    addNewNote: function (noteStr) {
      model.add({
        content: noteStr,
        timestamp: `${new Date().toLocaleTimeString("en-US")}`,
      });
      view.render();
    },

    deleteNote: function (note) {
      model.remove(note);
      view.render();
    },

    getNotes: function () {
      return model.getAllNotes();
    },

    init: function () {
      model.init();
      view.init();
    },
  };

  var view = {
    init: function () {
      this.noteList = document.querySelector("#notes");
      let newNoteForm = document.querySelector("#new-note-form");
      let newNoteContent = document.querySelector("#new-note-content");

      newNoteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        controller.addNewNote(newNoteContent.value);
        e.target.reset();
      });
      view.render();
    },

    attachDeleteListeners: () => {
      let deleteButtons = document.querySelectorAll(".delete");
      for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (e) => {
          console.log(e.target.parentElement.getAttribute("value"));
          controller.deleteNote(e.target.parentElement.getAttribute("value"));
        });
      }
    },

    render: function () {
      let htmlStr = ``;
      const notesArr = controller.getNotes();
      const notesViewArr = notesArr.map(function (note) {
        return `<li class="note" data-id="note-at-${note.timestamp}" value="${note.content}">
        ${note.content}
        <span class="note-date">${note.timestamp}</span>
        <button class="delete">Delete</button>
        </li>`;
      });
      htmlStr = notesViewArr.join("");
      this.noteList.innerHTML = htmlStr;
      this.attachDeleteListeners();
    },
  };

  controller.init();
})();
