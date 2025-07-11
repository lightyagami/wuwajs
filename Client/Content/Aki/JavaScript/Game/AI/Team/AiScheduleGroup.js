"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiScheduleGroup = exports.AiAreaMemberData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const BLACKBOARD_KEY_AREA_INDEX = "TeamIndex";
const BLACKBOARD_KEY_ATTACKER = "TeamAttacker";
const MAX_OUT_ZONE_ANGLE_PER_ONE_RADIUS = 0.333;
const MAX_IN_ZONE_ANGLE_PER_ONE_RADIUS = 2;
const MAX_ELITE_TYPE = 3;
const MAX_CHAR_TYPE = 6;
const MIN_RADIUS = 30;
const MAX_RADIUS = 100;
const MINUS_HALF_CIRCLE = -180;
class AiAndScore {
  constructor() {
    this.Ai = undefined;
    this.Score = -0;
  }
  static Get() {
    if (this.Pool.length) {
      return this.Pool.pop();
    } else {
      return new AiAndScore();
    }
  }
  static Release(e) {
    e.Ai = undefined;
    this.Pool.push(e);
  }
  static ReleaseArray(e) {
    for (const t of e) {
      t.Ai = undefined;
      this.Pool.push(t);
    }
    e.length = 0;
  }
}
AiAndScore.Pool = new Array();
AiAndScore.Compare = (e, t) => e.Score - t.Score;
class AiAreaMemberData {
  constructor(e) {
    this.Group = e;
    this.AreaIndex = -1;
    this.InZone = false;
    this.AngleCenter = 0;
    this.MaxAngleOffset = 0;
    this.DistanceCenter = 0;
    this.MaxDistanceOffset = 0;
    this.NextUpdateCenterTime = 0;
    this.CachedTargetLocation = Vector_1.Vector.Create();
    this.CachedControllerYaw = 0;
    this.IsAttacker = false;
    this.HasAttack = false;
    this.NextScheduleTimeNoAttack = 0;
    this.NextScheduleTimeAttack = 0;
    this.NextScheduleTimeOut = 0;
    this.NextScheduleTimeBeAttack = 0;
  }
}
exports.AiAreaMemberData = AiAreaMemberData;
class AiScheduleGroup {
  constructor(e, t) {
    this.cse = e;
    this.Target = t;
    this.mse = new Map();
    this.Gsn = undefined;
    this.dse = new Set();
    this.Cse = false;
    this.gse = 0;
    this.fse = new Array();
    this.GravityQuat = Quat_1.Quat.Create();
    this.InverseGravityQuat = Quat_1.Quat.Create();
    var i = e.AiTeamAreas.length;
    for (let e = 0; e < i; ++e) {
      this.fse.push(new Array());
    }
    this.Gsn = t.Entity?.GetComponent(3);
  }
  GetMemberData(e) {
    return this.mse.get(e);
  }
  TryAdd(e) {
    return !this.mse.has(e) && (this.mse.set(e, new AiAreaMemberData(this)), this.Cse = true);
  }
  Remove(e) {
    var t;
    return !!this.mse.delete(e) && (e.CharAiDesignComp?.Valid && (t = e.CharAiDesignComp.Entity.Id, ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(t, BLACKBOARD_KEY_AREA_INDEX), ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(t, BLACKBOARD_KEY_ATTACKER)), this.dse.delete(e), true);
  }
  IsEmpty() {
    return this.mse.size === 0;
  }
  CheckTargetAndRemove() {
    for (var [e] of this.mse) {
      var t;
      if (this.cse.TeamMemberToGroup.has(e)) {
        if (!(t = e.AiHateList.GetCurrentTarget())?.Valid || t !== this.Target) {
          this.mse.delete(e);
          this.dse.delete(e);
        }
      } else {
        this.mse.delete(e);
        this.dse.delete(e);
      }
    }
  }
  ScheduleGroup() {
    if (this.gse < Time_1.Time.WorldTime || this.Cse) {
      this.pse();
    } else {
      this.vse();
    }
    this.Mse();
    this.Cse = false;
  }
  pse() {
    var e = this.cse.AiTeamLevel;
    this.gse = Time_1.Time.WorldTime + MathUtils_1.MathUtils.GetRandomRange(e.AllocationPeriodic.Min, e.AllocationPeriodic.Max);
    var [e, t, i] = this.Ese();
    AiScheduleGroup.Sse.clear();
    AiScheduleGroup.yse.clear();
    this.Ise(e, t);
    this.Tse(i);
    AiScheduleGroup.Sse.clear();
    AiScheduleGroup.yse.clear();
  }
  Ise(t, i) {
    AiScheduleGroup.Lse.clear();
    let r = 1;
    for (var [o] of this.mse) {
      var h = o.CharActorComp.ActorLocationProxy;
      h.Subtraction(t, AiScheduleGroup.Lz);
      let e = GravityUtils_1.GravityUtils.GetYawInInverseQuat(AiScheduleGroup.Lz, this.InverseGravityQuat) - i;
      while (e > 180) {
        e -= 360;
      }
      while (-e > 180) {
        e += 360;
      }
      AiScheduleGroup.Sse.set(o, e);
      h = Vector_1.Vector.DistSquared2D(h, t);
      if (h > r) {
        r = h;
      }
      AiScheduleGroup.yse.set(o, h);
      AiScheduleGroup.Lse.add(o);
    }
    r += 1;
    let s = 0;
    for (const c of this.cse.AiTeamAreas) {
      var A = this.cse.AreaCharTypeToPriority[s];
      var l = s + 1 < this.cse.AiTeamAreas.length ? this.cse.AreaCharTypeToPriority[s + 1] : undefined;
      AiScheduleGroup.Dse.length = 0;
      for (const d of AiScheduleGroup.Lse) {
        var u;
        var _ = A.get(d.AiBase.MonsterType);
        if (_ !== undefined) {
          (u = AiAndScore.Get()).Ai = d;
          u.Score = _ + AiScheduleGroup.yse.get(d) / r;
          AiScheduleGroup.Dse.push(u);
        }
      }
      AiScheduleGroup.Dse.sort(AiAndScore.Compare);
      var a = this.fse[s];
      let e = a.length = 0;
      for (const S of AiScheduleGroup.Dse) {
        if (e < c.MaxCharacter || !l?.get(S.Ai.AiBase.MonsterType)) {
          a.push(S.Ai);
          AiScheduleGroup.Lse.delete(S.Ai);
        }
        ++e;
      }
      AiAndScore.ReleaseArray(AiScheduleGroup.Dse);
      ++s;
    }
    if (AiScheduleGroup.Lse.size > 0) {
      for (const n of AiScheduleGroup.Lse) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AI", 6, "NotDistributeAi", ["TeamId", this.cse.AiTeamLevel.Id], ["CharType", n.AiBase.MonsterType]);
        }
        break;
      }
      for (const p of AiScheduleGroup.Lse) {
        this.mse.get(p).AreaIndex = -1;
      }
      AiScheduleGroup.Lse.clear();
    }
    s = 0;
    for (const G of this.cse.AiTeamAreas) {
      for (const f of this.fse[s]) {
        var e = this.mse.get(f);
        e.NextUpdateCenterTime = Time_1.Time.WorldTime + MathUtils_1.MathUtils.GetRandomRange(G.ReactionTime.Min, G.ReactionTime.Max);
        e.CachedTargetLocation.DeepCopy(t);
        e.CachedControllerYaw = i;
      }
      ++s;
    }
  }
  Tse(e) {
    let t = 0;
    let i = 0;
    for (const _ of this.cse.AiTeamAreas) {
      var r = this.fse[t];
      if (r.length === 0) ;else {
        AiScheduleGroup.Dse.length = 0;
        for (const a of r) {
          var o = AiAndScore.Get();
          o.Ai = a;
          o.Score = AiScheduleGroup.Sse.get(a);
          AiScheduleGroup.Dse.push(o);
        }
        AiScheduleGroup.Dse.sort(AiAndScore.Compare);
        for (let e = 0; e < AiScheduleGroup.Dse.length; ++e) {
          r[e] = AiScheduleGroup.Dse[e].Ai;
        }
        AiAndScore.ReleaseArray(AiScheduleGroup.Dse);
        var h = Math.min(r.length, _.MaxCharacter);
        var s = r.length - h;
        var A = Math.ceil(s / 2);
        var s = s - A;
        var l = (_.AreaDistance.Max - _.AreaDistance.Min) * 0.5;
        var u = e + _.AreaDistance.Min + l;
        if (A > 0) {
          this.Rse(t, 0, A, MINUS_HALF_CIRCLE, -_.AreaAngle, MAX_OUT_ZONE_ANGLE_PER_ONE_RADIUS, 0, false, u, l);
        }
        i = h > 0 ? this.Rse(t, A, A + h, -_.AreaAngle, _.AreaAngle, MAX_IN_ZONE_ANGLE_PER_ONE_RADIUS, 1, true, u, l, i) : 0;
        if (s > 0) {
          this.Rse(t, A + h, r.length, _.AreaAngle, 180, MAX_OUT_ZONE_ANGLE_PER_ONE_RADIUS, 2, false, u, l);
        }
      }
      ++t;
    }
  }
  Rse(t, i, r, e, o, h, s, A, l, u, _ = 0) {
    var a = this.fse[t];
    let c = 0;
    for (let e = i; e < r; ++e) {
      var d = a[e];
      c += MathUtils_1.MathUtils.Clamp(d.CharActorComp.Radius, MIN_RADIUS, MAX_RADIUS);
    }
    var S = Math.min(h, (o - e) / c);
    let n = 0;
    switch (s) {
      case 0:
        n = o - S * c;
        break;
      case 1:
        n = (e + o - S * c) * 0.5;
        break;
      default:
        n = e;
    }
    for (let e = i; e < r; ++e) {
      var p = a[e];
      var G = this.mse.get(p);
      G.AreaIndex = t;
      G.InZone = A;
      G.MaxAngleOffset = S * MathUtils_1.MathUtils.Clamp(p.CharActorComp.Radius, MIN_RADIUS, MAX_RADIUS) * 0.5;
      G.AngleCenter = n + G.MaxAngleOffset;
      G.DistanceCenter = l;
      G.MaxDistanceOffset = u;
      n += G.MaxAngleOffset * 2;
    }
    return 0;
  }
  vse() {
    let e = undefined;
    let t = 0;
    let i = 0;
    for (const o of this.cse.AiTeamAreas) {
      for (const h of this.fse[i]) {
        var r = this.mse.get(h);
        if (!!r && !(Time_1.Time.WorldTime <= r.NextUpdateCenterTime)) {
          if (!e) {
            [e, t] = this.Ese();
          }
          r.NextUpdateCenterTime = Time_1.Time.WorldTime + MathUtils_1.MathUtils.GetRandomRange(o.ReactionTime.Min, o.ReactionTime.Max);
          r.CachedTargetLocation.DeepCopy(e);
          r.CachedControllerYaw = t;
        }
      }
      ++i;
    }
  }
  Mse() {
    var e = this.Gsn;
    GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(e, this.GravityQuat);
    this.GravityQuat.Inverse(this.InverseGravityQuat);
    AiScheduleGroup.Dse.length = 0;
    var e = this.Use();
    this.Ase(e);
    AiAndScore.ReleaseArray(AiScheduleGroup.Dse);
  }
  Use() {
    var e = this.cse.AiTeamLevel;
    AiScheduleGroup.Pse.splice(0, AiScheduleGroup.Pse.length);
    for (const _ of this.dse) {
      var t = this.mse.get(_);
      if (_.CharActorComp.Entity.CheckGetComponent(205).HasTag(-1503953470)) {
        if (t.NextScheduleTimeBeAttack) {
          if (t.NextScheduleTimeBeAttack < Time_1.Time.WorldTime) {
            AiScheduleGroup.Pse.push(_);
            continue;
          }
        } else {
          t.NextScheduleTimeBeAttack = Time_1.Time.WorldTime + MathUtils_1.MathUtils.GetRandomRange(e.BeAttackCountDown.Min, e.BeAttackCountDown.Max);
        }
      } else {
        t.NextScheduleTimeBeAttack = undefined;
      }
      if (t.HasAttack) {
        if (t.NextScheduleTimeAttack < Time_1.Time.WorldTime && (!_.CharActorComp.Entity.CheckGetComponent(205).HasTag(-1371021686) || t.NextScheduleTimeOut < Time_1.Time.WorldTime)) {
          AiScheduleGroup.Pse.push(_);
        }
      } else if (t.NextScheduleTimeNoAttack < Time_1.Time.WorldTime) {
        AiScheduleGroup.Pse.push(_);
      } else if (_.CharActorComp.Entity.CheckGetComponent(205).HasTag(-1371021686)) {
        t.HasAttack = true;
        ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(_.CharAiDesignComp.Entity.Id, "TeamAttacker");
      }
    }
    var i = Math.min(e.AttackerNum - (this.dse.size - AiScheduleGroup.Pse.length), this.mse.size - this.dse.size);
    if (i > 0) {
      var [r, o] = this.Ese();
      let e = 0;
      for (const a of this.fse) {
        var h = this.cse.AiTeamAttacks[e];
        for (const c of a) {
          var s = this.mse.get(c);
          if (s && s.InZone && !s.IsAttacker && !c.CharActorComp.Entity.CheckGetComponent(205).HasTag(-1371021686)) {
            var A = c.CharActorComp.ActorLocationProxy;
            A.Subtraction(r, AiScheduleGroup.Lz);
            let e = GravityUtils_1.GravityUtils.GetYawInInverseQuat(AiScheduleGroup.Lz, this.InverseGravityQuat) - o;
            while (e > 180) {
              e -= 360;
            }
            while (-e > 180) {
              e += 360;
            }
            e = Math.abs(e);
            A = Math.abs(Vector_1.Vector.Dist2D(A, r) - s.DistanceCenter);
            A = h.ExtraWeight - h.AngleCoefficient * e / (s.MaxAngleOffset * 2) - h.DistanceCoefficient * A / (s.MaxDistanceOffset * 2);
            s = AiAndScore.Get();
            s.Ai = c;
            s.Score = A;
            AiScheduleGroup.Dse.push(s);
          }
        }
        ++e;
      }
      for (const d of AiScheduleGroup.Pse) {
        this.mse.get(d).IsAttacker = false;
        this.dse.delete(d);
        ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(d.CharAiDesignComp.Entity.Id, BLACKBOARD_KEY_ATTACKER);
      }
    } else {
      for (const S of AiScheduleGroup.Pse) {
        var l = this.mse.get(S);
        l.NextScheduleTimeAttack = Time_1.Time.WorldTime + MathUtils_1.MathUtils.GetRandomRange(e.AttackCountDown.Min, e.AttackCountDown.Max);
        var u = MathUtils_1.MathUtils.GetRandomRange(e.NoAttackCountDown.Min, e.NoAttackCountDown.Max);
        l.NextScheduleTimeNoAttack = Time_1.Time.WorldTime + u;
        l.NextScheduleTimeOut = Time_1.Time.WorldTime + u * 2;
        l.HasAttack = false;
        ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(S.CharAiDesignComp.Entity.Id, "TeamAttacker", true);
      }
    }
    return i;
  }
  Ase(t) {
    AiScheduleGroup.Dse.sort(AiAndScore.Compare);
    let o = 0;
    let h = 0;
    var s = new Array();
    for (let e = 0; e < MAX_CHAR_TYPE; ++e) {
      s.push(0);
    }
    for (const e of AiScheduleGroup.Dse) {
      if (e.Ai.AiBase.MonsterType <= MAX_ELITE_TYPE) {
        ++o;
      } else {
        ++h;
      }
      ++s[e.Ai.AiBase.MonsterType - 1];
    }
    var A = new Array();
    for (let e = 0; e < MAX_CHAR_TYPE; ++e) {
      A.push(0);
    }
    var l = this.cse.AiTeamLevel;
    for (let e = 0; e < t; ++e) {
      let e = false;
      if (o > 0 && h > 0) {
        e = MathUtils_1.MathUtils.GetRandomRange(0, l.EliteRatio[0] + l.EliteRatio[1]) < l.EliteRatio[0];
      } else if (o > 0) {
        e = true;
      } else {
        if (!(h > 0)) {
          break;
        }
        e = false;
      }
      let t = 0;
      t = e ? (--o, 0) : (--h, MAX_ELITE_TYPE);
      let i = 0;
      let r = 0;
      for (let e = 0; e < MAX_ELITE_TYPE; ++e) {
        if (s[t + e] > 0 && (i += l.RangeRatio[e], MathUtils_1.MathUtils.GetRandomRange(0, i) < l.RangeRatio[e])) {
          r = t + e;
        }
      }
      --s[r];
      ++A[r];
    }
    for (let e = AiScheduleGroup.Dse.length - 1; e >= 0; --e) {
      var i;
      var r;
      var u = AiScheduleGroup.Dse[e];
      if (!(A[u.Ai.AiBase.MonsterType - 1] <= 0)) {
        --A[u.Ai.AiBase.MonsterType - 1];
        (i = this.mse.get(u.Ai)).IsAttacker = true;
        i.HasAttack = false;
        i.NextScheduleTimeAttack = Time_1.Time.WorldTime + MathUtils_1.MathUtils.GetRandomRange(l.AttackCountDown.Min, l.AttackCountDown.Max);
        r = MathUtils_1.MathUtils.GetRandomRange(l.NoAttackCountDown.Min, l.NoAttackCountDown.Max);
        i.NextScheduleTimeNoAttack = Time_1.Time.WorldTime + r;
        i.NextScheduleTimeOut = Time_1.Time.WorldTime + r * 2;
        i.NextScheduleTimeBeAttack = undefined;
        ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(u.Ai.CharAiDesignComp.Entity.Id, BLACKBOARD_KEY_ATTACKER, true);
        this.dse.add(u.Ai);
      }
    }
  }
  Ese() {
    var e = this.Gsn;
    var t = this.Target.Entity.GetComponent(62);
    let i = 0;
    if (t?.Valid && t.CharacterController) {
      AiScheduleGroup.HQ_.DeepCopy(t.CharacterController.GetActorForwardVector());
      if (e.MoveComp && !e.MoveComp.IsStandardGravity && Math.abs(e.MoveComp.GravityUp.DotProduct(AiScheduleGroup.HQ_)) > 1 - MathUtils_1.MathUtils.KindaSmallNumber) {
        AiScheduleGroup.HQ_.DeepCopy(t.CharacterController.GetActorUpVector());
      }
      i = GravityUtils_1.GravityUtils.GetYawInInverseQuat(AiScheduleGroup.HQ_, this.InverseGravityQuat);
    }
    return [e.ActorLocationProxy, i, e.ScaledRadius];
  }
}
(exports.AiScheduleGroup = AiScheduleGroup).Dse = new Array();
AiScheduleGroup.Sse = new Map();
AiScheduleGroup.yse = new Map();
AiScheduleGroup.Lse = new Set();
AiScheduleGroup.Pse = new Array();
AiScheduleGroup.HQ_ = Vector_1.Vector.Create();
AiScheduleGroup.Lz = Vector_1.Vector.Create(); //# sourceMappingURL=AiScheduleGroup.js.map