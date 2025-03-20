import { regularExp } from "../../../config/regular-exp";


export class UpdateContactsDTO {
    constructor( 
        public email: string, 
        public cellphone: string
        ){}

    static create(object: { [key: string]: any }): [string?, UpdateContactsDTO?]{
        const { email, cellphone } = object;

      
        if(!email) return ['Missing email'];
        if(!regularExp.email.test(email)) return ["Invalid email"]
        if(!cellphone) return ["Missing cellphone"]
         

        return [undefined, new UpdateContactsDTO( email, cellphone)];
    };
}