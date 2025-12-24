"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var o = arguments.length;
  var r = o < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, e, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (h = t[a]) {
        r = (o < 3 ? h(r) : o > 3 ? h(i, e, r) : h(i, e)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(i, e, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcSitOnChairComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const AiContollerLibrary_1 = require("../../../../AI/Controller/AiContollerLibrary");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const TOLERANCE = 10;
const TURN_SPEED = 200;
const NEARBY_CHAIR_TOLERANCE_SQUARED = 2500;
const NEARBY_CHAIR_OFFSET = 50;
const MOVE_TO_CHAIR_SPEED = 70;
const MOVE_TO_NEARBY_CHAIR_SPEED = 100;
const MOVE_TO_CHAIR_DISTANCE_TOLERANCE = 5;
const MODEL_BUFFER_TIME = 500;
const SIT_UP_TIME = 2000;
const SIT_DOWN_TIME = 1500;
const MOVE_TIMEOUT_1 = 1;
const MOVE_TIMEOUT_2 = 2;
const FOURTY_FIVE = 45;
const ZERO_EIGHT = 0.8;
const FIVETY = 50;
const ONE_HUNDRED_FOURTY = 140;
const TWO_HUNDRED_TWENTY = 220;
let NpcSitOnChairComponent = class NpcSitOnChairComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.o$u = Vector_1.Vector.Create();
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.Hte = undefined;
    this.Gce = undefined;
    this.ph_ = undefined;
    this.oRe = undefined;
    this.n$u = false;
    this.s$u = -1;
    this.WTe = 0;
    this.Man = undefined;
    this.OPt = undefined;
    this.hAd = Vector_1.Vector.Create();
    this.Ry1 = false;
    this.a$u = false;
    this.h$u = false;
    this.l$u = false;
    this._$u = false;
    this.u$u = false;
    this.c$u = 0;
    this.lAd = 0;
    this.mtd = 0;
    this.ftd = undefined;
  }
  get Phase() {
    return this.c$u;
  }
  set Phase(t) {
    if (this.c$u !== t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 42, "[NpcSitOnChairComponent] 切换阶段", ["Phase", t]);
      }
      this.c$u = t;
    }
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.Gce = this.Entity.GetComponent(46);
    this.ph_ = this.Entity.GetComponent(47);
    this.oRe = this.Entity.GetComponent(186);
    var t = this.oRe?.MainAnimInstance;
    if (t && UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLENPC)) {
      this.n$u = true;
    }
    return true;
  }
  OnActivate() {}
  OnTick(t) {
    if (this.Ry1) {
      this.d$u();
    }
  }
  OnEnd() {
    this.Finish();
    this.gtd();
    return true;
  }
  Finish(t = false) {
    this.lAd = Time_1.Time.Now;
    this.m$u(t);
    this.f$u();
  }
  StartNpcSitOnChair(t) {
    if (this.Hte) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BehaviorTree", 42, "[NpcSitOnChairComponent] StartNpcSitOnChair", ["PbDataId", this.Hte.CreatureData.GetPbDataId()]);
      }
      if (this.Ry1) {
        this.Finish();
      }
      this.OPt = t;
      if (this.Gce?.CharacterMovement?.IsValid()) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.OPt.ChairEntityId);
        this.Man = t?.Entity?.GetComponent(207)?.GetSubEntityInteractLogicController();
        if (this.Man && this.Man.IsSceneInteractionLoadCompleted()) {
          if (this.OPt.MontagePath === "") {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("BehaviorTree", 42, "[NpcSitOnChairComponent] 无效的Montage路径", ["PbDataId", this.Hte.CreatureData.GetPbDataId()]);
            }
            this.Finish();
          } else {
            this._Ad(() => {
              this.Phase = 1;
              this.Ry1 = true;
            }, SIT_UP_TIME, this.lAd);
          }
        } else {
          this.Finish();
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 42, "[NpcSitOnChairComponent] MoveComp不合法", ["PbDataId", this.Hte.CreatureData.GetPbDataId()]);
        }
        this.Finish();
      }
    }
  }
  d$u() {
    switch (this.Phase) {
      case 1:
        this.Phase = 2;
        break;
      case 2:
        this.g$u();
        break;
      case 3:
        this.C$u();
        break;
      case 4:
        if (this.OPt?.InterruptCondition()) {
          this.Finish(true);
        } else {
          this.QTe();
          if (GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(this.Hte) < TOLERANCE) {
            this.Gce.CharacterMovement.MovementMode = this.WTe;
            this.Phase = 5;
          }
        }
        break;
      case 5:
        this.p$u();
        break;
      case 6:
        this.v$u();
        break;
      case 7:
        this.OPt?.Finish?.();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BehaviorTree", 42, "[NpcSitOnChairComponent] Finish");
        }
        this.Finish();
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 42, "[NpcSitOnChairComponent] 阶段切换出错", ["CurPhase", this.Phase]);
        }
    }
  }
  f$u() {
    this.Phase = 0;
    this.WTe = 0;
    this.a$u = false;
    this.h$u = false;
    this.l$u = false;
    this._$u = false;
    this.u$u = false;
    this.OPt = undefined;
    this.Ry1 = false;
    this.hAd.Reset();
    this.gtd();
  }
  m$u(t = false) {
    switch (this.Phase) {
      case 2:
      case 3:
        this.Gce?.StopMoveNew();
        break;
      case 4:
        this.Hte?.ClearInput();
        this.gWu();
        break;
      case 5:
        this.gtd();
        this.v$u();
        this.gWu();
        this.uAd();
        break;
      case 6:
        this.gWu();
        this.uAd();
    }
    if (t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BehaviorTree", 42, "[NpcSitOnChairComponent] Abort", ["Phase", this.Phase]);
      }
      this.OPt?.Abort?.();
    }
  }
  g$u() {
    var t;
    if (!this.a$u) {
      this.a$u = true;
      this.Man.Possess(this.Entity);
      t = this.Man.GetSitLocation();
      this.Man.GetForwardDirection().Multiply(NEARBY_CHAIR_OFFSET, this.o$u);
      this.o$u.AdditionEqual(t);
      if (GravityUtils_1.GravityUtils.GetDistSquared2dForActor(this.Hte, this.o$u, this.Hte.ActorLocationProxy) < NEARBY_CHAIR_TOLERANCE_SQUARED) {
        this.Phase = 3;
      } else {
        t = {
          Points: [{
            Index: 0,
            Position: this.o$u,
            MoveState: IComponent_1.EPatrolMoveState.Walk,
            MoveSpeed: MOVE_TO_NEARBY_CHAIR_SPEED
          }],
          Navigation: true,
          IsFly: false,
          DebugMode: true,
          Loop: false,
          Distance: MOVE_TO_CHAIR_DISTANCE_TOLERANCE,
          Callback: t => {
            if (t === 2) {
              this.Man.Possess(this.Entity);
              this.Man.IgnoreCollision();
              if (this.OPt?.TeleportEffect?.length) {
                var i = this.Entity?.GetComponent(238);
                for (const e of this.OPt.TeleportEffect) {
                  i?.AddCue(e, {
                    Instant: true
                  });
                }
              }
              this.Hte?.SetActorLocation(this.o$u.ToUeVector(), "[NpcSitOnChairComponent] ExecuteMoveNearby", false);
              this.Gce.StopMoveNew();
              this.Phase = 4;
            } else {
              this.Gce.StopMoveNew();
              this.Phase = 3;
            }
          },
          ReturnTimeoutFailed: MOVE_TIMEOUT_1,
          ReturnFalseWhenNavigationFailed: true,
          StrictNavigation: true
        };
        this.Gce.MoveAlongPath(t);
      }
    }
  }
  C$u() {
    var t;
    var i;
    if (!this.h$u) {
      this.h$u = true;
      this.Man.Possess(this.Entity);
      this.Man.IgnoreCollision();
      t = this.Hte.ActorLocationProxy;
      i = this.Man.GetSitLocation();
      this.hAd.Set(i.X, i.Y, t.Z);
      i = {
        Points: [{
          Index: 0,
          Position: this.hAd,
          MoveState: IComponent_1.EPatrolMoveState.Walk,
          MoveSpeed: MOVE_TO_CHAIR_SPEED
        }],
        Navigation: true,
        IsFly: false,
        DebugMode: true,
        Loop: false,
        Distance: MOVE_TO_CHAIR_DISTANCE_TOLERANCE,
        Callback: t => {
          if (t === 2) {
            this.kgd(this.hAd, "ExecuteMoveClose.移动靠近椅子保底");
          }
          this.Gce.StopMoveNew();
          this.Phase = 4;
        },
        ReturnTimeoutFailed: MOVE_TIMEOUT_1,
        ReturnFalseWhenNavigationFailed: true,
        StrictNavigation: true
      };
      this.Gce.MoveAlongPath(i);
    }
  }
  QTe() {
    if (!this.l$u) {
      this.l$u = true;
      this.Man.GetForwardDirection().Multiply(200, this.cz);
      this.cz.AdditionEqual(this.o$u);
      this.WTe = this.Gce.CharacterMovement.MovementMode;
      this.Gce.CharacterMovement.MovementMode = 1;
      AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(this.Hte, this.cz, TURN_SPEED);
    }
  }
  p$u() {
    if (this._$u) {
      if (this.OPt?.InterruptCondition()) {
        this._Ad(() => {
          if (this.Phase !== 0) {
            this.Phase = 6;
          }
        }, SIT_DOWN_TIME, this.mtd);
      }
    } else {
      this.mtd = Time_1.Time.Now;
      this._$u = true;
      this.CWu();
    }
  }
  v$u() {
    var t;
    if (!this.u$u) {
      this.fWu();
      this.u$u = true;
      t = {
        Points: [{
          Index: 0,
          Position: this.o$u,
          MoveState: IComponent_1.EPatrolMoveState.Walk,
          MoveSpeed: MOVE_TO_CHAIR_SPEED
        }],
        Navigation: true,
        IsFly: false,
        DebugMode: true,
        Loop: false,
        Distance: MOVE_TO_CHAIR_DISTANCE_TOLERANCE,
        Callback: t => {
          if (t === 2) {
            this.kgd(this.o$u, "ExecuteMoveAway.移动离开椅子保底");
          }
          this.gWu();
          this.Phase = 7;
        },
        ReturnTimeoutFailed: MOVE_TIMEOUT_2,
        ReturnFalseWhenNavigationFailed: false
      };
      this.Gce.MoveAlongPath(t);
    }
  }
  gWu() {
    this.Gce.StopMoveNew();
    this.Man.ResetCollision();
    this.Man.UnPossess(this.Entity);
  }
  uAd() {
    if (!this.hAd.IsNearlyZero()) {
      this.kgd(this.hAd, "SetCloseChairLocation.移动离开椅子保底");
    }
  }
  kgd(t, i) {
    var e = this.Entity.GetComponent(186).GetMeshTransform();
    this.Hte?.SetActorLocation(t.ToUeVector(), "[NpcSitOnChairComponent]" + i, false);
    this.Entity.GetComponent(186)?.SetModelBuffer(e, MODEL_BUFFER_TIME);
  }
  _Ad(t, i, e) {
    this.gtd();
    i -= Time_1.Time.Now - e;
    if (i <= 20) {
      t();
    } else {
      this.ftd = TimerSystem_1.TimerSystem.Delay(() => {
        t?.();
        this.ftd = undefined;
      }, i);
    }
  }
  gtd() {
    if (this.ftd && TimerSystem_1.TimerSystem.Has(this.ftd)) {
      TimerSystem_1.TimerSystem.Remove(this.ftd);
    }
    this.ftd = undefined;
  }
  CWu() {
    if (this.n$u) {
      this.M$u();
    } else {
      this.E$u();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BehaviorTree", 42, "[NpcSitOnChairComponent] PlaySitDownAnim");
    }
  }
  fWu() {
    if (this.n$u) {
      this.y$u();
    } else {
      this.S$u();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BehaviorTree", 42, "[NpcSitOnChairComponent] PlayStandUpAnim");
    }
  }
  E$u() {
    if (this.OPt.MontagePath) {
      this.oRe?.SetLocationAndRotatorWithModelBuffer(this.hAd.ToUeVector(), this.Hte.ActorRotationProxy.ToUeRotator(), MODEL_BUFFER_TIME, "NpcSitOnChairComp.NormalNpcSitOnChair");
      this.s$u = this.ph_.VolatileMontagePlayByLoad(3, this.OPt.MontagePath, undefined, undefined, t => {
        if (t) {
          this.Phase = 6;
        } else {
          this.Finish();
        }
      }, -1, -1);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 42, "[NpcSitOnChairComponent] 没有MontagePath");
    }
  }
  S$u() {
    if (this.s$u !== -1) {
      this.ph_?.VolatileMontageStopByLoad(3, this.s$u, 0);
      this.s$u = -1;
    }
  }
  M$u() {
    var t = this.oRe?.MainAnimInstance;
    if (UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLENPC)) {
      this.DoSitDownAction(this.Man.Entity);
      this.FTe(this.Man.Entity);
      t.LogicParams.SitDownDirect = this.I$u(this.Man.Entity) - 1;
      t.LogicParams.SitDownType = 1;
      t.LogicParams.bSitDown = true;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 42, "[NpcSitOnChairComponent] RoleNpcSitOnChair执行异常", ["instance", t !== undefined]);
    }
  }
  y$u() {
    var t = this.oRe?.MainAnimInstance;
    if (UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLENPC) && UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLENPC)) {
      this.ResetCollision(this.Man.Entity);
      t.LogicParams.StandUpDirect = this.L2r(this.Man.Entity);
      t.LogicParams.bSitDown = false;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 42, "[NpcSitOnChairComponent] RoleNpcStandUp执行异常", ["instance", t !== undefined]);
    }
  }
  DoSitDownAction(t) {
    var i;
    if (t) {
      this.cz.Reset();
      this.Gce.SetForceSpeed(this.cz);
      i = t.GetComponent(212);
      t = t.GetComponent(207);
      this.cz.DeepCopy(t.GetInteractPoint());
      this.cz.Z += this.Hte.HalfHeight;
      t = this.Entity.GetComponent(186).GetMeshTransform();
      this.cie.DeepCopy(i.ActorRotationProxy);
      this.cie.Yaw += 90;
      this.Hte.SetInputRotator(this.cie);
      this.Hte.SetActorLocationAndRotation(this.cz.ToUeVector(), this.cie.ToUeRotator(), "角色坐下", false);
      this.Entity.GetComponent(186)?.SetModelBuffer(t, MODEL_BUFFER_TIME);
    }
  }
  L2r(t) {
    if (!t) {
      return 0;
    }
    this.Hte.Actor.KuroSetMovementMode({
      Mode: 1,
      Context: "[NpcSitOnChairComponent.CalculateLeaveSitDownIndex]"
    });
    this.cz.DeepCopy(this.Hte.InputDirectProxy);
    if (this.cz.IsNearlyZero()) {
      return 0;
    }
    this.cz.Normalize();
    t = t.GetComponent(207).GetInteractController().SectorRange;
    if (this.cz.DotProduct(this.Hte.ActorForwardProxy) > ZERO_EIGHT || !t) {
      return 0;
    } else {
      this.cz.CrossProduct(this.Hte.ActorForwardProxy, this.fz);
      if (this.fz.Z >= 0) {
        if (t.Begin < -FOURTY_FIVE) {
          return 1;
        } else {
          return 0;
        }
      } else if (t.End > FOURTY_FIVE) {
        return 2;
      } else {
        return 0;
      }
    }
  }
  I$u(t) {
    t = t.GetComponent(212);
    if (!t) {
      return 0;
    }
    this.Hte.ActorLocationProxy.Subtraction(t.ActorLocationProxy, this.cz);
    this.cz.Z = 0;
    this.cz.Normalize();
    var i = this.cz.DotProduct(t.ActorRightProxy);
    let e = Math.acos(i) * MathUtils_1.MathUtils.RadToDeg;
    this.cz.CrossProduct(t.ActorRightProxy, this.fz);
    if (this.fz.Z < 0) {
      e *= -1;
    }
    if (e >= -FIVETY && e <= FIVETY) {
      return 1;
    } else if (e >= FIVETY && e <= ONE_HUNDRED_FOURTY) {
      return 2;
    } else if (e >= -ONE_HUNDRED_FOURTY && e <= -FIVETY) {
      return 3;
    } else {
      if (e < 0) {
        e += MathUtils_1.PI_DEG_DOUBLE;
      }
      if (e >= ONE_HUNDRED_FOURTY && e <= TWO_HUNDRED_TWENTY) {
        return 4;
      } else {
        return 0;
      }
    }
  }
  ResetCollision(t) {
    this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 2);
    if ((t &&= t.GetComponent(212)) && t.Entity) {
      this.HTe(t, false);
    }
  }
  FTe(t) {
    t = t.GetComponent(212);
    if (t && t.Entity) {
      this.HTe(t, true);
    }
    this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 0);
  }
  HTe(t, i) {
    var e = t.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
    var e = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(e);
    let s = undefined;
    s = e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e))?.Valid ? e.Entity.GetComponent(212) : t;
    var e = (0, puerts_1.$ref)(undefined);
    s.Owner.GetAttachedActors(e);
    var h = (0, puerts_1.$unref)(e);
    var o = h.Num();
    for (let t = 0; t < o; ++t) {
      var r = h.Get(t);
      var a = (0, puerts_1.$ref)(undefined);
      r.GetAttachedActors(a);
      var n = (0, puerts_1.$unref)(a);
      var _ = n.Num();
      for (let t = 0; t < _; ++t) {
        this.Hte.Actor.CapsuleComponent.IgnoreActorWhenMoving(n.Get(t), i);
      }
    }
  }
};
NpcSitOnChairComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(96)], NpcSitOnChairComponent);
exports.NpcSitOnChairComponent = NpcSitOnChairComponent; //# sourceMappingURL=NpcSitOnChairComponent.js.map