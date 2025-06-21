"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventChangeNpcPerformState = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventChangeNpcPerformState extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), this.ac = "", this.E0 = 0
  }
  ExecuteNew(e, t, r) {
    e ? (this.ac = e.State, this.E0 = e.EntityId, ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId)?.Entity?.IsInit ? this.ExecuteWhenEntitiesReady() : this.CreateWaitEntityTask(e.EntityId)) : Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventChangeNpcPerformState失败，参数错误")
  }
  ExecuteWhenEntitiesReady() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.E0);
    e?.Entity?.IsInit ? (e.Entity.GetComponent(187).PerformGroupController.SwitchPerformState(this.ac), this.FinishExecute(!0)) : Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventChangeNpcPerformState失败，实体没有Activate")
  }
  OnReset() {
    this.ac = "", this.E0 = 0
  }
}
exports.LevelEventChangeNpcPerformState = LevelEventChangeNpcPerformState;
//# sourceMappingURL=LevelEventChangeNpcPerformState.js.map