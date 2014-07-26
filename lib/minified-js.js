(function () {
    'use strict';

    module.exports = function (dataFile) {
        var chars;
        var data;
        var index;

        function prepareObjects() {
            chars = [];

            for (var i = 0, dataFileLength = dataFile.length; i < dataFileLength; i++) {
                var info = {
                    c: dataFile[i],
                    commentOrString: false
                };

                chars.push(info);
            }
        }

        function separateInLines() {
            function oneLine(txt) {
                return txt.replace(/(\r\n|\n|\r)/gm, '');
            }

            function tabsToSpaces(txt) {
                return txt.replace(/\t/g, ' ');
            }

            function oneSpace(txt) {
                return txt.replace(/( +)/g, ' ');
            }

            function deleteSpace(txt, regExp, str) {
                return txt.replace(regExp, str);
            }

            var lines = [];

            var line = {
                txt: ''
            };

            var commentOrString;

            function insertLine() {
                if (line.txt[0] !== '/' && (line.txt[1] !== '/' && line.txt[1] !== '*')) {
                    line.txt = oneLine(line.txt);
                    line.txt = tabsToSpaces(line.txt);
                    line.txt = oneSpace(line.txt);

                    line.txt = deleteSpace(line.txt, (/ {/g), '{');
                    line.txt = deleteSpace(line.txt, (/{ /g), '{');
                    line.txt = deleteSpace(line.txt, (/ }/g), '}');
                    line.txt = deleteSpace(line.txt, (/} /g), '}');
                    line.txt = deleteSpace(line.txt, (/ \(/g), '(');
                    line.txt = deleteSpace(line.txt, (/\( /g), '(');
                    line.txt = deleteSpace(line.txt, (/ \)/g), ')');
                    line.txt = deleteSpace(line.txt, (/\) /g), ')');
                    line.txt = deleteSpace(line.txt, (/ ,/g), ',');
                    line.txt = deleteSpace(line.txt, (/, /g), ',');
                    line.txt = deleteSpace(line.txt, (/ :/g), ':');
                    line.txt = deleteSpace(line.txt, (/: /g), ':');
                    line.txt = deleteSpace(line.txt, (/ ;/g), ';');
                    line.txt = deleteSpace(line.txt, (/; /g), ';');
                    line.txt = deleteSpace(line.txt, (/ \!/g), '!');
                    line.txt = deleteSpace(line.txt, (/\! /g), '!');
                    line.txt = deleteSpace(line.txt, (/ \=/g), '=');
                    line.txt = deleteSpace(line.txt, (/\= /g), '=');
                    line.txt = deleteSpace(line.txt, (/ \|/g), '|');
                    line.txt = deleteSpace(line.txt, (/\| /g), '|');
                    line.txt = deleteSpace(line.txt, (/ \&/g), '&');
                    line.txt = deleteSpace(line.txt, (/\& /g), '&');
                }

                if (line.txt !== '') {
                    lines.push(line);
                }
            }

            for (var i = 0, lengthChars = chars.length; i < lengthChars; i++) {
                var c = chars[i];

                if (c.commentOrString !== commentOrString) {
                    commentOrString = c.commentOrString;

                    insertLine();

                    line = {
                        commentOrString: commentOrString,
                        txt: ''
                    };
                }
                line.txt += c.c;
            }

            insertLine();

            return lines;
        }

        function searchIn(prop) {
            var indexSearch = data.indexOf(prop);

            if (indexSearch === -1) {
                return;
            }

            for (var i = 0, propLength = prop.length; i < propLength; i++) {
                var c = prop[i];

                chars[i + indexSearch + index].commentOrString = true;
            }

            var dataSubstracted = data.substring(indexSearch, (indexSearch + propLength));
            data = data.replace(dataSubstracted, '');

            index += propLength;
        }

        function searchCommentOrString(props) {
            if (props === null) {
                return;
            }

            data = dataFile;

            index = 0;

            for (var i = 0, propsLength = props.length; i < propsLength; i++) {
                searchIn(props[i]);
            }
        }

        prepareObjects();

        searchCommentOrString(dataFile.match(/(\/\*([^\*]|(\*([^\*\/])))*\*\/)|(\/\/.*)|("([^"])*")|('([^'])*')/gm));

        return separateInLines(chars);
    }
}());