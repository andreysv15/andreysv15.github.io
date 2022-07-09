$(document).ready(function () {
   $('.carousel_inner').slick({
      speed: 1200,
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
      responsive: [
         {
            breakpoint: 992,
            settings: {
               arrows: false,
               slidesToShow: 1,
               slidesToScroll: 1,
               autoplay: true,
               autoplaySpeed: 2000
            }
         }
      ]
   });

   $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function () {
      $(this)
         .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
         .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
   });

   function toggleSlide(item) {
      $(item).each(function (i) {
         $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item_info').eq(i).toggleClass('catalog-item_info_active');
            $('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
         })
      });
   };

   toggleSlide('.catalog-item_link');
   toggleSlide('.catalog-item_back');

   // Modal
   $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
   });
   $('.modal_close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
   });
   $('.button_mini').each(function(i) {
      $(this).on('click', function() {
         $('#order .modal_descr').text($('.catalog-item_subtitle').eq(i).text());
         $('.overlay, #order').fadeIn('slow');
      });
   });

   function validateForms(form){
      $(form).validate({
         rules: {
            name: "required",
            phone: "required",
            email: {
               required: true,
               email: true,
            }
         },
         messages: {
            name: "Пожалуйста, введите свое имя",
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
               required: "Пожалуйста, введите свою почту",
               email: "Неправильно введен адрес почты"
            }
         }
      });
   }
   validateForms('#consultation-form');
   validateForms('#consultation form');
   validateForms('#order form');

   $('input[name=phone]').mask("+38(999) 99-999-99");

   $('form').submit(function (e) {
      e.preventDefault();
      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function () {
         $(this).find("input").val("");
         $('#consultation, #order').fadeOut();
         $('.overlay, #thanks').fadeIn('slow');

         $('form').trigger('reset');
      });
      return false;
   });

   // Smooth scroll and pageup
   $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
         $('.pageup').fadeIn();
      } else {
         $('.pageup').fadeOut();
      }
   });
   $("a[href=#up]").click(function () {
      const _href = $(this).attr("href");
      $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
      return false;
   });

   new WOW().init();
});

