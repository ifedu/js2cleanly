var app = angular.module('line OX', []);

(function() {
	'use strict';
	_.forEachDeep = function(datas, filter,objeto) {
		filter = filter || '';                  
		objeto = objeto || [];

		_.forEach(datas, function(data) {
			if (typeof data === 'object') {
				if (!data.length) {
					objeto.push(data);
				}
				_.forEachDeep(data, filter, objeto);
			}
		});
		return _.where(objeto, function(obj) {
			return obj[filter] !== undefined;
		});
	};
}());