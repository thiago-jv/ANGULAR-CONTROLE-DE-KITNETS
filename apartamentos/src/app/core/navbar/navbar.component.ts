import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Diário',
        icon: 'pi pi-file',
        items: [
            {label: 'Cadastro', icon: 'pi pi-plus', routerLink:['/diario']},
            {label: 'Pesquisa', icon: 'pi pi-search', routerLink:['/diarios']}
        ]
      },
        {
            label: 'Inquilino',
            icon: 'pi pi-user',
            items: [
                {label: 'Cadastro', icon: 'pi pi-plus', routerLink:['/inquilino']},
                {label: 'Pesquisa', icon: 'pi pi-search', routerLink:['/inquilinos']}
            ]
        },
        {
          label: 'Predio',
          icon: 'pi pi-home',
          items: [
              {label: 'Cadastro', icon: 'pi pi-plus',  routerLink:['/predio']},
              {label: 'Pesquisa', icon: 'pi pi-search', routerLink:['/predios']}
          ]
      },
      {
        label: 'Apartamento',
        icon: 'pi pi-home',
        items: [
            {label: 'Cadastro', icon: 'pi pi-plus',  routerLink:['/apartamento']},
            {label: 'Pesquisa', icon: 'pi pi-search', routerLink:['/apartamentos']}
        ]
    },
    {
      label: 'Valor',
      icon: 'pi pi-money-bill',
      items: [
          {label: 'Cadastro', icon: 'pi pi-plus',  routerLink:['/valor']},
          {label: 'Pesquisa', icon: 'pi pi-search', routerLink:['/valores']}
      ]
  },
{
  label: 'Controle',
  icon: 'pi pi-eye',
  items: [
      {label: 'Cadastro', icon: 'pi pi-plus',  routerLink:['/controle']},
      {label: 'Pesquisa', icon: 'pi pi-search', routerLink:['/controles']}
  ]
}
    ];
}

}
