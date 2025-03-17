// Importa la clase `DataSource` de TypeORM, que se usa para configurar y administrar la conexión a la base de datos.
import { DataSource } from 'typeorm';

// Importa el objeto `envs` que contiene las variables de entorno necesarias para la conexión a la base de datos.
import { envs } from '../../config/envs';
import { Chats, Contacts, Users } from '../../data';

// Importa el modelo `Users`, que define la estructura de la tabla de usuarios en la base de datos.


// Define una interfaz `Options` que especifica la forma de las opciones necesarias para conectar con la base de datos.
interface Options {
	host: string; // Dirección del host de la base de datos.
	port: number; // Puerto de la base de datos.
	username: string; // Nombre de usuario para la base de datos.
	password: string; // Contraseña para la base de datos.
	database: string; // Nombre de la base de datos.
}

// Crea un objeto `options` que almacena las configuraciones de conexión a la base de datos,
// obteniendo los valores de las variables de entorno definidas en el archivo .env.
const options: Options = {
	host: envs.DB_HOST, // Host de la base de datos desde las variables de entorno.
	port: envs.DB_PORT, // Puerto de la base de datos desde las variables de entorno.
	username: envs.DB_USERNAME, // Nombre de usuario de la base de datos desde las variables de entorno.
	password: envs.DB_PASSWORD, // Contraseña de la base de datos desde las variables de entorno.
	database: envs.DB_DATABASE, // Nombre de la base de datos desde las variables de entorno.
};

// Crea una nueva instancia de `DataSource` que configurará y manejará la conexión a la base de datos.
// Se utiliza para interactuar con la base de datos PostgreSQL.
export const AppDataSource = new DataSource({
	type: 'postgres', // Tipo de base de datos (PostgreSQL en este caso).
	host: options.host, // El host de la base de datos.
	port: options.port, // El puerto de la base de datos.
	username: options.username, // El nombre de usuario para acceder a la base de datos.
	password: options.password, // La contraseña para acceder a la base de datos.
	database: options.database, // El nombre de la base de datos a la que se conecta.
	entities: [Users, Contacts, Chats], // Define los modelos que se usarán con TypeORM (en este caso, el modelo `Users`).
	synchronize: true, // Sincroniza automáticamente el esquema de la base de datos con las entidades del modelo.
	migrationsRun: true, // Si está habilitado, ejecuta las migraciones automáticamente al iniciar la aplicación.
	migrations: [__dirname + '/migrations/*.ts'], // Especifica las rutas de las migraciones que se ejecutarán.
	ssl: {
		rejectUnauthorized: false, // Desactiva la verificación del certificado SSL (es útil para conexiones en entornos de desarrollo o con SSL no verificado).
	},
});