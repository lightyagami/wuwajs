"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const MathCommon_1 = require("../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateInteractionRotateToLocation extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.RotateSpeed = -0;
    this.Rotator = -0;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var t = t.CharacterActorComponent?.Entity;
    var o = t.GetComponent(29);
    var t = t.GetComponent(3);
    if (!o?.Valid || !t?.Valid) {
      return false;
    }
    var a = Vector_1.Vector.Create();
    o.GetInteractionTargetLocation().Subtraction(t.ActorLocationProxy, a);
    this.Rotator = a.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg;
    let i = t.ActorRotationProxy.Yaw - this.Rotator;
    if (i > 180) {
      i = 360 - i;
    }
    i = Math.abs(i);
    this.RotateSpeed = i / r;
    return true;
  }
  K2_NotifyTick(t, e, r) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.CharacterActorComponent?.Entity?.GetComponent(178)) && (t.SmoothCharacterRotationByValue(0, this.Rotator, 0, this.RotateSpeed, r, "TsAnimNotifyStateInteractionRotateToLocation"), true);
  }
  GetNotifyName() {
    return "设置交互动作旋转和位置";
  }
}
exports.default = TsAnimNotifyStateInteractionRotateToLocation;
//# sourceMappingURL=TsAnimNotifyStateInteractionRotateToLocation.js.map