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
    
    
    slider.addEventListener('click', (event)=> {
      let left = event.clientX - slider.getBoundingClientRect().left;
      let leftRelative = left / slider.offsetWidth;
      let segments = this.#steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;
      const sliderValueContainer = slider.querySelector('.slider__value');
      let activeStep = stepsContainer.childNodes[1];
      console.log(activeStep);
  
      sliderValueContainer.append(value);
      
      activeStep.classList.add('slider__step-active');
  
      let thumb = slider.querySelector('.slider__thumb');
      let progress = slider.querySelector('.slider__progress');
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      console.log('click');
  
  
      this.onSliderClick(value);
  
    });

    
    
    return slider;

  }


  onSliderClick = (value) => {
    const sliderChangeEvent = new CustomEvent("slider-change", 
      { detail: value,
        bubbles: true});
  
    return this.#elem.dispatchEvent(sliderChangeEvent);
     
  }


  get elem() {
    return this.#elem;
  }
}
