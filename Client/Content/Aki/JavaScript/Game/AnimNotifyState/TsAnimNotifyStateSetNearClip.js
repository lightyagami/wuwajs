"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const CameraModel_1 = require("../Camera/CameraModel");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GlobalData_1 = require("../GlobalData");
class TsAnimNotifyStateSetNearClip extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.NearClip = 10;
  }
  Constructor() {}
  K2_NotifyBegin(e, a, r) {
    return e.GetOwner() instanceof TsBaseCharacter_1.default && !(this.NearClip < 1) && !(UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DelaySetNearClipPlane " + this.NearClip), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Camera", 57, "[ANS设置相机近裁剪面]", ["NearClip", this.NearClip]), 0);
  }
  K2_NotifyEnd(e, a) {
    return e.GetOwner() instanceof TsBaseCharacter_1.default && (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DelaySetNearClipPlane " + CameraModel_1.CAMER_DEFAULT_NEAR_CLIP), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Camera", 57, "[ANS恢复相机近裁剪面]", ["NearClip", CameraModel_1.CAMER_DEFAULT_NEAR_CLIP]), true);
  }
  GetNotifyName() {
    return "设置相机近裁剪面";
  }
}
exports.default = TsAnimNotifyStateSetNearClip;
//# sourceMappingURL=TsAnimNotifyStateSetNearClip.js.map