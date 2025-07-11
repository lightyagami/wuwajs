"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionLevelAsyncAction = undefined;
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionLevelAsyncAction extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments);
    this._Xe = 0;
  }
  OnExecute() {
    this._Xe++;
    const t = this._Xe;
    var e = LevelGeneralContextDefine_1.PlotContext.Create(this.Context.FlowIncId, this.Context.Context?.SubType);
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew([this.ActionInfo], e, e => {
      if (this.ActionInfo && this.Runner && t === this._Xe) {
        this.OnActionFinish(e === 1);
      }
    });
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
  OnInterruptExecute() {
    this._Xe++;
    this.FinishExecute(true);
  }
  OnActionFinish(e) {
    this.FinishExecute(e);
  }
}
exports.FlowActionLevelAsyncAction = FlowActionLevelAsyncAction;
//# sourceMappingURL=FlowActionLevelAsyncAction.js.map