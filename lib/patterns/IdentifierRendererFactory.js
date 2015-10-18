'use strict';
const patternTypes = require('./patternTypes');
const renderHelperTypes = require('./../renderHelpers/renderHelperTypes').nodeTypes;

class IdentifierRendererFactory {
    constructor(renderContainer) {
        this.classification = patternTypes.classification;
        this.nodeType = patternTypes.nodeTypes;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let expressionRender = {
            defineRender: renderContext => {
                //Note: something else needs to set the relative positions. this would be a leaf node, effectively.
                let templateRender = renderContext.addRenderTemplate({
                    template: context => nodeDefinition.name,
                    newLine: nodeDefinition.relLoc.line > 0
                });
                templateRender.setRelativeLocation(nodeDefinition.relLoc);
            }
        };
        return this.renderContainer.get(renderHelperTypes.comments).build(nodeDefinition, expressionRender);
    }
}

exports.module = IdentifierRendererFactory;