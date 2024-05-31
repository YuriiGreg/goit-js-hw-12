const API_KEY = "44034856-409a23e11e96e3af40ee90684";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query) {
  const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}






