export class Product{
    id?: string;
    name?: string;
    picture?: string;
    price?: number;
    stock?: string;
    discount?: string;
  
    constructor(id?: string, product: Product = {}) {
      this.id = id;
      this.name = product.name;
      this.price = product.price
      this.picture = product.picture;
      this.stock = product.stock;
      this.discount = product.discount;
    }
  }