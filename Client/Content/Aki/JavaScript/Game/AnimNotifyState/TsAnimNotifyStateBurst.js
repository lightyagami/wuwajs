"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateBurst extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.HitPriority = 1000;
    this.不能切人 = true;
    this.是否无敌 = true;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      var s = t.CharacterActorComponent?.Entity;
      if (s) {
        if ((s = s.GetComponent(217)) && (this.不能切人 && s.TagContainer.UpdateExactTag(2, -1697149502, 1), this.是否无敌)) {
          s.TagContainer.UpdateExactTag(2, 501201000, 1);
        }
        t.CharacterMovement.HitPriority = this.HitPriority;
        return true;
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 20, "No Entity for TsBaseCharacter", ["Name", t.GetName()]);
      }
    }
    return false;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      var r = t.CharacterActorComponent?.Entity;
      if (r) {
        if ((r = r.GetComponent(217)) && (this.不能切人 && r.TagContainer.UpdateExactTag(2, -1697149502, -1), this.是否无敌)) {
          r.TagContainer.UpdateExactTag(2, 501201000, -1);
        }
        t.GetEntityNoBlueprint().GetComponent(189).ResetHitPriorityAndGoThrough();
        return true;
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 20, "No Entity for TsBaseCharacter", ["Name", t.GetName()]);
      }
    }
    return false;
  }
  GetNotifyName() {
    return "角色放大招";
  }
}
exports.default = TsAnimNotifyStateBurst;
//# sourceMappingURL=TsAnimNotifyStateBurst.js.map