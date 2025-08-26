"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Global_1 = require("../../Global");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const GamepadPsFeedbackData_1 = require("./GamepadPsFeedbackData");
const GamepadPsFeedbackModule_1 = require("./GamepadPsFeedbackModule");
class GamepadController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.XKt.push(CommonParamById_1.configCommonParamById.GetStringConfig("FKHitForceFeedbackPath"));
    this.XKt.push(CommonParamById_1.configCommonParamById.GetStringConfig("LightHitForceFeedbackPath"));
    this.XKt.push(CommonParamById_1.configCommonParamById.GetStringConfig("HeavyHitForceFeedbackPath"));
    return true;
  }
  static OnClear() {
    this.Osd();
    this.qsd.Clear();
    return true;
  }
  static PlayForceFeedbackByHit(e) {
    var a;
    if (Info_1.Info.IsInGamepad()) {
      if (a = this.$Kt[e]) {
        Global_1.Global.CharacterController.PlayKuroForceFeedback(a, undefined, false, false, false);
      } else {
        a = this.XKt[e];
        ResourceSystem_1.ResourceSystem.LoadAsync(a, UE.KuroForceFeedbackEffect, e => {
          if (e) {
            Global_1.Global.CharacterController.PlayKuroForceFeedback(e, undefined, false, false, false);
          }
        });
      }
    }
  }
  static Gsd() {
    var e = this.Fsd.GetLastFeedbackInfo();
    if (e) {
      this.qsd.PlayFeedback(e.Mode, e.Path);
    } else {
      this.qsd.StopFeedback();
    }
  }
  static Nsd(e) {
    if (Info_1.Info.IsInGamepad()) {
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
  }
  static TryAddFeedbackReason(e, a) {
    var t;
    var a = ConfigManager_1.ConfigManager.GamepadConfig?.GetPsFeedbackReason(a);
    if (a) {
      if ((t = this.Nsd(a.ActionName)) === undefined) {
        this.RemoveFeedbackReason(e);
      } else {
        this.Vsd(e, t, a.FeedbackPath);
      }
    }
  }
  static Vsd(e, a, t) {
    this.Fsd.AddFeedbackReason(e, a, t);
    this.Gsd();
  }
  static RemoveFeedbackReason(e) {
    if (this.Fsd.RemoveFeedbackReason(e)) {
      this.Gsd();
    }
  }
  static Osd() {
    this.Fsd.ClearFeedbackReason();
    this.Gsd();
  }
}
(exports.GamepadController = GamepadController).XKt = [];
GamepadController.$Kt = [];
GamepadController.Fsd = new GamepadPsFeedbackData_1.GamepadPsFeedbackData();
GamepadController.qsd = new GamepadPsFeedbackModule_1.GamepadPsFeedbackModule(); //# sourceMappingURL=GamepadController.js.map