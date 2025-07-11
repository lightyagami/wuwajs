"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class TsAnimNotifyStateStopRotateBoneToLocation extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(t, e, o) {
    t = t.GetAnimInstance();
    if (t instanceof UE.KuroAnimInstance) {
      t.SetBoneRotateToLocationInfoStopBegin();
    }
    return true;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetAnimInstance();
    if (t instanceof UE.KuroAnimInstance) {
      t.SetBoneRotateToLocationInfoStopEnd();
    }
    return true;
  }
  GetNotifyName() {
    return "停止将骨骼旋转至目标位置";
  }
}
exports.default = TsAnimNotifyStateStopRotateBoneToLocation;
//# sourceMappingURL=TsAnimNotifyStateStopRotateBoneToLocation.js.map