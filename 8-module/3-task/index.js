export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product) {
      const ittem = this.cartItems.find((it) => it.product.id === product.id);
      if (ittem) {
        this.cartItems.map((item) => {
          if (item.product.id === ittem.product.id) {
            item.count += 1;
          }
        });
      } else {
        this.cartItems.push({
          product: product,
          count: 1
        });
      }
    } else {
      return;
    }
    
    

    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    this.cartItems.map((item => {
      if (item.product.id === productId) {
        item.count += amount;
        if (item.count === 0) {
          this.cartItems = this.cartItems.filter((item)=> item.product.id !== productId);
        }
      }
    }));

    
    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.map((item)=> {
      totalCount += item.count;
    });

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.map((item)=> {
      totalPrice += (item.product.price * item.count);
    });

    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

