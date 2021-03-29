# addika challenge

```bash
# install dependencies
$ npm install

# copy .env.example and edit with your own information
# It's important to edit that file to procced with sequelize, otherwise that doesn't work
$ cp env.example .env

# install all database and seeders
# You must to create the database first before you run these commands
# DB name: addika_test, addika_dev
$ npx sequelize db:migrate
$ npx sequelize db:seed:all

# Make sure to change the auth secret form that file:
# config/auth.config.js

# serve with hot reload at localhost:8080
$ npm run start-dev
```

Hola a quien corresponda.

El siguiente proyecto lo desarrollé de acuerdo a las especificaciones del documento del challenge, en el cual se tomaron en cuentas las consideraciones del propio documento y de las reglas implícitas que se requieren para un funcionamiento adecuado.

Sin más rodeos, estas son las rutas de la API:

Todas las rutas que necesiten acceso por token necesitarán este header que deberán de agregarlo en Postman(usé postman para validar la api. Se puede usar otro método para realizar las llamadas a la API):

x-access-token: <token>

Users
```bash
Se necesita un token de administrador para usar estas ligas.
GET - localhost:8080/api/users
GET - localhost:8080/api/user/:id
PUT - localhost:8080/api/user/:id
DELETE - localhost:8080/api/user/:id
```

Logs

```bash
Se necesita un token de administrador para usar esta liga.
GET - localhost:8080/api/logs
```

Auth

```bash
POST - localhost:8080/api/auth/signin
Se necesita un token de administrador para usar esta liga.
POST - localhost:8080/api/auth/signup
```

Reviews

```bash
POST - localhost:8080/api/review
Se necesita un token y permiso para ver esta liga. El admin solo necesita el token.
```

Posts

```bash
Aquí se pueden agregar datos al query para buscar por fecha.
GET - localhost:8080/api/posts
GET - localhost:8080/api/posts?startDate=<fechaJS>&endDate=<fechaJS>
Se necesita un token y permiso para ver estas ligas. El admin solo necesita el token.
POST - localhost:8080/api/posts
GET - localhost:8080/api/post/:id
PUT - localhost:8080/api/post/:id
DELETE - localhost:8080/api/post/:id
```

Debido al tiempo y reconociendo la falta de experiencia con pruebas unitarias, les adjunto un documento de pruebas que realizo en el lugar de trabajo. Puede que sea extenso debido a todas las validaciones que estuve encontrando en el camino y corrigiendo entradas.

https://docs.google.com/spreadsheets/d/1u92VZ130UDJgC2jirEOT7ct7I9IeP2tmVxgDu05kfr0/edit?usp=sharing


Espero que lo puedan compilar bien y me den un feedback para saber en qué puedo ir mejorando y si tengo la oportunidad de trabajar con ustedes, que me enseñen a hacer pruebas unitarias, las cuales me servirían mucho para mejorar mi forma de programar y de tomar mejores decisiones.

Cualquier cosa tienen mi contacto a través de mi CV. el cual dejaré en el siguiente enlace.
https://resume.io/r/sZaHkfusd

## License & Copyright

Noé Ramírez Guerrero, Ingeniero de Software

Licensed under the [MIT License](LICENSE)
