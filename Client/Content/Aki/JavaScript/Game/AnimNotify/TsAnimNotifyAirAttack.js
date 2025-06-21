"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
const UE = require("ue"),
  GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  GlobalData_1 = require("../GlobalData"),
  CharacterActorComponent_1 = require("../NewWorld/Character/Common/Component/CharacterActorComponent"),
  SkillUtils_1 = require("../NewWorld/Character/Common/Component/Skill/SkillUtils"),
  CombatLog_1 = require("../Utils/CombatLog"),
  GravityUtils_1 = require("../Utils/GravityUtils"),
  verticalAttackTag = 1699273796,
  slopeAttackTag = 1911100074;
class TsAnimNotifyAirAttack extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), this.Speed = 1e3, this.Offset = 100, this.MaxDistance = 1200, this.MinTan = 5, this.MaxTan = 75, this.MaxTime = 1, this.DrawDebug = !1, this.TempVector1 = Vector_1.Vector.Create(), this.TempVector2 = Vector_1.Vector.Create(), this.TempVector3 = Vector_1.Vector.Create()
  }
  Constructor() {
    this.TempVector1 = Vector_1.Vector.Create(), this.TempVector2 = Vector_1.Vector.Create(), this.TempVector3 = Vector_1.Vector.Create()
  }
  K2_Notify(t, i) {
    if (this.Speed <= 0) return !1;
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      var t = t.CharacterActorComponent,
        s = t?.Entity.GetComponent(45),
        e = t?.Entity.GetComponent(17);
      if (!t || !s || !e) return !1;
      var r = t.Entity.GetComponent(39)?.SkillTarget;
      if (!r?.Valid) return this.SetVerticalSpeed(s, e), !0;
      var r = r.Entity.GetComponent(1),
        a = r.ActorLocationProxy,
        r = (r instanceof CharacterActorComponent_1.CharacterActorComponent ? (s.GravityUp.Multiply(r.ScaledHalfHeight, this.TempVector1), a.Subtraction(this.TempVector1, this.TempVector1)) : this.TempVector1.DeepCopy(a), t.ActorLocationProxy),
        a = (s.GravityUp.Multiply(t.ScaledHalfHeight, this.TempVector2), r.Subtraction(this.TempVector2, this.TempVector2), GravityUtils_1.GravityUtils.GetDistSquared2dForActor(t, this.TempVector1, this.TempVector2)),
        r = (this.TempVector1.SubtractionEqual(this.TempVector2), this.TempVector1.SizeSquared()),
        r = Math.sqrt(r - a),
        a = Math.sqrt(a),
        a = (a -= this.Offset, a = MathUtils_1.MathUtils.Clamp(a, 0, this.MaxDistance), Math.atan2(a, r)),
        a = MathUtils_1.MathUtils.Clamp(a, this.MinTan * MathUtils_1.MathUtils.DegToRad, this.MaxTan * MathUtils_1.MathUtils.DegToRad),
        t = t.ActorForwardProxy,
        h = r * Math.tan(a),
        o = (t.Multiply(h, this.TempVector1), s.GravityDirect.Multiply(r, this.TempVector3), this.TempVector3.AdditionEqual(this.TempVector1), this.TempVector3.AdditionEqual(this.TempVector2), this.Draw(this.TempVector2, this.TempVector3), this.Speed * Math.tan(a)),
        t = (t.Multiply(o, this.TempVector1), this.Speed);
      if (s.GravityDirect.Multiply(t, this.TempVector3), this.TempVector3.Addition(this.TempVector1, this.TempVector1), this.TempVector1.Multiply(this.MaxTime, this.TempVector3), this.TempVector2.Addition(this.TempVector3, this.TempVector3), !this.IsHit(this.TempVector2, this.TempVector3)) return this.SetVerticalSpeed(s, e), !0;
      this.SetSlopeSpeed(s, e, a, h, r, this.TempVector1)
    }
    return !0
  }
  GetNotifyName() {
    return "空中攻击位移"
  }
  Draw(t, i) {
    this.DrawDebug && UE.KismetSystemLibrary.D_DrawDebugArrow(GlobalData_1.GlobalData.World, t.ToUeVector(), i.ToUeVector(), 15, new UE.LinearColor(1, 0, 0, 1), 5, 5)
  }
  IsHit(t, i) {
    var s = SkillUtils_1.SkillUtils.GetStaticLineTrace(),
      t = (TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, t), TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, i), TraceElementCommon_1.TraceElementCommon.LineTrace(s, "TsAnimNotifyAirAttack.IsHit"));
    return t && s.HitResult.bBlockingHit
  }
  SetVerticalSpeed(t, i) {
    t.GravityDirect.Multiply(this.Speed, this.TempVector1), CombatLog_1.CombatLog.Info("Skill", t.Entity, "空中攻击（垂直）", ["速度", this.TempVector1]), t.SetForceSpeed(this.TempVector1), i.SendGameplayEventToActor(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(verticalAttackTag))
  }
  SetSlopeSpeed(t, i, s, e, r, a) {
    CombatLog_1.CombatLog.Info("Skill", t.Entity, "空中攻击（斜向）", ["夹角", s * MathUtils_1.MathUtils.RadToDeg], ["水平距离", e], ["高度差", r], ["速度向量", a]), t.SetForceSpeed(a), i.SendGameplayEventToActor(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(slopeAttackTag))
  }
}
exports.default = TsAnimNotifyAirAttack;
//# sourceMappingURL=TsAnimNotifyAirAttack.js.map