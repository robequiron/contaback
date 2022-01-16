export class ConfigModel {

    /**
     * Identificador 
     */
    _id:any;

    /**
     * Nombre de la empresa
     */
    name:string = "";

    /**
     * Nif de la empresa
     */
    nif:string = ""

    /**
     * Tipo de nif
     */
    codeNif:number=1;

    /**
     * Trabajar con más de un centro de trabajo
     */
    workplace:boolean = false;

    /**
     * Trabajar con más de un centro de trabajo en la cuentas personales
     */
    workplaceCuenta:boolean=false;

    constructor(){
        
    }
}