"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const GameplayCueController_1 = require("../NewWorld/Character/Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController");
const entityCueMap = new Map();
class TsAnimNotifyStateAddGameplayCue extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Buff特效Id列表 = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    e = e.GetOwner()?.CharacterActorComponent;
    if (!e?.Valid) {
      return false;
    }
    var e = e.Entity;
    var o = e?.GetComponent(21);
    if (!o) {
      return false;
    }
    if (this.Buff特效Id列表) {
      let t = entityCueMap.get(e.Id);
      if (!t) {
        t = [];
        entityCueMap.set(e.Id, t);
      }
      for (let e = 0; e < this.Buff特效Id列表.Num(); e++) {
        var i = this.Buff特效Id列表.Get(e);
        var i = o.AddCue(Number(i));
        if (i !== GameplayCueController_1.INVALID_CUE_HANDLE) {
          t.push(i);
        }
      }
    }
    return true;
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner()?.CharacterActorComponent;
    if (!e?.Valid) {
      return false;
    }
    var e = e.Entity;
    var r = e?.GetComponent(21);
    if (!r) {
      return false;
    }
    var o = entityCueMap.get(e.Id);
    if (o) {
      for (const i of o) {
        r?.RemoveCueByHandle(i);
      }
      entityCueMap.delete(e.Id);
    }
    return true;
  }
  GetNotifyName() {
    return "播放Buff特效";
  }
}
exports.default = TsAnimNotifyStateAddGameplayCue;
//# sourceMappingURL=TsAnimNotifyStateAddGameplayCue.js.map