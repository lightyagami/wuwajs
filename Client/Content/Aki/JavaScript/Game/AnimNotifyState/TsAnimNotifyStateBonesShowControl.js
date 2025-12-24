"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateBonesShowControl extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.EndPlay = true;
    this.BoneName = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    var s = t.GetOwner();
    if (s instanceof TsBaseCharacter_1.default) {
      s = s.CharacterActorComponent.Entity;
      if (!s?.Valid) {
        return false;
      }
      if (!t.IsBoneHiddenByName(this.BoneName)) {
        t.HideBoneByName(this.BoneName, 0);
        s.GetComponent(84)?.HideWeaponsWhenHideBones(true, this.BoneName);
      }
    }
    return false;
  }
  K2_NotifyEnd(t, e) {
    var r = t.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      r = r.CharacterActorComponent?.Entity;
      if (!r?.Valid) {
        return false;
      }
      if (t.IsBoneHiddenByName(this.BoneName)) {
        t.UnHideBoneByName(this.BoneName);
        r.GetComponent(84)?.HideWeaponsWhenHideBones(false, this.BoneName);
      }
    }
    return false;
  }
  GetNotifyName() {
    return "骨骼显示控制";
  }
}
exports.default = TsAnimNotifyStateBonesShowControl;
//# sourceMappingURL=TsAnimNotifyStateBonesShowControl.js.map