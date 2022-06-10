export interface Profile {
  id_ultimatix?: number,
  sobreMi?: string,
  habilidades?: string[],
  habilidadeS_funcionales?: string[],
  aplicaciones?: string[],
  nivel_habilidad?: string[],
  nivel_habilidad_funciona?: string[],
  nivel_aplicaciones?: string[],
  usuario_red?: string,
  asignacion_usuario?: number,
  nombres_completos?: string,
  rol?: string,
  estado?: string,
  mensaje?: string,
  status?: string,
  timestamp?: string,
}

export interface Skills {
  id: number,
  nombre: string
}