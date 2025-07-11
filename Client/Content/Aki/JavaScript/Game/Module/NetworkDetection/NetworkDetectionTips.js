"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkDetectionTips = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../Util/LguiUtil");
class NetworkDetectionTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Uic = undefined;
    this.$pt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture]];
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
  }
  OnAfterShow() {
    this.$pt?.PlaySequence("Loop");
  }
  SetTextureIconActive(e) {
    this.GetTexture(1)?.SetUIActive(e);
  }
  SetTipsText(e) {
    this.GetText(0)?.SetText(e);
  }
  SetTipsLocalText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
  OnAfterHide() {
    this.Dic();
  }
  ShowTip(e) {
    this.SetTipsLocalText(e);
    this.Show();
    this.Dic();
    this.Uic = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.Hide();
    }, +TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  Dic() {
    if (this.Uic && TimerSystem_1.GameplayTimerSystem.Has(this.Uic)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Uic);
    }
  }
}
exports.NetworkDetectionTips = NetworkDetectionTips;
//# sourceMappingURL=NetworkDetectionTips.js.map