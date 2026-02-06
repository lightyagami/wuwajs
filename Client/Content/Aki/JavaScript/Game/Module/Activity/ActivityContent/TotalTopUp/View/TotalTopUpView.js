"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpView = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const TotalTopUpDefine_1 = require("../TotalTopUpDefine");
const TotalTopUpPageProgressPanel_1 = require("./TotalTopUpPageProgressPanel");
const TotalTopUpPageRewardItem_1 = require("./TotalTopUpPageRewardItem");
const TotalTopUpPageTitlePanel_1 = require("./TotalTopUpPageTitlePanel");
const rewardNodes = [8, 0, 1, 2, 3, 4, 5, 6, 7];
class TotalTopUpView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.Pxg = [];
    this.S9a = undefined;
    this._s1 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (const s of rewardNodes) {
      var t = new TotalTopUpPageRewardItem_1.TotalTopUpPageRewardItem();
      this.Pxg.push(t);
      var i = this.GetItem(s)?.GetOwner();
      var t = t.CreateByActorAsync(i);
      e.push(t);
    }
    this.S9a = new TotalTopUpPageProgressPanel_1.TotalTopUpPageProgressPanel();
    var o = this.S9a.CreateByActorAsync(this.GetItem(10).GetOwner());
    e.push(o);
    this._s1 = new TotalTopUpPageTitlePanel_1.TotalTopUpPageTitlePanel();
    var o = this._s1.CreateByActorAsync(this.GetItem(9).GetOwner());
    e.push(o);
    await Promise.all(e);
    for (const a of this.Pxg) {
      a.SetUiActive(true);
    }
    this.S9a.SetUiActive(true);
    this._s1.SetUiActive(true);
  }
  OnStart() {
    var e = this.ActivityBaseData;
    this.bl(e);
  }
  bl(e) {
    var t = e.PageViewModel;
    for (let e = 0; e < this.Pxg.length; e++) {
      var i = this.Pxg[e];
      var o = t.RewardViewModels[e];
      if (o) {
        i.Refresh(o);
      }
    }
    this.S9a?.Refresh(t);
  }
  OnRefreshView() {
    TotalTopUpDefine_1.TotalTopUpUtil.Debug("TotalTopUpView刷新");
    var e = this.ActivityBaseData;
    this.bl(e);
  }
  OnTimer() {
    var e = this.ActivityBaseData;
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    var e = e.EndOpenTime - t;
    this._s1?.RefreshTime(e);
  }
}
exports.TotalTopUpView = TotalTopUpView;
//# sourceMappingURL=TotalTopUpView.js.map