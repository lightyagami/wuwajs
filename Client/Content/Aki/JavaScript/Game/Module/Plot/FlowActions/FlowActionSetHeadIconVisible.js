"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionSetHeadIconVisible = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionSetHeadIconVisible extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments);
    this.nYa = false;
    this.$$i = () => {
      if (this?.nYa) {
        this.nYa = false;
        this.FinishExecute(true);
      }
    };
  }
  OnExecute() {
    var e = this.ActionInfo.Params;
    this.nYa = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdatePortraitVisible, e, this.$$i);
  }
  OnInterruptExecute() {
    this.nYa = false;
    this.FinishExecute(true);
  }
}
exports.FlowActionSetHeadIconVisible = FlowActionSetHeadIconVisible;
//# sourceMappingURL=FlowActionSetHeadIconVisible.js.map