"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskRandomFloat extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.Min = 0;
    this.Max = 0;
    this.BlackboardKeyWriteTo = "";
    this.IsInitTsVariables = false;
    this.TsMin = 0;
    this.TsMax = 0;
    this.TsBlackboardKeyWriteTo = "";
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsMin = 0;
    this.TsMax = 0;
    this.TsBlackboardKeyWriteTo = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsMin = this.Min;
      this.TsMax = this.Max;
      this.TsBlackboardKeyWriteTo = this.BlackboardKeyWriteTo;
    }
  }
  ReceiveTickAI(t, s, e) {
    this.InitTsVariables();
    var i = t.AiController;
    if (i) {
      ControllerHolder_1.ControllerHolder.BlackboardController.SetFloatValueByEntity(i.CharAiDesignComp.Entity.Id, this.TsBlackboardKeyWriteTo, MathUtils_1.MathUtils.GetRandomRange(this.TsMin, this.TsMax));
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskRandomFloat;
//# sourceMappingURL=TsTaskRandomFloat.js.map