"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionTreeController = undefined;
const Stats_1 = require("../../../Core/Common/Stats");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatLog_1 = require("../CombatLog");
const ExpressionTree_1 = require("./ExpressionTree");
class ExpressionTreeController extends ControllerBase_1.ControllerBase {
  static GetDamageExpression(e) {
    var r = ModelManager_1.ModelManager.ExpressionModel?.Get(e.Id);
    return r || ((r = new ExpressionTree_1.ExpressionTree()).Parse("结算" + e.Id, e.Condition, e.ConstVariables), ModelManager_1.ModelManager.ExpressionModel?.Add(e.Id, r), r);
  }
  static DoDamageExpression(e, r, o) {
    this.r0m.Start();
    r = this.GetDamageExpression(r);
    this.r0m.Stop();
    this.o0m.Start();
    r.Evaluate(e, {
      Attacker: o
    });
    this.o0m.Stop();
  }
  static GetEffectDamageId(e, o) {
    var t = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(e);
    if (t?.Condition) {
      let r = 0;
      ExpressionTreeController.DoDamageExpression({
        ContextType: 3,
        DamageCb: e => {
          r = e;
        }
      }, t, o);
      return r;
    }
    return e;
  }
}
(exports.ExpressionTreeController = ExpressionTreeController).r0m = Stats_1.Stat.Create("GetDamageExpression");
ExpressionTreeController.o0m = Stats_1.Stat.Create("DoDamageExpression"); //# sourceMappingURL=ExpressionTreeController.js.map