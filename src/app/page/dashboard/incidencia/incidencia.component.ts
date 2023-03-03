import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UnidadRecepService } from '../../../_service/modelos/unidad-recep.service';
import { AppComponent } from '../../../app.component';
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
        disabled: false,
      }),
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

  //evualodr de existencia de UR
  disableSelect = new FormControl(false);
  evaluar() {}

  ///relleno de datos automaticods
  onInputChange() {
    console.log(
      '🔥 > IncidenciaComponent > onInputChange > this.filter:',
      this.filter
    );
    if (this.filter.length > 3) {
      this.server.listarPorId(this.filter, '').subscribe((data) => {
        this.form.get('inputNR')?.setValue(data.unidad_recepcion);
        this.form.get('inputNP')?.setValue(data.nro_alterno);
        this.form.get('inputNF')?.setValue(data.nro_folio);
        this.form.get('inputTD')?.setValue(data.nombre);
        this.form.get('inputNC')?.setValue(data.nro_caja);
        console.log(
          '🔥 > IncidenciaComponent > this.server.listarPorId > data:',
          data
        );
      });
      this.server.proceso(this.filter, '').subscribe(
        (error) => {
          console.log('log');
        },
        (data) => {
          this.procesos.get('inputBUR')?.setValue(data);
        }
      );
    }
  }
}
