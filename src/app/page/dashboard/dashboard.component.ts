import { Component } from '@angular/core';
import { AuthService } from '../../_service/rutas/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private almacen: AuthService,private router: Router, private http: HttpClient){}
 //cierre de sesion
 signOff(){
  this.almacen.removeAll();
  this.router.navigateByUrl('/');
}
}
