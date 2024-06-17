import { Component, OnInit } from '@angular/core';
import { CartService } from './service/cart.service';
import { discoModel } from './model/model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listarItems()
  }

  buy(): void {
    this.cartService.buy(this.cartItems)
    console.log('Purchase successful');
  }

  listarItems(): void {
    this.cartService.listCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(key: any) {
    this.cartService.removeFromCart(key).then(() => {
      this.listarItems();
    }).catch(error => {
      console.error("Erro ao remover item:", error);
      alert("Erro ao remover item!");
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.preco || 0), 0);
  }

  clearCart() {
    this.cartService.clearCart(this.cartItems);
    this.listarItems();
  }

}
