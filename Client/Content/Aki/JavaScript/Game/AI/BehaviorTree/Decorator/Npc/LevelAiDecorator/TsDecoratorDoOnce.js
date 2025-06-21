"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
class TsDecoratorDoOnce extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments), this.BlackBoardKey = "", this.HasDone = !1
  }
  Constructor() {
    this.HasDone = !1
  }
  PerformConditionCheckAI(r, e) {
    var o = r.AiController;
    return o ? !(!(o = o.CharActorComp?.Entity) || this.HasDone || (this.HasDone = !!ControllerHolder_1.ControllerHolder.BlackboardController.GetBooleanValueByEntity(o.Id, this.BlackBoardKey), this.HasDone) || (this.HasDone = !0, ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(o.Id, this.BlackBoardKey, !0), 0)) : (Log_1.Log.CheckError() && Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", r.GetClass().GetName()]), !1)
  }
}
exports.default = TsDecoratorDoOnce;
//# sourceMappingURL=TsDecoratorDoOnce.js.map