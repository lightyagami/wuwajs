"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SdkEnterTipsView = undefined;
const UE = require("ue");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
class SdkEnterTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.bWe = false;
    this.Pe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [0, UE.UIText]];
  }
  OnStart() {
    this.Pe = this.OpenParam;
    this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
      this.bWe = true;
    });
    this.T2e(this.Pe);
  }
  OnBeforeShow() {
    if (this.Pe?.NeedMask) {
      UiLayer_1.UiLayer.SetShowMaskLayer("SdkLoading", true);
    }
  }
  OnBeforeHide() {
    if (this.Pe?.NeedMask) {
      UiLayer_1.UiLayer.SetShowMaskLayer("SdkLoading", false);
    }
  }
  OnTick(i) {
    if (this.bWe && this.IsShow) {
      this.bWe = false;
      this.CloseMe();
    }
  }
  T2e(i) {
    this.GetText(0)?.SetText(i.Text);
  }
}
exports.SdkEnterTipsView = SdkEnterTipsView;
//# sourceMappingURL=SdkEnterTipsView.js.map