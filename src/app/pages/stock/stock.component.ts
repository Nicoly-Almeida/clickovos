import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/model/product';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit{
  stock: Product[]

  constructor() {
    let items = localStorage.getItem('products')
    if (typeof items === 'string') {
      this.stock = JSON.parse(items)
    } else{
      this.stock = []
    }
  }
  
  ngOnInit(): void {
    
  }

  valueDiscount(price: any , discount: any){
    return (price - (price * discount/100))
  }

  totalProducts(){
    let total = 0
    this.stock.forEach(product => {
      total += this.valueDiscount(product.price, product.discount)
    })
    return total.toFixed(2)
  }
}
