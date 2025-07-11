"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipLoadingView = undefined;
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
class KingShipLoadingView extends UiViewBase_1.UiViewBase {
  OnStart() {
    this.UiViewSequence?.AddSequenceFinishEvent("Start", () => {
      UiManager_1.UiManager.OpenView("KingShipMainView", this.OpenParam, () => {
        this.CloseMe();
      });
    });
  }
}
exports.KingShipLoadingView = KingShipLoadingView;
//# sourceMappingURL=KingShipLoadingView.js.map