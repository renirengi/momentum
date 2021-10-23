export function initQuote(loaderLang) {
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
   
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
   console.log("eng");
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
  