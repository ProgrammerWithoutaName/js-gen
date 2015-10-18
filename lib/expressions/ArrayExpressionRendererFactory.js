'use strict';
const expressionTypes = require('./expressionTypes');
const arrayPattern = require('../patterns/patternTypes').nodeTypes.arrayPattern;
const comments = require('../renderHelpers/renderHelperTypes').nodeTypes.comments;

class ArrayExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.arrayExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build (nodeDefinition) {
        let arrayPatternRender = this.renderContainer.get(arrayPattern).build(nodeDefinition);
        return this.renderContainer.get(comments).build(nodeDefinition, arrayPatternRender);
    }
}

module.exports = ArrayExpressionRendererFactory;