"use strict";

var CharacterSlideComponent_1;
var __decorate = this && this.__decorate || function (t, i, s, h) {
  var e;
  var r = arguments.length;
  var a = r < 3 ? i : h === null ? h = Object.getOwnPropertyDescriptor(i, s) : h;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, i, s, h);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (e = t[o]) {
        a = (r < 3 ? e(a) : r > 3 ? e(i, s, a) : e(i, s)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(i, s, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSlideComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const SlideById_1 = require("../../../../../../Core/Define/ConfigQuery/SlideById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const Quat_1 = require("../../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const PreloadConstants_1 = require("../../../../../World/Controller/PreloadConstants");
const CharacterNameDefines_1 = require("../../CharacterNameDefines");
const CharacterAttributeTypes_1 = require("../Abilities/CharacterAttributeTypes");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("./CustomMovementDefine");
const LEAVE_SLIDE_TIME = 0.25;
const LEAVE_SLIDE_MIN_HEIGHT = 5;
const PROFILE_KEY = "slide";
const CHANGE_FORWARD_ANGLE_THRESHOLD = 135;
const COMBINE_NORMAL_Z_THRESHOLD = 0.707;
const SLIDE_Z_THRESHOLD = 0.1;
const LEAVE_SKI_TIME = 3;
const SKI_GROUND_MAX_ANGLE = 75;
const SKI_BRAKE_ANGLE_THRESHOLD = 135;
const SKI_MAX_INPUT_ANGLE = 135;
const DEFAULT_SKI_MAX_TURN_ANGLE = 50;
const DEFAULT_SKI_MAX_SPEED = 3500;
const DEFAULT_SKI_MIN_SPEED = 20;
const ENTER_SKI_BUFFER_TIME = 300;
class SkiParams {
  constructor(t) {
    this.InitSpeed = 700;
    this.BaseAccForSpeedUp = 300;
    this.BaseAccForSpeedDown = 300;
    this.BaseTargetSpeed = 1000;
    this.SlopExtraTargetSpeed = 200;
    this.SlopExtraAccel = 150;
    this.TurnSpeed = 50;
    this.IgnoreStepHeight = 20;
    this.JumpMaxHorizontalSpeed = DEFAULT_SKI_MAX_SPEED;
    this.JumpTurnRate = 0.4;
    this.JumpHeightRate = 1;
    this.JumpTimeScale = 1;
    this.TagList = new Array();
    this.InitSpeed = t.初始速度;
    this.BaseAccForSpeedUp = t.基础加速度;
    this.BaseAccForSpeedDown = t.基础减速度;
    this.BaseTargetSpeed = t.基础目标速度;
    this.SlopExtraTargetSpeed = t.斜坡额外目标速度;
    this.SlopExtraAccel = t.斜坡额外加速度;
    this.TurnSpeed = t.转向速度;
    this.IgnoreStepHeight = t.忽视阶梯高度;
    this.JumpTurnRate = t.跳跃转向速度系数;
    this.JumpHeightRate = t.跳跃高度缩放系数;
    this.JumpTimeScale = t.跳跃滞空缩放系数;
    this.JumpMaxHorizontalSpeed = t.跳跃下落最大平面速度;
    var i = t.期间Tag.GameplayTags;
    var s = i.Num();
    for (let t = 0; t < s; t++) {
      this.TagList.push(i.Get(t).TagId);
    }
  }
}
let CharacterSlideComponent = CharacterSlideComponent_1 = class CharacterSlideComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Gce = undefined;
    this.oRe = undefined;
    this.osn = undefined;
    this.I5r = undefined;
    this.cBe = undefined;
    this.Lie = undefined;
    this.Nce = undefined;
    this.Lz = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.fHo = Vector_1.Vector.Create();
    this.pHo = Vector_1.Vector.Create();
    this.vHo = Vector_1.Vector.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.az = Quat_1.Quat.Create();
    this.KJ = Quat_1.Quat.Create();
    this.lJr = Vector_1.Vector.Create();
    this._Jr = -0;
    this.SlideForward = Vector_1.Vector.Create();
    this.GroundNormal = Vector_1.Vector.Create();
    this.Cer = new Array();
    this.uJr = new Set();
    this.mJr = 0;
    this.dJr = 0;
    this.SlideSwitchThisFrame = false;
    this.StandMode = false;
    this.LastAngleOffset = 0;
    this.CJr = undefined;
    this.gJr = undefined;
    this.fJr = 0;
    this.pJr = undefined;
    this.N8a = false;
    this.F8a = false;
    this.MJr = undefined;
    this.exn = undefined;
    this.EJr = Vector_1.Vector.Create();
    this.r2n = Vector_1.Vector.Create();
    this.o2n = Vector_1.Vector.Create();
    this.Ecd = false;
    this.hUe = (t, i) => {
      if (i !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide) {
        this.Gce.CharacterMovement.FallingLateralFriction = 0;
      }
      if (i === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) {
        this.o2n.DeepCopy(this.Hte.ActorForwardProxy);
        this.Gce.ResetTurnRate();
        if (!this.r2n.Equality(Vector_1.Vector.ZeroVectorProxy)) {
          this.Lz.DeepCopy(this.r2n);
          this.EJr.Multiply(this.Lz.DotProduct(this.EJr), this.Tz);
          this.Lz.Subtraction(this.Tz, this.Tz);
          i = Math.min(this.Tz.Size(), DEFAULT_SKI_MAX_SPEED);
          this.Lz.DeepCopy(this.Hte.ActorForwardProxy);
          this.EJr.Multiply(this.Lz.DotProduct(this.EJr), this.fHo);
          this.Lz.Subtraction(this.fHo, this.fHo);
          if (!this.fHo.Normalize()) {
            this.fHo.DeepCopy(this.Hte.ActorForwardProxy);
          }
          this.fHo.MultiplyEqual(i);
          this.Gce.SetForceSpeed(this.fHo);
          this.r2n.Reset();
        }
      }
    };
    this.SJr = false;
    this.yJr = t => {
      if (this.N8a) {
        this.Hte.ActorForwardProxy.Multiply(this.pJr.InitSpeed, this.Lz);
        this.Gce.SetForceSpeed(this.Lz);
        this.N8a = false;
      }
      this.n2n(t, this.o2n);
      this.s2n(this.Lz);
      var i = UE.KuroMovementBPLibrary.KuroSki(t, this.Gce.CharacterMovement, this.GroundNormal.ToUeVectorOld(), this.o2n.ToUeVectorOld(), this.Lz.ToUeVectorOld(), this.pJr.IgnoreStepHeight, undefined);
      if (i && (this.IJr() ? (this.Hte?.Actor.KuroSetMovementMode({
        Mode: 1,
        Context: "[CharacterSlideComponent.OnMoveSki] Walking"
      }), this.I5r.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run)) : this.Hte?.Actor.KuroSetMovementMode({
        Mode: 3,
        Context: "[CharacterSlideComponent.OnMoveSki] Falling"
      }), this.SJr = true, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Movement", 50, "滑雪中断", ["Type", i]);
      }
      if (!this.V8a(t)) {
        this._Jr -= t;
        if (this._Jr < 0) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Movement", 50, "检测到异常，退出滑雪模式", ["Angle", Math.acos(Vector_1.Vector.DotProduct(this.GroundNormal, this.Hte.MoveComp.GravityUp))], ["MoveDelta", Vector_1.Vector.Dist(this.Hte.LastActorLocation, this.Lz)]);
          }
          this.ExitSkiMode();
        }
      }
    };
    this.TJr = s => {
      var h = CharacterSlideComponent_1.SlideConfig;
      this.fHo.DeepCopy(this.Hte.InputDirectProxy);
      var e = this.fHo;
      let t = false;
      if (e.Normalize()) {
        t = h.Ski;
        this.Lz.DeepCopy(this.SlideForward);
        this.Gce.GravityDirect.CrossProduct(this.Lz, this.Tz);
        this.Tz.CrossProduct(this.Lz, this.lJr);
        if (this.lJr.Normalize()) {
          let t = true;
          if (h.Ski && (this.Lz.DeepCopy(this.SlideForward), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.Lz), this.Lz.Normalize(), a = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityAbsForActor(this.Hte, this.Lz, e), t = a < SKI_BRAKE_ANGLE_THRESHOLD) && (this.Lz.DeepCopy(this.Hte.ActorVelocityProxy), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.Lz), this.Lz.Normalize() || this.lJr.UnaryNegation(this.Lz), a = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(this.Hte, this.Lz, this.Hte.InputDirectProxy), Math.abs(a) > SKI_MAX_INPUT_ANGLE)) {
            this.Gce.GravityDirect.CrossProduct(this.Lz, this.Tz);
            a = Math.sign(a) * SKI_MAX_INPUT_ANGLE * MathUtils_1.MathUtils.DegToRad;
            this.Lz.MultiplyEqual(Math.cos(a));
            this.Tz.MultiplyEqual(Math.sin(a));
            this.Lz.Addition(this.Tz, e);
          }
          var r;
          var a = e.DotProduct(this.lJr);
          let i = 0;
          if (a > 0) {
            i = a * h.SlideAccelUp;
            r = this.Hte.ActorVelocityProxy.DotProduct(this.lJr);
            if (h.Ski) {
              i *= MathUtils_1.MathUtils.RangeClamp(r, -h.SkiHorizontalInputSpeedThreshold.Max, -h.SkiHorizontalInputSpeedThreshold.Min, 1, 0);
            } else if (i * h.SlideAccel * s > r) {
              i = 0;
            }
          } else {
            i = a * h.SlideAccelDown;
          }
          this.lJr.Multiply(i, this.Lz);
          if (t) {
            this.Tz.MultiplyEqual(this.Tz.DotProduct(e) / this.Tz.SizeSquared());
            this.Lz.AdditionEqual(this.Tz);
          }
          this.Lz.MultiplyEqual(h.SlideAccel);
        } else {
          e.Multiply(h.SlideAccel, this.Lz);
        }
      } else {
        this.Lz.Reset();
      }
      if (this.Lz.ContainsNaN() && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "Slide speed has NaN", ["velocity", this.Lz]);
      }
      let i = 0;
      let o = 0;
      let _ = 0;
      let n = 0;
      n = this.gJr ? (i = 0, o = 0, _ = this.gJr.LimitSpeed) : (i = this.dJr, o = h.SlideFriction, t ? (_ = h.SkiMaxSpHor, h.SkiMaxSpVer) : (_ = h.MaxSlideHorizontalSeed, -1));
      if (this.Gce.CharacterMovement.KuroSlide(s, i, o, this._Jr === LEAVE_SLIDE_TIME ? this.Lz.ToUeVectorOld() : Vector_1.Vector.ZeroVector, _, this.GroundNormal.ToUeVectorOld(), n, CharacterSlideComponent_1.SpeedReduceCurve)) {
        this._Jr = LEAVE_SLIDE_TIME;
      } else if (this.Gce.CharacterMovement.Kuro_GetBlockActorWhenMove()) {
        this.Hte?.Actor.KuroSetMovementMode({
          Mode: 1,
          Context: "[CharacterSlideComponent.OnMoveSlide] Walking"
        });
        this.SJr = true;
      } else {
        this._Jr -= s;
        if (this._Jr < 0 && this.LJr()) {
          this.Hte?.Actor.KuroSetMovementMode({
            Mode: 3,
            Context: "[CharacterSlideComponent.OnMoveSlide] Falling"
          });
          this.SJr = true;
        }
      }
    };
    this.DJr = (t, i) => {
      if (!i && !(i = t.GetComponent(35), this.I5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide && this.I5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki && i.I5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide && i.I5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki)) {
        this._Jr = i._Jr;
        this.SlideForward.DeepCopy(i.SlideForward);
        this.mJr = i.mJr;
        this.dJr = i.dJr;
        this.SlideSwitchThisFrame = i.SlideSwitchThisFrame;
        this.StandMode = i.StandMode;
        this.LastAngleOffset = i.LastAngleOffset;
        this.pJr = i.pJr;
        this.gJr = i.gJr;
        this.fJr = i.fJr;
      }
    };
    this.txn = (t, i) => {
      if (!i) {
        if (this.CJr) {
          this.Gce.StopAddMove(this.CJr);
        }
        this.Gce.ResetTurnRate();
        this.Lie.RemoveTagAddOrRemoveListener(378770267, this.txn);
      }
    };
  }
  static get SlideConfig() {
    if (!this.SlideConfigInternal) {
      this.SetSlideConfig(0);
    }
    return this.SlideConfigInternal;
  }
  static SetSlideConfig(t) {
    if (this.SlideConfigInternal?.Id !== t.toString()) {
      this.SlideConfigInternal = SlideById_1.configSlideById.GetConfig(t.toString());
      var i;
      var s;
      var h = new Array();
      for ([i, s] of this.SlideConfigInternal.FallingLateralFrictions) {
        var e = Math.cos(i * MathUtils_1.MathUtils.DegToRad);
        var e = [e * e * e, e * e, e, 1, s];
        h.push(e);
      }
      for (let s = h.length - 1; s >= 0; --s) {
        for (let i = 0; i < s; ++i) {
          var r = h[i][s] / h[s][s];
          for (let t = 0; t < h[s].length; ++t) {
            h[i][t] -= h[s][t] * r;
          }
        }
      }
      for (let s = 0; s < h.length; ++s) {
        for (let i = s + 1; i < h.length; ++i) {
          var a = h[i][s] / h[s][s];
          for (let t = 0; t < h[s].length; ++t) {
            h[i][t] -= h[s][t] * a;
          }
        }
        this.SlideFallingCoefficientArray[s] = h[s][4] / h[s][s];
      }
      if (this.SlideConfigInternal.SpeedReduceCurve) {
        ResourceSystem_1.ResourceSystem.LoadAsync(this.SlideConfigInternal.SpeedReduceCurve, UE.CurveFloat, t => {
          this.SpeedReduceCurve = t;
        });
      } else {
        this.SpeedReduceCurve = undefined;
      }
    }
  }
  static GetSlideFallingFriction(t) {
    if (!this.SlideConfigInternal) {
      this.SetSlideConfig(0);
    }
    let i = 0;
    for (const s of this.SlideFallingCoefficientArray) {
      i = i * t + s;
    }
    return i;
  }
  static get JumpAddMoveCurve() {
    this.RJr ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(PreloadConstants_1.SLIDE_JUMP_ADD_MOVE_CURVE, UE.CurveFloat);
    return this.RJr;
  }
  static get Dependencies() {
    return [3, 179, 176];
  }
  s2n(t) {
    let i = this.pJr.BaseAccForSpeedUp;
    let s = this.pJr.BaseTargetSpeed;
    var h = this.Hte.MoveComp.GravityUp;
    var h = Math.acos(MathUtils_1.MathUtils.Clamp(Vector_1.Vector.DotProduct(this.SlideForward, h), -1, 1)) * MathUtils_1.MathUtils.RadToDeg / 90;
    var e = this.pJr.SlopExtraAccel * h;
    var h = this.pJr.SlopExtraTargetSpeed * h;
    var r = Math.sign(Vector_1.Vector.DotProduct(this.Hte.ActorForwardProxy, this.SlideForward));
    i += r * e;
    s += r * h;
    if (this.gJr) {
      i += this.gJr.Acceleration;
      s += this.gJr.LimitSpeed;
    }
    s = Math.min(s, DEFAULT_SKI_MAX_SPEED);
    t.Set(i, this.pJr.BaseAccForSpeedDown, s);
  }
  n2n(t, i) {
    var s = this.Lz;
    var h = this.Tz;
    var e = this.fHo;
    var r = this.pHo;
    var a = this.pJr.TurnSpeed;
    let o = -DEFAULT_SKI_MAX_TURN_ANGLE;
    let _ = DEFAULT_SKI_MAX_TURN_ANGLE;
    var n = this.Entity.GetComponent(109);
    s.DeepCopy(this.Hte.ActorForwardProxy);
    if (n?.Active) {
      o = n.MinTurnAngle;
      _ = n.MaxTurnAngle;
      s.DeepCopy(n.SplineDirection);
    }
    var n = Vector_1.Vector.DotProduct(s, this.SlideForward);
    this.SlideForward.Multiply(n, this.vHo);
    s.SubtractionEqual(this.vHo);
    s.Normalize();
    this.SlideForward.CrossProduct(s, e);
    if (!e.Normalize()) {
      e.DeepCopy(this.Hte.ActorRightProxy);
    }
    h.DeepCopy(this.Hte.InputDirectProxy);
    if (h.Normalize()) {
      e.Multiply(e.DotProduct(h), h);
    } else {
      h.Reset();
    }
    if (h.ContainsNaN() && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 50, "滑雪输入中有NaN", ["Input", h]);
    }
    r.DeepCopy(this.Hte.ActorVelocityProxy);
    if (!r.Normalize()) {
      r.DeepCopy(this.Hte.ActorForwardProxy);
    }
    n = Vector_1.Vector.DotProduct(r, this.SlideForward);
    this.SlideForward.Multiply(n, this.vHo);
    r.SubtractionEqual(this.vHo);
    r.Normalize();
    var l = Math.acos(MathUtils_1.MathUtils.Clamp(r.DotProduct(s), -1, 1)) * MathUtils_1.MathUtils.RadToDeg;
    var r = this.a2n(Math.sign(r.DotProduct(e)) * l);
    var l = h.DotProduct(e) * a * t;
    var h = MathUtils_1.MathUtils.Clamp(r + l, o, _);
    this.vHo.DeepCopy(this.SlideForward);
    this.vHo.MultiplyEqual(Math.sin(h * MathUtils_1.MathUtils.DegToRad * 0.5));
    this.az.Set(this.vHo.X, this.vHo.Y, this.vHo.Z, Math.cos(h * MathUtils_1.MathUtils.DegToRad * 0.5));
    this.az.RotateVector(s, i);
    n = Vector_1.Vector.DotProduct(i, this.SlideForward);
    this.SlideForward.Multiply(n, this.vHo);
    i.SubtractionEqual(this.vHo);
    i.Normalize();
  }
  a2n(t) {
    let i = t;
    while (i > 180) {
      i -= 360;
    }
    while (i < -180) {
      i += 360;
    }
    return i;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.Gce = this.Entity.GetComponent(179);
    this.oRe = this.Entity.GetComponent(178);
    this.osn = this.Entity.GetComponent(174);
    this.Nce = this.Entity.GetComponent(62);
    this.I5r = this.Entity.GetComponent(176);
    this.cBe = this.Entity.GetComponent(40);
    this.Lie = this.Entity.GetComponent(206);
    this.Lz.Reset();
    this.lJr.Reset();
    if (this.Lie?.Valid) {
      for (const i of CharacterSlideComponent_1.I2r) {
        this.Cer.push(this.Lie.ListenForTagAnyCountChanged(i, t => {
          this.Sri(i, t);
        }));
        if (this.Lie.HasTag(i)) {
          this.uJr.add(i);
        }
      }
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.hUe);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveSlide, this.TJr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveSki, this.yJr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.DJr);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.hUe);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveSlide, this.TJr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveSki, this.yJr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.DJr);
    for (const t of this.Cer) {
      t.EndTask();
    }
    return !(this.Cer.length = 0);
  }
  OnTick(t) {
    if (!!this.Hte?.IsMoveAutonomousProxy && this.I5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Glide && this.I5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Soar && !this.Gce.IsJump) {
      if (this.I5r.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Ride) {
        if (this.cBe?.CurrentSkill) {
          if (this.I5r?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Slide) {
            this.Hte?.Actor.KuroSetMovementMode({
              Mode: 3,
              Context: "[CharacterSlideComponent.OnTick]"
            });
          }
        } else if (!this.Nce.IsInAutomaticFlightMode()) {
          if (this.F8a) {
            this.TickSkiMode(t);
          } else {
            this.TickSlideMode(t);
          }
        }
      }
    }
  }
  UJr(t, i) {
    this.SlideSwitchThisFrame = false;
    if (this.pJr) {
      this.SlideSwitchThisFrame = !t && !this.StandMode;
      this.StandMode = true;
    } else if (t) {
      this.SlideSwitchThisFrame = false;
      this.StandMode = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.SlideForward) > Math.cos((i.SlideModeSwitchRange.Min + i.SlideModeSwitchRange.Max) / 2 * MathUtils_1.MathUtils.DegToRad);
    } else if (this.StandMode) {
      if (GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.SlideForward) < Math.cos(i.SlideModeSwitchRange.Max * MathUtils_1.MathUtils.DegToRad)) {
        this.StandMode = false;
        this.SlideSwitchThisFrame = true;
      }
    } else if (GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.SlideForward) > Math.cos(i.SlideModeSwitchRange.Min * MathUtils_1.MathUtils.DegToRad)) {
      this.StandMode = true;
      this.SlideSwitchThisFrame = true;
    }
  }
  AJr(t) {
    var i;
    var s;
    if (this.pJr) {
      this.Lz.FromUeVector(this.Gce.CharacterMovement.Velocity);
      this.Hte.SetInputFacing(this.Lz, true);
      this.Hte.SetOverrideTurnSpeed(this.pJr.TurnSpeed);
    } else {
      if (this.Lie.HasTag(-91611865) || this.StandMode) {
        this.Hte.SetInputFacing(this.SlideForward, true);
        this.LastAngleOffset = 0;
      } else {
        if (t || this.Hte.InputDirectProxy.IsNearlyZero()) {
          this.Lz.DeepCopy(this.Hte.ActorForwardProxy);
        } else {
          this.Lz.DeepCopy(this.Hte.InputDirectProxy);
        }
        GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(this.Hte, this.KJ);
        this.KJ.Inverse(this.az);
        this.az.RotateVector(this.SlideForward, this.Tz);
        this.az.RotateVector(this.Lz, this.fHo);
        i = MathUtils_1.MathUtils.GetAngleByVector2D(this.Tz);
        s = MathUtils_1.MathUtils.GetAngleByVector2D(this.fHo);
        s = MathUtils_1.MathUtils.WrapAngle(s - i);
        if (t || Math.abs(MathUtils_1.MathUtils.WrapAngle(this.LastAngleOffset - s)) > CHANGE_FORWARD_ANGLE_THRESHOLD) {
          this.LastAngleOffset = Math.round(s / 180) * 180;
        }
        this.Gue.Set(0, i + this.LastAngleOffset, 0);
        this.KJ.Multiply(this.Gue.Quaternion(), this.az);
        this.Hte.SetInputRotator(this.az.Rotator());
      }
      this.Hte.SetOverrideTurnSpeed(CharacterSlideComponent_1.SlideConfig.TurnSpeed);
    }
  }
  Sri(t, i) {
    if (i === 0) {
      this.uJr.delete(t);
    } else {
      this.uJr.add(t);
    }
  }
  LJr() {
    var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    t.WorldContextObject = this.Hte.Actor;
    t.Radius = this.Hte.ScaledRadius;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.Hte.ActorLocationProxy);
    this.Lz.DeepCopy(this.Hte.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Lz, -(this.Hte.ScaledHalfHeight - this.Hte.Radius + LEAVE_SLIDE_MIN_HEIGHT));
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.Lz);
    var t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, t, PROFILE_KEY, PROFILE_KEY);
    return !t;
  }
  IJr() {
    var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    t.WorldContextObject = this.Hte.Actor;
    t.Radius = this.Hte.ScaledRadius;
    this.Lz.DeepCopy(this.Hte.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Lz, -(this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius));
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.Lz);
    this.Tz.DeepCopy(this.Hte.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Tz, -this.Hte.ScaledHalfHeight);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.Tz);
    t.ActorsToIgnore.Empty();
    for (const i of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      t.ActorsToIgnore.Add(i);
    }
    if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, t, PROFILE_KEY, PROFILE_KEY)) {
      return t.HitResult;
    } else {
      return undefined;
    }
  }
  PJr() {
    var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    t.WorldContextObject = this.Hte.Actor;
    t.Radius = this.Hte.ScaledRadius;
    this.Lz.DeepCopy(this.Hte.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Lz, -(this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius));
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.Lz);
    this.Hte.MoveComp.GravityUp.CrossProduct(this.SlideForward, this.fHo);
    this.fHo.CrossProduct(this.SlideForward, this.fHo);
    this.fHo.Normalize();
    this.fHo.MultiplyEqual(100);
    this.Lz.Addition(this.fHo, this.Tz);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.Tz);
    t.ActorsToIgnore.Empty();
    for (const i of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      t.ActorsToIgnore.Add(i);
    }
    return !TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, t, PROFILE_KEY, PROFILE_KEY) || (TraceElementCommon_1.TraceElementCommon.GetImpactNormal(t.HitResult, 0, this.fHo), this.fHo.AdditionEqual(this.SlideForward), !!this.fHo.Normalize() && GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.fHo) < COMBINE_NORMAL_Z_THRESHOLD);
  }
  v4u() {
    var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    t.WorldContextObject = this.Hte.Actor;
    t.Radius = this.Hte.ScaledRadius;
    this.Lz.DeepCopy(this.Hte.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Lz, -(this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius));
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.Lz);
    this.Hte.MoveComp.GravityUp.CrossProduct(this.SlideForward, this.fHo);
    this.fHo.CrossProduct(this.SlideForward, this.fHo);
    this.fHo.Normalize();
    this.fHo.MultiplyEqual(100);
    this.Lz.Addition(this.fHo, this.Tz);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.Tz);
    t.ActorsToIgnore.Empty();
    for (const i of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      t.ActorsToIgnore.Add(i);
    }
    return !TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, t, PROFILE_KEY, PROFILE_KEY) || (TraceElementCommon_1.TraceElementCommon.GetImpactNormal(t.HitResult, 0, this.fHo), this.fHo.AdditionEqual(this.SlideForward), !!this.fHo.Normalize());
  }
  OnJump() {
    if (this.Hte) {
      this.r2n.DeepCopy(this.Hte.ActorVelocityProxy);
      this.Lz.DeepCopy(this.Hte.ActorVelocityProxy);
      this.EJr.Multiply(this.Lz.DotProduct(this.EJr), this.Tz);
      this.Lz.Subtraction(this.Tz, this.fHo);
      this.CJr = this.Gce?.SetAddMoveWorld(this.fHo.ToUeVector(), 2, undefined, this.CJr, undefined, 2);
      this.Gce.SetTurnRate(this.pJr.JumpTurnRate);
      this.Lie.AddTagAddOrRemoveListener(378770267, this.txn);
    }
  }
  SetSkiAccel(t) {
    if (this.I5r?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground || this.I5r?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) {
      this.fJr = t.Duration;
      this.gJr = t;
      if (this.gJr.InstantSpeed) {
        t = this.Hte.ActorVelocityProxy.Size();
        t = Math.min(t + this.gJr.InstantSpeed, DEFAULT_SKI_MAX_SPEED);
        this.Lz.DeepCopy(this.Hte.ActorVelocityProxy);
        if (!this.Lz.Normalize()) {
          this.Lz.DeepCopy(this.Hte.ActorForwardProxy);
        }
        this.Lz.MultiplyEqual(t);
        this.Gce.SetForceSpeed(this.Lz);
      }
      this.Lie.AddTag(-1940399338);
    }
  }
  TickSlideMode(t) {
    if (this.SJr) {
      this.SJr = false;
    } else if (this.uJr.size > 0 || this.oRe?.Valid && this.oRe.HasKuroRootMotion) {
      if (this.I5r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Slide) {
        this.Hte?.Actor.KuroSetMovementMode({
          Mode: 3,
          Context: "[CharacterSlideComponent.TickSlideMode]"
        });
      }
    } else {
      let t = false;
      var i = this.Gce.CharacterMovement.Kuro_GetBlockDirectWhenMove();
      this.Lz.FromUeVector(i);
      var s = this.Gce.CharacterMovement.Kuro_GetBlockActorWhenMove();
      var h = CharacterSlideComponent_1.SlideConfig;
      this.GroundNormal.Reset();
      this.fHo.FromUeVector(this.Gce.CharacterMovement.Velocity);
      if (GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Lz) > SLIDE_Z_THRESHOLD && (this.pJr ?? GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.fHo) < -MathUtils_1.MathUtils.KindaSmallNumber) && s && !s.ActorHasTag(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE)) {
        this.SlideForward.FromUeVector(i);
        this.GroundNormal.DeepCopy(this.SlideForward);
        if (this.I5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide && !this.PJr()) {
          return;
        }
        if (this.I5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide) {
          this.Hte?.Actor.KuroSetMovementMode({
            Mode: 6,
            CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE,
            Context: "[CharacterSlideComponent.TickSlideMode]"
          });
          this.I5r.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Slide);
          t = true;
          this.mJr = 0;
          this._Jr = LEAVE_SLIDE_TIME;
        }
      } else if (this.I5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide) {
        return;
      }
      s = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.SlideForward);
      if (Math.abs(this.mJr - s) > MathUtils_1.MathUtils.KindaSmallNumber) {
        this.mJr = s;
        this.dJr = CharacterSlideComponent_1.GetSlideFallingFriction(this.mJr);
      }
      this.AJr(t);
      this.UJr(t, h);
    }
  }
  TickSkiMode(i) {
    if (this.fJr > 0 && (s = this.Hte.Owner.CustomTimeDilation, this.fJr -= i * MathUtils_1.MathUtils.MillisecondToSecond * s, this.fJr < 0)) {
      this.fJr = 0;
      this.gJr = undefined;
      this.Lie.RemoveTag(-1940399338);
    }
    if (this.SJr) {
      this.SJr = false;
    } else {
      i = this.Entity.GetComponent(79);
      if ((!i?.IsActive || i.WalkOnWaterStage === 2) && (this.I5r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground || this.I5r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ski)) {
        if (this.uJr.size > 0 || this.oRe?.Valid && this.oRe.HasKuroRootMotion) {
          if (this.I5r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) {
            this.Hte?.Actor.KuroSetMovementMode({
              Mode: 1,
              Context: "[CharacterSlideComponent.TickSkiMode]"
            });
            this.I5r.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
          }
        } else {
          this.GroundNormal.Reset();
          this.fHo.FromUeVector(this.Gce.CharacterMovement.Velocity);
          let t = false;
          var s = this.IJr();
          if (s) {
            this.exn = s.Components.Get(0);
            this.MJr = this.exn?.GetOwner();
            TraceElementCommon_1.TraceElementCommon.GetImpactNormal(s, 0, this.EJr);
          } else {
            this.exn = undefined;
            this.MJr = undefined;
            this.EJr.Reset();
          }
          if (this.ixn()) {
            this.SlideForward.DeepCopy(this.EJr);
            this.GroundNormal.DeepCopy(this.SlideForward);
            if (this.Ecd) {
              UE.KuroStaticLibrary.SetBaseAndSaveBaseLocation(this.Hte.Actor.CharacterMovement, this.exn);
            }
            if (this.I5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) {
              if (!this.v4u()) {
                return;
              }
              i = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
              s = this.Entity.GetComponent(178);
              TraceElementCommon_1.TraceElementCommon.GetHitLocation(i.HitResult, 0, this.Lz);
              s?.SetLocationAndRotatorWithModelBuffer(this.Lz.ToUeVector(), this.Hte.ActorRotation, ENTER_SKI_BUFFER_TIME, "CharacterSlideComp.EnterSki");
              this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
                Mode: 6,
                CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI,
                Context: "[CharacterSlideComponent.TickSkiMode]"
              });
              this.I5r.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki);
              t = true;
              this.mJr = 0;
            }
          } else if (this.I5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) {
            return;
          }
          i = CharacterSlideComponent_1.SlideConfig;
          this.AJr(t);
          this.UJr(t, i);
        }
      }
    }
  }
  EnterSkiMode(t, i = false) {
    if (!this.pJr) {
      if (this.TKa(t)) {
        this.LKa();
        this.Lie.AddTag(378770267);
        this.Lie.AddTag(-1697149502);
        this.F8a = true;
        this.N8a = true;
        this.Ecd = i;
        this._Jr = LEAVE_SKI_TIME;
        this.r2n.Reset();
        this.AKa();
      }
    }
  }
  ExitSkiMode(t = true) {
    if (this.pJr && (this.DKa(), this.Lie.RemoveTag(378770267), this.Lie.RemoveTag(-1697149502), this.pJr = undefined, this.N8a = false, this.Ecd = false, this.F8a = false, this.r2n.Reset(), this.I5r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ski && (this.IJr() ? (this.Hte?.Actor.KuroSetMovementMode({
      Mode: 1,
      Context: "[CharacterSlideComponent.ExitSkiMode] Walking"
    }), this.I5r.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run)) : this.Hte?.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterSlideComponent.ExitSkiMode] Falling"
    })), t)) {
      this.RKa();
    }
  }
  ixn() {
    return !!this.exn && (!this.MJr || !this.MJr.ActorHasTag(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE)) && !this.EJr.ContainsNaN() && GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.EJr) !== 0 && !(Math.acos(Vector_1.Vector.DotProduct(this.EJr, this.Hte.MoveComp.GravityUp)) * MathUtils_1.MathUtils.RadToDeg >= SKI_GROUND_MAX_ANGLE);
  }
  V8a(t) {
    return !(Math.acos(Vector_1.Vector.DotProduct(this.GroundNormal, this.Hte.MoveComp.GravityUp)) * MathUtils_1.MathUtils.RadToDeg >= SKI_GROUND_MAX_ANGLE) && !(this.Lz.FromUeVector(this.Hte.Actor.D_K2_GetActorLocation()), Vector_1.Vector.Dist(this.Hte.LastActorLocation, this.Lz) < t * DEFAULT_SKI_MIN_SPEED) && !(this._Jr = LEAVE_SKI_TIME, 0);
  }
  AKa() {
    var t = Protocol_1.Aki.Protocol.Lm_.create();
    t.H8a = Protocol_1.Aki.Protocol.PR_.Proto_None;
    t.j8a = Protocol_1.Aki.Protocol.PR_.Proto_Ski;
    Net_1.Net.Call(29347, t, t => {
      if (t && t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Movement", 50, "请求切换滑雪模式失败");
        }
        this.ExitSkiMode(false);
      }
    });
  }
  RKa() {
    var t = Protocol_1.Aki.Protocol.Lm_.create();
    t.H8a = Protocol_1.Aki.Protocol.PR_.Proto_Ski;
    t.j8a = Protocol_1.Aki.Protocol.PR_.Proto_None;
    Net_1.Net.Call(29347, t, () => {});
  }
  LKa() {
    if (this.pJr) {
      this.UKa();
      for (const t of this.pJr.TagList) {
        this.Lie?.AddTag(t);
      }
    }
  }
  DKa() {
    this.xKa();
    for (const t of this.pJr.TagList) {
      this.Lie?.RemoveTag(t);
    }
  }
  UKa() {
    this.Lie.AddTag(-451106150);
    this.Gce.SetFallingHorizontalMaxSpeed(this.pJr.JumpMaxHorizontalSpeed);
    var t = this.oRe?.MainAnimInstance;
    if (UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE)) {
      t.设置跳跃速率(this.pJr.JumpTimeScale);
    }
    this.osn.SetBaseValue(Protocol_1.Aki.Protocol.Vks.Proto_Jump, CharacterAttributeTypes_1.PER_TEN_THOUSAND * this.pJr.JumpHeightRate);
  }
  xKa() {
    this.Lie.RemoveTag(-451106150);
    this.Gce.ClearFallingHorizontalMaxSpeed();
    var t = this.oRe?.MainAnimInstance;
    if (UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE)) {
      t.设置跳跃速率(1);
    }
    this.osn.SetBaseValue(Protocol_1.Aki.Protocol.Vks.Proto_Jump, +CharacterAttributeTypes_1.PER_TEN_THOUSAND);
  }
  TKa(t) {
    var t = t.SkiConfig;
    var i = ResourceSystem_1.ResourceSystem.Load(t, UE.BP_SkiConfig_C);
    if (i?.IsValid()) {
      this.pJr = new SkiParams(i);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 50, "获取滑雪参数DA失败", ["DaPath", t], ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
      }
      return false;
    }
  }
};
CharacterSlideComponent.SlideConfigInternal = undefined;
CharacterSlideComponent.SlideFallingCoefficientArray = [0, 0, 0, 0];
CharacterSlideComponent.SpeedReduceCurve = undefined;
CharacterSlideComponent.RJr = undefined;
CharacterSlideComponent.I2r = [-1503953470, 1008164187, -752177221];
CharacterSlideComponent = CharacterSlideComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(35)], CharacterSlideComponent);
exports.CharacterSlideComponent = CharacterSlideComponent; //# sourceMappingURL=CharacterSlideComponent.js.map