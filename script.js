const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

let correct = true
quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    arrayQuote.forEach((charactorSpan,index) => {
        const charactor = arrayValue[index]
        if (charactor == null) {
          charactorSpan.classList.remove('correct')
          charactorSpan.classList.remove('incorrect')
          correct = false
        } else if (charactor === charactorSpan.innerText) {
          charactorSpan.classList.add('correct')
          charactorSpan.classList.remove('incorrect')
        } else {
          charactorSpan.classList.remove('correct')
          charactorSpan.classList.add('incorrect')
          correct = false
        }

    })
    if (correct) randerNewQuote()
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function randerNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML= ''
    quote.split('').forEach(charactor => {
        const charactorSpan = document.createElement('span')
        charactorSpan.innerText = charactor
        quoteDisplayElement.appendChild(charactorSpan)
    });
    quoteInputElement.value = null
    startTimer()
}
let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = getTimerTime()

    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() -startTime) /1000)
}

randerNewQuote()