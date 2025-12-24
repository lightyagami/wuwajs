"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowSetClientEntityVisible = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowSetClientEntityVisible extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.pDe = undefined;
  }
  Init(e) {
    this.pDe = e;
    return this;
  }
  OnExecute() {
    var e = this.pDe;
    if (e) {
      if (e.EntityIds && e.EntityIds.length !== 0) {
        for (const o of e.EntityIds) {
          var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o)?.Entity;
          if (t?.Valid) {
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t, e.Visible, "LevelEventSetClientEntityVisible", true);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelEvent", 31, "目标Entity不存在", ["PbDataId", o]);
          }
        }
        this.FinishExecute(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 31, "目标Entity未配置");
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "参数类型错误");
      }
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityIds", this.pDe?.EntityIds], ["Visible", this.pDe?.Visible]);
    }
  }
}
exports.LevelFlowSetClientEntityVisible = LevelFlowSetClientEntityVisible;
//# sourceMappingURL=LevelFlowSetClientEntityVisible.js.map