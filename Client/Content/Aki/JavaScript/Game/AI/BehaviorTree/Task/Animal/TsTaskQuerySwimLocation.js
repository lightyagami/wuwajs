"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const IEntity_1 = require("../../../../../UniverseEditor/Interface/IEntity");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RenderConfig_1 = require("../../../../Render/Config/RenderConfig");
const ColorUtils_1 = require("../../../../Utils/ColorUtils");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
const DISTANCE_FROM_WATER_SURFACE = 200;
const SAFE_RANGE = 20;
const BLACKBOARD_KEY_SWIM_LOCATION = "SwimLocation";
const PROFILE_KEY = "TsTaskQuerySwimLocation";
class TsTaskQuerySwimLocation extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.Angle = 0;
    this.InnerDiameter = 0;
    this.OuterDiameter = 0;
    this.DebugMode = false;
    this.IsInitTsVariables = false;
    this.TsAngle = 0;
    this.TsInnerDiameter = 0;
    this.TsOuterDiameter = 0;
    this.TsDebugMode = false;
    this.HaveRangeConfig = false;
    this.RangeInited = false;
    this.Center = undefined;
    this.Size = undefined;
    this.Rotator = undefined;
    this.VectorCache2 = undefined;
    this.TargetVector = undefined;
    this.VectorCache = undefined;
    this.TraceElement = undefined;
    this.ShallowTraceElement = undefined;
    this.InitZ = -0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsAngle = 0;
    this.TsInnerDiameter = 0;
    this.TsOuterDiameter = 0;
    this.TsDebugMode = false;
    this.HaveRangeConfig = false;
    this.RangeInited = false;
    this.Center = undefined;
    this.Size = undefined;
    this.Rotator = undefined;
    this.VectorCache2 = undefined;
    this.TargetVector = undefined;
    this.VectorCache = undefined;
    this.TraceElement = undefined;
    this.ShallowTraceElement = undefined;
    this.InitZ = -0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsAngle = this.Angle;
      this.TsInnerDiameter = this.InnerDiameter;
      this.TsOuterDiameter = this.OuterDiameter;
      this.TsDebugMode = this.DebugMode;
      this.HaveRangeConfig = false;
      this.RangeInited = false;
      this.Center = Vector_1.Vector.Create();
      this.Size = Vector_1.Vector.Create();
      this.Rotator = Rotator_1.Rotator.Create();
      this.TargetVector = Vector_1.Vector.Create();
      this.VectorCache = Vector_1.Vector.Create();
      this.VectorCache2 = Vector_1.Vector.Create();
    }
  }
  ReceiveExecuteAI(t, i) {
    var s = t.AiController;
    if (s) {
      this.InitTsVariables();
      this.InitTraceElement();
      var h;
      var s = s.CharActorComp;
      const e = s.CreatureData;
      this.HaveRangeConfig = this.InitRange(e);
      if (!this.InitZ) {
        const e = s.CreatureData;
        this.InitZ = e.GetInitLocation().Z ?? s.ActorLocationProxy.Z;
      }
      this.ShallowTraceElement.SetBoxHalfSize(s.Radius + SAFE_RANGE, s.Radius + SAFE_RANGE, s.HalfHeight + SAFE_RANGE);
      if (this.HaveRangeConfig) {
        h = TsTaskQuerySwimLocation.RandomPointInBoxRange2D(this.Size.X, this.Size.Y, this.Rotator.Yaw);
        this.TargetVector.X = this.Center.X + h.X;
        this.TargetVector.Y = this.Center.Y + h.Y;
      } else {
        h = TsTaskQuerySwimLocation.RandomPointInFanRing(this.TsInnerDiameter, this.TsOuterDiameter, (s.ActorRotationProxy.Yaw - this.TsAngle / 2) / 180 * Math.PI, (s.ActorRotationProxy.Yaw + this.TsAngle / 2) / 180 * Math.PI);
        this.TargetVector.X = s.ActorLocationProxy.X + h.X;
        this.TargetVector.Y = s.ActorLocationProxy.Y + h.Y;
      }
      this.TargetVector.Z = this.InitZ;
      if (!this.CheckInWater(this.TargetVector) || !this.CheckReachable(s.ActorLocationProxy, this.TargetVector) || (this.DebugDrawRange(), this.HaveRangeConfig && !this.IsInBoxRange2D(this.TargetVector))) {
        this.DebugDraw(this.TargetVector, ColorUtils_1.ColorUtils.LinearRed);
        this.Finish(false);
      } else {
        this.DebugDraw(this.TargetVector, ColorUtils_1.ColorUtils.LinearGreen);
        ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(s.Entity.Id, BLACKBOARD_KEY_SWIM_LOCATION, this.TargetVector.X, this.TargetVector.Y, this.TargetVector.Z);
        this.Finish(true);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  InitRange(t) {
    if (!this.RangeInited) {
      var i = t.GetPbEntityInitData().ComponentsData;
      var i = (0, IComponent_1.getComponent)(i, "AnimalComponent");
      if (!i || i.MoveRange === undefined) {
        return false;
      }
      var i = ModelManager_1.ModelManager.CreatureModel.GetEntityData(i.MoveRange);
      var s = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(i.BlueprintType);
      var i = (0, IEntity_1.decompressEntityData)(i, s);
      var s = (0, IComponent_1.getComponent)(i.ComponentsData, "RangeComponent").Shape;
      if (s.Type !== "Box") {
        return false;
      }
      i = i.Transform;
      this.InitCenter(i, s);
      this.InitSize(i, s);
      this.InitRotator(i, s);
      if (this.Rotator.Pitch !== 0 || this.Rotator.Roll !== 0) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("BehaviorTree", 29, "池塘范围不支持Roll和Pitch", ["EntityConfigId", t.GetPbDataId()]);
        }
        this.Rotator.Pitch = 0;
        this.Rotator.Roll = 0;
      }
      this.RangeInited = true;
    }
    return true;
  }
  InitCenter(t, i) {
    this.Center ||= Vector_1.Vector.Create();
    this.Center.X = t?.Pos.X ?? 0;
    this.Center.X += i.Center.X ?? 0;
    this.Center.Y = t?.Pos.Y ?? 0;
    this.Center.Y += i.Center.Y ?? 0;
    this.Center.Z = t?.Pos.Z ?? 0;
    this.Center.Z += i.Center.Z ?? 0;
  }
  InitSize(t, i) {
    this.Size ||= Vector_1.Vector.Create();
    this.Size.X = i.Size.X ?? 0;
    this.Size.X *= t?.Scale?.X ?? 1;
    this.Size.Y = i.Size.Y ?? 0;
    this.Size.Y *= t?.Scale?.Y ?? 1;
    this.Size.Z = i.Size.Z ?? 0;
    this.Size.Z *= t?.Scale?.Z ?? 1;
  }
  InitRotator(t, i) {
    this.Rotator ||= Rotator_1.Rotator.Create();
    this.Rotator.Pitch = i.Rotator?.Y ?? 0;
    this.Rotator.Pitch += t?.Rot?.Y ?? 0;
    this.Rotator.Yaw = i.Rotator?.Z ?? 0;
    this.Rotator.Yaw += t?.Rot?.Z ?? 0;
    this.Rotator.Roll = i.Rotator?.X ?? 0;
    this.Rotator.Roll += t?.Rot?.X ?? 0;
  }
  static RandomPointInBoxRange2D(t, i, s) {
    var t = MathUtils_1.MathUtils.GetRandomRange(-t, t);
    var i = MathUtils_1.MathUtils.GetRandomRange(-i, i);
    var s = s * MathUtils_1.MathUtils.DegToRad;
    var h = Math.cos(s);
    var s = Math.sin(s);
    return {
      X: t * h - i * s,
      Y: t * s + i * h
    };
  }
  static RandomPointInFanRing(t, i, s, h) {
    if (h < s || i < t || t < 0) {
      return {
        X: 0,
        Y: 0
      };
    } else {
      t = MathUtils_1.MathUtils.GetRandomRange(t * t, i * i);
      i = MathUtils_1.MathUtils.GetRandomRange(s, h);
      return {
        X: (s = Math.sqrt(t)) * Math.cos(i),
        Y: s * Math.sin(i)
      };
    }
  }
  IsInBoxRange2D(t) {
    this.VectorCache2.DeepCopy(t);
    this.VectorCache2.SubtractionEqual(this.Center);
    var t = this.VectorCache2.X;
    var i = this.VectorCache2.Y;
    var s = -this.Rotator.Yaw * MathUtils_1.MathUtils.DegToRad;
    var h = Math.cos(s);
    var s = Math.sin(s);
    this.VectorCache2.X = h * t - s * i;
    this.VectorCache2.Y = s * t + h * i;
    return this.VectorCache2.X > -this.Size.X && this.VectorCache2.X < +this.Size.X && this.VectorCache2.Y > -this.Size.Y && this.VectorCache2.Y < +this.Size.Y;
  }
  InitTraceElement() {
    if (!this.TraceElement) {
      this.TraceElement = UE.NewObject(UE.TraceLineElement.StaticClass());
      this.TraceElement.bIsSingle = true;
      this.TraceElement.bIgnoreSelf = true;
      this.TraceElement.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
      this.TraceElement.SetDrawDebugTrace(this.TsDebugMode ? 2 : 0);
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.TraceElement, ColorUtils_1.ColorUtils.LinearGreen);
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.TraceElement, ColorUtils_1.ColorUtils.LinearRed);
    }
    if (!this.ShallowTraceElement) {
      this.ShallowTraceElement = UE.NewObject(UE.TraceBoxElement.StaticClass());
      this.ShallowTraceElement.bIsSingle = false;
      this.ShallowTraceElement.bIgnoreSelf = true;
      this.ShallowTraceElement.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
      this.ShallowTraceElement.SetDrawDebugTrace(this.TsDebugMode ? 2 : 0);
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.ShallowTraceElement, ColorUtils_1.ColorUtils.LinearGreen);
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.ShallowTraceElement, ColorUtils_1.ColorUtils.LinearRed);
    }
    this.TraceElement.WorldContextObject = this.GetWorld();
    this.ShallowTraceElement.WorldContextObject = this.GetWorld();
  }
  CheckInWater(t) {
    this.VectorCache.DeepCopy(t);
    this.VectorCache.Z = t.Z + DISTANCE_FROM_WATER_SURFACE;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.TraceElement, this.VectorCache);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.TraceElement, t);
    return !!TraceElementCommon_1.TraceElementCommon.LineTrace(this.TraceElement, PROFILE_KEY);
  }
  CheckReachable(t, i) {
    var s = RenderConfig_1.RenderConfig.WaterCollisionProfileName;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.ShallowTraceElement, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.ShallowTraceElement, i);
    var t = TraceElementCommon_1.TraceElementCommon.BoxTrace(this.ShallowTraceElement, PROFILE_KEY);
    if (t && this.ShallowTraceElement.HitResult.bBlockingHit) {
      var h = this.ShallowTraceElement.HitResult.Actors;
      var e = this.ShallowTraceElement.HitResult.Components;
      for (let t = 0; t < h.Num(); t++) {
        var o = h.Get(t);
        if (o !== undefined) {
          o = e.Get(t);
          if (o && !s.op_Equality(o.GetCollisionProfileName())) {
            return false;
          }
        }
      }
    }
    return true;
  }
  DebugDraw(t, i) {
    if (GlobalData_1.GlobalData.IsPlayInEditor && this.TsDebugMode) {
      UE.KismetSystemLibrary.D_DrawDebugSphere(this, t.ToUeVector(), 30, 10, i, 1.5);
    }
  }
  DebugDrawRange() {
    if (GlobalData_1.GlobalData.IsPlayInEditor && this.TsDebugMode && this.HaveRangeConfig) {
      UE.KismetSystemLibrary.D_DrawDebugBox(this, this.Center.ToUeVector(), this.Size.ToUeVector(), ColorUtils_1.ColorUtils.LinearGreen, this.Rotator.ToUeRotator(), 1.5);
    }
  }
}
exports.default = TsTaskQuerySwimLocation;
//# sourceMappingURL=TsTaskQuerySwimLocation.js.map