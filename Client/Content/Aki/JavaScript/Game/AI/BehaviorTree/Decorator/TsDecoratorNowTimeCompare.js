"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorNowTimeCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackboardKey = "";
    this.IsGreaterThan = true;
    this.CompareValue = 0;
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TsIsGreaterThan = false;
    this.TsCompareValue = 0;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TsIsGreaterThan = false;
    this.TsCompareValue = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKey = this.BlackboardKey;
      this.TsIsGreaterThan = this.IsGreaterThan;
      this.TsCompareValue = this.CompareValue;
    }
  }
  PerformConditionCheckAI(e, t) {
    var r;
    var o;
    this.InitTsVariables();
    return !!this.TsBlackboardKey && ((r = e.AiController) ? (r = r.CharActorComp.Entity.Id, o = Time_1.Time.WorldTime, !(r = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(r, this.TsBlackboardKey)) || (o = o - r, this.TsIsGreaterThan ? o > this.TsCompareValue : this.TsCompareValue > o)) : (Log_1.Log.CheckError() && Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]), false));
  }
}
exports.default = TsDecoratorNowTimeCompare;
//# sourceMappingURL=TsDecoratorNowTimeCompare.js.map