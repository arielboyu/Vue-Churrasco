# churrasco
VUE Challenge:

Este challenge está diseñado para que postulantes puedan demostrar su conocimiento de la herramienta, capacidad para cumplir directivas y creatividad.

Tareas a realizar:

Realizar una pantalla de login.
El modelo de la pantalla de login a realizar fue adjuntada con este archivo: ‘login_screen.png’
El objetivo es replicar el diseño de la forma más precisa posible. Pueden ser usadas las herramientas, librerías y técnicas que se deseen.
El servicio de login está publicado en la siguiente dirección: http://vps.churrasco.digital:3005/login
El endpoint recibe un POST http con email/username y password y retorna un token de autorización (oAuth2). Subsiguientes llamadas a los servicios publicados deberán incluir este token en la cabecera ‘Authorization’
En caso de login exitoso, se navegará a la siguiente pantalla, en caso de fallo se deberá mostrar un mensaje con la descripción del error.

Realizar una pantalla para mostrar listado de productos.
Queda a criterio del postulante el diseño de la pantalla: estilos (preferentemente que sea coherente con la pantalla de login), que datos de los retornados por el servicio mostrar y cómo mostrarlos.
Este servicio está publicado en http://vps.churrasco.digital:3005/products. Es necesario el token obtenido en el paso 1) para acceder.

3. Realizar una pantalla con un formulario de alta de un nuevo producto.
Puntos extra si el formulario permite el upload de múltiples imágenes.
El campo pictures de la base de datos sólo puede almacenar URLs de las imágenes, dónde se almacenan estas y cómo se obtiene su URL queda a criterio del postulante.
El servicio está publicado en http://vps.churrasco.digital:3005/addproduct 

Directivas:
El entregable es un proyecto VUE - sin la carpeta node_modules. Debe funcionar tras los comandos npm install – npm run serve
La versión de VUE usada debe ser al menos la 2.6
Bonus points por uso de Vuetify



Apéndice: Documentación de API REST

Sercicio de login: retornar;a un bearer token y un código HTTP 200 si el login fue exitoso. Código HTTP 401 y mensaje de error en caso contrario

curl --location --request POST 'http://vps.churrasco.digital:3005/login' \
--header 'Content-Type: application/json' \
--data-raw '{
	"username": "challenge",
	"password": "ch411enge"
}'

Ejemplo de retorno
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTIzMjg5MTAyYTRiNTMwOGM4MDM0OSIsInVzZXJuYW1lIjoiY2hhbGxlbmdlIiwiaWF0IjoxNjM2NDgwMDg2fQ.amiTKpA9OYeEFdGmrWOtW0Fs3aLw5mOjoLBXRuLIsOg"
}


Servicio de Productos: Retorna un listado de sitios de interés

curl --location --request GET 'http://vps.churrasco.digital:3005/products' \
--header 'Authorization: Bearer <token>'


Ejemplo de JSON retornado por el servicio

[
   {
        "_id": "6052383f102a4b5308c8034b",
        "SKU": "7610848337010",
        "code": 2030,
        "name": "Mangos",
        "description": "mango (Thailandia)",
        "pictures": [
            "https://www.aweta.com/images/produces/overzicht/aweta-product-mango.png"
        ],
        "price": 35,
        "currency": "s./"
    },
    {
        "_id": "6052383f102a4b5308c8034c",
        "SKU": "7610809001066",
        "code": 1001,
        "name": "Café Mauro",
        "description": "Caffé Mauro - Roasted organic coffee blend",
        "pictures": [
            "https://static.openfoodfacts.org/images/products/800/253/015/9021/front_fr.15.400.jpg"
        ],
        "price": 76,
        "currency": "s./"
    }
]


Servicio de Alta de Productos

curl --location --request POST 'http://vps.churrasco.digital:3005/addproduct' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
        "SKU": "2342232",
        "code": 1203,
        "name": "Manzana Verde",
        "description": "Cajón Manzana verde - 20kg",
        "pictures": [
            "http://placekitten.com/200/200"
        ],
        "price": 92,
        "currency": ".s/",
        "__v": 0
    }'

Ejemplo de retorno

{
        "_id": "618ab22bd78d227e609eeb9e",
        "SKU": "2342232",
        "code": 1203,
        "name": "Manzana Verde",
        "description": "Cajón Manzana verde - 20kg",
        "pictures": [
            "http://placekitten.com/200/200"
        ],
        "price": 92,
        "currency": ".s/",
        "__v": 0
    }

Contacto para consultas:
Mariano Fussero – mariano@churrasco.digital	
	
