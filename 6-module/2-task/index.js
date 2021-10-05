import createElement from '../../assets/lib/create-element.js';

function ProductCardTemplate(product) {
  const productCard = `<div class="card">
  <div class="card__top">
      <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
      <span class="card__price">€${product.price.toFixed(2)}</span>
  </div>
  <div class="card__body">
      <div class="card__title">${product.name}</div>
      <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
  </div>
</div>`;
  
  return productCard;
}

export default class ProductCard {
  #elem = '';
  #template = null;
  #productId = null;
  constructor(product) {
    this.#productId = product.id;
    this.#template = ProductCardTemplate(product);
    this.#elem = this.render();
    
  }

  

  render() {
    let productCard = createElement(this.#template);
    const addButton = productCard.querySelector('.card__button');
    
  
    addButton.onclick = this.onAddButtonClick;
    return productCard;
  }

  onAddButtonClick = () => {
    const productId = this.#productId;
    const productCardEvent = new CustomEvent("product-add", 
      { detail: productId,
        bubbles: true});

    return this.#elem.dispatchEvent(productCardEvent);
     
  }

  get elem() {
    return this.#elem;
  }
}



