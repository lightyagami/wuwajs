"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventChangeEntityPerformanceState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventChangeEntityPerformanceState extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t, a) {
    const r = e;
    if (r) {
      let a = undefined;
      let n = undefined;
      switch (r.Type) {
        case IAction_1.EChangeEntityPrefabPerformanceType.Target:
          a = r.EntityId;
          n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
          break;
        case IAction_1.EChangeEntityPrefabPerformanceType.Self:
          if (!t) {
            return;
          }
          a = t.EntityId;
          n = ModelManager_1.ModelManager.CreatureModel.GetEntityById(a);
      }
      if (a) {
        WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelEventChangeEntityPerformanceState.ExecuteNew", a, e => {
          var t;
          if (e) {
            if (e = n?.Entity?.GetComponent(133)) {
              if (t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r.PerformanceTag)) {
                e.ChangePerformanceState(t);
              } else if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("LevelEvent", 36, "[LevelEventChangeEntityPerformanceState] 找不到对应的StateTag", ["pbDataId", a], ["Type", r.Type]);
              }
            } else if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("LevelEvent", 36, "[LevelEventChangeEntityPerformanceState] 找不到对应的SceneItemStateComponent", ["pbDataId", a]);
            }
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelEvent", 36, "[ LevelEventChangeEntityPerformanceState] 找不到对应的Entity", ["pbDataId", a], ["Type", r.Type]);
          }
        });
      }
    }
  }
}
exports.LevelEventChangeEntityPerformanceState = LevelEventChangeEntityPerformanceState;
//# sourceMappingURL=LevelEventChangeEntityPerformanceState.js.map