"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetTeleControl = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetTeleControl extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var l;
    if (e.Config.Type !== "OpenGravity") {
      this.FinishExecute(true);
    } else {
      l = (e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e.Config.EntityId))?.Entity?.GetComponent(157);
      if (e?.Valid && l) {
        if (l.GetState() === 11) {
          this.FinishExecute(true);
        } else if (l.GetState() !== 1) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 39, "[LevelEventSetTeleControl] 被控物不处于Reset状态");
          }
          this.FinishExecute(false);
        } else {
          l?.SetState(11, "LevelEventSetTeleControl Execute");
          this.FinishExecute(true);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 39, "[LevelEventSetTeleControl] 找不到对应的实体组件");
        }
        this.FinishExecute(false);
      }
    }
  }
}
exports.LevelEventSetTeleControl = LevelEventSetTeleControl;
//# sourceMappingURL=LevelEventSetTeleControl.js.map