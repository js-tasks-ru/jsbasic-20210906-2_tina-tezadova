import createElement from '../../assets/lib/create-element.js';

function StepSliderTemplate(value) {
  const result = `<div class="slider">
    <div class="slider__thumb">
      <span class="slider__value">${value}</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
      <span  class="slider__step-active"></span>
    </div>
  </div>`;
 
  return result;
  
}

export default class StepSlider {
  #steps = 0;
  #template = '';
  #elem = '';
  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#template = StepSliderTemplate(value);
    this.#elem = this.render();
  }

  render() {
    const slider = createElement(this.#template);
    const stepsContainer = slider.querySelector('.slider__steps');
    const span = '<span></span>';
    

    
    for (let i = 1; i < this.#steps; i++) {
      stepsContainer.innerHTML += span;
      
    }
    
    let thumb = slider.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', () => {
      slider.classList.add('slider_dragging');
      let value = 0;
      
      const onMove = (event) => {
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;
        let leftPercents = leftRelative * 100;
        let thumb = slider.querySelector('.slider__thumb');
        let progress = slider.querySelector('.slider__progress');
        let segments = this.#steps - 1;
        let approximateValue = leftRelative * segments;
        const sliderValueContainer = slider.querySelector('.slider__value');
        let activeStep = stepsContainer.childNodes[1];
        value = Math.round(approximateValue);
        
        if (leftRelative < 0) {
          leftRelative = 0;
        }
        
        if (leftRelative > 1) {
          leftRelative = 1;
        }
        
        
        
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
        sliderValueContainer.innerHTML = value;
        activeStep.classList.add('slider__step-active');

      };

      


      document.addEventListener('pointermove', onMove);
  
      document.addEventListener('pointerup', () => {
        this.onSliderClickEvent(value);
        slider.classList.remove('slider_dragging');
        document.removeEventListener('pointermove', onMove);
      }, { once: true });
      
    });


    slider.addEventListener('click', (event)=> {
      this.onSlideClick(event, stepsContainer);
  
    });
    
    return slider;

  }


  onSliderClickEvent = (value) => {
    const sliderChangeEvent = new CustomEvent("slider-change", 
      { detail: value,
        bubbles: true});
  
    return this.#elem.dispatchEvent(sliderChangeEvent);
  }

  onSlideClick = (event, stepsContainer) => {

    let left = event.clientX - this.#elem.getBoundingClientRect().left;
    let leftRelative = left / this.#elem.offsetWidth;
    let segments = this.#steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;
    const sliderValueContainer = this.#elem.querySelector('.slider__value');
    let activeStep = stepsContainer.childNodes[1];
      
  
    sliderValueContainer.innerHTML = value;
      
    activeStep.classList.add('slider__step-active');
  
    let thumb = this.#elem.querySelector('.slider__thumb');
    let progress = this.#elem.querySelector('.slider__progress');
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
  
  
    this.onSliderClickEvent(value);

  }


  get elem() {
    return this.#elem;
  }
}




