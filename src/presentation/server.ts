// Importa la librería `express` y `Router` desde Express.
// `express` es el objeto principal para crear una aplicación web, y `Router` se usa para gestionar rutas de manera modular.
import express, { Router } from 'express';
import http from 'http'; // Necesario para la integración de Socket.io
import { Server as SocketIOServer } from 'socket.io';

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
	private readonly server: http.Server; // Servidor HTTP
	private readonly io: SocketIOServer;  // Socket.io server instance
	private readonly port: number;
	private readonly routes: Router;

	// Constructor de la clase `Server`, recibe un objeto `options` de tipo `Options`.
	// Inicializa las propiedades `port` y `routes` con los valores proporcionados en `options`.
	constructor(options: Options) {
		this.port = options.port;
		this.routes = options.routes;

		// Crea el servidor HTTP a partir de la aplicación Express
        this.server = http.createServer(this.app);
        
        // Inicializa Socket.io con el servidor HTTP
        this.io = new SocketIOServer(this.server);
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

		// Establece la conexión de Socket.io
        this.io.on('connection', (socket) => {
            console.log('Usuario conectado');
            
            // Escucha los mensajes de los clientes
            socket.on('chatMessage', (msg) => {
                console.log('Mensaje recibido:', msg);
                // Enviar el mensaje a todos los clientes conectados
                this.io.emit('chatMessage', msg);
            });

            // Detecta desconexión
            socket.on('disconnect', () => {
                console.log('Usuario desconectado');
            });
        });
		
		// Inicia el servidor en el puerto especificado, y luego imprime un mensaje en la consola indicando que el servidor está corriendo.
		this.app.listen(this.port, () => {
			console.log(`Server started on port ${this.port} 🚀`);
		});
	}
}