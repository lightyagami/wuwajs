"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeatherUnlockTipsView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class WeatherUnlockTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.I5t = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.I5t]];
  }
}
exports.WeatherUnlockTipsView = WeatherUnlockTipsView;
//# sourceMappingURL=WeatherUnlockTipsView.js.map