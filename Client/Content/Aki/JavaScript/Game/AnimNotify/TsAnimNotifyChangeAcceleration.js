"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyChangeAcceleration extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Time = 1;
    this.MoveState = 6;
  }
  Constructor() {}
  K2_Notify(e, t) {
    var e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default && (e = e.CharacterActorComponent.Entity?.GetComponent(178))) {
      e.AccelerationLerpTime = this.Time;
      e.AccelerationChangeMoveState = this.MoveState;
    }
    return true;
  }
  GetNotifyName() {
    return "修改角色位移最大加速度";
  }
}
exports.default = TsAnimNotifyChangeAcceleration;
//# sourceMappingURL=TsAnimNotifyChangeAcceleration.js.map