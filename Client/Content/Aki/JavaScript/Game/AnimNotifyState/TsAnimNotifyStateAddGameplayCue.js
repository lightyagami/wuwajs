"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GameplayCueController_1 = require("../NewWorld/Character/Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController");
class TsAnimNotifyStateAddGameplayCue extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Buff特效Id列表 = undefined;
    this.GameplayCueHandleIdList = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var a = e?.CharacterActorComponent?.Entity?.GetComponent(21);
    if (!a) {
      return false;
    }
    if (this.Buff特效Id列表) {
      for (let e = 0; e < this.Buff特效Id列表.Num(); e++) {
        var i = this.Buff特效Id列表.Get(e);
        var i = a.AddCue(Number(i));
        if (i !== GameplayCueController_1.INVALID_CUE_HANDLE) {
          this.GameplayCueHandleIdList ||= [];
          this.GameplayCueHandleIdList.push(i);
        }
      }
    }
    return true;
  }
  K2_NotifyEnd(e, r) {
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var t = e?.CharacterActorComponent?.Entity?.GetComponent(21);
    if (!t) {
      return false;
    }
    if (this.GameplayCueHandleIdList) {
      for (const a of this.GameplayCueHandleIdList) {
        t?.RemoveCueByHandle(a);
      }
      this.GameplayCueHandleIdList = undefined;
    }
    return true;
  }
  GetNotifyName() {
    return "播放Buff特效";
  }
}
exports.default = TsAnimNotifyStateAddGameplayCue;
//# sourceMappingURL=TsAnimNotifyStateAddGameplayCue.js.map