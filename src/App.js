import React, {useState} from 'react';

let chooseColor = ()=>{
  let colors = [
    '#E45826',
    '#F0A500',
    '#6EBF8B',
    '#5463FF',
    '#DADBBD',
    '#1B1A17'
  ];

  return colors[Math.round(Math.random() * colors.length)]
}

export default function App(){
  let quoteTextElement = React.createRef()

  let [mainColor, setMainColor] = useState('#E45826');

  let changeColor = ()=>{
    let newColor = chooseColor();
    while(newColor === mainColor){
      newColor = chooseColor()
    }
    setMainColor(newColor);
  }

  let [quote, setQuote] = useState({text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.', author: 'Nelson Mandela'});

  let getNewQuote = ()=>{
    fetch('https://api.quotable.io/random').then(resp=>resp.json()).then(json=>{
      let quote = {
        text: json.content,
        author: json.author
      }
      setInterval(() => {
        
      }, 5);
      // quoteTextElement.current

      setQuote(quote);
      changeColor()
    })
  }

  let quoteToTweet = (quote)=>{
    return encodeURIComponent(quote.text+ '\n\n - '+quote.author)
  }

  return (
    <div className="wrapper" style={{backgroundColor: mainColor}}>
      <div class="quote" id="quote-box">
          <p class="quote__text" id="text" ref={quoteTextElement}>{quote.text}</p>
          <p class="quote__author" id="author">- {quote.author}</p>
          <div class="quote__footer">
            <div class="quote__share-section">
                <a href={`https://twitter.com/intent/tweet?text=${quoteToTweet(quote)}`} target="_blank" rel="noreferer noreferrer" class="quote__share-section-btn" id="tweet-quote"><i class="bi bi-twitter"></i></a>
            </div>
            <div class="quote__action" id="new-quote" onClick={getNewQuote} style={{backgroundColor: mainColor}}>New quote</div>
          </div>
      </div>
      </div>
  )
}
