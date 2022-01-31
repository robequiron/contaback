import { RegisterModel } from "./register.model";
import { emailModel } from "./email.model";

/**
 * Cuentas personales
 */
export class cuentasModel {
    
    /**
     * Identificador de la cuenta
     */
    _id:string = '';

    /**
     * Código de la cuenta personal a 5 dígitos
     */
    code:number= 0;

    /**
     * Categoria de la cuenta 'R' Razon Social o 'P' Persona física
     */
    category:string = 'R';

    /**
     * Nombre de la persona o nombre de la sociedad
     */
    name:string='';

    /**
     * Apellido de la persona o nombre comercial de la sociedad
     */
    surname:string='';

    /**
     * Segundo apellidos de la persona
     */
    surname2:string='';

    /**
     * Tipo de nif.
     */
    typeNif:number=1;

    /**
     * Número de identificación de la persona o razón social
     */
    nif:string='';

    /**
     * Sexo de la persona
     */
    sex:string='M';

    /**
     * Fecha de nacimiento de la persona
     */
    dateBrith:Date = new Date();

    /**
     * Cuenta persona bloqueada
     */
    locked:boolean=false;

    /**
     * Email
     */
    email:emailModel[] = [];

    /**
     * Registro de modificaciones y creaciones
     */
    register:RegisterModel[]=[];

    /**
     * Constuctor  
     **/   
    constructor(){};


}