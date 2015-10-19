'use strict';
const renderHelperTypes = require('../renderHelpers/renderHelperTypes');
const parameters = renderHelperTypes.nodeTypes.parameters;

class CallRendererFactory {
    constructor(renderContainer) {
        this.nodeType = renderHelperTypes.nodeTypes.call;
        this.classification = renderHelperTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition, setRelLoc) {
        return  {
            defineRender: renderContext => {
                let templateRender = renderContext.addRenderTemplate({
                    template: context => `${context.callee}(${context.arguments})`,
                    newLine: setRelLoc && nodeDefinition.relLoc.line > 0
                });

                templateRender.define({
                    name: 'callee',
                    renderDefinition: this.renderContainer.get(nodeDefinition.callee.type).build(nodeDefinition.callee)
                });

                templateRender.define({
                    name: 'arguments',
                    renderDefinition: this.renderContainer.get(parameters).build(nodeDefinition.arguments)
                });

                if(setRelLoc) {
                    templateRender.setRelativeLocation(nodeDefinition.relLoc);
                }
            }
        };
    }
}

module.exports = CallRendererFactory;