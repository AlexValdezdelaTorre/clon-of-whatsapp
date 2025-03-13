// Importa el objeto Router desde Express, que se utiliza para definir las rutas de la aplicación.
// Importa `UserRoutes` desde el archivo de rutas de usuarios.
import { Router } from "express";
import { UserRoutes } from "./users/router";

// Define la clase `AppRoutes` que contiene todas las rutas de la aplicación.
export class AppRoutes {
    
    // El método estático `routes` define las rutas de la aplicación.
    static get routes(): Router {
        // Crea una nueva instancia de un Router.
        const router = Router();

        // Utiliza las rutas de `UserRoutes` y las asocia con la ruta `/api/users`.
        // Es decir, todas las rutas definidas en `UserRoutes.routes` estarán disponibles bajo `/api/users`.
        router.use('/api/users', UserRoutes.routes);
        
        // Devuelve el objeto router con las rutas configuradas.
        return router;
    };
}