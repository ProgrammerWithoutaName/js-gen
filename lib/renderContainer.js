'use strict';
const patterns = require('./patterns/definePatterns');

class RenderContainer {
    constructor () {
        this.rendererFactories = new Map();
        this.rendererClassifications = new Map();
    }

    register(RendererFactory) {
        let rendererFactory = new RendererFactory(this);
        this.rendererFactories.set(rendererFactory.nodeType, rendererFactory);
        registerClassification(rendererFactory);
    }

    registerClassification(rendererFactory) {
        if(!this.rendererClassifications.has(rendererFactory.classification)) {
            this.rendererClassifications.set(rendererFactory.classification, new Map());
        }
        let classification = this.rendererClassifications.get(rendererFactory.classification);
        classification.set(rendererFactory.nodeType, rendererFactory);
    }

    get(nodeType) {
        return this.rendererFactories.get(nodeType);
    }
}

module.exports = new RenderContainer();