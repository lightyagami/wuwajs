"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPageTitlePanel = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const HelpController_1 = require("../../../../Help/HelpController");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const HELP_ID = 516;
class TotalTopUpPageTitlePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.fFo = () => {
      HelpController_1.HelpController.OpenHelpById(HELP_ID);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.fFo]];
  }
  RefreshTime(e) {
    var e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e);
    var i = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, "TotalTopUp_1001", e.CountDownText ?? "");
  }
}
exports.TotalTopUpPageTitlePanel = TotalTopUpPageTitlePanel;
//# sourceMappingURL=TotalTopUpPageTitlePanel.js.map