import { TopNav } from "./assets/js/header.js";
import { books } from "./data.js";
import { booksCard, actions } from "./assets/js/script.js";

const root = document.getElementById("root");

const header = document.createElement("nav");
header.className = "header";

header.innerHTML = TopNav;

root.appendChild(header);
booksCard(books);
actions(books);
