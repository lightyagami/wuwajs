"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
class TsDecoratorWaitSwitchControl extends UE.BTDecorator_BlueprintBase {
  Constructor() {}
  PerformConditionCheckAI(o, e) {
    var r = o.AiController;
    if (r) {
      return r.IsWaitingSwitchControl();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", o.GetClass().GetName()]);
      }
      return false;
    }
  }
}
exports.default = TsDecoratorWaitSwitchControl;
//# sourceMappingURL=TsDecoratorWaitSwitchControl.js.map