import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CovidRoutingModule } from './covid-routing.module';
import { ProtocoloComponent } from './pages/protocolo/protocolo.component';


@NgModule({
  declarations: [ProtocoloComponent],
  imports: [
    CommonModule,
    CovidRoutingModule
  ],
  exports: [ProtocoloComponent],
})
export class CovidModule { }
