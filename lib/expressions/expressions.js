'use strict';

const ArrayExpressionRendererFactory= require('./ArrayExpressionRendererFactory');
const ArrowFunctionExpressionRendererFactory = require('./ArrowFunctionExpressionRendererFactory');
const AssignmentExpressionRendererFactory = require('./AssignmentExpressionRendererFactory');
const BinaryExpressionRendererFactory = require('./BinaryExpressionRendererFactory');
const CallExpressionRendererFactory = require('./CallExpressionRendererFactory');
const ClassExpressionRendererFactory = require('./ClassExpressionRendererFactory');
const ConditionalExpressionRendererFactory = require('./ConditionalExpressionRendererFactory');
const FunctionExpressionRendererFactory = require('./FunctionExpressionRendererFactory');
const LiteralRendererFactory = require('./LiteralRendererFactory');
const LogicalExpressionRendererFactory = require('./LogicalExpressionRendererFactory');
const MemberExpressionRendererFactory = require('./MemberExpressionRendererFactory');
const NewExpressionRendererFactory = require('./NewExpressionRendererFactory');
const ObjectExpressionRendererFactory = require('./ObjectExpressionRendererFactory');
const PropertyRendererFactory = require('./PropertyRendererFactory');
const SequenceExpressionRendererFactory = require('./SequenceExpressionRendererFactory');
const TaggedTemplateExpressionRendererFactory = require('./TaggedTemplateExpressionRendererFactory');
const ThisExpressionRendererFactory = require('./ThisExpressionRendererFactory');
const UnaryExpressionRendererFactory = require('./UnaryExpressionRendererFactory');
const UpdateExpressionRendererFactory = require('./UpdateExpressionRendererFactory');
const SpreadElementRendererFactory = require('./SpreadElementRendererFactory');
const YieldExpressionRendererFactory = require('./YieldExpressionRendererFactory');


function define(renderContainer) {
    renderContainer.register(ArrayExpressionRendererFactory);
    renderContainer.register(ArrowFunctionExpressionRendererFactory);
    renderContainer.register(AssignmentExpressionRendererFactory);
    renderContainer.register(BinaryExpressionRendererFactory);
    renderContainer.register(CallExpressionRendererFactory);
    renderContainer.register(ClassExpressionRendererFactory);
    renderContainer.register(ConditionalExpressionRendererFactory);
    renderContainer.register(FunctionExpressionRendererFactory);
    renderContainer.register(LiteralRendererFactory);
    renderContainer.register(LogicalExpressionRendererFactory);
    renderContainer.register(MemberExpressionRendererFactory);
    renderContainer.register(NewExpressionRendererFactory);
    renderContainer.register(ObjectExpressionRendererFactory);
    renderContainer.register(PropertyRendererFactory);
    renderContainer.register(SequenceExpressionRendererFactory);
    renderContainer.register(TaggedTemplateExpressionRendererFactory);
    renderContainer.register(ThisExpressionRendererFactory);
    renderContainer.register(UnaryExpressionRendererFactory);
    renderContainer.register(UpdateExpressionRendererFactory);
    renderContainer.register(SpreadElementRendererFactory);
    renderContainer.register(YieldExpressionRendererFactory);
}

module.exports = { define };




module.exports = { build };
