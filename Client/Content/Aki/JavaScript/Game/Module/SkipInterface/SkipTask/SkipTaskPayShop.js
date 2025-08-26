"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskPayShop = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const SkipTask_1 = require("./SkipTask");
class SkipTaskPayShop extends SkipTask_1.SkipTask {
  OnRun(e, r, o) {
    var i;
    this.Finish();
    if (UiManager_1.UiManager.IsViewShow("PayShopRootView")) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("IsInView");
    } else {
      (i = new PayShopViewData_1.PayShopViewData()).PayShopId = 4;
      ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(i, (e, r) => {
        if (e) {
          if (UiManager_1.UiManager.IsViewOpen("PayShopRootView")) {
            if (StringUtils_1.StringUtils.IsEmpty(o) || Number(o) === 0) {
              if (e = ModelManager_1.ModelManager.ItemTipsModel.GetCurrentItemTipsData()) {
                if (e = ModelManager_1.ModelManager.PayShopModel.GetGoodsInTab(4, e.ConfigId)) {
                  ControllerHolder_1.ControllerHolder.PayShopController.OpenExchangePopView(e.GetGoodsId());
                } else {
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Shop_UnableBuy_Desc01"));
                  this.Finish();
                }
              } else {
                this.Finish();
              }
            } else {
              ControllerHolder_1.ControllerHolder.PayShopController.OpenExchangePopView(Number(o));
            }
          } else {
            this.Finish();
          }
        }
      });
    }
  }
}
exports.SkipTaskPayShop = SkipTaskPayShop;
//# sourceMappingURL=SkipTaskPayShop.js.map