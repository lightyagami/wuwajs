"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoviceJourneyItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const ActivityManager_1 = require("../../ActivityManager");
class NoviceJourneyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.kh = new Map();
    this.G2e = 0;
    this.sOe = [];
    this.Lo = undefined;
    this.CNe = undefined;
    this.hOe = () => {
      if (this.G2e === 1) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("NewbieCourse_LevelTips");
      } else if (this.G2e === 2) {
        ActivityManager_1.ActivityManager.GetActivityController(this.CNe.Type).RequestReward(this.Lo.Id);
        for (const t of this.sOe) {
          t.SetReceivableVisible(false);
        }
      }
    };
    this.aOe = t => {
      if (this.G2e !== 2) {
        t = t.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t.ItemId);
      } else {
        ActivityManager_1.ActivityManager.GetActivityController(this.CNe.Type).RequestReward(this.Lo.Id);
      }
    };
    this.N2e = () => {
      this.GetItem(5).SetUIActive(false);
      this.GetItem(7).SetUIActive(false);
      this.GetItem(4).SetUIActive(false);
      this.GetItem(8).SetUIActive(false);
      for (const t of this.sOe) {
        t.SetLockVisible(true);
      }
    };
    this.O2e = () => {
      this.GetItem(5).SetUIActive(true);
      this.GetItem(7).SetUIActive(true);
      this.GetItem(4).SetUIActive(false);
      this.GetItem(8).SetUIActive(false);
      this.GetText(6).SetText(this.Lo.Id.toString());
      for (const t of this.sOe) {
        t.SetReceivableVisible(true);
      }
    };
    this.k2e = () => {
      this.GetItem(5).SetUIActive(false);
      this.GetItem(7).SetUIActive(false);
      this.GetItem(4).SetUIActive(true);
      this.GetItem(8).SetUIActive(true);
      for (const t of this.sOe) {
        t.SetReceivedVisible(true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[3, this.hOe]];
  }
  async rOe(t) {
    var i = new RewardGridItem();
    i.BindOnExtendToggleClicked(this.aOe);
    await i.CreateThenShowByActorAsync(t);
    this.sOe.push(i);
  }
  async OnBeforeStartAsync() {
    var e = [this.GetItem(1), this.GetItem(2)];
    var s = [];
    for (let t = 0, i = e.length; t < i; ++t) {
      s.push(this.rOe(e[t].GetOwner()));
    }
    await Promise.all(s);
  }
  OnStart() {
    this.kh.set(1, this.N2e);
    this.kh.set(2, this.O2e);
    this.kh.set(3, this.k2e);
  }
  OnBeforeDestroy() {
    for (const t of this.sOe) {
      this.AddChild(t);
    }
  }
  SetActivityData(t) {
    this.CNe = t;
  }
  Refresh(t, i, e) {
    this.Lo = t;
    this.GetText(0).SetText(t.Id.toString());
    var s = ConfigManager_1.ConfigManager.ActivityNoviceJourneyConfig.GetRewardList(this.Lo.Reward);
    for (let t = 0, i = this.sOe.length; t < i; ++t) {
      var r = this.sOe[t];
      if (t < s.length) {
        r.RefreshByData(s[t]);
      } else {
        r.SetActive(false);
      }
    }
    this.RefreshCurrentState();
  }
  RefreshCurrentState() {
    this.G2e = this.CNe.GetRewardStateByLevel(this.Lo.Id);
    this.kh.get(this.G2e)();
  }
  GetKey(t, i) {
    return this.Lo.Id;
  }
}
exports.NoviceJourneyItem = NoviceJourneyItem;
class RewardGridItem extends SmallItemGrid_1.SmallItemGrid {
  OnCanExecuteChange() {
    return false;
  }
  RefreshByData(t) {
    t = {
      Type: 4,
      Data: t,
      ItemConfigId: t.ItemId,
      BottomText: t.Count.toString(),
      IsReceivedVisible: false
    };
    this.Apply(t);
  }
}
//# sourceMappingURL=NoviceJourneyItem.js.map