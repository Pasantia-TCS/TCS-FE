export interface asignacion {
    id_asignacion?: string,
    nombre?: string,
    tipo_proyecto?: idp,
    usuario_red?: string,
    asignacion?: number,
    fecha_inicio?: string,
    fecha_fin?: string,
    descripcion?: string,
    perfiles?: perfil[],
    nombre_lider?: string,
    nombre_tecnico?: string,
    estado?: boolean,

    mensaje?: string,
    status?: string,
    timestamp?: string,
    borrado_logico?: boolean

}

export interface idp {
    id_tipo_proyecto: number
}

export interface perfil {
    id_ultimatix: number
}

