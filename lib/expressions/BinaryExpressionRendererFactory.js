'use strict';
const expressionTypes = require('./expressionTypes');
const renderHelperNodeTypes = require('../renderHelpers/renderHelperTypes').nodeTypes;
const comments = renderHelperNodeTypes.comments;
const operatorExpression = renderHelperNodeTypes.operatorExpression;


class BinaryExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.binaryExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let binaryExpressionRender = this.renderContainer.get(operatorExpression).build(nodeDefinition);
        return this.renderContainer.get(comments).build(nodeDefinition, binaryExpressionRender);
    }
}

module.exports = BinaryExpressionRendererFactory;