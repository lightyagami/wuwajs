"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Error.stackTraceLimit = 500;
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateRunRotateBoneToLocation extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.TurnLimit = undefined;
    this.LookUpLimit = undefined;
    this.TurnSpeed = undefined;
    this.LookUpSpeed = undefined;
    this.TurnOffset = -0;
    this.LookUpOffset = -0;
  }
  Constructor() {}
  K2_NotifyBegin(i, t, e) {
    i = i.GetOwner();
    if (i instanceof TsBaseCharacter_1.default) {
      i = i.CharacterActorComponent.Entity?.GetComponent(177);
      if (!i || !i.MainAnimInstance || !(i.MainAnimInstance instanceof UE.KuroAnimInstance)) {
        return false;
      }
      let t = 1;
      if (this.TurnSpeed) {
        t = this.TurnSpeed.GetFloatValue(0);
      }
      let e = 1;
      if (this.LookUpSpeed) {
        e = this.LookUpSpeed.GetFloatValue(0);
      }
      i.MainAnimInstance.SetBoneRotateToLocationInfoRunBegin(t, e, this.TurnLimit, this.LookUpLimit, this.TurnOffset, this.LookUpOffset);
    }
    return true;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      if (!t.CharacterActorComponent) {
        return false;
      }
      t = t.CharacterActorComponent.Entity?.GetComponent(177);
      if (!t || !t.MainAnimInstance || !(t.MainAnimInstance instanceof UE.KuroAnimInstance)) {
        return false;
      }
      t.MainAnimInstance.SetBoneRotateToLocationInfoRunEnd();
    }
    return true;
  }
  K2_NotifyTick(i, t, e) {
    i = i.GetOwner();
    if (i instanceof TsBaseCharacter_1.default) {
      i = i.CharacterActorComponent.Entity?.GetComponent(177);
      if (!i || !i.MainAnimInstance || !(i.MainAnimInstance instanceof UE.KuroAnimInstance)) {
        return false;
      }
      var s = this.GetCurrentTriggerOffsetInThisNotifyTick();
      let t = 1;
      if (this.TurnSpeed) {
        t = this.TurnSpeed.GetFloatValue(s);
      }
      let e = 1;
      if (this.LookUpSpeed) {
        e = this.LookUpSpeed.GetFloatValue(s);
      }
      i.MainAnimInstance.SetBoneRotateToLocationInfoRunTick(t, e);
    }
    return true;
  }
  GetNotifyName() {
    return "控制一根骨骼朝向目标";
  }
}
exports.default = TsAnimNotifyStateRunRotateBoneToLocation;
//# sourceMappingURL=TsAnimNotifyStateRunRotateBoneToLocation.js.map