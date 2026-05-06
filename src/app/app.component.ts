import { Component, OnInit } from '@angular/core';
import { Colaborador } from './interfaces/colaborador';
import { Division } from './interfaces/division';
import { DivisionService } from './services/division.service';

interface NzTableFilterItem {
  text: string;
  value: any;
  byDefault?: boolean;
}

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
  listOfFilter: NzTableFilterItem[] = []; //Lista para el filtro

  //Consturctores
  constructor(private divisionService: DivisionService) {}

  //Función:
  ngOnInit(): void {

    //Llamar al servicio de Divisiones
    this.divisionService.getDivisiones().subscribe({
      next: (data) => {
        this.divisionesMaster = data; //Guardar datos render
        this.divisionesFiltradas = data; //Al inicio mostrar todo

        const nombresUnicos = [...new Set(data.map(d => d.nombre))]; //Nombres filtro
        this.listOfFilter = nombresUnicos.map(nombre => ({ text: nombre, value: nombre })); //Filtro mapeado
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
    const term = this.searchValue.toLowerCase().trim(); //Formatear datos de búsqueda

    //Validar si el usuario borró la búsqueda
    if (!term) { //SI la borró => Restaurar la vista original
      this.divisionesFiltradas = [...this.divisionesMaster];
      return;
    }

    // Filtramos sobre la lista maestra para no perder datos
    this.divisionesFiltradas = this.divisionesMaster.filter(d =>
      d.nombre.toLowerCase().includes(term)
    );
  }

  //Filtro-Columna
  onFilterChange(filters: string[]): void {
    
    //Validar si hay algo seleccionado en el checklist
    if (filters.length === 0) { //NO hay nada seleccionado => Mostrar lo que diga el buscador
      this.filterData();
      return;
    }

    else { //NO hay nada seleccionado => Filtrar la lista con la de "Buscar" o la lista Master (no había nada en buscar)
      
      const baseList = this.searchValue ? this.divisionesFiltradas : this.divisionesMaster;
      this.divisionesFiltradas = baseList.filter(d => filters.includes(d.nombre));
    }
  }
}
