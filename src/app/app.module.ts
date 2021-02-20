import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './core/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage'
import { environment} from '../environments/environment';
import { ContainerAppComponent } from './container-app/container-app.component';
import { HammerModule } from '@angular/platform-browser';
import { OwlModule } from 'ngx-owl-carousel';



@NgModule({
  declarations: [
    AppComponent,
    ContainerAppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    HttpClientModule,
    LayoutModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    HammerModule,
    OwlModule
  ],
  // entryComponents: [ModalComponent],
  providers: [
    { provide: BUCKET, useValue: 'gs://hospedaje-dalmar.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}