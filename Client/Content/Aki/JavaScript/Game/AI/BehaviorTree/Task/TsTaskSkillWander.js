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
const AiLibrary_1 = require("../../Common/AiLibrary");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const THRESHOLD_RATE = 1 / 3;
const OTHER_THRESHOLD_RATE = 1 - THRESHOLD_RATE;
const NAV_INTERVAL_TIME = 3;
class TsTaskSkillWander extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.ForwardFirst = false;
    this.CheckSkillPeriod = 0;
    this.MoveState = 0;
    this.SkillType = 0;
    this.DebugLog = false;
    this.WalkOff = false;
    this.IsInitTsVariables = false;
    this.TsForwardFirst = false;
    this.TsCheckSkillPeriod = 0;
    this.TsMoveState = 0;
    this.TsSkillType = 0;
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpSelfToTarget = Vector_1.Vector.Create();
    this.TmpForward = Vector_1.Vector.Create();
    this.TmpBackward = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.LastDestination = Vector_1.Vector.Create();
    this.PreForward = false;
    this.TsDebugLog = false;
    this.TsWalkOff = false;
    this.NavigationInterval = 0;
    this.NextCheckSkillTime = -0;
    this.SelectedSkillPrecondition = undefined;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsForwardFirst = false;
    this.TsCheckSkillPeriod = 0;
    this.TsMoveState = 0;
    this.TsSkillType = 0;
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpSelfToTarget = Vector_1.Vector.Create();
    this.TmpForward = Vector_1.Vector.Create();
    this.TmpBackward = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.LastDestination = Vector_1.Vector.Create();
    this.PreForward = false;
    this.TsDebugLog = false;
    this.TsWalkOff = false;
    this.NavigationInterval = 0;
    this.NextCheckSkillTime = -0;
    this.SelectedSkillPrecondition = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsForwardFirst = this.ForwardFirst;
      this.TsCheckSkillPeriod = this.CheckSkillPeriod;
      this.TsMoveState = this.MoveState === 2 ? CharacterUnifiedStateTypes_1.ECharMoveState.Run : CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
      this.TsSkillType = this.SkillType;
      this.TsDebugLog = this.DebugLog;
      this.TsWalkOff = this.WalkOff;
      this.TmpVector = Vector_1.Vector.Create();
      this.TmpSelfToTarget = Vector_1.Vector.Create();
      this.TmpForward = Vector_1.Vector.Create();
      this.TmpBackward = Vector_1.Vector.Create();
      this.TmpVector2 = Vector_1.Vector.Create();
      this.TmpQuat = Quat_1.Quat.Create();
      this.LastDestination = Vector_1.Vector.Create();
    }
  }
  ReceiveExecuteAI(t, i) {
    this.NavigationInterval = NAV_INTERVAL_TIME;
    this.InitTsVariables();
    t = t.AiController;
    if (t) {
      if (!this.TsWalkOff) {
        t.CharActorComp.Entity.GetComponent(187)?.SetWalkOffLedgeRecord(false);
      }
      t.CharActorComp.Entity.CheckGetComponent(184)?.SetMoveState(this.TsMoveState);
    }
  }
  ReceiveTickAI(t, i, s) {
    this.NavigationInterval += s;
    s = t.AiController;
    if (s) {
      var e = s.AiHateList.GetCurrentTarget();
      if (e?.Valid) {
        var h = s.CharActorComp;
        var e = e.Entity.GetComponent(3);
        MathUtils_1.MathUtils.InverseTransformPositionNoScale(e.FloorLocation, e.ActorRotationProxy, h.FloorLocation, this.TmpVector);
        var r = MathUtils_1.MathUtils.GetAngleByVector2D(this.TmpVector);
        e.FloorLocation.Subtraction(h.FloorLocation, this.TmpSelfToTarget);
        var o = GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(h, this.TmpSelfToTarget);
        var a = this.TmpSelfToTarget.Size();
        var _ = Math.max(a - h.ScaledRadius - e.ScaledRadius, MathUtils_1.MathUtils.SmallNumber);
        this.TmpVector.DeepCopy(this.TmpSelfToTarget);
        this.TmpVector.DivisionEqual(a);
        var a = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(h, h.ActorForwardProxy, this.TmpVector);
        if (!this.NextCheckSkillTime || this.NextCheckSkillTime < Time_1.Time.WorldTime) {
          this.NextCheckSkillTime = Time_1.Time.WorldTime + this.TsCheckSkillPeriod;
          if (!this.FindArea(s, _, r, o, this.TmpVector)) {
            this.Finish(false);
            return;
          }
        } else if (!this.SelectedSkillPrecondition) {
          this.Finish(false);
          return;
        }
        r = MathUtils_1.MathUtils.InRange(_, this.SelectedSkillPrecondition.DistanceRange);
        o = MathUtils_1.MathUtils.InRange(a, this.SelectedSkillPrecondition.AngleRange);
        if (r && o) {
          this.Finish(true);
        } else {
          var a = s.AiWanderInfos.GetCurrentBattleWander();
          var s = this.PreForward ? this.SelectedSkillPrecondition.DistanceRange.Min * OTHER_THRESHOLD_RATE + this.SelectedSkillPrecondition.DistanceRange.Max * THRESHOLD_RATE : this.SelectedSkillPrecondition.DistanceRange.Min * THRESHOLD_RATE + this.SelectedSkillPrecondition.DistanceRange.Max * OTHER_THRESHOLD_RATE;
          var l = h.Entity.GetComponent(109);
          let t = this.TsMoveState;
          if (r && !o || _ < s) {
            t = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
          }
          if (l?.MoveState !== t) {
            l?.SetMoveState(t);
          }
          let i = a.RunTurnSpeed;
          this.TmpVector.DeepCopy(this.TmpSelfToTarget);
          if (_ < s) {
            i = t === CharacterUnifiedStateTypes_1.ECharMoveState.Run ? i : a.TurnSpeeds[1];
            this.TmpVector.UnaryNegation(this.TmpVector);
            this.PreForward = false;
          } else {
            i = t === CharacterUnifiedStateTypes_1.ECharMoveState.Run ? i : a.TurnSpeeds[0];
            this.PreForward = true;
          }
          GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(h, this.TmpVector);
          if (!r && this.NavigationInterval > NAV_INTERVAL_TIME) {
            this.NavigationInterval = 0;
            if (this.SetMoveToLocation(this.TmpVector, h, i, e.ActorLocationProxy)) {
              return;
            }
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("AI", 42, "SkillWander 寻路失败", ["EntityId", h.Entity.Id]);
            }
            this.StopMoveToLocation(h);
          }
          o = h.Entity.GetComponent(46);
          if (!o || !o.MoveController.IsMovingToLocation()) {
            if (l?.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk) {
              AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(h, this.TmpVector, i);
              h.SetInputDirect(h.ActorForwardProxy);
            } else {
              AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(h, this.TmpVector, this.TmpQuat, this.TmpVector2, i, true, this.TmpSelfToTarget);
            }
          }
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
  StopMoveToLocation(t) {
    t = t.Entity.GetComponent(46);
    if (t && t.MoveController.IsMovingToLocation()) {
      t?.MoveController.StopMoveToLocation();
    }
    this.LastDestination?.Reset();
  }
  SetMoveToLocation(t, i, s, e) {
    this.TmpVector2.DeepCopy(t);
    this.TmpVector2.AdditionEqual(i.ActorLocationProxy);
    t = i.Entity.GetComponent(46);
    return !!t && ((!this.LastDestination.IsNearlyZero() || Vector_1.Vector.Dist(this.LastDestination, this.TmpVector2) < 100) && t.MoveController.IsMovingToLocation() ? (this.LastDestination.DeepCopy(this.TmpVector2), true) : (this.LastDestination.DeepCopy(this.TmpVector2), t.MoveController.NavigateMoveToLocation({
      Position: this.TmpVector2,
      TurnSpeed: s,
      UseNearestDirection: true,
      FaceToPosition: e,
      ResetCondition: () => false
    }, true, false)));
  }
  FindArea(t, i, s, e, h) {
    var r = t.CharAiDesignComp.Entity.CheckGetComponent(41);
    var o = r.Entity.GetComponent(215);
    this.TmpForward.DeepCopy(h);
    GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(t.CharActorComp, this.TmpForward);
    this.TmpForward.Normalize();
    this.TmpForward.UnaryNegation(this.TmpBackward);
    let a = MathUtils_1.MathUtils.MaxFloat;
    let _ = MathUtils_1.MathUtils.MaxFloat;
    this.SelectedSkillPrecondition = undefined;
    let l = 4;
    let n = MathUtils_1.MathUtils.MaxFloat;
    if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AI", 6, "SkillWander Find Area", ["Owner", t.CharActorComp.Actor.GetName()], ["BT", this.TreeAsset.GetName()]);
    }
    for (const d of t.AiSkill.ActiveSkillGroup) {
      for (const A of t.AiSkill.BaseSkill.RandomSkills[d].ArrayInt) {
        var c = t.AiSkill.SkillInfos.get(A);
        if (c) {
          var T;
          var L = t.AiSkill.SkillPreconditionMap.get(c.SkillPreconditionId);
          if (L) {
            if (!(c.SkillWeight <= 0) && AiLibrary_1.AiLibrary.IsSkillAvailable(t, A, r, o, this.TsSkillType, s, e, 0, 0, false, this.TsDebugLog)) {
              if (i < L.DistanceRange.Min) {
                if (this.TsForwardFirst && l === 0) {
                  if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("AI", 6, "    Failed: ForwardFirst");
                  }
                } else {
                  T = L.DistanceRange.Min - i;
                  if (n < T || _ < T) {
                    if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
                      Log_1.Log.Info("AI", 6, "    Failed: BackwardBlock or MinDistance", ["MoveDist", T], ["MinDistance", n], ["MinBackwardBlock", _]);
                    }
                  } else if (AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirection(this.AIOwner, t.CharActorComp.ActorLocationProxy, this.TmpBackward, T)) {
                    _ = T;
                    if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
                      Log_1.Log.Info("AI", 6, "    Failed: BackwardBlock", ["MoveDist", T]);
                    }
                  } else {
                    l = 1;
                    n = T;
                    this.SelectedSkillPrecondition = L;
                  }
                }
              } else {
                if (!(i > L.DistanceRange.Max)) {
                  this.SelectedSkillPrecondition = L;
                  break;
                }
                if (this.TsForwardFirst || l !== 1) {
                  T = i - L.DistanceRange.Max;
                  if (n < T || a < T) {
                    if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
                      Log_1.Log.Info("AI", 6, "    Failed: ForwardBlock or MinDistance", ["MoveDist", T], ["MinDistance", n], ["MinForwardBlock", a]);
                    }
                  } else if (AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirection(this.AIOwner, t.CharActorComp.ActorLocationProxy, this.TmpForward, T)) {
                    a = T;
                    if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
                      Log_1.Log.Info("AI", 6, "    Failed: ForwardBlock", ["MoveDist", T]);
                    }
                  } else {
                    l = 0;
                    n = T;
                    this.SelectedSkillPrecondition = L;
                  }
                } else if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("AI", 6, "    Failed: BackwardFirst");
                }
              }
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("BehaviorTree", 6, "没有配置技能前置条件", ["Id", c.SkillPreconditionId]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 6, "没有配置技能库", ["Id", A]);
        }
      }
    }
    return this.SelectedSkillPrecondition !== undefined;
  }
  OnClear() {
    var t;
    if (this.AIOwner instanceof TsAiController_1.default) {
      (t = this.AIOwner.AiController.CharActorComp.Entity.GetComponent(46))?.MoveController.StopMoveToLocation();
      this.LastDestination?.Reset();
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner);
      if (!this.TsWalkOff) {
        t?.SetWalkOffLedgeRecord(true);
      }
    }
  }
}
exports.default = TsTaskSkillWander;
//# sourceMappingURL=TsTaskSkillWander.js.map