const count = 10;
const apiKEY = '6UxV8mqdsUU9HBYcDlmbJz9j6SnJlNc7hbvXwNJjQ3Q';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getPhotos();
