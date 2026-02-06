"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const NAVIGATION_COMPLETE_DISTANCE = 10;
const DEFAULT_MAX_EXECUTION_TIME = 10000;
class TsTaskMoveToActor extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.MoveState = 0;
    this.NavigationOn = false;
    this.BlackboardKeyActor = "";
    this.EndDistance = 0;
    this.TurnSpeed = 0;
    this.FixPeriod = 0;
    this.WalkOff = false;
    this.UseBounds = false;
    this.EndDistanceAllPoints = false;
    this.MaxExecuteTime = DEFAULT_MAX_EXECUTION_TIME;
    this.IsInitTsVariables = false;
    this.TsMoveState = 0;
    this.TsNavigationOn = false;
    this.TsBlackboardKeyActor = "";
    this.TsEndDistance = 0;
    this.TsTurnSpeed = 0;
    this.TsFixPeriod = 0;
    this.TsWalkOff = false;
    this.TsUseBounds = false;
    this.SelectedTargetLocation = undefined;
    this.FoundPath = false;
    this.NavigationPath = undefined;
    this.CurrentNavigationIndex = 0;
    this.NextCheckTime = -0;
    this.CacheVector = undefined;
    this.CacheVector2 = undefined;
    this.ExecuteTimeStamp = 0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsMoveState = 0;
    this.TsNavigationOn = false;
    this.TsBlackboardKeyActor = "";
    this.TsEndDistance = 0;
    this.TsTurnSpeed = 0;
    this.TsFixPeriod = 0;
    this.TsWalkOff = false;
    this.TsUseBounds = false;
    this.SelectedTargetLocation = undefined;
    this.FoundPath = false;
    this.NavigationPath = undefined;
    this.CurrentNavigationIndex = 0;
    this.NextCheckTime = -0;
    this.CacheVector = undefined;
    this.CacheVector2 = undefined;
    this.ExecuteTimeStamp = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsMoveState = this.MoveState;
      this.TsNavigationOn = this.NavigationOn;
      this.TsBlackboardKeyActor = this.BlackboardKeyActor;
      this.TsEndDistance = this.EndDistance;
      this.TsTurnSpeed = this.TurnSpeed;
      this.TsFixPeriod = this.FixPeriod;
      this.TsWalkOff = this.WalkOff;
      this.TsUseBounds = this.UseBounds;
      this.SelectedTargetLocation = Vector_1.Vector.Create();
      this.CacheVector = Vector_1.Vector.Create();
      this.CacheVector2 = Vector_1.Vector.Create();
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s = t.AiController;
    if (s) {
      this.ExecuteTimeStamp = Time_1.Time.WorldTime;
      var e = s.CharActorComp;
      if (!this.TsWalkOff) {
        e.Entity.GetComponent(48)?.SetWalkOffLedgeRecord(false);
      }
      var h = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(s.CharAiDesignComp.Entity.Id, this.TsBlackboardKeyActor);
      var r = EntitySystem_1.EntitySystem.Get(h);
      if (h && r?.Valid) {
        this.SelectedTargetLocation.DeepCopy(AiContollerLibrary_1.AiControllerLibrary.GetLocationFromEntity(r));
        if (this.TsUseBounds) {
          if ((h = r?.GetComponent(1))?.Valid && (r = h.Owner) && r?.IsValid()) {
            h = (0, puerts_1.$ref)(undefined);
            r.D_GetActorBounds(true, undefined, h, true);
            r = (0, puerts_1.$unref)(h).Size();
            this.TsEndDistance = r;
          }
        } else {
          this.TsEndDistance = this.EndDistance + e.ScaledRadius;
        }
        var o = s.CharAiDesignComp?.Entity.GetComponent(186);
        if (o?.Valid && o.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
          switch (this.TsMoveState) {
            case 1:
              o.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
              break;
            case 2:
              o.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
              break;
            case 3:
              o.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Sprint);
          }
        }
        this.NextCheckTime = Time_1.Time.WorldTime + this.TsFixPeriod;
        this.CacheVector.DeepCopy(e.ActorLocation);
        if (e.Entity.GetComponent(111)?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
          this.CacheVector.Z -= e.HalfHeight;
        }
        this.FindNewPath(t, this.CacheVector.ToUeVector());
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("BehaviorTree", 6, "TsTaskMoveToEntity没有获取到目标EntityId", ["BehaviorTree", this.TreeAsset.GetName()], ["TargetKey", this.TsBlackboardKeyActor]);
        }
        this.FoundPath = false;
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  ReceiveTickAI(i, t, s) {
    if (i instanceof TsAiController_1.default) {
      if (Time_1.Time.WorldTime > this.ExecuteTimeStamp + this.MaxExecuteTime) {
        this.Finish(false);
      } else {
        var e = i.AiController;
        var h = e.CharActorComp;
        var r = h.ActorLocationProxy;
        if (Time_1.Time.WorldTime > this.NextCheckTime) {
          var o = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(e.CharAiDesignComp.Entity.Id, this.TsBlackboardKeyActor);
          var a = EntitySystem_1.EntitySystem.Get(o);
          if (!o || !a?.Valid) {
            this.Finish(false);
            return;
          }
          o = AiContollerLibrary_1.AiControllerLibrary.GetLocationFromEntity(a);
          this.NextCheckTime = Time_1.Time.WorldTime + this.TsFixPeriod;
          if (Vector_1.Vector.Dist(o, this.SelectedTargetLocation) > NAVIGATION_COMPLETE_DISTANCE) {
            this.SelectedTargetLocation.DeepCopy(o);
            this.CacheVector.DeepCopy(r);
            if (h.Entity.GetComponent(111)?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
              this.CacheVector.Z -= h.HalfHeight;
            }
            this.FindNewPath(i, this.CacheVector.ToUeVector());
          }
        }
        if (this.FoundPath) {
          this.CacheVector.DeepCopy(this.SelectedTargetLocation);
          this.CacheVector.Subtraction(r, this.CacheVector2);
          a = this.CacheVector2.Size();
          let t = this.SelectedTargetLocation;
          if (this.TsNavigationOn && this.NavigationPath && this.CurrentNavigationIndex < this.NavigationPath.length) {
            this.CacheVector.DeepCopy(this.NavigationPath[this.CurrentNavigationIndex]);
            t = this.CacheVector;
          }
          this.CacheVector2.DeepCopy(t);
          o = this.CacheVector2;
          o.Subtraction(r, o);
          o.Z = 0;
          i = o.Size();
          if ((!this.TsNavigationOn || this.CurrentNavigationIndex === this.NavigationPath.length - 1 || this.EndDistanceAllPoints) && a < this.TsEndDistance) {
            this.Finish(true);
          } else {
            if (i < NAVIGATION_COMPLETE_DISTANCE + h.ScaledRadius) {
              this.CurrentNavigationIndex++;
            }
            AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(h, t, this.TsTurnSpeed);
            o.DivisionEqual(i);
            h.SetInputDirect(o, true);
            var l = e.CharAiDesignComp?.Entity.GetComponent(186);
            if (l?.Valid) {
              switch (this.TsMoveState) {
                case 1:
                  l.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
                  break;
                case 2:
                  l.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
                  break;
                case 3:
                  l.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Sprint);
              }
            }
          }
        } else {
          this.Finish(false);
        }
      }
    } else {
      this.Finish(false);
    }
  }
  FindNewPath(t, i) {
    if (this.TsNavigationOn) {
      this.NavigationPath ||= new Array();
      this.FoundPath = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(t, i, this.SelectedTargetLocation.ToUeVector(), this.NavigationPath);
      this.CurrentNavigationIndex = 1;
    } else {
      this.FoundPath = true;
    }
  }
  OnClear() {
    if (this.AIOwner instanceof TsAiController_1.default) {
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner);
      if (!this.TsWalkOff) {
        this.AIOwner.AiController.CharActorComp.Entity.GetComponent(48)?.SetWalkOffLedgeRecord(true);
      }
    }
  }
}
exports.default = TsTaskMoveToActor;
//# sourceMappingURL=TsTaskMoveToActor.js.map