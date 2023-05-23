\begin{center}
# Gestor de inventarios Backend - API
\end{center}

Gestor de inventarios hecho en nodeJS usando typescript y express

## Instalación

Primero que todo, debes clonar el repositorio en tu disco duro local
```javascript
git clone https://github.com/aquelaronte/gestor-de-inventarios-backend.git
```

Luego con tu terminal entras a la carpeta y ejecutas el siguiente comando
```javascript
npm install
```
Se te empezarán a instalar las dependencias del proyecto que puedes ver en package.json.

Posteriormente ejecutas el comando
```javascript
npm run build
```

Se te compilará el código de typescript a javascript en la carpeta dist

Luego creas un archivo con nombre `.env` donde vas a añadir dos variables, la primer variable es `MONGO_URI` a esta variable le vas a añadir tu mongo URI, asegúrate de ingresarle bien y reemplazar password por la contraseña del usuario con acceso a la base de datos
Posteriormente, crea otra variable con el nombre `SECRET` esta variable será el "secreto" o firma del JWT token
  
Y listo, puedes empezar a usar tu backend, disfruta ^^

  
  
El servidor cuenta con las siguientes rutas

 - /api/auth/register : crea una cuenta
 - /api/auth/login : inicia sesión
 - /api/products/user : información del usuario
 - /api/products/stock : información de productos añadidos
 - /api/sale : información de ventas

### /api/auth/register
  A esta ruta únicamente puedes hacer `POST`, haz un POST enviando la cuerpo de la solicitud HTTP un JSON con los datos `firstname, lastname, email, company, password`,

Un ejemplo podría ser este
  
```javascript
{
  "firstname": "Brahian",
  "lastname": "Arias",
  "password": "irapue55",
  "email": "asevergrim@gmail.com",
  "company": "Ferretería La Frontera"
}
```
  
Al enviar estos datos, la base de datos encripta la contraseña con bcrypt, el servidor responde a la petición HTTP con los datos respondiendo en caso de que haya pasado las validaciones "USER REGISTERED SUCCESSFULLY"
  
### /api/auth/login
  A esta ruta únicamente puedes hacer `POST` enviando los datos que ingresaste en `email` y `password`, el sistema respondera con tres datos: un JsonWebToken (JWT), un id, y un pass
  
  El JWT tiene que incluirse en el header de authorization con un prefix que diga bearer o Bearer (`Bearer <JWT>`), el pass y el id tienen que incluirse tambien en los headers de las peticiones HTTP con el mismo nombre, para el id, tiene que incluir un header llamado id e incluir el valor arrojado por el sistema, lo mismo con el pass
  
  El JWT sirve para que el sistema detecte al usuario como si ya iniciara sesión, el id y el pass sirve para que las próximas acciones que haga el usuario pueda encontrarse en la base de datos, para hacer peticiones a las otras rutas hay que tener obligatoriamente estos 3 valores, de lo contrario el sistema no autorizará al usuario para hacer peticiones a otras rutas
  
### /api/products/user
  A esta ruta puedes hacer `GET, POST, PUT, DELETE`:
  
  GET:
    Obtiene toda la información del usuario incluyendo productos añadidos y ventas hechas
  POST:
    Actualiza la información en la base de datos, para ello, debes enviar todos los datos de usuario pero con uno diferente, el que quieras cambiar, un ejemplo de esto sería para el mismo usuario mostrado antes sería:
    
    ```javascript
    {
      "firstname": "Brahian",
      "lastname": "Arias",
      "password": "irapue55",
      "company"; "Ferretería La Frontera"
    }
    ```
  
  
