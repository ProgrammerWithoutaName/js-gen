'use strict';
const expressionTypes = require('./expressionTypes');
const renderHelperNodeTypes = require('../renderHelpers/renderHelperTypes').nodeTypes;
const comments = renderHelperNodeTypes.comments;
const operatorExpression = renderHelperNodeTypes.operatorExpression;


class LogicalExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.logicalExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let logicalExpressionRender = this.renderContainer.get(operatorExpression).build(nodeDefinition);
        return this.renderContainer.get(comments).build(nodeDefinition, logicalExpressionRender);
    }
}

module.exports = LogicalExpressionRendererFactory;