export interface Asset {
    id_activo?: string,
    area?: string,
    edificio?: string,
    piso?: string,
    tipo?: string,
    hostname?: string,
    direccion_mac?: string,
    direccion_ip?: string,
    reservada_ip?: string,
    marca?: string,
    modelo?: string,
    serie?: string,
    codigo_barras?: string,
    borrado_logico?: boolean,
    estado?: boolean,
    fecha_registro?: string,
    fecha_entrega?: string,
    fecha_devolucion?: string,
    id_ultimatix?: string
}

export interface AssetType {
    id: number,
    nombre: string,
}