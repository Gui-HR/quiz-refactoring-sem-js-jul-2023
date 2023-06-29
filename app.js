const correctAnswers = ['B', 'A', 'C', 'A']
const finalScoreContainer = document.querySelector('.final-score-container')
const scoreContent = finalScoreContainer.querySelector('.score')
const form = document.querySelector('.quiz-form')

let score = null

// Pega as respostas do usuario
const getUserAnswers = () => {
  const userAnswers = []

  // Passa pelas respostas certas, não usa o elemento mas usa o index  
  correctAnswers.forEach((_, index) => {

    // Cria uma variavel com a resposta do usuario 
    const userAnswer = form[`inputQuestion${index + 1}`].value

    // Atribui a resposta coletada a um array
    userAnswers.push(userAnswer)
  })

  // Retorna um array com as respostas do usuario
  return userAnswers
}

// Calcula os pontos do usuario com base nas respostas coletadas
const calculateUserScore = userAnswers => {
  score = 0

  // Passa por cada respostas coletada (Poderia usar reduce())
  userAnswers.forEach((userAnswer, index) => {

    // Verifica se e resposta do usuario esta correta
    const isUserAnswerCorrect = userAnswer === correctAnswers[index]

    // Atribui +25 para cada resposta correta
    if (isUserAnswerCorrect) {
      score += 25
    }
  })
}

// Exibe a pontuação do usuario (Não sei como faz isso)
const showFinalScore = () => {
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })

  finalScoreContainer.classList.remove('d-none')
}

// Anima a pontuação final (Tabmem não sei como funciona)
const animateFinalScore = () => {
  let counter = 0

  const timer = setInterval(() => {
    if (counter === score) {
      clearInterval(timer)
    }

    changeScoreStyle(counter)

    scoreContent.textContent = `${counter++}%`
  }, 20);
}

const changeScoreStyle = (counter) => {
  if (counter <= 33) {
    addBgDangerSubtleClass()
  } else if (counter <= 75) {
    removeBgDangerSubtleClass()
    addBgWarningSubtleClass()
  } else {
    removeBgDangerSubtleClass()
    removeBgWarningSubtleClass()
    addBgSuccessSubtleClass()
  }
}

const addBgDangerSubtleClass = () => {
  finalScoreContainer.classList.add('bg-danger-subtle')
  scoreContent.classList.add('text-danger')
}

const removeBgDangerSubtleClass = () => {
  finalScoreContainer.classList.remove('bg-danger-subtle')
  scoreContent.classList.remove('text-danger')
}

const addBgWarningSubtleClass = () => {
  finalScoreContainer.classList.add('bg-warning-subtle')
  scoreContent.classList.add('text-warning')
}

const removeBgWarningSubtleClass = () => {
  finalScoreContainer.classList.remove('bg-warning-subtle')
  scoreContent.classList.remove('text-warning')
}

const addBgSuccessSubtleClass = () => {
  finalScoreContainer.classList.add('bg-success-subtle')
  scoreContent.classList.add('text-success')
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const userAnswers = getUserAnswers()

  calculateUserScore(userAnswers)
  showFinalScore()
  animateFinalScore()
})
