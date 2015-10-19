'use strict';
const expressionTypes = require('./expressionTypes');
const renderHelperNodeTypes = require('../renderHelpers/renderHelperTypes').nodeTypes;
const comments = renderHelperNodeTypes.comments;
const call = renderHelperNodeTypes.call;

class CallExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.callExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let callExpressionRender = this.renderContainer.get(call).build(nodeDefinition, true);

        return this.renderContainer.get(comments).build(nodeDefinition, callExpressionRender);
    }
}

module.exports = CallExpressionRendererFactory;