"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyStateEnableSequenceCameraDither extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    var o = ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera?.PlayerComponent;
    return !!o && (o.SetDitherEffectEnable(0), true);
  }
  K2_NotifyEnd(e, r) {
    var t = ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera?.PlayerComponent;
    return !!t && (t.SetDitherEffectDisable(0), true);
  }
  GetNotifyName() {
    return "特写镜头开启角色虚化";
  }
}
exports.default = TsAnimNotifyStateEnableSequenceCameraDither;
//# sourceMappingURL=TsAnimNotifyStateEnableSequenceCameraDither.js.map