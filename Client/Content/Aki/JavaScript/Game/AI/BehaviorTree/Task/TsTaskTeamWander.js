"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const THREADHOLD_ABS = 500;
const THREADHOLD_RATIO = 1.3;
const THREADHOLD_ARRIVE = 10;
const ALLY_DETECT_PERIOD = 1000;
const TRIGGER_PERIOD = 500;
const NAV_INTERVAL_TIME = 3;
class TsTaskTeamWander extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.AllyDetect = 0;
    this.TurnSpeed = 0;
    this.WalkOff = false;
    this.IsInitTsVariables = false;
    this.TsAllyDetect = 0;
    this.TsTurnSpeed = 0;
    this.TsWalkOff = false;
    this.CurrentMoveDirect = 4;
    this.NextDetectAllyTime = -0;
    this.Destination = Vector_1.Vector.Create();
    this.LastDestination = Vector_1.Vector.Create();
    this.TmpDestinationToTarget = Vector_1.Vector.Create();
    this.TmpSelfToTarget = Vector_1.Vector.Create();
    this.TmpDirection = Vector_1.Vector.Create();
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.BlockDirectionsCache = new Set();
    this.NextTriggerTime = -0;
    this.FirstFrame = false;
    this.NavigationInterval = 0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsAllyDetect = 0;
    this.TsTurnSpeed = 0;
    this.TsWalkOff = false;
    this.CurrentMoveDirect = 4;
    this.NextDetectAllyTime = -0;
    this.Destination = Vector_1.Vector.Create();
    this.LastDestination = Vector_1.Vector.Create();
    this.TmpDestinationToTarget = Vector_1.Vector.Create();
    this.TmpSelfToTarget = Vector_1.Vector.Create();
    this.TmpDirection = Vector_1.Vector.Create();
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.BlockDirectionsCache = new Set();
    this.NextTriggerTime = -0;
    this.FirstFrame = false;
    this.NavigationInterval = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsAllyDetect = this.AllyDetect;
      this.TsTurnSpeed = this.TurnSpeed;
      this.TsWalkOff = this.WalkOff;
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    this.CurrentMoveDirect = 4;
    if (t instanceof TsAiController_1.default) {
      t = t.AiController;
      if (!this.TsWalkOff) {
        t.CharActorComp.Entity.GetComponent(45)?.SetWalkOffLedgeRecord(false);
      }
      t.CharActorComp.Entity.CheckGetComponent(176).SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
      if (!this.Destination) {
        this.Destination = Vector_1.Vector.Create();
        this.LastDestination = Vector_1.Vector.Create();
      }
      if (!this.TmpDestinationToTarget) {
        this.TmpDestinationToTarget = Vector_1.Vector.Create();
        this.TmpSelfToTarget = Vector_1.Vector.Create();
        this.TmpVector = Vector_1.Vector.Create();
        this.TmpVector2 = Vector_1.Vector.Create();
        this.TmpDirection = Vector_1.Vector.Create();
        this.TmpQuat = Quat_1.Quat.Create();
      }
      this.BlockDirectionsCache ||= new Set();
      this.NavigationInterval = NAV_INTERVAL_TIME;
      this.NextDetectAllyTime = 0;
      this.NextTriggerTime = Time_1.Time.Now;
      this.FirstFrame = true;
    }
  }
  ReceiveTickAI(t, i, s) {
    this.NavigationInterval += s;
    if (t instanceof TsAiController_1.default) {
      var s = t.AiController;
      var e = s.AiHateList.GetCurrentTarget();
      if (e?.Valid) {
        e = e.Entity.GetComponent(3);
        if (e) {
          if (Time_1.Time.Now < this.NextTriggerTime) {
            e.ActorLocationProxy.Subtraction(s.CharActorComp.ActorLocationProxy, this.TmpSelfToTarget);
            this.TmpDirection.DeepCopy(this.TmpSelfToTarget);
            const l = s.CharActorComp.Entity.GetComponent(45);
            if (!l || !l.MoveController.IsMovingToLocation()) {
              this.SetInputParams(s.CharActorComp, this.TmpSelfToTarget, this.TmpDirection);
            }
          } else {
            this.NextTriggerTime = Time_1.Time.Now + TRIGGER_PERIOD;
            var h = s.AiTeam.GetAiTeamAreaMemberData(s);
            if (h && !(h.AreaIndex < 0)) {
              if (this.FirstFrame) {
                this.FirstFrame = false;
                if (AiContollerLibrary_1.AiControllerLibrary.InTeamArea(s, h)) {
                  this.Finish(true);
                  return;
                }
              } else if (AiContollerLibrary_1.AiControllerLibrary.InTeamArea(s, h, 0.5)) {
                this.Finish(true);
                return;
              }
              var r = s.CharActorComp;
              var o = e.ActorLocationProxy;
              var a = (h.CachedControllerYaw + h.AngleCenter) * MathUtils_1.MathUtils.DegToRad;
              this.TmpVector.Set(Math.cos(a) * h.DistanceCenter, Math.sin(a) * h.DistanceCenter, 0);
              h.Group.GravityQuat.RotateVector(this.TmpVector, this.Destination);
              this.Destination.AdditionEqual(h.CachedTargetLocation);
              GravityUtils_1.GravityUtils.SetZnInGravityForActor(r, this.Destination, GravityUtils_1.GravityUtils.GetZnInGravityForActor(r, r.ActorLocationProxy));
              o.Subtraction(s.CharActorComp.ActorLocationProxy, this.TmpSelfToTarget);
              this.TmpDirection.DeepCopy(this.TmpSelfToTarget);
              o.Subtraction(this.Destination, this.TmpDestinationToTarget);
              GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(r, this.TmpSelfToTarget);
              GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(r, this.TmpDestinationToTarget);
              var a = this.TmpSelfToTarget.Size();
              var o = this.TmpDestinationToTarget.Size();
              if (a < MathUtils_1.MathUtils.KindaSmallNumber) {
                r.ActorForwardProxy.Multiply(-1, this.TmpSelfToTarget);
              } else {
                this.TmpSelfToTarget.DivisionEqual(a);
              }
              if (o < MathUtils_1.MathUtils.KindaSmallNumber) {
                r.ActorForwardProxy.Multiply(-1, this.TmpDestinationToTarget);
              } else {
                this.TmpDestinationToTarget.DivisionEqual(o);
              }
              var _ = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(r, this.TmpDestinationToTarget, this.TmpSelfToTarget) * MathUtils_1.MathUtils.DegToRad;
              var a = a - o;
              var o = o * _;
              if (Time_1.Time.Now > this.NextDetectAllyTime) {
                this.NextDetectAllyTime = Time_1.Time.Now + ALLY_DETECT_PERIOD;
                AiContollerLibrary_1.AiControllerLibrary.AllyBlockDirections(s, this.TmpSelfToTarget, this.TsAllyDetect, this.BlockDirectionsCache);
              }
              this.UpdateCurrentMoveDirection(a, o, h, this.BlockDirectionsCache, r.ActorLocationProxy, this.TmpSelfToTarget);
              if (this.NavigationInterval > NAV_INTERVAL_TIME) {
                this.NavigationInterval = 0;
                if (this.SetMoveToLocation(this.Destination, s.CharActorComp, e)) {
                  return;
                }
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("AI", 42, "TeamWander 寻路失败", ["EntityId", r.Entity.Id]);
                }
                this.StopMoveToLocation(s.CharActorComp);
              }
              const l = r.Entity.GetComponent(45);
              if (!l || !l.MoveController.IsMovingToLocation()) {
                this.SetInputParams(r, this.TmpSelfToTarget, this.TmpDirection);
              }
            }
          }
        } else {
          this.Finish(true);
        }
      } else {
        this.Finish(true);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.Finish(false);
    }
  }
  UpdateCurrentMoveDirection(s, e, t, h, r, o) {
    if (s > t.MaxDistanceOffset) {
      this.CurrentMoveDirect = this.GetMoveDirectionForwardBackward(s);
    } else if (e > t.MaxAngleOffset * MathUtils_1.MathUtils.DegToRad * t.DistanceCenter) {
      this.CurrentMoveDirect = this.GetMoveDirectionRightLeft(e);
    } else {
      let [t, i] = this.GetMoveDirection(s, e);
      if (h.has(i) || AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirectionE(this.AIOwner, r, o, i)) {
        i = 4;
      }
      if (h.has(t) || AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirectionE(this.AIOwner, r, o, t)) {
        t = i;
        i = 4;
      }
      if (i !== 4 && this.CurrentMoveDirect === i) {
        if (this.CurrentMoveDirect === 0 || this.CurrentMoveDirect === 1) {
          if (this.NeedChangeDirect(s, e)) {
            this.CurrentMoveDirect = t;
          }
        }
      } else {
        this.CurrentMoveDirect = t;
      }
    }
  }
  StopMoveToLocation(t) {
    t = t.Entity.GetComponent(45);
    if (t && t.MoveController.IsMovingToLocation()) {
      t?.MoveController.StopMoveToLocation();
    }
    this.LastDestination?.Reset();
  }
  SetMoveToLocation(t, i, s) {
    this.TmpVector2.DeepCopy(t);
    t = i.Entity.GetComponent(45);
    if (!t) {
      return false;
    }
    if ((!this.LastDestination.IsNearlyZero() || Vector_1.Vector.Dist(this.LastDestination, this.TmpVector2) < 100) && t.MoveController.IsMovingToLocation()) {
      this.LastDestination.DeepCopy(this.TmpVector2);
      return true;
    }
    this.LastDestination.DeepCopy(this.TmpVector2);
    i = (this.CurrentMoveDirect === 3 || this.CurrentMoveDirect === 2) && i.WanderDirectionType === 1;
    return t.MoveController.NavigateMoveToLocation({
      Position: this.TmpVector2,
      UseNearestDirection: !i,
      FaceToPosition: i ? undefined : s.ActorLocationProxy,
      ResetCondition: () => false
    }, true, false);
  }
  SetInputParams(t, i, s) {
    if (this.CurrentMoveDirect === 4) {
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner);
    } else {
      this.TmpVector.DeepCopy(s);
      GravityUtils_1.GravityUtils.TurnVectorByDirectionInGravityForActor(t, this.TmpVector, this.CurrentMoveDirect);
      if (t.Entity.GetComponent(102)?.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk) {
        AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(t, this.TmpVector, this.TsTurnSpeed);
        t.SetInputDirect(t.ActorForwardProxy);
      } else {
        AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(t, this.TmpVector, this.TmpQuat, this.TmpVector2, this.TsTurnSpeed, true, i);
      }
    }
  }
  GetMoveDirection(t, i) {
    if (Math.abs(t) > Math.abs(i)) {
      return [this.GetMoveDirectionForwardBackward(t), this.GetMoveDirectionRightLeft(i)];
    } else {
      return [this.GetMoveDirectionRightLeft(i), this.GetMoveDirectionForwardBackward(t)];
    }
  }
  GetMoveDirectionForwardBackward(t) {
    if (Math.abs(t) < THREADHOLD_ARRIVE) {
      return 4;
    } else if (t > 0) {
      return 0;
    } else {
      return 1;
    }
  }
  GetMoveDirectionRightLeft(t) {
    if (Math.abs(t) < THREADHOLD_ARRIVE) {
      return 4;
    } else if (t > 0) {
      return 2;
    } else {
      return 3;
    }
  }
  NeedChangeDirect(t, i) {
    t = Math.abs(t);
    return t < THREADHOLD_ARRIVE || (i = Math.abs(i), t * THREADHOLD_RATIO < i && t + THREADHOLD_ABS < i);
  }
  OnClear() {
    var t;
    if (this.AIOwner instanceof TsAiController_1.default) {
      (t = this.AIOwner.AiController.CharActorComp.Entity.GetComponent(45))?.MoveController.StopMoveToLocation();
      this.LastDestination.Reset();
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner);
      if (!this.TsWalkOff) {
        t?.SetWalkOffLedgeRecord(true);
      }
    }
  }
}
exports.default = TsTaskTeamWander;
//# sourceMappingURL=TsTaskTeamWander.js.map