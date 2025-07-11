"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementSearchResultItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const AchievementDataItem_1 = require("./AchievementDataItem");
const AchievementSearchDescItem_1 = require("./AchievementSearchDescItem");
class AchievementSearchResultItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.SGe = undefined;
    this.yGe = undefined;
    this.IGe = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    if (this.SGe === undefined) {
      this.SGe = new AchievementSearchDescItem_1.AchievementSearchDescItem(this.GetItem(0));
      await this.SGe.Init();
    }
    if (this.yGe === undefined) {
      this.yGe = new AchievementDataItem_1.AchievementDataItem();
      await this.yGe.Init(this.GetItem(1));
    }
  }
  GetUsingItem(e) {
    if (e.AchievementSearchGroupData) {
      return this.GetItem(0).GetOwner();
    } else if (e.AchievementData) {
      return this.GetItem(1).GetOwner();
    } else {
      return undefined;
    }
  }
  Update(e, t) {
    this.Data = e;
    this.SGe.SetActive(false);
    this.yGe.SetActive(false);
    if (e.AchievementSearchGroupData) {
      this.SGe.SetActive(true);
      this.SGe.Update(e);
    } else if (e.AchievementData) {
      this.yGe.SetActive(true);
      this.yGe.RefreshUi(e.AchievementData);
    }
  }
  ClearItem() {
    this.Destroy();
  }
  OnBeforeDestroy() {
    if (this.SGe) {
      this.SGe.ClearItem();
    }
    if (this.yGe) {
      this.yGe.ClearItem();
    }
    this.IGe &&= undefined;
  }
}
exports.AchievementSearchResultItem = AchievementSearchResultItem;
//# sourceMappingURL=AchievementSearchResultItem.js.map