# Autentificación con Passport.js - Platzi
## Stacks de seguridad

![seguridad](./md/seguridad-1.jpg)

### Intranet
Antiguamente las empresas se comunicaban mediante una intranet que a diferencia del internet esta es una red privada que funciona dentro de las compañias en esta red habian protocolas como **SOAP** **SAML** y **WS FEDERATION**, pero estos protocolos se quedaron muy cortos con la revolución mobile, ademas tecnologías como HTML5 empezaron a necesitar otra serie de cosas y conceptos como la __autentificación__ y la __autorización__ tambien necesitaban una evolución, ademas el auge de los __microservicios__ y la necesidad de tener mutiples clientes hicierón necesario la creación de un nuevo stack

![seguridad](./md/seguridad-2.jpg)

### Stack de seguridad moderna
Este stack se compone generalmente de 3 protocolos

![seguridad](./md/seguridad-3.jpg)

#### Json Web Token
Es un standard de código abierto que nos permite comunicarnos entre 2 clientes de una manera mucho más segura 
#### Open Authorization 2.0
Es un standard de la industria que nos permite implementar autorización(tener en cuenta las diferencias con autentificación)
Llego a una versión 2 por la necesidad de adaptarse a las nuevas tecnologias mobile
#### OpenID Connect
Es una capa de autentificación que funciona por encima de OAuth 2.0
## Autenticación

![seguridad](./md/seguridad-4.jpg)

Acción de verificar la identidad de un usuario, verificar si el usuario existe y que sea el.
Algunas casas tienen un visor o camaras pero con la misma intencion, saber la identidad del que toca nuestras puertas de esa manera podemos decidir si lo dejamos entrar o no.

**¿Por qué hacemos esto?**
Porque en nuestras casas tenemos cosas personales y nosotros no queremos que todo el mundo vea nuestas cosas personales y en los sistemas pasa algo similiar, pero en vez de usar camaras usas el __usuario__ y __contraseña__ aunque algunos sistemas usan autentificación passwordless como huellas digitales u otros sistemas que no implica introducir la contraseña.

En nuestra aplicación vamos a implementar autenticación para posteriormente generar un Token de autorizacón

![seguridad](./md/seguridad-5.jpg)

## Autorización

![seguridad](./md/seguridad-6.jpg)

Los carros modernos suelen tener 2 llaves una llave que sibe para conducir y otra para el valet parking, este es un servicio que tienen algunos restaurantes o centros comericales donde un personal lo aparka por ti, esta llave tiene permisos muy limitados como solo para arrancar el carro mas no para abrir el baúl

En los sistemas pasas algo muy similiar, donde nostros otorgamos permisos de solo lectura y escritura en nuestra aplicación nostros vamos a otorgar una serie de permisos que van al usuario final de solo lectura y escritura sobre ciertas colecciones pero tambien vamos a otorgar ciertos permisos administrativos y rsto lo vamos a hacer manejando unos tokens que vamos a otorgarle a nuestro servidor.

## Sesiones
![seguridad](./md/seguridad-7.jpg)

Cuando visitamos un sitio web se crea una petición HTTP, un protocolo que no tiene estado eso quiere decir que muchas peticiones HTTP nunca comparten información entre si, asi que la manera de compartir información de peticiones HTTP es mediante una sesión.

Cuando visitas un sitio por primera vez se crea una sesión no es necesario que estes autentificado para que esta sesión sea creada.

Supongamos que vas a un sitio a buscar vuelos, cuando tu entras al sitio se te crea una sesión y a medidas que vas haciendo busquedas de vuelo se van guardando tus preferencias de busqueda en esta sesión luega esta sesión genera un ID que es guardada en una cookie, la cookie es un archivo que se almacena en tu navegador para que cuando cierres el navegador la cookie permanezca con el ID de la sesión asi al proxima vez que vuelvas ese ID de la sesión que permanece en la cookie se relaciona con la sesión que estaba previamente abierta y asi puede cargar tus preferencias en los vuelos que estabas buscando, es por eso que muchas veces cuando nostros no iniciamos sesión podemos ver que nuestras preferencias estan ahi.

 Cuando hay un proceso de autenticación la sesión se almacena y se relaciona directamente con tu usuario por seguridad la sesión deberia terminar ciertos minutos despues de que halla inactividad, sinembargo dependiendo el mecanismo que estes usando prodias tener sesiones abiertas por dias incluso por meses

 __Cookies session__ y __Express Session__  Son librerias que nos permite implementar todo el tema de sesiones en express la diferencias mpas grande es que cookies session nos permite guardar la session en la cookie y express session nos permite guardar sesión en memoria en el lado del servidor, a la hora de escalar la sesion es muy importante usar base de datos en memoria como redis, eso es una ventaja que tiene JWT ya que no tiene estado y no necesita memoria 

 ## Resumen modulo 1
 
