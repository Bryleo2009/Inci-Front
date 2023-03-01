import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { IncidenciaComponent } from './page/dashboard/incidencia/incidencia.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: IncidenciaComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
