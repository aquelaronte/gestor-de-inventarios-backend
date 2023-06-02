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
cd ./gestor-de-inventarios-backend
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

Ejecútalo con `npm run start`

NOTA: SI LO QUIERES EJECUTAR CON TYPESCRIPT INSTALA TS-NODE `npm i -g ts-node` y ejecútalo con `npm run dev`

El servidor cuenta con las siguientes rutas:

- /api/auth/signup : crea una cuenta
- /api/auth/signin : inicia sesión
- /api/profile : información del usuario
- /api/products : información de productos añadidos
- /api/sale : información de ventas

## /api/auth/signup

A esta ruta únicamente puedes hacer `POST` enviando al cuerpo de la solicitud HTTP un JSON con los datos `firstname, lastname, email, company, password`,

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

## /api/auth/signin

A esta ruta únicamente puedes hacer `POST` enviando los datos que ingresaste en `email` y `password`, el sistema respondera con tres datos: un JsonWebToken (JWT), un id, y un pass

El JWT tiene que incluirse en el header de Authorization con el prefix Bearer (`Bearer <JWT>`), el pass y el id tienen que incluirse tambien en los headers de las peticiones HTTP con el mismo nombre, para el id, tiene que incluir un header llamado id e incluir el valor arrojado por el sistema, lo mismo con el pass

El JWT sirve para que el sistema detecte al usuario si ya inició sesión, el id y el pass sirve para que las próximas acciones que haga el usuario pueda encontrarse en la base de datos, para hacer peticiones a las otras rutas hay que tener obligatoriamente estos 3 valores, de lo contrario el sistema no autorizará al usuario para hacer peticiones a otras rutas

## /api/profile

A esta ruta puedes hacer `GET, PUT, DELETE` :

### GET:

Obtiene toda la información del usuario incluyendo productos añadidos y ventas hechas

### PUT:

Actualiza la información de los productos del usuario en la base de datos, para ello, debes enviar solo el dato o datos que quieres cambiar, por ejemplo:

```javascript
{
  "email": "asevergrim@gmail.com"
}
```

Al solo cambiar el email, el único dato que se actualiza es este mismo, en caso de que se actualice la contraseña, esta se vuelve a encriptar y requerirá hacer otra vez login en su respectiva ruta porque los validadores de las otras rutas no aceptarán la contraseña vieja

### DELETE:

Borra la cuenta unicamente enviando la petición

## /api/products

A esta ruta puedes hacer `GET, POST, PUT, DELETE`:

### GET:

Obtiene los productos agregados al apartado de `products` en la cuenta

### POST:

Agrega un producto al apartado de `products` en la cuenta enviando los datos `name, purchase_price, sale_price, units`, de tal manera donde `name` es el nombre del producto, `purchase_price` es el precio de compra, `sale_price` es el precio de venta y `units` son las unidades en stock

```javascript
{
  "name": "Destornillador",
  "purchase_price": 1200,
  "sale_price": 2000,
  "units": 10
}
```

### DELETE:

Elimina un producto de la base de datos enviando el `_id` que mongoDB asigna automáticamente, este dato lo puedes encontrar haciendo `GET` a esta misma ruta

### PUT:

Actualiza un producto de la base de datos enviando el `_id` del producto y el dato o datos que se desee cambiar:

```javascript
{
 "_id" : "asd2312jksLskam"
 "sale_price": 3000,
 "units": 11
}
```

Ahora en la base de datos tienes el producto del id con el `sale_price` equivalente a 3000 y units equivalente a 11 (Por cuestiones lógicas, estos cambios no afectan a las ventas hechas antes de actualizar el producto)

## /api/sale

A esta ruta puedes hacer `GET, POST, DELETE`, sirve para registrar una venta en la base de datos

### GET:

Obtén la información de `total_sales` de la base de datos, sirve para ver el historial de ventas

### POST:

Registra una venta, para ello tienes que enviar un JSON al body del request HTTP un array el cual tiene que contener objetos con los valores `id_product, units`, el valor `id_product` se relaciona con el `_id` del producto vendido y `units` son las unidades vendidas, el sistema resta esas `units` con el stock con sus respectivas validaciones de datos, un ejemplo sería

```javascript
{
  {
    "id_product": "q253684329xM",
    "units": 2
  },
  {
    "id_product": "1029MnS9229xV",
    "units": 2
  }
}
```

