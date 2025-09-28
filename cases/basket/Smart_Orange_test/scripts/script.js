// slider=======================
const slider = document.querySelector(".header_slider");
const sliderLine = slider.querySelector(".header_slider__line");
const slides = slider.querySelectorAll(".header_slide");
const prev = document.querySelector(".header_arrow__prev");
const next = document.querySelector(".header_arrow__next");
const paginationBlock = document.querySelector(".pagination_dots");
const paginationDots = document.getElementsByClassName("pagination_dot");
const paginationEnd = document.querySelector(".header_pagination__end img");

let slideIndex = 0;

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("pagination_dot");
    if (i === slideIndex) dot.classList.add("active");
    paginationBlock.append(dot);
}

if (slideIndex === 0) prev.disabled = "true";
prev.addEventListener("click", () => {
    slideIndex -= 1;
    moveSliderLine();
})

next.addEventListener("click", () => {
    slideIndex += 1;
    moveSliderLine();
   
})

Array.from(paginationDots).forEach((dot, i) => {
    dot.addEventListener("click", () => {
        if (i !== slideIndex) {
            slideIndex = i;
            moveSliderLine();
        }
    })
})

function moveSliderLine() {
    prev.disabled = slideIndex === 0 ? true : false;
    next.disabled = slideIndex === slides.length - 1 ? true : false;
    Array.from(paginationDots).forEach((dot, i) => {
        i === slideIndex ? dot.classList.add("active") : dot.classList.remove("active");
    })
    sliderLine.style.transform = `translatex(-${(100 / slides.length) * slideIndex}%)`;
    paginationEnd.style.transform = `rotate(${slideIndex*90}deg)`
}

// list_filter====================
const cards = document.getElementsByClassName("list_card");
const filter = document.querySelector(".list_filter");
const filterBtns = document.querySelectorAll(".list_btn");

filter.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON" && !e.target.classList.contains("active")) {
        filterBtns.forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        Array.from(cards).forEach(card => {
            if (e.target.dataset.list === "all") {
                card.style.display = "block";
            } else {
                e.target.dataset.list === card.dataset.card ?
                    card.style.display = "block" : 
                    card.style.display = "none";
            }
        })
    }
})

const buildedObj = [
    {
        id: 1,
        year: "2025р.",
        dataType: "residential",
        type: "житловий",
        img: "crystal_palace.png",
        description: "Реконструкція санаторію «Кришталевий Палац»",
        address: "Київ, вул. Шевченка, 1",
        workTypes: ["Підготовчі", "Земляні", "Бетонні", "Мурувальні", "Монтажні", "Покрівельні", "Оздоблювальні", "Реконструкція"]
    },
    {
        id: 2,
        year: "2023p.",
        dataType: "sports",
        type: "спотивний",
        img: "stadium.jpg",
        description: "Будiвництво стадIону SmartOrange",
        address: "Київ, вул. Шевченка, 3",
        workTypes: ["Підготовчі", "Земляні", "Бетонні", "Мурувальні", "Монтажні", "Покрівельні", "Оздоблювальні", "Реконструкція", "Iнженернi мережi"]
    },
    {
        id: 3,
        year: "2022p.",
        dataType: "public",
        type: "громадський",
        img: "railway_workers.png",
        description: "Реконструкція будинку науки i творчостi Київської залізниці (Палац Залiзничникiв)",
        address: "Київ, вул. Шевченка, 2",
        workTypes: ["Реконструкція", "Iнженернi мережi"]
    },
];

class Card {
    constructor({id, year, dataType, type, img, description, address, workTypes}, parentSelector) {
        this.id = id;
        this.year = year;
        this.dataType = dataType;
        this.type = type;
        this.img = img;
        this.description = description;
        this.address = address;
        this.workTypes = workTypes;
        this.parent = document.querySelector(parentSelector);
    }

    workTypesButtons() {
        let buttons = '';
        this.workTypes.forEach(type => buttons += `<button class="btn_card list_card__type">${type}</button>`);
        return buttons;
    }
 
    render() {
        const element = document.createElement("div"); 
        element.classList.add("list_card");
        element.dataset.card = this.dataType;

        element.innerHTML = ` 
            <div class="list_card__pin">
                <img src="./assets/icons/Pin.png" alt="pin">
            </div>
            <div class="list_card__top">
                <h4>${this.year}</h4>
                <button data-type=${this.dataType} class="btn_card list_card__btn">${this.type}</button>
            </div>
            <div class="list_card__picture">
                <img src="./assets/img/${this.img}" alt="Big house">
            </div>
            <h3 class="list_card__title">${this.description}</h3>
            <h4 class="list_card__address">${this.address}</h4>
            <div class="list_card__types">
                <h4>Види робіт:</h4>
                <div class="list_card__btns">
                    ${this.workTypesButtons()}
                </div>
            </div>
        `;

        this.parent.append(element); 
    }
}

buildedObj.forEach(obj => new Card(obj, ".list_cards").render());



