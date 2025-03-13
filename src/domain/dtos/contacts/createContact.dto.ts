// Define la clase `CreateContactsDTO`, que se utiliza para representar un objeto de transferencia de datos (DTO)
// para la creación de un nuevo usuario. Los DTOs son objetos que se usan para transferir datos entre las capas
// de la aplicación, especialmente en la comunicación entre el frontend y el backend.
export class CreateContactsDTO {
    // El constructor de la clase acepta 5 parámetros: `name`, `surname`, `email`, `cellphone`, `password`.
    // Estos parámetros se asignan a las propiedades públicas de la clase.
    constructor(
        public name: string,          // El nombre del usuario.
        public surname: string,       // El apellido del usuario.
        public email: string,         // El correo electrónico del usuario.
        public cellphone: string,     // El número de teléfono móvil del usuario.
        public contacts_id: string,      // La contraseña del usuario.
    ) {}

    // Método estático `create` que recibe un objeto con las propiedades del nuevo usuario y devuelve
    // un array que puede contener un mensaje de error (si falta algún campo) o un objeto `CreateUsersDTO`
    // que representa al nuevo usuario creado.
    // El primer valor del array es un mensaje de error (si lo hay), y el segundo valor es el DTO de usuario.
    static create(object: { [key: string]: any }): [string?, CreateContactsDTO?] {
        // Desestructura el objeto recibido para obtener las propiedades correspondientes al nuevo usuario.
        const { name, surname, email, cellphone, contacts_id } = object;

        // Se valida que los campos necesarios estén presentes. Si falta alguno, se devuelve un mensaje de error.
        if (!name) return ['Missing name'];         // Si falta el nombre, se retorna un error.
        if (!surname) return ['Missing surname'];   // Si falta el apellido, se retorna un error.
        if (!email) return ['Missing email'];       // Si falta el correo electrónico, se retorna un error.
        // Aquí se podrían agregar validaciones más estrictas, como verificar si el correo es válido con una expresión regular.
        // if(!regularExp.email.test(email)) return ['Invalid email'];
        if (!cellphone) return ['Missing cellphone']; // Si falta el número de teléfono, se retorna un error.
        // Similarmente, se pueden agregar validaciones más estrictas para el teléfono y la contraseña.
        // if(!regularExp.password.test(password)) return ['The password must be at least 10 characters, and contain at least one uppercase letter, one lowercase and one especial character']
        

        // Si todos los campos son válidos, se retorna `undefined` (sin errores) y se crea una nueva instancia
        // de `CreateUsersDTO` con los datos del nuevo usuario.
        return [
            undefined,  // No hay errores.
            new CreateContactsDTO(name, surname, email, cellphone, contacts_id),  // El objeto DTO con los datos del usuario.
        ];
    }
}