import { Component, OnInit } from '@angular/core';
import { activo } from '../../interfaces/activo'

@Component({
    selector: 'p-table',
    templateUrl: './table.component.html'
})
export class TableBasic implements OnInit {

    tableData1: any[] =  [
        { id_activo: "17", area: "Seguridad", edificio: "Inluxor", piso: "2", tipo: "Computador", usuario_red: "@networkuser", hostname: "hostname", direccion_mac: "10:FF:C3:65:E4:60", direccion_ip: "172.16.1.0", reservada_ip: "false", id_ultimatix: "0000000"},
        { id_activo: "18", area: "CTB", edificio: "Centrum", piso: "3", tipo: "Computador", usuario_red: "@networkuser", hostname: "hostname", direccion_mac: "10:FF:C3:65:E4:61", direccion_ip: "172.16.1.1", reservada_ip: "false", id_ultimatix: "0000000"},
        { id_activo: "19", area: "IT", edificio: "Luxor", piso: "4", tipo: "Computador", usuario_red: "@networkuser", hostname: "hostname", direccion_mac: "10:FF:C3:65:E4:62", direccion_ip: "172.16.1.2", reservada_ip: "false", id_ultimatix: "0000000"},
    
    ]

    tableKey: any = [];
    tableValue: any = [];
    getData(){
        this.tableData1.forEach((element: any) => {
            this.tableKey = Object.keys(element);
            this.tableValue.push(Object.values(element));
           // console.log(element)
        });
        //console.log(this.tableKey)
        //console.log(this.tableValue)
    }


    constructor() { 
        this.getData(); 
    }

    ngOnInit(): void {
    }  
}
