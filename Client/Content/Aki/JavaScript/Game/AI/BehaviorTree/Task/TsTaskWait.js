"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Time_1 = require("../../../../Core/Common/Time");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskWait extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.TimeMillisecond = 0;
    this.BlackboardKeyTime = "";
    this.RandomTime = 0;
    this.IsInitTsVariables = false;
    this.TsTimeMillisecond = 0;
    this.TsBlackboardKeyTime = "";
    this.TsRandomTime = 0;
    this.EndTime = -0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsTimeMillisecond = 0;
    this.TsBlackboardKeyTime = "";
    this.TsRandomTime = 0;
    this.EndTime = -0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsTimeMillisecond = this.TimeMillisecond;
      this.TsBlackboardKeyTime = this.BlackboardKeyTime;
      this.TsRandomTime = this.RandomTime;
    }
  }
  ReceiveExecuteAI(t, s) {
    this.InitTsVariables();
    let e = this.TsTimeMillisecond;
    var t = t.AiController;
    if (t && this.TsBlackboardKeyTime && (t = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(t.CharAiDesignComp.Entity.Id, this.TsBlackboardKeyTime))) {
      e = t;
    }
    this.EndTime = Time_1.Time.Now + e + MathUtils_1.MathUtils.GetRandomRange(0, this.TsRandomTime);
  }
  ReceiveTickAI(t, s, e) {
    if (this.EndTime < Time_1.Time.Now) {
      this.Finish(true);
    }
  }
  OnClear() {
    this.EndTime = 0;
  }
}
exports.default = TsTaskWait;
//# sourceMappingURL=TsTaskWait.js.map