"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskMoveToLocation extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.MoveState = 0;
    this.NavigationOn = false;
    this.BlackboardLocation = "";
    this.EndDistance = 0;
    this.TurnSpeed = 0;
    this.OpenDebugNode = false;
    this.LimitTime = 0;
    this.IsFly = false;
    this.IsInitTsVariables = false;
    this.TsMoveState = 0;
    this.TsNavigationOn = false;
    this.TsBlackboardLocation = "";
    this.TsOpenDebugNode = false;
    this.TsLimitTime = -0;
    this.TsIsFly = false;
    this.EndTime = -0;
    this.MoveComp = undefined;
    this.HandleMoveEnd = undefined;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsMoveState = 0;
    this.TsNavigationOn = false;
    this.TsBlackboardLocation = "";
    this.TsOpenDebugNode = false;
    this.TsLimitTime = -0;
    this.TsIsFly = false;
    this.EndTime = -0;
    this.MoveComp = undefined;
    this.HandleMoveEnd = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsMoveState = this.MoveState;
      this.TsNavigationOn = this.NavigationOn;
      this.TsBlackboardLocation = this.BlackboardLocation;
      this.TsOpenDebugNode = this.OpenDebugNode;
      this.TsLimitTime = this.LimitTime;
      this.TsIsFly = this.IsFly;
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s;
    var e;
    var o = t.AiController;
    if (o) {
      s = (o = o.CharActorComp).Entity;
      if (e = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(s.Id, this.TsBlackboardLocation)) {
        e = Vector_1.Vector.Create(e);
        this.HandleMoveEnd ||= t => {
          if (t === 1) {
            this.Finish(true);
          } else {
            this.Finish(false);
          }
        };
        this.MoveComp = s.GetComponent(46);
        s = {
          Index: 0,
          Position: e,
          MoveState: this.TsMoveState
        };
        e = o.ScaledRadius;
        o = {
          Points: [s],
          Navigation: this.TsNavigationOn,
          IsFly: this.TsIsFly,
          DebugMode: this.TsOpenDebugNode,
          Loop: false,
          Callback: this.HandleMoveEnd,
          ReturnFalseWhenNavigationFailed: true,
          Distance: this.EndDistance + e
        };
        this.MoveComp.MoveAlongPath(o);
        if (this.TsLimitTime > -1) {
          this.EndTime = Time_1.Time.WorldTime + this.TsLimitTime;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 6, "TsTaskMoveToLocation没有获取到目标坐标", ["BehaviorTree", this.TreeAsset.GetName()], ["BlackboardLocation", this.TsBlackboardLocation]);
        }
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
    if (t instanceof TsAiController_1.default) {
      if (this.TsLimitTime > -1 && this.EndTime < Time_1.Time.WorldTime) {
        this.Finish(true);
      }
    } else {
      this.Finish(false);
    }
  }
  OnClear() {
    if (this.MoveComp) {
      this.MoveComp.StopMove(true);
      this.MoveComp = undefined;
    }
    this.EndTime = 0;
  }
}
exports.default = TsTaskMoveToLocation;
//# sourceMappingURL=TsTaskMoveToLocation.js.map