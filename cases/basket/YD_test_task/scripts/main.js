let windowWidth = window.innerWidth; 
let scrollWidth = calcScroll();

// menu===========================================
const menu = document.querySelector(".menu");
const hamburger = document.querySelector(".hamburger");
const menuBack = document.querySelector(".menu_background");
const menuItems = document.querySelectorAll(".menu_link");
const navLinks = document.querySelectorAll(".menu_link");
const authBtns = document.querySelectorAll(".menu_btn");

window.addEventListener("scroll", () => throttledHideMenu(this.scrollY, menu, menuBack));

windowWidth > 991 ? menu.classList.add("active") : null;

const throttledHideMenu = throttle(hideMenu, 120);

function hideMenu(scroll, block) {
    if (windowWidth > 991) {
        return (() => {
            if (scroll > 100 && scroll - this.scrollPrev > 0) {
                block.classList.remove("active");
            } else {
                block.classList.add("active"); 
            }
            this.scrollPrev = scroll;
        })()
    }
}

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (!link.classList.contains("active")) {
            navLinks.forEach(elem => elem.classList.remove("active"));
            link.classList.add("active");
        }
    })
})

authBtns.forEach(link => {
    link.addEventListener("click", () => {
        if (!link.classList.contains("actives")) {
            authBtns.forEach(elem => elem.classList.remove("active"));
            link.classList.add("active");
        }
    })
})

hamburger.addEventListener("click", () => {
    if (hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        showMenu(false);
        blockBody(false);
    } else {
        hamburger.classList.add("active");
        showMenu(true);
        blockBody(true);
    }
});

function showMenu(trigger) {
    if (trigger) {
        menu.classList.add("active");
        menuBack.classList.remove("hide");
    } else {
        menu.classList.remove("active");
        menuBack.classList.add("hide");
    } 
}

// countries======================================
const countries = document.querySelectorAll(".countries_country");
const countriesBtnBlock = document.querySelector(".countries_btn");
const countriesBtn = document.querySelector(".countries_btn button");
const countriesArrow = document.querySelector(".countries_img");

countries.forEach((country, i) => i > 4 ? country.classList.add("hide") : null);

countriesBtnBlock.addEventListener("click", () => {
    if (countriesBtn.textContent !== "Згорнути") {
        countriesBtn.textContent = "Згорнути";
        countriesArrow.classList.add("up");
        countries.forEach((country, i) => {
            if (i > 4) {
                country.classList.remove("hide");
                country.classList.add("show");
            }
        });
    } else {
        countriesBtn.textContent = "Усі країни";
        countriesArrow.classList.remove("up");
        countries.forEach((country, i) => {
            if (i > 4) {
                country.classList.remove("show");
                country.classList.add("hide");
            }
        });
    }
})

// // calendar=======================================
const orderButton = document.querySelector(".calendar_order");
const monthAndYear = document.querySelector(".calendar_months");
const daysContainer = document.querySelector(".calendar_days");
const daysNamesContainer = document.querySelector(".calendar_day__names");
const prevBtn = document.querySelector(".calendar_prev");
const nextBtn = document.querySelector(".calendar_next");

let selectedDays = [];

daysContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("calendar_day")) {
        const checked = (monthAndYear.textContent).split(' ');
        const index = monthNames.findIndex(i => checked[0] === i)
        const checkedDate = String(new Date(+checked[1], index, +e.target.textContent));
        if (!e.target.classList.contains("active")) {
            e.target.classList.add("active");
            selectedDays.push(checkedDate);
        } else {
            e.target.classList.remove("active");
            selectedDays.forEach((date, i) => date === checkedDate ? selectedDays.splice(i, 1) : null);
        }
    }
})

orderButton.addEventListener("click", () => {
    renderCalendar();
})

let currentDate = new Date();
const stringToday = String(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));

const renderDayNames = () => {
    daysNamesContainer.innerHTML = dayNames.map(day => `<div>${day}</div>`).join('');
}

