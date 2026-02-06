"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const CharacterBuffIds_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
class TsAnimNotifyStateNextAtt extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && ((t = t.CharacterActorComponent?.Entity?.GetComponent(43))?.Valid && !t?.IsSkillMontageInvalid(e.GetName()) && (t.SetSkillAcceptInput(true), t.CallAnimBreakPoint()), true);
  }
  K2_NotifyEnd(t, e) {
    var r;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (r = t.CharacterActorComponent?.Entity?.GetComponent(43), t = t.CharacterActorComponent?.Entity?.GetComponent(185), !r?.IsSkillMontageInvalid(e.GetName())) && (r?.Valid && r.SetSkillAcceptInput(false), t?.Valid && t.HasBuffAuthority() && t.RemoveBuff(CharacterBuffIds_1.buffId.GoDown, -1, "从TsAnimNotifyStateNextAtt移除Buff"), true);
  }
  GetNotifyName() {
    return "下一个技能";
  }
}
exports.default = TsAnimNotifyStateNextAtt;
//# sourceMappingURL=TsAnimNotifyStateNextAtt.js.map