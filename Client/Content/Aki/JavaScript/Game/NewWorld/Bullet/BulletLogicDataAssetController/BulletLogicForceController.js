"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicForceController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const CharacterUnifiedStateTypes_1 = require("../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("../../Character/Common/Component/Move/CustomMovementDefine");
const BulletPool_1 = require("../Model/BulletPool");
const BulletLogicController_1 = require("./BulletLogicController");
const WEIGHT_COEFFICIENT = 14;
const TOLERANCE = 0.00001;
const FORCE_DAMPING_RATIO = 0.5;
const MOVE_TIME = 0.1;
const FORCE_RATIO = 5000;
const MIN_WEIGHT = 50;
const LENGTH_CONVERSION = 100;
class BulletLogicForceController extends BulletLogicController_1.BulletLogicController {
  constructor(t, i) {
    super(t, i);
    this.g7o = false;
    this.f7o = undefined;
    this.p7o = false;
    this.v7o = new Set();
    this.M7o = new Set();
    this.E7o = Vector_1.Vector.Create();
    this.h7o = t;
    this.a7o = i.GetBulletInfo();
    this.S7o = i.GetComponent(170);
    this.y7o = new Map();
    this.I7o = new Map();
    this.NeedTick = true;
    this.g7o = this.h7o.ConstantForce;
    this.p7o = this.h7o.IsLaunching;
    this.T7o = this.LogicController.WorkHaveTag.GameplayTags.Num() > 0;
    this.KIa = this.LogicController.ImmuneStopDuration;
  }
  OnInit() {
    this.L7o();
  }
  L7o() {
    var t;
    if (this.g7o) {
      t = this.a7o.AttackerMoveComp?.IsStandardGravity ?? true;
      this.f7o = t ? Vector_1.Vector.Create(this.h7o.TowardsBullet ? this.S7o.ActorUpProxy : Vector_1.Vector.UpVector) : Vector_1.Vector.Create(this.h7o.TowardsBullet ? this.S7o.ActorUpProxy : this.a7o.AttackerMoveComp.GravityUp);
      this.f7o.MultiplyEqual(this.h7o.ForceBase);
    }
  }
  Update(t) {
    super.Update(t);
    this.D7o();
  }
  BulletLogicAction() {
    if (this.h7o.ConstantForce) {
      this.D7o();
    }
  }
  D7o() {
    var t;
    var i;
    var e = GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(this.LogicController.WorkHaveTag);
    if (this.g7o) {
      if (!this.p7o) {
        t = this.v7o;
        this.v7o = this.M7o;
        this.M7o = t;
        this.v7o.clear();
      }
      for ([i] of this.a7o.CollisionInfo.CharacterEntityMap) {
        if (!!i && (!this.T7o || !!i.GetComponent(206).HasAnyTag(e))) {
          this.R7o(i);
        }
      }
    } else {
      for (var [s] of this.a7o.CollisionInfo.CharacterEntityMap) {
        var o = s.GetComponent(206);
        if (!!s && (!this.T7o || !!o.HasAnyTag(e)) && !o.HasTag(1077681329)) {
          this.U7o(s);
        }
      }
    }
  }
  U7o(t) {
    var i;
    var e;
    var s;
    var o = t.GetComponent(179);
    if (!!o?.Valid && !(o.CharacterWeight > this.h7o.LimitWeight) && !(s = t.GetComponent(3).ActorLocationProxy, (e = Vector_1.Vector.Dist(this.S7o.ActorLocationProxy, s)) > this.h7o.OuterRadius) && !(e < this.h7o.InnerRadius) && !(this.h7o.OuterRadius <= 0)) {
      i = Math.max(MIN_WEIGHT, o.CharacterWeight) - WEIGHT_COEFFICIENT;
      e = Math.exp(-(e / this.h7o.OuterRadius * this.h7o.ForceDampingRatio * FORCE_DAMPING_RATIO)) * this.h7o.ForceBase * FORCE_RATIO / (i * i) * LENGTH_CONVERSION;
      (i = Vector_1.Vector.Create(this.S7o.ActorLocation)).SubtractionEqual(s);
      i.Normalize(TOLERANCE);
      i.MultiplyEqual(e);
      s = this.y7o.get(t);
      s = o.SetAddMoveWorld(i.ToUeVector(), MOVE_TIME, undefined, s);
      this.y7o.set(t, s);
      if (this.KIa > 0 && (e = t.GetComponent(61)) && !e.IsImmuneTimeScaleEffect()) {
        e.AddImmuneTimeScaleEffectTimer(this.KIa * CommonDefine_1.MILLIONSECOND_PER_SECOND);
      }
    }
  }
  R7o(s) {
    var o = s.GetComponent(176);
    var h = s.GetComponent(179);
    if (o?.Valid && h?.Valid) {
      let i = CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE;
      if (this.p7o) {
        if (o.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Air || o.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Other) {
          h.ActorComp?.Actor.KuroSetMovementMode({
            Mode: 3,
            Context: "[BulletLogicForceController.TowardsConstantForce]"
          });
        }
        i = undefined;
      } else {
        if (o.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Glide) {
          this.v7o.add(s);
          return;
        }
        if (this.M7o.has(s)) {
          h.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
        }
      }
      let e = this.y7o.get(s);
      var o = s.GetComponent(3);
      var r = this.a7o.AttackerMoveComp?.IsStandardGravity ?? true;
      let t = 0;
      if (r) {
        t = this.S7o.ActorLocationProxy.Z - o.ActorLocationProxy.Z;
      } else {
        (l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(this.S7o.ActorLocationProxy);
        l.SubtractionEqual(o.ActorLocationProxy);
        t = Vector_1.Vector.DotProduct(l, this.a7o.AttackerMoveComp.GravityUp);
        BulletPool_1.BulletPool.RecycleVector(l);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 20, "角色到子弹的高度差", ["Dist", t]);
      }
      var l = t - o.ScaledHalfHeight + this.a7o.Size.Z;
      if (this.h7o.HaveTopArea && l < this.h7o.TopAreaHeight) {
        if (l > 0) {
          if (r) {
            this.E7o.Set(0, 0, -h.CharacterMovement.Velocity.Z);
          } else {
            (o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(h.CharacterMovement.Velocity);
            l = -Vector_1.Vector.DotProduct(o, this.a7o.AttackerMoveComp.GravityUp);
            BulletPool_1.BulletPool.RecycleVector(o);
            this.a7o.AttackerMoveComp.GravityUp.Multiply(l, this.E7o);
          }
          e = h.SetAddMoveWorld(this.E7o.ToUeVector(), MOVE_TIME, this.h7o.ContinueTimeCurve ?? undefined, e);
          this.y7o.set(s, e);
        }
      } else {
        let t = 0;
        if (this.h7o.TowardsBullet) {
          t = this.h7o.ContinueTime;
          if (r) {
            this.E7o.Set(0, 0, 230);
          } else {
            this.a7o.AttackerMoveComp.GravityUp.Multiply(230, this.E7o);
          }
          o = this.h7o.IsResetOnLast ? BulletLogicForceController.A7o.get(this.h7o.Group) : this.I7o.get(s);
          o = h.SetAddMoveWorld(this.E7o.ToUeVector(), t, undefined, o, i);
          if (this.h7o.IsResetOnLast) {
            BulletLogicForceController.A7o.set(this.h7o.Group, o);
          } else {
            this.I7o.set(s, o);
          }
        } else {
          t = MOVE_TIME;
        }
        e = this.h7o.IsResetOnLast ? BulletLogicForceController.P7o.get(this.h7o.Group) : this.y7o.get(s);
        e = h.SetAddMoveWorld(this.f7o.ToUeVector(), t, this.h7o.ContinueTimeCurve ?? undefined, e, i);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Bullet", 20, "AddMoveWorld", ["Speed", this.f7o]);
        }
        if (this.h7o.IsResetOnLast) {
          BulletLogicForceController.P7o.set(this.h7o.Group, e);
        } else {
          this.y7o.set(s, e);
        }
      }
    }
  }
}
(exports.BulletLogicForceController = BulletLogicForceController).P7o = new Map();
BulletLogicForceController.A7o = new Map(); //# sourceMappingURL=BulletLogicForceController.js.map