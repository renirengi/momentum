export function initQuote() {
    window.addEventListener('load', () => initText());
   }

   function initText(){
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    const changeQuote= document.querySelector('.change-quote');
    
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



      function randomQuote(min,max){
        return Math.floor(Math.random() * (max - min + 1)) + min;

      }
      changeQuote.addEventListener('click', ()=> getQuotes());
   }