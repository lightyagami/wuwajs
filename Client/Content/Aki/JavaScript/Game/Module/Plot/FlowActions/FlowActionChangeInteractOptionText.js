"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionChangeInteractOptionText = undefined;
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeInteractOptionText extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e;
    var t = ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
    if ((t &&= EntitySystem_1.EntitySystem.Get(t)) && (t = t.GetComponent(209)) && (t = t.GetInteractController()) && (t = t.CurrentInteractOption)) {
      e = this.ActionInfo.Params;
      t.TidContent = e.TidContent;
    }
  }
}
exports.FlowActionChangeInteractOptionText = FlowActionChangeInteractOptionText;
//# sourceMappingURL=FlowActionChangeInteractOptionText.js.map