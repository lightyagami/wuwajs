"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyTipsView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
class DangoMonopolyTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
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
  OnBeforeShow() {
    this.ShowData();
  }
  async ShowData() {
    var e;
    if (this.OpenParam?.TipsTextList.length) {
      e = this.OpenParam.TipsTextList.shift();
      this.GetText(1)?.SetText(e.Text);
      this.UpdateIcon(e.Icon);
      if (!this.OpenParam.ShowTime || !(await TimerSystem_1.GameplayTimerSystem.Wait(this.OpenParam.ShowTime), this.IsDestroyOrDestroying)) {
        await this.ShowData();
      }
    } else {
      this.CloseMe();
    }
  }
  UpdateIcon(e) {
    if (e) {
      this.SetTextureShowUntilLoaded(e, this.GetTexture(0));
    }
  }
}
exports.DangoMonopolyTipsView = DangoMonopolyTipsView;
//# sourceMappingURL=DangoMonopolyTipsView.js.map