"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateVisionCounterAttack extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.对策设置 = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.CharacterActorComponent?.Entity)?.Valid && (e = t.GetComponent(213)?.CreateAnimNotifyContent(e.GetName(), this.exportIndex), (t = t.GetComponent(61))?.SetCounterAttackAnsInfo(e, this.exportIndex), t?.SetVisionCounterAttackInfo(this.对策设置), t?.SetCounterAttackEndTime(r), true);
  }
  K2_NotifyEnd(t, e) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.CharacterActorComponent?.Entity)?.Valid && (t.GetComponent(61)?.VisionCounterAttackEnd(), true);
  }
  GetNotifyName() {
    return "幻象弹反";
  }
}
exports.default = TsAnimNotifyStateVisionCounterAttack;
//# sourceMappingURL=TsAnimNotifyStateVisionCounterAttack.js.map