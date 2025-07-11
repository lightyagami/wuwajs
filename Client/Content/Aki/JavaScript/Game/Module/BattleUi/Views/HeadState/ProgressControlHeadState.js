"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressControlHeadState = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const HeadStateViewBase_1 = require("./HeadStateViewBase");
class ProgressControlHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments);
    this.Wlt = 0;
    this.OnProgressControlDataChange = t => {
      switch (t.ProgressCtrlType) {
        case "CaptureStrategicPoint":
        case "CaptureStrategicPoint2":
        case "ChargingDevice":
          this.x_t(t.CurrentValue / t.MaxValue);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  GetResourceId() {
    return "UiItem_BarInteractive";
  }
  ActiveBattleHeadState(t) {
    super.ActiveBattleHeadState(t);
    var e = this.GetSprite(0);
    var s = this.GetText(1);
    var a = e.GetStretchLeft();
    var i = e.GetParentAsUIItem().GetWidth();
    this.Wlt = i - a * 2;
    e.SetUIActive(true);
    s.SetUIActive(true);
    var r = t.GetProgressControlData();
    switch (r.ProgressCtrlType) {
      case "CaptureStrategicPoint":
      case "CaptureStrategicPoint2":
      case "ChargingDevice":
        this.x_t(r.CurrentValue / r.MaxValue);
    }
  }
  BindCallback() {
    super.BindCallback();
    this.HeadStateData.BindOnProgressControlDataChange(this.OnProgressControlDataChange);
  }
  x_t(t) {
    var e = MathUtils_1.MathUtils.Clamp(t, 0, 1) * this.Wlt;
    this.GetSprite(0).SetWidth(e);
    var e = Math.round(MathUtils_1.MathUtils.RangeClamp(t, 0, 1, 0, 100));
    this.GetText(1).SetText(e + "%");
  }
}
exports.ProgressControlHeadState = ProgressControlHeadState;
//# sourceMappingURL=ProgressControlHeadState.js.map