"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialListInfo = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class TutorialListInfo {
  constructor(t) {
    this.OwnerStep = undefined;
    this.GuideId = 0;
    this.TipState = 0;
    this.Duration = 0;
    this.TutorialTip = false;
    this.IsOverrideGuideTutorialView = false;
    this.OwnerStep = t;
  }
  Init() {
    this.GuideId = this.OwnerStep.Id;
    if (ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(this.OwnerStep.Id)?.TutorialTip) {
      this.TipState = 0;
      this.TutorialTip = true;
      this.Duration = this.OwnerStep.Config.Duration;
    } else {
      this.TipState = 2;
      this.TutorialTip = false;
    }
  }
  StopGuide() {
    if (this.OwnerStep) {
      this.OwnerStep.SwitchState(4);
      this.OwnerStep = undefined;
    }
  }
  Tick(t) {
    return this.TipState === 1 && (this.Duration -= t, this.Duration <= 0) && (this.StopGuide(), true);
  }
  ClickToPopState() {
    if (this.TipState !== 2 && this.Duration > 0) {
      this.TipState = 2;
      this.StopGuide();
      ModelManager_1.ModelManager.GuideModel.TryPauseTimer();
    }
  }
}
exports.TutorialListInfo = TutorialListInfo;
//# sourceMappingURL=TutorialListInfo.js.map