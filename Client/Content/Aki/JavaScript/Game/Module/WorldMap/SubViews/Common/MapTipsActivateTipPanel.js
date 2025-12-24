"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapTipsActivateTipPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const HelpController_1 = require("../../../Help/HelpController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const HELP_ID = 119;
class MapTipsActivateTipPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.mji = () => {
      HelpController_1.HelpController.OpenHelpById(HELP_ID);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.mji]];
  }
  OnStart() {
    this.SetDistanceTips();
  }
  SetHideTip(e) {
    if (e !== undefined) {
      this.GetText(1).SetText(e);
    } else {
      this.SetActivatedTip("PlayPointClearDesc_Text");
    }
    this.GetButton(2).RootUIComp.SetUIActive(false);
  }
  SetDistanceTips() {
    this.SetActivatedTip("QuickTravelOverDistance_Text");
    this.GetButton(2).RootUIComp.SetUIActive(true);
  }
  SetActivatedTip(e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
    if (i !== undefined) {
      this.GetButton(2).RootUIComp.SetUIActive(i);
    }
  }
}
exports.MapTipsActivateTipPanel = MapTipsActivateTipPanel;
//# sourceMappingURL=MapTipsActivateTipPanel.js.map