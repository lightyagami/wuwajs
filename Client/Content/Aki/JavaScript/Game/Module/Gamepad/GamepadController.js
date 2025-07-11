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
class GamepadController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.XKt.push(CommonParamById_1.configCommonParamById.GetStringConfig("FKHitForceFeedbackPath"));
    this.XKt.push(CommonParamById_1.configCommonParamById.GetStringConfig("LightHitForceFeedbackPath"));
    this.XKt.push(CommonParamById_1.configCommonParamById.GetStringConfig("HeavyHitForceFeedbackPath"));
    return true;
  }
  static PlayForceFeedbackByHit(e) {
    var o;
    if (Info_1.Info.IsInGamepad()) {
      if (o = this.$Kt[e]) {
        Global_1.Global.CharacterController.PlayKuroForceFeedback(o, undefined, false, false, false);
      } else {
        o = this.XKt[e];
        ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.KuroForceFeedbackEffect, e => {
          if (e) {
            Global_1.Global.CharacterController.PlayKuroForceFeedback(e, undefined, false, false, false);
          }
        });
      }
    }
  }
}
(exports.GamepadController = GamepadController).XKt = [];
GamepadController.$Kt = []; //# sourceMappingURL=GamepadController.js.map