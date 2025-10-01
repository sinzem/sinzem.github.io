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
const monthAndYear = document.querySelector(".calendar_months");
const daysContainer = document.querySelector(".calendar_days");
const daysNamesContainer = document.querySelector(".calendar_day__names");
const prevBtn = document.querySelector(".calendar_prev");
const nextBtn = document.querySelector(".calendar_next");

const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let currentDate = new Date();

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
    const daysInNextMonth = 32 - new Date(year, month + 1, 32).getDate();
    console.log(daysInPrevMonth, daysInNextMonth);

    daysContainer.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += `<div class="clendar_days__hidden"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === new Date().getDate() &&
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear();

        daysContainer.innerHTML += `<div class="${isToday ? "calendar_today" : ''}">${day}</div>`
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