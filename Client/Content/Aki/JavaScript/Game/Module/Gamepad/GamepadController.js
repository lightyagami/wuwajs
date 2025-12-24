"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Global_1 = require("../../Global");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const GamepadPsFeedbackData_1 = require("./GamepadPsFeedbackData");
const GamepadPsFeedbackListenTagModule_1 = require("./GamepadPsFeedbackListenTagModule");
const GamepadPsFeedbackModule_1 = require("./GamepadPsFeedbackModule");
class GamepadController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.XKt.push(CommonParamById_1.configCommonParamById.GetStringConfig("FKHitForceFeedbackPath"));
    this.XKt.push(CommonParamById_1.configCommonParamById.GetStringConfig("LightHitForceFeedbackPath"));
    this.XKt.push(CommonParamById_1.configCommonParamById.GetStringConfig("HeavyHitForceFeedbackPath"));
    this.xHm.Init();
    return true;
  }
  static OnClear() {
    this.Q_d();
    this.K_d.Clear();
    this.xHm.Clear();
    return true;
  }
  static PlayForceFeedbackByHit(e) {
    var a;
    if (Info_1.Info.IsInGamepad()) {
      if (a = this.$Kt[e]) {
        GamepadController.PlayKuroForceFeedback(a, undefined, false, false, false, "Hit");
      } else {
        a = this.XKt[e];
        ResourceSystem_1.ResourceSystem.LoadAsync(a, UE.KuroForceFeedbackEffect, e => {
          if (e) {
            GamepadController.PlayKuroForceFeedback(e, undefined, false, false, false, "Hit");
          }
        }, 100, "Ui.GamepadUi");
      }
    }
  }
  static X_d() {
    var e = this.Y_d.GetLastFeedbackInfo();
    if (e) {
      this.K_d.PlayFeedback(e.Mode, e.Path);
    } else {
      this.K_d.StopFeedback();
    }
  }
  static z_d(e) {
    var r = InputSettings_1.InputSettings.GetActionMappings(e);
    if (!(r.Num() <= 0)) {
      let a = false;
      let t = false;
      for (let e = r.Num() - 1; e >= 0; e--) {
        var o = r.Get(e).Key.KeyName.toString();
        if (InputSettings_1.InputSettings.GetKey(o)?.IsGamepadKey) {
          if (o === "Gamepad_LeftTrigger") {
            a = true;
          } else if (o === "Gamepad_RightTrigger") {
            t = true;
          }
        }
      }
      if (a && t) {
        return 2;
      } else if (a) {
        return 0;
      } else if (t) {
        return 1;
      } else {
        return undefined;
      }
    }
  }
  static GZf(e) {
    var r = InputSettings_1.InputSettings.GetAxisMappings(e);
    if (!(r.Num() <= 0)) {
      let a = false;
      let t = false;
      for (let e = r.Num() - 1; e >= 0; e--) {
        var o = r.Get(e).Key.KeyName.toString();
        var i = InputSettings_1.InputSettings.GetKey(o);
        if (i?.IsGamepadKey) {
          if (o === "Gamepad_LeftTriggerAxis") {
            if (i.IsInputKeyDown()) {
              a = true;
            }
          } else if (o === "Gamepad_RightTriggerAxis" && i.IsInputKeyDown()) {
            t = true;
          }
        }
      }
      if (a && t) {
        return 2;
      } else if (a) {
        return 0;
      } else if (t) {
        return 1;
      } else {
        return undefined;
      }
    }
  }
  static FZf(e, a) {
    if (Info_1.Info.IsInGamepad()) {
      if (a) {
        return this.GZf(e);
      } else {
        return this.z_d(e);
      }
    }
  }
  static TryAddFeedbackReason(e, a) {
    var t;
    var a = ConfigManager_1.ConfigManager.GamepadConfig?.GetPsFeedbackReason(a);
    if (a) {
      if ((t = this.FZf(a.ActionName, a.IsAxis)) === undefined) {
        this.RemoveFeedbackReason(e);
      } else {
        this.J_d(e, t, a.FeedbackPath);
      }
    }
  }
  static J_d(e, a, t) {
    this.Y_d.AddFeedbackReason(e, a, t);
    this.X_d();
  }
  static RemoveFeedbackReason(e) {
    if (this.Y_d.RemoveFeedbackReason(e)) {
      this.X_d();
    }
  }
  static Q_d() {
    this.Y_d.ClearFeedbackReason();
    this.X_d();
  }
  static PlayKuroForceFeedback(e, a, t, r, o, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 17, "PlayKuroForceFeedback", ["", e?.GetName()], ["bLooping", t], ["reason", i]);
    }
    Global_1.Global.CharacterController.PlayKuroForceFeedback(e, a, t, r, o);
  }
  static StopKuroForceFeedback(e, a) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 17, "StopKuroForceFeedback", ["", e?.GetName()]);
    }
    Global_1.Global.CharacterController.StopKuroForceFeedback(e, a);
  }
}
(exports.GamepadController = GamepadController).XKt = [];
GamepadController.$Kt = [];
GamepadController.Y_d = new GamepadPsFeedbackData_1.GamepadPsFeedbackData();
GamepadController.K_d = new GamepadPsFeedbackModule_1.GamepadPsFeedbackModule();
GamepadController.xHm = new GamepadPsFeedbackListenTagModule_1.GamepadPsFeedbackListenTagModule(); //# sourceMappingURL=GamepadController.js.map