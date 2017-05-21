# POZYX-03

Pozyx Indoor Positioning *Groep 3*

Auteurs: Brecht Carnewal, Rémy D'heygere, Tom Dorchain, Pieter-Jan Vandenberghe, Jonas Vermassen

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
  "production": {
    "database": "pozyx",
    "host": "127.0.0.1",
    "username": "username",
    "password": "password",
    "dialect": "mariadb"
  }
}
```
In tussentijdse versies wordt "production" telkens worden vervangen door "development". De waarden "username" en "password" dienen worden te vervangen door de login gegevens die worden gebruikt om te connecteren met de databank.

In de test omgeving wordt gebruik gemaakt van een filler script dat de databank opvult:
```
npm run seed
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

![UML Database Design](http://i.imgur.com/145qNmo.png "UML Database Design")

De laatste versie van het databank model is ook steeds terug te vinden op [google drive](https://drive.google.com/open?id=0B_pQpm22Q56JYUFYVDZyRnBpMkk).

### Triggers testen
Om triggers te testen kan men zelf scenario's bedenken. 
De scenario's waarbij een trigger zich moet voordoen kunnen dan aan de hand van het live script gesimuleerd worden. 
Indien de trigger zich effectief voordoet bij het testen van het scenario dan is de test succesvol.

Bijvoorbeeld: een trigger gaat af zodra 2 rode tags zich in de living bevinden. 
Om dit scenario te kunnen testen is er eerst een trigger nodig die filtert op tags met label "rood" én die zich in de specifieke zone "living" bevinden (in dit voorbeeld heeft living als zone id 2). 
Vervolgens kunnen we het scenario simuleren door het live script alle tags naar zelf gekozen locaties buiten de living te laten teleporteren en ze naar welgekozen punten in de living te laten lopen. 
Zodra er 2 rode tags in de zone aangekomen zijn wordt de trigger afgevuurd. 

Onderstaand voorbeeld toont hoe het trigger object voor dit scenario eruit ziet.

```json
{
  "name": "At least 2 red tags in living",
  "json" : {
    "active": true,
    "comparator": {
      "type": "atLeast",
      "value": 2
    },
    "action": {
      "type": "notify",
      "value": ""
    },
    "filters": [
      {
        "type": "inZone",
        "value": 2
      },
      {
      	"type": "label",
        "value": "rood"
      }
    ]
  }
}
```

Onderstaand voorbeeld toont hoe het simulatie script eruit zou zien. 
We gaan ervan uit dat de punten in "teleportLocations" buiten de zone "living" zijn en de punten in "targetLocations" binnen de zone liggen. 
Elk achtereenvolgende locatie in beide arrays (teleportLocations en targetLocations) is voor een specifieke tag. 
De vlag "haltAtTarget" geeft aan dat de tags moeten stoppen zodra ze aangekomen zijn aan hun respectievelijke target locations.

```json
{
    "type": "TELEPORT",
    "scenario": {
        "teleportLocations": [
            {"x": 0, "y": 0},
            {"x": 20, "y": 0},
            {"x": 40, "y": 0},
            {"x": 60, "y": 0},
            {"x": 80, "y": 0},
            {"x": 100, "y": 0}
        ],
        "targetLocations": [
            {"x": 50, "y": 50},
            {"x": 50, "y": 50},
            {"x": 50, "y": 50},
            {"x": 50, "y": 50},
            {"x": 50, "y": 50},
            {"x": 50, "y": 50}
        ],
        "haltAtTarget": true
    }
}
```

Het is ook mogelijk batterij verbuik en opladen te simuleren. 
Analoog wordt voor elke tag het wenselijke gedrag in een array meegegeven.

```json
{
    "type": "BATTERY",
    "scenario": {
        "modes": [
            "FREEZE",
            "CHARGE",
            "CHARGE",
            "CHARGE",
            "CHARGE",
            "DRAIN",
            "DRAIN",
            "DRAIN",
            "DRAIN"
        ]
    }
}
```

[//]: #

   [MariaDB]: <https://mariadb.org/>
   [Sequelize]: <https://nodejs.org/en/>
   [apiDoc]: <http://apidocjs.com/>
