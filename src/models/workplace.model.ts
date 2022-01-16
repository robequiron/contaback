/**
 * Centros de trabajo
 */
export class workplaceModel {

    /**
     * Identificador del centro de trabajo
     */
    _id:string = '';

    /**
     * Identificado de la cuenta
     */
    _idCuenta:string ='';

    /**
     * Código del centro de trabajo 2 dígitos
     */
    code:number=0;

    /**
     * Nombre del centro de trabajo
     * @example 'Hotel Gorrion' 'Hotel Villa'
     */
    name:string='';

    /**
     * Sede 
     * Centro de trabajo, cede principal
     */
    headquarters:boolean=false;


    constructor() {}


};