'use strict';
const patternTypes = require('./patternTypes');
const renderHelperNodeTypes = require('../renderHelpers/renderHelperTypes').nodeTypes;
const comments = renderHelperNodeTypes.comments;
const operatorExpression = renderHelperNodeTypes.operatorExpression;

class AssignmentPatternRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.assignmentPattern;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let assignmentPatternRendererFactory = this.renderContainer.get(operatorExpression).build(nodeDefinition);
        return this.renderContainer.get(comments).build(nodeDefinition, assignmentPatternRendererFactory);
    }
}

module.exports = AssignmentPatternRendererFactory;