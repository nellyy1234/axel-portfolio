

  /** AOS */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: true
    })
  });

/** PRELOADER */


$(window).on('load', function () {
  setTimeout(function () {
    $('.preloader').fadeOut('slow');
  }, 700);
});

$(document).ready(function() {  

  /** BACK-TO-TOP FUNCTION */
let backtotop = $('.back-to-top');
  $(window).scroll(function() {
  if (backtotop) {
      if (window.scrollY > 100) {
        backtotop.addClass('active');
      } else {
        backtotop.removeClass('active');
      }
    }
  });

  /** ONCLICK NAV ACTIVE */
  $('.nav-link').click(function(e) {
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
  });

  /**NAV ON SCROLL */
  window.addEventListener('scroll', function() {
    var element = document.getElementById('nav');
    var scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
      element.classList.remove('nav');
    } else {
      element.classList.add('nav');
    }
  });





    /** TYPED */
  const typed = $('.typed');
  if (typed) {
    let typed_strings = typed.attr('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000
    });
  }

  /* animation on scroll fade-up */

$(window).scroll(function() {
    var windowHeight = $(window).height();
    var scrollHeight = $(window).scrollTop();
    var fadeElement = $('.fade-up');
    fadeElement.each(function() {
      var positionTop = $(this).offset().top;
      if (positionTop < scrollHeight + windowHeight - 50) {
        $(this).addClass('fade-up-show' );
      }else if(positionTop > scrollHeight + windowHeight - 50){
        $(this).removeClass('fade-up-show');
        
      }
    });

  });

    /*form validation & ajax contact form */

  (() =>  {
    'use strict';

    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }else {
            var formData = {
              name: $("#name").val(),
              email: $("#email").val(),
              subject: $("#subject").val(),
              message: $("#message").val(),
                  };
                  $.ajax({
                    type: "post",
                    url: "https://adealtube.com/contact-portfolio",
                    data: formData,
                    dataType: "json",
                    encode: true,
                  }).done(function (data)
                  {
                    if (data.error) {
                      alert('Something went wrong. Please try again');
                    }else if(data.success){
                      $('#form').trigger('reset');
                      $('#form').removeClass('was-validated');
                      message.setHTMLCode("<p></p>");
                      alert('Message sent successfully');
                    }
                  })

          }
          form.classList.add('was-validated');
          event.preventDefault();
        }, false)
      })
  })();
  
  const projects = GLightbox({
    selector: '.project-lightbox',
    width: '90%',
    height: '90vh'
  });
});
