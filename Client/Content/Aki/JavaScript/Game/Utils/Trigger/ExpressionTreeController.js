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
    this.wXd.Start();
    r = this.GetDamageExpression(r);
    this.wXd.Stop();
    this.LXd.Start();
    r.Evaluate(e, {
      Attacker: o
    });
    this.LXd.Stop();
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
(exports.ExpressionTreeController = ExpressionTreeController).wXd = Stats_1.Stat.Create("GetDamageExpression");
ExpressionTreeController.LXd = Stats_1.Stat.Create("DoDamageExpression"); //# sourceMappingURL=ExpressionTreeController.js.map