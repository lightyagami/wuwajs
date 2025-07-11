"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideCountDownItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class GuideCountDownItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Lzt = 0;
    this.hwe = Rotator_1.Rotator.Create(0, 0, 0);
    this.Dzt = undefined;
    this.Rzt = undefined;
    this.Lzt = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 16, "[引导计时器初始化:关闭界面倒计时]", ["总时间", this.Lzt]);
    }
  }
  Init(t) {
    this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite]];
  }
  OnStart() {
    this.Dzt = this.GetSprite(0);
    this.Rzt = this.GetSprite(1);
    this.Dzt.SetFillAmount(1);
    this.hwe.Set(0, 0, 0);
    this.Rzt.SetUIRelativeRotation(this.hwe.ToUeRotator());
    this.RootItem.SetUIActive(true);
  }
  OnDurationChange(t) {
    if (this.IsShowOrShowing) {
      t = t / this.Lzt;
      this.Dzt.SetFillAmount(t);
      this.hwe.Set(0, (t - 1) * 360, 0);
      this.Rzt.SetUIRelativeRotation(this.hwe.ToUeRotator());
    }
  }
}
exports.GuideCountDownItem = GuideCountDownItem;
//# sourceMappingURL=GuideCountDownItem.js.map