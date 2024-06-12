window.addEventListener("DOMContentLoaded", () => {
    // For modals
    const menuItems = document.querySelectorAll(".aside__menu > ul > li");
    const modals = document.querySelectorAll(".modal");
    const aside = document.querySelector(".aside");
    const asideOpener = document.querySelector(".aside__opener");

    menuItems[0].classList.add("active");
    modals[0].classList.add("active");

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(li => {
                li.classList.remove("active");
            })
            item.classList.add("active");
            let modalActive = item.dataset.modal;
            modals.forEach(modal => {
                modal.classList.remove("active");
                if (modal.classList.contains(`${modalActive}`)) modal.classList.add("active");
            })
        })
    })

    asideOpener.addEventListener("click", () => {
        asideOpener.classList.contains("active") ? asideOpener.classList.remove("active") : asideOpener.classList.add("active");
        aside.classList.contains("active") ? aside.classList.remove("active") : aside.classList.add("active");
    })

    // For customers__block
    const customersWrapper = document.querySelector(".customers__wrapper");
    const calculateStart = document.querySelector(".customers__calculate_start");
    const calculateEnd = document.querySelector(".customers__calculate_end");
    const calculateTotal = document.querySelector(".customers__calculate_total");
    const prev = document.querySelector(".customers__pagination_prev");
    const next = document.querySelector(".customers__pagination_next");
    const paginationPages = document.querySelector('.customers__pagination_pages');

    const customers = () => fetch("customers.json")
        .then(response => response.json())
        .catch(error => console.log(error));
    
    let offset = 0;
    let limit = 8;
    let offsetMax = offset + limit;
    let customersTotal = 0;
    let pageTotal = 0;
    let customersBlock = [];

    if (offset === 0) {
        prev.style.opacity = ".5";
    }

    prev.addEventListener("click", () => {
        next.style.opacity = "1";
        offset <= 0 ? offset = 0 : offset -= limit;
        offset < 8 ? prev.style.opacity = ".5" : prev.style.opacity = "1";
        offsetMax <= limit ? offsetMax = limit : offsetMax -= limit;
        buildCustomersBlock();
        showPagesStatistic();
    });

    next.addEventListener("click", () => {
        prev.style.opacity = "1";
        offset < customersTotal - limit ? offset += limit : offset = offset;
        offset >= customersTotal - limit ? next.style.opacity = ".5" : next.style.opacity = "1";
        offsetMax < customersTotal ? offsetMax += limit : offsetMax = offsetMax;
        buildCustomersBlock();
        showPagesStatistic();
    });


    async function getCustomers() {
        let customersArray = await customers();
        customersBlock = [];
        await customersArray.customers.forEach((i, k) => {
            if (k >= offset && k < offsetMax) customersBlock.push(i);
        })

        customersTotal = customersArray.customers.length;
        calculateTotal.textContent = `${customersTotal}`;
        if (customersTotal % limit === 0) {
            pageTotal = customersTotal / limit;
        } else {
            pageTotal = Math.floor(customersTotal / limit + 1);
        }

        showPaginationPages();
        
        return customersBlock;
    }

    async function buildCustomersBlock() {
        let customersBlock = await getCustomers(); 
        customersWrapper.innerHTML = "";
        customersBlock.forEach(({id, name, company, phone, email, country, status}) => {
            new CustomerCard(id, name, company, phone, email, country, status, ".customers__wrapper").render();
        })
    }
    
    buildCustomersBlock();

    async function showPagesStatistic() {
        calculateStart.textContent = `${offset + 1}`;
        calculateEnd.textContent = `${offsetMax}`;
    }

    showPagesStatistic();

    async function showPaginationPages() {
        let paginationBlock = [];
        let skipBlockLeft = [];
        let skipBlockRight = [];
        paginationPages.innerHTML = "";
        for (let i = 1; i <= pageTotal; i++) {
            if (i === 1 || i === pageTotal ||  
                i < 7 && offsetMax / limit < i + 3 ||
                i > pageTotal - 6 && offsetMax / limit > pageTotal - 3 ||
                i < offsetMax / limit + 3 && i > offsetMax / limit - 3
            ) {
                const element = document.createElement("button");
                element.textContent = `${i}`;
                element.classList.add("customers__pagination_page");
                element.classList.add("customers__pagination_button");
                if (offsetMax / limit === i) element.classList.add("active");
                paginationPages.append(element);
                paginationBlock.push(element);
            } else {
                i < offsetMax / limit ? skipBlockLeft.push(i) : skipBlockRight.push(i)
            }
        }
        const skipLeft = document.createElement("div");
        skipLeft.textContent = `..`;
        skipLeft.classList.add("skip");
        const skipRight = document.createElement("div");
        skipRight.textContent = `..`;
        skipRight.classList.add("skip");
        
        skipBlockLeft.length > 0 ? paginationBlock[0].after(skipLeft) : null;
        skipBlockRight.length > 0 ? paginationBlock[paginationBlock.length - 1].before(skipRight) : null;
        
        paginationBlock.forEach(block => {
            block.addEventListener("click", (e) => {
                offset = e.target.textContent * limit - limit;
                offsetMax = e.target.textContent * limit;
                buildCustomersBlock();
                showPagesStatistic();
            })
        })
    }
    
    class CustomerCard { 
        constructor(id, name, company, phone, email, country, status, parentSelector) { 
            this.id = id;
            this.name = name;
            this.company = company;
            this.phone = phone;
            this.email = email;
            this.country = country;
            this.status = status;
            this.parent = document.querySelector(parentSelector);
        }

        render() { 
            const element = document.createElement("div"); 
            element.innerHTML = ` 
                <div class="customres__grid customres__card">
                    <div class="customers__name customers__name__card">${this.name}</div>
                    <div class="customers__company customers__company__card">${this.company}</div>
                    <div class="customers__phone customers__phone__card">${this.phone}</div>
                    <div class="customers__email customers__email__card">${this.email}</div>
                    <div class="customers__country customers__country__card">${this.country}</div>
                    <div class="customers__status customers__status__card customers__status__card_${this.status}">${this.status}</div>
                </div>
                <div class="customers__line"></div>
            `;
            this.parent.append(element); 
        }
    } 
})