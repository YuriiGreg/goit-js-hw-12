import { fetchImages } from "./js/pixabay-api";
import { renderImages, clearGallery } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");
  
const lightbox = new SimpleLightbox('.gallery a');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) {
      iziToast.warning({
        title: "Warning",
        message: "Please enter a search query!",
      });
      return;
    }
    
    clearGallery(gallery);

    showLoader(true);
    
    try {
      const data = await fetchImages(query);
      if (data.hits.length === 0) {
        iziToast.error({
          title: "Error",
          message: "Sorry, there are no images matching your search query. Please try again!",
        });
      } else {
        renderImages(data.hits, gallery);
      }
    } catch (error) {
      console.error(error);
      iziToast.error({
        title: "Error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      showLoader(false);
      form.reset(); 
    }
  });

  function showLoader(show) {
    if (show) {
      loader.classList.remove("hidden");
      loader.style.display = "block";
    } else {
      loader.classList.add("hidden");
      loader.style.display = "none";
    }
};

