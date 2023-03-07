import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Login } from '../../_model/login';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { AuthService } from '../../_service/rutas/auth.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../_service/util/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(public login: LoginService,
    private general: AppComponent,
    private router: Router,
    private http: HttpClient,
    private almacen: AuthService,){}


    ngAfterViewInit(): void {
      // Código JavaScript aquí
      var creditaje = 'ofsystem';
      var link = 'https://bryleo2009.github.io/Creditaje-OfSystem/';
      var text = '© Todos los derechos reservados - 2023';
      var element = document.querySelector('.s-footer-social-copy');
      element!.innerHTML = '<' + creditaje + '>' +
        '<a href=' + '"' + link + '"' + 'target="_blank" >' + text +
        '</a>' +
        '</' + creditaje + '>';
    }

 //hacer que funcione el login
 form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      usuario: new FormControl({
        value: '',
        disabled: false,
      }),
      contra: new FormControl({
        value: '',
        disabled: false,
      }),
    });
  }

  //verificar user de login
  unUsuario = new Login();
  mensajeError!: string;
  evaluar() {
    this.unUsuario.dni = this.form.value['usuario'];
    this.unUsuario.password = this.form.value['contra'];
    this.login.ingresar(this.unUsuario).subscribe(
      async (data) => {
        const token = (data as { token: string }).token;
        console.log("🔥 > LoginComponent > token:", token)
        this.almacen.setToken(token);
        this.router.navigateByUrl('/dash');
      },
      (error) => {
        this.mensajeError = error.error.mensaje;
        this.general.modal('Advertencia', this.mensajeError, 'error');
      }
    );
  }
}

