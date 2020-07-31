const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImagesLoaded = 0;
let imagesArray = [];

const count = 30;
const apiKEY = '6UxV8mqdsUU9HBYcDlmbJz9j6SnJlNc7hbvXwNJjQ3Q';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImagesLoaded) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttribute(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

function displayImages() {
  imagesLoaded = 0;
  totalImagesLoaded = imagesArray.length;
  imagesArray.forEach((image) => {
    const item = document.createElement('a');
    setAttribute(item, {
      href: image.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');
    setAttribute(img, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.alt_description,
    });

    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getImages() {
  try {
    const response = await fetch(apiURL);
    imagesArray = await response.json();
    displayImages();
  } catch (error) {
    console.log(error);
  }
}
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getImages();
  }
});

getImages();
