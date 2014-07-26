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