import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Autenticacao } from '../../autenticacao.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @ViewChild('formulario') formulario: NgForm;

  @Output() exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  exibirPainelCadastro() {
    this.exibirPainel.emit('cadastro');
  }

  autenticar() {
    console.log(this.formulario);
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    ) 
  }

  resetPassword() {
    this.autenticacao.resetarSenha(this.formulario.value.email)
  }

}
