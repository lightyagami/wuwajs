"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchMilestoneItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const FloroRanchMilestoneRewardItem_1 = require("./FloroRanchMilestoneRewardItem");
const REWARD_ITEM_WIDTH = 108;
class FloroRanchMilestoneItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ProgressLayout = undefined;
    this.ProgressBarWidth = 0;
    this.OnClickToGet = undefined;
    this.lx_ = () => {
      var e = new FloroRanchMilestoneRewardItem_1.FloroRanchMilestoneRewardItem();
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
  async RefreshProgressItem(t, s) {
    this.GetText(0).SetText(t.toString());
    this.GetSprite(3).SetChangeColor(t > 0, this.GetSprite(3).changeColor);
    let i = 0;
    let r = 0;
    var o;
    var a;
    var n;
    var h = s.length;
    for (let e = 0; e < h; e++) {
      if (s[e].IsFinished) {
        i += 1 / h;
      } else if (!(t <= (o = e > 0 ? s[e - 1].Goal : 0))) {
        a = s[e].Goal;
        n = this.ProgressBarWidth / h - REWARD_ITEM_WIDTH;
        r = n * ((t - o) / (a - o)) / this.ProgressBarWidth;
      }
    }
    this.GetSprite(4).SetFillAmount(i + r);
    await this.ProgressLayout.RefreshByDataAsync(s);
  }
}
exports.FloroRanchMilestoneItem = FloroRanchMilestoneItem;
//# sourceMappingURL=FloroRanchMilestoneItem.js.map