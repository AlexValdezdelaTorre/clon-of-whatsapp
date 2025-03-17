// Importa la clase CreateUsersDTO, que representa los datos de entrada para crear un usuario.
// Importa la clase Users, que es el modelo de datos para los usuarios en la base de datos (PostgreSQL).
// Importa la clase CustomError, que se utiliza para manejar errores personalizados con códigos de estado HTTP.
import { CreateUsersDTO } from '../../domain/dtos/users/create.users.dto';
import { Users } from '../../data/postgres/models/users.model';
import { CustomError } from '../../domain';
import { LoginUserDTO } from '../../domain/dtos/users/loginUser.dto';
import { encriptAdapter } from '../../config/bcryptAdapter';
import { JwtAdapter } from '../../config/jwt.adapter';


// Define la clase `UserService`, que maneja la lógica de negocio relacionada con los usuarios.
export class UserService {

    // Define un método asincrónico `createUser` para crear un nuevo usuario.
    // Este método toma como argumento un objeto de tipo `CreateUsersDTO` que contiene la información del usuario.
    async createUser(usersData: CreateUsersDTO) {

        // Crea una nueva instancia del modelo `Users`, que representa al usuario en la base de datos.
        const users = new Users();

        // Asigna los datos recibidos en el objeto `usersData` al objeto `users` (el modelo de la base de datos).
        users.name = usersData.name;
        users.surname = usersData.surname;
        users.email = usersData.email;
        users.cellphone = usersData.cellphone;
        users.password = usersData.password;

        users.password = encriptAdapter.hash(usersData.password);

        

        try {
            // Intenta guardar el usuario en la base de datos.
            const dbUser = await users.save();

            // Si la operación es exitosa, devuelve un objeto con los datos del usuario guardado en la base de datos,
            // pero excluye la contraseña por razones de seguridad.
            return {
                id: dbUser.id,
                name: dbUser.name,
                surname: dbUser.surname,
                email: dbUser.email,
                cellphone: dbUser.cellphone,
                status: dbUser.status,
            };

        } catch (error: any) {
            // Si ocurre un error, verifica el código de error para manejarlo de manera adecuada.

            // Si el código de error es '23505', significa que la base de datos ha lanzado un error de violación de restricción única.
            // Esto suele ocurrir cuando se intenta insertar un valor duplicado (en este caso, un correo electrónico duplicado).
            if (error.code === '23505') {
                // Lanza un error personalizado con el código de estado 400 (Bad Request) indicando que el usuario con el correo electrónico
                // ya existe en la base de datos.
                throw CustomError.badRequest(`User with: ${usersData.email} email already exist`);
            }

            // Si ocurre cualquier otro error, lanza un error con el código de estado 500 (Internal Server Error) para indicar que
            // ocurrió un problema al crear el usuario.
            throw CustomError.internalServed("Error creando el usuario");
        }
    }

    
  async loginUser(loginUserDto: LoginUserDTO) {
    const user = await this.findUserByEmail(loginUserDto.email, /*Status.ACTIVE*/)
     
    const isMatching = encriptAdapter.compare(
      loginUserDto.password,
      user.password
    );
        
    if(!isMatching) throw CustomError.unAuthorized('Invalid Credentials');
    
    const token = await JwtAdapter.generateToken({id: user.id});
    if(!token) throw CustomError.internalServed("Error while creating JWT")
      return {
        token: token,
        user: {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          cellphone: user.cellphone,
          
        }
        
      };
  };

  
  async findUserByEmail(email: string, /*status: Status*/){
    const user = await Users.findOne({
      where: {
       email: email,
       //status: Status.ACTIVE
      }
    });
    if(!user) throw CustomError.notFound(`User with email: ${email} not found`);
    
    return user;
  };
}