"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GlobalData_1 = require("../GlobalData");
const CharacterActorComponent_1 = require("../NewWorld/Character/Common/Component/CharacterActorComponent");
const SkillUtils_1 = require("../NewWorld/Character/Common/Component/Skill/SkillUtils");
const CombatLog_1 = require("../Utils/CombatLog");
const GravityUtils_1 = require("../Utils/GravityUtils");
const verticalAttackTag = 1699273796;
const slopeAttackTag = 1911100074;
class TsAnimNotifyAirAttack extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Speed = 1000;
    this.Offset = 100;
    this.MaxDistance = 1200;
    this.MinTan = 5;
    this.MaxTan = 75;
    this.MaxTime = 1;
    this.DrawDebug = false;
    this.TempVector1 = Vector_1.Vector.Create();
    this.TempVector2 = Vector_1.Vector.Create();
    this.TempVector3 = Vector_1.Vector.Create();
  }
  Constructor() {
    this.TempVector1 = Vector_1.Vector.Create();
    this.TempVector2 = Vector_1.Vector.Create();
    this.TempVector3 = Vector_1.Vector.Create();
  }
  K2_Notify(t, i) {
    var s;
    var e;
    var a;
    var h;
    var r;
    var o;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (s = (t = t.CharacterActorComponent)?.Entity.GetComponent(46), e = t?.Entity.GetComponent(17), !!t && !!s && !!e && !(this.Speed <= 0 ? (CombatLog_1.CombatLog.Error("Skill", t.Entity, "下落攻击速度配置必须大于0", ["速度", this.Speed]), 1) : this.MaxDistance < 0 ? (CombatLog_1.CombatLog.Error("Skill", t.Entity, "下落攻击最大距离配置必须大于0", ["最大距离", this.MaxDistance]), 1) : ((a = t.Entity.GetComponent(40)?.SkillTarget)?.Valid && (h = (a = a.Entity.GetComponent(1)).ActorLocationProxy, a instanceof CharacterActorComponent_1.CharacterActorComponent ? (s.GravityUp.Multiply(a.ScaledHalfHeight, this.TempVector1), h.Subtraction(this.TempVector1, this.TempVector1)) : this.TempVector1.DeepCopy(h), a = t.ActorLocationProxy, s.GravityUp.Multiply(t.ScaledHalfHeight, this.TempVector2), a.Subtraction(this.TempVector2, this.TempVector2), h = GravityUtils_1.GravityUtils.GetDistSquared2dForActor(t, this.TempVector1, this.TempVector2), this.TempVector1.SubtractionEqual(this.TempVector2), a = this.TempVector1.SizeSquared(), a = Math.sqrt(a - h), h = Math.sqrt(h), h -= this.Offset, h = MathUtils_1.MathUtils.Clamp(h, 0, this.MaxDistance), h = Math.atan2(h, a), o = MathUtils_1.MathUtils.Clamp(this.MinTan, 0, 90) * MathUtils_1.MathUtils.DegToRad, r = MathUtils_1.MathUtils.Clamp(this.MaxTan, 0, 90) * MathUtils_1.MathUtils.DegToRad, h = MathUtils_1.MathUtils.Clamp(h, o, r), o = t.ActorForwardProxy, r = a * Math.tan(h), o.Multiply(r, this.TempVector1), s.GravityDirect.Multiply(a, this.TempVector3), this.TempVector3.AdditionEqual(this.TempVector1), this.TempVector3.AdditionEqual(this.TempVector2), this.Draw(this.TempVector2, this.TempVector3), t = this.Speed * Math.tan(h), o.Multiply(t, this.TempVector1), o = this.Speed, s.GravityDirect.Multiply(o, this.TempVector3), this.TempVector3.Addition(this.TempVector1, this.TempVector1), this.TempVector1.Multiply(this.MaxTime, this.TempVector3), this.TempVector2.Addition(this.TempVector3, this.TempVector3), this.IsHit(this.TempVector2, this.TempVector3)) ? this.SetSlopeSpeed(s, e, h, r, a, this.TempVector1) : this.SetVerticalSpeed(s, e), 0)));
  }
  GetNotifyName() {
    return "空中攻击位移";
  }
  Draw(t, i) {
    if (this.DrawDebug) {
      UE.KismetSystemLibrary.D_DrawDebugArrow(GlobalData_1.GlobalData.World, t.ToUeVector(), i.ToUeVector(), 15, new UE.LinearColor(1, 0, 0, 1), 5, 5);
    }
  }
  IsHit(t, i) {
    var s = SkillUtils_1.SkillUtils.GetStaticLineTrace();
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, i);
    var t = TraceElementCommon_1.TraceElementCommon.LineTrace(s, "TsAnimNotifyAirAttack.IsHit");
    return t && s.HitResult.bBlockingHit;
  }
  SetVerticalSpeed(t, i) {
    t.GravityDirect.Multiply(this.Speed, this.TempVector1);
    CombatLog_1.CombatLog.Info("Skill", t.Entity, "空中攻击（垂直）", ["速度", this.TempVector1]);
    t.SetForceSpeed(this.TempVector1);
    i.SendGameplayEventToActor(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(verticalAttackTag));
  }
  SetSlopeSpeed(t, i, s, e, a, h) {
    CombatLog_1.CombatLog.Info("Skill", t.Entity, "空中攻击（斜向）", ["夹角", s * MathUtils_1.MathUtils.RadToDeg], ["水平距离", e], ["高度差", a], ["速度向量", h]);
    t.SetForceSpeed(h);
    i.SendGameplayEventToActor(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(slopeAttackTag));
  }
}
exports.default = TsAnimNotifyAirAttack;
//# sourceMappingURL=TsAnimNotifyAirAttack.js.map