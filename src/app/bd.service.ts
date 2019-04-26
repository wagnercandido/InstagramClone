import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';
import { element } from '@angular/core/src/render3';

@Injectable()
export class Bd {

    constructor(
        private progresso: Progresso
    ) { }

    publicar(publicacao) {

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((res: any) => {

                let nomeImage = res.key

                firebase.storage().ref()
                    .child(`imagens/${nomeImage}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        // Acompanhamento do progresso
                        (snapshot: any) => {
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot
                            // console.log('Progresso no service',snapshot);

                        },
                        // Caso dê algum erro
                        (error) => {
                            this.progresso.status = 'erro'
                        },
                        // Conclusão
                        () => {
                            this.progresso.status = 'concluido'
                        }
                    )
            })

    }

    public consultaPublicacoes(email: string): Promise<any> {

        return new Promise((resolve, reject) => {

            // Consultar publicações na database
            firebase.database().ref(`publicacoes/${btoa(email)}`)
                .orderByKey()
                .once('value')
                .then((snapshot) => {
                    // console.log(snapshot.val());
                    let publicacoes: Array<any> = []

                    snapshot.forEach((childSnapshot) => {

                        let publicacao = childSnapshot.val();
                        publicacao.key = childSnapshot.key;

                        publicacoes.push(publicacao)

                    })

                    // console.log(publicacoes)
                    // resolve(publicacoes);
                    return publicacoes.reverse()

                })
                .then((publicacoes) => {
                    // console.log(publicacoes);
                    
                    // Consultar a url da imagem
                    publicacoes.forEach( (publicacao) => {

                        firebase.storage().ref()
                            .child(`imagens/${publicacao.key}`)
                            .getDownloadURL()
                            .then((url) => {
                                publicacao.url_imagem = url;
    
                                // Consultar nome do usuário
                                firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                                    .once(`value`)
                                    .then((snapshot) => {
                                        publicacao.nome_usuario = snapshot.val().username
                                    })
                            })
                    })

                    resolve(publicacoes)
                })
        })

    }
}