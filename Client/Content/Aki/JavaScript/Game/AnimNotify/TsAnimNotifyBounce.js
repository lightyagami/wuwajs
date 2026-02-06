"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyBounce extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Time = 0;
    this.Height = 0;
    this.MotionCurve = undefined;
  }
  Constructor() {}
  K2_Notify(e, t) {
    var s;
    var r;
    var e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default && (s = (e = e.CharacterActorComponent?.Entity)?.GetComponent(29), e = e?.GetComponent(35), s) && e) {
      r = this.MotionCurve?.ToAssetPathName() ?? "";
      s.StartBounceFromAns(this.Time, this.Height, r);
      e.StartCatapult();
    }
    return true;
  }
  GetNotifyName() {
    return "弹射运动";
  }
}
exports.default = TsAnimNotifyBounce;
//# sourceMappingURL=TsAnimNotifyBounce.js.map