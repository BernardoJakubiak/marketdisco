import { Inject, Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { response } from "express";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { update } from "firebase/database";
import { Observable, from } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
   firebaseAuth =  Inject(Auth)

    register(email: string, nome: string, password: string): Observable<void> { 
        const promise = createUserWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password,
        ).then(response => updateProfile(response.user, {displayName: nome}));

        return from(promise);
    }
}