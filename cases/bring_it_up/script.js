/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js":
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Difference)
/* harmony export */ });
class Difference {
  /* (этот класс тоже дает ошибку при получении дочерних элементов из аргументов, поэтому помещаем в try/catch конструктор и init()) */
  constructor(oldOfficer, newOfficer, items) {
    try {
      this.oldOfficer = document.querySelector(oldOfficer);
      this.newOfficer = document.querySelector(newOfficer);
      this.oldItems = this.oldOfficer.querySelectorAll(items);
      this.newItems = this.newOfficer.querySelectorAll(items);
      this.oldCounter = 0;
      this.newCounter = 0;
    } catch (e) {}
  }
  bindTriggers(container, items, counter) {
    container.querySelector('.plus').addEventListener('click', () => {
      if (counter !== items.length - 2) {
        items[counter].style.display = 'flex';
        counter++;
      } else {
        items[counter].style.display = 'flex';
        items[items.length - 1].remove();
      }
    });
  }
  hideItems(items) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = "none";
      }
    });
  }
  init() {
    try {
      this.hideItems(this.oldItems);
      this.hideItems(this.newItems);
      this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
      this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
    } catch (e) {}
  }
}
;

/***/ }),

/***/ "./src/js/modules/download.js":
/*!************************************!*\
  !*** ./src/js/modules/download.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Download)
/* harmony export */ });
class Download {
  /* (создаем новый класс, подключаем его в main.js) */
  constructor(triggers) {
    /* (конструктор будет принимать только триггер - блок, при нажатии на кот будет скачивание(в реальных проектах должна быть ссылка)) */
    this.btns = document.querySelectorAll(triggers); /* (получаем триггер из верстки) */
    this.path = 'assets/img/mainbg.jpg'; /* (прописываем путь - в реальном проекте на каждой кнопке должен быть свой путь и приходить он должен в переменную из триггера(ссылки)) */
  }

  downloadItem(path) {
    const element = document.createElement('a'); /* (так как скачивание должно происходить через ссылку, а у нас простой div, создаем ссылку) */

    element.setAttribute('href', path); /* (добавляем ей атрибут href, кот примет в себя пришедший аргументом путь) */
    element.setAttribute('download', 'nice_picture'); /* (для скачивания нужно добавить атрибут download и имя скачиваемого файла(тоже должно приходить динамически)) */

    element.style.display = 'none'; /* (ссылка на странице не должна быть видимой - скрываем ее) */
    document.body.appendChild(element); /* (помещаем на страницу) */

    element.click(); /* (вызываем на ней клик) */

    document.body.removeChild(element); /* (удаляем ссылку) */
    /* (таким образом, при клике на блок с надписью о загрузке создается невидимая ссылка с адресом из этого блока, помещается на страницу, автоматически запускается и после скачивания удаляется со страницы) */
  }

