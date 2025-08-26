"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const MathCommon_1 = require("../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const PhantomUtil_1 = require("../Module/Phantom/PhantomUtil");
const SkillBehaviorAction_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorAction");
const CombatLog_1 = require("../Utils/CombatLog");
class TsAnimNotifySummonBeginSkill extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.SummonIndex = 0;
    this.ActionSetLocation = undefined;
    this.ActionSetRotation = undefined;
    this.SkillId = 0;
    this.EnableEntity = true;
  }
  Constructor() {}
  K2_Notify(o, t) {
    var i;
    var e;
    var r;
    var n;
    var l;
    var o = o.GetOwner();
    return !!o && !!(o instanceof TsBaseCharacter_1.default) && !!this.ActionSetLocation && !!this.ActionSetRotation && !!(o = o?.CharacterActorComponent?.Entity)?.Valid && !!(i = o.GetComponent(40)) && !!i.CurrentSkill && !!(e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(o, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, this.SummonIndex))?.Valid && !!(r = e.Entity.GetComponent(40)) && !(o = {
      Entity: o,
      SkillComponent: i,
      Skill: i.CurrentSkill
    }, n = SkillBehaviorAction_1.SkillBehaviorAction.CalculateLocation(this.ActionSetLocation, o), o = SkillBehaviorAction_1.SkillBehaviorAction.CalculateRotation(this.ActionSetRotation, o), n.Equals(Vector_1.Vector.ZeroVectorDouble, MathCommon_1.MathCommon.KindaSmallNumber) || (l = e.Entity.GetComponent(3), CombatLog_1.CombatLog.Info("Skill", e.Entity, "TsAnimNotifySummonBeginSkill.SetActorLocationAndRotation", ["位置", n], ["旋转", o]), l.SetActorLocationAndRotation(n, o, "TsAnimNotifySummonBeginSkill.SetActorLocationAndRotation", false)), this.EnableEntity && ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e.Entity, true, "TsAnimNotifySummonBeginSkill.SetEntityEnable", true), r.BeginSkill(this.SkillId, {
      Target: i.SkillTarget?.Entity,
      Reason: "TsAnimNotifySummonBeginSkill.UseSummonSkill"
    }), 0);
  }
  GetNotifyName() {
    return "召唤伴生物释放技能";
  }
}
exports.default = TsAnimNotifySummonBeginSkill;
//# sourceMappingURL=TsAnimNotifySummonBeginSkill.js.map