import { Component, OnInit } from '@angular/core';
import { style, trigger, state, transition, animate } from '@angular/animations';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'visivel';

  imagens: Array<Imagem> = [
    { estado: 'escondido', url: '/assets/banner-acesso/img_1.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_2.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_3.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_4.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_5.png' }
  ]

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.logicaRotacao(), 2000);
  }

  logicaRotacao() {

    // let idx: number;

    // for (let i: number = 0; i <= 4; i++) {
    //   if (this.imagens[i].estado === 'visivel') {
    //     this.imagens[i].estado = 'escondido'
    //     idx = i === 4 ? 0 : i + 1;
    //     break
    //   }
    // }

    // this.imagens[idx].estado = 'visivel';

      const i = this.imagens.findIndex(i => i.estado === 'escondido');
      this.imagens[i].estado = 'visivel';
      this.imagens[(i === this.imagens.length - 1 ? 0 : i + 1)].estado = 'escondido';
      setTimeout(() => this.logicaRotacao(), 2000);
  }

}
