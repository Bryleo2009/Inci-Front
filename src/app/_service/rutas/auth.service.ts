import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private sessionStorage: SessionStorageService) {}

  //eliminar todo
  public removeAll () {
    this.removeToken();
    this.removeNick();
    this.removeGen();
    this.removeRol();
    this.removeUser()
  }


  //almacenar el token en la sesion
  public setToken(token: string): void {
    this.sessionStorage.store('token', token);
  }

  public getToken(): string {
    return this.sessionStorage.retrieve('token');
  }

  public removeToken(): void {
    this.sessionStorage.clear('token');
  }

  //almacenar el nick en la sesion
  public setNick(nick: string): void {
    this.sessionStorage.store('nick', nick);
  }

  public getNick(): string {
    return this.sessionStorage.retrieve('nick');
  }

  public removeNick(): void {
    this.sessionStorage.clear('nick');
  }

  //almacenar genero para foto
  public setGen(nick: string): void {
    this.sessionStorage.store('genero', nick);
  }

  public getGen(): string {
    return this.sessionStorage.retrieve('genero');
  }

  public removeGen(): void {
    this.sessionStorage.clear('genero');
  }

  //almacenar rol
  public setRol(nick: string): void {
    this.sessionStorage.store('rol', nick);
  }

  public getRol(): string {
    return this.sessionStorage.retrieve('rol');
  }

  public removeRol(): void {
    this.sessionStorage.clear('rol');
  }

  //alamcenar username
  public setUser(nick: string): void {
    this.sessionStorage.store('user', nick);
  }

  public getUser(): string {
    return this.sessionStorage.retrieve('user');
  }

  public removeUser(): void {
    this.sessionStorage.clear('user');
  }
}