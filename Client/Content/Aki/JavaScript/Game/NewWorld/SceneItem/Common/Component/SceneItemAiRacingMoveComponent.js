"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var o = arguments.length;
  var r = o < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, e, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
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
exports.SceneItemAiRacingMoveComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SceneItemMoveComponent_1 = require("./SceneItemMoveComponent");
const AI_RACING_DEBUG_KEY = "AI_RACING_DEBUG";
class AiRacingPerceptionData {
  constructor() {
    this.PlayerLocation = Vector_1.Vector.Create();
    this.SelfLocation = Vector_1.Vector.Create();
    this.DistanceBetween = 0;
    this.SelfSplineMoveData = undefined;
    this.PlayerVelocity = Vector_1.Vector.Create();
    this.PlayerAbsSpeed = 0;
    this.SelfEstimationVelocity = Vector_1.Vector.Create();
    this.SelfAbsSpeed = 0;
    this.DeltaAbsSpeed = 0;
    this.SelfKeepMovingTime = 0;
  }
}
let SceneItemAiRacingMoveComponent = class SceneItemAiRacingMoveComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.dK_ = undefined;
    this.zie = undefined;
    this.Hnr = undefined;
    this.mK_ = false;
    this.Rne = undefined;
    this.Gce = undefined;
    this.fK_ = undefined;
    this.gK_ = undefined;
    this.CK_ = undefined;
    this.pK_ = undefined;
  }
  OnStart() {
    this.Gce = this.Entity.GetComponent(129);
    return true;
  }
  OnActivate() {
    this.ToggleTick(this.mK_, "OnActivate时检查EnableAiRace并开关Tick");
  }
  OnTick(t) {
    if (this.mK_) {
      if (this.Gce && this.zie && this.dK_ && !this.Entity.GetComponent(0)?.GetRemoveState()) {
        this.vK_(t);
        this.yK_();
        this.SK_();
      } else {
        this.fK_ = undefined;
      }
    } else {
      this.ToggleTick(false, "OnTick中检查EnableAiRace并保底关闭");
    }
  }
  vK_(t) {
    this.fK_ ||= new AiRacingPerceptionData();
    var i = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(3);
    var e = this.Entity.GetComponent(1);
    if (!this.fK_.SelfLocation.IsZero() && e?.ActorLocationProxy) {
      e.ActorLocationProxy.Subtraction(this.fK_.SelfLocation, this.fK_.SelfEstimationVelocity);
      this.fK_.SelfEstimationVelocity.MultiplyEqual(1 / (t * CommonDefine_1.SECOND_PER_MILLIONSECOND));
    }
    this.fK_.PlayerLocation.DeepCopy(i?.ActorLocationProxy ?? Vector_1.Vector.ZeroVectorProxy);
    this.fK_.SelfLocation.DeepCopy(e?.ActorLocationProxy ?? Vector_1.Vector.ZeroVectorProxy);
    let s = true;
    if (!this.fK_.SelfEstimationVelocity.IsZero() && !this.fK_.PlayerLocation.IsZero() && !this.fK_.SelfLocation.IsZero()) {
      this.fK_.SelfLocation.Subtraction(this.fK_.PlayerLocation, MathUtils_1.MathUtils.CommonTempVector);
      s = MathUtils_1.MathUtils.CommonTempVector.DotProduct(this.fK_.SelfEstimationVelocity) > 0;
    }
    this.fK_.DistanceBetween = Vector_1.Vector.Dist(this.fK_.PlayerLocation, this.fK_.SelfLocation) * (s ? 1 : -1);
    this.fK_.PlayerVelocity.DeepCopy(i?.ActorVelocityProxy ?? Vector_1.Vector.ZeroVectorProxy);
    this.fK_.PlayerAbsSpeed = this.fK_.PlayerVelocity.Size();
    this.fK_.SelfSplineMoveData = this.Gce?.GetSplineMoveDynamicSpeedData();
    this.fK_.SelfAbsSpeed = this.fK_.SelfSplineMoveData?.CurrentSpeed ?? 0;
    this.fK_.DeltaAbsSpeed = this.fK_.SelfAbsSpeed - this.fK_.PlayerVelocity.Size();
    if (this.Gce?.IsMoving) {
      this.fK_.SelfKeepMovingTime += t * CommonDefine_1.SECOND_PER_MILLIONSECOND;
    } else {
      this.fK_.SelfKeepMovingTime = 0;
    }
    if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(AI_RACING_DEBUG_KEY) && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "[AiRacingMove] 样条移动收集信息", ["当前速度", this.fK_.SelfSplineMoveData?.CurrentSpeed.toFixed(2)], ["当前目标速度", this.fK_.SelfSplineMoveData?.TargetSpeed.toFixed(2)], ["当前加速度", this.fK_.SelfSplineMoveData?.Acceleration.toFixed(2)], ["距离", this.fK_?.DistanceBetween.toFixed(2)], ["玩家速度", this.fK_.PlayerVelocity.Size().toFixed(2)], ["速度绝对值差", this.fK_?.DeltaAbsSpeed.toFixed(2)], ["运动时长", this.fK_?.SelfKeepMovingTime.toFixed(2)]);
    }
  }
  yK_() {
    if (this.zie && this.dK_ && (this.gK_ || (this.gK_ = new SceneItemMoveComponent_1.SceneItemSplineMoveAtDynamicSpeedParam(this.zie), this.gK_.InitSpeed = this.dK_.DefaultSpeed, this.gK_.TargetSpeed = this.dK_.DefaultSpeed, this.gK_.IsCycle = true, this.gK_.Acceleration = 0, this.gK_.MaxMoveTimes = -1, this.gK_.IsKeepLookAt = true), this.fK_)) {
      this.pK_ ||= new SceneItemMoveComponent_1.SceneItemSplineMoveAtDynamicSpeedEditableParam();
      this.CK_ ||= new SceneItemMoveComponent_1.SceneItemSplineMoveAtDynamicSpeedEditableParam();
      var t = this.CK_;
      this.CK_ = this.pK_;
      this.pK_ = t;
      this.pK_.Clear();
      var i = [];
      i.push(this.dK_.DefaultSpeed);
      if (this.dK_.CorrectionByDistanceConfig.Enable) {
        var e = this.dK_.CorrectionByDistanceConfig.CalcTargetSpeedByDistanceBetweenConfig;
        for (let t = 0; t < e.Num(); t++) {
          var s = e.Get(t);
          var s = this.MK_(s, this.fK_.DistanceBetween);
          if (s !== undefined) {
            i.push(s);
            break;
          }
        }
      }
      if (this.dK_.CorrectionBySpeedConfig.Enable) {
        var h = this.dK_.CorrectionBySpeedConfig.CalcTargetSpeedByDeltaAbsSpeedConfig;
        for (let t = 0; t < h.Num(); t++) {
          var o = h.Get(t);
          var o = this.MK_(o, this.fK_.DeltaAbsSpeed);
          if (o !== undefined) {
            i.push(o);
            break;
          }
        }
        var r = this.dK_.CorrectionBySpeedConfig.CalcTargetSpeedByRivalAbsSpeedConfig;
        for (let t = 0; t < r.Num(); t++) {
          var n = r.Get(t);
          var n = this.MK_(n, this.fK_.PlayerAbsSpeed);
          if (n !== undefined) {
            i.push(n);
            break;
          }
        }
      }
      if (this.dK_.CorrectionByTimeConfig.Enable) {
        var a = this.dK_.CorrectionByTimeConfig.CalcTargetSpeedByRunningTimeConfig;
        for (let t = 0; t < a.Num(); t++) {
          var c = a.Get(t);
          var c = this.MK_(c, this.fK_.SelfKeepMovingTime);
          if (c !== undefined) {
            i.push(c);
            break;
          }
        }
      }
      t = this.EK_(this.dK_.CalcTargetSpeedConfig, ...i);
      this.pK_.TargetSpeed = t ?? this.dK_.DefaultSpeed;
      if (this.fK_.SelfAbsSpeed < this.pK_.TargetSpeed) {
        this.pK_.Acceleration = this.dK_.DefaultAcceleration;
      } else if (this.fK_.SelfAbsSpeed > this.pK_.TargetSpeed) {
        this.pK_.Acceleration = -this.dK_.DefaultDeceleration;
      } else {
        this.pK_.Acceleration = 0;
      }
      this.pK_.CurrentSpeed = undefined;
    }
  }
  SK_(t = false) {
    if (this.Gce && this.gK_) {
      if (!this.Gce.IsSplineMoving()) {
        this.Gce.StartSplineMoveAtDynamicSpeedImplement(this.gK_);
        if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(AI_RACING_DEBUG_KEY) && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 39, "[AiRacingMove] 开始样条移动", ["初速度", this.gK_.InitSpeed], ["目标速度", this.gK_.TargetSpeed], ["加速度", this.gK_.Acceleration]);
        }
      }
      if (!!this.pK_ && (!!t || !this.pK_.Equals(this.CK_))) {
        this.Gce.UpdatePatrolAtDynamicSpeedEditableParam(this.pK_);
      }
    }
  }
  MK_(i, e) {
    var t = i.ParamRange.LowerBound;
    if ((t.Type !== 1 || !(e < t.Value)) && (t.Type !== 0 || !(e <= t.Value))) {
      t = i.ParamRange.UpperBound;
      if ((t.Type !== 1 || !(e > t.Value)) && (t.Type !== 0 || !(e >= t.Value))) {
        var s;
        var h = i.CoefficientList;
        var o = h.Num();
        let t = undefined;
        switch (i.FunctionType) {
          case 0:
            t = o < 1 ? undefined : h.Get(0);
            break;
          case 1:
            t = o < 2 ? undefined : h.Get(0) * e + h.Get(1);
            break;
          case 2:
            t = o < 3 ? undefined : h.Get(0) * e * e + h.Get(1) * e + h.Get(2);
            break;
          case 3:
            if (!(o < 4)) {
              s = h.Get(0);
              t = s < e ? h.Get(1) : e === s ? h.Get(2) : h.Get(3);
            }
        }
        return t;
      }
    }
  }
  EK_(i, ...e) {
    if (!(e.length <= 0)) {
      let t = undefined;
      switch (i.FunctionType) {
        case 2:
          t = Math.min(...e);
          break;
        case 1:
          t = Math.max(...e);
          break;
        case 3:
          t = 0;
          for (const s of e) {
            t += s;
          }
          t /= e.length;
          break;
        case 0:
          t = 0;
          for (const h of e) {
            t += h;
          }
      }
      return t;
    }
  }
  RegisterAiInfo(t, i) {
    this.dK_ = t;
    this.zie = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(i, this.Entity.Id, 1);
    this.Hnr = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(i);
    if (!this.zie?.IsValid() || !this.Hnr?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 39, "[AiRacingMove] Spline获取失败", ["SplineEntityId", i]);
      }
    }
  }
  RefreshAiEnable(t) {
    if (this.dK_ && this.mK_ !== t) {
      this.mK_ = t;
      this.ToggleTick(t, "RefreshAiEnable");
    }
  }
  ToggleTick(t, i) {
    if (t && this.Rne !== undefined) {
      this.Enable(this.Rne, i);
      this.fK_ = undefined;
    } else if (!t && this.Rne === undefined) {
      this.Rne = this.Disable(i);
      this.fK_ = undefined;
    }
  }
  GetDebugString() {
    let t = "";
    return t = this.fK_ && (t = `${t = `${t = `${t = `${t += `AiPerceptionData:
`}	距离: ${this.fK_?.DistanceBetween.toFixed(2)}
`}	玩家速度: ${this.fK_.PlayerVelocity.Size().toFixed(2)}
`}	速度差值: ${this.fK_?.DeltaAbsSpeed.toFixed(2)}
`}	运动时长: ${this.fK_?.SelfKeepMovingTime.toFixed(2)}
`, this.fK_.SelfSplineMoveData) ? `${t = `${t = `${t += `	SplineMoveData:
`}		当前速度: ${this.fK_.SelfSplineMoveData?.CurrentSpeed.toFixed(2)}
`}		目标速度: ${this.fK_.SelfSplineMoveData?.TargetSpeed.toFixed(2)}
`}		当前加速度: ${this.fK_.SelfSplineMoveData?.Acceleration.toFixed(2)}
` : t;
  }
};
SceneItemAiRacingMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(283)], SceneItemAiRacingMoveComponent);
exports.SceneItemAiRacingMoveComponent = SceneItemAiRacingMoveComponent; //# sourceMappingURL=SceneItemAiRacingMoveComponent.js.map