# Challenge

Esta aplicación gestiona el registro y acceso de los usuarios, y les permite buscar urls dentro de páginas webs de las que previamente ha tenido que proporcionar una url.

Para ello, he desarrollado una api REST con MongoDB, en la que he definido Usuarios y Trabajos para poder almacenarlos y trabajar con ellos.
La parte de los usuarios es bastantes estandar, donde tenemos un registro, un login y un detalle del usuario, además de un middleware asociado que permite comprobar que el usuario esté logeado correctamente.
En la parte de trabajos he creado rutas para crear trabajos, ver su estado, ver un listado de trabajos de un usuario y comenzar un trabajo de búsqueda de url.
El desafío era este último, ya que he tenido que probar varios paquetes (cheerio, puppeteer...) hasta comprobar que lo mejor era JSDom, me ha dado un resultado más claro y no me ha dado conflictos con el Docker. Por desgracia, quería montar un socker, pero por falta de tiempo (al final las vacaciones se me alargaron hasta el sábado tarde), no he podido dedicarme al proyecto todo lo que me gustaría, y en este apartado he tenido que hacer un arreglo para los refrescos en el front.

Por otro lado, nunca había hecho test, los del usuario no me han dado problema pero los del crawler no he conseguido definirlos correctamente, otra vez me hubiese gustado tener más tiempo para poder aprenderlo en profuncidad.

Para finalizar, el front es bastante sencillito, con tailwind para darle un poco de estilos y que tuviese un diseño responsive. 

Me acabo de dar cuenta de que he usado muy pocas variables del .env, ya no lo voy a modificar que se me va la deadline.

# Instalacion

Para poder correr este proyecto, es necesario tener instalado Docker y preferiblemente un gestor de base de datos de MongoDB (en mi caso uso MongoDBCompass).
Nos vamos a la raíz del proyecto y escribimos:

docker-compose up --build

Tras unos segundos, se habrá instalado todo lo necesario para poder correr el proyecto en DESARROLLO.

Para ejecutar los test, entramos en el docker con el comando:

docker exec -it challenge-api-1 /bin/sh  (challenge-api-1 es el nombre que le da al contenedor, comprobar antes de tirar el comando)

Y posteriormente:

npm test

# Conclusión
Me ha parecido un reto bastante interesante, quizás de primeras no creía que me llevase tanto tiempo desarrollarlo completo pero, madre mía la de cosas que se van ocurriendo durante el desarrollo.
Espero que la prueba sea satisfactoria, un saludo, Sergio.