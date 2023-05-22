# gestor-de-inventarios-backend

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

Luego creas un archivo con nombre `.env` donde vas a añadir dos variables, la primer variable es `MONGO_URI` a esta variable le vas a añadir tu mongo URI, asegúrate de ingresarle bien y reemplazar <password> por la contraseña del usuario con acceso a la base de datos
Posteriormente, crea otra variable con el nombre `SECRET` esta variable será el "secreto" o firma del JWT token
  
Y listo, puedes empezar a usar tu backend, disfruta ^^

  
  
El servidor cuenta con las siguientes rutas

 - http://localhost:3000/api/auth/register : crea una cuenta
 - http://localhost:3000/api/auth/login : inicia sesión
 - http://localhost:3000/api/products/user : información del usuario
 - http://localhost:3000/api/products/stock : información de productos añadidos
 - http://localhost:3000/api/sale : información de ventas

### /api/auth/registe
  A esta ruta únicamente puedes hacer POST, haz un POST enviando la cuerpo de la solicitud HTTP un JSON con los datos `firstname, lastname, email, company, password`,
