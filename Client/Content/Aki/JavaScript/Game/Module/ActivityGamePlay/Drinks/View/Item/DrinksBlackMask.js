"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksBlackMask = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class DrinksBlackMask extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.GetText(0)?.SetUIActive(false);
  }
  ShowBackMask(e) {
    e = ConfigManager_1.ConfigManager.DrinksConfig.GetStepConfig(e);
    this.SetUiActive(true);
    AudioSystem_1.AudioSystem.PostEvent(e.PrevMaskEvent);
    TimerSystem_1.TimerSystem.Delay(() => {
      this.HideMask();
    }, e.PrevMaskEventDelay);
    return e.PrevMaskEventDelay / 2;
  }
  HideMask() {
    this.SetUiActive(false);
  }
}
exports.DrinksBlackMask = DrinksBlackMask;
//# sourceMappingURL=DrinksBlackMask.js.map