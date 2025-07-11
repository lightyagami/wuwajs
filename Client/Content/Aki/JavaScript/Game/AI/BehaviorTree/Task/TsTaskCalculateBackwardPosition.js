"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskCalculateBackwardPosition extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.Distance = 0;
    this.BlackboardKey = "";
    this.IsInitTsVariables = false;
    this.TsDistance = 0;
    this.TsBlackboardKey = "";
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsDistance = 0;
    this.TsBlackboardKey = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsDistance = this.Distance;
      this.TsBlackboardKey = this.BlackboardKey;
    }
  }
  ReceiveExecuteAI(e, t) {
    var r = e.AiController;
    if (r) {
      this.InitTsVariables();
      var r = r.CharActorComp;
      var s = r.ActorLocationProxy;
      let e = r.ActorForwardProxy;
      var o = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(r.Entity.Id, "InputDirect");
      if (o) {
        if ((e = Vector_1.Vector.Create(o)).IsNearlyZero()) {
          e = r.ActorForwardProxy;
        }
        ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(r.Entity.Id, "InputDirect");
      }
      var o = Vector_1.Vector.Create(e);
      o.MultiplyEqual(-this.TsDistance);
      o.AdditionEqual(s);
      ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(r.Entity.Id, this.TsBlackboardKey, o.X, o.Y, o.Z);
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskCalculateBackwardPosition;
//# sourceMappingURL=TsTaskCalculateBackwardPosition.js.map