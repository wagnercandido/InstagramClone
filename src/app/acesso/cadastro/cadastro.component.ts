import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../usuario.model';
import { Autenticacao } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @ViewChild('formulario') formulario: NgForm;

  @Output() exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() {
  }

  exibirPainelLogin(){
    this.exibirPainel.emit('login')
  }


  cadastrarUsuario() {
    // console.log(this.formulario);

    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome,
      this.formulario.value.username,
      this.formulario.value.senha
    )

    // console.log(usuario);

    this.autenticacao.cadastrarUsuario(usuario)
      .then(() => this.exibirPainelLogin())
    
  }
}
