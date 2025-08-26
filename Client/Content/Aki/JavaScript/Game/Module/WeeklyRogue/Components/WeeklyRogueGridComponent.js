"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRougeShopDiscountTag = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridComponent");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRougeShopDiscountTag extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemDiscountTag";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnRefresh(e) {
    e = (1 - e.qN_ / e.kN_) * 100;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "RogueInfoViewShopDiscount", e);
  }
}
exports.WeeklyRougeShopDiscountTag = WeeklyRougeShopDiscountTag;
//# sourceMappingURL=WeeklyRogueGridComponent.js.map