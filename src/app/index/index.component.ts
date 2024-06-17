import { Component } from '@angular/core';
import { Products } from './service/index.products';
import { discoModel } from './model/model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  discos: any[] = [];

  constructor(
    private products: Products
  ) {}

  ngOnInit(): void {
    this.listarDiscos();
  }

  listarDiscos(): void {
    this.products.listarDisco().subscribe(
      discos => {
        this.discos = discos;
      });
  }

  addToCart(product: any): void {
    this.products.addToCart(product)
  }
}
