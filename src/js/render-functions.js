import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderImages(images, gallery) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li>
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info">
        <p><b>Likes</b> ${likes}</p>
        <p><b>Views</b> ${views}</p>
        <p><b>Comments</b> ${comments}</p>
        <p><b>Downloads</b> ${downloads}</p>
      </div>
    </li>
  `).join("");
  
  gallery.innerHTML = markup;

  const lightbox = new SimpleLightbox(".gallery a");
  lightbox.refresh();
}

export function clearGallery(gallery) {
  gallery.innerHTML = "";
}



