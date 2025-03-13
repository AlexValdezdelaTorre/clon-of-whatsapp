// Importa los tipos Request y Response de Express para manejar las solicitudes y respuestas HTTP.
// Importa CreateUsersDTO y CustomError desde el dominio para gestionar los datos del usuario y los errores personalizados.
// Importa el servicio UserService que contiene la lógica de negocio para manejar los usuarios.
import { Request, Response } from 'express';
import { CreateUsersDTO, CustomError } from '../../domain';
import { UserService } from '../services/UserService';

// Define la clase UserController que actúa como un controlador para gestionar las rutas de usuarios.
export class UserController {

    // El constructor de la clase recibe una instancia del servicio `UserService` que se utilizará para interactuar
    // con la lógica de negocio para crear usuarios.
    constructor(private readonly userService: UserService) {}

    // Función privada para manejar los errores. Recibe el error y la respuesta HTTP.
    // Si el error es una instancia de `CustomError`, devuelve un mensaje de error con el código de estado específico.
    // Si el error no es una instancia de `CustomError`, se devuelve un error genérico 500 (Internal Server Error).
    private handleError = (error: unknown, res: Response) => {
        // Verifica si el error es una instancia de CustomError, si es así, responde con el código de estado y el mensaje adecuado.
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        };

        // Si el error no es de tipo `CustomError`, muestra el error en la consola y devuelve un error interno genérico.
        console.log(error);
        return res.status(500).json({ message: "Internal served error 💩" })
    };

    // Método `createUser` para manejar la creación de un nuevo usuario.
    // Este método recibe la solicitud `req` y la respuesta `res` como parámetros.
    createUser = (req: Request, res: Response) => {
        // Llama a `CreateUsersDTO.create` para validar y crear una instancia de DTO con los datos del cuerpo de la solicitud.
        // Si los datos son incorrectos, se devuelve un error 422 con el mensaje correspondiente.
        const [error, createUsersDto] = CreateUsersDTO.create(req.body);

        if (error) return res.status(422).json({ message: error });

        // Si los datos son válidos, llama al método `createUser` del `UserService` para crear el usuario.
        // En caso de éxito, responde con el código de estado 201 (Creado) y los datos del nuevo usuario.
        this.userService.createUser(createUsersDto!)
            .then((data: any) => 
                res.status(201).json(data)
            )
            // Si ocurre un error, se maneja mediante la función `handleError`.
            .catch((error: unknown) => this.handleError(error, res))
    };
}

    // static async getAllUsers(req: Request, res: Response): Promise<void> {
    // 	try {
    // 		const users = await UserService.getAllUsers();
    // 		res.status(200).json(users);
    // 	} catch (error: any) {
    // 		res.status(500).json({ message: error.message });
    // 	}
    // }

    // static async register(req: Request, res: Response): Promise<void> {
    // 	try {
    // 		const { name, surname, email, cellphone, password } = req.body;
    // 		if (!name || !surname || !email || !cellphone || !password) {
    // 			res.status(400).json({ message: 'Todos los campos son obligatorios' });
    // 			return;
    // 		}

    // 		const response = await UserService.registerUser(
    // 			name,
    // 			surname,
    // 			email,
    // 			cellphone,
    // 			password,
    // 		);
    // 		res.status(201).json(response);
    // 	} catch (error: any) {
    // 		res.status(400).json({ message: error.message });
    // 	}
    // }

    // static async login(req: Request, res: Response): Promise<void> {
    // 	try {
    // 		const { email, password } = req.body;
    // 		if (!email || !password) {
    // 			res
    // 				.satus(400)
    // 				.json({ message: 'El correo y la contraseña no son correctas.' });
    // 			return;
    // 		}

    // 		const response = await UserService.loginUser(email, password);
    // 		res.status(200).json(response);
    // 	} catch (error: any) {
    // 		res.status(400).json({ message: error.message });
    // 	}
    // }

