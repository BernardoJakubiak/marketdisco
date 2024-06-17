import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { discoModel, usuarioModel } from '../model/model';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  salvarUsuario(usuario: usuarioModel) { 
    return this.db.list('usuario').push(usuario);   
  }

  listarUsuario(){
      return this.db.list('usuario').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c =>({ key: c.payload.key,
            ...c.payload.val() as usuarioModel }));
        })
      )
  }

  excluirUsuario(key: any) {
    return this.db.object('usuario/' + key).remove();
  }
}