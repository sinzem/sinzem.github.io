$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 800,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container_tabs').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // $('.catalog-item__link').each(function(i) {
    //   $(this).on('click', function(e) {
    //     e.preventDefault();
    //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //   })
    // });

    // $('.catalog-item__back').each(function(i) {
    //   $(this).on('click', function(e) {
    //     e.preventDefault();
    //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //   })
    // })   --- внизу сокращенная версия

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
    // const slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     autoplay: false,
//     controls: false,
//     nav: false
//   });
//   document.querySelector('.prev').addEventListener('click',  function () {
//     slider.goTo('prev');
//   });
//   document.querySelector('.next').addEventListener('click',  function () {
//     slider.goTo('next');
//   });  - - - tiny - slider

        // Modal
    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    })
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    })
    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      })
    });
  
    // $('#consultation-form').validate({
    //   rules: {
    //     name: {
    //       required: true,
    //       minlength: 2
    //     },
    //     tell: {
    //       required: true,
    //       minlength: 7
    //     },
    //     email: {
    //       required: true,
    //       email: true
    //     }
    //   },
    //   messages: {
    //     name: {
    //       required: "Пожалуйста, введите свое имя",
    //       minlength: jQuery.validator.format("Введите минимум {2} символа!")
    //     },
    //     tell: {
    //       required: "Пожалуйста, введите свой телефон",
    //       minlength: jQuery.validator.format("Введите минимум {7} символов!")
    //     },
    //     email: {
    //       required: "Пожалуйста, введите свою почту",
    //       email: "Неправильно введен почтовый адрес"
    //     }
    //   }
    // });
    // $('#consultation form').validate({
    //     rules: {
    //       name: {
    //         required: true,
    //         minlength: 2
    //       },
    //       tell: {
    //         required: true,
    //         minlength: 7
    //       },
    //       email: {
    //         required: true,
    //         email: true
    //       }
    //     },
    //     messages: {
    //       name: {
    //         required: "Пожалуйста, введите свое имя",
    //         minlength: jQuery.validator.format("Введите минимум {2} символа!")
    //       },
    //       tell: {
    //         required: "Пожалуйста, введите свой телефон",
    //         minlength: jQuery.validator.format("Введите минимум {7} символов!")
    //       },
    //       email: {
    //         required: "Пожалуйста, введите свою почту",
    //         email: "Неправильно введен почтовый адрес"
    //       }
    //     }
    // });
    // $('#order form').validate( {
    //   rules: {
    //     name: {
    //       required: true,
    //       minlength: 2
    //     },
    //     tell: {
    //       required: true,
    //       minlength: 7
    //     },
    //     email: {
    //       required: true,
    //       email: true
    //     }
    //   },
    //   messages: {
    //     name: {
    //       required: "Пожалуйста, введите свое имя",
    //       minlength: jQuery.validator.format("Введите минимум {2} символа!")
    //     },
    //     tell: {
    //       required: "Пожалуйста, введите свой телефон",
    //       minlength: jQuery.validator.format("Введите минимум {7} символов!")
    //     },
    //     email: {
    //       required: "Пожалуйста, введите свою почту",
    //       email: "Неправильно введен почтовый адрес"
    //     }
    //   }
    // });  --- сокращенная запись дальше
    function valideForms(form){
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          tell: {
            required: true,
            minlength: 7
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите свое имя",
            minlength: jQuery.validator.format("Введите минимум {2} символа!")
          },
          tell: {
            required: "Пожалуйста, введите свой телефон",
            minlength: jQuery.validator.format("Введите минимум {7} символов!")
          },
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введен почтовый адрес"
          }
        }
      });
    };
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    // $('input[name=tell]').mask("+38 (999) 999-99-99");
    $('input[name=tell]').inputmask({"mask": "+38(099) 999-99-99"});

    $(window).scroll(function() {
      if($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a[href^=#up]").click(function() {
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    new WOW().init();

    // $('form').submit(function(e) {
    //   e.preventDefault();
    //   $.ajax({
    //     type: "POST",
    //     url: "mailer/smart.php",
    //     data: $(this).serialize()
    //   })done(function() {
    //     $(this).find("input").val("");
    //     $('#consultation, #order').fadeOut();
    //     $('.overlay, #thanks').fadeIn('slow');
    //     $('form').trigger('reset');
    //   });
    //   return false;
    // });

  });


