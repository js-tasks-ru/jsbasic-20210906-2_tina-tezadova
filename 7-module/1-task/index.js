import createElement from '../../assets/lib/create-element.js';

function RibbonMenuTemplate(categories) {
  const result = `<div class="ribbon">
  <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>
  <nav class="ribbon__inner">
  ${categories.map((item) =>
    `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`)}
  </nav>
  <button class="ribbon__arrow ribbon__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>
</div>`;
 
  return result;
  
}

export default class RibbonMenu {
  categories = null;
  #template = '';
  #elem= '';
  constructor(categories) {
    this.categories = categories;
    this.#template = RibbonMenuTemplate(this.categories);
    this.#elem = this.render();
  }


  render() {
    const ribbonMenu = createElement(this.#template);
    const RibbonMenuArrowRight = ribbonMenu.querySelector('.ribbon__arrow_right');
    const RibbonMenuArrowLeft = ribbonMenu.querySelector('.ribbon__arrow_left');
    let scrollStep = 350;
    const scrollContainer = ribbonMenu.querySelector('.ribbon__inner');
    console.log(scrollContainer);


    
 
    
    RibbonMenuArrowRight.addEventListener('click', () => {
      scrollContainer.scrollBy(scrollStep, 0);
      
    });


    RibbonMenuArrowLeft.addEventListener('click', () => {
      scrollContainer.scrollBy(+`-${scrollStep}`, 0);
      
    });

    RibbonMenuArrowLeft.classList.remove('ribbon__arrow_visible');
    RibbonMenuArrowRight.classList.add('ribbon__arrow_visible');

    scrollContainer.addEventListener('scroll', function() {
      let scrollWidth = scrollContainer.scrollWidth;
      let scrollLeft = scrollContainer.scrollLeft;
      let clientWidth = scrollContainer.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollContainer.scrollLeft === 0) {
        RibbonMenuArrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        RibbonMenuArrowLeft.classList.add('ribbon__arrow_visible');
      }
      if (scrollRight === 0) {
        RibbonMenuArrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        RibbonMenuArrowRight.classList.add('ribbon__arrow_visible');
      }
    });

    const ribbonMenuItems = Array.from(ribbonMenu.querySelectorAll('.ribbon__item'));
  
  
    ribbonMenuItems.forEach((item)=> {
      
      item.addEventListener('click', (event)=> {
        ribbonMenuItems.forEach((item)=> {
          item.classList.remove('ribbon__item_active');
        });
        
        let target = event.target;

        event.preventDefault();

        target.classList.add('ribbon__item_active');

        this.ribbonMenuItemClick(target);

      });
      
    });

    return ribbonMenu;
  }


  ribbonMenuItemClick = (target) => {
    const ribbonMenuItemEvent = new CustomEvent("ribbon-select", 
      { detail: target.getAttribute('data-id'),
        bubbles: true});

    return this.#elem.dispatchEvent(ribbonMenuItemEvent);
     
  }

  get elem() {
    return this.#elem;
  }
}
