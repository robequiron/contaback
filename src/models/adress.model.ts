export class AdresModel {

    /**
     * Identificador de la direccion
     */
    _id:string = '';

    /**
     * Identifficador de la cuenta
     */
    _idCuenta:string='';

    /**
     * Identificador del centro de trabajo
     */
    _idWorkplace:string='';

    /**
     * Identificador de la via
     */
    _idVia:string='';

    /**
     * Nombre de la via
     */
    nameVia:string='';

    /**
     * Número de la via
     */
    number:number=0;

    /**
     * Piso
     */
    flat:number=0;

    /**
     * Puerta
     */
    door:string='';

    /**
     * Código postal
     */
    postal:number=0;

    /**
     * Municipio
     */
    town:string='';

    /**
     * Others
     */
    other:string='';

    /**
     * Constructor
     */
    constructor(){}

}