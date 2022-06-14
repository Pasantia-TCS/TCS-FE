import {Skills} from "../../interfaces/profile";
import {Building} from "../../interfaces/edificio";

export const buildingColumns = [
  {
    columnDef: 'actions',
    header: 'Acciones',
    cell: () => 'delete'
  },
  {
    columnDef: 'nombre',
    header: 'Edificios',
    cell: (element: Building) => element.nombre
  },
  {
    columnDef: 'piso',
    header: 'Pisos',
    cell: (element: Building) => element.piso
  }
]

export const structure = (type: string) => {
  return [
    {
      columnDef: 'actions',
      header: 'Acciones',
      cell: () => 'delete'
    },
    {
      columnDef: 'nombre',
      header: type,
      cell: (element: Skills) => element.nombre
    }];
}
