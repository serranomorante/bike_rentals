> Ejercicio de programación �‍�

# APP para rentar bicicletas

[![N|Solid](https://i.postimg.cc/HLp8S5WC/msedge-20221012-132953-962.png)](https://i.postimg.cc/HLp8S5WC/msedge-20221012-132953-962.png)

## Descripción

Esta es una aplicación web para la solicitud de bicicletas en `modalidad renta` creada con Typescript + React en sus últimas versiones.

## Características generales

- Presenta el listado de bicicletas disponibles ⚡
- Presenta una vista detalle de la bicicleta seleccionada. ⚡
- Permite generar una solicitud de renta de la bicicleta seleccionada ⚡

## Características del desarrollo

- Utiliza docker para facilitar el desarrollo y despliegue en producción
- Utiliza .devcontainer para un ambiente de desarrollo replicable en pocos segundos
- Sigue los principios SOLID y utiliza el patrón de diseño factory
- Creada desde el principio con i18n en 2 idiomas.
- Utiliza Material UI + styled components para los estilos

## Pasos para iniciar la aplicación en su localhost

La aplicación sólo requiere que [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) estén instalados en su sistema.
Adicional, los puertos 1234, 1235 y 1080 de su sistema deben estar disponibles (lo más probable es que lo estén).

Por favor asegúrese de seguir los pasos de instalación de dichas herramientas

- [Instalar Docker](https://docs.docker.com/engine/install/)
- [Instalar Docker Compose](https://docs.docker.com/compose/install/)

> Podemos comprobar la instalación de docker y docker compose de la siguiente manera:

```sh
docker --version
docker-compose --version
```

Estos comandos retornan las respectivas versiones de Docker y de Docker Compose.

> ⚠ Si usted desea, puede ejecutar el siguiente comando para asegurarse que ningún contenedor docker esté en ejecución ya que podría interferir con el arranque de nuestro aplicativo.

> ⚠ Tenga cuidado, este comando va a detener todos los contenedores ejecutándose en su equipo actualmente.

```sh
docker stop $(docker ps -q -a)
```

Una vez instalados Docker y Docker Compose, procedemos con los pasos para iniciar nuestra aplicación.

#### Importate, ejecutar los siguientes comandos con `Powershell (windows)`, `bash (linux)` o bien `zsh (mac)`

Clonamos el actual repositorio e ingresamos a la carpeta del proyecto

```sh
git clone https://github.com/serranomorante/bike_rentals
cd bike_rentals
```

Una vez dentro de la carpeta del proyecto, ejecutamos estos comandos uno por uno en el siguiente orden:

```sh
docker network create my_bike_rentals_local_network
docker-compose -f local.yml build
docker compose -f local.builder.yml run --rm install
docker-compose -f local.yml up -d
```

Una vez completado este paso, sin cerrar la consola de comando, nos dirigimos a nuestro navegador de preferencia y buscamos la siguiente url:
[localhost:1234](http://localhost:1234)
Y desde ahí podemos comenzar a navegar por el aplicativo.

## Decisiones en el desarrollo

### ¿Por qué utilizamos el Factory Pattern?

Al utilizar `Factory Pattern` le estamos permitiendo a nuestra aplicación ser extensible en el tiempo ya que toda funcionalidad se desarrolla sobre una abstración en vez de desarrollar directamente sobre la implementación.

En este caso, si bien ahora mismo la nuestra es una app de renta de bicicletas, el modelo de negocio bien podría expandirse a la renta Scooters, Motocicletas o cualquier cosa sobre ruedas.

Es por esto que aplicamos el `Factory Pattern` para que a nivel de código nuestra aplicación NO se limite a interactuar únicamente con bicicletas sino que pueda expandirse e interactuar con otro tipo de vehículos para movilización.

[![N|Solid](https://i.postimg.cc/gkv4TCbF/msedge-20221012-134621-840.png)](https://i.postimg.cc/gkv4TCbF/msedge-20221012-134621-840.png)
