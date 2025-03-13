// Importa la librería `express` y `Router` desde Express.
// `express` es el objeto principal para crear una aplicación web, y `Router` se usa para gestionar rutas de manera modular.
import express, { Router } from 'express';

// Define una interfaz `Options` que define la estructura del objeto que será pasado al constructor del servidor.
// Contiene dos propiedades: `port` que es el puerto en el que el servidor escuchará y `routes` que contiene las rutas configuradas.
interface Options {
	port: number;
	routes: Router;
}

export class Server {
	// Se crea una instancia de la aplicación de Express.
	private readonly app = express();
	// Se definen las variables privadas `port` y `routes`, que serán inicializadas en el constructor.
	private readonly port: number;
	private readonly routes: Router;

	// Constructor de la clase `Server`, recibe un objeto `options` de tipo `Options`.
	// Inicializa las propiedades `port` y `routes` con los valores proporcionados en `options`.
	constructor(options: Options) {
		this.port = options.port;
		this.routes = options.routes;
	}

	// Método `start` para iniciar el servidor.
	// Configura la aplicación para procesar JSON y formularios URL codificados.
	async start() {
		// Configura Express para que pueda manejar cuerpos de solicitud en formato JSON.
		this.app.use(express.json());
		// Configura Express para procesar cuerpos de solicitudes URL codificados (con soporte de datos anidados).
		this.app.use(express.urlencoded({ extended: true }));

		// Usa las rutas proporcionadas en el objeto `options`.
		this.app.use(this.routes);
		
		// Inicia el servidor en el puerto especificado, y luego imprime un mensaje en la consola indicando que el servidor está corriendo.
		this.app.listen(this.port, () => {
			console.log(`Server started on port ${this.port} 🚀`);
		});
	}
}