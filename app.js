let count = 5;
let photosArray = [];
let imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
const apiKey = "0apq55_WuhG5YZF2IY_9qQfm8VG37wFd4leNiTkgBaU";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
let ready = false;
let loadedImage = 0;
let totalImages = 0;
let initialLoad = true;

function checkInitialLoad() {
  if (loadedImage == count) {
    initialLoad = false;
  }
}

function imageLoaded() {
  loadedImage++;
  loader.hidden = true;
  checkInitialLoad();
  if (loadedImage == totalImages && !initialLoad) {
    ready = true;
    count = 30;
  }
}

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayImage();
  } catch (error) {}
}
// Helper function to keep code dry - not repeating .setAttribute
function setAtt(eleme, attr) {
  for (const key in attr) {
    if (attr[key] !== null) {
      eleme.setAttribute(key, attr[key]);
    }
  }
}

function displayImage() {
  loadedImage = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    if (photo.alt_description !== null) console.log(photo);
    let item = document.createElement("a");
    let img = document.createElement("img");
    setAtt(item, {
      href: photo.links.html,
      target: "_blank",
    });
    setAtt(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    item.appendChild(img);
    imgContainer.appendChild(item);
    img.addEventListener("load", imageLoaded);
  });
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight &&
    ready
  ) {
    loader.hidden = false;
    getPhotos();
  }
});

//use window.pageYOffset instead of window.scrollY because of browser compatibility

getPhotos();
