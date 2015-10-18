'use strict';
const eslintReader = require('../eslintReader');

const arrayBracketSpacing = eslintReader['array-bracket-spacing'] || [2, 'always'];
const arrayBracketRule = arrayBracketSpacing[1];

module.exports = {
    useSpacesBetweenBrackets: arrayBracketRule !== 'never'
};