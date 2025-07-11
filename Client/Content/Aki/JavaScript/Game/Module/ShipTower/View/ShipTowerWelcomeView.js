"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerWelcomeView = undefined;
const UE = require("ue");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
class ShipTowerWelcomeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.GetText(0)?.SetUIActive(false);
    this.UiViewSequence?.AddSequenceFinishEvent("Start", () => {
      this.OpenParam?.Promise.SetResult(true);
    });
  }
}
exports.ShipTowerWelcomeView = ShipTowerWelcomeView;
//# sourceMappingURL=ShipTowerWelcomeView.js.map