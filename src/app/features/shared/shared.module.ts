import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../../material.module';

import { CarouselComponent } from './carousel/carousel.component';
import { ModalComponent } from './modales/carrusel/modal.component';
import { SubirImgComponent } from './modales/carrusel/subir-img/subir-img.component';
import { BorrarImgComponent } from './modales/carrusel/borrar-img/borrar-img.component';
import { NewProdComponent } from './modales/productos/new-prod/new-prod.component';
import { EditarProdComponent } from './modales/productos/editar-prod/editar-prod.component';
import { Modal2Component } from './modales/productos/modal2.component';
import { NewPromoComponent } from './modales/promociones/new-promo/new-promo.component';
import { EditPromoComponent } from './modales/promociones/edit-promo/edit-promo.component';
import { Modal3Component } from './modales/promociones/modal3.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { Modal4Component } from './modales/home/modal4.component';
import { Modal5Component } from './modales/covid/modal5.component';



@NgModule({
  declarations: [CarouselComponent, ModalComponent, SubirImgComponent, BorrarImgComponent, NewProdComponent, EditarProdComponent, Modal2Component, NewPromoComponent, EditPromoComponent, Modal3Component, LoadingScreenComponent, Modal4Component, Modal5Component],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CarouselComponent, ModalComponent, Modal2Component, Modal3Component, Modal4Component, Modal5Component, LoadingScreenComponent ]
})

export class SharedModule { }
