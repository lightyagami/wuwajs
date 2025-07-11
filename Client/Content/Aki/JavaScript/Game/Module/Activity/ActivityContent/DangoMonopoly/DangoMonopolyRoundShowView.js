"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyRoundShowView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const UiManager_1 = require("../../../../Ui/UiManager");
const DangoMonopolyViewBase_1 = require("./DangoMonopolyViewBase");
class DangoMonopolyRoundShowView extends DangoMonopolyViewBase_1.DangoMonopolyViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.vt1 = () => {
      if (!this.IsDestroyOrDestroying) {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
  }
  OnStart() {
    this.GetText(0).SetText(this.OpenParam?.TipsText ?? "");
    TimerSystem_1.GameplayTimerSystem.Delay(this.vt1, this.OpenParam.ShowTime);
  }
  OnAfterPlayStartSequence() {
    this.oO1();
  }
  async oO1() {
    await this.OpenPromise?.Promise;
    await TimerSystem_1.GameplayTimerSystem.Wait(TimerSystem_1.MIN_TIME);
    this.CloseMe();
  }
  OnBeforeDestroy() {
    var e = this.OpenParam?.BoardId ?? 0;
    var o = this.OpenParam?.Promise;
    UiManager_1.UiManager.OpenView("DangoMonopolyRoundBuffShowView", {
      BoardId: e,
      Promise: o
    });
  }
}
exports.DangoMonopolyRoundShowView = DangoMonopolyRoundShowView;
//# sourceMappingURL=DangoMonopolyRoundShowView.js.map