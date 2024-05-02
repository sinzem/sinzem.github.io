window.addEventListener("DOMContentLoaded", () => {

    const scroll = calcScroll();
    
    // ---for headerDropMenu---
    
    const menu = document.querySelector(".header__menu");
    const menuItem = menu.querySelectorAll(".header__menu__item");
    const changeLang = menu.querySelector(".header__menu__item_lang");
    const changeLangItems = changeLang.querySelectorAll(".lang__change__item");
    const langChangeDividers = menu.querySelectorAll(".lang__change__divider");

    menu.addEventListener("mouseover", () => {
        menu.classList.add("active");
        menuItem.forEach(item => {
            item.classList.add("active");
        })
    })

    menu.addEventListener("mouseout", () => {
        menu.classList.remove("active");
        menuItem.forEach(item => {
            item.classList.remove("active");
        })
    })

    changeLang.addEventListener("mouseover", () => {
        langChangeDividers.forEach(item => {
            item.classList.add("active");
        })
        changeLangItems.forEach(item => {
            item.classList.add("active");
        })
    })

    changeLang.addEventListener("mouseout", () => {
        langChangeDividers.forEach(item => {
            item.classList.remove("active");
        })
        changeLangItems.forEach(item => {
            item.classList.remove("active");
        })
    })

    // ---for light theme---

    const theme = document.querySelector(".header__menu__item_theme");
    const root = document.querySelector(":root");
    
    localStorage.getItem("theme") == "light" ? root.classList.add("light") : null;

    theme.addEventListener("click", (e) => {
        // e.preventDefault();
        if (!root.classList.contains("light")) {
            root.classList.add("light");
            localStorage.setItem("theme", "light");
        } else {
            root.classList.remove("light");
            localStorage.removeItem("theme");
        }
    })

    // ---for slider---

    const sliderWrap = document.querySelector(".skills__slider__wrap");
    const slides = sliderWrap.children;
    const buttonNext = document.querySelector(".skills__btn_next");

    slides[0].classList.add("active");
    buttonNext.addEventListener("click", (e) => {
        e.target.disabled = true;
        slides[0].classList.remove("active");
        setTimeout(() => { 
            sliderWrap.appendChild(slides[0]);
            slides[0].classList.add("active");
            e.target.disabled = false;
        }, 250);    
    })

    // ---for scrollTo---

    const moveToBtns = document.querySelectorAll('[href^="#"]');

    moveToBtns.forEach(btn => {
        btn.addEventListener("click", function(event) {
            event.preventDefault();

            let hash = this.hash;
            let toBlock = document.querySelector(hash).getBoundingClientRect().top;
            let start = document.documentElement.scrollTop;

            setTimeout(function to() {
                start += 25;
                document.documentElement.scrollTo(0, start); 
                if (start < toBlock) {
                    requestAnimationFrame(setTimeout(to, 4));
                } else {
                    location.hash = hash;
                }
            }, 4)
        })
    })

    // ---for scale in cases---

    const cases = document.querySelectorAll(".cases__item");
    const offset = document.querySelector(".offset").offsetTop;

    window.addEventListener("scroll", () => {
        cases.forEach((item) => {
            if (item.getBoundingClientRect().top <= offset &&
             item.getBoundingClientRect().bottom >= offset) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        })
    })

    // ---for form---

    const form = document.querySelector(".footer__form");
    const name = document.querySelector("#name");
    const messageModal = document.querySelector(".send-modal");
    const closeModal = document.querySelector(".send-modal__close");
    const modalLoading = document.querySelector(".send-modal__loading");
    const modalSuccess = document.querySelector(".send-modal__success");
    const modalFailure = document.querySelector(".send-modal__failure");
    const modalGit = document.querySelector(".send-modal__sorry-git")
    const modalSend = document.querySelector(".send-modal__send");
    const twoVal = modalSend.textContent.slice(7, 11);
    const oneVal = "dagj";


    name.addEventListener("input", () => {
        name.value = name.value.replace(/^[^а-яёa-z0-9]/i, "");
    })

   form.addEventListener("submit", (e) => {
        e.preventDefault();
        messageModal.classList.add("active");
        modalLoading.classList.add("active");
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scroll}px`;

        const formData = new FormData(form);
        const object = {begin: oneVal, ending: twoVal};
        formData.forEach(function(value, key) {
            object[key] = value;
        });
        fetch("mailer/smart.php", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(object)
        })
        .then((e) => { 
            if (e.status === 200) {
                modalLoading.classList.remove("active");
                modalFailure.classList.remove("active");
                modalGit.classList.remove("active");
                modalSuccess.classList.add("active");
            } else {
                console.log(e);
                modalLoading.classList.remove("active");
                modalFailure.classList.remove("active");
                modalSuccess.classList.remove("active");
                modalGit.classList.add("active");
            }
        })
        .catch((e) => {
            console.log(e);
            modalLoading.classList.remove("active");
            modalSuccess.classList.remove("active");
            modalGit.classList.remove("active");
            modalFailure.classList.add("active");
        }).finally(() => { 
                setTimeout(() => {
                    modalLoading.classList.contains("active") ?  modalLoading.classList.remove("active") : null;
                    modalSuccess.classList.contains("active") ?  modalSuccess.classList.remove("active") : null;
                    modalFailure.classList.contains("active") ?  modalFailure.classList.remove("active") : null;
                    modalGit.classList.contains("active") ?  modalGit.classList.remove("active") : null;
                    messageModal.classList.remove("active");
                    document.body.style.overflow = "";
                    document.body.style.paddingRight = `0px`;
                }, 5000)
                form.reset();
            });
    })

    closeModal.addEventListener("click", () => {
        messageModal.classList.remove("active");
        document.body.style.overflow = "";
        document.body.style.paddingRight = `0px`;
    })

    messageModal.addEventListener('click', (e) => {   
        if (e.target === messageModal) { 
            messageModal.classList.remove("active");
            document.body.style.overflow = "";
            document.body.style.paddingRight = `0px`;
        }
    });

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

})