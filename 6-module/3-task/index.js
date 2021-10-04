/* eslint-disable no-unused-expressions */
import createElement from '../../assets/lib/create-element.js';

function CarouselTemplate(slides) {
  const productCarousel = 
    `<div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
      ${slides.map((slide) =>
    `<div class="carousel__slide" data-id="${slide.id}">
    <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${slide.price.toFixed(2)}</span>
      <div class="carousel__title">${slide.name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
    </div>`)}
    </div>
    </div>
  `;
  return productCarousel;
}

export default class Carousel {
  #elem = '';
  #template = '';

  constructor(slides) {
    this.#template = CarouselTemplate(slides);
    this.#elem = this.render();
  }


  render() {

    let productCarousel = createElement(this.#template);

    const carouselArrowRight = productCarousel.querySelector('.carousel__arrow_right');
    const carouselArrowLeft = productCarousel.querySelector('.carousel__arrow_left');
    const carouselInner = productCarousel.querySelector('.carousel__inner');
    const carouselSlide = productCarousel.querySelector('.carousel__slide');
    let step = 1;
    const addCarouselButton = Array.from(productCarousel.querySelectorAll('.carousel__button'));
  
  
    addCarouselButton.forEach((btn)=> {
      btn.addEventListener('click', (event)=> {
        let target = event.target;
        const addCarouselButtonEvent = new CustomEvent("product-add", 
          { detail: target.closest('div[data-id]').getAttribute('data-id'),
            bubbles: true});

        productCarousel.dispatchEvent(addCarouselButtonEvent);
        console.log(addCarouselButtonEvent);

      });
      
    });
    

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
    setTimeout(() => {
      
      const slideWidth = carouselSlide.offsetWidth;
      let currentWidth = 0;
      
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
  
  
    }, 1);
    return productCarousel;
  }


  get elem() {
    return this.#elem;
  }
}
