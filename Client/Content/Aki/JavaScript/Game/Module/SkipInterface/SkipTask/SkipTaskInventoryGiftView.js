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
  OnRun(e, r, a, i) {
    if (UiManager_1.UiManager.IsViewShow("InventoryGiftView")) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("IsInView");
    } else {
      if (ItemAccessedPathById_1.configItemAccessedPathById.GetConfig(i)) {
        let r = false;
        var n = ConfigManager_1.ConfigManager.ItemAccessedFromGiftPathConfig.GetGiftItemGroupById(i);
        var o = ModelManager_1.ModelManager.InventoryModel.GetItemNeedCount();
        for (const M of n) {
          var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(M);
          if (t > 0) {
            var s = this.Agm(M, i);
            let e = 1;
            if (o && o > 0 && s > 0) {
              e = Math.ceil(o / s);
            }
            e = Math.min(e, t);
            if (ControllerHolder_1.ControllerHolder.InventoryController.TryUseGiftItemWithSelectedItem(M, i, e)) {
              r = true;
              if (UiManager_1.UiManager.IsViewShow("ItemTipsView")) {
                UiManager_1.UiManager.CloseView("ItemTipsView");
              }
              break;
            }
          }
        }
        if (!r) {
          this.wec();
        }
        ModelManager_1.ModelManager.InventoryModel.SetItemNeedCount(undefined);
      }
      this.Finish();
    }
  }
  wec() {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("InventoryToGift_GiftNotFound");
  }
  Agm(e, r) {
    e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e).Parameters;
    return ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(e.values().next().value)?.Content.get(r) ?? 0;
  }
}
exports.SkipToInventoryGiftView = SkipToInventoryGiftView;
//# sourceMappingURL=SkipTaskInventoryGiftView.js.map