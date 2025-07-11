"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
class TsDecoratorDoOnce extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackBoardKey = "";
    this.HasDone = false;
  }
  Constructor() {
    this.HasDone = false;
  }
  PerformConditionCheckAI(r, e) {
    var o = r.AiController;
    if (o) {
      return !!(o = o.CharActorComp?.Entity) && !this.HasDone && !(this.HasDone = !!ControllerHolder_1.ControllerHolder.BlackboardController.GetBooleanValueByEntity(o.Id, this.BlackBoardKey), this.HasDone) && !(this.HasDone = true, ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(o.Id, this.BlackBoardKey, true), 0);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", r.GetClass().GetName()]);
      }
      return false;
    }
  }
}
exports.default = TsDecoratorDoOnce;
//# sourceMappingURL=TsDecoratorDoOnce.js.map