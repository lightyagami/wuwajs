"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionLeisureInteract = undefined;
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionLeisureInteract extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = LevelGeneralContextDefine_1.PlotContext.Create(this.Context.FlowIncId, this.Context.Context?.SubType);
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew([this.ActionInfo], e);
    this.FinishExecute(true);
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionLeisureInteract = FlowActionLeisureInteract;
//# sourceMappingURL=FlowActionLeisureInteract.js.map