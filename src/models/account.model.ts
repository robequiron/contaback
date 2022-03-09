/**
 * Plan de cuentas
 */
export class AccountModel {

    /**
     * Código cuenta contable
     */
    public account:number=0;

    /**
     * Identificador grupo contable
     */
    public _idSubgrupo:string='';

    /**
     * Nombre de la cuenta contable
     */
    public name:String='';

    /**
     * Tipo de cuenta "B" cuenta de Balance "RP" cuenta de perdidas "RG" cuenta de ganancias y 
     * "A" cuenta analítica 
     */
    public type:string = 'B';

    /**
     * Constructor
     */
    constructor(){}


}