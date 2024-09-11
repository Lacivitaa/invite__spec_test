const quizData = [
    {
        question: "Serão 4 perguntas simples (porque eu queria poder mandar o quanto antes), responda com o que achar que é o certo",
        options: ["Tudo bem, começar!", "Não quero não"],
        correct: "Tudo bem, começar!",
        correctMessage: "É assim que eu gosto de ver!",
        wrongMessage: "Vai ter que responder mesmo assim, paciência"
    },
    {
        question: "Porque investir num nerd é a melhor opção do mercado?",
        options: ["Dedicação total a você (mais que Casas Bahia)", "Esse tipo de bobeirinha de vez em quando", "Conversas inteligentes (até certo onde o conhecimento for)", "Porque Deus acatou seu pedido (destino)"],
        correct: "Porque Deus acatou seu pedido (destino)",
        correctMessage: "Se ele ouviu, quem somos nós pra discordar",
        wrongMessage: "concordo com o motivo, e está mais que certa"
    },
    {
        question: "O que acontece caso você passe na frente desse 'nerd' ?",
        options: ["Moleza na perna (quase caí)", "Sorriso bobo (incontrolável)", "Vontade de te dar um beijo (justificável)", "Todas anteriores"],
        correct: "Todas anteriores",
        correctMessage: "Essa culpa não é nenhum pouca minha, ninguem mandou ser tão perfeita assim",
        wrongMessage: "Errada não está, mas as outras todos ali acontecem junto"
    },
    {
        question: "O que acontece quando se você manter contato visual com esse 'garoto da TI'?",
        options: ["Esqueço o que ia falar (acho que desenvolvi TDAH)", "Todas as alternativas (<- a resposta)", "Lasco um beijinho (é que eu fico nervoso hahaha)", "Não quero mais parar de te olhar (vicia rapidamente)"],
        correct: "Todas as alternativas (<- a resposta)",
        correctMessage: "Não tinha nem como errar essa aqui 😊",
        wrongMessage: "Mesmo com a modéstia, pode confiar que todas facilmente aconteceriam"
    },
    {
        question: "Se você pudesse escolher só um desses, qual seria?",
        options: ["Um datezinho com vinho", "Um treininho juntos", "Todas alternativas", "Filme e pipoca só na moleza"],
        correct: "Todas alternativas",
        correctMessage: "Nossa, ainda bem que você ta pensando o mesmo que eu",
        wrongMessage: "Errou! Mas está tudo bem, o resto a gente faz depois hahaha"
    },
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopupButton = document.getElementById('close-popup');

function loadQuiz() {
    const currentQuiz = quizData[currentQuestion];
    const questionHTML = `
        <div class="quiz-question">${currentQuiz.question}</div>
        ${currentQuiz.options.map((option, index) => 
            `<div>
                <input type="radio" name="answer" value="${option}" id="option${index}">
                <label for="option${index}">${option}</label>
            </div>`
        ).join('')}
    `;
    quizContainer.innerHTML = questionHTML;
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'flex'; // Exibir o popup quando necessário
}

function closePopup() {
    popup.style.display = 'none'; // Ocultar o popup
    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
}

function checkAnswer() {
    const answers = document.getElementsByName('answer');
    let selectedAnswer;
    for (const answer of answers) {
        if (answer.checked) {
            selectedAnswer = answer.value;
            break;
        }
    }

    if (!selectedAnswer) {
        showPopup("Escolha uma alternativa antes, olha o TDAH vencendo");
        return;
    }

    const currentQuiz = quizData[currentQuestion];
    const correctAnswer = currentQuiz.correct;
    if (selectedAnswer === correctAnswer) {
        score++;
        showPopup(currentQuiz.correctMessage);
    } else {
        showPopup(currentQuiz.wrongMessage);
    }

    currentQuestion++;
}

function showResult() {
    if (score === quizData.length) {
        resultContainer.innerHTML = `Parabéns você acaba de ganhar um date no fim de semana após uma aula exaustiva, afim de restaurar suas energias, para retirar o prêmio mande a palavra "CHICO BENTO" na DM do consagrado 😅`;
    } else {
        resultContainer.innerHTML = `Você acertou ${score} de ${quizData.length} perguntas. Mas mesmo assim ganhou o prêmio de um date no fim de semana após uma aula de 10 horas (cansativa), para retirar o prêmio mande a palavra "CHICO BENTO" na DM do consagrado 😅`;
    }
}

submitButton.addEventListener('click', checkAnswer);
closePopupButton.addEventListener('click', closePopup);
loadQuiz();
