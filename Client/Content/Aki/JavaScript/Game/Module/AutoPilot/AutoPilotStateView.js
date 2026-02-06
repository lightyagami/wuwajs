"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotStateView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../Util/LguiUtil");
class AutoPilotStateView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$pt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.GetRootItem());
    this.Owt();
  }
  OnBeforeShow() {
    this.$pt?.PlaySequence("Start");
  }
  Owt() {
    var e = ModelManager_1.ModelManager.AutoPilotModel?.GetAutoPilotState();
    this.GetItem(0)?.SetUIActive(e === 1);
    this.GetItem(1)?.SetUIActive(e === 2);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), e === 1 ? "AutoPilot_PilotMode" : "AutoPilot_LoopPilotMode");
  }
  async OnBeforeHideAsync() {
    await this.$pt?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
  }
  OnBeforeDestroy() {
    this.$pt?.Clear();
  }
}
exports.AutoPilotStateView = AutoPilotStateView;
//# sourceMappingURL=AutoPilotStateView.js.map