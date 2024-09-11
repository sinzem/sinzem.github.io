window.addEventListener("DOMContentLoaded", () => {

    /* (answers to console) */
    const answerButtons = document.querySelectorAll(".survey_button");
    const buttonsSuccess = document.querySelectorAll(".btn-success");
    
    let answers = [];

    answerButtons.forEach((button) => {
        button.addEventListener("click", () => {
            answers.push(button.textContent);
        })
    })
    
    buttonsSuccess.forEach((btn) => {
        btn.addEventListener("click", () => {
            console.log(answers);
            answers = [];
        })
    })

    /* (add comment) */
    const commentsForm = document.querySelector(".comments__form");
    const sendComment = commentsForm.querySelector(".comments__form__btn");

    const comments = [];
    let object = {};

    sendComment.addEventListener("click", (e) => {
        e.preventDefault();
        const formData = new FormData(commentsForm);
        formData.forEach(function(value, key) {
            object[key] = value;
        });
        comments.push(object);
        object.id = comments.length + 100;
        object = {};
        commentsForm.reset();
        let {id, name, text} = comments[comments.length - 1];
        new commentCard(id, name, text, ".comments__send").render();
    })
})


class commentCard {
    constructor(id, name = "", text = "", parentSelector) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        const element = document.createElement("div"); 
        element.innerHTML = ` 
            <div class="comments" id="comment${this.id}" style="display:block">
                <div class="profile">
                    <img src="./assets/img/3.jpg" alt="picture">
                </div>
                <div class="comment-content">
                <p class="name">${this.name}</p>
                <p>${this.text}</p>
                </div>
                <div class="clr"></div>
                <div class="comment-status">
                <span>
                    Curte·comente
                    <img src="./assets/img/like.png" width="15" height="15" alt="picture">
                    0
                </span>
                    <small>·</small>
                    <small>
                    <u>
                        0 minutos antes
                    </u>
                    </small>
                </div>
            </div>
        `;
        this.parent.after(element); 
    }
}