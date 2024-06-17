import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from './admin/admin.component';
import { ArtistaComponent } from './artista/artista.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DiscoComponent } from './disco/disco.component';
import { LayoutComponent } from './layout/layout.component';
import { ListarDiscoComponent } from './listar-disco/listar-disco.component';
import { NotFoundComponent } from './not-found/not-found.component'; // Import your 404 component
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  // Redirect root path to 'layout/index' or any default route
  { path: '', redirectTo: 'layout/index', pathMatch: 'full' },

  // Define the layout route with child routes
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: 'index', component: IndexComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'artista', component: ArtistaComponent },
      { path: 'cliente', component: ClienteComponent },
      { path: 'disco', component: DiscoComponent },
      { path: 'listarDisco', component: ListarDiscoComponent },
      { path: 'cart', component: CartComponent },
    ]
    
  },
  // Wildcard route for undefined paths
  { path: '**', component: NotFoundComponent } // This catches any undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
