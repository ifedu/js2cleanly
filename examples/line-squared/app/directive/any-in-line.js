(function() {
    'use strict';
    app.directive('anyInLine', function () {
        return {
            restrict: 'A',
            templateUrl: 'views/partials/table.html',
            link: function(scope) {
                function comprobarLinea(n1, n2, n3, rows) {
                    if ((rows[n1].text !== '') && (rows[n1].text === rows[n2].text) && (rows[n2].text === rows[n3].text)) {
                        rows[n1].optionWin = true;
                        rows[n2].optionWin = true;
                        rows[n3].optionWin = true;

                        scope.victoria = true;
                    }
                }

                function noWin() {
                    var swText = false,
                        rows = _.forEachDeep(scope.columns, 'drawX');

                    _.forEach(rows, function(row) {
                        if (row.text === '') {
                            swText = true;
                        }
                    });

                    if (swText === false) {
                        _.forEach(rows, function(row) {
                            if (row.text === 'X') {
                                row.drawX = true;
                            } else {
                                row.drawO = true;
                            }
                        });
                    }

                    _.forEach(scope.players, function(player) {
                        player.selectPlayer = false;
                    });

                    if (scope.option === 'X') {
                        scope.option = 'O';

                        scope.players[1].selectPlayer = true;

                        scope.src = scope.players[1].src;
                    } else {
                        scope.option = 'X';

                        scope.players[0].selectPlayer = true;

                        scope.src = scope.players[0].src;
                    }
                }

                function win() {
                    _.forEach(scope.players, function(player) {
                        if (player.selectPlayer === true) {
                            player.optionWin = true;
                        }
                    });
                }

                function comprobarFin() {
                    if (scope.victoria === true) {
                        win();
                    } else {
                        noWin();
                    }
                }

                function compruebaGanador() {
                    var rows = _.forEachDeep(scope.columns, 'drawX');
                    //Columnas
                    comprobarLinea(0, 1, 2, rows);
                    comprobarLinea(3, 4, 5, rows);
                    comprobarLinea(6, 7, 8, rows);
                    //Filas
                    comprobarLinea(0, 3, 6, rows);
                    comprobarLinea(1, 4, 7, rows);
                    comprobarLinea(2, 5, 8, rows);
                    //Diagonales
                    comprobarLinea(0, 4, 8, rows);
                    comprobarLinea(2, 4, 6, rows);

                    comprobarFin();
                }

                scope.optionSelect = function(row) {
                    if ((row.text === '') && (scope.victoria === false)) {
                        row.text = scope.option;
                        row.src = scope.src;
                        compruebaGanador();
                    }
                };
            }
        };
    });
}());