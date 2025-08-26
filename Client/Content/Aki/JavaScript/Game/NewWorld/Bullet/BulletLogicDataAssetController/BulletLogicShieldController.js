"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicShieldController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CampUtils_1 = require("../../Character/Common/Blueprint/Utils/CampUtils");
const BulletActionInitHit_1 = require("../Action/BulletActionInitHit");
const BulletHitCountUtil_1 = require("../BulletStaticMethod/BulletHitCountUtil");
const BulletPool_1 = require("../Model/BulletPool");
const BulletLogicController_1 = require("./BulletLogicController");
const campTypeBitMask = [0, BulletActionInitHit_1.SELF_NUMBER, BulletActionInitHit_1.ENEMY_NUMBER, BulletActionInitHit_1.FRIEND_NUMBER, BulletActionInitHit_1.TEAM_NUMBER, BulletActionInitHit_1.SELF_NUMBER | BulletActionInitHit_1.ENEMY_NUMBER];
class BulletLogicShieldController extends BulletLogicController_1.BulletLogicController {
  constructor(t, i) {
    super(t, i);
    this.a7o = undefined;
    this.ohc = undefined;
    this.nhc = undefined;
    this.shc = undefined;
    this.ahc = undefined;
    this.Mq1 = undefined;
    this.Eq1 = undefined;
    this.Iq1 = undefined;
    var e = t.NotDefenseBulletIdList;
    if (e && e.Num() > 0) {
      this.ohc = new Array();
      for (let t = 0; t < e.Num(); ++t) {
        this.ohc.push(e.Get(t));
      }
    }
    var l = t.DefenseBulletIdList;
    if (l && l.Num() > 0) {
      this.nhc = new Array();
      for (let t = 0; t < l.Num(); ++t) {
        this.nhc.push(l.Get(t));
      }
    }
    var r = t.AddBuffToEnemy;
    if (r && r.Num() > 0) {
      this.shc = new Array();
      for (let t = 0; t < r.Num(); ++t) {
        this.shc.push(r.Get(t));
      }
    }
    var s = t.AddBuffToSelf;
    if (s && s.Num() > 0) {
      this.ahc = new Array();
      for (let t = 0; t < s.Num(); ++t) {
        this.ahc.push(s.Get(t));
      }
    }
    var o = t.SelfCalcTypeArray;
    var h = o?.Num() ?? 0;
    if (h > 0) {
      this.Mq1 = new Array();
      for (let t = 0; t < h; ++t) {
        this.Mq1.push(o.Get(t));
      }
    }
    var n = t.FriendCalcTypeArray;
    var u = n?.Num() ?? 0;
    if (u > 0) {
      this.Eq1 = new Array();
      for (let t = 0; t < u; ++t) {
        this.Eq1.push(n.Get(t));
      }
    }
    var a = t.EnemyCalcTypeArray;
    var f = a?.Num() ?? 0;
    if (f > 0) {
      this.Iq1 = new Array();
      for (let t = 0; t < f; ++t) {
        this.Iq1.push(a.Get(t));
      }
    }
  }
  OnInit() {
    this.a7o = this.Bullet.GetBulletInfo();
    this.a7o.IsShield = true;
  }
  BulletLogicAction(i) {
    if (this.CheckCanDefense(i)) {
      if (this.shc) {
        var t = i.Attacker?.GetComponent(175);
        var e = this.a7o.Attacker?.GetComponent(175);
        if (t && e) {
          for (const o of this.shc) {
            t.AddBuff(Number(o), {
              InstigatorId: e.CreatureDataId,
              Level: this.a7o.SkillLevel,
              Reason: "ShieldDefense-AddBuffToEnemy",
              PreMessageId: this.a7o.ContextId
            });
          }
        }
      }
      if (this.ahc) {
        var l = this.a7o.Attacker?.GetComponent(175);
        if (l) {
          for (const h of this.ahc) {
            l.AddBuff(Number(h), {
              InstigatorId: l.CreatureDataId,
              Level: this.a7o.SkillLevel,
              Reason: "ShieldDefense-AddBuffToSelf",
              PreMessageId: this.a7o.ContextId
            });
          }
        }
      }
      var r = this.LogicController.DecreaseBulletHitCount;
      if (r > 0) {
        var s = this.a7o.Attacker;
        for (let t = 0; t < r; t++) {
          BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(i, s);
        }
      }
      BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(this.a7o, i.Attacker);
    }
  }
  CheckCanDefense(t) {
    if (this.LogicController.DefenseCanDodgeBullet && !t.BulletDataMain?.Logic.CanDodge) {
      return false;
    }
    var i = this.LogicController.DefenseCaughtTrigger && t.HasTagId(1481010069);
    var e = t.BulletRowName;
    if (this.nhc && !this.nhc.includes(e)) {
      return false;
    }
    if (this.ohc && this.ohc.includes(e)) {
      return false;
    }
    e = t.CollisionInfo.DamageId;
    e = e ? ModelManager_1.ModelManager.DamageModel.GetDamageConfigById(e) : undefined;
    let l = -1;
    if (e) {
      l = e.CalculateType;
    }
    if (t.AttackerId === this.a7o.AttackerId) {
      if (!this.hhc(this.LogicController.SelfCampType, t.BulletCamp) || !i && !this.Tq1(this.Mq1, l)) {
        return false;
      }
    } else {
      var e = this.a7o.AttackerCamp;
      var r = t.AttackerCamp;
      var e = CampUtils_1.CampUtils.GetCampRelationship(e, r);
      if (e === 1) {
        if (!this.hhc(this.LogicController.FriendCampType, t.BulletCamp) || !i && !this.Tq1(this.Eq1, l)) {
          return false;
        }
      } else {
        if (e !== 2) {
          return false;
        }
        if (!this.hhc(this.LogicController.EnemyCampType, t.BulletCamp) || !i && !this.Tq1(this.Iq1, l)) {
          return false;
        }
      }
    }
    if (this.LogicController.DefenseAngle > 0) {
      r = this.a7o.GetActorLocation();
      e = t.GetActorLocation();
      i = BulletPool_1.BulletPool.CreateVector();
      e.Subtraction(r, i);
      i.Z = 0;
      if (i.IsZero()) {
        BulletPool_1.BulletPool.RecycleVector(i);
      } else {
        i.Normalize();
        t = BulletPool_1.BulletPool.CreateVector();
        this.a7o.GetActorForward(t);
        e = t.DotProduct(i);
        BulletPool_1.BulletPool.RecycleVector(i);
        BulletPool_1.BulletPool.RecycleVector(t);
        r = Math.cos(this.LogicController.DefenseAngle * MathUtils_1.MathUtils.DegToRad);
        if (e < r) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Bullet", 20, "攻击角度超出盾牌防御范围", ["Bullet", this.a7o?.BulletRowName], ["cosTwoBullet", e], ["ConfCos", r]);
          }
          return false;
        }
      }
    }
    return true;
  }
  hhc(t, i) {
    return t === 6 || t !== 0 && (i & campTypeBitMask[t]) != 0;
  }
  Tq1(i, e) {
    if (!i) {
      return true;
    }
    var l = i.length;
    for (let t = 0; t < l; t++) {
      var r = i[t];
      if (MathUtils_1.MathUtils.IsNearlyEqual(e, r)) {
        return true;
      }
    }
    return false;
  }
}
exports.BulletLogicShieldController = BulletLogicShieldController;
//# sourceMappingURL=BulletLogicShieldController.js.map