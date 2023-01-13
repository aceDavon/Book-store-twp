import { form } from "./form.js";
import { Toast } from "./toast.js";

const root = document.getElementById("root");

export const booksCard = (books) => {
  const card = document.createElement("section");
  card.className = "card-container";
  return books.map((book) => {
    const { name, description, poster, publish_year } = book;
    const id = Math.random() * 100;
    card.innerHTML += `<div class="card-holder">
      <div class="card-img-container">
        <img src=${poster} alt=${id} />
      </div>
      <div class="card-txt-container">
        <h2>${book.name}</h2>
        <span class="gray-txt">${publish_year}</span>
        <p>${description}</p>
        <div class="card-actions">
          <button class="btn" id="action" data-name=${name}>Rent Book</button>
        </div>
      </div>
    </div>`;
    root.appendChild(card);
  });
};

const canRent = (data, obj, user) => {
  if (data.length < 1) return false;
  const check = data.find(
    (book) => book.rented_by.username === user && book.name === obj.name
  );
  return check ? true : false;
};

const getUserData = () => {
  form();
  return toggleForm(userForm);
};

export const actions = (books) => {
  window.onload = () => {
    const action_btn = document.querySelectorAll("#action");
    const localData = JSON.parse(localStorage.getItem("books"));
    let data;

    if (localData && localData.length == 2) {
      action_btn.forEach((x) => {
        x.addEventListener("click", () => {
          data = {
            msg: {
              header: "Not Allowed",
              body: "Maximum books rented!",
            },
            style: "max-rental",
            icon: "https://cs8.pikabu.ru/avatars/2089/x2089172-1756852306.png",
          };
          Toast(data);
        });
        return x.classList.add("disable");
      });
    } else if (localData) {
      action_btn.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const name = btn.dataset.name;

          // toggle form to DOM
          await getUserData();

          // fetch user data from form entry

          const userForm = document.getElementById("userForm");
          let [username, address, duration] = "";

          userForm.addEventListener("click", (e) => {
            !e.target.closest('.userForm') && toggleForm(userForm);
          });

          userForm.onsubmit = (e) => {
            e.preventDefault();
            username = document.getElementById("name").value;
            address = document.getElementById("address").value;
            duration = document.getElementById("duration").value;

            //  check book data for books and permissions
            books.map((x) => {
              if (x.name.slice(0, 3) == name.slice(0, 3)) {
                if (canRent(localData, x, username)) {
                  data = {
                    msg: {
                      header: "Not Allowed",
                      body: "Book already rented!",
                    },
                    style: "max-rental",
                    icon: "https://cs8.pikabu.ru/avatars/2089/x2089172-1756852306.png",
                  };
                  return Toast(data);
                }
                localData.push({
                  ...x,
                  rented_by: { username, address, duration },
                });
                localStorage.setItem("books", JSON.stringify(localData));
                location.reload();
              }
            });
          };
        });
      });
    } else {
      localStorage.setItem("books", JSON.stringify([]));
      location.reload();
    }
  };
};

const toggleForm = (form) => {
  if (form.className == "hidden") return form.classList.remove("hidden");
  form.classList.add("hidden");
  return location.reload();
};
