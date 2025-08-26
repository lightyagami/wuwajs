"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PowerConst = exports.PowerItemInfo = exports.PowerConfirmBoxData = exports.EPowerShopType = undefined;
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
var EPowerShopType;
(function (t) {
  t[t.BuyWithMoney = 6] = "BuyWithMoney";
  t[t.BuyWithItem = 7] = "BuyWithItem";
})(EPowerShopType = exports.EPowerShopType ||= {});
class PowerConfirmBoxData extends UiPopViewData_1.UiPopViewData {
  constructor(t, e = 2, o = false, s = -1) {
    super();
    this.PowerCount = t;
    this.Type = e;
    this.UpdateCurrentNeedPower = o;
    this.AutoClosePowerCount = s;
  }
}
exports.PowerConfirmBoxData = PowerConfirmBoxData;
class PowerItemInfo {
  constructor(t) {
    this.ItemName = "";
    this.uoo = 0;
    this.StackValue = 0;
    this.RenewValue = 0;
    this.CostValue = 0;
    this.ShopId = 0;
    this.GoodsId = 0;
    this.IsHideWhenZero = false;
    this.RemainCount = 0;
    this.ItemId = t;
  }
  set ItemId(t) {
    this.uoo = t;
    if (this.uoo <= PowerConst.MaxVirtualItemId) {
      this.ShopId = EPowerShopType.BuyWithMoney;
    } else {
      this.ShopId = EPowerShopType.BuyWithItem;
    }
  }
  get ItemId() {
    return this.uoo;
  }
}
exports.PowerItemInfo = PowerItemInfo;
class PowerConst {
  constructor() {}
}
(exports.PowerConst = PowerConst).MaxVirtualItemId = 2000;
//# sourceMappingURL=PowerDefines.js.map