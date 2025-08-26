"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBattleGuideManager = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const TrapDefenseBattleGuideData_1 = require("./TrapDefenseBattleGuideData");
class TrapDefenseBattleGuideManager {
  static Initialize() {}
  static Clear() {
    this.ksd.clear();
  }
  static RegisterBehaviorTreeGuideData(e) {
    var t;
    if (e.IsConstrained) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TowerDefenseBattle", 10, "注册塔防行为约束", ["Type", e.DisableOperation.Type]);
      }
      (t = new TrapDefenseBattleGuideData_1.TrapDefenseBattleGuideData()).BanType = e.DisableOperation.Type;
      t.Tips = e.TidPromptTxt;
      this.ksd.set(e.DisableOperation.Type, t);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TowerDefenseBattle", 10, "删除塔防行为约束", ["Type", e.DisableOperation.Type]);
      }
      this.ksd.delete(e.DisableOperation.Type);
    }
  }
  static CheckCanExecuteAndShowFailTips(e) {
    return this.ksd.size <= 0 || !(e = this.ksd.get(e)) || (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(e.Tips), false);
  }
}
(exports.TrapDefenseBattleGuideManager = TrapDefenseBattleGuideManager).ksd = new Map();
//# sourceMappingURL=TrapDefenseBattleGuideManager.js.map