  init() {
    this.btns.forEach(item => {
      item.addEventListener('click', () => {
        /* (перебираем кнопки, навешиваем клик) */
        this.downloadItem(this.path); /* (при клике будет запускаться ф, как арг должна принимать путь к файлу) */
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
class Form {
  /* (создаем и сразу экспортируем класс, подключаем в main.js(чтобы запрос работал, запускать нужно на виртуальном сервере)) */
  constructor(forms) {
    /* (в конструктор будет приходить как аргумент только формы) */
    /* (перед началом работы рекомендуется проверить верстку - чтобы форма была стандартной, имела интерактивными полями не обычные divы, а инпуты, селекты и т.п, которые обязательно имеют аттрибут name, имела кнопку отправки(если запросы будут разными, рекомендуется вынести их в отдельный функционал)) */
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input'); /* (из формы получаем все инпуты - нужны будут для очистки после отправки) */
    this.message = {
      /* (создаем п с возможными сообщениями о статусе загрузки) */
      loading: 'Loading...',
      success: 'Thanks! We will contact you shortly!',
      failure: 'An error has occurred!'
    };
    this.path = 'assets/question.php'; /* (создаем п с адресом для запросов) */
  }

  clearInputs() {
    /* (создаем метод для очистки формы, подключаем после отправки формы) */
    this.inputs.forEach(item => {
      item.value = '';
    });
  }
  checkMailInputs() {
    /* (создаем метод для валидации инпутов ввода электронной почты на отсутствие кириллицы и вызываем в init()) */
    const mailInputs = document.querySelectorAll('[type="email"]'); /* (получаем из верстки инпуты по типу) */
    mailInputs.forEach(input => {
      input.addEventListener('keypress', function (e) {
        /* (перебираем инпуты, навешиваем событие - нажатие кнопки) */
        if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
          /* (задаем условие - символы должны быть только латиница, цифры, собачка или точка) */
          e.preventDefault();
        }
      });
    });
  }
  initMask() {
    /* (создаем ф для установки маски номера телефона(взята из JS-4_15 - подробное описание там), вызываем в init()) */

    let setCursorPosition = (pos, elem) => {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };
    function createMask(event) {
      let matrix = '+1 (___) ___-____',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
      if (def.length >= val.length) {
        val = def;
      }
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });
      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
    let inputs = document.querySelectorAll('[name="phone"]');
    inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }
  async postData(url, data) {
    /* (создаем метод для отправки формы( взят из предыдущего сайта, но в классах нужно использовать обычные ф, а не стрелочные)) */
    let res = await fetch(url, {
      method: "POST",
      body: data
    });
    return await res.text();
  }
  init() {
    this.checkMailInputs();
    this.initMask();
    this.forms.forEach(item => {
      /* (перебираем формы) */
      item.addEventListener('submit', e => {
        /* (назначаем событие отправки) */
        e.preventDefault(); /* (отменяем стандартное поведение браузера) */

        let statusMessage = document.createElement('div'); /* (для вывода инф о статусе отправки создаем блок) */
        statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `; /* (добавляем блоку стили) */
        item.parentNode.appendChild(statusMessage); /* (помещаем этот блок в родительский блок формы - будет добавлен сразу после формы, но нужно учитывать особенности верстки - может не поместиться) */

        statusMessage.textContent = this.message.loading; /* (после нажатия на кнопку отобразится сообщение о загрузке) */

        const formData = new FormData(item); /* (формируем данные для отправки - создаем новую FormDate с данными из формы(item)) */

        this.postData(this.path, formData) /* (запускаем метод по отправке, как арг передаем путь и данные для отправки, обрабатываем его через then/catch(не забываем, что это все идет одной строкой)) */.then(res => {
          /* (в случае успеха выведем инф из формы в консоль и сообщение об успехе на страницу) */
          console.log(res);
          statusMessage.textContent = this.message.success;
        }).catch(() => {
          /* (в случае ошибки выводим соответствующее сообщение) */
          statusMessage.textContent = this.message.failure;
        }).finally(() => {
          /* (в любом случае после отправки очищаем форму и удаляем сообщение о статусе через 6сек) */
          this.clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 6000);
        });
      });
    });
  }
}
;

/***/ }),

/***/ "./src/js/modules/playVideo.js":
/*!*************************************!*\
  !*** ./src/js/modules/playVideo.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoPlayer)
/* harmony export */ });
class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this); /* (далее будет создана функция onPlayerStateChange, кот будет в плеере отслеживать состояние, но она будет вызываться из плеера и терять контекст вызова, поэтому подвызываем ее напрямую через bind) */
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        /* (закидываем следующий код в try/catch, иначе он даст ошибку при включении плеера на первой странице) */
        const blockedElem = btn.closest('.module__video-item').nextElementSibling; /* (получаем родительский элемент каждой кнопки) */

        if (i % 2 == 0) {
          /* (каждому второму блоку назначаем data-аттрибут в позиции true - понадобится для того, чтобы заблокировать окна с плеером, помеченные замком - они как раз и будут каждым вторым  в верстке) */
          blockedElem.setAttribute('data-disabled', 'true');
        }
      } catch (e) {}
      btn.addEventListener('click', () => {
        if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
          /* (проверяем - если блок с плеером и классом module__video-item  не имеет data-аттрибута disabled или работает блок с другим классом - производим действия) */
          this.activeBtn = btn; /* (для дальнейшей работы потребуется отследить кнопку, с кот запускали плеер, поэтому вводим переменную) */

          if (document.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex';
            if (this.path !== btn.getAttribute('data-url')) {
              /* (если плеер уже запускался, проверяем, если url нажатой кнопки не соответствует предыдущему(запустили другое видео)) */
              this.path = btn.getAttribute('data-url'); /* (получаем путь из этой кнопки) */
              this.player.loadVideoById({
                videoId: this.path
              }); /* (запускаем в плеере(созданном ранее) метод loadVideoById, в кот передаем обьект с настройками()в д.с только путь к видео(его id), но можно донастраивать - подробнее в офиц. документации) */
            }
          } else {
            // const path = btn.getAttribute('data-url'); 
            // this.createPlayer(path); 
            this.path = btn.getAttribute('data-url'); /* (меняем определение пути и создание плеера - путь теперь будет не статичным, а приходит динамически из кнопки, на кот нажал пользователь, и с пом него создается плеер, если еще не создавался(ни разу не запускали плеер)) */
            this.createPlayer(this.path);
          }
        }
      });
    });
  }
  bindCloseVideo() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }
  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`,
      events: {
        'onStateChange': this.onPlayerStateChange
      } /* (при создании плеера добавляем новую опцию, срабатывающую на обьекте(events - подробнее в документации, вотличии от документации не забываем добавлять this, так как работаем внутри класса) - она будет отслеживать изменения обьекта и запускать нужную нам функцию, кот мы создаем далее) */
    });

    this.overlay.style.display = 'flex';
  }
  onPlayerStateChange(state) {
    /* (создаем опцию, кот будет срабатывать на плеере) */
    try {
      /* (закидываем следующий код в try/catch, иначе он даст ошибку при включении плеера на первой странице) */
      const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling; /* (получаем в п заблокированное окно - через метод closest получаем родительский элемент кнопки, на кот нажали, и через nextElementSibling следующий от него элемент(в верстке это и есть заблокированное окно второго плеера)) */
      const playBtn = this.activeBtn.querySelector('svg').cloneNode(true); /* (получаем сам значек запуска из активной кнопки(картинку с треугольником - ней нужно будет заменить картинку замка на заблокированном плеере) через тег svg, обязательно добавляем cloneNode(true) - это полностью скопирует эту ноду(это сложная конструкция(svg) и при обычном приравнивании получится только поверхностная копия, поэтому используем cloneNode)) */

      if (state.data === 0) {
        /* (проверяем состояние плеера - если воспроизведение уже завершено(state.data - состояние плеера, смотреть в официальной документации - например завершено == 0, не начато == -1 и т.д) - запускаем дальнейшие действия) */
        if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
          /* (ставим еще одно условие для избежания ошибок - если заблокированный элемент еще содержит изображение с замком, закрывающее воспроизведение) */
          blockedElem.querySelector('.play__circle').classList.remove('closed'); /* (удаляем блокирующий класслист) */
          blockedElem.querySelector('svg').remove(); /* (удаляем изображение с замком) */
          blockedElem.querySelector('.play__circle').appendChild(playBtn); /* (вставляем на освободившееся место иконку с треугольником(для запуска плеера)) */
          blockedElem.querySelector('.play__text').textContent = 'play video'; /* (заменяем надпись возле иконки запуска) */
          blockedElem.querySelector('.play__text').classList.remove('attention'); /* (удаляем css-класс у надписи) */
          blockedElem.style.opacity = 1; /* (убираем прозрачность у блока с плеером) */
          blockedElem.style.filter = 'none'; /* (убираем черно-белый фильтр у блока с плеером) */

          blockedElem.setAttribute('data-disabled', 'false'); /* (меняем назначенный выше дата-аттрибут, блокирующий воспроизведение, на false - теперь можно запускать плеер) */
        }
      }
    } catch (e) {}
  }
  init() {
    if (this.btns.length > 0) {
      /* (добавляем условие - если массив с кнопками запуска содержит хотя-бы одну кнопку - запускаем код) */
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindTriggers();
      this.bindCloseVideo();
    }
  }
}
;

/***/ }),

/***/ "./src/js/modules/showInfo.js":
/*!************************************!*\
  !*** ./src/js/modules/showInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowInfo)
/* harmony export */ });
class ShowInfo {
  /* (создаем новый класс для отработки аккордеона(на каждой странице есть один скрытый блок, кот должен плавно открываться при клике на кнопку) и подключаем его в main.js) */
  constructor(triggers) {
    /* (конструктор будет получать в себя только триггеры - кнопку для запуска открытия блока) */
    this.btns = document.querySelectorAll(triggers);
  }
  init() {
    this.btns.forEach(btn => {
      /* (перебираем массив с кнопками) */
      btn.addEventListener('click', () => {
        /* (навешиваем действие клика) */
        // ----------------------
        /* (Только открытие) */
        // btn.closest('.module__info-show').nextElementSibling.style.display = 'block';  /* (получаем родительский блок кнопки, через nextElementSibling получаем следующий за ним, и добавляем ему стиль - при нажатии на кнопку он будет появляться на странице) */
        // ----------------------
        /* (С закрытием) */
        const sibling = btn.closest('.module__info-show').nextElementSibling; /* (получаем блок, кот нужно открыть(следующий после родительского блока кнопки)) */

        sibling.classList.toggle('msg'); /* (в верстке есть класс, скрывающий блок, тогглим его) */
        sibling.style.marginTop = '20px'; /* (добавляем блоку отступ) */
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-main.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(btns, nextArr, prevArr) {
    super(btns, nextArr, prevArr);
  }
  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }
    try {
      this.hanson.style.opacity = '0';
      if (n === 3) {
        this.hanson.classList.add('animated');
        setTimeout(() => {
          this.hanson.style.opacity = '1';
          this.hanson.classList.add('slideInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    } catch (e) {}
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = "none";
    }
    this.slides[this.slideIndex - 1].style.display = "block";
  }
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  bindTriggers() {
    /* (выносим функционал нажатия кнопок из render в bindTriggers и подключаем в render) */

    this.btns.forEach(item => {
      item.addEventListener("click", () => {
        this.plusSlides(1);
      });
      if (item.parentNode.previousElementSibling.tagName == 'A') {
        item.parentNode.previousElementSibling.addEventListener('click', e => {
          e.preventDefault();
          this.slideIndex = 1;
          this.showSlides(this.slideIndex);
        });
      }
    });

    /* (навешиваем обработчики событий на кнопки переключения внутри слайдера) */
    /* document.querySelectorAll(this.prev) */
    this.prevArr.forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });

    /* document.querySelectorAll(this.next) */
    this.nextArr.forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation(); /* (в данном случае необходимо остановить всплытие(метод stopPropagation()) - при нажатии на кнопку перемотки она срабатывает дважды, так как назначена и на кнопку, и на ее родительский блок) */
        e.preventDefault();
        this.plusSlides(1);
      });
    });
  }
  render() {
    if (this.container) {
      /* (вместо конструкции try/catch вводим условие наличия контейнера - если он есть - выполняем(это решает возникающие ранее проблемы)) */
      try {
        this.hanson = document.querySelector('.hanson');
      } catch (e) {}
      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-mini.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-mini.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
  }
  decorizeSlides() {
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].classList.remove(this.activeClass);
      if (this.animate) {
        this.slides[i].querySelector('.card__title').style.opacity = '0.4';
        this.slides[i].querySelector('.card__controls-arrow').style.opacity = '0';
      }
    }
    if (!this.slides[0].closest('button')) {
      this.slides[0].classList.add(this.activeClass);
    }
    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }
  nextSlide() {
    if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
      console.log(1);
      this.container.appendChild(this.slides[0]);
      this.container.appendChild(this.slides[0]);
      this.container.appendChild(this.slides[0]);
      this.decorizeSlides();
    } else if (this.slides[1].tagName == "BUTTON") {
      console.log(2);
      this.container.appendChild(this.slides[0]);
      this.container.appendChild(this.slides[1]);
      this.decorizeSlides();
    } else {
      this.container.appendChild(this.slides[0]);
      this.decorizeSlides();
    }
  }
  bindTriggers() {
    this.next.addEventListener('click', () => {
      this.nextSlide();
    });
    this.prev.addEventListener('click', () => {
      for (let i = this.slides.length - 1; i > 0; i--) {
        if (this.slides[i].tagName !== "BUTTON") {
          let active = this.slides[i];
          this.container.insertBefore(active, this.slides[0]);
          this.decorizeSlides();
          break;
        }
      }
    });
  }
  init() {
    /* (вторая страница сайта также выдает ошибку при работе с этим модулем - чтобы не оборачивать каждое звено ошибки в try/catch, оборачиваем сразу весь функционал init) */
    try {
      this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;
      this.bindTriggers();
      this.decorizeSlides();
      if (this.autoplay) {
        setInterval(() => this.nextSlide(), 5000);
      }
    } catch (e) {}
  }
}
;

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor() {
    let {
      container = null,
      btns = null,
      next = null,
      prev = null,
      prevArr = null,
      nextArr = null,
      activeClass = '',
      animate = false,
      autoplay = false
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.container = document.querySelector(container);
    try {
      this.slides = this.container.children;
    } catch (e) {}
    ; /* (помешаем получение дочерних элементов в конструкцию try/catch - вторая страница сайта будет пытаться работать с этим скриптом, но вместо всех аргументов получит null - это ошибки не выдаст, но так как slides пытается получить дочерние элементы из null(блока container, кот не пришел), это вызовет ошибку и нарушит работу сайта) */
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.prevArr = document.querySelectorAll(prevArr);
    this.nextArr = document.querySelectorAll(nextArr);
    this.activeClass = activeClass;
    this.autoplay = autoplay;
    this.animate = animate;
    this.slideIndex = 1;
  }
}
;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider/slider-main */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider/slider-mini */ "./src/js/modules/slider/slider-mini.js");
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");
/* harmony import */ var _modules_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/difference */ "./src/js/modules/difference.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_showInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/showInfo */ "./src/js/modules/showInfo.js");
/* harmony import */ var _modules_download__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/download */ "./src/js/modules/download.js");





 /* (импортируем и подключаем) */
 /* (импортируем и подключаем) */

window.addEventListener('DOMContentLoaded', () => {
  const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.page',
    btns: '.next'
  });
  slider.render();
  const modulePageSlider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.moduleapp',
    btns: '.next',
    prevArr: '.prevmodule',
    nextArr: '.nextmodule'
  });
  modulePageSlider.render();
  const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
    animate: true
  });
  showUpSlider.init();
  const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  });
  modulesSlider.init();
  const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active'
  });
  feedSlider.init();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__["default"]('.showup .play', '.overlay').init();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__["default"]('.module__video-item .play', '.overlay').init(); /* (подключаем новый видеоплеер с селекторами со второй страницы) */

  new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"]('.officerold', '.officernew', '.officer__card-item').init();
  new _modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"]('.form').init();
  new _modules_showInfo__WEBPACK_IMPORTED_MODULE_5__["default"]('.plus__content').init(); /* (запускаем с классом триггера(плюсика)) */

  new _modules_download__WEBPACK_IMPORTED_MODULE_6__["default"]('.download').init(); /* (запускаем с селектором класса блока для загрузки) */
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map