## POZYX-03 SERVER
Dit document beschrijft de pozyx-03 server en databank.
Algemene informatie is terug te vinden in de [repository root](https://github.ugent.be/iii-vop2017/pozyx-03).

### Configuratie
We maken gebruik van de [MariaDB] databank en [Sequelize] ORM. De nodige plugins zijn voorzien in package.json dus volstaat:
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

![alt text](https://lh4.googleusercontent.com/NPy3I5sTcG7Atd2sr-pcGFiMZCF9xmoaqeweCPomymfupvXfaMXdyzP4BrXnLzeQYaOKxTkAcNYy-io=w1920-h943 "UML Database Design")

De laatste versie van het databank model is ook steeds terug te vinden op [google drive](https://drive.google.com/open?id=0B_pQpm22Q56JYUFYVDZyRnBpMkk).

[//]: #

   [MariaDB]: <https://mariadb.org/>
   [Sequelize]: <https://nodejs.org/en/>
   [apiDoc]: <http://apidocjs.com/>