import { Request, Response } from "express";
import { CreateContactsDTO, CustomError } from "../../domain";
import { ContactsService } from "../services/contactsService";

export class ContactsController {

    // El constructor de la clase recibe una instancia del servicio `UserService` que se utilizará para interactuar
    // con la lógica de negocio para crear usuarios.
    constructor(private readonly contactsService: ContactsService) {}

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
    createContact = (req: Request, res: Response) => {
        // Llama a `CreateUsersDTO.create` para validar y crear una instancia de DTO con los datos del cuerpo de la solicitud.
        // Si los datos son incorrectos, se devuelve un error 422 con el mensaje correspondiente.
        const [error, createUsersDto] = CreateContactsDTO.create(req.body);

        if (error) return res.status(422).json({ message: error });

        // Si los datos son válidos, llama al método `createUser` del `UserService` para crear el usuario.
        // En caso de éxito, responde con el código de estado 201 (Creado) y los datos del nuevo usuario.
        this.contactsService.createContact(createUsersDto!)
            .then((data: any) => 
                res.status(201).json(data)
            )
            // Si ocurre un error, se maneja mediante la función `handleError`.
            .catch((error: unknown) => this.handleError(error, res))
    };
}