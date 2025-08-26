"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
class TsAnimNotifyStateEnableAimIK extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.SkeletonChange = false;
    this.SightBoneName = undefined;
    this.BeginBoneName = undefined;
    this.EndBoneName = undefined;
    this.AssistLimit = -0;
    this.OldSightBoneName = undefined;
    this.OldBeginBoneName = undefined;
    this.OldEndBoneName = undefined;
    this.OldCameraMode = 0;
    this.OldAssistLimit = -0;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, i) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      var s = t.CharacterActorComponent?.Entity;
      if (s) {
        var s = s.GetComponent(178).MainAnimInstance;
        if (UE.KuroStaticLibrary.IsObjectClassByName(s, CharacterNameDefines_1.CharacterNameDefines.ABP_MONSTERCOMMON)) {
          this.OldSightBoneName = (s = s)["Sight Bone Name"];
          this.OldBeginBoneName = s["Begin Bone Name"];
          this.OldEndBoneName = s["End Bone Name"];
          this.OldCameraMode = s.CameraMode;
          this.OldAssistLimit = s["Assist Limit"];
          s["Sight Bone Name"] = this.SightBoneName;
          s["Begin Bone Name"] = this.BeginBoneName;
          s["End Bone Name"] = this.EndBoneName;
          s.CameraMode = 3;
          s.CameraModeType = 3;
          s["Assist Limit"] = this.AssistLimit;
          if (this.SkeletonChange) {
            s.Increment += 1;
          }
          return true;
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 57, "No Entity for TsBaseCharacter ", ["Name", t.GetName()], ["location", t.D_K2_GetActorLocation()]);
      }
    }
    return false;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      var i = t.CharacterActorComponent?.Entity;
      if (i) {
        var i = i.GetComponent(178).MainAnimInstance;
        if (UE.KuroStaticLibrary.IsObjectClassByName(i, CharacterNameDefines_1.CharacterNameDefines.ABP_MONSTERCOMMON)) {
          (i = i)["Sight Bone Name"] = this.OldSightBoneName;
          i["Begin Bone Name"] = this.OldBeginBoneName;
          i["End Bone Name"] = this.OldEndBoneName;
          i.CameraMode = this.OldCameraMode;
          i.CameraModeType = this.OldCameraMode;
          i["Assist Limit"] = this.OldAssistLimit;
          return true;
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 57, "No Entity for TsBaseCharacter", ["Name", t.GetName()], ["location", t.D_K2_GetActorLocation()]);
      }
    }
    return false;
  }
  GetNotifyName() {
    return "瞄准动作IK";
  }
}
exports.default = TsAnimNotifyStateEnableAimIK;
//# sourceMappingURL=TsAnimNotifyStateEnableAimIK.js.map