# Gestor de inventarios Backend - API


Gestor de inventarios hecho en nodeJS usando las librerías:

 - Express
 - MongoDB
 - TypeScript

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

Luego creas un archivo con nombre `.env`en el directorio root del proyecto ( /.env ) donde vas a añadir dos variables, la primer variable es `MONGO_URI` a esta variable le vas a añadir tu mongo URI, asegúrate de ingresarla bien y reemplazar password por la contraseña del usuario con acceso a la base de datos
Posteriormente, crea otra variable con el nombre `SECRET` esta variable será el "secreto" o firma del JWT token
  
Y listo, puedes empezar a usar tu backend, disfruta ^^

Ejecutalo con `npm run start`

NOTA: SI LO QUIERE EJECUTAR CON TYPESCRIPT, INSTALA TS-NODE `npm I -g ts-node` y ejecutalo con `npm run dev`
  
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
  A esta ruta puedes hacer `GET, PUT, DELETE`:
  
  GET:
    Obtiene toda la información del usuario incluyendo productos añadidos y ventas hechas
  PUT:
    Actualiza la información en la base de datos, para ello, debes enviar todos los datos de usuario pero con uno diferente, el que quieras cambiar, un ejemplo de esto sería para el mismo usuario mostrado antes sería:
    
```javascript
{
  "firstname": "Brahian",
  "lastname": "Arias",
  "password": "irapue55",
  "company": "Ferretería La Frontera",
  "email": "asevergrim@gmail.com"
}
```
    Al solo cambiar el email, el único dato que se actualiza, en caso de que se actualice la contraseña, esta se vuelve a encriptar y requerirá hacer otra vez login en su respectiva ruta
    
    
   DELETE:
    Borra la cuenta unicamente enviando la petición

### /api/product/stock
  A esta ruta puedes hacer `GET, POST, PUT, DELETE`:
  
  GET:
    Obtiene los productos agregados al apartado de `products` en la cuenta
  POST:
    Agrega un producto al apartado de `products` en la cuenta enviando los datos `name, purchase_price, sale_price, units`, de tal manera donde `name` es el nombre del producto, `purchase_price` es el precio de compra, `sale_price` es el precio de venta y `units` son las unidades en stock
 
```javascript
{
  "name": "Destornillador",
  "purchase_price": 1200,
  "sale_price": 2000,
  "units": 10
}
```

  DELETE:
    Elimina un producto de la base de datos enviando el `_id` que mongoDB asigna automáticamente, este dato lo puedes encontrar haciendo `GET` a esta misma ruta
    
  PUT:
    Actualiza un producto de la base de datos enviando el `_id` y todos los datos pero cambiando solo el que quieras actualizar, un ejemplo para el producto previamente mostrado sería:
    
 ```javascript
 {
  "name": "Destornillador",
  "purchase_price": 1200,
  "sale_price": 3000,
  "units": 10
}
 ```

     Ahora en la base de datos tienes el producto destornillador con el `sale_price` equivalente a 3000
     
### /api/sale
  A esta ruta puedes hacer `GET, POST, DELETE`, sirve para registrar una venta en la base de datos
  
  GET:
    Obtén la información de `total_sales` de la base de datos, sirve para ver el historial de ventas
    
  POST:
    Registra una venta, para ello tienes que enviar un JSON al body del request HTTP un dato llamado `sold_products` el cual tiene que contener un array de objetos con los valores `id_product, units`, el valor `id_product` relaciona el `_id` del producto vendido y `units` son las unidades vendidas, el sistema resta esas `units` con el stock con sus respectivas validaciones de datos, un ejemplo sería
    
 ```javascript
 {
  "sold_products" : [
    {
      "id_product": "q253684329xM",
      "units": 2
    },
    {
      "id_product": "1029MnS9229xV",
      "units": 2
    }
  ]
 }
 ```
 
  Esto generará un objeto en el array `total_sales` de la cuenta y tendrá el dato `date` el cual registrará el dia en formato AA:MM:DD que se hizo la venta y `total` la cual calcula el total monetario de ventas en un día, luego generará otro objeto en el array `sold` el cual contendrá un dato `date` el cual registrará la hora en formato HH:MM:SS.ms, tendrá un total el cual registra el total de esa venta y el objeto tendrá a su vez un objeto llamado `products` el cual es un array que contiene los datos ingresados por el usuario para registrar la venta, notarás que debajo de `units` hay un total, ese valor registra el total que se vendio de ese producto en específico
  
Suena confuso este sistema, te invito a ver el archivo `/src/interfaces/user.interface.ts` el cual tiene interfaces que describen de manera más facil la estructura de datos de `sales`

El por qué de tantos totales, fechas y horas es porque se planea recopilar esos datos para fines estadísticos como implementar un diagrama de productos mas vendidos o comparación de rendimiento en cuestión de negocios en cuanto a ventas se refiere

   DELETE:
     Para esta petición tienes que enviar dos datos: `id_day` (la fecha de la venta en formato AA:MM:DD y `id_sale` (la fecha de la venta en formato HH:MM:SS.ms) no los recomiendo memorizarselos o ingresarlos manualmente, en su lugar, puedes hacer un `GET` a la misma ruta y copiar dichos datos que encontraras en el valor `date`
  
