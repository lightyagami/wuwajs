"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupComponentRewardList = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
class PopupComponentRewardList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ItemLayout = undefined;
    this.d2t = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.ItemLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.d2t);
  }
  Refresh(e) {
    if (e.RewardItemIdList.length === 0 || e.IsExplore) {
      this.SetActive(false);
    } else {
      var t = [];
      for (const r of e.RewardItemIdList) {
        var o = [{
          IncId: 0,
          ItemId: r
        }, 0];
        t.push(o);
      }
      this.ItemLayout.RefreshByData(t);
    }
  }
}
exports.PopupComponentRewardList = PopupComponentRewardList;
//# sourceMappingURL=PopupComponentRewardList.js.map