![seguridad](./md/seguridad-8.jpg)

## Json Web Token
Es un estandar de la industria que nos permite generar demanda entre 2 clientes, y se ve así.

![seguridad](./md/seguridad-9.jpg)

### JWT Decodificado
Un JWT consta de 3 partes generalmente divididas por un punto
#### Header
* El tipo, que por lo general es JWT 
* El algoritmo de encriptación de la firma
  * Puede ser Asincrono o Sincrono
  * Los algoritmo asincronos usan 2 llaves de encriptación, una pública paraencriptar y una privada para desencriptar
  * El algoritmo sincrono usa una sola llave para encriptar y para desencriptar
  * Ambos son seguros de usar pero depende donde los uses
  * Los algoritmos asincronos se usan cuando partes publicas tienen acceso a estas llaves
  * Los algoritmos sincronos solo deben usarse en sistemas como en el backend
#### Payload
Es donde guardamos todala información de nuestro usuario incluso todos los scopes de autorización, este payload se componen  de __Claims__ generalmente representado por 3 letras para mantener el JWT lo más pequeño, existen diferentes tipos de claims.

[claims list](https://tools.ietf.org/html/rfc7519)

#### Signature
La tercera parte del JWT es la firma y es la que hace muy poderosa el JWT esta compuesto del:
* Header codificado
* Payload codificado
A todo esto se le aplica el algoritmo de encriptación usando un secret, en el caso del algoritmo __HMACSHA256__ debemos usar un string de 256 caracteres de longitud.
## Autenticación tradicional vs JWT

![seguridad](./md/seguridad-10.jpg)

### Autenticación tradicional

![seguridad](./md/seguridad-11.jpg)

En la autenticación tradicional cuando sucede un proceso de autentificación se crea un sesión, el id de esta sesion se almacena en una cookie que es enviada al navegador.

Recordemos que las cookies no se llaman cookies por las galletas de chocolate si no por las gallertas de la fortuna que tienen mensajes adentro.

De ahi en adelante todos los request tienen la cookie que tiene almacenada el id de la sesión y esta es usada para verificar la sesión previamente activa.

Uno de los probelmas que tiene esta método es que clientes como la SPA no recargan la página entonces no se puede saber si hubo cambios en la sesión, otro problema es que por definición la REST API no tienen estado y al usar sesiones estamos creando esetado y esto contradice este principio.

Otro problema es que en arquitecturas modernas que usan microservicios la sesión que solo existe en una maquina no fluye durante los otros clientes, entonces es un poco dificil de escalar.

Y otro problema es que el control de acceso siemrpe requirer que vallamos a base de datos.

Finalmente controlar el uso de memoria puede ser otro problema ya que cada cliente que se conecta genera  otra sesión generando más consumo de memoria.

### Autenticación con JWT

![seguridad](./md/seguridad-12.jpg)

Al suceder el proceso de autenticación se firma un token a partir de ahi el token es enviado al cliente y este es almacenado en memoria o en una cookie, todos los request de ahi en adelante llevan este token una de las grandes ventajas es que una SPA ya no requiere del backend para saber si el usuario esta autenticado, lo otro es que el backend puede recibir multiples request de multiples clientes y lo único que le interesa es saber si el token esta bien firmado.

Finalmente es el cliente quien sabe que permisos tiene y no tiene que ir hasta base de datos para saber que permisos tiene.

## Firmando nuestro JWT

![seguridad](./md/seguridad-13.jpg)

Para firmar un JWT tenemos que hacer uso de una libreria llamada JWT, esta tiene un método llamado __sign__.

![seguridad](./md/seguridad-14.jpg)

Este método recibe como argumento:
* Payload - Este esta construido con los  diferentes claims que definamos
* Secret - Con el cual sera firmado la firma del JWT
* options - opciones extra para el firmado del JWT

## Verificando nuestro JWT

![seguridad](./md/seguridad-15.jpg)

Para la verificaciónd e nuestro jWT usando la misma libreria vamos a hacer uso del método __verify__.

![seguridad](./md/seguridad-16.jpg)

* token - recibimos el token que queremos verificar
* secret - recibimos el secret
* decoded token - recibimos un callback que nos va a devolver el jwt decodificado
  * tambien podemos omitirlo y recibirlo de forma asincrona
