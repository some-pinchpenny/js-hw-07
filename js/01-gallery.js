import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");

function createImgCards(arr) {
  return arr
    .map(
      ({ preview: src, original: source, description: alt }) =>
        `<li class="gallery__item"><a class="gallery__link" href="${source}"><img class="gallery__image" src="${src}" data-source="${source}" alt="${alt}"></a></li>`
    )
    .join("");
}
galleryList.insertAdjacentHTML("beforeend", createImgCards(galleryItems));

galleryList.addEventListener("click", getUrlBigImg);

function getUrlBigImg(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const neededImg = findNeededItem(evt);

  const instance = basicLightbox.create(createModalCards(neededImg), {
    onShow: () => {
      document.addEventListener("keydown", closeModal);
    },
    onClose: () => {
      document.removeEventListener("keydown", closeModal);
    },
  });
  instance.show();

  function closeModal(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }
}

function findNeededItem(item) {
  const currentImg = item.target.dataset.source;
  return galleryItems.find(({ original }) => original === currentImg);
}

function createModalCards(obj) {
  return `<img src="${obj.original}" alt="${obj.description}" width="800" height="600">`;
}
