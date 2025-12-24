"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowSetTimeDilation = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowSetTimeDilation extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
    this.s1t = 1;
  }
  Init(e, t) {
    this.E0 = e;
    this.s1t = t;
    return this;
  }
  OnExecute() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.E0);
    if (e?.Valid && e.Entity?.Valid) {
      e.Entity.SetTimeDilation(this.s1t);
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "LevelFlowSetTimeDilation 实体不存在", ["EntityId", this.E0]);
      }
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityId", this.E0], ["TimeDilation", this.s1t]);
    }
  }
}
exports.LevelFlowSetTimeDilation = LevelFlowSetTimeDilation;
//# sourceMappingURL=LevelFlowSetTimeDilation.js.map