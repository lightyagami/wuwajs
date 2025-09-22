"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionOpenSimpleGameplay = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsInteractionUtils_1 = require("../../Interaction/TsInteractionUtils");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionOpenSimpleGameplay extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    if (e && e.GameplayConfig.Type === "ItemInspection") {
      ControllerHolder_1.ControllerHolder.ItemInspectController.OpenItemInspect(e.GameplayConfig, e => {
        TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(e);
      }, () => {
        this.FinishExecute(true);
      });
    }
  }
  OnInterruptExecute() {
    if (this.ActionInfo.Params.GameplayConfig.Type === "ItemInspection") {
      ControllerHolder_1.ControllerHolder.ItemInspectController.InterruptItemInspect();
    }
  }
}
exports.FlowActionOpenSimpleGameplay = FlowActionOpenSimpleGameplay;
//# sourceMappingURL=FlowActionOpenSimpleGameplay.js.map