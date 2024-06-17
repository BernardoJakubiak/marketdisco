import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { discoModel } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class Products {
  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  getDiscoByKey(key: string) {
    return this.db.object<discoModel>('disco/' + key).snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.val() as discoModel;
          const key = changes.key;
          return { key, ...data };
        })
      );
    }

  listarDisco() {
    return this.db.list('disco').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val() as discoModel
          }));
        })
      );
  }

  salvarProdutoNoCart(product: any) { 
    const newProduct = {
      titulo: product.titulo,
      artista: product.artista,
      capa: product.capa,
      musicas: product.musicas,
      preco: product.preco
    }
    return this.db.list('carrinho').push(newProduct);   
  }
  
  excluirProdutoDoCart(key: any) {
    return this.db.object('disco/' + key).remove();
  }

  addToCart(product: any) {
    this.salvarProdutoNoCart(product);
    this.db.object('disco/' + product.key).remove();
  }
}