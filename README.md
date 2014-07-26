js2cleanly
==========

Descripción

Pasa un fichero .js a .js-cleanly, a continuación las diferencias entre .js y .js-cleanly:

##### Uso #####

```
npm install js2cleanly

var jsCleanly = require('js2cleanly.js');

jsCleanly('archivoOrigen', 'archivoDestino');
```

##### No es necesario declarar variable #####
##### No es necesario ; para acabar la sentencia #####

```javascript
var numero = 5;
```

```javascript
numero = 5
```


##### Los parámetros de una función no necesitan , para separarse. #####
##### Ni en bucles ni en funciones se necesitan {}, se anida por tabulación #####
*js*

```javascript
function alumno(nombre, apellidos) {
	var nombreCompleto = nombre + ' ' + apellidos;

	return;
}
```
*js-cleanly*

```javascript
function alumno(nombre apellidos)
	nombreCompleto = nombre + ' ' + apellidos
	
	return
```


##### Los bucles no necesitan los paréntesis de abertura y cierre #####
*js*

```javascript
var num = 7;

if (num === 5) {
	console.log('Es 5');
} else if ((num > 5) && (num < 10)) {
	console.log('Está entre 5 y 10');
}
```
*js-cleanly*

```javascript
num = 7

if num === 5
	console.log('Es 5')
else if (num > 5) && (num < 10)
	console.log('Está entre 5 y 10')
```


##### Los objetos no necesitan {} : , ni " en las propiedades salvo que sea compuesta, la anidación será por tabulación y si es un array de objetos estos se separan con --- #####
*js*

```javascript
[
    {
        "_id": "53d32cdf0f981a34f88c77ba",
        "index": 0,
        "eyeColor": "blue",
        "tags": [
            "ad",
            "excepteur",
            "magna",
            "enim"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Mcknight Mcintosh"
            },
            {
                "id": 1,
                "name": "Stokes Walters"
            },
            {
                "id": 2,
                "name": "Stout Blevins"
            }
        ],
        "greeting": "Hello, Deirdre Morrison! You have 5 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "53d32cdf8968e42ca9d82183",
        "index": 1,
        "age": 39,
        "eyeColor": "blue",
        "tags": [
            "non",
            "ea",
            "enim"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Emerson Mcdonald"
            },
            {
                "id": 1,
                "name": "Julie Frazier"
            },
            {
                "id": 2,
                "name": "Patrica Mccray"
            }
        ],
        "greeting": "Hello, Baird Mcbride! You have 10 unread messages.",
        "favoriteFruit": "banana"
    }
]
```
*js-cleanly*

```javascript
[
    _id "53d32cdf0f981a34f88c77ba"
    index 0
    eyeColor "blue"
    tags [
        "ad"
        "excepteur"
        "magna"
        "enim"
    ],
    friends [
        id 0
        name "Mcknight Mcintosh"
    	---
        id 1
        name "Stokes Walters"
    	---
        id 2
        name "Stout Blevins"
    ]
    greeting "Hello, Deirdre Morrison! You have 5 unread messages."
    favoriteFruit "apple"
	---
    _id "53d32cdf8968e42ca9d82183"
    index 1
    age 39
    eyeColor "blue"
    tags [
        "non"
        "ea"
        "enim"
    ]
    friends [
        id 0
        name "Emerson Mcdonald"
    	---
        id 1
        name "Julie Frazier"
    	---
        id 2,
        name "Patrica Mccray"
    ]
    greeting "Hello, Baird Mcbride! You have 10 unread messages."
    favoriteFruit "banana"
]
```


** Ejemplo de Javascript **

```javascript
(function() {
	'use strict';
	app.provider('threeInRay', function() {
		var i,
		j,
		columns = [],
		row = {
			drawO: false,
			drawX: false,
			optionWin: false,
			text: ''
		},
		rows = [];
		for (i = 0; i < 3; i++) {
			for (j = 0; j < 3; j++) {
				rows.push(_.clone(row));
			}
			columns.push({
				rows: _.clone(rows)
			});
			rows = [];
		}
		var players = [{
				name: 'Player 1',
				optionWin: false,
				selectPlayer: false,
				tipo: 'X'
			}, {
				name: 'Player 2',
				optionWin: false,
				selectPlayer: false,
				tipo: 'O'
			}];
		this.$get = function() {
			return {
				columns: columns,
				players: players
			};
		};
	});
}());
```

** Ejemplo de Javascript-cleanly **

```javascript
(function()
    'use strict'
    app.provider('threeInRay' function()
        columns = []
        row = 
            drawO false
            drawX false
            optionWin false
            text ''
        rows = []
        for i = 0; i < 3; i++
            for j = 0; j < 3; j++
                rows.push(_.clone(row))
            columns.push(
                rows _.clone(rows)
            )
            rows = []
        players = [
            name 'Player 1'
            optionWin false
            selectPlayer false
            tipo 'X'
        	---
            name 'Player 2'
            optionWin false
            selectPlayer false
            tipo 'O'
        ]
        this.$get = function()
            return
                columns columns
                players players
    )
())
```