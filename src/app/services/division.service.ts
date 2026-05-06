import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../interfaces/colaborador';
import { Division } from '../interfaces/division';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private baseUrl = 'https://divisiones-backend.onrender.com'; //URL Base del Backend

  constructor(private http: HttpClient) { }

  //Observables - Get All
  getDivisiones(): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.baseUrl}/division`);
  }

  getColaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.baseUrl}/colaborador`);
  }

  //Observables - Filtros y Operaciones
  getColaboradoresFiltrados(termino: string): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.baseUrl}/colaborador?nombre=${termino}`);
  }

  getDivisionesFiltradas(termino: string): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.baseUrl}/division?nombre=${termino}`);
  }
}
