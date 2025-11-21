"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemAccessedFromGiftPathConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ItemAccessedPathById_1 = require("../../../../Core/Define/ConfigQuery/ItemAccessedPathById");
const ItemInfoById_1 = require("../../../../Core/Define/ConfigQuery/ItemInfoById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ItemDefines_1 = require("./ItemDefines");
class ItemAccessedFromGiftPathConfig extends ConfigBase_1.ConfigBase {
  GetItemAccessedFromGiftPathConfig(e) {
    return ItemAccessedPathById_1.configItemAccessedPathById.GetConfig(e);
  }
  GetGiftItemGroupById(e, t = false) {
    var r = new Array();
    var o = ItemAccessedPathById_1.configItemAccessedPathById.GetConfig(e);
    if (o) {
      for (const n of o.GiftItemGroup) {
        var i;
        var I = ItemInfoById_1.configItemInfoById.GetConfig(n);
        if (I && I.ItemType === 11 && I.Parameters.has(ItemDefines_1.EItemFunctionType.ManualOpenGift)) {
          I = I.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift);
          if ((i = ConfigManager_1.ConfigManager.GiftPackageConfig?.GetGiftPackageConfig(I)) && i.Content.has(e)) {
            r.push(n);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SkipInterface", 77, "[SkipInterface]礼包内不存在对应道具 ", ["itemID: ", e], ["giftItemID: ", n], ["giftID", I]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SkipInterface", 77, "[SkipInterface]道具存在异常 ", ["giftItemID: ", n]);
        }
      }
    } else if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SkipInterface", 77, "[SkipInterface]道具ID不存在，找不到ItemAccessedPath配置", ["itemID: ", e]);
      }
    }
    return r;
  }
}
exports.ItemAccessedFromGiftPathConfig = ItemAccessedFromGiftPathConfig;
//# sourceMappingURL=ItemAccessedFromGiftPathConfig.js.map