"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventRestorePlayerCameraAdjustment = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ConfigCurveUtils_1 = require("../../Utils/ConfigCurveUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRestorePlayerCameraAdjustment extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (!e) {
      this.FinishExecute(false);
    }
    var t;
    var o;
    var n = Global_1.Global.BaseCharacter;
    if (n && e?.ResetFocus) {
      t = e.ResetFocus.FadeInTime;
      o = ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(e.ResetFocus.FadeInCurve);
      n.GetEntityNoBlueprint().GetComponent(34).ResetPitch(t, o);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Event", 38, "离开相机调整");
    }
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.RestoreCameraFromAdjust(e?.ResetFocus?.FadeInTime);
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemGuaranteeAction, this.Type, this.BaseContext, {
      Name: "RestorePlayerCameraAdjustment"
    }, true);
  }
}
exports.LevelEventRestorePlayerCameraAdjustment = LevelEventRestorePlayerCameraAdjustment;
//# sourceMappingURL=LevelEventRestorePlayerCameraAdjustment.js.map