import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtocoloComponent } from '../covid/pages/protocolo/protocolo.component';
import { HomeComponent } from '../home/pages/home/home.component';
// import { CreateComponent } from '../productos/create/create.component';
import { ProductosComponent } from '../productos/pages/productos/productos.component';
import { PromocionesComponent } from '../promociones/pages/promociones/promociones.component';
import { ContactComponent } from './pages/contacts/contact.component';
import { PanelComponent } from './pages/panel/panel.component';

const routes: Routes = [
  {
    path: '', component: PanelComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: { modo: 'admin'}
      },
      {
        path: 'productos',
        component: ProductosComponent,
        data: { modo: 'admin'}
      },
      {
        path: 'promociones',
        component: PromocionesComponent,
        data: { modo: 'admin'}
      },
      {
        path: 'covid',
        component: ProtocoloComponent,
        data: { modo: 'admin'}
      },
      {
        path: 'contactos',
        component: ContactComponent,
      },

      // {
      //   path: 'productos/nuevo',
      //   component: CreateComponent,
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
