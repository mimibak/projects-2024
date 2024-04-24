import { getMovieDetails, updateMovie } from "../scripts/api.js";
import { renderStars } from "../scripts/stars.js";

const state = { movies: [] };

const figureContainer = document.querySelector("#imgCover");
const altText = document.querySelector("#altText");
const movieTitle = document.querySelector("#movieTitle");
const descriptionContainer = document.querySelector("#detailText");
const leftContainer = document.querySelector("#leftContainer");
const rightContainer = document.querySelector("#rightContainer");
const saveChanges = document.querySelector("#saveEdit");

let renderDetails = JSON.parse(localStorage.getItem("lastSave")) || [];
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

function renderMovieDetails(data) {
  saveChanges.addEventListener("click", function (event) {
    event.preventDefault();
    const editedTitle = movieTitle.textContent.replace(/(<([^>]+)>)/gi, ""); // um Sicherheitslücken zu schließen
    const editedDescription = renderText.textContent.replace(
      /(<([^>]+)>)/gi,
      ""
    );
    const updatedMovieData = {
      title: editedTitle,
      cover: data.cover,
      description: editedDescription,
      rating: data.rating,
    };
    updateMovie(movieId, updatedMovieData);
  });

  // Filmcover generieren
  const movieCover = document.createElement("img");
  movieCover.src = data.cover;
  movieCover.classList.add("movieCover");
  figureContainer.appendChild(movieCover);

  // figCaption für Barrierefreiheit
  altText.textContent =
    "Ein großer Wal stupst ein Boot an der Meeresoberfläche um.";
  figureContainer.appendChild(altText);

  // edit Link
  const editMovieCoverLink = document.createElement("button");
  editMovieCoverLink.href = "http://127.0.0.1:5500/pages/editMovieCover.html";
  editMovieCoverLink.innerHTML = "Edit";
  leftContainer.appendChild(editMovieCoverLink);

  /////////right

  // h1 Filmtitel
  const elTitel = document.createElement("span");
  elTitel.classList.add("title-area");
  movieTitle.textContent = data.title;
  // Filmtitel edit
  const editMovieTitle = document.createElement("button");
  editMovieTitle.textContent = "Edit";
  editMovieTitle.addEventListener("click", function (event) {
    event.preventDefault(); // Verhindert das Folgen des Links
    movieTitle.contentEditable = "true"; // Macht den Filmtitel editierbar
    movieTitle.focus(); // Setzt den Fokus auf den Filmtitel, damit der Benutzer sofort mit der Bearbeitung beginnen kann
  });

  elTitel.addEventListener("keydown", enterTitle);

  function enterTitle(event) {
    if (event.key == "Enter") {
      movieTitle.contentEditable = "false";
    }
  }

  // Beispiel für die Zugänglichkeitsverbesserung durch Hinzufügen alternativer Texte für interaktive Elemente
  editMovieTitle.setAttribute("aria-label", "Edit movie title");

  elTitel.append(movieTitle, editMovieTitle);

  // Rating Stars
  const elStars = document.createElement("span");
  elStars.classList.add("rating-area");
  const getStars = renderStars(data.rating);
  const starsText = document.createTextNode("(" + data.rating + ")");

  elStars.append(getStars, starsText);

  // p für detailText
  const renderText = document.createElement("p");
  renderText.textContent = data.description;
  renderText.classList.add("renderText");
  descriptionContainer.appendChild(renderText);

  //Description edit
  const editDescription = document.createElement("button");
  editDescription.textContent = "Edit";
  editDescription.addEventListener("click", function (event) {
    event.preventDefault();
    renderText.contentEditable = "true";
    renderText.focus();
  });

  descriptionContainer.append(renderText, editDescription);

  descriptionContainer.addEventListener("keydown", enterDescription);

  function enterDescription(event) {
    if (event.key == "Enter") {
      renderText.contentEditable = "false";
    }
  }

  rightContainer.append(elTitel, elStars, descriptionContainer);
}

getMovieDetails(movieId).then((jsonData) => {
  state.movies = jsonData;
  console.log(jsonData);
  renderMovieDetails(state.movies);
});
