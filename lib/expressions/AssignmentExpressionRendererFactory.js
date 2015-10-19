'use strict';
const expressionTypes = require('./expressionTypes');
const assignmentPattern = require('../patterns/patternTypes').nodeTypes.assignmentPattern;

class AssignmentExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.assignmentExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        return this.renderContainer.get(assignmentPattern).build(nodeDefinition);
    }
}

module.exports = AssignmentExpressionRendererFactory;