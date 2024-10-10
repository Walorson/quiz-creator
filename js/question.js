class Question {
    constructor(title) {
        this.id = questions.length;
        this.title = title;
        if(this.title == "") this.title = "Untitled Question";
    }
    getElements() {}
    getPreElements() { 
        this.addAnswer = document.getElementById(`add-answer${this.id}`);
        this.answers = document.getElementById(`answers${this.id}`);
        this.removeBtn = document.querySelectorAll(`#answer-remove${this.id}`);
        let removeBtnCount = [];
        for(let i=0; i < this.removeBtn.length; i++) {
            removeBtnCount[i] = this.removeBtn[i];
        }
        this.removeBtn.forEach((item, index) => {
            item.onclick = () => {
                console.log(removeBtnCount.length)
                if(removeBtnCount.length > 2) { 
                    item.parentElement.remove();
                    delete removeBtnCount[index];
                    const removeBtn2 = []; let j=0;
                    for(let i=0; i < removeBtnCount.length; i++) {
                        if(removeBtnCount[i] != undefined) { removeBtn2[j] = removeBtnCount[i]; j++; }
                    }
                    removeBtnCount = removeBtn2;
                }
            }
        });
        this.editable = document.querySelectorAll("input[type=editable]");
        this.editable.forEach(item => item.oninput = () => item.setAttribute("value",item.value));
        this.numbers = document.querySelectorAll("input[type=number");
        this.numbers.forEach(item => item.oninput = () => item.setAttribute("value",item.value));
        this.removeQuestionBtn = document.getElementById(`question-remove${this.id}`);
        this.removeQuestionBtn.onclick = () => { 
            this.removeQuestionBtn.parentElement.parentElement.remove();
            delete questions[this.id];
        }
    }
    printQuestion() { questionsContainer.innerHTML += this.question; }
}
class RadioQuestion extends Question {
    constructor(title) {
        super(title);
        this.question = `<div class="question" id="question${this.id}">
        <div class="question-title" id="qt${this.id}"><span class="question-remove" id="question-remove${this.id}">X</span><input type="editable" value="${this.title}"></div>
        <div class="answers" id="answers${this.id}">
            <div class="answer"><span class="answer-remove" id="answer-remove${this.id}">remove</span><input type="editable" placeholder="Type an answer"><label><input type="radio" name="radio${this.id}">Correct Answer</label></div>
            <div class="answer"><span class="answer-remove" id="answer-remove${this.id}">remove</span><input type="editable" placeholder="Type an answer"><label><input type="radio" name="radio${this.id}">Correct Answer</label></div>
            <div class="add-answer" id="add-answer${this.id}"><span>+</span></div>
        </div>`;
        this.printQuestion();
    }
    getElements() {
        this.getPreElements();
        this.addAnswer.onclick = () => {
            this.addAnswer.remove();
            this.answers.innerHTML += `<div class="answer"><span class="answer-remove" id="answer-remove${this.id}">remove</span><input type="editable" placeholder="Type an answer"><label><input type="radio" name="radio${this.id}">Correct Answer</label></div>
            <label class="add-answer" id="add-answer${this.id}"><span>+</span></label>`;
            this.getElements();
        }
        const radio = document.getElementsByName(`radio${this.id}`);
        radio.forEach(item => item.onclick = () => { this.correctAnswer(item); })
    }
    correctAnswer(item) {
        document.getElementsByName(`radio${this.id}`).forEach(item => { item.parentElement.parentElement.style.backgroundColor = "#222"; item.removeAttribute("checked"); });
        item.parentElement.parentElement.style.backgroundColor = "#082b03";
        item.setAttribute("checked",";");
    }
}
class CheckboxQuestion extends Question {
    constructor(title) {
        super(title);
        this.question = `<div class="question" id="question${this.id}">
        <div class="question-title" id="qt${this.id}"><span class="question-remove" id="question-remove${this.id}">X</span><input type="editable" value="${this.title}"></div>
        <div class="answers" id="answers${this.id}">
            <div class="answer"><span class="answer-remove" id="answer-remove${this.id}">remove</span><input type="editable" placeholder="Type an answer"><label><input type="checkbox" class="checkbox${this.id}">Correct Answer</label></div>
            <div class="answer"><span class="answer-remove" id="answer-remove${this.id}">remove</span><input type="editable" placeholder="Type an answer"><label><input type="checkbox" class="checkbox${this.id}">Correct Answer</label></div>
            <div class="add-answer" id="add-answer${this.id}"><span>+</span></div>
        </div>`;
        this.printQuestion();
    }
    getElements() {
        this.getPreElements();
        this.addAnswer.onclick = () => {
            this.addAnswer.remove();
            this.answers.innerHTML += `<div class="answer"><span class="answer-remove" id="answer-remove${this.id}">remove</span><input type="editable" placeholder="Type an answer"><label><input type="checkbox" class="checkbox${this.id}">Correct Answer</label></div>
            <label class="add-answer" id="add-answer${this.id}"><span>+</span></label>`;
            this.getElements();
        }
        this.checkboxs = document.querySelectorAll(`.checkbox${this.id}`);
        this.checkboxs.forEach(item => item.onclick = () => { this.correctAnswer(item); })
    }
    correctAnswer(item) {
        if(item.checked) {
            item.setAttribute("checked",";");
            item.parentElement.parentElement.style.backgroundColor = "#082b03";
        }
        else {
            item.removeAttribute("checked");
            item.parentElement.parentElement.style.backgroundColor = "#222";
        }
    }
}
class TextQuestion extends Question {
    constructor(title) {
        super(title);
        this.question = `<div class="question" id="question${this.id}">
        <div class="question-title" id="qt${this.id}"><span class="question-remove" id="question-remove${this.id}">X</span><input type="editable" value="${this.title}"></div>
        <div class="answers" id="answers${this.id}">
            <div class="answer" style="background-color:#082b03"><span class="answer-remove" id="answer-remove${this.id}">remove</span><input type="editable" placeholder="Type the CORRECT answer"></div>
            <div class="add-answer" id="add-answer${this.id}"><span>+</span></div>
        </div>`;
        this.printQuestion();
    }
    getElements() {
        this.getPreElements();
        this.addAnswer.onclick = () => {
            this.addAnswer.remove();
            this.answers.innerHTML += `<div class="answer" style="background-color:#082b03"><span class="answer-remove" id="answer-remove${this.id}">remove</span><input type="editable" placeholder="Type the CORRECT answer"></div>
            <label class="add-answer" id="add-answer${this.id}"><span>+</span></label>`;
            this.getElements();
        }
        this.checkboxs = document.querySelectorAll(`.checkbox${this.id}`);
        this.checkboxs.forEach(item => item.onclick = () => { this.correctAnswer(item); })
    }
}
class NumberQuestion extends Question {
    constructor(title) {
        super(title);
        this.question = `<div class="question" id="question${this.id}">
        <div class="question-title" id="qt${this.id}"><span class="question-remove" id="question-remove${this.id}">X</span><input type="editable" value="${this.title}"></div>
        <div class="answers" id="answers${this.id}">
            <div class="answer" style="background-color:#082b03"><span class="answer-remove" id="answer-remove${this.id}">remove</span><input type="number" placeholder="Type the CORRECT answer"></div>
            <div class="add-answer" id="add-answer${this.id}"><span>+</span></div>
        </div>`;
        this.printQuestion();
    }
    getElements() {
        this.getPreElements();
        this.addAnswer.onclick = () => {
            this.addAnswer.remove();
            this.answers.innerHTML += `<div class="answer" style="background-color:#082b03"><span class="answer-remove" id="answer-remove${this.id}">remove</span><input type="number" placeholder="Type the CORRECT answer"></div>
            <label class="add-answer" id="add-answer${this.id}"><span>+</span></label>`;
            this.getElements();
        }
        this.checkboxs = document.querySelectorAll(`.checkbox${this.id}`);
        this.checkboxs.forEach(item => item.onclick = () => { this.correctAnswer(item); })
    }
}