"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRewardList = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
class ActivityRewardList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.s4e = undefined;
    this.a4e = undefined;
    this.InitCommonGridItem = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem]];
  }
  InitGridLayout(t) {
    this.a4e = t;
    if (this.s4e === undefined) {
      this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.a4e);
    }
  }
  SetCommonTitle() {
    this.GetText(1).ShowTextNew("CollectActivity_reward");
  }
  SetTitleByTextId(t) {
    this.GetText(1).ShowTextNew(t);
  }
  SetTitleByText(t) {
    this.GetText(1).SetText(t);
  }
  GetBgTexture() {
    return this.GetTexture(0);
  }
  RefreshItemLayout(t, e) {
    this.s4e.RefreshByData(t, e);
  }
  GetLayoutItemList() {
    return this.s4e.GetLayoutItemList();
  }
  SetItemLayoutVisible(t) {
    this.s4e.SetActive(t);
  }
}
exports.ActivityRewardList = ActivityRewardList;
//# sourceMappingURL=ActivityRewardList.js.map