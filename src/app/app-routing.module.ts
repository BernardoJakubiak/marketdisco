import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from './admin/admin.component';
import { ArtistaComponent } from './artista/artista.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DiscoComponent } from './disco/disco.component';
import { LayoutComponent } from './layout/layout.component';
import { ListarDiscoComponent } from './listar-disco/listar-disco.component';

const routes: Routes = [
  {path: 'layout', component: LayoutComponent,
    children: [
      {path: 'index', component: IndexComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'artista', component: ArtistaComponent},
      {path: 'cliente', component: ClienteComponent},
      {path: 'disco', component: DiscoComponent},
      {path: 'listarDisco', component: ListarDiscoComponent}
    ]
  },
  {path: 'listar-disco', component: ListarDiscoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
