"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToInventoryGiftView = undefined;
const ItemAccessedPathById_1 = require("../../../../Core/Define/ConfigQuery/ItemAccessedPathById");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const SkipTask_1 = require("./SkipTask");
class SkipToInventoryGiftView extends SkipTask_1.SkipTask {
  OnRun(e, r, i, o) {
    if (UiManager_1.UiManager.IsViewShow("InventoryGiftView")) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("IsInView");
    } else {
      if (ItemAccessedPathById_1.configItemAccessedPathById.GetConfig(o)) {
        let e = false;
        for (const n of ConfigManager_1.ConfigManager.ItemAccessedFromGiftPathConfig.GetGiftItemGroupById(o)) {
          var a = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n);
          if (a > 0 && ControllerHolder_1.ControllerHolder.InventoryController.TryUseGiftItemWithSelectedItem(n, o, 1)) {
            e = true;
            if (UiManager_1.UiManager.IsViewShow("ItemTipsView")) {
              UiManager_1.UiManager.CloseView("ItemTipsView");
            }
            break;
          }
        }
        if (!e) {
          this.wec();
        }
      }
      this.Finish();
    }
  }
  wec() {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("InventoryToGift_GiftNotFound");
  }
}
exports.SkipToInventoryGiftView = SkipToInventoryGiftView;
//# sourceMappingURL=SkipTaskInventoryGiftView.js.map