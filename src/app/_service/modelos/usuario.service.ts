import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../../_model/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  url:string = `${environment.HOST_URL}/usuarios`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<Login[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Login[]>(this.url, { headers });
  }

  listarPorId(id: string, token: string): Observable<Login> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Login>(`${this.url}/${id}`, { headers });
  }

  registrar(Login: Login, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,Login, { headers });
  }

  modificar(Login: Login, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,Login, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }


  byUsername(id: string, token: string): Observable<Login> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Login>(`${this.url}/byUsername/${id}`, { headers });
  }
}
