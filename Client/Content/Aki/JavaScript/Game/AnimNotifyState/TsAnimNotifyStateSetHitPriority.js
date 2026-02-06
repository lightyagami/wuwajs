"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetHitPriority extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.HitPriority = 0;
  }
  Constructor() {}
  K2_NotifyBegin(t, e) {
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (t.CharacterMovement.HitPriority = this.HitPriority, true);
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (t.GetEntityNoBlueprint().GetComponent(189).ResetHitPriorityAndGoThrough(), true);
  }
  GetNotifyName() {
    return "（废弃别使用）设置帧状态事件期间碰撞等级";
  }
}
exports.default = TsAnimNotifyStateSetHitPriority;
//# sourceMappingURL=TsAnimNotifyStateSetHitPriority.js.map