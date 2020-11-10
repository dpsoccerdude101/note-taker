(function () {
  const model = {
    data: {
      id: "0",
      name: "Dennis Pavlyuk",
      username: "dpsoccerdude101",
      email: "dpavl1@brockport.edu",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: { lat: "-37.3159", lng: "81.1496" },
      },
      phone: "1-770-736-8031 x56442",
      website: "dennispavlyuk.com",
      company: {
        name: "Pavlyuk Brother Brewing Company",
        catchPhrase: "Real Ingredient, Real Beer",
        bs: "We bought everything from the homebrew store.",
      },
      timestamp: "10:23:57 PM",
    },

    init: function () {
      if (!localStorage.users) {
        localStorage.users = JSON.stringify(this.data);
      }
    },
    add: function (obj) {
      let data = JSON.parse(localStorage.users);
      data.push(obj);
      localStorage.users = JSON.stringify(data);
    },
    remove: function (userID) {
      let data = JSON.parse(localStorage.users);
      let tempData = data.filter((user) => user.id != userID);
      localStorage.users = JSON.stringify(tempData);
    },
    getAllNotes: function () {
      return JSON.parse(localStorage.users);
    },
    clearLocalStorage: function () {
      localStorage.users = JSON.stringify([this.data]);
    },
  };

  const controller = {
    addNewUser: function (noteStr) {
      model.add({
        ...noteStr,
        timestamp: `${new Date().toLocaleTimeString("en-US")}`,
      });
      view.render();
    },

    deleteNote: function (userID) {
      model.remove(userID);
      view.render();
    },

    deleteAllNotes: function () {
      model.clearLocalStorage();
      view.render();
    },

    getUsers: function () {
      return model.getAllNotes();
    },
    fetchUser: function (id) {
      // fetch a user with given id
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => response.json())
        .then((json) => {
          this.addNewUser(json);
        });
    },
    init: function () {
      model.init();
      view.init();
    },
  };

  var view = {
    init: function () {
      this.usersList = document.querySelector("#users");
      const newUserForm = document.querySelector("#new-user-form");
      const newUserDetails = newUserForm.querySelector("#new-user-content");
      const wipeButton = newUserForm.querySelector("#wipe-button");

      newUserForm.addEventListener("submit", function (e) {
        e.preventDefault();
        controller.fetchUser(newUserDetails.value);
        e.target.reset();
      });

      wipeButton.addEventListener("click", function () {
        controller.deleteAllNotes();
      });
      view.render();
    },

    attachDeleteListeners: () => {
      let deleteButtons = document.querySelectorAll(".delete");
      for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (e) => {
          controller.deleteNote(e.target.parentElement.getAttribute("value"));
        });
      }
    },

    render: function () {
      let htmlStr = ``;
      const usersArr = controller.getUsers();
      userMarkup = (userObj) => {
        return Object.keys(userObj).length === 0
          ? ``
          : ` <div class="user" data-id="note-at-${userObj.timestamp}" value="${userObj.id}">
          <div class="picture">
            <img class="pix" src="generic_profile.svg">
            </div>
          
          <div class="namecontainer">
            <div>
              <h2 class="name">${userObj.name}</h2>
              <p class="username">${userObj.username}</p>
              <p class="email"><a href="">${userObj.email}</a></p>
            </div>
          </div>
          <div class="address">
            <div>
              <div class="line1">
                <p class="street">${userObj.address.street}</p>
                <p class="suite">${userObj.address.suite}</p>
              </div>
              <div class="line2">
                <p class="city">${userObj.address.city}</p>
                <p class="zip">${userObj.address.zip}</p>
              </div>
              <p class="phone">${userObj.phone}</p>
              <p class="website">${userObj.website}</p>
            </div>
          </div>
          <div class="company">
            <p class="name">${userObj.company.name}</p>
            <p class="catchPhrase">${userObj.company.catchPhrase}</p>
            <p class="bs">${userObj.company.bs}</p>
          </div>
          <span class="user-date">${userObj.timestamp}</span>
        <button class="delete">Delete</button>
        </div>`;
      };

      const usersViewArr = usersArr.map(function (user) {
        return this.userMarkup(user);
      });
      htmlStr = usersViewArr.join("");
      this.usersList.innerHTML = htmlStr;
      this.attachDeleteListeners();
    },
  };

  controller.init();
})();
