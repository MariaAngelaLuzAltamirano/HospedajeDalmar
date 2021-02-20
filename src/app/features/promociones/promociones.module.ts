import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromocionesRoutingModule } from './promociones-routing.module';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { MaterialModule } from './../../material.module';


@NgModule({
  declarations: [PromocionesComponent],
  imports: [
    CommonModule,
    PromocionesRoutingModule,
    MaterialModule
  ], 
  exports: [PromocionesComponent],
})
export class PromocionesModule { }
