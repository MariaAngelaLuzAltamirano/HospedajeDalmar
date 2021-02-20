import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { AdminRoutingModule } from './admin-routing.module';
import { ContactComponent } from './pages/contacts/contact.component';
import { MaterialModule } from './../../material.module';
import { PanelComponent } from './pages/panel/panel.component';


@NgModule({
  declarations: [ContactComponent, PanelComponent],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    MaterialModule
  ],
  exports: [ContactComponent, PanelComponent],
})
export class AdminModule { }
