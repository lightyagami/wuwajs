"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const DAY_MINITE_START = 360;
const DAY_MINITE_END = 1080;
class TsDecoratorCheckDay extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.CheckDayState = 0;
  }
  Constructor() {}
  PerformConditionCheckAI(r, e) {
    let o = false;
    return o = this.CheckDayState === 0 ? ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(DAY_MINITE_START, DAY_MINITE_END) : !ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(DAY_MINITE_START, DAY_MINITE_END);
  }
}
exports.default = TsDecoratorCheckDay;
//# sourceMappingURL=TsDecoratorCheckDay.js.map