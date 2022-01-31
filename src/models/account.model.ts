//Cuenta contables. 
export class Account {
    
    /**
     * Identificador
     */
    public _id:string = '';

    /**
     * Código de la cuenta contable. Ejemplo 43000000
     */
    public code:number = 0;

    /**
     * Nombre de la cuenta
     */
    public name:String = "";

    /**
     * Cuenta que admite cuenta personal (Sólo las cuentas de balance grupo 1 al 5)
     */
    public personal:Boolean = false;

    /**
     * Cuenta analitica
     */
    public anality: Boolean = false;

    /**
     * Tipo de cuenta "B" cuenta de Balance "RP" cuenta de perdidas "RG" cuenta de ganancias y 
     * "A" cuenta analítica
     */
    public type:string = 'B';

    /**
     * Identificador cuenta de destino.
     */
    public idAccountDestiny:String ='';

    /**
     * Cuenta contable bloqueada
     */
    public locked:boolean=false;

    /**
     * Usuario autorizados, si el array es vacio todos están autorizados
     */
    public user:String[] = [];

    /**
     * Constructor
     */
    constructor(){}

}