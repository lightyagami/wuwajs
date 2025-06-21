"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BulletLogicShieldController = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CampUtils_1 = require("../../Character/Common/Blueprint/Utils/CampUtils"),
  BulletActionInitHit_1 = require("../Action/BulletActionInitHit"),
  BulletHitCountUtil_1 = require("../BulletStaticMethod/BulletHitCountUtil"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletLogicController_1 = require("./BulletLogicController"),
  campTypeBitMask = [0, BulletActionInitHit_1.SELF_NUMBER, BulletActionInitHit_1.ENEMY_NUMBER, BulletActionInitHit_1.FRIEND_NUMBER, BulletActionInitHit_1.TEAM_NUMBER, BulletActionInitHit_1.SELF_NUMBER | BulletActionInitHit_1.ENEMY_NUMBER];
class BulletLogicShieldController extends BulletLogicController_1.BulletLogicController {
  constructor(t, i) {
    super(t, i), this.a7o = void 0, this.ohc = void 0, this.nhc = void 0, this.shc = void 0, this.ahc = void 0, this.$O1 = void 0, this.WO1 = void 0, this.QO1 = void 0;
    var e = t.NotDefenseBulletIdList;
    if (e && 0 < e.Num()) {
      this.ohc = new Array;
      for (let t = 0; t < e.Num(); ++t) this.ohc.push(e.Get(t))
    }
    var l = t.DefenseBulletIdList;
    if (l && 0 < l.Num()) {
      this.nhc = new Array;
      for (let t = 0; t < l.Num(); ++t) this.nhc.push(l.Get(t))
    }
    var r = t.AddBuffToEnemy;
    if (r && 0 < r.Num()) {
      this.shc = new Array;
      for (let t = 0; t < r.Num(); ++t) this.shc.push(r.Get(t))
    }
    var s = t.AddBuffToSelf;
    if (s && 0 < s.Num()) {
      this.ahc = new Array;
      for (let t = 0; t < s.Num(); ++t) this.ahc.push(s.Get(t))
    }
    var o = t.SelfCalcTypeArray,
      h = o?.Num() ?? 0;
    if (0 < h) {
      this.$O1 = new Array;
      for (let t = 0; t < h; ++t) this.$O1.push(o.Get(t))
    }
    var n = t.FriendCalcTypeArray,
      u = n?.Num() ?? 0;
    if (0 < u) {
      this.WO1 = new Array;
      for (let t = 0; t < u; ++t) this.WO1.push(n.Get(t))
    }
    var a = t.EnemyCalcTypeArray,
      f = a?.Num() ?? 0;
    if (0 < f) {
      this.QO1 = new Array;
      for (let t = 0; t < f; ++t) this.QO1.push(a.Get(t))
    }
  }
  OnInit() {
    this.a7o = this.Bullet.GetBulletInfo(), this.a7o.IsShield = !0
  }
  BulletLogicAction(i) {
    if (this.CheckCanDefense(i)) {
      if (this.shc) {
        var t = i.Attacker?.GetComponent(174),
          e = this.a7o.Attacker?.GetComponent(174);
        if (t && e)
          for (const o of this.shc) t.AddBuff(Number(o), {
            InstigatorId: e.CreatureDataId,
            Level: this.a7o.SkillLevel,
            Reason: "ShieldDefense-AddBuffToEnemy",
            PreMessageId: this.a7o.ContextId
          })
      }
      if (this.ahc) {
        var l = this.a7o.Attacker?.GetComponent(174);
        if (l)
          for (const h of this.ahc) l.AddBuff(Number(h), {
            InstigatorId: l.CreatureDataId,
            Level: this.a7o.SkillLevel,
            Reason: "ShieldDefense-AddBuffToSelf",
            PreMessageId: this.a7o.ContextId
          })
      }
      var r = this.LogicController.DecreaseBulletHitCount;
      if (0 < r) {
        var s = this.a7o.Attacker;
        for (let t = 0; t < r; t++) BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(i, s)
      }
      BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(this.a7o, i.Attacker)
    }
  }
  CheckCanDefense(t) {
    if (this.LogicController.DefenseCanDodgeBullet && !t.BulletDataMain?.Logic.CanDodge) return !1;
    var i = this.LogicController.DefenseCaughtTrigger && t.HasTagId(1481010069),
      e = t.BulletRowName;
    if (this.nhc && !this.nhc.includes(e)) return !1;
    if (this.ohc && this.ohc.includes(e)) return !1;
    e = t.CollisionInfo.DamageId, e = e ? ModelManager_1.ModelManager.DamageModel.GetDamageConfigById(e) : void 0;
    let l = -1;
    if (e && (l = e.CalculateType), t.AttackerId === this.a7o.AttackerId) {
      if (!this.hhc(this.LogicController.SelfCampType, t.BulletCamp) || !i && !this.KO1(this.$O1, l)) return !1
    } else {
      var e = this.a7o.AttackerCamp,
        r = t.AttackerCamp,
        e = CampUtils_1.CampUtils.GetCampRelationship(e, r);
      if (1 === e) {
        if (!this.hhc(this.LogicController.FriendCampType, t.BulletCamp) || !i && !this.KO1(this.WO1, l)) return !1
      } else {
        if (2 !== e) return !1;
        if (!this.hhc(this.LogicController.EnemyCampType, t.BulletCamp) || !i && !this.KO1(this.QO1, l)) return !1
      }
    }
    if (0 < this.LogicController.DefenseAngle) {
      r = this.a7o.GetActorLocation(), e = t.GetActorLocation(), i = BulletPool_1.BulletPool.CreateVector();
      if (e.Subtraction(r, i), i.Z = 0, i.IsZero()) BulletPool_1.BulletPool.RecycleVector(i);
      else {
        i.Normalize();
        t = BulletPool_1.BulletPool.CreateVector(), e = (this.a7o.GetActorForward(t), t.DotProduct(i)), r = (BulletPool_1.BulletPool.RecycleVector(i), BulletPool_1.BulletPool.RecycleVector(t), Math.cos(this.LogicController.DefenseAngle * MathUtils_1.MathUtils.DegToRad));
        if (e < r) return Log_1.Log.CheckDebug() && Log_1.Log.Debug("Bullet", 20, "攻击角度超出盾牌防御范围", ["Bullet", this.a7o?.BulletRowName], ["cosTwoBullet", e], ["ConfCos", r]), !1
      }
    }
    return !0
  }
  hhc(t, i) {
    return 6 === t || 0 !== t && 0 != (i & campTypeBitMask[t])
  }
  KO1(i, e) {
    if (!i) return !0;
    var l = i.length;
    for (let t = 0; t < l; t++) {
      var r = i[t];
      if (MathUtils_1.MathUtils.IsNearlyEqual(e, r)) return !0
    }
    return !1
  }
}
exports.BulletLogicShieldController = BulletLogicShieldController;
//# sourceMappingURL=BulletLogicShieldController.js.map