
export class UserModel {

    /**
     * Identify user
     */
    _id:string='';

    /**
     * email 
     */
    email:string

    /**
     * Passwords
     */
    password:string = '';

    /**
     * User image
     */
    img:string = '';

    /**
     * Rol user
     */
    rol:string= 'ADMIN_ROLE | SUPER_ROLE | USER_ROLE';


    /**
     * Namer user
     */
    name:string= '' ;




    constructor(email:string) {
        this.email = email;
    }

}