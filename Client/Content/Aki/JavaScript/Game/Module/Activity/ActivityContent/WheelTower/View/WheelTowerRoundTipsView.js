"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerRoundTipsView = undefined;
const UE = require("ue");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const SHOW_TIME_MS = 3000;
class WheelTowerRoundTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.mNe = 0;
    this.n9f = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.GetArtText(0)?.SetText(e.toString());
    this.GetItem(1)?.SetUIActive(true);
    this.GetText(2)?.ShowTextNew("WheelTower_NextRoundTips");
    this.GetText(3)?.ShowTextNew("WheelTower_NextRoundName");
    this.mNe = SHOW_TIME_MS;
  }
  OnTick(e) {
    if (!this.n9f) {
      this.mNe -= e;
      if (this.mNe <= 0) {
        this.n9f = true;
        this.CloseMe();
      }
    }
  }
}
exports.WheelTowerRoundTipsView = WheelTowerRoundTipsView;
//# sourceMappingURL=WheelTowerRoundTipsView.js.map