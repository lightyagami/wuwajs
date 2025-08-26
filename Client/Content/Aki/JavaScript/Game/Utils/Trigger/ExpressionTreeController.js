"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionTreeController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ModelManager_1 = require("../../Manager/ModelManager");
const ExpressionTree_1 = require("./ExpressionTree");
class ExpressionTreeController extends ControllerBase_1.ControllerBase {
  static GetDamageExpression(e, r, o = undefined) {
    var s = ModelManager_1.ModelManager.ExpressionModel?.Get(e);
    return s || ((s = new ExpressionTree_1.ExpressionTree()).Parse("结算" + e, r, o), ModelManager_1.ModelManager.ExpressionModel?.Add(e, s), s);
  }
}
exports.ExpressionTreeController = ExpressionTreeController;
//# sourceMappingURL=ExpressionTreeController.js.map