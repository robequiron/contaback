import { Percentage } from "./percentage.model";
/**
 * Clase modelo tipos de impuestos
 */
export class TaxesModel {

    /**
     * Identificado Mongo
     */
    _id:string='';


    /**
     * Código del impuesto. Máximo 9
     */
    code:number=0;


    /**
     * Nombre del impuesto
     */
    name:string;

    /**
     * Array con los distintos porcentajes del impuesto
     */
    percentages:Percentage[]=[];
    
    /**
     * Constructor
     */
    constructor(code:number, name:string){
        this.code = code;
        this.name = name;
    }


}