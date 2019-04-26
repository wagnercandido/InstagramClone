import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Autenticacao {

    token_id: String;

    constructor(
        private router: Router
    ){}

    cadastrarUsuario(usuario: Usuario): Promise<any> {
        console.log('user do servico - ',usuario);
        
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((res) => {
                // console.log('then',res);
                // Remove senha para enviar - no caso se já haver o usuário
                delete usuario.senha;

                // Registrado todos os dados do usuário no firebase
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)
            })
            .catch((err: Error) => {
                console.log('catch',err);
            })
    }

    autenticar(email: string, senha: string) {
        console.log('dados do formulario: ',email,senha);
        console.log('token inicial', this.token_id);
        
        
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((res) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken',idToken)
                        this.router.navigate(['/home'])
                    })
            })
            .catch((err: Error) => console.log('error',err))
    }

    autenticado(): boolean {

        if(localStorage.getItem('idToken') !== null && this.token_id === undefined) {
            this.token_id = localStorage.getItem('idToken');
        }

        if (this.token_id === undefined) {
            this.router.navigate(['/']);
        }

        return this.token_id !== undefined;
    }

    sair() {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken');
                this.token_id = undefined;
                this.router.navigate(['/'])
            })
    }

    resetarSenha(email) {
        firebase.auth().sendPasswordResetEmail(email)
    }
}