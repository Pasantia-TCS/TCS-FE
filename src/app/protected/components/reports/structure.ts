import { Asset } from "../../interfaces/activo";
import { Assignment } from "../../interfaces/asignacion";
import { Team } from "../../interfaces/equipo";
import { Profile } from "../../interfaces/profile";

export const assetColumns = [
  {
    columnDef: 'id_ultimatix',
    header: 'Ultimatix',
    cell: (element: Asset) => `${element.id_ultimatix}`,
  },
  {
    columnDef: 'tipo',
    header: 'Activo',
    cell: (element: Asset) => `${element.tipo}`,
  },
  {
    columnDef: 'edificio',
    header: 'Edificio',
    cell: (element: Asset) => `${element.edificio}`,
  },
  {
    columnDef: 'codigo_barras',
    header: 'Código de activo',
    cell: (element: Asset) => `${element.codigo_barras}`,
  },
  {
    columnDef: 'fecha_entrega',
    header: 'Fecha de adjudicación',
    cell: (element: Asset) => `${element.fecha_entrega}`,
  },
  {
    columnDef: 'fecha_devolucion',
    header: 'Fecha de devolución',
    cell: (element: Asset) => element.fecha_devolucion ? `${element.fecha_devolucion}` : '-',
  },
  {
    columnDef: 'estado',
    header: 'Estado',
    cell: (element: Asset) => element.estado ? 'Devuelto' : 'En uso',
  }
];

export const teamColumns = [
  {
    columnDef: 'nombre_equipo_asi',
    header: 'Equipo',
    cell: (element: Team) => `${element.nombre_equipo_asi}`,
  },
  {
    columnDef: 'tipo_equipo_asi',
    header: 'Tipo',
    cell: (element: Team) => `${element.tipo_equipo_asi}`,
  },
  {
    columnDef: 'descripcion_asi',
    header: 'Descripcion',
    cell: (element: Team) => `${element.descripcion_asi}`,
  },
  {
    columnDef: 'nombre_lider',
    header: 'Líder técnico',
    cell: (element: Team) => `${element.nombre_lider}`,
  },
  {
    columnDef: 'nombre_tecnico',
    header: 'Líder técnico',
    cell: (element: Team) => `${element.nombre_tecnico}`,
  },
  {
    columnDef: 'estado_asi',
    header: 'Estado',
    cell: (element: Team) => element.estado_asi ? 'Vigente' : 'No vigente',
  }
];

export const assignmentColumns = [
  {
    columnDef: 'ultimatix_asi',
    header: 'Ultimatix',
    cell: (element: Assignment) => `${element.ultimatix_asi}`,
  },
  {
    columnDef: 'nombre_equipo_asi',
    header: 'Equipo',
    cell: (element: Assignment) => `${element.nombre_equipo_asi}`,
  },
  {
    columnDef: 'tipo_equipo_asi',
    header: 'Tipo',
    cell: (element: Assignment) => `${element.tipo_equipo_asi}`,
  },
  {
    columnDef: 'asignacion',
    header: 'Asignación (%)',
    cell: (element: Assignment) => `${element.asignacion}`,
  },
  {
    columnDef: 'fecha_inicio',
    header: 'Fecha de inicio',
    cell: (element: Assignment) => `${element.fecha_inicio}`,
  },
  {
    columnDef: 'fecha_fin',
    header: 'Fecha de finalización',
    cell: (element: Assignment) => `${element.fecha_fin}`,
  },
  {
    columnDef: 'fecha_baja',
    header: 'Fecha de salida',
    cell: (element: Assignment) => element.fecha_baja ? `${element.fecha_baja}` : '-',
  },
  {
    columnDef: 'estado',
    header: 'Estado',
    cell: (element: Assignment) => element.estado ? 'Vigente' : 'No vigente',
  }
];

export const profileColumns = [
  {
    columnDef: 'id_ultimatix',
    header: 'Ultimatix',
    cell: (element: Profile) => `${element.id_ultimatix}`,
  },
  {
    columnDef: 'nombres_completos',
    header: 'Nombre',
    cell: (element: Profile) => `${element.nombres_completos}`,
  },
  {
    columnDef: 'habilidades',
    header: 'Habilidades Técnicas',
    cell: (element: Profile) => `${element.habilidades}`,
  },
  {
    columnDef: 'nivel_habilidad',
    header: 'Nivel habilidad técnica',
    cell: (element: Profile) => `${element.nivel_habilidad}`,
  },
  {
    columnDef: 'habilidades_funcionales',
    header: 'Habilidades Funcionales',
    cell: (element: Profile) => `${element.habilidades_funcionales}`,
  },
  {
    columnDef: 'nivel_habilidad_funcional',
    header: 'Nivel habilidad funcional',
    cell: (element: Profile) => `${element.nivel_habilidad_funcional}`,
  },
  {
    columnDef: 'aplicaciones',
    header: 'Aplicaciones',
    cell: (element: Profile) => `${element.aplicaciones}`,
  },
  {
    columnDef: 'nivel_aplicaciones',
    header: 'Nivel aplicaciones',
    cell: (element: Profile) => `${element.nivel_aplicaciones}`,
  },
];
