"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateGoThrough extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.FirstGoThroughPriority = -1;
    this.SecondHitPriority = -1;
    this.OldGoThroughPriority = -1;
    this.OldHitPriority = -1;
    this.LeftTime = 0;
    this.IsEnd = false;
  }
  Constructor() {}
  K2_NotifyBegin(t, s, e) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && ((t = t.CharacterMovement) && (this.OldGoThroughPriority = t.GoThroughPriority, this.OldHitPriority = t.HitPriority, this.FirstGoThroughPriority > 0 && (t.GoThroughPriority = this.FirstGoThroughPriority), t.GoThroughLower = true), this.LeftTime = Math.max(e * 0.5, e - 0.1), true);
  }
  K2_NotifyTick(t, s, e) {
    if (this.LeftTime > 0) {
      this.LeftTime -= e;
    }
    if (this.LeftTime <= 0 && !this.IsEnd && (e = t.GetOwner()) instanceof TsBaseCharacter_1.default && (e.CharacterMovement.GoThroughLower = false, this.SecondHitPriority > 0)) {
      e.CharacterMovement.HitPriority = this.SecondHitPriority;
    }
    return true;
  }
  K2_NotifyEnd(t, s) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (this.IsEnd = true, (t = t.CharacterMovement) && (t.GoThroughPriority = this.OldGoThroughPriority, t.HitPriority = this.OldHitPriority, t.GoThroughLower = false), true);
  }
  GetNotifyName() {
    return "移动时设置穿人优先级";
  }
}
exports.default = TsAnimNotifyStateGoThrough;
//# sourceMappingURL=TsAnimNotifyStateGoThrough.js.map