const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthAndYear.textContent = `${monthNames[month]} ${year}`;

    const firstDay = ((new Date(year, month).getDay() + 7) % 7);
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    const daysInPrevMonth = 32 - new Date(year, month - 1, 32).getDate();
    const prevDifferense = daysInPrevMonth - firstDay;
    const firstDayNext = (7 - ((new Date(year, month + 1).getDay() + 7) % 7));

    daysContainer.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += `<div class="calendar_day__hidden">${prevDifferense + i + 1}</div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const stringDate = String(new Date(year, month, day));
        const isToday = stringDate === stringToday;
        const isChecked = selectedDays.includes(stringDate);

        daysContainer.innerHTML += `<div class="${isToday ? "calendar_day calendar_day__today" : 'calendar_day'} ${isChecked ? "active" : ''}">${day}</div>`
    }

    if (firstDayNext > 0 && firstDayNext < 7) {
       for (let i = 0; i < firstDayNext; i++) {
            daysContainer.innerHTML += `<div class="calendar_day__hidden">${i + 1}</div>`;
        } 
    }
}

const changeMonth = (delta) => {
    currentDate.setMonth(currentDate.getMonth() + delta);
    renderCalendar();
}

prevBtn.addEventListener("click", () => changeMonth(-1));
nextBtn.addEventListener("click", () => changeMonth(1));

renderDayNames();
renderCalendar();

// drivers_list================================
const driversList = document.querySelector(".drivers_wrapper");
// const drivers = document.querySelectorAll(".drivers_card");
// const driversBtn = document.querySelector(".drivers_top button");
// driversBtn.children[0].textContent = `${drivers.length}`;
// let isAllDrivers = false;

// drivers.forEach((driver, i) => i > 4 ? driver.classList.add("hidden") : null);

// driversBtn.addEventListener("click", () => {
//     if (!isAllDrivers) {
//         drivers.forEach(driver => {
//             isAllDrivers = true;
//             driver.classList.remove("hidden");
//         });
//     } else {
//          drivers.forEach((driver, i) => {
//             isAllDrivers = false;
//             i > 4 ? driver.classList.add("hidden") : null;
//         });
//     }
// })
    
driversList.addEventListener("mouseenter", () => {
    blockBody(true);
    driversList.addEventListener("wheel", horizontalScroll)
})

driversList.addEventListener("mouseleave", () => {
    blockBody(false);
    driversList.removeEventListener("wheel", horizontalScroll)
})

function horizontalScroll(e) {
    let position = e.deltaY * 0.5;
    driversList.scrollLeft += position;
}
// // reviews=====================================

class Card {
    constructor({id, photo, name, linkUrl, linkText, date, text, rating}, parentSelector) {
        this.id = id;
        this.photo = photo;
        this.name = name;
        this.linkUrl = linkUrl;
        this.linkText = linkText;
        this.date = date;
        this.text = text;
        this.rating = rating;
        this.parent = document.querySelector(parentSelector);
    }

    ratingStars() {
        let stars = '';
        for (let i = 0; i < this.rating; i++) {
            stars += `<img src="./assets/img/icon/png/icon_testimonials_star_1.png" alt="star">`;
        }
        return stars;
    }
 
    render() {
        const element = document.createElement("div"); 
        element.classList.add("reviews_card");

        element.innerHTML = ` 
        <div class="reviews_card__top">
            <div class="reviews_card__img">
                <img src="${this.photo}" alt="client's photo">
            </div>
            <div class="reviews_card__info">
                <h2>${this.name}</h2>
                <a href="${this.linkUrl}">${this.linkText}</a>
                <h4>${this.date}</h4>
            </div>
        </div>
        <div class="reviews_text reviews_card__description">${this.text}</div>
        <div class="reviews_card__stars">${this.ratingStars()}</div>
        `;

        this.parent.append(element); 
    }
}

const reviewsSlider = document.querySelector(".reviews_wrapper");
const reviewLine = document.querySelector(".reviews_line");
const reviewCards = document.getElementsByClassName("reviews_card");
const reviewPagination = document.querySelector(".revievs_pagination");
const reviewDots = document.getElementsByClassName("revievs_pagination__dot");
let reviewDotsArr = Array.from(reviewDots);
let activeDot = 0;

function renderReviews() {
    reviewLine.innerHTML = ``;
    reviewPagination.innerHTML = ``;
    reviewsData.forEach(obj => new Card(obj, ".reviews_line").render());
    for (let i = 0; i < reviewsData.length; i++) {
        reviewPagination.innerHTML += `<div class="revievs_pagination__dot"></div>`;
    }
    reviewDotsArr = Array.from(reviewDots);
    reviewDotsArr.forEach((dot, i) => {
        if (i === activeDot) dot.classList.add("active");
        dot.addEventListener("click", () => {
            if (i !== activeDot) {
                activeDot = i;
                changeSlide();
            }
        })
    });
}

renderReviews();
let lineGap = parseInt(window.getComputedStyle(reviewLine).gap);
let cardWidth = parseInt(window.getComputedStyle(reviewCards[0]).width);

reviewsSlider.addEventListener('touchstart', swipeStart);

function swipeStart(e) {
    positionStart = e.changedTouches[0].clientX;
    reviewsSlider.addEventListener('touchend', swipeEnd);
}

function swipeEnd(e) {
    positionEnd = e.changedTouches[0].clientX;
    reviewsSlider.removeEventListener('touchend', swipeEnd);

    if (positionStart - positionEnd > 100 && activeDot < reviewDotsArr.length - 1) {
        activeDot += 1;
        changeSlide();
    } else if (positionStart - positionEnd < -100 && activeDot >= 1) {
        activeDot -= 1;
        changeSlide();
    } 
}

function changeSlide () {
    reviewLine.style.transform = `translateX(-${activeDot * (cardWidth + lineGap)}px)`;
    Array.from(reviewDots).forEach((pag, j) => 
        j !== activeDot ? pag.classList.remove("active") : pag.classList.add("active")
    )
}

// // forms=======================================
const popups = document.querySelectorAll("[data-popup]");
const forms = document.querySelectorAll("[data-form]");
const orderWrapper = document.querySelector(".order")
const orderBtn = document.querySelector(".calendar_order");
const reviewWrapper = document.querySelector(".review");
const reviewBtn = document.querySelector(".reviews_btn");

let errors = [];
let noError = true;

forms.forEach(form => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        errors = [];
        noError = true;
        const formData = new FormData(e.target);
        const obj = {block: form.dataset.form};
        formData.forEach((value, key) => obj[key] = value);
        
        if (form.dataset.form === "order") obj.selectedDays = selectedDays;
        if (form.dataset.form === "review") {
            obj.id = Math.round(Math.random() * Math.random() * 1e6);
            obj.photo = "./assets/img/img/img_drivers_unknown_2.jpg";
            obj.linkUrl = "#";
            obj.linkText = obj.route; 
        };

        checkForm(obj);
        if (errors.length) {
            if (form.dataset.form !== "footer") noError = false;
            showNotification(errors);
            return;
        }

        const base = formAttributes[form.dataset.form];
        const example = JSON.stringify(obj, null, 2);
        
        fetch(base.address, {
            method: "POST",
            headers: {"Content-type": base.content},
            body: JSON.stringify(obj)
        })
        .then(res => {
            if (res.status === 201) {
                console.log(res);
                if (form.dataset.form === "order") {
                    selectedDays = [];
                    renderCalendar();
                };
                if (form.dataset.form === "review" && reviewsData.length < 12) {
                    reviewsData.unshift(obj);
                    renderReviews();
                }
                
                const messages = [base.message];
                showNotification(messages, example);
                e.target.reset();
                // if (e.target.parentNode.classList.contains("active")) {
                    e.target.parentNode.classList.remove("active");
                // };
            } else {
                console.log(err);
                showNotification([errorMessages.sending], example);
            }
        })
        .catch(err => {
            console.log(err);
            showNotification([errorMessages.sending], example);
        })
        
    })
})

function checkForm (obj) {
    if (obj.email) {
        const isEmail = checkEmail(obj.email);
        !isEmail ? errors.push(errorMessages.email) : null;
    }
    if (obj.name) {
        obj.name.trim().length < 2 ? errors.push(errorMessages.shortName) : null;
    }

    return errors;
}

orderBtn.addEventListener("click", () => {
    if (!selectedDays.length) {
        showNotification([errorMessages.noDate]);
        return;
    }
    orderWrapper.classList.add("active");
    orderWrapper.children[0].reset();
    blockBody(true);
});

reviewBtn.addEventListener("click", () => {
    reviewWrapper.classList.add("active");
    reviewWrapper.children[0].reset();
    blockBody(true);
});

// // notifications===============================
const notificationsBlock = document.querySelector(".notification");

function showNotification(arr, example) {
    notificationsBlock.children[0].innerHTML = ``;
    if (arr) arr.forEach(message => notificationsBlock.children[0].innerHTML += `<p>${message}</p>`);
    if (example) notificationsBlock.children[0].innerHTML += `<br><p>Example:<br>${example}</p>`;
    notificationsBlock.classList.add("active");
    blockBody(true);
}

document.addEventListener("keydown", (e) => {
    popups.forEach(wrapper => {
        hidePopup(wrapper, e.key, "Escape"); 
    })
})

popups.forEach(popup => {
    popup.addEventListener("click", e => {
        hidePopup(popup, e.target, e.currentTarget);
    })
})

function hidePopup(block, element, name) {
    if (element === name) {
        if (block.dataset.popup === "notification" && !noError) {
            block.classList.remove("active");
            noError = true;
            return;
        } 
        block.classList.remove("active");
        blockBody(false);
    } 
}

// // services====================================
const windowResizeTrottled = throttle(windowResize, 120);
window.addEventListener("resize", windowResizeTrottled);

function windowResize() {
    windowWidth = window.innerWidth;
    scrollWidth = calcScroll();
    lineGap = parseInt(window.getComputedStyle(reviewLine).gap);
    cardWidth = parseInt(window.getComputedStyle(reviewCards[0]).width);

    windowWidth > 991 ? showMenu(true) : showMenu(false); 
    hamburger.classList.remove("active");
    blockBody(false);
} 


function blockBody(trigger) {
    if (trigger) {
        document.body.style.paddingRight = `${scrollWidth}px`;
        document.body.style.overflow = `hidden`;
        if (windowWidth > 991) menu.style.paddingRight = `${scrollWidth}px`;
    } else {
        document.body.style.paddingRight = ``;
        document.body.style.overflow = ``;
        if (windowWidth > 991) menu.style.paddingRight = ``;
    }
}

function checkEmail(email) {
    const emailPrepared = email.trim();
    const reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    
    return reg.test(emailPrepared);
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



