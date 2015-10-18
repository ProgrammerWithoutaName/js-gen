'use strict';
const eslintReader = require('../eslintReader');
const commaStyleRule = eslintReader['comma-style'] || [2, 'last'];
// matters for same line
const commaSpacingRule = eslintReader['comma-spacing'] || [2, {before: false, after: true}];
const appendComma = commaStyleRule === 'last';

module.exports = {
    spaceBeforeComma: commaSpacingRule[1].before,
    spaceAfterComma: commaSpacingRule[1].before,
    appendCommaWhenMultiline: appendComma
};