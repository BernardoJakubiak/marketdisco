import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { usuarioModel } from '../model/model';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  getUsuarioByKey(key: any) {
    return this.db.object<usuarioModel>('usuario/' + key).snapshotChanges()
    .pipe(
      map(changes => {
        const data = changes.payload.val() as usuarioModel;
        const key = changes.key;
        return { key, ...data };
      })
    );
  }

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
 
  async editarUsuario(key: any, nome: string, senha: string, email: string, sexo: string, cpf: string): Promise<void> {
    try {
      await this.db.object('usuario/' + key).update({
        nome: nome,
        senha: senha,
        email: email,
        sexo: sexo,
        cpf: cpf
      });
      console.log('Usuario atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar o usuario:', error);
      throw error; // Optionally rethrow the error or handle it as needed
    }
  }  
}