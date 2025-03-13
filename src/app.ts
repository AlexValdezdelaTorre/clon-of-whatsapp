// Importa reflect-metadata, necesario para trabajar con decoradores y metadatos en tiempo de ejecución en TypeScript.
import 'reflect-metadata';

// Importa las configuraciones y dependencias necesarias desde distintos módulos.
import { envs } from './config/envs'; // Configuración de las variables de entorno
import { AppRoutes } from './presentation/AppRoutes'; // Rutas de la aplicación
import { PostgresDatabase } from './data/postgres/postgres-database'; // Módulo para la conexión con la base de datos PostgreSQL
import { Server } from './presentation/server'; // Configuración y arranque del servidor Express

// Carga las variables de entorno desde un archivo, por ejemplo, un archivo .env.
process.loadEnvFile();

async function main() {
    // Crea una nueva instancia de la clase PostgresDatabase con las credenciales y configuraciones de la base de datos
    const postgres = new PostgresDatabase({
        username: envs.DB_USERNAME, // Nombre de usuario para la base de datos
        password: envs.DB_PASSWORD, // Contraseña de la base de datos
        host: envs.DB_HOST, // Dirección del servidor donde está la base de datos
        database: envs.DB_DATABASE, // Nombre de la base de datos
        port: envs.DB_PORT, // Puerto de conexión de la base de datos
    });

    // Establece una conexión con la base de datos y espera a que se complete la operación
    await postgres.connect();

    // Crea una nueva instancia del servidor Express y pasa las configuraciones necesarias
    const server = new Server({
        port: envs.PORT, // Puerto en el que se ejecutará el servidor
        routes: AppRoutes.routes, // Rutas definidas para la aplicación
    });

    // Imprime en la consola el valor del puerto del servidor para verificar que se ha cargado correctamente
    console.log(process.env.PORT);

    // Inicia el servidor y comienza a escuchar las solicitudes en el puerto especificado
    await server.start();
}

// Ejecuta la función principal de manera asíncrona
main();