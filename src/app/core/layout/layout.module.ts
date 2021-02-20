import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavListComponent} from './header/side-nav-list/side-nav-list.component';
import { MaterialModule } from './../../material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CarouselComponent } from './../../features/carousel/carousel.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, SideNavListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, FooterComponent, SideNavListComponent]
})
export class LayoutModule { }
