import { TranslateService } from './translate.service.js';

export async function initQuote() {
  const translate = TranslateService.getInstance();
  const quoteElement = document.querySelector('.quote');
  const authorElement = document.querySelector('.author');
  const changeQuoteElement = document.querySelector('.change-quote');
  const updateQuote = async () => {
    const quoteNumber = randomQuote(1, 40);
    const quoteText = await translate.translate(`quote${quoteNumber}text`);
    const quoteAuthor = await translate.translate(`quote${quoteNumber}author`);

    quoteElement.textContent = quoteText;
    authorElement.textContent = quoteAuthor;
  };

  changeQuoteElement.addEventListener('click', () => updateQuote());

  await updateQuote();
}

function randomQuote(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
