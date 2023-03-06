import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnidadRecep } from '../../_model/unidadRecep';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnidadRecepService {
  url: string = `${environment.HOST_URL}/unidadRecep`;

  constructor(private http: HttpClient) {}

  listarPorId(id: string, token: string): Observable<UnidadRecep> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get<UnidadRecep>(`${this.url}/${id}`, { headers });
    return this.http.get<UnidadRecep>(`${this.url}/${id}`);
  }

  listar(token: string): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get<UnidadRecep>(`${this.url}/${id}`, { headers });
    return this.http.get<string>(`${this.url}`);
  }

  proceso(id: string, token: string): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get<UnidadRecep>(`${this.url}/${id}`, { headers });
    return this.http.get<string>(`${this.url}/proceso/${id}`).pipe(
      catchError((errorResponse) => {
        const message = errorResponse.error.text; // Obtiene el campo 'text' de la respuesta
        return throwError(message); // Lanza un error con el mensaje obtenido
      })
    );
  }

  update(UR: number, newProcess: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('UR', UR).set('newProcess', newProcess);
    return this.http.put(`${this.url}`, {}, { /*headers,*/ params });
  }
}
