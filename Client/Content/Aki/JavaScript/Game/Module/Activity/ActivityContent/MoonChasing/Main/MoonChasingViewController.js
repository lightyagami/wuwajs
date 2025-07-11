"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonChasingViewController = undefined;
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const HelpController_1 = require("../../../../Help/HelpController");
const MAINVIEW_HELPID = 107;
const BUILDVIEW_HELPID = 102;
class MoonChasingViewController {
  constructor() {
    this.Yzt = undefined;
    this.jio = undefined;
    this.SkipToBusiness = () => {
      ModelManager_1.ModelManager.MoonChasingModel.RemoveDelegationRedDot();
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenBusinessMainView();
    };
    this.SkipToReward = () => {
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenRewardView();
    };
    this.SkipToBuild = () => {
      this.jio.IsInBuildingModule = true;
      this.Yzt.SkipToBuild();
    };
    this.SkipToTask = (t = 1, i = false) => {
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenTaskView(t, 0, i);
    };
    this.SkipToHandbook = () => {
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenHandbookView();
    };
    this.CloseSelf = () => {
      if (this.jio.IsInBuildingModule) {
        this.BuildingBackToMainView();
      } else {
        this.Yzt.CloseMe();
      }
    };
    this.OpenHelpView = () => {
      if (this.jio.IsInBuildingModule) {
        HelpController_1.HelpController.OpenHelpById(BUILDVIEW_HELPID);
      } else {
        HelpController_1.HelpController.OpenHelpById(MAINVIEW_HELPID);
      }
    };
  }
  RegisterView(t) {
    this.Yzt = t;
    this.jio = t.OpenParam;
  }
  uHs() {
    if (this.jio.SkipTarget === 2) {
      this.SkipToBuild();
    } else if (this.jio.SkipTarget === 1) {
      this.SkipToBusiness();
    } else if (this.jio.SkipTarget === 3) {
      this.SkipToTask(this.jio.TaskType, this.jio.IsLastTask);
    }
    this.jio.SkipTarget = 0;
  }
  cHs() {
    if (this.jio.RefreshBuildingId > 0) {
      this.Yzt.RefreshMainModule(this.jio.RefreshBuildingId);
      this.jio.RefreshBuildingId = 0;
    }
  }
  Show() {
    this.uHs();
    this.cHs();
    this.Qva();
    this.Yzt.RefreshBuildingModule();
    this.Yzt.RefreshRedDot();
  }
  BuildingBackToMainView() {
    this.Yzt.RefreshRedDot();
    this.jio.IsInBuildingModule = false;
    this.Yzt.BuildingBackToMainView();
    if (this.jio.BuildingBackToBusiness) {
      this.jio.BuildingBackToBusiness = false;
      this.SkipToBusiness();
    }
  }
  Qva() {
    if (ModelManager_1.ModelManager.MoonChasingModel.HasEnteredMainViewFlag) {
      this.Yzt.UiViewSequence.StartSequenceName = "Start";
    } else {
      this.Yzt.UiViewSequence.StartSequenceName = "Start01";
      ModelManager_1.ModelManager.MoonChasingModel.HasEnteredMainViewFlag = true;
    }
  }
}
exports.MoonChasingViewController = MoonChasingViewController;
//# sourceMappingURL=MoonChasingViewController.js.map