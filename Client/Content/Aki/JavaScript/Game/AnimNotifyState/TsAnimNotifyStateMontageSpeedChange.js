"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateMontageSpeedChange extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), this.MontagePlayRate = -0
  }
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    var a = e.GetOwner();
    return a instanceof TsBaseCharacter_1.default ? a.GetEntityNoBlueprint()?.GetComponent(177)?.MainAnimInstance?.Montage_SetPlayRate(void 0, this.MontagePlayRate) : e.GetAnimInstance()?.Montage_SetPlayRate(void 0, this.MontagePlayRate), !0
  }
  K2_NotifyEnd(e, t) {
    var r = e.GetOwner();
    return r instanceof TsBaseCharacter_1.default ? r.GetEntityNoBlueprint()?.GetComponent(177)?.MainAnimInstance?.Montage_SetPlayRate(void 0, 1) : e.GetAnimInstance()?.Montage_SetPlayRate(void 0, 1), !0
  }
  GetNotifyName() {
    return "配置蒙太奇播放速度变化"
  }
}
exports.default = TsAnimNotifyStateMontageSpeedChange;
//# sourceMappingURL=TsAnimNotifyStateMontageSpeedChange.js.map