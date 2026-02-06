"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowUseSkillAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowUseSkillAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
    this.wmo = 0;
  }
  Init(e, t) {
    this.E0 = e;
    this.wmo = t;
    return this;
  }
  OnExecute() {
    var e = EntitySystem_1.EntitySystem.GetComponent(this.E0, 42);
    if (e) {
      e.BeginSkillAsync(this.wmo, {
        Reason: "LevelFlowUseSkillAction"
      });
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, `LevelFlowUseSkillAction OnExecute entityId: ${this.E0} not found BaseSkillComponent`);
      }
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityId", this.E0], ["SkillId", this.wmo]);
    }
  }
}
exports.LevelFlowUseSkillAction = LevelFlowUseSkillAction;
//# sourceMappingURL=LevelFlowUseSkillAction.js.map