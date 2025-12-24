"use strict";

var __decorate = this && this.__decorate || function (t, i, s, e) {
  var h;
  var o = arguments.length;
  var r = o < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, s, e);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        r = (o < 3 ? h(r) : o > 3 ? h(i, s, r) : h(i, s)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(i, s, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleNpcAnimationComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants");
const BaseAnimationComponent_1 = require("../../Common/Component/BaseAnimationComponent");
const TURN_SPEED = 0.36;
const TURN_RATIO = 0.04;
let SimpleNpcAnimationComponent = class SimpleNpcAnimationComponent extends BaseAnimationComponent_1.BaseAnimationComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.SlopeStepPeriodicCurve = undefined;
    this.SlopeStepSizeCurve = undefined;
    this.n3r = Vector_1.Vector.Create();
    this.s3r = undefined;
    this.az = Quat_1.Quat.Create();
    this.h3r = Vector_1.Vector.Create();
    this.l3r = Vector_1.Vector.Create();
    this.g3r = 0;
    this.p3r = -1;
  }
  static get Dependencies() {
    return [204, 0];
  }
  x3r() {
    if (this.p3r > 0) {
      this.p3r--;
    } else if (this.p3r === 0) {
      this.ActorComp.EnableActor(this.g3r);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 57, "人物上场隐藏一帧 【隐藏结束】", ["Entity:", this.Entity.Id]);
      }
      this.g3r = undefined;
      this.ActorComp.Actor.Mesh.VisibilityBasedAnimTickOption = this.DefaultVisibilityBasedAnimTickOption;
      this.p3r = -1;
    }
  }
  OnInit() {
    var t;
    super.OnInit();
    this.SlopeStepPeriodicCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(PreloadConstants_1.ANGLE_TO_STEP_FREQUENCY_CURVE_PATH, UE.CurveFloat);
    this.SlopeStepSizeCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(PreloadConstants_1.ANGLE_TO_STEP_LENGTH_CURVE_PATH, UE.CurveFloat);
    return !!this.SlopeStepPeriodicCurve && !!this.SlopeStepSizeCurve && !((t = this.Entity.GetComponent(0).GetModelConfig().注释时的抬升角度) && (this.s3r = Quat_1.Quat.Create(), Quat_1.Quat.FindBetween(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(Math.cos(t * MathUtils_1.MathUtils.DegToRad), 0, Math.sin(t * MathUtils_1.MathUtils.DegToRad)), this.s3r)), 0);
  }
  OnStart() {
    this.ActorComp = this.Entity.CheckGetComponent(204);
    if (this.ActorComp.Actor?.Mesh) {
      this.Actor = this.ActorComp.Actor;
      this.Mesh = this.Actor.Mesh;
      this.GetAnimInstanceFromMesh();
      return !!this.MainAnimInstanceInternal && (this.InitBaseInfo(), this.CheckNpcAnimationAssets(), true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 6, "模型仍未初始化", ["Entity", this.Entity.Id]);
      }
      return false;
    }
  }
  InitBaseInfo() {
    this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy);
    this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy);
    this.IsPlayer = false;
    this.DefaultVisibilityBasedAnimTickOption = 3;
    this.Grn();
  }
  OnActivate() {
    this.StartAnimInstance();
  }
  OnTick(t) {
    super.OnTick(t);
    this.x3r();
    this.b3r(t);
  }
  OnDisable() {
    if (this.p3r >= 0 && (this.ActorComp.EnableActor(this.g3r), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Character", 57, "人物上场隐藏一帧 【组件Disable 隐藏结束】", ["Entity:", this.Entity.Id]);
    }
    this.p3r = -1;
    if (!this.Entity.GetComponent(197)?.AnyIdleLoopMontagePlaying) {
      if (this.MainAnimInstanceInternal?.IsValid()) {
        this.MontageManager.StopMontage({
          Method: 0,
          BlendOutTime: 0
        });
        UE.KuroAnimLibrary.EndAnimNotifyStates(this.MainAnimInstanceInternal);
      }
    }
  }
  b3r(t) {
    if (this.EnableSightDirectInternal) {
      if (this.SightTargetItemId || this.SightTargetPoint) {
        this.F3r(this.n3r);
      } else {
        this.n3r.DeepCopy(this.ActorComp.ActorForwardProxy);
      }
      this.O3r(t);
    }
  }
  O3r(t) {
    this.h3r.FromUeVector(this.n3r);
    this.az.FromUeQuat(this.Mesh.K2_GetComponentQuaternion());
    this.az.Inverse(this.az);
    this.l3r.FromUeVector(this.n3r);
    this.az.RotateVector(this.n3r, this.n3r);
    this.ClampSightDirect(this.n3r, this.n3r);
    if (!this.SightDirectIsEqual || !this.n3r.Equals(this.SightDirect)) {
      BaseAnimationComponent_1.BaseAnimationComponent.LerpDirect2dByMaxAngle(this.SightDirect2, this.n3r, t * TURN_SPEED, this.SightDirect2);
      BaseAnimationComponent_1.BaseAnimationComponent.LerpVector2dByAlpha(this.SightDirect, this.SightDirect2, 1 - Math.pow(TURN_RATIO, t * MathUtils_1.MathUtils.MillisecondToSecond), this.SightDirect);
      this.SightDirectIsEqual = this.SightDirect.Equals(this.SightDirect2);
      if (this.SightDirect.ContainsNaN()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 6, "UpdateHeadRotation Contains Nan.", ["BeforeRotate", this.h3r], ["BeforeClamp", this.l3r], ["TargetDirect", this.n3r], ["SightDirect", this.SightDirect], ["SightDirect2", this.SightDirect2], ["quatInverse", this.az], ["IsPlayer", this.IsPlayer], ["CanResponseInput", false], ["Delta", t]);
        }
        this.SightDirect.Set(0, 1, 0);
        this.SightDirect2.Set(0, 1, 0);
      }
    }
  }
  F3r(t) {
    var i = this.GetSightTargetItem();
    if (!i || ((this.SightTargetPoint ?? i.ActorLocationProxy).Subtraction(this.ActorComp.ActorLocationProxy, this.h3r), (0, RegisterComponent_1.isComponentInstance)(i, 2) ? this.h3r.Z += i.ScaledHalfHeight - this.ActorComp.ScaledHalfHeight : this.h3r.Z -= this.ActorComp.ScaledHalfHeight, this.h3r.IsNearlyZero())) {
      t.DeepCopy(this.ActorComp.ActorForwardProxy);
    } else {
      t.DeepCopy(this.h3r);
      this.j3r(t);
    }
  }
  j3r(t) {
    if (this.s3r) {
      this.ActorComp.ActorQuatProxy.Inverse(this.az);
      this.az.RotateVector(t, t);
      this.s3r.RotateVector(t, t);
      this.ActorComp.ActorQuatProxy.RotateVector(t, t);
    }
  }
  Grn(t = true) {
    var i = Info_1.Info.IsMobilePlatform();
    var s = new UE.AnimUpdateRateParameters();
    var e = this.Mesh.LODInfo.Num();
    if (t) {
      s.bShouldUseDistanceMap = true;
      s.BaseVisibleDistanceThresholds.Empty();
      s.BaseVisibleDistanceThresholds.Add(i ? 50 : 800);
      s.BaseVisibleDistanceThresholds.Add(i ? 200 : 1500);
      s.BaseVisibleDistanceThresholds.Add(i ? 500 : 4000);
      s.BaseVisibleDistanceThresholds.Add(i ? 1500 : 5000);
      s.BaseVisibleDistanceThresholds.Add(i ? 2500 : 8000);
    } else {
      s.bShouldUseLodMap = true;
      s.LODToFrameSkipMap.Empty();
      for (let t = 0; t < e; t++) {
        s.LODToFrameSkipMap.Add(t, t < 2 ? 0 : t - 1);
      }
    }
    s.BaseNonRenderedUpdateRate = 8;
    s.MaxEvalRateForInterpolation = 8;
    var h = (0, puerts_1.$ref)(s);
    var o = this.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    for (let t = 0; t < o.Num(); t++) {
      var r = o.Get(t);
      r.bEnableUpdateRateOptimizations = true;
      r.SetAnimUpdateRateParameters(h);
      r.VisibilityBasedAnimTickOption = this.DefaultVisibilityBasedAnimTickOption;
    }
    (0, puerts_1.$unref)(h);
  }
};
SimpleNpcAnimationComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(205)], SimpleNpcAnimationComponent);
exports.SimpleNpcAnimationComponent = SimpleNpcAnimationComponent; //# sourceMappingURL=SimpleNpcAnimationComponent.js.map