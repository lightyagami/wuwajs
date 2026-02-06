"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const SELF_MASK = 1;
const ALLY_MASK = 2;
const ENEMY_MASK = 4;
const NEUTRAL_MASK = 8;
class TsTaskCheckTarget extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.CheckSight = false;
    this.CheckDistance = 0;
    this.CheckAngle = 0;
    this.CheckHeight = 0;
    this.NeedCheckAutonomous = false;
    this.CheckCampRelevance = 0;
    this.CheckCamp = 0;
    this.CheckTags = undefined;
    this.IsInitTsVariables = false;
    this.TsCheckSight = false;
    this.TsNeedCheckAutonomous = false;
    this.TsCheckCampRelevance = 0;
    this.TsCheckCamp = 0;
    this.DistanceRange = undefined;
    this.AngleRange = undefined;
    this.HeightRange = undefined;
    this.CheckTagsCopy = undefined;
    this.NeedOneTag = false;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsCheckSight = false;
    this.TsNeedCheckAutonomous = false;
    this.TsCheckCampRelevance = 0;
    this.TsCheckCamp = 0;
    this.DistanceRange = undefined;
    this.AngleRange = undefined;
    this.HeightRange = undefined;
    this.CheckTagsCopy = undefined;
    this.NeedOneTag = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsCheckSight = this.CheckSight;
      this.TsNeedCheckAutonomous = this.NeedCheckAutonomous;
      this.TsCheckCampRelevance = this.CheckCampRelevance;
      this.TsCheckCamp = this.CheckCamp;
    }
  }
  static SwapAndClearTmpTargets() {
    var s = TsTaskCheckTarget.TmpTargets;
    TsTaskCheckTarget.TmpTargets = TsTaskCheckTarget.TmpTargets2;
    TsTaskCheckTarget.TmpTargets2 = s;
    TsTaskCheckTarget.TmpTargets.clear();
  }
  ReceiveExecuteAI(s, t) {
    this.InitTsVariables();
    if (!this.DistanceRange) {
      this.DistanceRange = [-MathUtils_1.MathUtils.LargeNumber, this.CheckDistance];
      this.AngleRange = [-this.CheckAngle, this.CheckAngle];
      this.HeightRange = [-this.CheckHeight, this.CheckHeight];
    }
  }
  ReceiveTickAI(s, t, e) {
    var i = s.AiController;
    if (i) {
      var r = i.CharActorComp;
      ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(r.Entity.Id, "TargetArray");
      ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(r.Entity.Id, "Target");
      if (TsTaskCheckTarget.TmpTargets) {
        TsTaskCheckTarget.TmpTargets.clear();
        TsTaskCheckTarget.TmpTargets2.clear();
      } else {
        TsTaskCheckTarget.TmpTargets = new Set();
        TsTaskCheckTarget.TmpTargets2 = new Set();
      }
      this.RelevanceAndCamp(i, r);
      if (TsTaskCheckTarget.TmpTargets.size === 0) {
        this.FinishExecute(false);
      } else {
        this.Tags();
        if (TsTaskCheckTarget.TmpTargets.size === 0) {
          this.FinishExecute(false);
        } else {
          if (this.TsCheckSight) {
            TsTaskCheckTarget.SwapAndClearTmpTargets();
            for (const h of TsTaskCheckTarget.TmpTargets2) {
              if (MathUtils_1.MathUtils.LocationInRangeArray(r.FloorLocation, r.ActorRotationProxy, h.FloorLocation, r.ScaledRadius + h.ScaledRadius, this.DistanceRange, this.AngleRange, this.HeightRange)) {
                TsTaskCheckTarget.TmpTargets.add(h);
              }
            }
          }
          var a = new Array();
          for (const T of TsTaskCheckTarget.TmpTargets) {
            if (!this.TsNeedCheckAutonomous || T.Entity.GetComponent(3)?.IsAutonomousProxy) {
              a.push(T.Entity.Id);
            }
          }
          if (a.length === 0) {
            this.FinishExecute(false);
          } else {
            ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValuesByEntity(r.Entity.Id, "TargetArray", a);
            i = Math.floor(MathUtils_1.MathUtils.GetRandomRange(0, a.length - 1));
            ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(r.Entity.Id, "Target", a[i]);
            this.FinishExecute(true);
          }
        }
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", s.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  RelevanceAndCamp(s, t) {
    if ((this.TsCheckCampRelevance & SELF_MASK) > 0) {
      TsTaskCheckTarget.TmpTargets.add(t);
    }
    if ((this.TsCheckCampRelevance & ALLY_MASK) > 0) {
      var e;
      var i = s.CharAiDesignComp.Entity.Id;
      for (const h of s.AiPerception.Allies) {
        if (h !== i && (e = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(h))) {
          TsTaskCheckTarget.TmpTargets.add(e);
        }
      }
    }
    if ((this.TsCheckCampRelevance & ENEMY_MASK) > 0) {
      for (const T of s.AiPerception.AllEnemies) {
        var r = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(T);
        if (r) {
          TsTaskCheckTarget.TmpTargets.add(r);
        }
      }
    }
    if ((this.TsCheckCampRelevance & NEUTRAL_MASK) > 0) {
      for (const o of s.AiPerception.Neutrals) {
        var a = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(o);
        if (a) {
          TsTaskCheckTarget.TmpTargets.add(a);
        }
      }
    }
    if (this.TsCheckCamp !== 13) {
      TsTaskCheckTarget.SwapAndClearTmpTargets();
      for (const k of TsTaskCheckTarget.TmpTargets2) {
        if (k.Actor.Camp === this.TsCheckCamp) {
          TsTaskCheckTarget.TmpTargets.add(k);
        }
      }
    }
  }
  Tags() {
    if (!this.CheckTagsCopy) {
      this.NeedOneTag = false;
      this.CheckTagsCopy = new Array();
      for (let s = this.CheckTags.Num() - 1; s >= 0; --s) {
        var t = this.CheckTags.GetKey(s);
        var e = this.CheckTags.Get(t);
        this.CheckTagsCopy.push([t, e]);
        if (e) {
          this.NeedOneTag = true;
        }
      }
    }
    if (this.CheckTagsCopy.length) {
      TsTaskCheckTarget.SwapAndClearTmpTargets();
      for (const h of TsTaskCheckTarget.TmpTargets2) {
        var i = h.Entity.GetComponent(217);
        if (i?.Valid) {
          let s = true;
          for (var [r, a] of this.CheckTagsCopy) {
            if (i.HasTag(r?.TagId) !== a) {
              s = false;
              break;
            }
          }
          if (s) {
            TsTaskCheckTarget.TmpTargets.add(h);
          }
        } else if (!this.NeedOneTag) {
          TsTaskCheckTarget.TmpTargets.add(h);
        }
      }
    }
  }
}
exports.default = TsTaskCheckTarget;
//# sourceMappingURL=TsTaskCheckTarget.js.map