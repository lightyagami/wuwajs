"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoGlobalConfig = exports.DangoPerformConfig = exports.DangoPerformEffectConfig = undefined;
const CurveUtils_1 = require("../../../../Core/Utils/Curve/CurveUtils");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
class DangoPerformEffectConfig {
  constructor() {
    this.EffectPath = "";
    this.PerformLocationType = 2;
    this.LocationOffset = Vector_1.Vector.Create();
    this.AttachSocket = undefined;
    this.DelayTime = 0;
  }
}
exports.DangoPerformEffectConfig = DangoPerformEffectConfig;
class DangoPerformConfig {
  constructor() {
    this.ActionType = 0;
    this.ActionTargetType = 0;
    this.RecursionActionType = 0;
    this.Duration = 0;
    this.EffectConfigList = new Array();
  }
}
exports.DangoPerformConfig = DangoPerformConfig;
class DangoGlobalConfig {
  constructor() {
    this.ConfigAsset = undefined;
    this.AttachSocketName = undefined;
    this.StackInterval = 0;
    this.MoveStartingTime = 0;
    this.MoveTime = 0;
    this.MoveTotalTime = 0;
    this.MoveRotateSpeed = 0;
    this.MoveBaseHeightOffset = 0;
    this.MaxRiseHeightEdge = 0;
    this.MaxFallHeightEdge = 0;
    this.MoveRiseCurve = undefined;
    this.MoveFallCurve = undefined;
    this.BeforeMoveCameraTriggerDistance = 0;
    this.BeforeMoveCameraArmLength = 0;
    this.BeforeMoveCameraBlendTimeCloseMin = 0;
    this.BeforeMoveCameraBlendTimeCloseMax = 0;
    this.BeforeMoveCameraCloseDistanceEdgeMin = 0;
    this.BeforeMoveCameraCloseDistanceEdgeMax = 0;
    this.BeforeMoveCameraFarDistance = 0;
    this.BeforeMoveCameraBlendTimeFar = 0;
    this.BeforeMoveCameraFov = 0;
    this.BeforeMoveCameraCurve = undefined;
    this.MovingCameraArmLength = 0;
    this.MovingCameraBlendTime = 0;
    this.MovingCameraFov = 0;
    this.MovingCameraCurve = undefined;
    this.fM1 = new Map();
  }
  static Create(t) {
    var i = new DangoGlobalConfig();
    i.ConfigAsset = t;
    i.AttachSocketName = t.堆叠绑定骨骼名称;
    i.StackInterval = t.堆叠间隔;
    i.MoveStartingTime = t.跳跃前摇时间;
    i.MoveTime = t.跳跃移动时间;
    i.MoveTotalTime = t.跳跃前摇时间 + t.跳跃移动时间 + t.跳跃后摇时间;
    i.MoveRotateSpeed = t.跳跃旋转速度;
    i.MoveBaseHeightOffset = t.跳跃高度偏移基准;
    i.MaxRiseHeightEdge = Math.abs(t.跳跃上升偏移曲线高度范围);
    i.MaxFallHeightEdge = Math.abs(t.跳跃下降偏移曲线高度范围);
    i.MoveRiseCurve = t.跳跃上升偏移曲线;
    i.MoveFallCurve = t.跳跃下降偏移曲线;
    i.BeforeMoveCameraTriggerDistance = t.跳跃前镜头死区距离基准;
    i.BeforeMoveCameraArmLength = t.跳跃前镜头臂长;
    var s = t.跳跃前镜头近距离追踪时间范围;
    i.BeforeMoveCameraBlendTimeCloseMin = s.LowerBound.Value * MathUtils_1.MathUtils.MillisecondToSecond;
    i.BeforeMoveCameraBlendTimeCloseMax = s.UpperBound.Value * MathUtils_1.MathUtils.MillisecondToSecond;
    var s = t.跳跃前镜头近距离基准范围;
    i.BeforeMoveCameraCloseDistanceEdgeMin = s.LowerBound.Value;
    i.BeforeMoveCameraCloseDistanceEdgeMax = s.UpperBound.Value;
    i.BeforeMoveCameraBlendTimeFar = t.跳跃前镜头远距离追踪时间 * MathUtils_1.MathUtils.MillisecondToSecond;
    i.BeforeMoveCameraFarDistance = t.跳跃前镜头远距离基准;
    i.BeforeMoveCameraFov = t.跳跃前镜头FOV;
    i.BeforeMoveCameraCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(t.跳跃前镜头曲线);
    i.MovingCameraArmLength = t.跳跃中镜头臂长;
    i.MovingCameraBlendTime = t.跳跃中镜头追踪时间 * MathUtils_1.MathUtils.MillisecondToSecond;
    i.MovingCameraFov = t.跳跃中镜头FOV;
    i.MovingCameraCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(t.跳跃中镜头曲线);
    var o = t.动作表现;
    for (let t = 0; t < o.Num(); t++) {
      var r = o.GetKey(t);
      var e = o.Get(r);
      if (e) {
        var h = new DangoPerformConfig();
        h.ActionType = e.动画类型;
        h.ActionTargetType = e.动画目标类型;
        h.RecursionActionType = e.堆叠上方团子动画类型;
        h.Duration = e.持续时间;
        var a = e.特效列表;
        for (let t = 0; t < a.Num(); t++) {
          var l = a.Get(t);
          var n = new DangoPerformEffectConfig();
          n.EffectPath = l.特效路径.ToAssetPathName();
          n.PerformLocationType = l.特效位置类型;
          n.LocationOffset.FromUeVector(l.位置偏移);
          n.DelayTime = l.释放延迟时间;
          if (!FNameUtil_1.FNameUtil.IsNothing(l.骨骼名称)) {
            n.AttachSocket = l.骨骼名称;
          }
          h.EffectConfigList.push(n);
        }
        i.fM1.set(r, h);
      }
    }
    return i;
  }
  GetPerformConfig(t) {
    return this.fM1.get(t);
  }
}
exports.DangoGlobalConfig = DangoGlobalConfig;
//# sourceMappingURL=DangoGlobalConfig.js.map