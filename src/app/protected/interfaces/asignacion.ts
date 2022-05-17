export interface asignacion {
    id_asg?: string,
    nombre_proyecto?: string,
    tipo_proyecto?: number,
    usuario_red?: string,
    asignacion?: number,
    fecha_inicio?: string,
    fecha_fin?: string,
    descripcion?: string,
    perfiles?: number[],
    nombre_lider?: string,
    nombre_tecnico?: string,
    estado?: boolean,

    mensaje?: string,
    status?: string,
    timestamp?: string,
    borrado_logico?: boolean

}
