import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Bd } from '../../bd.service';
import * as firebase from 'firebase';
import { Progresso } from 'src/app/progresso.service';

import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-incluir-publicacoes',
  templateUrl: './incluir-publicacoes.component.html',
  styleUrls: ['./incluir-publicacoes.component.css']
})
export class IncluirPublicacoesComponent implements OnInit {

  @ViewChild('formulario') formulario: NgForm;
  
  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  email: String;
  imagem: any;

  progressoPublicacao: String = 'pendente';
  procentagemUpload: number;

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }

  publicar() {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })


    let continua = new Subject()
    continua.next(true)
    
    interval(1500).pipe(takeUntil(continua))
    .subscribe(() => {
      // console.log(this.progresso.status);
      // console.log(this.progresso.estado);
      this.progressoPublicacao = 'andamento'
      this.procentagemUpload = Math.round(( this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100)

      if(this.progresso.status === 'concluido') {
        this.progressoPublicacao = 'concluido'

        // emitir um evento do componente parent(home)
        this.atualizarTimeLine.emit()
        continua.next(false)
      }

    })

    
  }

  preparaImageUpload(evento: Event) {
    this.imagem = (<HTMLInputElement>evento.target).files
  }

}
