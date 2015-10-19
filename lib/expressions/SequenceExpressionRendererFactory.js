/*
I think this is just an extension of sequence pattern
 */

'use strict';
const expressionTypes = require('./expressionTypes');
const renderHelperNodeTypes = require('../renderHelpers/renderHelperTypes').nodeTypes;
const sequence = renderHelperNodeTypes.sequence;
const comments = renderHelperNodeTypes.comments;

class SequenceExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.sequenceExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let multiline =  nodeDefinition.loc.start.line === nodeDefinition.loc.end.line;
        let sequenceExpressionRender = this.renderContainer.get(sequence).build(nodeDefinition, multiline);
        return this.renderContainer.get(comments).build(nodeDefinition, sequenceExpressionRender);
    }
}

module.exports = SequenceExpressionRendererFactory;