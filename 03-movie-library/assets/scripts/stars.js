export function renderStars(rating) {
  const starContainer = document.createElement("div");
  starContainer.classList.add("rating-stars");
  const stars = {
    0: "a-empty",
    0.5: "b-half",
    1: "c-one",
    1.5: "d-one-half",
    2: "e-two",
    2.5: "f-two-half",
    3: "g-three",
    3.5: "h-three-half",
    4: "i-four",
    4.5: "j-four-half",
    5: "k-five",
  };
  starContainer.classList.add(stars[rating]);

  return starContainer;
}
