import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Inci-Front';

  constructor(
    /*private verificador: ServerConectionService,*/
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  //modal
  modal(
    titulo: string,
    texto: string,
    icono: SweetAlertIcon,
    navegation?: boolean,
    ruta?: string
  ) {
    if (icono == 'success') {
      Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (navegation) {
          const rutaActual = window.location.pathname;
        }
        return '';
      });
    } else {
      Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        showCancelButton: false,
        cancelButtonText: 'Ok',
      }).then((result) => {
        return '';
      });
    }
  }
}
