import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';
import products from './products.js';

function ProductGridTemplate() {
  const result = `<div class="products-grid">
  <div class="products-grid__inner">
  </div>
</div>`;

  return result;

}

export default class ProductGrid {
  #template = '';
  #elem = '';
  #productsFiltred = '';
  #container = '';
  #activeFilters = {
    noNuts: false,
    vegeterianOnly: false,
    maxSpiciness: null,
    category: ''
  };
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#template = ProductGridTemplate();
    this.#elem = this.render(this.products);
    this.#productsFiltred = this.products;
  }

  render(products) {
    const productGrid = createElement(this.#template);
    this.#container = productGrid.querySelector('.products-grid__inner');
    this.createProductElements(products);



    return productGrid;
  }

  createProductElements(products) {
    
    products.map((product) => {
      const card = new ProductCard(product);
      this.#container.append(card.elem);
    });

  }

  updateFilter(filters) {
    this.#productsFiltred = this.products;
    const activeFilters = this.#activeFilters;

   

    Object.keys(filters)
  .forEach(function eachKey(key) { 
    activeFilters[key] = filters[key];
  });

    if (activeFilters.noNuts) {
      this.#productsFiltred = this.#productsFiltred.filter((product) => product.nuts === false || product.nuts === undefined);
      
    }

    if (activeFilters.vegeterianOnly) {
      this.#productsFiltred = this.#productsFiltred.filter((product) => product.vegeterian === true);
    }

    if (activeFilters.maxSpiciness) {
      this.#productsFiltred = this.#productsFiltred.filter((product) => product.spiciness <= activeFilters.maxSpiciness);
    }

    if (activeFilters.category) {
      this.#productsFiltred = this.#productsFiltred.filter((product) => product.category === activeFilters.category);
    }


    this.#container.innerHTML = '';
    this.createProductElements(this.#productsFiltred);
  }


  get elem() {
    return this.#elem;
  }
}
