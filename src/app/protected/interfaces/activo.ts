export interface Asset {
    id_activo?: string,
    area?: string,
    edificio?: string,
    piso?: string,
    tipo?: string,
    usuario_red?: string,
    hostname?: string,
    direccion_mac?: string,
    direccion_ip?: string,
    reservada_ip?: string,
    id_ultimatix?: string,
    fecha_registro?: string,
    fecha_entrega?: string,
    fecha_devolucion?: string,
    estado?: boolean,
    borrado_logico?: boolean
}

export interface AssetType {
    id?: number,
    nombre?: string,
}