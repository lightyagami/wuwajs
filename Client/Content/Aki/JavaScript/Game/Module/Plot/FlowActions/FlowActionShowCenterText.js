"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionShowCenterText = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionShowCenterText extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments);
    this.sYi = () => {
      this.Runner.FinishShowCenterTextAction(() => {
        this.FinishExecute(true);
      });
    };
  }
  OnExecute() {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 26, "黑屏白字行为不再维护，请策划使用ShowTalk形式的黑幕白字", ["id", this.Context.FormatId], ["action", this.ActionInfo.ActionId]);
    }
    var e = this.ActionInfo.Params;
    ModelManager_1.ModelManager.PlotModel.ShowCenterText(e, this.sYi);
  }
  OnInterruptExecute() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlotTransitionRemoveCallback);
    if (UiManager_1.UiManager.IsViewShow("PlotTransitionView")) {
      UiManager_1.UiManager.CloseView("PlotTransitionView");
    }
    this.FinishExecute(true);
  }
}
exports.FlowActionShowCenterText = FlowActionShowCenterText;
//# sourceMappingURL=FlowActionShowCenterText.js.map