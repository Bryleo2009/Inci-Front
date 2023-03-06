import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { IncidenciaComponent } from './page/dashboard/incidencia/incidencia.component';
import { LoginComponent } from './page/login/login.component';
import { AuthGuard } from './_service/rutas/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dash', component: DashboardComponent, canActivate: [AuthGuard],children: [
    { path: '', component: IncidenciaComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
