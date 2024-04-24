import { getMovies } from "../scripts/api.js";
import { renderStars } from "../scripts/stars.js";

const state = { movies: [] };
let table = document.querySelector("table");

function generateTableHead(table, data) {
  const thead = table.createTHead();
  const row = thead.insertRow();
  for (const key of data) {
    const th = document.createElement("th");
    th.classList.add("title-list");
    const text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTableContent(table, data) {
  for (const element of data) {
    const row = table.insertRow();
    const coverCell = row.insertCell();
    coverCell.classList.add("coverPic");

    const coverImage = document.createElement("img");
    coverImage.src = element.cover;
    coverImage.alt = element.title;
    coverImage.classList.add("cover-image");
    coverCell.appendChild(coverImage);

    const titleCell = row.insertCell();
    const ratingCell = row.insertCell();
    ratingCell.classList.add("rating-text");

    // Description Container - damit der unterhalb des Filmtitels + Edit Links steht
    const titleDescriptionContainer = document.createElement("div");
    titleDescriptionContainer.classList.add("title-description-container");

    // Filmtitel Container
    const titleTextContainer = document.createElement("div");
    titleTextContainer.classList.add("title-text-container");

    // innerhalb des Filmtitel Containers - Filmtitel
    const titleText = document.createElement("span");
    titleText.textContent = element.title;
    titleText.classList.add("title-text");
    titleTextContainer.appendChild(titleText);

    // innerhalb des Filmtitel Containers - Edit Link
    const editLink = document.createElement("a");
    editLink.textContent = "Edit";
    editLink.href =
      "http://127.0.0.1:5500/pages/movieEdit.html?id=" + element.id;
    editLink.classList.add("edit-link");
    titleTextContainer.appendChild(editLink);

    titleDescriptionContainer.appendChild(titleTextContainer);

    // Filmbeschreibung laden
    const descriptionText = document.createElement("div");
    descriptionText.textContent = element.description;
    descriptionText.classList.add("description-text");

    titleDescriptionContainer.appendChild(descriptionText);

    // Filmtitel laden
    titleCell.appendChild(titleDescriptionContainer);

    titleTextContainer.addEventListener("mouseover", () => {
      editLink.style.display = "inline";
    });

    titleTextContainer.addEventListener("mouseout", () => {
      editLink.style.display = "none";
    });

    const outerContainer = document.createElement("div");
    outerContainer.classList.add("rating-container");

    const ratingStars = renderStars(element.rating);
    outerContainer.appendChild(ratingStars);

    const spanElement = document.createElement("span");
    spanElement.textContent = "(" + element.rating + ")";
    spanElement.classList.add("rating-text");

    outerContainer.appendChild(spanElement);

    ratingCell.appendChild(outerContainer);

    const btnExpandText = document.createElement("input");
    btnExpandText.setAttribute("type", "checkbox");
    btnExpandText.classList.add("expandText");
    titleDescriptionContainer.appendChild(btnExpandText);
  }
}

getMovies().then((jsonData) => {
  state.movies = jsonData;
  generateTableContent(table, state.movies);
  generateTableHead(table, ["Cover", "Movietitle", "Rating"]);
});
