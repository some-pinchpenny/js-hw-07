import { galleryItems } from "./gallery-items.js";
const galleryList = document.querySelector(".gallery");

function createImgCards(arr) {
  return arr
    .map(
      ({ preview: src, original: href, description: alt }) =>
        `<li class="gallery__item">
        <a class="gallery__link" href="${href}">
           <img class="gallery__image" src="${src}" alt="${alt}" />
        </a>
     </li>`
    )
    .join("");
}
galleryList.insertAdjacentHTML("beforeend", createImgCards(galleryItems));

let gallery = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
