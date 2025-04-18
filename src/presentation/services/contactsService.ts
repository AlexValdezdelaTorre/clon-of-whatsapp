import { Contacts } from "../../data";
import { CreateContactsDTO, CustomError } from "../../domain";
import { UpdateContactsDTO } from "../../domain/dtos/contacts/updateContacts.dto";

export class ContactsService {

    // Define un método asincrónico `createUser` para crear un nuevo usuario.
    // Este método toma como argumento un objeto de tipo `CreateUsersDTO` que contiene la información del usuario.
    async createContact(contactsData: CreateContactsDTO) {

        // Crea una nueva instancia del modelo `Users`, que representa al usuario en la base de datos.
        const contacts = new Contacts();

        // Asigna los datos recibidos en el objeto `usersData` al objeto `users` (el modelo de la base de datos).
        contacts.name = contactsData.name;
        contacts.surname = contactsData.surname;
        contacts.email = contactsData.email;
        contacts.cellphone = contactsData.cellphone;
        

        try {
            // Intenta guardar el usuario en la base de datos.
            const dbContact = await contacts.save();

            // Si la operación es exitosa, devuelve un objeto con los datos del usuario guardado en la base de datos,
            // pero excluye la contraseña por razones de seguridad.
            return {
                id: dbContact.id,
                name: dbContact.name,
                surname: dbContact.surname,
                email: dbContact.email,
                cellphone: dbContact.cellphone,
                status: dbContact.online,
            };

        } catch (error: any) {
            // Si ocurre un error, verifica el código de error para manejarlo de manera adecuada.

            // Si el código de error es '23505', significa que la base de datos ha lanzado un error de violación de restricción única.
            // Esto suele ocurrir cuando se intenta insertar un valor duplicado (en este caso, un correo electrónico duplicado).
            if (error.code === '23505') {
                // Lanza un error personalizado con el código de estado 400 (Bad Request) indicando que el usuario con el correo electrónico
                // ya existe en la base de datos.
                throw CustomError.badRequest(`User with: ${contactsData.email} email already exist`);
            }

            // Si ocurre cualquier otro error, lanza un error con el código de estado 500 (Internal Server Error) para indicar que
            // ocurrió un problema al crear el usuario.
            throw CustomError.internalServed("Error creando el usuario");
        }
    };

    async findContact(id: string){
        const result = await Contacts.createQueryBuilder("contacts")
             
        .where("contacts.id = :id", { id: id})
        //.andWhere("user.status = :status", {status: true})
        .getOne();
    
        if(!result) {
          throw CustomError.notFound("Contact not found");
        }
      
        return result;
                
    };

    async updateContact(id: string, contactsData: UpdateContactsDTO ){
        const contact = await this.findContact(id);
      
        contact.email = contactsData.email.toLowerCase().trim()
        contact.cellphone = contactsData.cellphone.trim()
      
        try {
           const dbContact = await contact.save();
             
           return {
             email: dbContact.email,
             cellphone: dbContact.cellphone
           };
         } catch (error) {
           throw CustomError.internalServed("Error actualizando el usuario")
         }
    };

    async removeContact(Id: string) {
		try {
			const contact = await Contacts.findOne({
				where: { id: Id},
			});

			if (!contact) {
				throw CustomError.notFound('Contact not found');
			}

			// Elimina el contacto
			await contact.remove();

			return { message: 'Contact removed successfully' };
		} catch (error) {
			throw CustomError.internalServed('Error removing the contact');
		}
	}; 

}