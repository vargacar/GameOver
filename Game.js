const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionCounter = 0 
let availableQuestion = []

let questions = [
    {
        question: 'Baby camels are born with..?',
        choice1: '3 humps',
        choice2: 'no hump',
        choice3: '1 hump',
        choice4: '2 humps',
        answer: 2,
    },
    {
        question: 'How many sides does an octacontagon have?',
        choice1: '8',
        choice2: '18',
        choice3: '80',
        choice4: '88',
        answer: 3,
    },
    {
        question: 'How many are in a dozen bakery?',
        choice1: '12',
        choice2: '10',
        choice3: '22',
        choice4: '13',
        answer: 4,
    },
    {
        question: 'A googol is the number 1 with..?',
        choice1: '20 zeros after it',
        choice2: '1 zero after it',
        choice3: '5 zeros after it',
        choice4: '100 zeroes after it',
        answer: 4,
    }

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0 
    score = 0
    availableQuestion = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestion.lenght)
    currentQuestion = availableQuestion[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice + number']
    })

    availableQuestion.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()