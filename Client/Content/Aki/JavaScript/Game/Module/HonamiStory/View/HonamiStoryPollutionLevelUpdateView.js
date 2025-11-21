"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryPollutionLevelUpdateView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class HonamiStoryPollutionLevelUpdateView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.GetText(0).SetText(e.PollutionLevel.toString());
    this.GetText(1).SetText(e.MonsterIncreaseLevel.toString());
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.CloseMe();
    }, 3500);
  }
}
exports.HonamiStoryPollutionLevelUpdateView = HonamiStoryPollutionLevelUpdateView;
//# sourceMappingURL=HonamiStoryPollutionLevelUpdateView.js.map