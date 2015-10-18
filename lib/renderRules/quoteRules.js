'use strict';
const eslintReader = require('../eslintReader');

const quotes = eslintReader['quotes'] || [2, 'single', 'avoid-escape'];

const quoteType = quotes[1];

module.exports = {
    quoteType
};