"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUnlockSuccessPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FloroRanchUnlockSuccessPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.UiLevelSequence = undefined;
    this.AMo = () => {
      this.UiLevelSequence?.PlaySequence("Close");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.AMo]];
  }
  OnBeforeCreate() {
    this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiLevelSequence);
  }
  RefreshPanel(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
    this.SetUiActive(true);
    this.UiLevelSequence?.PlaySequence("Start");
  }
}
exports.FloroRanchUnlockSuccessPanel = FloroRanchUnlockSuccessPanel;
//# sourceMappingURL=FloroRanchUnlockSuccessPanel.js.map