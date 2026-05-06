import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../interfaces/colaborador';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private baseUrl = 'https://divisiones-backend.onrender.com'; //URL Base del Backend

  constructor(private http: HttpClient) { }

  //Observables
  getDivisiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/division`);
  }

  getColaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.baseUrl}/colaborador`);
  }
}
