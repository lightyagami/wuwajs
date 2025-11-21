"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const PI = 3.14;
const NAVIGATION_END_TIME = 5000;
const NAVIGATION_COMPLETE_DISTANCE = 20;
class TsTaskTerritoryWander extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.RangeCenterKey = "";
    this.RangeCenter = undefined;
    this.RangeRadius = 0;
    this.Angle = 0;
    this.InnerDiameter = 0;
    this.OuterDiameter = 0;
    this.ForceNavigation = false;
    this.TargetLocation = undefined;
    this.FoundPath = false;
    this.NavigationPath = undefined;
    this.CurrentNavigationIndex = 0;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.UnifiedStateComp = undefined;
    this.CacheVector = undefined;
    this.TurnSpeed = 0;
    this.NavigationEndTime = -0;
    this.DebugMode = false;
    this.IsInitTsVariables = false;
    this.TsRangeCenterKey = "";
    this.TsRangeRadius = 0;
    this.TsAngle = 0;
    this.TsInnerDiameter = 0;
    this.TsOuterDiameter = 0;
    this.TsForceNavigation = false;
    this.TsTurnSpeed = 0;
    this.TsDebugMode = false;
  }
  Constructor() {
    super.Constructor();
    this.RangeCenter = undefined;
    this.TargetLocation = undefined;
    this.FoundPath = false;
    this.NavigationPath = undefined;
    this.CurrentNavigationIndex = 0;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.UnifiedStateComp = undefined;
    this.CacheVector = undefined;
    this.NavigationEndTime = -0;
    this.IsInitTsVariables = false;
    this.TsRangeCenterKey = "";
    this.TsRangeRadius = 0;
    this.TsAngle = 0;
    this.TsInnerDiameter = 0;
    this.TsOuterDiameter = 0;
    this.TsForceNavigation = false;
    this.TsTurnSpeed = 0;
    this.TsDebugMode = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsRangeCenterKey = this.RangeCenterKey;
      this.TsRangeRadius = this.RangeRadius;
      this.TsAngle = this.Angle;
      this.TsInnerDiameter = this.InnerDiameter;
      this.TsOuterDiameter = this.OuterDiameter;
      this.TsForceNavigation = this.ForceNavigation;
      this.TsTurnSpeed = this.TurnSpeed;
      this.TsDebugMode = this.DebugMode;
    }
  }
  ReceiveExecuteAI(i, t) {
    this.InitTsVariables();
    var s = i.AiController;
    if (s) {
      this.ActorComp = s.CharActorComp;
      if (this.ActorComp?.Valid) {
        var s = this.ActorComp.Entity;
        var h = s.GetComponent(0);
        this.MoveComp = s.GetComponent(182);
        this.UnifiedStateComp = s.GetComponent(104);
        if (!this.RangeCenter) {
          if (this.TsRangeCenterKey) {
            s = s.Id;
            s = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(s, this.TsRangeCenterKey);
            if (!s) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("BehaviorTree", 29, "不存在Blackboard Value", ["Key", this.TsRangeCenterKey]);
              }
              this.Finish(false);
              return;
            }
            this.RangeCenter = Vector_1.Vector.Create(s);
          } else {
            s = h.GetInitLocation();
            this.RangeCenter = Vector_1.Vector.Create(s.X, s.Y, s.Z);
          }
        }
        this.CacheVector ||= Vector_1.Vector.Create();
        this.FindWanderLocation();
        this.FindWanderPath();
        this.NavigationEndTime = Time_1.Time.WorldTime + NAVIGATION_END_TIME;
        this.CurrentNavigationIndex = 1;
      } else {
        this.Finish(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", i.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  ReceiveTickAI(i, t, s) {
    if (i instanceof TsAiController_1.default && (!this.TsForceNavigation || this.FoundPath) && this.MoveComp?.CanMove()) {
      if (Time_1.Time.WorldTime > this.NavigationEndTime || (this.UnifiedStateComp?.Valid && this.UnifiedStateComp.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk), i = this.NavigationPath[this.CurrentNavigationIndex], this.CacheVector.FromUeVector(i), this.CacheVector.Subtraction(this.ActorComp.ActorLocationProxy, this.CacheVector), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.CacheVector), i = this.CacheVector.Size(), this.CacheVector.Normalize(), this.CurrentNavigationIndex === this.NavigationPath.length - 1 && i < NAVIGATION_COMPLETE_DISTANCE)) {
        this.Finish(true);
      } else {
        if (i < NAVIGATION_COMPLETE_DISTANCE) {
          this.CurrentNavigationIndex++;
        }
        this.ActorComp.SetInputDirect(this.CacheVector);
        AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(this.ActorComp, this.CacheVector, this.TsTurnSpeed);
      }
    } else {
      this.Finish(false);
    }
  }
  RandomPointInFanRing(i, t, s, h) {
    if (h < s || t < i || i < 0) {
      return {
        X: 0,
        Y: 0
      };
    } else {
      i = MathUtils_1.MathUtils.GetRandomRange(i * i, t * t);
      t = MathUtils_1.MathUtils.GetRandomRange(s, h);
      return {
        X: (s = Math.sqrt(i)) * Math.cos(t),
        Y: s * Math.sin(t)
      };
    }
  }
  OnClear() {
    if (this.AIOwner instanceof TsAiController_1.default) {
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner);
    }
    this.UnifiedStateComp?.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.UnifiedStateComp = undefined;
  }
  FindWanderLocation() {
    this.TargetLocation ||= Vector_1.Vector.Create();
    var i = this.ActorComp.ActorLocationProxy;
    var t = this.RandomPointInFanRing(this.TsInnerDiameter, this.TsOuterDiameter, (this.ActorComp.ActorRotationProxy.Yaw - this.TsAngle / 2) / 180 * PI, (this.ActorComp.ActorRotationProxy.Yaw + this.TsAngle / 2) / 180 * PI);
    this.TargetLocation.X = i.X + t.X;
    this.TargetLocation.Y = i.Y + t.Y;
    this.TargetLocation.Z = i.Z;
    if (Vector_1.Vector.DistSquared2D(this.TargetLocation, this.RangeCenter) >= this.TsRangeRadius * this.TsRangeRadius) {
      this.TargetLocation.X = i.X - t.X;
      this.TargetLocation.Y = i.Y - t.Y;
      if (Vector_1.Vector.DistSquared2D(this.TargetLocation, this.RangeCenter) >= this.TsRangeRadius * this.TsRangeRadius) {
        this.TargetLocation.X = this.RangeCenter.X;
        this.TargetLocation.Y = this.RangeCenter.Y;
      }
      this.TargetLocation.Z = i.Z;
    }
    this.DebugDraw();
  }
  FindWanderPath() {
    this.NavigationPath ||= new Array();
    this.FoundPath = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(this, this.ActorComp.ActorLocation, this.TargetLocation.ToUeVector(), this.NavigationPath);
    if (!this.FoundPath) {
      this.NavigationPath.length = 2;
      this.NavigationPath[0] = this.ActorComp.ActorLocationProxy;
      this.NavigationPath[1] = this.TargetLocation;
    }
  }
  DebugDraw() {
    if (this.TsDebugMode && GlobalData_1.GlobalData.IsPlayInEditor) {
      UE.KismetSystemLibrary.D_DrawDebugCone(this, this.ActorComp.ActorLocation, this.ActorComp.ActorForward, this.TsOuterDiameter, this.TsAngle / 360 * PI, 0, 12, ColorUtils_1.ColorUtils.LinearGreen, 3);
      UE.KismetSystemLibrary.D_DrawDebugCone(this, this.ActorComp.ActorLocation, this.ActorComp.ActorForward, this.TsInnerDiameter, this.TsAngle / 360 * PI, 0, 12, ColorUtils_1.ColorUtils.LinearRed, 3);
      UE.KismetSystemLibrary.D_DrawDebugCircle(this, this.RangeCenter.ToUeVector(), this.TsRangeRadius, 24, ColorUtils_1.ColorUtils.LinearYellow, 3, 0, Vector_1.Vector.Create(1, 0, 0).ToUeVector(), Vector_1.Vector.Create(0, 1, 0).ToUeVector(), true);
      UE.KismetSystemLibrary.D_DrawDebugSphere(this, this.TargetLocation.ToUeVector(), 30, 10, ColorUtils_1.ColorUtils.LinearRed, 3);
    }
  }
}
exports.default = TsTaskTerritoryWander;
//# sourceMappingURL=TsTaskTerritoryWander.js.map