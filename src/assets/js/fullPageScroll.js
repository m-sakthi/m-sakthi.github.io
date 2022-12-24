(function () {
  "use-strict";

  // console.log("window.scrollTowindow.scrollTowindow.scrollTo")
  // window.scrollTo(0, 0);

  var container = document.getElementById('full-page-container');
  var sectionContainer = document.getElementById('section-container');
  var sections = document.querySelectorAll('.page-section');
  var navLinks = document.getElementById('nav-links-container').querySelectorAll('.nav-link');
  var scrollingToBottom = '';
  var scrolledHeight = 0;
  var debounce = false;
  var step = 100;
  // container.style.transform = 'translateY(0)';

  function scrollHandler(event) {
    event.preventDefault();

    if (!debounce) {
      debounce = true;
      scrollingToBottom = event.deltaY > 0;

      var dataOrderId = event.target.getAttribute('data-order-id');
      if (!dataOrderId) {
        if (scrollingToBottom && Math.abs(scrolledHeight) < (sections.length - 1) * step) {
          scrolledHeight -= step;
        } else if (!scrollingToBottom && scrolledHeight < 0) {
          scrolledHeight += step;
        }
      } else {
        scrolledHeight = -(dataOrderId * step);
      }

      sectionContainer.style.transform = `translateY(${scrolledHeight}vh)`;

      setTimeout(() => {
        debounce = false;
      }, 1000);
    }
  }

  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', scrollHandler);
  }

  container.addEventListener('wheel', scrollHandler);
})();
