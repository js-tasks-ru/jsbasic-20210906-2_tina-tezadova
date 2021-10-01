import createElement from '../../assets/lib/create-element.js';

function ProductCardTemplate(product) {
  const productCard = createElement(`<div class="card">
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
</div>`);

  const addButton = productCard.querySelector('.card__button');
  
  addButton.onclick = function() {
    const productCardEvent = new CustomEvent("product-add", 
      { detail: product.id,
        bubbles: true});

    productCard.dispatchEvent(productCardEvent);
    console.log(productCardEvent);
  };

  
  return productCard;
}

export default class ProductCard {
  #elem = '';
  constructor(product) {
    this.#elem = ProductCardTemplate(product);
  }


  get elem() {
    return this.#elem;
  }
}


