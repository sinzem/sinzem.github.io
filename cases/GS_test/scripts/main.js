let windowWidth = window.innerWidth;
let scrollWidth = calcScroll(); 

fetch('db.json')
    .then((res) => res.json())
    .then((data) => {
        renderFormats(data);
        timers.forEach(timer => setClock(timer, data.deadline.date));
        setPromotionPeriod(data.promotion);
    })
    .catch((e) => console.log(e));

// menu===========================================
const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu_btn");
const menuItems = document.querySelectorAll("[data-menu]");
const observedSections = document.querySelectorAll("[data-section]");
const hamburger = document.querySelector(".hamburger");

if (windowWidth > 991) menu.classList.add("active");

class HideMenu {
    scrollPrev = 0;
    constructor() {}

    hider(scroll, block, width) {
        if (width > 991) {
            return (() => {
                scroll > 100 && scroll - this.scrollPrev > 0 
                    ? block.classList.remove("active")
                    : block.classList.add("active"); 
               
                this.scrollPrev = scroll;
            })()
        }
    }
}

const throttledHideMenu = throttle(new HideMenu().hider, 120);
window.addEventListener("scroll", () => throttledHideMenu(this.scrollY, menu, windowWidth));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            menuItems.forEach(item => {
                item.dataset.menu === entry.target.dataset.section
                    ? item.classList.add("active")
                    : item.classList.remove("active");
            })
            entry.target.dataset.section === "format" ? menuBtn.classList.add("active") : null;
        } else {
            menuItems.forEach(item => {
                if (item.dataset.menu === entry.target.dataset.section) item.classList.remove("active");
                menuBtn.classList.remove("active");
            })
        }
    });
}, {
    rootMargin: `-50% 0px -49% 0px`,
    threshold: 0,
});

observedSections.forEach(section => observer.observe(section));

hamburger.addEventListener("click", () => {
    if (hamburger.classList.contains("active")) {
        hideMenu()
    } else {
        hamburger.classList.add("active");
        showMenu(true);
        blockBody(true);
    }
});

menuBtn.addEventListener("click", () => windowWidth < 992 ? hideMenu() : null);

menuItems.forEach(item => item.addEventListener("click", () => windowWidth < 992 ? hideMenu() : null));

// speakers=========================================
const speakers = document.querySelectorAll(".header_grid__speakers div");

speakers.forEach((speaker, i) => {
    speaker.addEventListener("pointerover", () => {
        speakers.forEach((item, j) => i !== j ? item.style.opacity = '0' : null);
    });
    speaker.addEventListener("pointerout", () => {
        speakers.forEach(item => item.style.opacity = '1');
    });
})

// courses_block====================================
const courses = document.querySelectorAll(".course_module");
const coursesBtns = document.querySelectorAll(".course_module__btn"); 
const lessonBlocks = document.querySelectorAll(".course_lessons");
const lessonAbouts = document.querySelectorAll("[data-about]");

coursesBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => { 
        if (!courses[i].classList.contains("active")) {
            courses[i].classList.add("active");
            btn.innerHTML = "Менше";
        } else {
            courses[i].classList.remove("active");
            btn.innerHTML = "Бiльше";
        }
    })
});

lessonBlocks.forEach(block => {
    block.addEventListener("click", (e) => {
        if (e.target.nodeName === "BUTTON" && !e.target.parentElement.classList.contains("active")) {
            block.querySelectorAll(".course_lessons__item").forEach(item => item.classList.remove("active"));
            e.target.parentElement.classList.add("active");
            block.parentElement.querySelectorAll(".course_lessons__about").forEach(about => {
            about.dataset.about === e.target.dataset.lesson 
                ? about.classList.add("active")
                : about.classList.remove("active");
            })
        }
    })
});

// promotion_period=================================

const dateBlock = document.querySelector(".payments_center__date");

function setPromotionPeriod(obj) {
    const date = new Date(Date.now() + (1000 * 60 * 60 * 24 * +obj.duration));
    dateBlock.innerHTML = `<span>${date.getDate()}</span><br>${obj.months[date.getMonth()]}`;
}

// format-block=====================================
const formatBlock = document.querySelector(".format_container");
const formatHeaders = document.querySelectorAll(".format_grid__plan");
const rows = document.querySelector(".format_grid__rows");
const prices = document.querySelectorAll(".format_price");
let start = 0;

formatBlock.addEventListener("mousedown", (e) => {
    if (e.target.nodeName !== "BUTTON" && windowWidth < 992) {
        formatBlock.style.scrollBehavior = "auto";
        formatBlock.style.cursor = "grabbing";
        start = e.clientX;
        formatBlock.addEventListener("mousemove", throttleMoveFormatBlock);
    }  
});

formatBlock.addEventListener("mouseup", () => {
    if (windowWidth < 992) {
        formatBlock.style.scrollBehavior = "smooth";
        formatBlock.style.cursor = "grab";
        formatBlock.removeEventListener("mousemove", throttleMoveFormatBlock);
    }
});

formatBlock.addEventListener("mouseleave", () => {
    if (windowWidth < 992) {
        formatBlock.style.scrollBehavior = "smooth";
        formatBlock.style.cursor = "grab";
        formatBlock.removeEventListener("mousemove", throttleMoveFormatBlock);
    }
});

const throttleMoveFormatBlock = throttle(moveFormatBlock, 60)

function moveFormatBlock(e) {
    let move = e.clientX - start;
    formatBlock.scrollLeft -= move * 0.1;
};

