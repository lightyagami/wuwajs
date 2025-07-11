"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyBreakConstraint extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.分离骨骼名 = undefined;
    this.Impulse = new UE.Vector(0, 0, 0);
    this.HitLocation = new UE.Vector(0, 0, 0);
  }
  Constructor() {}
  K2_Notify(t, e) {
    if (t.GetOwner() instanceof TsBaseCharacter_1.default) {
      t.BreakConstraint(this.Impulse, this.HitLocation, this.分离骨骼名);
    }
    return true;
  }
  GetNotifyName() {
    return "分离骨骼网格体";
  }
}
exports.default = TsAnimNotifyBreakConstraint;
//# sourceMappingURL=TsAnimNotifyBreakConstraint.js.map