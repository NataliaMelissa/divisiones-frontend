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
  searchValue = ''; //Valor para búsqueda
  colaboradores: Colaborador[] = [];
  divisionesMaster: Division[] = []; //Copia de Seguridad (Directamente del Backend)
  divisionesFiltradas: Division[] = []; //Lo que ve el usuario en la tabla

  //Consturctores
  constructor(private divisionService: DivisionService) {}

  //Función:
  ngOnInit(): void {

    //Llamar al servicio de Divisiones
    this.divisionService.getDivisiones().subscribe({
      next: (data) => {
        this.divisionesMaster = data; //Guardar datos render
        this.divisionesFiltradas = data; //Al inicio mostrar todo
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
  filterData(): void {
    const term = this.searchValue.toLowerCase().trim();

    if (!term) {
      this.divisionesFiltradas = [...this.divisionesMaster]; // Si borra todo, restauramos la lista
      return;
    }

    // Filtramos sobre la lista maestra para no perder datos
    this.divisionesFiltradas = this.divisionesMaster.filter(d =>
      d.nombre.toLowerCase().includes(term)
    );
  }
}

