"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotStateView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../Util/LguiUtil");
class AutoPilotStateView extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    this.Owt();
  }
  Owt() {
    var e = ModelManager_1.ModelManager.AutoPilotModel?.GetAutoPilotState();
    this.GetItem(0)?.SetUIActive(e === 1);
    this.GetItem(1)?.SetUIActive(e === 2);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), e === 1 ? "AutoPilot_PilotMode" : "AutoPilot_LoopPilotMode");
  }
}
exports.AutoPilotStateView = AutoPilotStateView;
//# sourceMappingURL=AutoPilotStateView.js.map