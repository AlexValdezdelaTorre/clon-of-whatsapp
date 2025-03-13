// Importa las clases necesarias desde Express y los servicios y controladores de la aplicación.
import { Router } from "express"; // Router de Express para definir las rutas del servidor
import { UserService } from "../services/UserService"; // Servicio que maneja la lógica de negocio relacionada con los usuarios
import { UserController } from "./usersController"; // Controlador que gestiona las solicitudes HTTP y las responde

// Define una clase UserRoutes para gestionar las rutas relacionadas con los usuarios.
export class UserRoutes {
    // Método estático que devuelve un objeto Router configurado con las rutas necesarias.
    static get routes(): Router {
        const router = Router(); // Crea una nueva instancia del enrutador de Express
        
        // Crea una nueva instancia de UserService que maneja las operaciones con los usuarios.
        const usersService = new UserService();
        
        // Crea una nueva instancia de UserController, pasando el servicio UserService como dependencia.
        const usersController = new UserController(usersService);

        // Define una ruta POST para registrar un nuevo usuario, asociando esta ruta con el método `createUser` del controlador.
        router.post('/register', usersController.createUser);

        // Retorna el objeto Router con la configuración de la ruta
        return router;
    }
}