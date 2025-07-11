"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssWorldLoadingView = undefined;
const UE = require("ue");
const LoadingViewBase_1 = require("./LoadingViewBase");
class DangoAbyssWorldLoadingView extends LoadingViewBase_1.LoadingViewBase {
  constructor() {
    super(...arguments);
    this.wt1 = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
  }
  OnStart() {
    super.OnStart();
    this.wt1 = this.GetItem(1)?.Width ?? 0;
  }
  UpdateProgressRate(e) {
    this.SetTextureProgressRate(0, e);
    e = this.wt1 * e;
    this.GetItem(2)?.SetAnchorOffsetX(e);
  }
  UpdateProgressValue(e) {
    this.SetTextProgressValue(3, e, "%");
  }
  OnLevelSequencePlayerBandStateChange(e) {
    this.PlaySequence("Loop");
  }
}
exports.DangoAbyssWorldLoadingView = DangoAbyssWorldLoadingView;
//# sourceMappingURL=DangoAbyssWorldLoadingView.js.map