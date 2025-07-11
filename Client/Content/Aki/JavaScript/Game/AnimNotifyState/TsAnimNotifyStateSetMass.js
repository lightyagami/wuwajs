"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetMass extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.NewMass = -0;
    this.OldMass = -0;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, s) {
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (this.OldMass = t.CharacterMovement.Mass, t.CharacterMovement.Mass = this.NewMass, true);
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (t.CharacterMovement.Mass = this.OldMass, true);
  }
  GetNotifyName() {
    return "设置质量";
  }
}
exports.default = TsAnimNotifyStateSetMass;
//# sourceMappingURL=TsAnimNotifyStateSetMass.js.map