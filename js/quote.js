export function initQuote() {
  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');
  let loaderLang;
 
  function getLocalStorage() {
    loaderLang = localStorage.getItem('language');
     /*if (town) {
      city.value = town;
    }*/
    return loaderLang;
  }
  getLocalStorage();

  if (!loaderLang)
    languageLoaderEng();
    else
    {
      if (loaderLang == 'rus')
        languageLoaderRus();
      else
        languageLoaderEng();
    }
 
 

 function languageLoaderEng(){

  async function getQuotes() {  
      const quotes = '../assets/dataEng.json';
      const res = await fetch(quotes);
      const data = await res.json(); 
      let temp=randomQuote(0,85);
      const text=data[temp]['text'];
      const textAuthor=data[temp]['author'];
      quote.textContent=text;
      author.textContent=textAuthor;
      console.log(temp);
    }
    getQuotes(); 
    const changeQuote= document.querySelector('.change-quote');
    changeQuote.addEventListener('click', ()=> getQuotes());
  }

  function languageLoaderRus(){
 
    async function getQuotes() {  
        const quotes = '../assets/dataRu.json';
        const res = await fetch(quotes);
        const data = await res.json();
        let temp=randomQuote(0,61);
        const text=data[temp]['text'];
        const textAuthor=data[temp]['author'];
        quote.textContent=text;
        author.textContent=textAuthor;
        console.log(temp);
      }
      getQuotes(); 
      const changeQuote= document.querySelector('.change-quote');
      changeQuote.addEventListener('click', ()=> getQuotes());
    }



    function randomQuote(min,max){
      return Math.floor(Math.random() * (max - min + 1)) + min;

    }
    
 }
/*import { TranslateService } from './translate.service.js';

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
  }

  //console.log(await translate.translate('goodmorning'))

  changeQuoteElement.addEventListener('click', () => updateQuote());

  await updateQuote();
}

function randomQuote(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
*/