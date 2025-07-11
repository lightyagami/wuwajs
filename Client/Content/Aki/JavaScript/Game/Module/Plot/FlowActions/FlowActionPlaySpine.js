"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionPlaySpine = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionPlaySpine extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    if (e.Config.Type === "Play") {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayPlotSpine, e.Config.Name, e.Config.IsLoop);
    }
  }
  OnBackgroundExecute() {}
}
exports.FlowActionPlaySpine = FlowActionPlaySpine;
//# sourceMappingURL=FlowActionPlaySpine.js.map