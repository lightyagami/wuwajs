"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateMontageSpeedChange extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.MontagePlayRate = -0;
  }
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    var a = e.GetOwner();
    if (a instanceof TsBaseCharacter_1.default) {
      a.GetEntityNoBlueprint()?.GetComponent(181)?.MainAnimInstance?.Montage_SetPlayRate(undefined, this.MontagePlayRate);
    } else {
      e.GetAnimInstance()?.Montage_SetPlayRate(undefined, this.MontagePlayRate);
    }
    return true;
  }
  K2_NotifyEnd(e, t) {
    var r = e.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      r.GetEntityNoBlueprint()?.GetComponent(181)?.MainAnimInstance?.Montage_SetPlayRate(undefined, 1);
    } else {
      e.GetAnimInstance()?.Montage_SetPlayRate(undefined, 1);
    }
    return true;
  }
  GetNotifyName() {
    return "配置蒙太奇播放速度变化";
  }
}
exports.default = TsAnimNotifyStateMontageSpeedChange;
//# sourceMappingURL=TsAnimNotifyStateMontageSpeedChange.js.map