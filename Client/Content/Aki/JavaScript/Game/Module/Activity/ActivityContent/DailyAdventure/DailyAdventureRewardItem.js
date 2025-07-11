"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyAdventureRewardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ActivityDailyAdventureController_1 = require("./ActivityDailyAdventureController");
const DailyAdventureSmallGridItem_1 = require("./DailyAdventureSmallGridItem");
class DailyAdventureRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.sOe = [];
    this.aOe = e => {
      if (this.Data) {
        if (this.Data.RewardState !== 0) {
          e = e.Data;
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.Item[0].ItemId);
        } else {
          ActivityDailyAdventureController_1.ActivityDailyAdventureController.RequestPointReward(this.Data.RewardId);
        }
      }
    };
    this.hOe = () => {
      if (this.Data && this.Data.RewardState === 0) {
        ActivityDailyAdventureController_1.ActivityDailyAdventureController.RequestPointReward(this.Data.RewardId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.hOe]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (const t of [3, 4]) {
      e.push(this.rOe(this.GetItem(t).GetOwner()));
    }
    await Promise.all(e);
  }
  OnBeforeDestroy() {
    this.sOe.length = 0;
  }
  async rOe(e) {
    var t = new DailyAdventureSmallGridItem_1.DailyAdventureSmallGridItem();
    t.BindOnExtendToggleClicked(this.aOe);
    await t.CreateByActorAsync(e);
    this.sOe.push(t);
  }
  Refresh(e) {
    this.Data = e;
    var t = ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetDailyAdventurePointConfig(e.RewardId);
    if (t) {
      var i = this.lOe(t.Drop);
      for (let e = 0; e < this.sOe.length; e++) {
        var r;
        var s = i.length > e;
        var a = this.sOe[e];
        if (s) {
          r = {
            Item: i[e],
            HasClaimed: this.Data.RewardState === 2
          };
          a.Refresh(r, this.Data.RewardState === 0, this.Data.RewardState === 1);
        }
        a.SetActive(s);
      }
      this.GetText(2).SetText(t.NeedPt.toString());
      this._Oe(e.RewardState);
    }
  }
  _Oe(e) {
    switch (e) {
      case 1:
        this.uOe(false);
        this.GetText(5).ShowTextNew("Text_ActivityTaskOngoing_Text");
        this.GetItem(1).SetUIActive(true);
        this.GetItem(6).SetUIActive(false);
        this.GetItem(7).SetUIActive(false);
        this.GetItem(8).SetUIActive(false);
        break;
      case 0:
        this.uOe(true);
        this.GetText(5).ShowTextNew("Text_ActivityTaskReceive_Text");
        this.GetItem(1).SetUIActive(false);
        this.GetItem(6).SetUIActive(true);
        this.GetItem(7).SetUIActive(true);
        this.GetItem(8).SetUIActive(false);
        break;
      case 2:
        this.uOe(false);
        this.GetText(5).ShowTextNew("Text_ActivityTaskClaimed_Text");
        this.GetItem(1).SetUIActive(true);
        this.GetItem(6).SetUIActive(false);
        this.GetItem(7).SetUIActive(false);
        this.GetItem(8).SetUIActive(true);
    }
  }
  uOe(e) {
    this.GetText(5).SetChangeColor(e, this.GetText(5).changeColor);
  }
  lOe(e) {
    var e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)?.DropPreview;
    var t = [];
    if (e) {
      for (var [i, r] of e) {
        i = [{
          IncId: 0,
          ItemId: i
        }, r];
        t.push(i);
      }
    }
    return t;
  }
}
exports.DailyAdventureRewardItem = DailyAdventureRewardItem;
//# sourceMappingURL=DailyAdventureRewardItem.js.map