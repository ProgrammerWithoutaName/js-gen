'use strict';
const eslintReader = require('../eslintReader');

const spaceBeforeFunctionParenthesis = eslintReader['space-before-function-paren'] || [2, 'always'];

const spaceBeforeParenthesis = spaceBeforeFunctionParenthesis[1] === 'always';

module.exports = {
    spaceBeforeParenthesis
};