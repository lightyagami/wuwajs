"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPageRewardItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class TotalTopUpPageRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.yil = undefined;
    this.hoc = () => {
      if (this.yil) {
        if (this.yil.State === 1) {
          this.yil.Claim();
        } else {
          this.yil.PreviewReward();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.hoc]];
  }
  OnStart() {
    this.GetItem(7)?.SetUIActive(false);
  }
  Refresh(e) {
    this.yil = e;
    this.GetText(5)?.SetText("x" + e.RewardCount);
    this.GetText(4)?.SetText("" + e.Score);
    var s = e.State === 1;
    var t = e.State === 2;
    this.GetItem(2)?.SetUIActive(t);
    this.GetItem(7)?.SetUIActive(s);
    var t = this.GetItem(6);
    var e = e.ShowCheckItem && !s;
    t?.SetUIActive(e);
  }
}
exports.TotalTopUpPageRewardItem = TotalTopUpPageRewardItem;
//# sourceMappingURL=TotalTopUpPageRewardItem.js.map