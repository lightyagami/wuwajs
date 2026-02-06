"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventResetPlayerCameraFocus = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const CameraController_1 = require("../../Camera/CameraController");
const CameraUtility_1 = require("../../Camera/CameraUtility");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventResetPlayerCameraFocus extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Event", 57, "进入恢复相机调整");
    }
    var r = e;
    if (r) {
      if (Global_1.Global.BaseCharacter?.IsValid()) {
        var o = r.FadeInTime;
        var t = !r.CannotInterrupt;
        var l = r.Duration ?? 0;
        switch (r.ResetType.Type) {
          case "ResetToDefaultDirection":
            CameraUtility_1.CameraUtility.ResetFocus(o, undefined, t, l);
            break;
          case "ResetToFixedDirection":
            var s = r.ResetType;
            LevelEventResetPlayerCameraFocus.mce.Set(s.Direction.Y ?? 0, s.Direction.Z ?? 0, s.Direction.X ?? 0);
            CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(LevelEventResetPlayerCameraFocus.mce, o, undefined, t, l);
        }
        if (Global_1.Global.BaseCharacter) {
          ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId)?.Entity?.GetComponent(67)?.InterruptAutoMoving("进入相机调整ResetPlayerCameraFocus", true);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Event", 57, "结束恢复相机调整");
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
}
(exports.LevelEventResetPlayerCameraFocus = LevelEventResetPlayerCameraFocus).mce = Rotator_1.Rotator.Create();
//# sourceMappingURL=LevelEventResetPlayerCameraFocus.js.map