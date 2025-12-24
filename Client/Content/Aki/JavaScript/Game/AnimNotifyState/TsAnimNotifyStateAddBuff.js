"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyStateAddBuff extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.BuffId = undefined;
    this.施加目标 = 0;
  }
  Constructor() {}
  K2_NotifyBegin(r, e, t) {
    r = r.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      var r = r?.CharacterActorComponent?.Entity;
      var s = r.GetComponent(183);
      var r = this.GetBuffTarget(r);
      if (!s || !r) {
        return true;
      }
      if (!s.HasBuffAuthority() && !ControllerHolder_1.ControllerHolder.SkillMessageController.CloseMonsterServerLogic) {
        return true;
      }
      var i = s.CreateAnimNotifyContent(e.GetName(), this.exportIndex);
      r.AddBuff(Number(this.BuffId), {
        InstigatorId: s.CreatureDataId,
        PreMessageId: i,
        Reason: `动画${e?.GetName()}的ANS添加`
      });
    }
    return true;
  }
  K2_NotifyEnd(r, e) {
    r = r.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      var r = r?.CharacterActorComponent?.Entity;
      var t = r.GetComponent(183);
      var r = this.GetBuffTarget(r);
      if (!t || !r) {
        return true;
      }
      if (!t.HasBuffAuthority() && !ControllerHolder_1.ControllerHolder.SkillMessageController.CloseMonsterServerLogic) {
        return true;
      }
      if (r?.Valid) {
        r.RemoveBuff(Number(this.BuffId), -1, `动画${e?.GetName()}的ANS移除`);
      }
    }
    return true;
  }
  GetNotifyName() {
    return "添加BUFF";
  }
  GetBuffTarget(r) {
    return (this.施加目标 && this.施加目标 === 1 ? r?.GetComponent(41)?.SkillTarget?.Entity : r)?.GetComponent(183);
  }
}
exports.default = TsAnimNotifyStateAddBuff;
//# sourceMappingURL=TsAnimNotifyStateAddBuff.js.map