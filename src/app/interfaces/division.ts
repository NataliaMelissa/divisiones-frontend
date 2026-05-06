export interface Division {
    id?: number; // Generado por la BD
    nombre: string;
    padreId?: number | null;  //Relación jerárquica
    embajador?: string;

    // Campos de apoyo para la tabla (calculados en backend)
    nivel: number;
    totalColaboradores?: number;
    totalSubdivisiones?: number;
    divisionSuperiorNombre?: string;
}