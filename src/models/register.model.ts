/**
 * Clase modelo registro
 */
export default class RegisterModel {

    /**
     * Identificador que realiza el registro
     */
    _idUser:string;

    /**
     * Nombre del usuario que realiza el registro
     */
    name:string;

    /**
     * Fecha del registro
     */
    date:Date;

    /**
     * Datos previos al registro
     */
    data:any[]= [];
    

    /**
     * Constructor
     */
    constructor(_idUser:string,name:string) {
        this._idUser = _idUser;
        this.name = name;
        this.date = new Date();
    }


}