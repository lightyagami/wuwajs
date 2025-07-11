"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const AnimalMoveToController_1 = require("../../../../NewWorld/Character/Animal/Controller/AnimalMoveToController");
const CharacterUnifiedStateTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
const DEFAULT_DISTANCE_ERROR_THRESHOLD = 100;
class TsTaskAnimalMoveTo extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.MoveState = 2;
    this.NavigationOn = false;
    this.TargetLocation = "";
    this.TurnSpeed = 0;
    this.LimitTime = 0;
    this.RootMotion = true;
    this.DistanceErrorThreshold = 0;
    this.IsInitTsVariables = false;
    this.TsLimitTime = -0;
    this.TsTurnSpeed = 0;
    this.TsMoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
    this.TsNavigationOn = false;
    this.TsTargetLocation = "";
    this.TsRootMotion = false;
    this.TsDistanceErrorThreshold = 0;
    this.AnimalMoveToController = undefined;
    this.TargetCache = undefined;
    this.EndTime = -0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsLimitTime = -0;
    this.TsTurnSpeed = 0;
    this.TsMoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
    this.TsNavigationOn = false;
    this.TsTargetLocation = "";
    this.TsRootMotion = false;
    this.TsDistanceErrorThreshold = 0;
    this.AnimalMoveToController = undefined;
    this.TargetCache = undefined;
    this.EndTime = -0;
  }
  static InitStaticVariables() {
    TsTaskAnimalMoveTo.AnimalValidMoveState = new Set();
    TsTaskAnimalMoveTo.AnimalValidMoveState.add(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
    TsTaskAnimalMoveTo.AnimalValidMoveState.add(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
    TsTaskAnimalMoveTo.AnimalValidMoveState.add(CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim);
    TsTaskAnimalMoveTo.StaticVariablesInited = true;
  }
  InitTsVariables(i) {
    if (!this.IsInitTsVariables) {
      this.TsMoveState = this.MoveState;
      this.TsNavigationOn = this.NavigationOn;
      this.TsTargetLocation = this.TargetLocation;
      this.TsLimitTime = this.LimitTime * TimeUtil_1.TimeUtil.InverseMillisecond;
      this.TsTurnSpeed = this.TurnSpeed;
      this.TargetCache = Vector_1.Vector.Create();
      this.TsRootMotion = this.RootMotion;
      this.TsDistanceErrorThreshold = this.TsMoveState === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim ? this.DistanceErrorThreshold : Math.max(DEFAULT_DISTANCE_ERROR_THRESHOLD, this.DistanceErrorThreshold);
      this.IsInitTsVariables = true;
    }
  }
  ReceiveExecuteAI(i, t) {
    if (!TsTaskAnimalMoveTo.StaticVariablesInited) {
      TsTaskAnimalMoveTo.InitStaticVariables();
    }
    var e;
    var s = i.AiController;
    if (s) {
      if ((s = s.CharActorComp?.Entity)?.Valid) {
        this.InitTsVariables(s);
        if (TsTaskAnimalMoveTo.AnimalValidMoveState.has(this.TsMoveState)) {
          e = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(s.Id, this.TsTargetLocation);
          this.TargetCache.DeepCopy(e);
          this.AnimalMoveToController = new AnimalMoveToController_1.AnimalMoveToController(s);
          this.AnimalMoveToController.Init(this.TsMoveState, this.TsRootMotion);
          this.AnimalMoveToController.Start(this.TargetCache, this.TsNavigationOn, this.TsTurnSpeed, this.TsDistanceErrorThreshold);
          this.EndTime = Number.MAX_VALUE;
          if (this.TsLimitTime > 0) {
            this.EndTime = Time_1.Time.WorldTime + this.TsLimitTime;
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("BehaviorTree", 29, "错误的移动状态", ["Type", i.GetClass().GetName()]);
          }
          this.FinishExecute(false);
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", i.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  ReceiveTickAI(i, t, e) {
    if (this.TsLimitTime > 0 && this.EndTime < Time_1.Time.WorldTime) {
      this.AnimalMoveToController.Stop();
      this.Finish(true);
    } else {
      switch (this.AnimalMoveToController.Update(e)) {
        case 1:
          this.Finish(true);
          break;
        case 2:
          this.Finish(false);
      }
    }
  }
  OnClear() {
    this.AnimalMoveToController?.Finish();
    this.AnimalMoveToController = undefined;
  }
}
TsTaskAnimalMoveTo.StaticVariablesInited = false;
TsTaskAnimalMoveTo.AnimalValidMoveState = new Set();
exports.default = TsTaskAnimalMoveTo; //# sourceMappingURL=TsTaskAnimalMoveTo.js.map