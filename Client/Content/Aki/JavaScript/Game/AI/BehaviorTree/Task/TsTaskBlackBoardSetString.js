"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskBlackBoardSetString extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.StringName = "";
    this.StringValue = "";
    this.IsInitTsVariables = false;
    this.TsStringName = "";
    this.TsStringValue = "";
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsStringName = "";
    this.TsStringValue = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsStringName = this.StringName;
      this.TsStringValue = this.StringValue;
    }
  }
  ReceiveExecuteAI(e, t) {
    var s = e.AiController;
    if (s) {
      this.InitTsVariables();
      s = s.CharActorComp.Entity.Id;
      ControllerHolder_1.ControllerHolder.BlackboardController.SetStringValueByEntity(s, this.TsStringName, this.TsStringValue);
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskBlackBoardSetString;
//# sourceMappingURL=TsTaskBlackBoardSetString.js.map