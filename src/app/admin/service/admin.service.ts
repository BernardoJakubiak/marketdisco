import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { discoModel } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class DiscoService {

  private disco: any;

  setDisco(disco: any) {
    this.disco = disco;
  }

  getDisco() {
    return this.disco;
  }

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

  salvarDisco(disco: discoModel) { 
    return this.db.list('disco').push(disco);   
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
  
  excluirDisco(key: any) {
    return this.db.object('disco/' + key).remove();
  }

  async editarDisco(key: any, titulo: string, artista: string, capa: string, musicas: string, preco: number): Promise<void> {
    try {
      await this.db.object('disco/' + key).update({
        titulo: titulo,
        artista: artista,
        capa: capa,
        musicas: musicas,
        preco: preco
      });
      console.log('Disco atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar o disco:', error);
      throw error; // Optionally rethrow the error or handle it as needed
    }
  } 
}