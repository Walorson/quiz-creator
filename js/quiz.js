document.querySelectorAll("[data-maxlength]").forEach(item => {
    const span = item.querySelector("span");
    const input = item.querySelector("input");
    let count = span.textContent;
    input.oninput = () => {
        span.textContent = count - input.value.length;
    }
});
const addQuestion = document.getElementById("addQuestion"); //przycisk to otworzenia okna, żeby utworzyć pytanie
const swindow = document.getElementById("window"); //okno
const swindowQuit = document.querySelector(".x"); //wyjście z okna "X"
const sblur = document.getElementById("blur"); //efekt rozmazywania
const createBtn = document.getElementById("create-question"); //przycisk do tworzenia nowe pytania
const typeOfQuestion = document.getElementById("type-of-question"); //typ pytania - radio/checkbox/text/number
let isWindowOpened = false;

const openWindow = () => { //Otwiera okno z animacją
    isWindowOpened = true;
    swindow.style.opacity = 1;
    swindow.style.zIndex = 50;

    sblur.style.opacity = 1;
    sblur.style.zIndex = 25;
}
const closeWindow = () => { //Zamyka okno z animacją
    isWindowOpened = false;
    swindow.style.opacity = 0;
    swindow.style.zIndex = -50;

    sblur.style.opacity = 0;
    sblur.style.zIndex = -50;
}
addQuestion.addEventListener("click",openWindow);
swindowQuit.addEventListener("click",closeWindow);
createBtn.addEventListener("click",closeWindow);
const questions = [];
const questionsContainer = document.getElementById("questions");

let type, title;
createBtn.addEventListener("click",() => { //tworzy nowe pytanie
    type = typeOfQuestion.value;
    title = document.getElementById("title-of-new-question").value;
    switch(type) {
        case "checkbox": questions.push(new CheckboxQuestion(title)) ; break;
        case "text": questions.push(new TextQuestion(title)); break;
        case "number": questions.push(new NumberQuestion(title)); break;
        default: questions.push(new RadioQuestion(title)); break;
    }
    questions.forEach(item => item.getElements());
});