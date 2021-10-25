import { SettingsService } from './settings.service.js';

export function initSlider() {
  const settings = SettingsService.getInstance();
  const loaderName = settings.backgroundSource;
  const loaders = {
    unsplash: BackgroundLoaderUnsplash,
    github: BackgroundLoaderGithub,
    flickr: BackgroundLoaderFlickr,
  };

  const bodyElement = document.querySelector('body');
  const nextElement = document.querySelector('.slide-next');
  const previousElement = document.querySelector('.slide-prev');
  const selectedLoader = (loaderName && loaders[loaderName]) || BackgroundLoaderGithub;
  const backgroundLoader = new selectedLoader(bodyElement);

  window.addEventListener('load', () => backgroundLoader.load());
  previousElement.addEventListener('click', () => backgroundLoader.previous());
  nextElement.addEventListener('click', () => backgroundLoader.next());
}

class BackgroundLoaderUnsplash {
  constructor(bodyElement) {
    this.bodyElement = bodyElement;
  }

  async load() {
    const imageUrl = await getImageUrlUnsplash(getApiUrl(getTimeOfDay(new Date())));

    this.bodyElement.style.backgroundImage = `url(${imageUrl})`;
  }

  async next() {
    await this.load();
  }

  async previous() {
    await this.load();
  }
}

class BackgroundLoaderFlickr {
  constructor(bodyElement) {
    this.bodyElement = bodyElement;
  }

  async load() {
    const imageUrlFlickr = await getImageUrlFlickr(getApiUrlFlickr(getTimeOfDay(new Date())));

    this.bodyElement.style.backgroundImage = `url(${imageUrlFlickr})`;
  }

  async next() {
    await this.load();
  }

  async previous() {
    await this.load();
  }
}

class BackgroundLoaderGithub {
  constructor(bodyElement) {
    this.bodyElement = bodyElement;
    this.imageNumber = null;
    this.imagesCountStart = 1;
    this.imagesCountEnd = 20;
  }

  async load(imageNumber) {
    const timeOfDay = getTimeOfDay(new Date());

    this.imageNumber = imageNumber || getRandomNumer(this.imagesCountStart, this.imagesCountEnd);

    const imageUrl = `https://raw.githubusercontent.com/renirengi/momentum/assets/${timeOfDay}/${this.imageNumber}.jpg`;

    const img = new Image();

    img.onload = () => (this.bodyElement.style.backgroundImage = `url(${imageUrl})`);
    img.src = imageUrl;
  }

  async next() {
    const num = this.imageNumber < this.imagesCountEnd ? this.imageNumber + 1 : this.imagesCountStart;

    await this.load(num);
  }

  async previous() {
    const num = this.imageNumber > this.imagesCountStart ? this.imageNumber - 1 : this.imagesCountEnd;

    await this.load(num);
  }
}

function getTimeOfDay(date) {
  const hours = date.getHours();

  if (hours >= 6 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon';
  } else if (hours >= 18) {
    return 'evening';
  }

  return 'night';
}

function getApiUrl(timeOfDay) {
  switch (timeOfDay) {
    case 'morning':
      return 'https://api.unsplash.com/photos/random?orientation=landscape&query=morning&client_id=AOhct6K9USP53doPu4OXdx0tViHn0WS7EOo3WQT62Ac';
    case 'afternoon':
      return 'https://api.unsplash.com/photos/random?orientation=landscape&query=castle&client_id=AOhct6K9USP53doPu4OXdx0tViHn0WS7EOo3WQT62Ac';
    case 'evening':
      return 'https://api.unsplash.com/photos/random?orientation=landscape&query=ocean&client_id=AOhct6K9USP53doPu4OXdx0tViHn0WS7EOo3WQT62Ac';
    default:
      // 'night'
      return 'https://api.unsplash.com/photos/random?orientation=landscape&query=mountain&client_id=AOhct6K9USP53doPu4OXdx0tViHn0WS7EOo3WQT62Ac';
  }
}

function getApiUrlFlickr(timeOfDay) {
  switch (timeOfDay) {
    case 'morning':
      return 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a40a886174b38a63bae7ca4e1bf241cb&tags=morning&extras=url_l&format=json&nojsoncallback=1';
    case 'afternoon':
      return 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a40a886174b38a63bae7ca4e1bf241cb&tags=castle&extras=url_l&format=json&nojsoncallback=1';
    case 'evening':
      return 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a40a886174b38a63bae7ca4e1bf241cb&tags=ocean&extras=url_l&format=json&nojsoncallback=1';
    default:
      // 'night'
      return 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a40a886174b38a63bae7ca4e1bf241cb&tags=town&extras=url_l&format=json&nojsoncallback=1';
  }
}

async function getImageUrlUnsplash(apiUrl) {
  const res = await fetch(apiUrl);
  const data = await res.json();

  return data.urls.regular;
}

async function getImageUrlFlickr(apiUrlFlickr) {
  const res = await fetch(apiUrlFlickr);
  const data = await res.json();

  return data.photos.photo[getRandomNumer(0, 99)].url_l;
}

function getRandomNumer(min = 1, max = 20) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