Esto generará un objeto en el array `sales` del usuario

Este objeto contendrá tres datos: date, sales_info y sales_total (los datos con nombre \_id son asignados automáticamente por mongoDB)
Este objeto contiene todas las ventas hechas en el día, el dato `date` contiene la fecha que se hacen las ventas en formato AA-MM-DD, el array `sales_info` contiene las horas que se hacen las ventas, los productos vendidos y el total de toda la venta, el dato `sales_total` contiene el total de dinero vendido en un día

Por ejemplo, si es 20 de abril y registras una venta entonces el sistema abrirá un objeto que contiene las ventas del 20 de abril, esa fecha se registra en el dato `date`, también abrirá un objeto en el array `sales_info`, este objeto contará con otro dato llamado `time, sold_items, sale_total`

El dato `time` contiene la hora que se hizo la venta en formato HH:MM:SS.ms
El array `sold_items` contiene los productos vendidos en el día, cada producto vendido es representado por un objeto dentro de este array, este objeto contiene el id del producto, las unidades vendidas y el total vendido de ese producto
El dato `sale_total` contiene el total de la venta

Ahora si ya no es 20 de abril sino 21 de abril y se hace una venta, el sistema abrirá automáticamente un objeto con el `date` con la fecha 21 de abril y los otros datos

Para hacer esto, el usuario únicamente debe mandar la lista de productos siguiendo la estructura previamente mencionada

Esto en el sistema se vería así

```javascript
{
  // sales es un dato presente en el perfil del usuario donde se encuentra tambien el password, el email, etc...
  "sales": [
    {
      "_id": "SJSJFM23"
      "date": "2023-04-20",
      "sales_info": [
        {
          "time": "18:59:03.196"
          "sold_tems": [
            {
              "_id": "sdalk121214SDJ",
              "product_id": "ask92941LLSAJM",
              "units": 5,
              "product_total": 15000
            },
            {
              "_id": "mMAS241KSLs",
              "product_id": "asJAJJFMZNF",
              "units": 1,
              "product_total": 2000
            },
            {
              "_id": "ASJ23",
              "product_id": "REAJSM",
              "units": 4,
              // Total de la venta de este producto
              "product_total": 8000
            }
          ],
          // Total de toda la venta
          "sale_total": 25000
        },
        // Otras ventas hechas en el día ...
      ],
      // Total de todas las ventas hechas en el día
      "sales_total" : 520000
    },
    {
      "date": "2023-04-21",
      "sold": // Ventas,
      "total": // Total de ventas
    }
    // Otras ventas hechas en otros días ...
  ]
}
```

Suena confuso este esquema de datos, te invito a ver el archivo `/src/interfaces/user.interface.ts` el cual tiene las interfaces que describen de manera más facil la estructura de datos del usuario donde verás documentada de manera más sencilla los datos

El por qué de tantos totales es porque se planea recopilar esos datos para fines estadísticos para el usuario en el frontend como un diagrama de productos mas vendidos o comparación de productos que mas dinero producen

### DELETE:

Para esta petición tienes que enviar dos datos: `id_day` (la fecha de la venta en formato AA:MM:DD) y `id_sale` (la fecha de la venta en formato HH:MM:SS.ms) no los recomiendo memorizarselos o ingresarlos manualmente, en su lugar, puedes hacer un `GET` a la misma ruta y copiar dichos datos que encontraras en el valor `date`

## Maquetación de datos:

De manera mucho mas simplificada, te muestro la estructura de datos

```javascript
{
  profile : {
    firstname: 'nombre',
    lastname: 'apellido',
    email: 'correo',
    password: 'contraseña',
    company: 'nombre de la empresa (opcional)'
  },
  products: [
    {
      name: 'nombre del producto',
      units: 'unidades compradas',
      purchase_price: 'precio de compra',
      sale_price: 'precio de venta'
    }
  ],
  sales: [
    {
      date: 'fecha de la venta',
      sales_info: [
        {
          time: 'hora de venta',
          sold_items: [
            {
              product_id: 'identificador de producto',
              units: 'unidades vendidas',
              product_total: 'total de la venta por el producto'
            }
          ],
          sale_total: 'total de la venta'
        }
      ],
      total: 'total de ventas'
    }
  ]
}
```
