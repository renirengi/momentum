export function initQuote() {
    window.addEventListener('load', () => initText());
   }

   function initText(){

    async function getQuotes() {  
        const quotes = 'data.json';
        const res = await fetch(quotes);
        const data = await res.json(); 
        console.log(data);
      }
      getQuotes();
   }