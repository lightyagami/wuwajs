"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const ColorUtils_1 = require("../../../../../Utils/ColorUtils");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const JUMPED_TURN_SPEED_THREADHOLD = 100;
const ACTIVE_DISTANCE = 5000;
const tmpVector = Vector_1.Vector.Create();
class NavigationErrorData {
  constructor() {
    this.Start = undefined;
    this.End = undefined;
    this.Results = undefined;
  }
}
class TsCharacterDebugComponent extends UE.ActorComponent {
  constructor() {
    super(...arguments);
    this.BaseChar = undefined;
    this.MaxFixSpeed = 0;
    this.OriginWalkableAngle = 0;
    this.DebugRiseModeOn = false;
    this.StaticInit = false;
    this.StaticAttrId = 0;
    this.StaticAiId = "";
    this.DebugCreatureId = undefined;
    this.DebugEntityId = 0;
    this.TestRiseSpeed = -0;
    this.DebugInteractCount = 0;
    this.BehaviorTree = undefined;
    this.PatrolSpline = undefined;
    this.EnterClimbTrace = 0;
    this.DebugPatrolPoints = undefined;
    this.DebugNavigationErrorPaths = undefined;
    this.VaultClimbTrace = 0;
    this.UpArriveClimbTrace = 0;
    this.ClimbingTrace = 0;
    this.NoTop = false;
  }
  Constructor() {
    this.BaseChar = undefined;
    this.OriginWalkableAngle = 0;
    this.DebugRiseModeOn = false;
    this.DebugPatrolPoints = undefined;
    this.DebugNavigationErrorPaths = undefined;
    this.NoTop = false;
  }
  Destroy() {
    this.BaseChar = undefined;
  }
  SetMovementDebug(t) {
    this.BaseChar.CharacterActorComponent.Entity.GetComponent(31).SetDebug(t);
  }
  ChangeEnterClimbTrace() {
    switch (this.EnterClimbTrace) {
      case 0:
        this.EnterClimbTrace = 1;
        break;
      case 1:
        this.EnterClimbTrace = 2;
        break;
      default:
        this.EnterClimbTrace = 0;
    }
    this.BaseChar.CharacterActorComponent.Entity.GetComponent(36).UpdateClimbDebug();
  }
  ChangeVaultClimbTrace() {
    switch (this.VaultClimbTrace) {
      case 0:
        this.VaultClimbTrace = 1;
        break;
      case 1:
        this.VaultClimbTrace = 2;
        break;
      default:
        this.VaultClimbTrace = 0;
    }
    this.BaseChar.CharacterActorComponent.Entity.GetComponent(36).UpdateClimbDebug();
  }
  ChangeUpArriveClimbTrace() {
    switch (this.UpArriveClimbTrace) {
      case 0:
        this.UpArriveClimbTrace = 1;
        break;
      case 1:
        this.UpArriveClimbTrace = 2;
        break;
      default:
        this.UpArriveClimbTrace = 0;
    }
    this.BaseChar.CharacterActorComponent.Entity.GetComponent(36).UpdateClimbDebug();
  }
  ChangeClimbingTrace() {
    if (this.ClimbingTrace === 0) {
      this.ClimbingTrace = 1;
    } else {
      this.ClimbingTrace = 0;
    }
    this.BaseChar.CharacterActorComponent.Entity.GetComponent(36).UpdateClimbDebug();
  }
  ChangeNoTop() {
    this.NoTop = !this.NoTop;
    this.BaseChar.CharacterActorComponent.Entity.GetComponent(36).UpdateClimbDebug();
  }
  ReceiveBeginPlay() {
    this.BaseChar = this.GetOwner();
    this.OriginWalkableAngle = this.BaseChar.CharacterMovement.K2_GetWalkableFloorAngle();
    this.DebugRiseModeOn = false;
    this.SetComponentTickEnabled(this.DebugRiseModeOn);
  }
  ReceiveTick(t) {
    this.DebugRising(t);
  }
  ActivateDebugSpeed(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 39, "[Debug功能] 快速移动", ["功能激活", t]);
    }
    if (t) {
      this.BaseChar.CharacterMovement.SetWalkableFloorAngle(90);
      if (this.MaxFixSpeed === 0) {
        this.MaxFixSpeed = 5000;
      }
    } else {
      this.BaseChar.CharacterMovement.SetWalkableFloorAngle(this.OriginWalkableAngle);
      if (this.MaxFixSpeed !== 0) {
        this.MaxFixSpeed = 0;
      }
    }
  }
  DebugRising(t) {
    if (this.DebugRiseModeOn) {
      tmpVector.Reset();
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.BaseChar.CharacterActorComponent, tmpVector, this.TestRiseSpeed * t);
      this.BaseChar.CharacterActorComponent.AddActorWorldOffset(tmpVector.ToUeVector(), "DebugRising", false);
      this.BaseChar.CharacterActorComponent.MoveComp.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
    }
  }
  DebugDrawActivateArea() {
    var t = this.BaseChar.CharacterActorComponent.ActorLocation;
    var i = new UE.VectorDouble(t);
    i.Z += JUMPED_TURN_SPEED_THREADHOLD;
    UE.KismetSystemLibrary.D_DrawDebugCylinder(this, t, i, ACTIVE_DISTANCE);
  }
  SetDebugRiseEnable(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 39, "[Debug功能] 飞行", ["功能激活", t]);
    }
    if (this.DebugRiseModeOn !== t) {
      this.DebugRiseModeOn = t;
      this.SetComponentTickEnabled(t);
    }
  }
  SaveDebugPatrolPoint(t) {
    this.DebugPatrolPoints ||= new Array();
    this.DebugPatrolPoints.push(Vector_1.Vector.Create(t));
  }
  ClearDebugPatrolPoints() {
    if (this.DebugPatrolPoints) {
      this.DebugPatrolPoints.length = 0;
    }
  }
  DrawDebugPatrolPoints() {
    if (this.DebugPatrolPoints && this.DebugPatrolPoints.length !== 0) {
      var t = this.DebugPatrolPoints[0];
      UE.KismetSystemLibrary.D_DrawDebugSphere(this, t.ToUeVector(), 18, 12, ColorUtils_1.ColorUtils.LinearCyan, 60);
      var i = this.DebugPatrolPoints.length - 1;
      for (let t = 1; t < i; t++) {
        var s = this.DebugPatrolPoints[t];
        UE.KismetSystemLibrary.D_DrawDebugSphere(this, s.ToUeVector(), 6, 4, ColorUtils_1.ColorUtils.LinearGreen, 60);
      }
      if (i > 0) {
        t = this.DebugPatrolPoints[i];
        UE.KismetSystemLibrary.D_DrawDebugSphere(this, t.ToUeVector(), 18, 12, ColorUtils_1.ColorUtils.LinearYellow, 60);
      }
    }
  }
  SaveErrorNavigationPath(t, i, s) {
    this.DebugNavigationErrorPaths ||= new Array();
    var h = new NavigationErrorData();
    h.Start = Vector_1.Vector.Create(t);
    h.End = Vector_1.Vector.Create(i);
    h.Results = new Array();
    for (let t = 0, i = s.length; t < i; t++) {
      var e = s[t];
      var r = new UE.VectorDouble();
      r.Set(e.X, e.Y, e.Z);
      h.Results.push(r);
    }
    this.DebugNavigationErrorPaths.push(h);
  }
  DrawErrorNavigationPaths() {
    if (this.DebugNavigationErrorPaths) {
      for (let t = 0, i = this.DebugNavigationErrorPaths.length; t < i; t++) {
        var s = this.DebugNavigationErrorPaths[t];
        UE.KismetSystemLibrary.D_DrawDebugSphere(this, s.Start.ToUeVector(), 18, 12, ColorUtils_1.ColorUtils.LinearCyan, 60);
        for (let t = 0, i = s.Results.length; t < i; t++) {
          var h = s.Results[t];
          UE.KismetSystemLibrary.D_DrawDebugSphere(this, h, 6, 4, ColorUtils_1.ColorUtils.LinearRed, 60);
        }
        UE.KismetSystemLibrary.D_DrawDebugSphere(this, s.End.ToUeVector(), 18, 12, ColorUtils_1.ColorUtils.LinearYellow, 60);
      }
    }
  }
}
exports.default = TsCharacterDebugComponent;
//# sourceMappingURL=TsCharacterDebugComponent.js.map