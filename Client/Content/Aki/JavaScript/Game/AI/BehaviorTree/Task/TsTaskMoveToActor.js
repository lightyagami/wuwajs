"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
    this.IsInitTsVariables = false;
    this.TsMoveState = 0;
    this.TsNavigationOn = false;
    this.TsBlackboardKeyActor = "";
    this.TsEndDistance = 0;
    this.TsTurnSpeed = 0;
    this.TsFixPeriod = 0;
    this.TsWalkOff = false;
    this.SelectedTargetLocation = undefined;
    this.FoundPath = false;
    this.NavigationPath = undefined;
    this.CurrentNavigationIndex = 0;
    this.NextCheckTime = -0;
    this.CacheVector = undefined;
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
    this.SelectedTargetLocation = undefined;
    this.FoundPath = false;
    this.NavigationPath = undefined;
    this.CurrentNavigationIndex = 0;
    this.NextCheckTime = -0;
    this.CacheVector = undefined;
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
      this.CacheVector = Vector_1.Vector.Create();
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var e = t.AiController;
    if (e) {
      var s = e.CharActorComp;
      if (!this.TsWalkOff) {
        s.Entity.GetComponent(45)?.SetWalkOffLedgeRecord(false);
      }
      var r = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(e.CharAiDesignComp.Entity.Id, this.TsBlackboardKeyActor);
      var h = EntitySystem_1.EntitySystem.Get(r);
      if (r && h?.Valid) {
        this.SelectedTargetLocation = AiContollerLibrary_1.AiControllerLibrary.GetLocationFromEntity(h);
        var o = e.CharAiDesignComp?.Entity.GetComponent(176);
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
        this.CacheVector.DeepCopy(s.ActorLocation);
        if (s.Entity.GetComponent(102)?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
          this.CacheVector.Z -= s.HalfHeight;
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
  ReceiveTickAI(t, i, e) {
    if (t instanceof TsAiController_1.default) {
      var s = t.AiController;
      var r = s.CharActorComp;
      var h = r.ActorLocationProxy;
      if (Time_1.Time.WorldTime > this.NextCheckTime) {
        var o = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(s.CharAiDesignComp.Entity.Id, this.TsBlackboardKeyActor);
        var a = EntitySystem_1.EntitySystem.Get(o);
        if (!o || !a?.Valid) {
          this.Finish(false);
          return;
        }
        o = AiContollerLibrary_1.AiControllerLibrary.GetLocationFromEntity(a);
        this.NextCheckTime = Time_1.Time.WorldTime + this.TsFixPeriod;
        if (Vector_1.Vector.Dist(o, this.SelectedTargetLocation) > NAVIGATION_COMPLETE_DISTANCE) {
          this.SelectedTargetLocation = o;
          this.CacheVector.DeepCopy(h);
          if (r.Entity.GetComponent(102)?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
            this.CacheVector.Z -= r.HalfHeight;
          }
          this.FindNewPath(t, this.CacheVector.ToUeVector());
        }
      }
      if (this.FoundPath) {
        a = this.TsNavigationOn ? Vector_1.Vector.Create(this.NavigationPath[this.CurrentNavigationIndex]) : this.SelectedTargetLocation;
        o = Vector_1.Vector.Create(a);
        o.Subtraction(h, o);
        o.Z = 0;
        t = o.Size();
        if ((!this.TsNavigationOn || this.CurrentNavigationIndex === this.NavigationPath.length - 1) && t < this.TsEndDistance) {
          this.Finish(true);
        } else {
          if (t < NAVIGATION_COMPLETE_DISTANCE) {
            this.CurrentNavigationIndex++;
          }
          AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(r, a, this.TsTurnSpeed);
          o.DivisionEqual(t);
          r.SetInputDirect(o, true);
          var l = s.CharAiDesignComp?.Entity.GetComponent(176);
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
        this.AIOwner.AiController.CharActorComp.Entity.GetComponent(45)?.SetWalkOffLedgeRecord(true);
      }
    }
  }
}
exports.default = TsTaskMoveToActor;
//# sourceMappingURL=TsTaskMoveToActor.js.map