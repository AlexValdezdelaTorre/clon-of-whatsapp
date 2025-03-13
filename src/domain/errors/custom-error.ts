// Define la clase `CustomError`, que extiende de la clase nativa `Error` de JavaScript.
// Esta clase se usa para representar errores personalizados que contienen un mensaje y un código de estado HTTP.
export class CustomError extends Error {
    // El constructor toma dos parámetros:
    // - `message`: el mensaje que describe el error.
    // - `statusCode`: el código de estado HTTP que corresponde a este tipo de error.
    // Se llama al constructor de la clase base `Error` con el mensaje.
    constructor(
        public readonly message: string,  // El mensaje del error.
        public readonly statusCode: number // El código de estado HTTP del error.
    ){
        super(message);  // Llama al constructor de `Error` con el mensaje del error.
    }

    // Métodos estáticos que generan errores con códigos de estado HTTP específicos.
    
    // Crea un error con el código de estado 400 (Bad Request).
    static badRequest(message: string){
        return new CustomError(message, 400);  // Retorna una nueva instancia de `CustomError` con el código 400.
    }

    // Crea un error con el código de estado 401 (Unauthorized).
    static unAuthorized(message: string){
        return new CustomError(message, 401);  // Retorna una nueva instancia de `CustomError` con el código 401.
    }

    // Crea un error con el código de estado 403 (Forbidden).
    static forbiden(message: string){
        return new CustomError(message, 403);  // Retorna una nueva instancia de `CustomError` con el código 403.
    }

    // Crea un error con el código de estado 404 (Not Found).
    static notFound(message: string){
        return new CustomError(message, 404);  // Retorna una nueva instancia de `CustomError` con el código 404.
    }

    // Crea un error con el código de estado 500 (Internal Server Error).
    static internalServed(message: string){
        return new CustomError(message, 500);  // Retorna una nueva instancia de `CustomError` con el código 500.
    }
}