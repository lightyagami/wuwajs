"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayItemModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PayItemDefine_1 = require("./PayItemDefine");
class PayItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.YOi = [];
    this.JOi = new Map();
    this.Version = "";
    this.zOi = undefined;
    this.cFa = new Map();
  }
  UpdateProductInfoMap(e) {
    e.forEach(e => {
      this.cFa.set(e.GoodId, e);
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Pay", 16, "PayItemModel UpdateProductInfoMap:", ["ProductInfoMap", this.cFa]);
    }
  }
  GetProductLabelByGoodsId(e) {
    return this.cFa.get(e)?.GoodLabel;
  }
  GetProductChannelGoodsIdByGoodsId(e) {
    return this.cFa.get(e)?.ChannelGoodId;
  }
  GetProductInfoByGoodsId(e) {
    return this.cFa.get(e);
  }
  GetDataList() {
    return this.YOi;
  }
  GetPayingItemName() {
    return this.zOi;
  }
  CleanPayingItemName() {
    this.zOi = undefined;
  }
  ConvertPayItemDataToPayShopItemBaseSt(e) {
    return e.ConvertPayItemDataToPayShopItemBaseSt();
  }
  UpdatePayingItemName(e) {
    e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(e);
    e = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.ItemId);
    this.zOi = e;
  }
  ResetSpecialBonus(e) {
    for (const a of e) {
      var t = this.JOi.get(a);
      if (t) {
        t.CanSpecialBonus = true;
      }
    }
  }
  InitDataListByServer(e) {
    if (this.YOi.length !== 0 && e.length !== 0) {
      this.YOi.length = 0;
    }
    for (const a of e) {
      var t = new PayItemDefine_1.PayItemData();
      t.Phrase(a);
      this.YOi.push(t);
      this.JOi.set(a.s5n, t);
    }
  }
  OnClear() {
    this.YOi.length = 0;
    this.YOi = undefined;
    this.JOi.clear();
    this.Version = "";
    return !(this.zOi = undefined);
  }
  CreateSdkPayment(e, t, a) {
    var e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(e);
    var r = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.ItemId);
    var o = ConfigManager_1.ConfigManager.ItemConfig.GetItemDesc(e.ItemId);
    var n = e.PayId;
    var s = ModelManager_1.ModelManager.RechargeModel.GetPayIdAmount(n);
    return {
      product_id: ModelManager_1.ModelManager.RechargeModel.GetPayIdProductId(n),
      cpOrderId: t,
      price: s,
      goodsName: "" + r + e.ItemCount,
      goodsDesc: "" + o + e.ItemCount,
      extraParams: " ",
      callbackUrl: a,
      currency: ""
    };
  }
  HasBonusData() {
    if (this.YOi.length !== 0) {
      for (const e of this.YOi) {
        if (e.CanSpecialBonus) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.PayItemModel = PayItemModel;
//# sourceMappingURL=PayItemModel.js.map