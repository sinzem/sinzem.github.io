const reviewsData = [
    {
        id: 1, 
        photo: "./assets/img/img/img_testimonials_ben_1.jpg", 
        name: "Ben Yardley", 
        linkUrl: "#", 
        linkText: "Київ - Кишинів", 
        date: "1 May 2023", 
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 
        rating: 5
    },
    {
        id: 2, 
        photo: "./assets/img/img/img_testimonials_craig_2.jpg", 
        name: "Craig Martin", 
        linkUrl: "#", 
        linkText: "Львів - Париж", 
        date: "1 May 2023", 
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 
        rating: 4
    },
    {
        id: 3, 
        photo: "./assets/img/img/img_drivers_unknown_2.jpg", 
        name: "Petro Poroshenko",
        linkUrl: "#", 
        linkText: "Львів - Париж", 
        date: "1 May 2023", 
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet", 
        rating: 2
    },
    {
        id: 4, 
        photo: "./assets/img/img/img_testimonials_craig_2.jpg", 
        name: "Craig Martin", 
        linkUrl: "#", 
        linkText: "Львів - Париж", 
        date: "1 May 2023", 
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        rating: 5
    },
    {
        id: 5, 
        photo: "./assets/img/img/img_drivers_Julia_1.jpg", 
        name: "Julia", 
        linkUrl: "#", 
        linkText: "Львів - Париж",
        date: "1 May 2023", 
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 
        rating: 4
    },
    {
        id: 6, 
        photo: "./assets/img/img/img_drivers_unknown_2.jpg", 
        name: "Vladimir Kllichko", 
        linkUrl: "#", 
        linkText: "Львів - Париж", 
        date: "1 May 2023", 
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        rating: 5
    },
    {
        id: 7, 
        photo: "./assets/img/img/img_testimonials_craig_2.jpg", 
        name: "Craig Martin", 
        linkUrl: "#", 
        linkText: "Львів - Париж", 
        date: "1 May 2022", 
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 
        rating: 4
    },
    {
        id: 8, 
        photo: "./assets/img/img/img_drivers_Julia_1.jpg", 
        name: "Julia", 
        linkUrl: "#", 
        linkText: "Львів - Париж", 
        date: "1 April 2023", 
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 
        rating: 3
    },
];


const formAttributes = {
    order: {
        message: "Дякуємо, ми отримали дані Вашого замовлення. Наш менеджер зв'яжеться з Вами найближчим часом.",
        address: "https://jsonplaceholder.typicode.com/posts",
        content: "application/json"
    },
    review: {
        message: "Дякуємо за відгук. Його буде опубліковано найближчим часом.",
        address: "https://jsonplaceholder.typicode.com/posts",
        content: "application/json"
    },
    footer: { 
        message: "Ми прийняли Ваше звернення. Наш менеджер зв'яжеться з Вами через Вашу пошту найближчим часом.",
        address: "https://jsonplaceholder.typicode.com/posts",
        content: "application/json"
    }
};

const errorMessages = {
    email: "Введіть валідну email адресу",
    noDate: "Потрiбно вибрати дату або дати Вашої подорожi.",
    shortName: "Iм'я повинно бути не менше 2 лiтер.",
    sending: "Помилка вiдправки, спробуйте пiзнiше.",
}

const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

