## POZYX-03 SERVER
Dit document beschrijft de pozyx-03 server en databank.
Algemene informatie is terug te vinden in de [repository root](https://github.ugent.be/iii-vop2017/pozyx-03).

### Configuratie
We maken gebruik van de [MariaDB] databank en [Sequelize] ORM. De mariasql module vereist node-gyp om te installeren, dat op zijn beurt dependencies heeft, hieronder staan de nodige vereisten:

* Unix:
  * `python v2.7`
  * `make`
  * Een C/C++ compiler toolchain, zoals [GCC](https://gcc.gnu.org)
* Mac OS X:
  * `python v2.7`
  * [Xcode](https://developer.apple.com/xcode/download/)
    * Inclusief `Command Line Tools`, terug te vinden onder `Xcode -> Preferences -> Downloads`
    * Deze stap installeert `gcc` en de `make` toolchain
* Windows:
  * in console __met admin rechten__: `npm install --global --production windows-build-tools` 

Meer info op de [node-gyp repository](https://github.com/nodejs/node-gyp).
Als aan de vereisten kan node-gyp geïnstalleerd worden:
```bash
npm install --global node-gyp
```
En vervolgens de feitelijke modules die we gebruiken:
```bash
npm install
```

De configuratie van de databank verbinding gebeurt in [../server/src/config/](https://github.ugent.be/iii-vop2017/pozyx-03/tree/master/src/server/src/config), daar dient een config.json file voorzien te worden. Voorbeeld:
```json
{
  "development": {
    "database": "pozyx",
    "host": "127.0.0.1",
    "username": "username",
    "password": "password",
    "dialect": "mariadb"
  }
}
```

### API
De api documentatie wordt gegenereerd met [apiDoc]. Volgend commando genereert de documentatie:
```bash
npm run doc
```
Vervolgens is de documentatie terug te vinden onder ../server/public/apidoc/

### Database Design

![UML Database Design](http://i.imgur.com/G19w0bm.png "UML Database Design")

De laatste versie van het databank model is ook steeds terug te vinden op [google drive](https://drive.google.com/open?id=0B_pQpm22Q56JYUFYVDZyRnBpMkk).

[//]: #

   [MariaDB]: <https://mariadb.org/>
   [Sequelize]: <https://nodejs.org/en/>
   [apiDoc]: <http://apidocjs.com/>
