export interface Profile {
  id_ultimatix?: number,
  sobreMi?: string,
  habilidades?: string[],
  nivel_habilidad?: string[],
  usuario_red?: string,
  asignacion_usuario?: number,
  nombres_completos?: string,
  rol?: string,

  mensaje?: string,
  status?: string, 
  timestamp?: string,
}

export interface Skills {
  id: number,
  nombre: string
}