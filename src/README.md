# POZYX-03

Pozyx Indoor Positioning *Groep 3*

Auteurs: Rutger Benoot, Brecht Carnewal, Rémy D'heygere, Tom Dorchain, Pieter-Jan Vandenberghe, Jonas Vermassen

***

### Vereisten
  * `node 5.0.0` of recenter (inclusief npm) met volgende package(s):
    * `node-gyp` (instructies onder installatie)
  * Je favoriete JavaScript editor met volgende package(s):
    * `linter-eslint`
  * [Redux DevTools for Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) (Frontend Development)

### Installatie

1. Clone de repository via de UGent Github: <https://github.ugent.be/iii-vop2017/pozyx-03.git>
2. Open je favoriete terminal en ga naar de root van het project
3. Indien je nog geen node-gyp hebt installeer eerst de vereisten voor node-gyp (voor zover je deze nog niet hebt):
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
4. Vervolgens installeer je node-gyp zelf: `npm install --global node-gyp`
5. Zodra je node-gyp hebt kan je alle packages installeren met `npm install`

### Configuratie Databank
We maken gebruik van de [MariaDB] databank en [Sequelize] ORM. De nodige plugins werden bij installatie reeds voorzien.

De configuratie van de databank verbinding gebeurt in [../server/src/config/](https://github.ugent.be/iii-vop2017/pozyx-03/tree/master/src/server/src/config), daar dient een `config.json` file voorzien te worden. Voorbeeld:
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

### Development

Volgend commando start alle benodigde tools voor fullstack development (webpack dev + hot reloading, nodemon, etc):

```
npm run dev
```

### Productie
Build de applicatie eerst:

```
npm run build
```

Vervolgens kan de productie server draaien:

```
npm run prod
```

Met het commando `npm start` worden beide bovenstaan commando's in volgorde uitgevoerd.

### API
De api documentatie wordt gegenereerd met [apiDoc]. Volgend commando genereert de documentatie:
```bash
npm run doc
```
Vervolgens is de documentatie terug te vinden onder ../server/public/apidoc/

### Database Design

![alt text](https://lh4.googleusercontent.com/NPy3I5sTcG7Atd2sr-pcGFiMZCF9xmoaqeweCPomymfupvXfaMXdyzP4BrXnLzeQYaOKxTkAcNYy-io=w1920-h943 "UML Database Design")

De laatste versie van het databank model is ook steeds terug te vinden op [google drive](https://drive.google.com/open?id=0B_pQpm22Q56JYUFYVDZyRnBpMkk).

[//]: #

   [MariaDB]: <https://mariadb.org/>
   [Sequelize]: <https://nodejs.org/en/>
   [apiDoc]: <http://apidocjs.com/>