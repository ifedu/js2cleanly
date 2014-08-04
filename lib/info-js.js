(function () {
    'use strict';

    module.exports = function (lines) {        
        function prepareLinesChars() {
            function prepareChars(line) {
                var infoLine = [];

                for (var i = 0, lengthLine = line.txt.length; i < lengthLine; i++) {
                    var c = line.txt[i];

                    var info = {
                        c: c
                    }

                    infoLine.push(info);
                }

                if (line.commentOrString === true && line.txt[0] === '/' && line.txt[1] === '/') {
                    line.commentOneLine = true;
                }

                if (line.commentOrString === true && line.txt[0] === '/' && line.txt[1] === '*') {
                    line.commentMultiLine = true;
                }

                line.infoChars = infoLine;
            }

            function prepareLines() {
                for (var i = 0, lengthLines = lines.length; i < lengthLines; i++) {
                    prepareChars(lines[i]);
                }
            }

            prepareLines();
        }

        function info() {
            var data;
            var index = 0;

            function searchIn(chars, type, prop) {
                var indexSearch = data.indexOf(prop);

                if (indexSearch === -1) {
                    return;
                }

                for (var i = 0, propLength = prop.length; i < propLength; i++) {
                    var c = prop[i];

                    chars[i + indexSearch + index][type] = true;
                }

                var dataSubstracted = data.substring(indexSearch, (indexSearch + propLength));
                data = data.replace(dataSubstracted, '');

                index += propLength;
            }

            function searchRegExp(line, type, props) {
                if (props === null) {
                    return;
                }

                data = line.txt;

                index = 0;

                for (var i = 0, propsLength = props.length; i < propsLength; i++) {
                    searchIn(line.infoChars, type, props[i]);
                }
            }

            function infoLines() {
                for (var i = 0, lengthLines = lines.length; i < lengthLines; i++) {
                    var line = lines[i];

                    if (line.commentOrString !== true) {
                        searchRegExp(line, 'break', line.txt.match(/([^\w\.$])break(?![\w\.$])/g));
                        searchRegExp(line, 'case', line.txt.match(/([^\w\.$])case(?![\w\.$])/g));
                        searchRegExp(line, 'default', line.txt.match(/([^\w\.$])default(?![\w\.$])/g));
                        searchRegExp(line, 'else', line.txt.match(/([^\w\.$])else(?![\w\.$])/g));
                        searchRegExp(line, 'for', line.txt.match(/([^\w\.$])for(?![\w\.$])/g));
                        searchRegExp(line, 'function', line.txt.match(/([^\w\.$])function(?![\w\.$])/g));
                        searchRegExp(line, 'if', line.txt.match(/([^\w\.$])if(?![\w\.$])/g));
                        searchRegExp(line, 'switch', line.txt.match(/([^\w\.$])switch(?![\w\.$])/g));
                        searchRegExp(line, 'var', line.txt.match(/([^\w\.$])var(?![\w\.$])/g));
                        searchRegExp(line, 'while', line.txt.match(/([^\w\.$])while(?![\w\.$])/g));
                    }
                }
            }

            infoLines();
        }

        prepareLinesChars(lines);

        info(lines);
    };
}());