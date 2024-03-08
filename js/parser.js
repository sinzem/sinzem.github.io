'use srtict';

/* (Если в браузере на странице выделить нужный элемент, в консоли браузера прописать console.dir($0) - в консоль выпадет вся инф об элементе) */

window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector("body");
    let textNodes = [];
 
    function recursy (element) {
        element.childNodes.forEach(node => {
            // -----------------
            // if (element.childNodes.length > 1) {    /* (Рекурсивная Ф для получения всех элементов из body - перебирает дочерние элементы body, если длинна полученного элемента больше 1, запускает перебор самого элемента.) */
            //     recursy(node);
            // }
            // --------------------
            // if (node.nodeName === "#text") { /* (такое условие выведет только текстовые ноды(нодНейм можно узнать в console.dir)) */
            //     return;
            // } else {
            //     recursy(node);
            //     console.log(node);/*  (выдаст уже без текстовых нод) */
            // }
            // ---------------------
            if (node.nodeName.match(/^H\d/)) { /* (в условии задаем регулярное выражение(match) - /^(обозначает, что это начало строки)H(обозначение заголовка)\d(обозначает, что далее идет какое-то число - уровень заголовка)/) */
                // console.log(node); /* (выведет только заголовки заданного порядка) */
                const obj = { /* (создаем обьекты из полученных нод - выведем порядок заголовка и текст) */
                    header: node.nodeName,
                    content: node.textContent
                };
                textNodes.push(obj); /* (поместим обьекты полученных элементов в массив) */
            } else {
                recursy(node);
            }
        });
    }

    recursy(body);

    fetch("https://jsonplaceholder.typicode.com/posts", { /* (через фетч отправляем инф на сервер) */
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(textNodes) /* (переводим в json) */
    })
    .then(response => response.json()) 
    /* .then(json => console.log(json)) */; /* (в случае успеха ответ переводим в js и выведем в консоль) */
});

