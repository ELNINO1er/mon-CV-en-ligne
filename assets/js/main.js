(function ($) {
  "use strict";

  var $window = $(window);
  /*----------------------------------
# header sticky 
-----------------------------------*/
  $.fn.elExists = function () {
    return this.length > 0;
  };


  var activeSticky = $("#sticky-header"),
    $winDow = $($window);
  $winDow.on("scroll", function () {
    var scroll = $($window).scrollTop(),
      isSticky = activeSticky;

    if (scroll < 1) {
      isSticky.removeClass("is-sticky");
    } else {
      isSticky.addClass("is-sticky");
    }
  });




  if ($(".testimonial").elExists()) {
    const testimonialCarousel = new Swiper(".testimonial .swiper", {
      pagination: false,
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 45,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 45,
        },
      },
    });
  }





  if ($(".brandCarousel").elExists()) {
    const brandCarousel = new Swiper(".brandCarousel .swiper", {
      pagination: false,
      spaceBetween: 24,
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 2000,
      },
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        480: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6
        },
      },
    });
  }



  if ($(".play-button").elExists()) {
    $(".play-button").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,
      fixedContentPos: true,
    });
  }




  if ($(".counter").elExists()) {
    const counterUp = window.counterUp.default

    const callback = entries => {
      entries.forEach(entry => {
        const el = entry.target
        if (entry.isIntersecting && !el.classList.contains('is-visible')) {
          counterUp(el, {
            duration: 3000,
            delay: 15,
          })
          el.classList.add('is-visible')
        }
      })
    }

    const IO = new IntersectionObserver(callback, { threshold: 1 })

    const el = document.querySelector('.counter')
    IO.observe(el)
  }



  // You can also pass an optional settings object
  // below listed default settings
  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 600, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

  });



  /*
  
  * Ajax Contact Form 
  
  */
  const contactForm = $("#contact-form"),
    formMessages = $(".form-message");
  const renderFormMessage = function (type, title, text) {
    const icons = {
      success:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 7L9 18L4 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      error:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10.29 3.86L1.82 18C1.64 18.31 1.55 18.46 1.54 18.59C1.5 18.95 1.69 19.29 2 19.46C2.11 19.52 2.29 19.52 2.65 19.52H21.35C21.71 19.52 21.89 19.52 22 19.46C22.31 19.29 22.5 18.95 22.46 18.59C22.45 18.46 22.36 18.31 22.18 18L13.71 3.86C13.53 3.55 13.44 3.4 13.31 3.3C13.03 3.08 12.64 3.08 12.36 3.3C12.23 3.4 12.14 3.55 11.96 3.86H10.29Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      warning:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10.29 3.86L1.82 18C1.64 18.31 1.55 18.46 1.54 18.59C1.5 18.95 1.69 19.29 2 19.46C2.11 19.52 2.29 19.52 2.65 19.52H21.35C21.71 19.52 21.89 19.52 22 19.46C22.31 19.29 22.5 18.95 22.46 18.59C22.45 18.46 22.36 18.31 22.18 18L13.71 3.86C13.53 3.55 13.44 3.4 13.31 3.3C13.03 3.08 12.64 3.08 12.36 3.3C12.23 3.4 12.14 3.55 11.96 3.86H10.29Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    };

    formMessages
      .removeClass(
        "form-message-success form-message-error form-message-warning is-visible"
      )
      .addClass(`form-message-${type} is-visible`)
      .html(
        `<div class="form-message-inner">
          <span class="form-message-icon">${icons[type] || icons.warning}</span>
          <div class="form-message-content">
            <strong class="form-message-title">${title}</strong>
            <p class="form-message-text">${text}</p>
          </div>
        </div>`
      );
  };

  const contactValidator = contactForm.validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      subject: {
        required: true,
        minlength: 3,
      },
      message: {
        required: true,
        minlength: 10,
      },
    },
    messages: {
      name: {
        required: "Indiquez votre nom pour que je sache a qui repondre.",
        minlength: "Votre nom doit contenir au moins 2 caracteres.",
      },
      email: {
        required: "Ajoutez votre adresse e-mail.",
        email: "Entrez une adresse e-mail valide.",
      },
      subject: {
        required: "Precisez le sujet de votre message.",
        minlength: "Le sujet doit contenir au moins 3 caracteres.",
      },
      message: {
        required: "Expliquez votre besoin en quelques lignes.",
        minlength: "Votre message doit contenir au moins 10 caracteres.",
      },
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
      error.addClass("contact-field-error");
      error.insertAfter(element);
    },
    highlight: function (element) {
      $(element).addClass("is-invalid");
    },
    unhighlight: function (element) {
      $(element).removeClass("is-invalid");
    },
    invalidHandler: function (event, validator) {
      if (validator.numberOfInvalids() > 0) {
        renderFormMessage(
          "warning",
          "Quelques informations sont a corriger",
          "Verifiez les champs signales puis renvoyez votre message."
        );
      }
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: form.action,
        data: $(form).serialize(),
        dataType: "json",
      })
        .done(function (response) {
          const successMessage =
            response && response.message
              ? response.message
              : "Votre message a bien ete envoye. Je reviens vers vous rapidement.";

          renderFormMessage(
            "success",
            "Message bien recu",
            successMessage
          );
          form.reset();
          contactValidator.resetForm();
          contactForm.find(".contact-form-control").removeClass("is-invalid");
        })
        .fail(function (data) {
          const errorMessage =
            data.responseJSON && data.responseJSON.message
              ? data.responseJSON.message
              : data.responseText;

          if (errorMessage !== "") {
            renderFormMessage(
              "error",
              "Envoi impossible pour le moment",
              errorMessage
            );
          } else {
            renderFormMessage(
              "error",
              "Envoi impossible pour le moment",
              "Le message n'a pas pu etre envoye. Reessayez dans un instant ou contactez-moi directement par e-mail."
            );
          }
        });
    },
  });




  /*---------------------------------
        Scroll Up
    -----------------------------------*/
  function scrollToTop() {
    var $scrollUp = $("#scrollUp"),
      $lastScrollTop = 0,
      $window = $(window);

    $window.on("scroll", function () {
      var st = $(this).scrollTop();
      if (st > $lastScrollTop) {
        $scrollUp.css({ bottom: "-60px" });
      } else {
        if ($window.scrollTop() > 200) {
          $scrollUp.css({ bottom: "60px" });
        } else {
          $scrollUp.css({ bottom: "-60px" });
        }
      }
      $lastScrollTop = st;
    });

    $scrollUp.on("click", function (evt) {
      $("html, body").animate({ scrollTop: 0 }, 400);
      evt.preventDefault();
    });
  }
  scrollToTop();

})(jQuery);
