"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsLoadingView = undefined;
const UE = require("ue");
const LoadingViewBase_1 = require("./LoadingViewBase");
class RacingBetsLoadingView extends LoadingViewBase_1.LoadingViewBase {
  constructor() {
    super(...arguments);
    this.wt1 = 0;
  }
  OnStart() {
    super.OnStart();
    this.wt1 = this.GetItem(1)?.Width ?? 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UINiagara]];
  }
  UpdateProgressRate(e) {
    this.SetTextureProgressRate(0, e);
    e = this.wt1 * e;
    this.GetUiNiagara(2)?.SetAnchorOffsetX(e);
  }
  UpdateProgressValue(e) {}
  OnLevelSequencePlayerBandStateChange(e) {
    this.PlaySequence("Start01");
  }
}
exports.RacingBetsLoadingView = RacingBetsLoadingView;
//# sourceMappingURL=RacingBetsLoadingView.js.map