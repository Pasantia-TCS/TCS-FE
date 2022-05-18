export interface equipo {
    id_equipo?: string,
    nombre_equipo?: string,
    tipo?: number,
    descripcion?: string,
    miembros?: number[],
    lider_equipo?: string,
    lider_tecnico?: string,
    estado?: boolean,

    mensaje?: string,
    status?: string,
    timestamp?: string,
}
