// Importa la clase `DataSource` desde `typeorm`, que es utilizada para gestionar la conexión a la base de datos.
import { DataSource } from 'typeorm';
import { Chats, Contacts, Users } from '../index';


// Importa el modelo `Users`, que representa la entidad de la tabla `users` en la base de datos.


// Define una interfaz `Options` que especifica la estructura de las opciones necesarias para la conexión a la base de datos.
interface Options {
	host: string; // Dirección del host de la base de datos.
	port: number; // Puerto de la base de datos.
	username: string; // Nombre de usuario para la base de datos.
	password: string; // Contraseña para la base de datos.
	database: string; // Nombre de la base de datos.
}

// Define la clase `PostgresDatabase` que maneja la conexión a la base de datos PostgreSQL utilizando TypeORM.
export class PostgresDatabase {
	// Define una propiedad `datasource` de tipo `DataSource`, que gestionará la conexión y las operaciones con la base de datos.
	public datasource: DataSource;

	// El constructor recibe un objeto `options` de tipo `Options`, que contiene las credenciales y configuración para conectar a la base de datos.
	constructor(options: Options) {
		// Inicializa la propiedad `datasource` con una nueva instancia de `DataSource` configurada para PostgreSQL.
		this.datasource = new DataSource({
			type: 'postgres', // Especifica el tipo de base de datos, en este caso PostgreSQL.
			host: options.host, // El host de la base de datos proporcionado en las opciones.
			port: options.port, // El puerto de la base de datos proporcionado en las opciones.
			username: options.username, // El nombre de usuario para la base de datos proporcionado en las opciones.
			password: options.password, // La contraseña para la base de datos proporcionada en las opciones.
			database: options.database, // El nombre de la base de datos proporcionado en las opciones.
			entities: [Users, Contacts, Chats], // Especifica las entidades (modelos) que se usarán con TypeORM. En este caso, `Users`.
			synchronize: true, // Sincroniza automáticamente la base de datos con las entidades del modelo. Esto significa que la base de datos se actualizará con los cambios de las entidades cada vez que se inicie la aplicación.
			ssl: {
				// Configura las opciones de conexión SSL. En este caso, se desactiva la verificación del certificado SSL (útil en entornos de desarrollo).
				rejectUnauthorized: false, // No rechaza conexiones no verificadas, útil cuando el servidor no tiene un certificado SSL válido.
			},
		});
	}

	// Método `connect` para establecer la conexión a la base de datos.
	async connect() {
		try {
			// Intenta inicializar la conexión con la base de datos utilizando el método `initialize` de `DataSource`.
			await this.datasource.initialize();
			// Si la conexión se establece correctamente, se muestra un mensaje en la consola.
			console.log('database conected 👌');
		} catch (error) {
			// Si ocurre un error al conectar, se captura y se muestra el error en la consola.
			console.log(error);
		}
	}
}