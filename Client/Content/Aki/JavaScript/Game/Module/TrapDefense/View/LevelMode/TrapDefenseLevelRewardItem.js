"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelRewardItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const TrapDefenseResultItem_1 = require("../Item/TrapDefenseResultItem");
class TrapDefenseLevelRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.ClickCallBack = undefined;
    this.LayoutMachineReward = undefined;
    this.LayoutBdReward = undefined;
    this.CreateItemBdReward = () => new TrapDefenseResultItem_1.TrapDefenseResultBdUnlockItem();
    this.CreateItemMachineReward = () => new TrapDefenseResultItem_1.TrapDefenseResultOrganUnlockItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UILayoutBase], [4, UE.UIItem], [5, UE.UILayoutBase], [6, UE.UIItem], [7, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var t = this.GetLayoutBase(5);
    var e = this.GetItem(6)?.GetOwner();
    this.LayoutBdReward = new GenericLayout_1.GenericLayout(t, this.CreateItemBdReward, e);
    var t = this.GetLayoutBase(3);
    var e = this.GetItem(4)?.GetOwner();
    this.LayoutMachineReward = new GenericLayout_1.GenericLayout(t, this.CreateItemMachineReward, e);
  }
  Refresh(t) {
    switch ((this.ItemData = t).ItemType) {
      case 0:
        this.UpdateTalent();
        break;
      case 1:
        this.UpdateMachine();
        break;
      case 2:
        this.UpdateBdBuff();
    }
  }
  IJc(t) {
    this.GetItem(1)?.SetUIActive(t);
  }
  TJc(t) {
    this.GetText(0)?.ShowTextNew(t);
  }
  UpdateTalent() {
    this.IJc(true);
    this.LayoutBdReward.SetActive(false);
    this.LayoutMachineReward.SetActive(false);
    this.TJc(this.ItemData.TypeNameKey);
    this.GetText(2)?.SetText(this.ItemData.LevelData.Config.RewardMoneyCount.toString());
    this.GetItem(7)?.SetUIActive(this.ItemData.LevelData.IsPassed);
  }
  UpdateMachine() {
    this.LayoutMachineReward.SetActive(true);
    this.IJc(false);
    this.LayoutBdReward.SetActive(false);
    this.TJc(this.ItemData.TypeNameKey);
    this.LayoutMachineReward.RefreshByData(this.ItemData.LevelData.GetRewardShowListMachineData());
  }
  UpdateBdBuff() {
    this.LayoutBdReward.SetActive(true);
    this.IJc(false);
    this.LayoutMachineReward.SetActive(false);
    this.TJc(this.ItemData.TypeNameKey);
    this.LayoutBdReward.RefreshByData(this.ItemData.LevelData.GetRewardShowListBdBuffData());
  }
}
exports.TrapDefenseLevelRewardItem = TrapDefenseLevelRewardItem;
//# sourceMappingURL=TrapDefenseLevelRewardItem.js.map