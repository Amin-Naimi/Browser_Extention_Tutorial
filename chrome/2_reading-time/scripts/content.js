const article = document.querySelector('article');

if(article){
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegExp);
      // matchAll returns an iterator, convert to array to get word count
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱ ${readingTime} min read 🙂`

    const heading = article.querySelector("h1");
    const date = article.querySelector("time")?.parentNode;

    /*Si date est défini (non null ou undefined), alors (date ?? heading) renverra date.
    Si date est null ou undefined, alors (date ?? heading) renverra heading.*/
    
    (date ?? heading).insertAdjacentElement("afterend", badge);


}