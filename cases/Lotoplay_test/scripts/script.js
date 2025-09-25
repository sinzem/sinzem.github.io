const menu = document.querySelector(".menu");
const popup = document.querySelector(".popup_sender");
const popupOpeners = document.querySelectorAll("[data-popup]");
const sendBtns = document.querySelectorAll("[data-send]");
const inputs = document.querySelectorAll("[data-input]");
const mesasgePopup = document.querySelector(".popup_message");
let scrollWidth = calcScroll();
let payloadForOrdedr = ""; 
let noError = true;


window.addEventListener("scroll", () => throttledHideMenu(this.scrollY, menu));

window.addEventListener("resize", () => scrollWidth = throttledResize());

document.addEventListener("keydown", (event) => hidePopup(popup, event.key, "Escape"));

popup.addEventListener("click", (e) => hidePopup(popup, e.target, e.currentTarget, "popup_form"));

mesasgePopup.addEventListener("click", (e) => hidePopup(mesasgePopup, e.target, e.currentTarget));

popupOpeners.forEach(btn => {
    btn.addEventListener("click", (e) => {
        payloadForOrdedr = "";

        if (e.target.dataset.popup === "header") {
            payloadForOrdedr = "header block - no order details";
        } else if (e.target.dataset.popup === "timetable") {
            payloadForOrdedr = "timetable block - order details: ";
            e.target.parentNode.childNodes.forEach(node => {
                if (node.nodeName !== "#text") {
                    payloadForOrdedr += `${node.textContent} `;
                }
            })
        } else {
            console.log("Unexpected error");
            return;
        }

        showPopup(popup);
    })
});

inputs.forEach(input => {
    input.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[<>]/ig, "");
    })
})

sendBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target.parentNode);
        const obj = {};
        formData.forEach((value, key) => obj[key] = value);

        const contactsForm = checkContactsForm(e.target.parentNode);

        const errors = checkFormData(obj);
        if (errors.length) {
            if (!contactsForm) noError = false;
            showMessages(errors, mesasgePopup, "popup_message__text");
            return;
        };

        obj.orderDetails = payloadForOrdedr;

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(obj)
        })
        .then(res => {
            if (res.status === 201) {
                console.log(res);
                const messages = ["Повiдомлення успiшно вiдправлено. Наш менеджер зв'яжеться з вами найближчим часом.", "Object Example:", JSON.stringify(obj, null, 2)]
                showMessages(messages, mesasgePopup, "popup_message__text");
                e.target.parentNode.reset();
                if (e.target.parentNode.parentNode.classList.contains("popup_active")) {
                    e.target.parentNode.parentNode.classList.remove("popup_active");
                };
            }
        })
        .catch(err => {
            console.log(err);
            const messages = ["Помилка вiдправки. Спробуйте ще раз.", "Object Example:", JSON.stringify(obj, null, 2)]
            showMessages(messages, mesasgePopup, "popup_message__text");
        })
    });
})


// =======================================================

const throttledHideMenu = throttle(hideMenu, 120);
const throttledResize = throttle(calcScroll, 120);

function hideMenu(scroll, block) {
    return (() => {
        if (scroll > 100 && scroll - this.scrollPrev > 0) {
            block.classList.add("hide");
        } else {
            block.classList.remove("hide");
        }
        this.scrollPrev = scroll;
    })()
}

function showMessages(messages, block, child) {
    const elem = block.querySelector(`.${child}`);
    let str = ``;    
    elem.innerHTML = str;
    if (messages.length) {
        messages.forEach(mes => {
            str += `<p style="margin-bottom: 10px">${mes}</p>`
        })
    }
    elem.innerHTML = str;
    showPopup(block);
}

function showPopup(element) {
    element.classList.add("popup_active");
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollWidth}px`;
    menu.style.paddingRight = `${scrollWidth}px`;
}

function hidePopup(block, element, name, form = null) {
    if (element === name) {
        if (form) document.querySelector(`.${form}`).reset();
        block.classList.remove("popup_active");
        block.classList.add("popup_inactive");
        if (noError) {
            payloadForOrdedr = '';
            document.body.style.overflow = "";
            document.body.style.paddingRight = ``;
            menu.style.paddingRight = ``;
        }
        noError = true;
        setTimeout(() => block.classList.remove("popup_inactive"), 500);
    } 
}

function checkFormData(obj) {
    const errors = [];

    if (!obj || typeof obj !== "object") return errors = ["Unexpected error"];

    const name = String(obj?.name).trim();
    if (!name || name.length < 1 || name.length > 24) errors.push("Довжина iм'я повинна бути вiд 1 до 24 символiв");
  
    const email = checkEmail(obj?.email);
    if(!email) errors.push("Введiть валiдну Email адресу");

    const text = String(obj?.textarea).trim();
    if (!text || text.length < 1 || text.length > 1000) errors.push("Довжина повiдомлення повинна бути вiд 1 до 1000 символiв");

    return errors;
}

function checkEmail(email) {
    const emailPrepared = email.trim();
    const reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

    return reg.test(emailPrepared);
}

function checkContactsForm(elem) {
    if(elem.classList.contains("contacts_form")) {
        payloadForOrdedr = `contacts block - no order details`;
        return true;
    };

    return false;
}

function calcScroll() { 
    let div = document.createElement('div'); 

    div.style.width = '50px'; 
    div.style.height = '50px';
    div.style.overflowY = 'scroll'; 
    div.style.visibility = 'hidden'; 

    document.body.appendChild(div); 
    let scrollWidth = div.offsetWidth - div.clientWidth; 
    div.remove(); 

    return scrollWidth; 
}

function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { 
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); 

    setTimeout(function() {
      isThrottled = false; 
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}