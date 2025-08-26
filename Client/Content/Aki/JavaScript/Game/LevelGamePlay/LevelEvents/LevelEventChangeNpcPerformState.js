"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventChangeNpcPerformState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventChangeNpcPerformState extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.ac = "";
    this.E0 = 0;
  }
  ExecuteNew(e, t, r) {
    if (e) {
      this.ac = e.State;
      this.E0 = e.EntityId;
      if (ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId)?.Entity?.IsInit) {
        this.ExecuteWhenEntitiesReady();
      } else {
        this.CreateWaitEntityTask(e.EntityId);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventChangeNpcPerformState失败，参数错误");
    }
  }
  ExecuteWhenEntitiesReady() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.E0);
    if (e?.Entity?.IsInit) {
      e.Entity.GetComponent(188).PerformGroupController.SwitchPerformState(this.ac);
      this.FinishExecute(true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventChangeNpcPerformState失败，实体没有Activate");
    }
  }
  OnReset() {
    this.ac = "";
    this.E0 = 0;
  }
}
exports.LevelEventChangeNpcPerformState = LevelEventChangeNpcPerformState;
//# sourceMappingURL=LevelEventChangeNpcPerformState.js.map