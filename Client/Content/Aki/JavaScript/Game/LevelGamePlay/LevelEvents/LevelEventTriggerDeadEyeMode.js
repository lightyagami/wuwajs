"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventTriggerDeadEyeMode = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTriggerDeadEyeMode extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r, o) {
    var t;
    if (e) {
      if (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) {
        if (t.Entity.GetComponent(242)?.IsDriver) {
          if (r.Type === 5 && r.TriggerEntityId) {
            if (t = EntitySystem_1.EntitySystem.Get(r.TriggerEntityId)) {
              r = t.GetComponent(0);
              ControllerHolder_1.ControllerHolder.DeadEyeModeController.EnterDeadEyeJumpPlatform(e, r.GetCreatureDataId());
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerDeadEyeMode失败，触发器实体不存在");
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerDeadEyeMode失败，上下文参数不对");
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerDeadEyeMode失败，不在驾驶状态");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerDeadEyeMode失败，CurrentEntity为空");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerDeadEyeMode失败，参数错误");
    }
  }
}
exports.LevelEventTriggerDeadEyeMode = LevelEventTriggerDeadEyeMode;
//# sourceMappingURL=LevelEventTriggerDeadEyeMode.js.map