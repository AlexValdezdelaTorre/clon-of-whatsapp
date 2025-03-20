import { Router } from "express";
import { ContactsService } from "../services/contactsService";
import { ContactsController } from "./contactsController";

export class ContactsRoutes {
    // Método estático que devuelve un objeto Router configurado con las rutas necesarias.
    static get routes(): Router {
        const router = Router(); // Crea una nueva instancia del enrutador de Express
        
        // Crea una nueva instancia de UserService que maneja las operaciones con los usuarios.
        const contactsService = new ContactsService();
        
        // Crea una nueva instancia de UserController, pasando el servicio UserService como dependencia.
        const contactsController = new ContactsController(contactsService);

        // Define una ruta POST para registrar un nuevo usuario, asociando esta ruta con el método `createUser` del controlador.
        router.post('/registerContact', contactsController.createContact);
        router.patch('/update/:id', contactsController.handleUpdateContact);
        router.delete('/remove/:id', contactsController.deleContact);

        // Retorna el objeto Router con la configuración de la ruta
        return router;
    }
}