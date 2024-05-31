import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, hideLoadMoreButton, showLoadMoreButton, displayEndOfResultsMessage, hideEndOfResultsMessage, smoothScroll } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loadMoreButton = document.querySelector('.load-more');
const loader = document.getElementById('loader');

let query = '';
let page = 1;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = input.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  clearGallery(gallery);
  hideLoadMoreButton();
  hideEndOfResultsMessage();

  page = 1;
  await fetchAndRenderImages();
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  await fetchAndRenderImages();
});

async function fetchAndRenderImages() {
  showLoader(true);

  try {
    const data = await fetchImages(query, page);
    if (data.hits.length === 0 && page === 1) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderImages(data.hits, gallery);
      if (data.totalHits <= page * 15) {
        hideLoadMoreButton();
        displayEndOfResultsMessage();
      } else {
        showLoadMoreButton();
      }
      smoothScroll();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    showLoader(false);
    form.reset();
  }
}


function showLoader(show) {
  if (show) {
    loader.classList.remove('hidden');
    loader.style.display = 'block';
  } else {
    loader.classList.add('hidden');
    loader.style.display = 'none';
  }
}

