"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonRecommendElementItem = undefined;
const ue_1 = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const TowerElementItem_1 = require("../../TowerDetailUi/View/TowerElementItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class InstanceDungeonRecommendElementItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Uth = undefined;
    this.Mli = undefined;
    this.jli = () => {
      return new TowerElementItem_1.TowerElementItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIHorizontalLayout]];
  }
  OnStart() {
    this.Mli = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.jli);
    if (this.Uth) {
      this.RefreshItem(this.Uth.Element);
    }
  }
  RefreshItem(e) {
    if (this.InAsyncLoading()) {
      this.Uth = {
        Element: e
      };
    } else {
      this.Mli?.RefreshByData(e);
    }
  }
}
exports.InstanceDungeonRecommendElementItem = InstanceDungeonRecommendElementItem;
//# sourceMappingURL=InstanceDungeonRecommendElementItem.js.map