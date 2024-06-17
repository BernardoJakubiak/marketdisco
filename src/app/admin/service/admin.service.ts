import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { discoModel } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class DiscoService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  salvarDisco(disco: discoModel) { 
    return this.db.list('disco').push(disco);   
  }

  listarDisco(){
      return this.db.list('disco').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c =>({ key: c.payload.key,
            ...c.payload.val() as discoModel }));
        })
      )
  }
}
