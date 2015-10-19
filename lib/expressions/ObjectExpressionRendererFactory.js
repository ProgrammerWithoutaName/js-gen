'use strict';
const expressionTypes = require('./expressionTypes');
const objectPattern = require('../patterns/patternTypes').nodeTypes.objectPattern;

class ObjectExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.objectExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        return this.renderContainer.get(objectPattern).build(nodeDefinition);
    }
}

module.exports = ObjectExpressionRendererFactory;