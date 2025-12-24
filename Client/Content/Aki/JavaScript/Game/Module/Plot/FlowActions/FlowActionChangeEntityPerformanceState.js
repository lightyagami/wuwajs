"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionChangeEntityPerformanceState = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeEntityPerformanceState extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var a;
    var o;
    var i = this.ActionInfo.Params;
    if (i) {
      let e = undefined;
      let t = undefined;
      switch (i.Type) {
        case IAction_1.EChangeEntityPrefabPerformanceType.Target:
          e = i.EntityId;
          t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
          break;
        case IAction_1.EChangeEntityPrefabPerformanceType.Self:
          e = this.K$i();
          t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
      }
      if (t?.IsInit) {
        if (a = t?.Entity?.GetComponent(142)) {
          if (o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i.PerformanceTag)) {
            a.ChangePerformanceState(o);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Plot", 7, "[FlowActionChangeEntityPerformanceState] 找不到对应的StateTag", ["pbDataId", e], ["Type", i.Type]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 7, "[FlowActionChangeEntityPerformanceState] 找不到对应的SceneItemStateComponent", ["pbDataId", e]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 7, "[ FlowActionChangeEntityPerformanceState] 找不到对应的Entity", ["pbDataId", e], ["Type", i.Type]);
      }
    }
  }
  K$i() {
    let e = undefined;
    switch (this.Context.Context.Type) {
      case 1:
        var t = this.Context.Context;
        e = t.EntityId;
        break;
      case 5:
        t = this.Context.Context;
        e = t.TriggerEntityId;
    }
    return e;
  }
}
exports.FlowActionChangeEntityPerformanceState = FlowActionChangeEntityPerformanceState;
//# sourceMappingURL=FlowActionChangeEntityPerformanceState.js.map