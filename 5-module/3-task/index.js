
function initCarousel() {

  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselInner = document.querySelector('.carousel__inner');
  const carouselSlide = document.querySelector('.carousel__slide');
  let slideWidth = carouselSlide.offsetWidth;
  let currentWidth = 0;
  let step = 1;

  const hidden = function () {
    if (step === carouselInner.children.length) {
      carouselArrowRight.style.display = 'none';
    } else {
      carouselArrowRight.style.display = '';
    }
    if (step > 1) {
      carouselArrowLeft.style.display = '';
    } else {
      carouselArrowLeft.style.display = 'none';
    }
  };


  hidden();
  carouselArrowRight.addEventListener('click', () => {
    step += 1;
    hidden();
    carouselInner.style.transform = `translateX(-${currentWidth + slideWidth}px)`;
    currentWidth += slideWidth;

  });

  carouselArrowLeft.addEventListener('click', () => {
    step -= 1;
    hidden();
    carouselInner.style.transform = `translateX(-${currentWidth - slideWidth}px)`;
    currentWidth -= slideWidth;


  });





}
