"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const CharacterAnimationComponent_1 = require("../NewWorld/Character/Common/Component/CharacterAnimationComponent");
class TsAnimNotifyStateSight extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.距离区间 = undefined;
    this.水平区间 = undefined;
    this.垂直区间 = undefined;
    this.EnableSight = false;
  }
  Constructor() {
    this.EnableSight = false;
  }
  K2_NotifyBegin(t, i, e) {
    var s;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.CharacterActorComponent?.Entity.GetComponent(186)) && (t.GetSightCameraData() || ((s = new CharacterAnimationComponent_1.SightCameraData()).SightMinDistance = this.距离区间?.X ?? -1, s.SightMaxDistance = this.距离区间?.Y ?? -1, s.SightHorizontalAngleL = MathUtils_1.MathUtils.NormalizeDeg180(this.水平区间?.X ?? 0), s.SightHorizontalAngleR = MathUtils_1.MathUtils.NormalizeDeg180(this.水平区间?.Y ?? 0), s.SightVerticalAngleB = MathUtils_1.MathUtils.NormalizeDeg180(this.垂直区间?.X ?? 0), s.SightVerticalAngleT = MathUtils_1.MathUtils.NormalizeDeg180(this.垂直区间?.Y ?? 0), t.SetSightCameraData(s), this.EnableSight = true), true);
  }
  K2_NotifyEnd(t, i) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.CharacterActorComponent?.Entity.GetComponent(186)) && (this.EnableSight && (t.SetSightCameraData(undefined), this.EnableSight = false), true);
  }
}
exports.default = TsAnimNotifyStateSight;
//# sourceMappingURL=TsAnimNotifyStateSight.js.map