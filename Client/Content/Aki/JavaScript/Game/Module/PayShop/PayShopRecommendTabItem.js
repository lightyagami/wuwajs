"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopRecommendTabItem = undefined;
const UE = require("ue");
const CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase");
class PayShopRecommendTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor(e) {
    super();
    this.ToggleEvent = e => {
      if (e === 1) {
        this.SelectedCallBack(this.GridIndex);
      }
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.ToggleEvent]];
  }
  OnStart() {
    super.OnStart();
    this.GetExtendToggle(0).SetToggleState(0);
  }
  OnUpdateTabIcon(e) {}
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleState(e, t);
  }
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
}
exports.PayShopRecommendTabItem = PayShopRecommendTabItem;
//# sourceMappingURL=PayShopRecommendTabItem.js.map