"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionChangeTrapDefenseMiniMap = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeTrapDefenseMiniMap extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    ControllerHolder_1.ControllerHolder.TrapDefenseController.ChangeMap(e.MiniMapId);
  }
}
exports.FlowActionChangeTrapDefenseMiniMap = FlowActionChangeTrapDefenseMiniMap;
//# sourceMappingURL=FlowActionChangeTrapDefenseMiniMap.js.map