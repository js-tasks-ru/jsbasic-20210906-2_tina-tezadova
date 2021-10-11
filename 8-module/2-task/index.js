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
    const container = productGrid.querySelector('.products-grid__inner');
    products.map((product) => {
      const card = new ProductCard(product);
      container.append(card.elem);
    });


    return productGrid;
  }

  updateFilter(filters) {
    const container = document.querySelector('#container');
    let newRender = null;
    this.#productsFiltred = this.products;
    const activeFilters = this.#activeFilters;

   

    Object.keys(filters)
  .forEach(function eachKey(key) { 
    activeFilters[key] = filters[key];
  });

    if (activeFilters.noNuts) {
      this.#productsFiltred = this.#productsFiltred.filter((product) => product.nuts === true);
      
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

    newRender = this.render(this.#productsFiltred);
    container.removeChild(container.firstChild);
    container.append(newRender);
    


  }


  get elem() {
    return this.#elem;
  }
}
