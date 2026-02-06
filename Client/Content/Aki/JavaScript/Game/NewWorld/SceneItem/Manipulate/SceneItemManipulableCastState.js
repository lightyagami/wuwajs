"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableCastState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const GameplayCueController_1 = require("../../Character/Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController");
const SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableCastState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor(t, i, e) {
    super(t);
    this.pYi = undefined;
    this.e0g = undefined;
    this.CastDuration = -0;
    this.CastRotAxis = undefined;
    this.StartLoc = undefined;
    this.StartRot = undefined;
    this.IsUsePath = false;
    this.PathScaleFactor = -0;
    this.CastDirection = undefined;
    this.FinishCallback = undefined;
    this.HitCallback = undefined;
    this.Xnr = Vector_1.Vector.Create();
    this.$nr = Vector_1.Vector.Create();
    this.AfterHit = false;
    this.NeedResetPhysicsMode = true;
    this.NeedNotifyServer = true;
    this.JAc = new Map();
    this.aeu = undefined;
    this.Ynr = () => {
      this.AfterHit = true;
    };
    this.pYi = i;
    this.e0g = e;
  }
  SetFinishCallback(t) {
    this.FinishCallback = t;
  }
  SetHitCallback(t) {
    this.HitCallback = t;
  }
  SetEnterCallback(t) {
    this.EnterCallback = t;
  }
  OnEnter() {
    this.StartCameraShake(this.pYi);
    this.StartGamepadShake(this.e0g);
    this.Timer = 0;
    this.AfterHit = false;
    this.SceneItem.ActorComp.Owner.OnActorHit.Clear();
    if (this.HitCallback) {
      this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.HitCallback);
      this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.Ynr);
    }
    this.SceneItem.NeedRemoveControllerId = true;
    this.SceneItem.OnCastItem();
    this.SceneItem.TryAddTagById(1488763518);
    if (!FNameUtil_1.FNameUtil.IsNothing(this.SceneItem.ManipulateBaseConfig.投掷状态碰撞预设)) {
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(this.SceneItem.ManipulateBaseConfig.投掷状态碰撞预设);
    }
    if (this.SceneItem.ManipulateBaseConfig.投掷状态CueId && this.SceneItem.ManipulateBaseConfig.投掷状态CueId.Num() > 0 && (this.aeu = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(238), this.aeu !== undefined)) {
      for (let t = 0; t < this.SceneItem.ManipulateBaseConfig.投掷状态CueId.Num(); t++) {
        var i = this.SceneItem.ManipulateBaseConfig.投掷状态CueId.GetKey(t);
        var e = this.SceneItem.ManipulateBaseConfig.投掷状态CueId.Get(i);
        if (e !== undefined && !(e <= 0)) {
          const s = this.aeu.AddCue(i);
          if (s !== GameplayCueController_1.INVALID_CUE_HANDLE) {
            if ((e = TimerSystem_1.TimerSystem.Delay(() => {
              this.JAc.delete(s);
              this.aeu?.RemoveCueByHandle(s);
            }, e * TimeUtil_1.TimeUtil.InverseMillisecond)) === undefined) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("SceneItem", 31, "创建TimerHandle失败", ["CueId", i]);
              }
              this.aeu.RemoveCueByHandle(s);
            } else {
              this.JAc.set(s, e);
            }
          }
        }
      }
    }
  }
  OnTick(t) {
    return true;
  }
  OnExit() {
    this.StopCameraShake();
    this.StopGamepadShake(this.e0g);
    this.SceneItem.TryRemoveTagById(1488763518);
    this.NeedResetPhysicsMode = true;
    this.NeedNotifyServer = true;
    if (this.HitCallback) {
      this.SceneItem.ActorComp.Owner.OnActorHit.Clear();
    }
    if (this.JAc && this.JAc.size > 0) {
      for (var [t, i] of this.JAc) {
        TimerSystem_1.TimerSystem.Remove(i);
        this.aeu?.RemoveCueByHandle(t);
      }
      this.JAc.clear();
    }
    this.aeu = undefined;
  }
  StartCast() {
    var t = Vector_1.Vector.Dist(this.SceneItem.ActorComp.ActorLocationProxy, this.SceneItem.TargetActorComponent.ActorLocationProxy);
    let i = 1;
    var e = this.SceneItem.Config.ThrowCfg.MotionConfig;
    if (e.Type === IComponent_1.EThrowMotion.Projectile) {
      i = e.Velocity;
    }
    this.CastDuration = t / i;
    this.CastRotAxis = Vector_1.Vector.Create(UE.KismetMathLibrary.RandomUnitVector());
    this.StartLoc = Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocation);
    this.StartRot = Rotator_1.Rotator.Create(this.SceneItem.ActorComp.ActorRotation);
    this.SceneItem.ActorComp.PhysicsMode = 0;
  }
  CalcDirection() {
    this.SceneItem.CalcCastTargetPoint();
    var t = Vector_1.Vector.Create(this.SceneItem.CastTargetLocation);
    t.SubtractionEqual(this.StartLoc);
    if (this.SceneItem.ManipulateBaseConfig.投掷运动轨迹曲线?.IsValid()) {
      this.IsUsePath = t.Size() > ConfigManager_1.ConfigManager.ManipulateConfig.DontUseLineDistance;
    }
    this.PathScaleFactor = t.Size();
    t.Normalize();
    this.CastDirection = Vector_1.Vector.Create(t);
    var t = Vector_1.Vector.Create();
    var i = Vector_1.Vector.Create(Vector_1.Vector.UpVectorProxy);
    GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(this.SceneItem.ActorComp, i);
    this.CastDirection.CrossProduct(i, t);
    t.CrossProduct(this.CastDirection, this.$nr);
    this.$nr.Normalize();
    this.$nr.CrossProduct(this.CastDirection, this.Xnr);
    this.Xnr.Normalize();
  }
  UpdateRotationAccordingToVelocity() {
    var t;
    if (this.SceneItem.ManipulateBaseConfig.随速度调整朝向 && !this.AfterHit) {
      (t = this.SceneItem.ActorComp.GetPrimitiveComponent().GetComponentVelocity()).Normalize(MathCommon_1.MathCommon.SmallNumber);
      t = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t);
      t = UE.KismetMathLibrary.D_FindLookAtRotation(this.SceneItem.ActorComp.ActorLocation, this.SceneItem.ActorComp.ActorLocation.op_Addition(t));
      this.SceneItem.ActorComp.SetActorRotation(t, "[ManipulableCastState.UpdateRotationAccordingToVelocity]", false);
    }
  }
  UpdateLocation(t) {
    var i;
    var e;
    var s;
    var h;
    var o;
    if (!this.SceneItem.PlayingMatchSequence) {
      i = Vector_1.Vector.Create();
      if (this.IsUsePath) {
        (o = Vector_1.Vector.Create(this.SceneItem.ManipulateBaseConfig.投掷运动轨迹曲线.GetVectorValue(t))).MultiplyEqual(this.PathScaleFactor);
        e = Vector_1.Vector.Create();
        s = Vector_1.Vector.Create();
        h = Vector_1.Vector.Create();
        this.CastDirection.Multiply(o.X, e);
        this.Xnr.Multiply(o.Y, s);
        this.$nr.Multiply(o.Z, h);
        i.AdditionEqual(e).AdditionEqual(s).AdditionEqual(h);
        i.AdditionEqual(this.StartLoc);
      } else {
        o = UE.KismetMathLibrary.Ease(0, 1, t, 6, 3);
        Vector_1.Vector.Lerp(this.StartLoc, this.SceneItem.CastTargetLocation, o, i);
      }
      this.SceneItem.ActorComp.SetActorLocation(i.ToUeVector(), "[ManipulableCastState.UpdateLocation]", this.HitCallback !== undefined);
    }
  }
  HasHitCallback() {
    return this.HitCallback !== undefined;
  }
  CallHitCallback(t, i) {
    if (this.HitCallback) {
      this.HitCallback(t, i);
    }
  }
}
exports.SceneItemManipulableCastState = SceneItemManipulableCastState;
//# sourceMappingURL=SceneItemManipulableCastState.js.map