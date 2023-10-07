## Introducción

El objetivo de este proyecto es crear una aplicación de consola haciendo uso de Nodejs para 
consultar la información del clima de un lugar o ciudad. La información del lugar se obtiene de
[Mapbox.com](https://www.mapbox.com/) y la información correspondiente al clima se obtiene de
[openweathermap.org](https://openweathermap.org/). A medida que vayamos consultando lugares,
podemos hacer uso de la opción *2. Historial* para revisar los lugares buscados.

Menú de la aplicación:
```
  1. Buscar Ciudad
  2. Historial
```

Para el manejo del historial de búsqueda se realiza el almacenamiento tanto en memoria (o en ejecución) como tambien
en un archivo json que simula el guardado de la información en una base de datos para así tener la información persistente al
abrir nuevamente la aplicación.

En este proyecto se usaron las siguientes librerías de npm:

* [inquirer](https://www.npmjs.com/package/inquirer)
* [colors](https://www.npmjs.com/package/colors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [axios](https://www.npmjs.com/package/axios)

## Instalación
1. Ejecutar el siguiente comando en la raiz del proyecto.
```
    npm install
```

2. Configurar las variables de entorno en el archivo *example.env* y luego renombrarlo a *.env*.

3. Ejecutar el siguiente comando para iniciar la aplicación.
```
    node index
    o
    npm start
```

#### Muchas gracias por visitar mi proyecto!!