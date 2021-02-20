import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerAppComponent } from './container-app/container-app.component';
import { AuthGuard } from './guardians/auth.guard';
const homeModule = () => import('./features/home/home.module').then(m => m.HomeModule);
const accountModule = () => import('./features/account/account.module').then(m => m.AccountModule);
const adminModule = () => import('./features/admin/admin.module').then(m => m.AdminModule);
const covidModule = () => import('./features/covid/covid.module').then(m => m.CovidModule);
const productosModule = () => import('./features/productos/productos.module').then(m => m.ProductosModule);
const promocionesModule = () => import('./features/promociones/promociones.module').then(m => m.PromocionesModule);

const routes: Routes = [
  {
    path: '', component: ContainerAppComponent,
    children: [

      {
        path: 'home',
        loadChildren: homeModule,
      },
    
      {
        path: 'productos',
        loadChildren: productosModule,
      },
    
      
      {
        path: 'promociones',
        loadChildren: promocionesModule,
      },
      
      
      {
        path: 'covid',
        loadChildren: covidModule,
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }

    ]
  },
  
  // {
  //   path: '**',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },  ESTO NO LO PUEDO USAR PORQUE NO SE CARGAN LAS DEMAS RUTAS QUE HAY ABAJO

  {
    path: 'login',
    loadChildren: accountModule,
  },
  
  {
    path: 'admin',
    loadChildren: adminModule,
    canActivate: [AuthGuard],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
