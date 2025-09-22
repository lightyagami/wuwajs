"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var r;
  var h = arguments.length;
  var o = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (r = t[a]) {
        o = (h < 3 ? r(o) : h > 3 ? r(e, i, o) : r(e, i)) || o;
      }
    }
  }
  if (h > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoPerformComponent = undefined;
const UE = require("ue");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const StackableChessComponent_1 = require("./StackableChessComponent");
const STAND_DELAY_TIME = 100;
const SCALE_SIZE = 1.2;
let DangoPerformComponent = class DangoPerformComponent extends StackableChessComponent_1.StackableChessComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.rRe = undefined;
    this.IsBeginJump = false;
    this.IsInterruptJump = false;
    this.JumpHeight = 0;
    this.JumpDistance = 0;
    this.tu = 0;
    this.Apc = 0;
    this.BDc = 0;
    this.Ppc = undefined;
    this.Asr = Vector_1.Vector.Create();
    this.Dpc = Vector_1.Vector.Create();
    this.Upc = Rotator_1.Rotator.Create();
    this.cz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
  }
  OnStart() {
    return !!super.OnStart() && (this.ActorComp = this.Entity.CheckGetComponent(2), true);
  }
  OnActivate() {
    var t = this.Entity.GetComponent(178)?.MainAnimInstance;
    if (t && UE.KuroStaticLibrary.IsObjectClassByName(t, new UE.FName("ABP_TuanziNPC_C"))) {
      this.rRe = t;
    }
    var t = this.ActorComp?.Owner;
    if (t?.IsValid() && (this.cz.Set(SCALE_SIZE, SCALE_SIZE, SCALE_SIZE), t.D_SetActorScale3D(this.cz.ToUeVector()), t = t.GetComponentByClass(UE.CharacterMovementComponent.StaticClass()))) {
      t.SetComponentTickEnabled(false);
    }
  }
  OnTick(e) {
    if (this.tu !== 0) {
      var i = ModelManager_1.ModelManager.DangoGlobalModel.Config;
      if (i) {
        if (this.Apc >= i.MoveTotalTime) {
          this.Bpc();
        } else {
          this.Apc += e;
          if (!(this.Apc <= i.MoveStartingTime)) {
            if (this.tu !== 1 && this.Apc >= i.MoveStartingTime + i.MoveTime) {
              if (this.tu === 2) {
                this.ActorComp.SetActorLocationAndRotation(this.Dpc.ToUeVector(), this.Upc.ToUeRotator(), "ChessMove");
                this.tu = 3;
              }
            } else {
              if (this.tu !== 2) {
                this.tu = 2;
                ControllerHolder_1.ControllerHolder.DangoGlobalController.ApplyDangoMoveCamera(this.Dpc);
              }
              var s = MathCommon_1.MathCommon.Clamp((this.Apc - i.MoveStartingTime) / i.MoveTime, 0, 1);
              Vector_1.Vector.Lerp(this.Asr, this.Dpc, s, this.cz);
              var r = this.FDc(s, 2);
              let t = 0;
              t = (this.BDc > 0 ? i.MoveRiseCurve : i.MoveFallCurve).GetFloatValue(s);
              s = Math.abs(this.BDc);
              r = (r * (1 - s) + t * s) * i.MoveBaseHeightOffset;
              this.cz.Z += r;
              s = this.ActorComp.ActorRotationProxy;
              if (!s.Equals2(this.Upc)) {
                this.cie.DeepCopy(this.Upc);
                MathUtils_1.MathUtils.RotatorInterpConstantTo(s, this.cie, e * MathUtils_1.MathUtils.MillisecondToSecond, i.MoveRotateSpeed, this.cie);
              }
              this.ActorComp.SetActorLocationAndRotation(this.cz.ToUeVector(), this.cie.ToUeRotator(), "ChessMove");
            }
          }
        }
      }
    }
  }
  FDc(t, e) {
    return 1 - Math.pow(Math.abs(t * 2 - 1), e);
  }
  GetStackableLocation() {
    var t;
    if (this.ActorComp?.Valid) {
      this.cz.DeepCopy(this.ActorComp.ActorLocationProxy);
      t = (t = ModelManager_1.ModelManager.DangoGlobalModel.Config) ? t.StackInterval : 0;
      this.cz.Z += t * SCALE_SIZE;
      return this.cz;
    }
  }
  OnPreviousMoveStateChange(t, e) {
    if (e) {
      this.JumpHeight = t.JumpHeight;
      this.JumpDistance = t.JumpDistance;
      this.kS1(this.JumpHeight, this.JumpDistance);
    } else {
      this.JumpHeight = 0;
      this.JumpDistance = 0;
      this.OS1();
    }
  }
  Move(t, e, i) {
    var s;
    if (this.ActorComp?.Valid) {
      if (s = ModelManager_1.ModelManager.DangoGlobalModel.Config) {
        this.Asr.DeepCopy(this.ActorComp.ActorLocationProxy);
        this.Dpc.DeepCopy(t);
        this.Dpc.Z += this.ActorComp.HalfHeight * SCALE_SIZE;
        this.Upc.DeepCopy(e);
        this.Ppc = i;
        this.tu = 1;
        this.Apc = 0;
        t = this.Dpc.Z - this.Asr.Z;
        this.BDc = t >= 0 ? MathCommon_1.MathCommon.Clamp(t / s.MaxRiseHeightEdge, 0, 1) : MathCommon_1.MathCommon.Clamp(t / s.MaxFallHeightEdge, -1, 0);
        this.JumpHeight = t;
        this.JumpDistance = Vector_1.Vector.Distance(this.Dpc, this.Asr);
        this.kS1(t, Vector_1.Vector.Distance(this.Dpc, this.Asr));
      }
    } else {
      this.Bpc();
    }
  }
  Teleport(t, e) {
    if (this.ActorComp) {
      this.cz.DeepCopy(t);
      this.cz.Z += this.ActorComp.HalfHeight * SCALE_SIZE;
      this.ActorComp.SetActorLocationAndRotation(this.cz.ToUeVector(), e.ToUeRotator(), "ChessTeleport", false);
    }
  }
  Bpc() {
    this.tu = 0;
    this.Apc = 0;
    this.OS1();
    this.JumpHeight = 0;
    this.JumpDistance = 0;
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.Ppc?.();
    }, STAND_DELAY_TIME);
  }
  IsPerformRecursion(t) {
    return ModelManager_1.ModelManager.DangoGlobalModel.Config?.GetPerformConfig(t)?.ActionTargetType === 1;
  }
  Perform(t, e, i) {
    t = ModelManager_1.ModelManager.DangoGlobalModel.Config?.GetPerformConfig(t);
    if (t && this.ActorComp?.Valid) {
      var s = this.ActorComp.ActorLocationProxy;
      for (const h of t.EffectConfigList) {
        const o = Vector_1.Vector.Create();
        o.DeepCopy(s);
        if (h.PerformLocationType === 1 && e) {
          o.DeepCopy(e);
        }
        o.AdditionEqual(h.LocationOffset);
        let t = undefined;
        if (h.PerformLocationType === 0) {
          t = h.AttachSocket;
        }
        var r = h.DelayTime;
        if (r <= 0) {
          this.NQt(o, h.EffectPath, t);
        } else {
          TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
            this.NQt(o, h.EffectPath, t);
          }, r);
        }
      }
      this.qS1(t.ActionType);
      TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
        this.OS1();
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          i();
        }, STAND_DELAY_TIME);
      }, t.Duration);
    } else {
      i();
    }
  }
  OnPreviousPerformStateChange(t, e, i) {
    if (i) {
      if (i = ModelManager_1.ModelManager.DangoGlobalModel.Config?.GetPerformConfig(e)) {
        this.qS1(i.RecursionActionType);
      }
    } else {
      this.OS1();
    }
  }
  kS1(t, e) {
    if (this.rRe?.IsValid()) {
      this.rRe.StartJumpWithParams(t, e);
    }
  }
  qS1(t) {
    if (this.rRe?.IsValid()) {
      this.rRe.StartActionPerform(t);
    }
  }
  OS1() {
    if (this.rRe?.IsValid()) {
      this.rRe.ReturnStand();
    }
  }
  GetAttachSocketName() {
    return ModelManager_1.ModelManager.DangoGlobalModel.Config?.AttachSocketName;
  }
  NQt(t, e, i) {
    var s = this.ActorComp?.SkeletalMesh;
    if (s?.IsValid()) {
      t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(Rotator_1.Rotator.ZeroRotator, t.ToUeVector(), Vector_1.Vector.OneVectorDouble), e, "[DangoPerformComponent.SpawnEffect]", new EffectContext_1.EffectContext(this.Entity.Id));
      if (!FNameUtil_1.FNameUtil.IsNothing(i)) {
        EffectSystem_1.EffectSystem.GetEffectActor(t)?.K2_AttachToComponent(s, i, 2, 2, 2, false);
      }
    }
  }
};
DangoPerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(287)], DangoPerformComponent);
exports.DangoPerformComponent = DangoPerformComponent; //# sourceMappingURL=DangoPerformComponent.js.map