// const btnGenerator = document.querySelector("#btn-generate");
// const clrcode = document.querySelector("#clrcode");
// const changeBod = document.querySelector("body");

// btnGenerator.addEventListener("click", () => {
//   fetch(`https://www.thecolorapi.com/random?format=json`)
//     .then((response) => response.json())
//     .then((data) => {
//       getColor(data);
//       console.log(`Name: ${data.name.value}`);
//       console.log(`RGB: ${data.rgb.value}`);
//       console.log(`HSL: ${data.hsl.value}`);
//       console.log(`HSV: ${data.hsv.value}`);
//       console.log(`CMYK: ${data.cmyk.value}`);
//     });
// });

// function getColor(data) {
//   const hexCode = data.hex.value;
//   clrcode.textContent = `${hexCode}`;
//   changeBod.style.backgroundColor = hexCode;
// }

// Funktion zum Aktualisieren des Hexcodes im P-Tag basierend auf dem ausgewählten Filter
function updateColorCode(filter, colorData) {
  let updatedCode;

  // Je nach ausgewähltem Filter die Farbinformationen entsprechend extrahieren
  switch (filter) {
    case "hex":
      updatedCode = colorData.hex.value;
      break;
    case "rgb":
      updatedCode = `rgb(${colorData.rgb.value.join(", ")})`;
      break;
    case "hsl":
      updatedCode = `hsl(${colorData.hsl.value.join(", ")})`;
      break;
    case "hsv":
      updatedCode = `hsv(${colorData.hsv.value.join(", ")})`;
      break;
    case "cmyk":
      updatedCode = `cmyk(${colorData.cmyk.value.join(", ")})`;
      break;
    default:
      // Standardfall, sollte nicht passieren
      updatedCode = colorData.hex.value;
      break;
  }

  // Den Text des P-Tags aktualisieren
  document.getElementById("colorCode").textContent = `Hex Code: ${updatedCode}`;
}

// Event Listener für den Button
document
  .getElementById("generateButton")
  .addEventListener("click", function () {
    // API-Aufruf, um eine zufällige Farbe zu erhalten
    fetch("https://www.thecolorapi.com/random?format=json")
      .then((response) => response.json())
      .then((data) => {
        // Aktuellen Filterwert abrufen
        const selectedFilter = document.getElementById("filterSelect").value;

        // Hexcode aktualisieren basierend auf dem ausgewählten Filter und den Farbinformationen von der API
        updateColorCode(selectedFilter, data);
      })
      .catch((error) =>
        console.error("Fehler beim Abrufen der Farbinformationen:", error)
      );
  });
