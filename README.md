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
## ¿Qué es la autenticación?

![seguridad](./md/seguridad-4.jpg)

Acción de verificar la identidad de un usuario, verificar si el usuario existe y que sea el.
Algunas casas tienen un visor o camaras pero con la misma intencion, saber la identidad del que toca nuestras puertas de esa manera podemos decidir si lo dejamos entrar o no.

**¿Por qué hacemos esto?**
Porque en nuestras casas tenemos cosas personales y nosotros no queremos que todo el mundo vea nuestas cosas personales y en los sistemas pasa algo similiar, pero en vez de usar camaras usas el __usuario__ y __contraseña__ aunque algunos sistemas usan autentificación passwordless como huellas digitales u otros sistemas que no implica introducir la contraseña.

En nuestra aplicación vamos a implementar autenticación para posteriormente generar un Token de autorizacón

![seguridad](./md/seguridad-5.jpg)

## ¿Qué es la autorización?

![seguridad](./md/seguridad-6.jpg)

Los carros modernos suelen tener 2 llaves una llave que sibe para conducir y otra para el valet parking, este es un servicio que tienen algunos restaurantes o centros comericales donde un personal lo aparka por ti, esta llave tiene permisos muy limitados como solo para arrancar el carro mas no para abrir el baúl

En los sistemas pasas algo muy similiar, donde nostros otorgamos permisos de solo lectura y escritura en nuestra aplicación nostros vamos a otorgar una serie de permisos que van al usuario final de solo lectura y escritura sobre ciertas colecciones pero tambien vamos a otorgar ciertos permisos administrativos y rsto lo vamos a hacer manejando unos tokens que vamos a otorgarle a nuestro servidor.

