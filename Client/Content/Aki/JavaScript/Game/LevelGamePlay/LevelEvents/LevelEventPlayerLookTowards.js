"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPlayerLookTowards = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayerLookTowards extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r, o) {
    var a;
    if (e.Target.Type === 2) {
      (a = Vector_1.Vector.Create()).FromConfigVector(e.Target.Pos);
      ModelManager_1.ModelManager.PerformModel.PlayerSightTarget = a;
    } else if (e.Target.Type === 4) {
      ModelManager_1.ModelManager.PerformModel.PlayerSightTarget = undefined;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 26, "PlayerLookTowards配置类型不支持");
    }
    this.FinishExecute(true);
  }
}
exports.LevelEventPlayerLookTowards = LevelEventPlayerLookTowards;
//# sourceMappingURL=LevelEventPlayerLookTowards.js.map