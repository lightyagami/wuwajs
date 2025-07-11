"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyAddBuff extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.BuffId = undefined;
  }
  Constructor() {}
  K2_Notify(r, e) {
    r = r.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      var r = r?.CharacterActorComponent?.Entity;
      var t = r?.GetComponent(0);
      var r = r.GetComponent(174);
      if (!r) {
        return true;
      }
      if (!r.HasBuffAuthority() && !ControllerHolder_1.ControllerHolder.SkillMessageController.CloseMonsterServerLogic) {
        return true;
      }
      if (t.IsRole() && !r.HasBuffAuthority()) {
        return true;
      }
      t = r.CreateAnimNotifyContent(e.GetName(), this.exportIndex);
      r.AddBuff(Number(this.BuffId), {
        InstigatorId: r.CreatureDataId,
        PreMessageId: t,
        Reason: `动画${e?.GetName()}的AN添加`
      });
    }
    return true;
  }
  GetNotifyName() {
    return "添加BUFF";
  }
}
exports.default = TsAnimNotifyAddBuff;
//# sourceMappingURL=TsAnimNotifyAddBuff.js.map