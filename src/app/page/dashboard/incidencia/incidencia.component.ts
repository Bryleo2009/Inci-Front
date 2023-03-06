import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UnidadRecepService } from '../../../_service/modelos/unidad-recep.service';
import { AppComponent } from '../../../app.component';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import {
  Observable,
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { NgbTypeahead, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject, merge } from 'rxjs';
import { UnidadRecep } from '../../../_model/unidadRecep';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.css'],
})
export class IncidenciaComponent implements OnInit {
  constructor(
    private server: UnidadRecepService,
    private general: AppComponent
  ) {}

  options: string[] = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];
  form!: FormGroup;
  procesos!: FormGroup;
  ngOnInit(): void {
    this.selectedOption = '';
    this.server.listar('').subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          this.options.push(data[i]);
        }
      },
      (error) => {
        this.general.modal('Advertencia', error.error.mensaje, 'error');
      }
    );
    this.procesos = new FormGroup({
      inputBUR: new FormControl({
        value: '',
        disabled: true,
      })
    });
    this.form = new FormGroup({
      selected: new FormControl({
        value: this.selected,
        disabled: false,
      }),
      inputNR: new FormControl({
        value: '',
        disabled: false,
      }),
      inputNP: new FormControl({
        value: '',
        disabled: false,
      }),
      inputNF: new FormControl({
        value: '',
        disabled: false,
      }),
      inputTD: new FormControl({
        value: '',
        disabled: false,
      }),
      inputNC: new FormControl({
        value: '',
        disabled: false,
      }),
    });
  }

  //buscador autocompletado
  selected = new FormControl();
  filter = '';
  formatter = (result: string) => result;
  search = (text$: Observable<string>) =>
    text$.pipe(
      map((term) =>
        term.length < 2
          ? []
          : this.options
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  //evualodr de existencia de UR;
  unaUnidad = new UnidadRecep();
  evaluar() {
    this.unaUnidad.unidad_recepcion = this.form.value['inputNR'];    
    this.unaUnidad.nro_alterno = this.form.value['inputNP'];
    this.unaUnidad.nro_caja = this.form.value['inputNC'];
    this.unaUnidad.nro_folio = this.form.value['inputNF'];
    this.unaUnidad.nombre = this.form.value['inputTD'];
    console.table(this.unaUnidad);
  }


  //limpiuar inputs
  @ViewChild('inputSelected') inputSelected!: ElementRef; // obtiene una referencia al elemento del DOM del input
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 8) { // comprueba si la tecla presionada es "Backspace"
      this.form.get('inputNR')?.setValue('');
      this.form.get('inputNP')?.setValue('');
      this.form.get('inputNF')?.setValue('');
      this.form.get('inputTD')?.setValue('');
      this.form.get('inputNC')?.setValue('');
      this.procesos.get('inputBUR')?.setValue('');
      this.selectedOption = '';
    }
  }


  //lipiar todo
  clear(){
    this.form.get('inputNR')?.setValue('');
    this.form.get('inputNP')?.setValue('');
    this.form.get('inputNF')?.setValue('');
    this.form.get('inputTD')?.setValue('');
    this.form.get('inputNC')?.setValue('');
    this.procesos.get('inputBUR')?.setValue('');
    this.selectedOption = '';
    this.form.get('selected')?.setValue('');
  }




  selectedOption!: string;
  idUR!:number;
  ///relleno de datos automaticods
  onInputChange() {
    if (this.filter.length > 5) {
      this.server.listarPorId(this.filter, '').subscribe((data) => {
        this.form.get('inputNR')?.setValue(data.unidad_recepcion);
        this.form.get('inputNP')?.setValue(data.nro_alterno);
        this.form.get('inputNF')?.setValue(data.nro_folio);
        this.form.get('inputTD')?.setValue(data.nombre);
        this.form.get('inputNC')?.setValue(data.nro_caja);
        this.idUR = data.Id;
      });
      this.server.proceso(this.filter, '').subscribe(
        (error) => {
        },
        (data) => {
          this.procesos.get('inputBUR')?.setValue(data);
          this.selectedOption = data;
        }
      );
    }
  }



  //cambio de proceso
  @ViewChild('selectElement') selectElement: any;
  isLoading = false;
  cambiar(){
    const selectedOption = this.selectElement.nativeElement.value;
    Swal.fire({
      title: 'Advertencia',
      text: "¿Esta seguro que desea realizar el cambio?",
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.server.update(this.idUR,selectedOption,'').subscribe(()=>{
          this.isLoading = false;
          this.clear();
          Swal.fire({
            title: '',
            text: 'Proceso modificado con éxito',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          })
        },(error) => {
          console.log(error);
          this.isLoading = false;
          this.general.modal('Advertencia',error.error.mensaje,'error');
        });

      }
    });


    
  }


}
