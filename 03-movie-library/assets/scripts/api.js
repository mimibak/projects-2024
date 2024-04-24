// @ts-check  ||| Typsicher prüfen

// Seperation of concerns

const apiUrl = "http://localhost:3000/movies";

// Entwurfsmuster | Fassade gebaut | Nutzbar für verschiedene Szenarien

// DOC Block (TypeScript Compiler läuft - wenn wir das * durch String ersetzen) ||| Typsicher prüfen
/**
 *
 * @param {*} url
 * @param {*} options
 * @returns
 */

// Basisfunktion | Grund Konfiguration
export function fetchData(url, options = {}) {
  return fetch(url, options).then((response) => response.json());
}

// Modifizierte Konfigurationen

// POST
export function createMovie(movieData) {
  return fetchData(apiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(movieData),
  });
}

// GET
// Fassade gefüllt | Konfigurieren
export function getMovies() {
  return fetchData(apiUrl);
}

// das return führt dazu das man mit getMovies außerhalb weiter arbeiten kann

export function getMovieDetails(movieId) {
  return fetchData(apiUrl + "/" + movieId);
}

// PUT
export function updateMovie(movieId, title, description) {
  return fetchData(apiUrl + "/" + movieId, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(title, description),
  });
}

// DELETE
export function deleteMovie(movieId) {
  return fetchData(apiUrl + "/" + movieId, {
    method: "DELETE",
  });
}
