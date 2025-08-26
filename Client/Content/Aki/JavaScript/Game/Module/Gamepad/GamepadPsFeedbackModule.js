"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadPsFeedbackModule = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Global_1 = require("../../Global");
class GamepadPsFeedbackModule {
  constructor() {
    this.Hsd = ResourceSystem_1.ResourceSystem.InvalidId;
  }
  $sd() {
    if (this.Hsd !== ResourceSystem_1.ResourceSystem.InvalidId && (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Hsd), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("PsGamepadFeedback", 10, "资源加载取消", ["路径", this.Hsd]);
    }
  }
  async PlayFeedback(o, e) {
    if (Global_1.Global.CharacterController) {
      this.$sd();
      const t = new CustomPromise_1.CustomPromise();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PsGamepadFeedback", 10, "资源加载开始", ["路径", e]);
      }
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.KuroTriggerEffect, (e, s) => {
        UE.TriggerEffectBPLibrary.Play(Global_1.Global.CharacterController, o, e);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PsGamepadFeedback", 10, "资源加载完成", ["路径", s]);
        }
        this.Hsd = ResourceSystem_1.ResourceSystem.InvalidId;
        t.SetResult();
      }, 102);
      if (e !== ResourceSystem_1.ResourceSystem.InvalidId) {
        this.Hsd = e;
      }
      await t.Promise;
      this.Hsd = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  StopFeedback() {
    this.$sd();
    UE.TriggerEffectBPLibrary.TriggerEffectSetOffMode(Global_1.Global.CharacterController, 2, 0);
  }
  Clear() {
    this.$sd();
    UE.TriggerEffectBPLibrary.TriggerEffectSetOffMode(Global_1.Global.CharacterController, 2, 0);
  }
}
exports.GamepadPsFeedbackModule = GamepadPsFeedbackModule;
//# sourceMappingURL=GamepadPsFeedbackModule.js.map