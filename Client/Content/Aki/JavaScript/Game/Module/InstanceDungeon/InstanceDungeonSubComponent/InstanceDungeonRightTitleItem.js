"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonRightTitleItem = undefined;
const ue_1 = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InstanceDungeonRecommendElementItem_1 = require("./InstanceDungeonRecommendElementItem");
class InstanceDungeonRightTitleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.sih = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText], [1, ue_1.UIText], [2, ue_1.UIItem]];
  }
  RefreshItem(e, t, n) {
    this.SetActive(true);
    this.GetText(0).ShowTextNew(e);
    this.GetText(1).ShowTextNew(t);
    this.UpdateInstanceDungeonRecommendElementItem(n);
  }
  RefreshName(e) {
    this.GetText(0).SetText(e);
  }
  RefreshDesc(e) {
    this.GetText(1).SetText(e);
  }
  UpdateInstanceDungeonRecommendElementItem(e) {
    if (!e || e.length <= 0) {
      this.sih?.SetActive(false);
    } else if (this.sih) {
      this.sih?.SetActive(true);
      this.sih?.RefreshItem(e);
    } else {
      this.sih = new InstanceDungeonRecommendElementItem_1.InstanceDungeonRecommendElementItem();
      this.sih.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_RecommendElement", this.GetItem(2)).then(() => {
        this.sih?.RefreshItem(e);
      }).catch(() => {});
    }
  }
}
exports.InstanceDungeonRightTitleItem = InstanceDungeonRightTitleItem;
//# sourceMappingURL=InstanceDungeonRightTitleItem.js.map