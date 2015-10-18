'use strict';

// these are special types, not necessarily listed in esprima.

const nodeTypes = {
    comments: 'comments',
    sequence: 'sequence',
    indent: 'indent',
    spaces: 'spaces',
    newLine: 'newLine',
    parameters: 'parameters',
    operatorExpression: 'operatorExpression'
};

module.exports = {
    classification: 'renderHelpers',
    nodeTypes: nodeTypes
};