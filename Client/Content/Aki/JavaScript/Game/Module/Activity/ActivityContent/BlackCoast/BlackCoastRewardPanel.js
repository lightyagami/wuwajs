"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackCoastRewardPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityBlackCoastController_1 = require("./ActivityBlackCoastController");
const BlackCoastRewardItem_1 = require("./BlackCoastRewardItem");
const REWARD_WIDTH = 120;
class BlackCoastRewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.ActivityBaseData = undefined;
    this.H3e = undefined;
    this.t2t = undefined;
    this.qte = 0;
    this.BY = 0;
    this.h2t = 0;
    this.l2t = 0;
    this._2t = REWARD_WIDTH;
    this.u2t = 0;
    this.c2t = 0;
    this.d2t = () => {
      var t = this.GetItem(1);
      var i = this.GetSprite(2);
      LguiUtil_1.LguiUtil.CopyItem(i, t).SetUIActive(true);
      var i = this.GetItem(5);
      var t = this.GetSprite(6);
      LguiUtil_1.LguiUtil.CopyItem(t, i).SetUIActive(true);
      var t = new BlackCoastRewardItem_1.BlackCoastRewardItem();
      t.RequestGetAllAvailableReward = () => {
        var t = this.ActivityBaseData.GetAllAvailableProgressRewardIds();
        if (t.length > 0) {
          ActivityBlackCoastController_1.ActivityBlackCoastController.RequestDataProgressReward(this.ActivityBaseData.Id, t);
        }
      };
      return t;
    };
    this.ActivityBaseData = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite]];
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.d2t);
    var t = this.GetItem(0);
    this.l2t = t.GetWidth();
    this.t2t = this.GetItem(0);
    this.GetSprite(2).SetUIActive(false);
    this.GetSprite(6).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.t2t = undefined;
  }
  Refresh() {
    this.qte = this.ActivityBaseData.GetProgressItemCount();
    this.h2t = 0;
    var t = this.ActivityBaseData.GetAllProgressRewardData();
    for (const i of t) {
      if (i.GetState() !== 1) {
        this.h2t++;
      }
      this.BY = Math.max(i.Goal, this.BY);
    }
    this.c2t = t.length;
    if (!(this.c2t <= 0)) {
      this.H3e.RefreshByData(t);
      this.u2t = (this.l2t - this._2t * (this.c2t - 1)) / this.c2t;
      this.C2t(this.qte / this.BY);
    }
  }
  RefreshLayout() {
    this.H3e.RefreshByData(this.ActivityBaseData.GetAllProgressRewardData());
  }
  C2t(t) {
    var i = Math.min(this.h2t, this.c2t - 1) * this._2t;
    var t = this.u2t * this.c2t * Math.min(t, 1);
    var i = this.l2t - i - t;
    this.t2t.SetStretchRight(i);
  }
}
exports.BlackCoastRewardPanel = BlackCoastRewardPanel;
//# sourceMappingURL=BlackCoastRewardPanel.js.map