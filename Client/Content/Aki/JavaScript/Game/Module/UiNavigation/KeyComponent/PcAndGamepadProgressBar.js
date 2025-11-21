"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcAndGamepadProgressBar = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ProgressBar extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnStart() {
    this.SetPercent(0);
  }
  SetPercent(s) {
    this.GetSprite(0)?.SetFillAmount(s);
  }
}
class PcAndGamepadProgressBar {
  constructor() {
    this.pwo = undefined;
    this.vwo = undefined;
  }
  async Init(s, e) {
    this.pwo = new ProgressBar();
    this.vwo = new ProgressBar();
    await Promise.all([this.pwo.CreateByActorAsync(s.GetOwner()), this.vwo.CreateByActorAsync(e.GetOwner())]);
    this.SetProgressPercent(0);
  }
  SetProgressPercent(s) {
    this.SetPercent(s);
    this.RefreshProgressVisible();
  }
  SetPercent(s) {
    (Info_1.Info.IsInGamepad() ? this.vwo : this.pwo)?.SetPercent(s);
  }
  SetProgressVisible(s) {
    if (s) {
      this.RefreshProgressVisible();
    } else {
      this.pwo?.SetActive(false);
      this.vwo?.SetActive(false);
    }
  }
  RefreshProgressVisible() {
    var s = Info_1.Info.IsInGamepad();
    var e = !s;
    if (this.pwo?.GetActive() !== e) {
      this.pwo?.SetActive(e);
    }
    if (this.vwo?.GetActive() !== s) {
      this.vwo?.SetActive(s);
    }
  }
}
exports.PcAndGamepadProgressBar = PcAndGamepadProgressBar;
//# sourceMappingURL=PcAndGamepadProgressBar.js.map