'use strict';
const expressionTypes = require('./expressionTypes');
const renderHelperNodeTypes = require('../renderHelpers/renderHelperTypes').nodeTypes;
const comments = renderHelperNodeTypes.comments;
const operatorExpression = renderHelperNodeTypes.operatorExpression;


class AssignmentExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.assignmentExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let assignmentExpressionRender = this.renderContainer.get(operatorExpression).build(nodeDefinition);
        return this.renderContainer.get(comments).build(nodeDefinition, assignmentExpressionRender);
    }
}

module.exports = AssignmentExpressionRendererFactory;