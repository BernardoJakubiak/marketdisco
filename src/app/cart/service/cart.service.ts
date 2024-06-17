import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { discoModel } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  discoService: any;

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  getDiscoByKey(key: any) {
    return this.db.object<discoModel>('carrinho/' + key).valueChanges();
  }

  salvarDisco(key: any) {
    this.getDiscoByKey(key).subscribe(
      disco => {
        this.db.list('disco').push(disco);  
      }
    ); 
  }

  buy(cartItems: any[]) {
    cartItems.forEach(async item => {
      const buyItem = {
        titulo: item.titulo,
        artista: item.artista,
        capa: item.capa,
        musicas: item.musicas,
        preco: item.preco
      } 
      this.db.list('vendidos').push(buyItem);
    });

    cartItems.forEach(async item => {
      await this.db.object('carrinho/' + item.key).remove();
    });
    return
  }

  async removeFromCart(key: any) {
    this.salvarDisco(key);
    return await this.db.object('carrinho/' + key).remove();
  }

  listCartItems() {
    return this.db.list('carrinho').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val() as discoModel
          }));
        })
      );
  }

  clearCart(cartItems: any[]) {
    cartItems.forEach(async item => {
      this.removeFromCart(item.key)
    });
    return
  }
}
