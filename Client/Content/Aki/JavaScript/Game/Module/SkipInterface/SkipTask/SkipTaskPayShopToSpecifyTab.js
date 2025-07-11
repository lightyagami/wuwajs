"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskPayShopToSpecifyTab = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../Ui/UiManager");
const PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData");
const SkipTask_1 = require("./SkipTask");
class SkipTaskPayShopToSpecifyTab extends SkipTask_1.SkipTask {
  OnRun(e, a, r) {
    var o;
    this.Finish();
    if (UiManager_1.UiManager.IsViewShow("PayShopRootView")) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("IsInView");
    } else {
      (o = new PayShopViewData_1.PayShopViewData()).PayShopId = Number(e);
      o.SwitchId = Number(a);
      ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(o);
    }
  }
}
exports.SkipTaskPayShopToSpecifyTab = SkipTaskPayShopToSpecifyTab;
//# sourceMappingURL=SkipTaskPayShopToSpecifyTab.js.map