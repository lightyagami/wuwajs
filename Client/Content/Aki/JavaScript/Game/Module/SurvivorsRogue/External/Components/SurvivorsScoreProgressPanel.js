"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsScoreProgressPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const SurvivorsScoreProgressItem_1 = require("./SurvivorsScoreProgressItem");
const REWARD_ITEM_WIDTH = 108;
class SurvivorsScoreProgressPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ProgressLayout = undefined;
    this.ProgressBarWidth = 0;
    this.OnClickToGet = undefined;
    this.lx_ = () => {
      var e = new SurvivorsScoreProgressItem_1.SurvivorsScoreProgressItem();
      e.OnClickToGet = this.OnClickToGet;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite]];
  }
  OnStart() {
    this.ProgressLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.lx_);
    this.ProgressBarWidth = this.GetSprite(4).GetWidth();
  }
  async RefreshProgressItem(s, r) {
    this.GetText(0).SetText(s.toString());
    this.GetSprite(3).SetChangeColor(s > 0, this.GetSprite(3).changeColor);
    let t = 0;
    let i = 0;
    var o;
    var a;
    var u;
    var h = r.length;
    for (let e = 0; e < h; e++) {
      if (r[e].IsAchieved(s)) {
        t += 1 / h;
      } else if (!(s <= (o = e > 0 ? r[e - 1].Goal : 0))) {
        a = r[e].Goal;
        u = this.ProgressBarWidth / h - REWARD_ITEM_WIDTH;
        i = u * ((s - o) / (a - o)) / this.ProgressBarWidth;
      }
    }
    this.GetSprite(4).SetFillAmount(t + i);
    await this.ProgressLayout.RefreshByDataAsync(r);
  }
}
exports.SurvivorsScoreProgressPanel = SurvivorsScoreProgressPanel;
//# sourceMappingURL=SurvivorsScoreProgressPanel.js.map