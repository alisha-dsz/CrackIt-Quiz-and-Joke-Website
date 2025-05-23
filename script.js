const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');
const jokeBtn = document.querySelector('.jokes');
const jokeContent = document.querySelector('.joke-content');
const closeJoke = document.querySelector('.close-joke');

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
let selectedQuestions = [];

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};

jokeBtn.onclick = () => {
    jokeContent.classList.add('active');
    main.classList.add('active');
}

closeJoke.onclick = () => {
    jokeContent.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    
    selectedQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);

    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
};

tryAgainBtn.onclick = () => {
    resetQuiz();
    quizBox.classList.add('active');
};

goHomeBtn.onclick = () => {
    resetQuiz();
    quizSection.classList.remove('active');
};

nextBtn.onclick = () => {
    if (questionCount < selectedQuestions.length - 1) {
        questionCount++;
        questionNumb++;
        showQuestions(questionCount);
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        showResultBox();
    }
};

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');

    questionText.textContent = `${questionNumb}. ${selectedQuestions[index].question}`;

    const options = selectedQuestions[index].options.map(option => 
        `<div class="option"><span>${option}</span></div>`
    ).join('');
    
    optionList.innerHTML = options;

    const allOptions = optionList.querySelectorAll('.option');
    allOptions.forEach(option => {
        option.addEventListener('click', () => optionSelected(option));
    });
}

function optionSelected(answer) {
    const userAnswer = answer.textContent;
    const correctAnswer = selectedQuestions[questionCount].answer;
    const allOptions = optionList.children;

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore++;
        headerScore();
    } else {
        answer.classList.add('incorrect');
        for (let opt of allOptions) {
            if (opt.textContent === correctAnswer) {
                opt.classList.add('correct');
            }
        }
    }

    for (let opt of allOptions) {
        opt.classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${selectedQuestions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${selectedQuestions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${selectedQuestions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    const progressEndValue = Math.round((userScore / selectedQuestions.length) * 100);
    const speed = 20;

    const progress = setInterval(() => {
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(rgb(39,137,142) ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;

        if (progressStartValue >= progressEndValue) {
            clearInterval(progress);
        } else {
            progressStartValue++;
        }
    }, speed);
}

function resetQuiz() {
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    selectedQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
    
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

document.addEventListener("DOMContentLoaded", () => {
  const jokeButton = document.querySelector(".jokes");
  const jokeModal = document.querySelector(".joke-modal");
  const jokeText = document.querySelector(".joke-text");
  const closeJoke = document.querySelector(".close-joke");

  jokeButton.addEventListener("click", () => {
    jokeText.textContent = "Loading a joke...";

    fetch("https://v2.jokeapi.dev/joke/Any?safe-mode&type=single")
      .then(response => response.json())
      .then(data => {
        if (data && data.joke) {
          jokeText.textContent = data.joke;
        } else {
          jokeText.textContent = "No joke found!";
        }
        jokeModal.style.display = "flex";
      })
      .catch(error => {
        console.error("Error fetching joke:", error);
        jokeText.textContent = "Failed to fetch a joke.";
        jokeModal.style.display = "flex";
      });
  });

  closeJoke.addEventListener("click", () => {
    jokeModal.style.display = "none";
  });
});