function renderFormats(obj) {
    formatHeaders.forEach((header, i) => {
        if (obj.formats[i].hit) header.classList.add("format_column__hit");
        header.classList.add(`format_grid__${obj.formats[i].color}`);
        header.innerHTML = headerBuilder(obj.formats[i]);
    });
    obj.valuesTitle.forEach(value => {
        rows.innerHTML += rowBuilder(value, obj.formats);
    });
    prices.forEach((price, i) => {
        if (obj.formats[i].hit) price.classList.add("format_column__hit");
        price.classList.add(`format_price__${obj.formats[i].color}`);
        price.innerHTML = priceBuilder(obj.formats[i], obj.deadline);
    });
}

function headerBuilder(obj) {
    return (`
        <div class="format_grid__best" style="display: ${obj.hit ? "block" : "none"}">
            <img src="./assets/png/hit_line.png" alt="pink ribbon">
            <h4>Хіт продажів</h4>
        </div>
        <div class="format_grid__bonus">
            <div></div>
            <h4>+ Bonus</h4>
        </div>
        <h3 ${obj.hit && `style='font-size: ${obj.titleSize}px'`}>${obj.name}</h3>
        <h5>Бонуси уточнюйте у менеджера</h5>
    `)
}

function rowBuilder(description, obj) {
    return (`
        <div class="format_grid__row">
            <div class="format_column__first format_grid__description">
                <h4>${description.title}</h4>
                <div class="format_grid__info">
                    <img src="./assets/png/info.png" alt="info">
                    <div class="format_grid__hint">
                        <div class="format_grid__hint-top"></div>
                        <ul>
                            ${hintsBuilder(description.hints)}
                        </ul>
                    </div>
                </div>
            </div>
            ${cageBuilder(description.id, 0, obj)}
            ${cageBuilder(description.id, 1, obj)}
            ${cageBuilder(description.id, 2, obj)}
        </div>    
    `)
}

function hintsBuilder(obj) {
    let ul = "";
    obj.forEach(hint => ul +=`<li>${hint}</li>`)
    return ul;
}

function cageBuilder(rowIndex, cageIndex, obj) {
    const imgForTrue = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 0C6.28009 0 0 6.28009 0 14C0 21.7199 6.28009 28 14 28C21.7199 28 28 21.7199 28 14C28 6.28009 21.7199 0 14 0ZM21.0957 11.0332L13.5123 18.6164C13.2848 18.8439 12.9861 18.9584 12.6875 18.9584C12.3889 18.9584 12.0902 18.8439 11.8627 18.6164L8.07111 14.8248C7.61481 14.3687 7.61481 13.6313 8.07111 13.1752C8.52719 12.7189 9.2644 12.7189 9.7207 13.1752L12.6875 16.142L19.4461 9.38361C19.9022 8.92731 20.6394 8.92731 21.0957 9.38361C21.5518 9.83969 21.5518 10.5769 21.0957 11.0332Z" fill="#FEA800"/></svg>`;
    const value = obj[cageIndex].valuesForId[rowIndex - 1][1];

    return (`
        <div class="format_column__second format_grid__cage format_grid__cage-${obj[cageIndex].color} ${obj[cageIndex].hit && "format_column__hit"}">
            ${typeof value === "string" ? value  : value === true ? imgForTrue: "&mdash;"}
        </div>    
    `)
}

function priceBuilder(obj, deadline) {
    const timeDifference = Math.floor((new Date() - new Date(deadline.date)) / (1000 * 60 * 60 * 24));
    const timeIndex = timeDifference < 0 
        ? 0 : Math.ceil(timeDifference / +deadline.periodDays) < +deadline.maxDifference 
        ? Math.ceil(timeDifference / +deadline.periodDays) : +deadline.maxDifference;
    const newPrice = (+(obj.newPrice.replace(/\D/g, '')) + timeIndex * 1000).toLocaleString();
    
    return (`
        <h4 class="format_price__old">${obj.oldPrice} грн</h4>
        <h2 class="format_price__new"><span>${newPrice}</span> грн</h2>
        <button data-order=${obj.name} class="btn format_price__btn">Залишити заявку</button>
        <h6 class="format_price__quantity">Залишилось місць <span>${obj.remainingQuantity}</span> з ${obj.totalQuantity}</h6>  
    `)
}

// timer=============================================
const timers = document.querySelectorAll(".clock_body"); 

function getTimeRemaining(endtime) { 
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) { 
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 *24)); 
        hours = Math.floor((t / (1000 * 60 * 60) % 24)); 
        minutes = Math.floor((t / 1000 / 60) % 60); 
        seconds = Math.floor((t / 1000) % 60); 
    }

    return {total: t, days, hours, minutes, seconds}; 
}

function getZero(num) { 
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock(timer, endtime) { 
    const days = timer.querySelector(".clock_days h2");
    const hours = timer.querySelector(".clock_hours h2");
    const minutes = timer.querySelector(".clock_minutes h2");
    const seconds = timer.querySelector(".clock_seconds h2");
    const timeInterval = setInterval(updateClock, 1000);

    updateClock(); 

    function updateClock() { 
        const t = getTimeRemaining(endtime); 

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds); 

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

// services==========================================
const windowResizeTrottled = throttle(windowResize, 120);
window.addEventListener("resize", windowResizeTrottled);

function windowResize() {
    windowWidth = window.innerWidth;
    scrollWidth = calcScroll();

    windowWidth > 991 ? showMenu(true) : showMenu(false); 
    hamburger.classList.remove("active");
    blockBody(false);
} 

function hideMenu() {
    hamburger.classList.remove("active");
    showMenu(false);
    blockBody(false);
}

function showMenu(trigger) {
    trigger ? menu.classList.add("active") : menu.classList.remove("active");  
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


