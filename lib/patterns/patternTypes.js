'use strict';
const syntax = require('esprima.syntax');

const nodeTypes = {
    arrayPattern: syntax.ArrayPattern,
    assignmentPattern: syntax.AssignmentPattern,
    identifier: syntax.Identifier,
    objectPattern: syntax.ObjectPattern,
    restElement: syntax.RestElement
};

module.exports = {
    classification: 'patterns',
    nodeTypes
};