"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowAddBuffAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowAddBuffAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
    this.jQo = [];
  }
  Init(e, o) {
    this.E0 = e;
    this.jQo = o;
    return this;
  }
  OnExecute() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.E0);
    if (e) {
      if (e = e.Entity) {
        if (e.GetComponent(185)) {
          ControllerHolder_1.ControllerHolder.LevelFlowController.LevelFlowAddBuffRequest(this.jQo);
          this.FinishExecute(true);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "实体没有BuffComponent", ["EntityId", this.E0]);
          }
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "未找到实体", ["EntityId", this.E0]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "Entity加载超时或已被移除", ["EntityId", this.E0]);
      }
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityId", this.E0], ["BuffIds", this.jQo.toString()]);
    }
  }
}
exports.LevelFlowAddBuffAction = LevelFlowAddBuffAction;
//# sourceMappingURL=LevelFlowAddBuffAction.js.map