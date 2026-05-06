import { Component, OnInit } from '@angular/core';
import { Colaborador } from './interfaces/colaborador';
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

  //Consturctores
  constructor(private divisionService: DivisionService) {}

  //Función:
  ngOnInit(): void {
    //Llamar al servicio Colaboradores
    this.divisionService.getColaboradores().subscribe({
      next: (data) => {
        this.colaboradores = data; // Guardamos los datos que llegaron
        console.log('Datos recibidos:', data);
      },
      error: (e) => console.error('Error al llamar a Render:', e)
    });
  }
}

