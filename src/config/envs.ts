// Importa la configuración de variables de entorno desde el archivo .env
import 'dotenv/config'; // Carga las variables de entorno desde el archivo .env para que estén disponibles en `process.env`

// Importa la función `get` del paquete `env-var`, que facilita la lectura y validación de variables de entorno
import { get } from 'env-var';

// Carga el archivo de variables de entorno usando el método `process.loadEnvFile()` (parece un error, ya que no es una función estándar de Node.js)
process.loadEnvFile(); // Esto no es un método estándar, lo correcto sería usar `dotenv.config()` para cargar el archivo .env, pero parece que fue agregado de forma personalizada

// Exporta un objeto `envs` que contiene todas las variables de entorno requeridas para el funcionamiento de la aplicación
export const envs = {
    // Lee la variable de entorno `PORT`, la marca como requerida y la convierte a un número de puerto
    PORT: get('PORT').required().asPortNumber(),

    // Lee la variable de entorno `USERNAME_DATABASE`, la marca como requerida y la convierte a una cadena de texto
    DB_USERNAME: get('USERNAME_DATABASE').required().asString(),

    // Lee la variable de entorno `PASSWORD_DATABASE`, la marca como requerida y la convierte a una cadena de texto
    DB_PASSWORD: get('PASSWORD_DATABASE').required().asString(),

    // Lee la variable de entorno `HOST_DATABASE`, la marca como requerida y la convierte a una cadena de texto
    DB_HOST: get('HOST_DATABASE').required().asString(),

    // Lee la variable de entorno `DATABASE`, la marca como requerida y la convierte a una cadena de texto
    DB_DATABASE: get('DATABASE').required().asString(),

    // Lee la variable de entorno `PORT_DATABASE`, la marca como requerida y la convierte a un número de puerto
    DB_PORT: get('PORT_DATABASE').required().asPortNumber(),

    // Lee la variable de entorno `JWT_SECRET`, la marca como requerida y la convierte a una cadena de texto
    JWT_SECRET: get('JWT_SECRET').required().asString(),

    // Lee la variable de entorno `JWT_EXPIRE_IN`, la marca como requerida y la convierte a una cadena de texto
    JWT_EXPIRE_IN: get('JWT_EXPIRE_IN').required().asString(),
};