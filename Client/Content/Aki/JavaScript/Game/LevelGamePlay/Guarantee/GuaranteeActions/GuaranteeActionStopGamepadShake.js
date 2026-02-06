"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionStopGamepadShake = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Global_1 = require("../../../Global");
const GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionStopGamepadShake extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    if (e) {
      Global_1.Global.CharacterController.StopKuroForceFeedback(e.GamepadShakeAsset, e.Tag);
      if (e.FeedbackComponent?.IsValid()) {
        e.FeedbackComponent.Stop();
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 87, "保底终止");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "执行保底行为GuaranteeActionStopGamepadShake失败，参数错误");
    }
  }
}
exports.GuaranteeActionStopGamepadShake = GuaranteeActionStopGamepadShake;
//# sourceMappingURL=GuaranteeActionStopGamepadShake.js.map