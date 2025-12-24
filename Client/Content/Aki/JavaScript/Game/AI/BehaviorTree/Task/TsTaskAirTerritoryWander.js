"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const IEntity_1 = require("../../../../UniverseEditor/Interface/IEntity");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const NAVIGATION_END_TIME = 5000;
const NAVIGATION_COMPLETE_DISTANCE = 20;
class TsTaskAirTerritoryWander extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.Yaw = 0;
    this.Pitch = 0;
    this.InnerDiameter = 0;
    this.OuterDiameter = 0;
    this.MaxSampleStep = 2;
    this.GlobalSample = false;
    this.TurnSpeed = 0;
    this.DebugMode = false;
    this.TargetLocation = undefined;
    this.FoundPath = false;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.CacheVector = undefined;
    this.CacheForward = undefined;
    this.OldMovementMode = 1;
    this.NavigationEndTime = -0;
    this.RangeInited = false;
    this.RangeInfo = undefined;
    this.IsInitTsVariables = false;
    this.TsYaw = 0;
    this.TsPitch = 0;
    this.TsInnerDiameter = 0;
    this.TsOuterDiameter = 0;
    this.TsMaxSampleStep = 2;
    this.TsGlobalSample = false;
    this.TsTurnSpeed = 0;
    this.TsDebugMode = false;
  }
  Constructor() {
    super.Constructor();
    this.TargetLocation = undefined;
    this.FoundPath = false;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.CacheVector = undefined;
    this.CacheForward = undefined;
    this.OldMovementMode = 1;
    this.NavigationEndTime = -0;
    this.RangeInited = false;
    this.RangeInfo = undefined;
    this.IsInitTsVariables = false;
    this.TsYaw = 0;
    this.TsPitch = 0;
    this.TsInnerDiameter = 0;
    this.TsOuterDiameter = 0;
    this.TsMaxSampleStep = 2;
    this.TsGlobalSample = false;
    this.TsTurnSpeed = 0;
    this.TsDebugMode = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsYaw = this.Yaw;
      this.TsPitch = this.Pitch;
      this.TsInnerDiameter = this.InnerDiameter;
      this.TsOuterDiameter = this.OuterDiameter;
      this.TsMaxSampleStep = this.MaxSampleStep;
      this.TsGlobalSample = this.GlobalSample;
      this.TsTurnSpeed = this.TurnSpeed;
      this.TsDebugMode = this.DebugMode;
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s = t.AiController;
    if (s) {
      this.ActorComp = s.CharActorComp;
      if (this.ActorComp?.Valid && (s = this.ActorComp.Entity, this.MoveComp = s.GetComponent(187), this.InitRangeEntity(s), this.RangeInfo)) {
        this.CacheVector ||= Vector_1.Vector.Create();
        this.FindWanderLocation();
        this.NavigationEndTime = Time_1.Time.WorldTime + NAVIGATION_END_TIME;
        if (this.ActorComp.Actor.CharacterMovement) {
          this.OldMovementMode = this.ActorComp.Actor.CharacterMovement.MovementMode;
        }
      } else {
        this.Finish(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  ReceiveTickAI(t, i, s) {
    if (t instanceof TsAiController_1.default && this.FoundPath && this.MoveComp?.CanMove()) {
      if (Time_1.Time.WorldTime > this.NavigationEndTime || (this.ActorComp?.Actor && this.ActorComp.Actor.KuroSetMovementMode({
        Mode: 5,
        Context: "[TsTaskAirTerritoryWander.ReceiveTickAI]"
      }), this.CacheVector.FromUeVector(this.TargetLocation), this.CacheVector.Subtraction(this.ActorComp.ActorLocationProxy, this.CacheVector), t = this.CacheVector.Size(), this.CacheVector.Normalize(), t < NAVIGATION_COMPLETE_DISTANCE)) {
        this.Finish(true);
      } else {
        this.ActorComp.SetInputDirect(this.CacheVector);
        AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(this.ActorComp, this.CacheVector, this.TsTurnSpeed);
      }
    } else {
      this.Finish(false);
    }
  }
  OnClear() {
    if (this.AIOwner instanceof TsAiController_1.default) {
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner);
    }
    this.ActorComp?.Actor.KuroSetMovementMode({
      Mode: this.OldMovementMode,
      Context: "[TsTaskAirTerritoryWander.OnClear]"
    });
    this.ActorComp = undefined;
    this.MoveComp = undefined;
  }
  InitRangeEntity(t) {
    if (!this.RangeInited) {
      this.RangeInited = true;
      t = t.GetComponent(0).GetPbEntityInitData().ComponentsData;
      t = (0, IComponent_1.getComponent)(t, "AnimalComponent");
      if (t && t.MoveRange) {
        var t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(t.MoveRange);
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(t.BlueprintType);
        var t = (0, IEntity_1.decompressEntityData)(t, i);
        var s = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent");
        var h = t.Transform;
        switch (s.Shape.Type) {
          case "Box":
            this.RangeInfo = new AiContollerLibrary_1.BoxRangeEntityInfo(s.Shape, h);
            break;
          case "Sphere":
            this.RangeInfo = new AiContollerLibrary_1.SphereRangeEntityInfo(s.Shape, h);
        }
      }
    }
  }
  RandomPointInSphereFan(t, i, s, h, e, r, o) {
    o.Reset();
    if (!(h < s) && !(i < t) && !(r < e) && !(t < 0)) {
      t = MathUtils_1.MathUtils.GetRandomRange(t * t * t, i * i * i);
      i = Math.pow(t, 1 / 3);
      t = MathUtils_1.MathUtils.GetRandomRange(s, h);
      s = MathUtils_1.MathUtils.GetRandomRange(e, r);
      o.X = i * Math.cos(t);
      o.Y = i * Math.sin(t) * Math.cos(s);
      o.Z = i * Math.sin(t) * Math.sin(s);
    }
  }
  FindWanderLocation() {
    this.TargetLocation ||= Vector_1.Vector.Create();
    this.FoundPath = this.GetNextTargetLocation(this.TargetLocation);
    if (this.FoundPath) {
      this.DebugDraw();
    }
  }
  GetNextTargetLocation(t) {
    return !!this.RangeInfo && (this.TsGlobalSample ? AiContollerLibrary_1.AiControllerLibrary.GlobalSamplePoint(this.RangeInfo, t) : this.LocalSamplePoint(t));
  }
  LocalSamplePoint(t) {
    if (!this.RangeInfo) {
      return false;
    }
    this.CacheForward ||= Vector_1.Vector.Create();
    var i = this.ActorComp.ActorForwardProxy;
    var s = this.ActorComp.ActorLocationProxy;
    var h = this.ActorComp.ActorRotationProxy;
    var e = AiContollerLibrary_1.RangeEntityInfo.TmpVector1;
    var r = AiContollerLibrary_1.RangeEntityInfo.TmpVector2;
    var o = AiContollerLibrary_1.RangeEntityInfo.TmpRotator;
    this.RangeInfo.Transform.GetLocation().Subtraction(s, e);
    e.GetSafeNormal(r);
    this.CacheForward.DeepCopy(i);
    o.DeepCopy(h);
    let a = 0;
    while (a < this.TsMaxSampleStep) {
      this.RandomPointInSphereFan(this.TsInnerDiameter, this.TsOuterDiameter, (o.Yaw - this.TsYaw) * MathUtils_1.MathUtils.DegToRad, (o.Yaw + this.TsYaw) * MathUtils_1.MathUtils.DegToRad, (o.Pitch - this.TsPitch) * MathUtils_1.MathUtils.DegToRad, (o.Pitch + this.TsPitch) * MathUtils_1.MathUtils.DegToRad, t);
      t.AdditionEqual(s);
      if (this.RangeInfo.IsInRange(t)) {
        return true;
      }
      a++;
      this.CacheForward.AdditionEqual(r);
      this.CacheForward.Normalize();
      this.CacheForward.Rotation(o);
    }
    t.DeepCopy(this.RangeInfo.Transform.GetLocation());
    return true;
  }
  DebugDraw() {
    if (this.TsDebugMode && GlobalData_1.GlobalData.IsPlayInEditor) {
      this.DebugDrawRangeEntity();
      this.DebugDrawLocalSampleRange();
      this.DebugDrawTargetPoint();
    }
  }
  DebugDrawLocalSampleRange() {
    if (!this.TsGlobalSample) {
      UE.KismetSystemLibrary.D_DrawDebugCone(this, this.ActorComp.ActorLocation, this.CacheForward.ToUeVector(), this.TsOuterDiameter, this.TsYaw * MathUtils_1.MathUtils.DegToRad, this.TsPitch * MathUtils_1.MathUtils.DegToRad, 12, ColorUtils_1.ColorUtils.LinearGreen, 3);
      UE.KismetSystemLibrary.D_DrawDebugCone(this, this.ActorComp.ActorLocation, this.CacheForward.ToUeVector(), this.TsInnerDiameter, this.TsYaw * MathUtils_1.MathUtils.DegToRad, this.TsPitch * MathUtils_1.MathUtils.DegToRad, 12, ColorUtils_1.ColorUtils.LinearRed, 3);
    }
  }
  DebugDrawTargetPoint() {
    UE.KismetSystemLibrary.D_DrawDebugSphere(this, this.TargetLocation.ToUeVector(), 30, 10, ColorUtils_1.ColorUtils.LinearRed, 3);
    var t = AiContollerLibrary_1.RangeEntityInfo.TmpVector1;
    t.DeepCopy(this.CacheForward);
    t.MultiplyEqual(500);
    t.AdditionEqual(this.ActorComp.ActorLocationProxy);
    UE.KismetSystemLibrary.D_DrawDebugArrow(this, this.ActorComp.ActorLocation, t.ToUeVector(), 5, ColorUtils_1.ColorUtils.LinearRed, 3, 5);
  }
  DebugDrawRangeEntity() {
    if (this.RangeInfo) {
      switch (this.RangeInfo.Shape) {
        case "Box":
          var t = this.RangeInfo;
          UE.KismetSystemLibrary.D_DrawDebugBox(this, t.Transform.GetLocation().ToUeVector(), t.Bounds.ToUeVector(), ColorUtils_1.ColorUtils.LinearRed, t.Transform.GetRotation().Rotator().ToUeRotator(), 3, 5);
          break;
        case "Sphere":
          t = this.RangeInfo;
          UE.KismetSystemLibrary.D_DrawDebugSphere(this, t.Transform.GetLocation().ToUeVector(), t.Radius, 24, ColorUtils_1.ColorUtils.LinearRed, 3, 5);
      }
    }
  }
}
exports.default = TsTaskAirTerritoryWander;
//# sourceMappingURL=TsTaskAirTerritoryWander.js.map