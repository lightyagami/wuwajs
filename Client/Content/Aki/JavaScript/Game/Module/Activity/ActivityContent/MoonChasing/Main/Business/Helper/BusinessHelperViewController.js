"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessHelperViewController = undefined;
const UiManager_1 = require("../../../../../../../Ui/UiManager");
const HelpController_1 = require("../../../../../../Help/HelpController");
const MoonChasingController_1 = require("../../MoonChasingController");
const INTERACTIVE_HELPID = 106;
const HELP_HELPID = 105;
class BusinessHelperViewController {
  constructor() {
    this.Yzt = undefined;
    this.R1a = false;
    this.SelectedRoleId = 0;
    this.RefreshInteractivePanel = () => {
      if (this.R1a) {
        this.Yzt.RefreshInteractivePanel();
      }
    };
    this.BackToLastState = () => {
      if (this.R1a) {
        this.SkipToHelpPanel();
      } else {
        this.Yzt.CloseMe();
      }
    };
    this.OpenHelpView = () => {
      if (this.R1a) {
        HelpController_1.HelpController.OpenHelpById(INTERACTIVE_HELPID);
      } else {
        HelpController_1.HelpController.OpenHelpById(HELP_HELPID);
      }
    };
  }
  RegisterView(i) {
    this.Yzt = i;
  }
  Show() {
    this.Yzt.ShowView(this.R1a);
  }
  async RefreshSpine(i) {
    this.SelectedRoleId = i;
    await this.Yzt.RefreshSpine(i);
  }
  SkipToHelpPanel() {
    this.R1a = false;
    this.Yzt.SkipToHelpPanel();
  }
  SkipToInteractivePanel() {
    this.R1a = true;
    this.Yzt.SkipToInteractivePanel();
  }
  SkipToTaskView(i, e) {
    MoonChasingController_1.MoonChasingController.OpenTaskView(i, e);
  }
  SkipToBuildingView(i) {
    MoonChasingController_1.MoonChasingController.OpenBuildingTipsInfoView(i);
  }
  SkipToBuildingPreview() {
    var i = UiManager_1.UiManager.GetViewByName("MoonChasingMainView");
    if (i !== undefined) {
      i.OpenParam.SkipTarget = 2;
      UiManager_1.UiManager.NormalResetToView("MoonChasingMainView");
    }
  }
}
exports.BusinessHelperViewController = BusinessHelperViewController;
//# sourceMappingURL=BusinessHelperViewController.js.map