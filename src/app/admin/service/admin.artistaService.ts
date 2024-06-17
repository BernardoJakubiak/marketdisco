import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { artistaModel } from '../model/model';


@Injectable({
  providedIn: 'root'
})

export class ArtistaService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  getArtistaByKey(key: any) {
    return this.db.object<artistaModel>('artista/' + key).snapshotChanges()
    .pipe(
      map(changes => {
        const data = changes.payload.val() as artistaModel;
        const key = changes.key;
        return { key, ...data };
      })
    );
  }

  salvarArtista(artista: artistaModel) { 
    return this.db.list('artista').push(artista);   
  }

  listarArtista(){
      return this.db.list('artista').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c =>({ key: c.payload.key,
            ...c.payload.val() as artistaModel }));
        })
      )
  }

  excluirArtista(key: any) {
    return this.db.object('artista/' + key).remove();
  }
 
  async editarArtista(key: any, nome: string, albuns: string): Promise<void> {
    try {
      await this.db.object('artista/' + key).update({
        nome: nome,
        albuns: albuns,
      });
      console.log('Artista atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar o artista:', error);
      throw error; // Optionally rethrow the error or handle it as needed
    }
  }  
}