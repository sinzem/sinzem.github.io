// menu===========================================
const menu = document.querySelector(".menu");
const menuBack = document.querySelector(".menu_background");
const menuItems = document.querySelectorAll(".menu_link");
const navLinks = document.querySelectorAll(".menu_link");
const authBtns = document.querySelectorAll(".menu_btn");

window.addEventListener("scroll", () => throttledHideMenu(this.scrollY, menu, menuBack));

const throttledHideMenu = throttle(hideMenu, 120);

function hideMenu(scroll, block, back) {
    return (() => {
        if (scroll > 100 && scroll - this.scrollPrev > 0) {
            block.classList.add("hide");
        } else {
            block.classList.remove("hide");
            (scroll > 100) ? back.classList.remove("hide") : back.classList.add("hide"); 
        }
        this.scrollPrev = scroll;
    })()
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

// calendar=======================================
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
    console.log(selectedDays);
    selectedDays = [];
    renderCalendar();
})

const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

const drivers = document.querySelectorAll(".drivers_card");
const driversBtn = document.querySelector(".drivers_top button");
driversBtn.children[0].textContent = `${drivers.length}`;
let isAllDrivers = false;

drivers.forEach((driver, i) => i > 4 ? driver.classList.add("hidden") : null);

driversBtn.addEventListener("click", () => {
    if (!isAllDrivers) {
        drivers.forEach(driver => {
            isAllDrivers = true;
            driver.classList.remove("hidden");
        });
    } else {
         drivers.forEach((driver, i) => {
            isAllDrivers = false;
            i > 4 ? driver.classList.add("hidden") : null;
        });
    }
})

// reviews=====================================

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

const reviewLine = document.querySelector(".reviews_line");
const reviewCards = document.getElementsByClassName("reviews_card");
const reviewPagination = document.querySelector(".revievs_pagination");
const reviewDots = document.getElementsByClassName("revievs_pagination__dot");
let activeDot = 0;

reviewsData.forEach(obj => new Card(obj, ".reviews_line").render());
let lineGap = parseInt(window.getComputedStyle(reviewLine).gap);
let cardWidth = parseInt(window.getComputedStyle(reviewCards[0]).width);

for (let i = 0; i < reviewCards.length; i++) {
    reviewPagination.innerHTML += `<div class="revievs_pagination__dot"></div>`;
}

const reviewDotsArr = Array.from(reviewDots);
reviewDotsArr.forEach((dot, i) => {
    if (i === activeDot) dot.classList.add("active");
    dot.addEventListener("click", () => {
        if (i !== activeDot) {
            activeDot = i;
            reviewLine.style.transform = `translateX(-${activeDot * (cardWidth + lineGap)}px)`;
            reviewDotsArr.forEach((pag, j) => 
                j !== i ? pag.classList.remove("active") : pag.classList.add("active")
            )
        }
    })
});

// services====================================

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



