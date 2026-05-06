import { Component, OnInit } from '@angular/core';
import { Colaborador } from './interfaces/colaborador';
import { Division } from './interfaces/division';
import { DivisionService } from './services/division.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend-app';

  //Variables - Listas
  colaboradores: Colaborador[] = [];
  divisiones: Division[] = [];

  //Consturctores
  constructor(private divisionService: DivisionService) {}

  //Función:
  ngOnInit(): void {

    //Llamar al servicio de Divisiones
    this.divisionService.getDivisiones().subscribe({
      next: (data) => {
        this.divisiones = data;
        console.log('Divisiones cargadas correctamente:', data);
      },
      error: (err) => console.error('Error al cargar divisiones:', err)
    });

    //Llamar al servicio de colaboradores - temporal para pruebas
    this.divisionService.getColaboradores().subscribe({
      next: (data) => this.colaboradores = data
    });
  }

  //---------------------------------------- Eventos ----------------------------------------
  //Filtrar-Buscar
  buscar(event: any): void {
    const valor = event.target.value;
    
    this.divisionService.getDivisionesFiltradas(valor).subscribe({
      next: (data) => {
        this.divisiones = data; //Actualiza la tabla con el filtro
      },
      error: (e) => console.error('Error en el filtro:', e)
    });
  }
}

