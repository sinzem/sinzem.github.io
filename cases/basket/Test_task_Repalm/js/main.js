window.addEventListener("DOMContentLoaded", () => {
    const productsJson = "../assets/json/db.json";
    const hamburger = document.querySelector(".hamburger");
    let scrollWidth = calcScroll();

    window.addEventListener("resize", () => scrollWidth = calcScroll());

    hamburger.addEventListener("click", () => {
        if (document.body.classList.contains("active")) {
            document.body.classList.remove("active");
            document.body.style.paddingRight = ``;
        } else {
            document.body.classList.add("active");
            document.body.style.paddingRight = `${scrollWidth}px`;
        }
    });

    buildProductList();

    async function buildProductList() {
        const arr = await getProducts(productsJson);
        arr.forEach(item => new ProductCard(item, "card", ".cards").render());
    
        const favorites = document.querySelectorAll(".card_favorites");
    
        favorites.forEach(favorite => {
            favorite.addEventListener("click", (e) => {
                if (e.currentTarget.classList.contains("favorite")) {
                    e.currentTarget.classList.remove("favorite");
                } else {
                    e.currentTarget.classList.add("favorite");
                } 
            })
        })
    }
})



async function getProducts(url) {
    return await fetch(url).then(data => data.json()).then(data => data.products);
}

class ProductCard {
    constructor(obj, selector, parentSelector) {
        this.id = obj.id;
        this.img = obj.img;
        this.name = obj.name;
        this.price = obj.price;
        this.oldPrice = obj.oldPrice;
        this.description = obj.description;
        this.selector = selector;
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        const element = document.createElement("div"); 
        element.classList.add(`${this.selector}`);

        element.innerHTML = ` 
             <div class="${this.selector}_img">
                <img src="./assets/img/${this.img}" alt="${this.name}">
            </div>
            <div class="${this.selector}_name" title="${this.name}">
                ${this.name}
            </div>
            <div class="${this.selector}_description" title="${this.description}">
                ${this.description}
            </div>
            <div class="${this.selector}_prices">
                <div class="${this.selector}_price__old">${this.oldPrice}&#8372;</div>
                <div class="${this.selector}_price__difference">${this.price - this.oldPrice}&#8372;</div>
                <div class="${this.selector}_price">${this.price}&#8372;</div>
            </div>
            <div class="${this.selector}_footer">
                <button class="btn ${this.selector}_btn">To Basket</button>
                <div class="${this.selector}_favorites">
                    <img src="./assets/icon/icons8-сердце-50.png" alt="favorites"> 
                </div>
            </div>
        `;
        
        this.parent.append(element); 
    }
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