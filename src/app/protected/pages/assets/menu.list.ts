export class MenuItem {
  constructor(
    public name: string,
    public route: string,
    public toolTip: string,
    public icon: string = ''
  ) { }
}

export const menuList = [
  new MenuItem('Activos', 'assets', 'Registro de activos', 'computer'),
  new MenuItem('Asignación', 'sinasignar', 'Asignación de proyectos', 'insert_chart_outlined'),
  new MenuItem('Formularios', 'sinasignar', 'Creación de formularios', 'developer_board'),
  new MenuItem('Cerrar sesión', '', 'Creación de formularios', 'exit_to_app'),
];