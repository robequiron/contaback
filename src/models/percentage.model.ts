/**
 * Clase modelo porcentajes de un impuesto
 * 
 */
 export class Percentage {
    
    /**
     * Identificador del porcentaje
     */
    _id:string='';

    /**
     * Nombre de porcentage del impuesto
     */
    name:string;

    /**
     * Porcentaje de impuesto
     */
    percentage:number=0;

    /**
     * Fecha de se inicia la aplicación del impuesto
     */
    dateInt:Date;

    /**
     * Fecha que finaliza la aplicación del impuesto
     */
    dateEnd: Date;

    /**
     * Constructor
     */
    constructor(name:string){
        this.name=name;
        this.dateInt = new Date();
        this.dateEnd = new Date('2099-01-01');
    }



}