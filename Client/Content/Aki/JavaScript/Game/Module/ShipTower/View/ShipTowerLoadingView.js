"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerLoadingView = undefined;
const UE = require("ue");
const LoadingViewBase_1 = require("../../Loading/View/LoadingViewBase");
class ShipTowerLoadingView extends LoadingViewBase_1.LoadingViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  UpdateProgressRate(e) {}
  UpdateProgressValue(e) {
    this.SetTextProgressValue(0, e, "%");
  }
}
exports.ShipTowerLoadingView = ShipTowerLoadingView;
//# sourceMappingURL=ShipTowerLoadingView.js.map