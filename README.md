# mande-Api


Contenedor de la api, se utilizo heroku así que las credenciales ya estan en la aplicación
Definimos el USER_NAME
Poner un nombre de usuario en una variable de entorno.

USER_NAME=marlon

Crear la imagen de docker con el esquema y los datos pre-guardados
docker build -t ${USER_NAME}/mandeapi .
Poner a correr el servidor de bases de datos
 docker run -it -p 3000:3000 ${USER_NAME}/mandeapi
