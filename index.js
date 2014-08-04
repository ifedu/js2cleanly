module.exports = function (dataFile) {
    'use strict';

    function newFile(lines) {
        var conditional;
        var is = {};
        var parenthesis = 0;
        var tab = '';
        var txt = '';

        function newLine() {
            if (is.newLine === true) {
                is.newLine = false;
                txt += '\n';

                if (is.doubleNewLine === true) {
                    txt += '\n';
                    is.doubleNewLine = false;
                }
                txt += tab;
            }
        }

        function tabAdd() {
            tab += '    ';
        }

        function tabDel() {
            tab = tab.replace('    ', '');
        }

        function check(c, cNext, cPrev) {
            switch (c.c) {
                case '{':
                    is.for = false;
                    is.newLine = true;
                    is.parameter = false;

                    tabAdd();
                    break;

                case '}':
                    if (cPrev && cPrev.c !== '{') {
                        is.doubleNewLine = true;
                        is.newLine = true;
                    }

                    tabDel();
                    break;

                case '[':
                    if (cNext && cNext.c !== ']') {
                        //is.newLine = true;
                    }
                    txt += '[';

                    tabAdd();
                    break;

                case ']':
                    is.newLine = false;

                    tabDel();

                    if (cPrev && cPrev.c !== '[') {
                        //txt += '\n' + tab;
                    }
                    txt += ']';
                    break;

                case '(':
                    if (cPrev && (cPrev.for === true || cPrev.if === true || cPrev.while === true)) {
                        conditional = true;
                        txt += ' ';
                    }

                    newLine();
                    is.parameter = true;

                    if (parenthesis > 0 || conditional !== true) {
                        txt += '(';
                    }

                    if (conditional === true) {
                        parenthesis++;
                    }
                    break;

                case ')':
                    if (is.newLine === true) {
                        newLine();
                        is.newLine = false;
                    }

                    if (parenthesis !== 1) {
                        txt += ')';
                    }

                    if (conditional === true) {
                        parenthesis--;
                    }

                    if (parenthesis === 0) {
                        conditional = false;
                    }
                    break;

                case ':':
                    if (is.case === true) {
                        is.newLine = true;
                    } else if (cNext && cNext.c !== '{') {
                        txt += ' ';
                    }
                    break;

                case ';':
                    if (is.for === true) {
                        txt += '; ';
                    } else {
                        is.newLine = true;
                    }
                    break;

                case ',':
                    if ((cPrev && cPrev.c === '}') && (cNext && cNext.c === '{')) {
                        txt += '\n' + tab + '\t---';
                    }

                    if (is.parameter !== true) {
                        is.newLine = true;
                    } else {
                        txt += ' ';
                    }
                    break;

                case '&': case '|':
                    if (cPrev && cNext && cNext.c === c.c) {
                        txt += ' ';
                    }

                    txt += c.c;

                    if (cPrev && cPrev.c === c.c) {
                        txt += ' ';
                    }
                    break;

                case '=':
                    if (cPrev && cPrev.c !== '=' && cPrev.c !== '!' && cPrev.c !== '+') {
                        txt += ' ';
                    }

                    txt += '=';

                    if (!cNext || (cNext && (cNext.c !== '=' && cNext.c !== '{'))) {
                        txt += ' ';
                    }
                    break;

                case '!':
                    txt += ' !';
                    break;

                case ' ':
                    if (cPrev && cPrev.var === true) {
                        return;
                    }

                    if (cPrev && cPrev.commentOneLine !== true) {
                        txt += ' ';
                    }
                    break;

                default:
                    if (c.break === true) {
                        if (is.case === true) {
                            is.case = false;
                            tabDel();
                        }
                        return;
                    }

                    if (c.else === true) {
                        is.doubleNewLine = false;
                    }

                    if (c.var === true) {
                        return;
                    }

                    if (cPrev && cPrev.for === true) {
                        is.for = true;
                    }

                    if (is.var !== false) {
                        is.var = false;
                    }

                    newLine();
                    txt += c.c;

                    if ((c.case === true || c.default === true) && is.case !== true) {
                        is.case = true;
                        tabAdd();
                    }
                    break;
            }
        }

        function commentOrString(line) {
            if (line.commentOneLine === true || line.commentMultiLine === true) {
                is.commentOrString = true;
                txt += newLine();
            }
        }

        function prevCommentOrString(i, c) {
            if (is.commentOrString === true && i === 0 && c.c === ' ') {
                is.commentOrString = false;

                return true;
            }
            is.commentOrString = false;
        }

        function readChars(line) {
            for (var i = 0, lengthLine = line.infoChars.length; i < lengthLine; i++) {
                var c = line.infoChars[i];
                var cNext = line.infoChars[i + 1];
                var cPrev = line.infoChars[i - 1];

                if (prevCommentOrString(i, c) === true) {
                    continue;
                }

                check(c, cNext, cPrev);
            }

            commentOrString(line);
        }

        function readLines(lines) {
            for (var i = 0, lengthLines = lines.length; i < lengthLines; i++) {
                var line = lines[i];

                if (line.commentOrString === true) {
                    if (line.commentMultiLine === true || line.commentOneLine === true) {
                        if (txt !== '') {
                            txt += '\n';
                        }

                        txt += tab + line.txt;

                        is.newLine = true;
                    } else {
                        newLine();
                        txt += line.txt;
                    }

                    continue;
                }

                readChars(line);
            }
        }
        readLines(lines);

        return txt;
    }

    var minified = require('./lib/minified-js.js')
    var lines = minified(dataFile);

    var info = require('./lib/info-js.js');
    info(lines);

    return newFile(lines);
};