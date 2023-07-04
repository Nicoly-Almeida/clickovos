import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/model/product';
import { ProductsFirestoreService } from 'src/app/shared/services/products-firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductsFirestoreService, private route: Router) {
    this.products = new Array<Product>();
  }

  ngOnInit(): void {
    this.productService.listar().subscribe(
      products => {
        console.log(products)
        this.products = products
      }
    )
  }

  valueDiscount(price: any , discount: any){
    return (price - (price * discount/100))
  }

  addStock(product: Product){
    const itemsJSON = localStorage.getItem('products');
    let items = [];

    if (itemsJSON) {
      items = JSON.parse(itemsJSON);
    }
    
    items.push(product)

    window.localStorage.setItem('products', JSON.stringify(items))
    Swal.fire({
      icon: 'success',
      title: 'Produto adicionado ao carrinho com sucesso!',
      showConfirmButton: false,
      timer: 3000
    })
    this.route.navigate(['/stock'])

  }

}
