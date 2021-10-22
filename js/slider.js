export function initSlider(loaderName) {
  const loaders = {
    unsplash: BackgroundLoaderUnsplash,
    github: BackgroundLoaderGithub
  };
  const bodyElement = document.querySelector('body');
  const nextElement = document.querySelector('.slide-next');
  const previousElement = document.querySelector('.slide-prev');
  const selectedLoader = loaders[loaderName] || BackgroundLoaderUnsplash;
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

    this.bodyElement.style.backgroundImage = `url(${imageUrl})`;
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
      return 'https://api.unsplash.com/photos/random?orientation=landscape&query=hamster&client_id=AOhct6K9USP53doPu4OXdx0tViHn0WS7EOo3WQT62Ac';
    case 'afternoon':
      return 'https://api.unsplash.com/photos/random?orientation=landscape&query=panda&client_id=AOhct6K9USP53doPu4OXdx0tViHn0WS7EOo3WQT62Ac';
    case 'evening':
      return 'https://api.unsplash.com/photos/random?orientation=landscape&query=racoon&client_id=AOhct6K9USP53doPu4OXdx0tViHn0WS7EOo3WQT62Ac';
    default:
      // 'night'
      return 'https://api.unsplash.com/photos/random?orientation=landscape&query=cat&client_id=AOhct6K9USP53doPu4OXdx0tViHn0WS7EOo3WQT62Ac';
  }
}

async function getImageUrlUnsplash(apiUrl) {
  const res = await fetch(apiUrl);
  const data = await res.json();

  return data.urls.regular;
}

function getRandomNumer(min = 1, max = 20) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
