"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayItemData = undefined;
const PayItem_1 = require("../../../Core/Define/Config/PayItem");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PayShopItemBase_1 = require("../PayShop/PayShopTab/TabItem/PayShopItemBase");
class PayItemData {
  constructor() {
    this.XOi = undefined;
    this.$Oi = 0;
    this.Amount = "";
    this.ProductId = "";
    this.PayItemId = 0;
    this.ItemId = 0;
    this.ItemCount = 0;
    this.BonusItemCount = 0;
    this.SpecialBonusItemCount = 0;
    this.CanSpecialBonus = false;
    this.StageImage = "";
    this.DisclaimerText = "";
  }
  Phrase(t) {
    this.$Oi = t.sBs ?? 0;
    this.Amount = t.$6n;
    this.ProductId = t.uBs;
    this.PayItemId = t.s5n ?? 0;
    this.ItemId = t.L8n ?? 0;
    this.ItemCount = t.n9n ?? 0;
    this.BonusItemCount = t.aBs ?? 0;
    this.SpecialBonusItemCount = t.hBs ?? 0;
    this.StageImage = t._Bs ?? "";
    ModelManager_1.ModelManager.RechargeModel.SetRechargeInfo(this.$Oi, this.Amount.toString(), this.ProductId);
    if (!(t instanceof PayItem_1.PayItem)) {
      this.CanSpecialBonus = t.lBs ?? undefined;
    }
    this.DisclaimerText = t.czd ?? "";
    this.XOi = new PayShopItemBase_1.PayShopItemBaseSt();
    this.XOi.PhrasePromPayItemData(this);
  }
  ConvertPayItemDataToPayShopItemBaseSt() {
    this.XOi.Refresh(this);
    return this.XOi;
  }
  GetPayItemShowName() {
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ItemId).Name);
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("GoodsName");
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    return StringUtils_1.StringUtils.Format(e, t, this.ItemCount.toString());
  }
  GetDirectPriceText() {
    var t = ModelManager_1.ModelManager.KuroSdkModel?.GetQueryProductShowPrice(this.$Oi.toString());
    return t || ConfigManager_1.ConfigManager.PayItemConfig.GetPayShow(this.$Oi);
  }
  GetIfCanShow() {
    var t = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedConfirmSdkProductInfo();
    if (t && !ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(this.ProductId)) {
      return false;
    }
    return true;
  }
  GetGachaAverageCount() {
    var t = ConfigManager_1.ConfigManager.PayItemConfig.GetRechargeItemRate();
    if (t <= 0) {
      return 0;
    } else {
      t = this.qzd() / t;
      return Math.floor(t * 10) / 10;
    }
  }
  GetGachaAveragePriceText() {
    var t = Math.floor(ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(this.$Oi).Amount * 10000) / 10000;
    var e = ConfigManager_1.ConfigManager.PayItemConfig.GetRechargeItemRate();
    var t = t / (this.qzd() / e);
    return "" + Math.ceil(t * 100) / 100 + ConfigManager_1.ConfigManager.PayItemConfig.GetRegionMainCurrency();
  }
  qzd() {
    if (this.CanSpecialBonus) {
      return this.ItemCount + this.SpecialBonusItemCount;
    } else {
      return this.ItemCount + this.BonusItemCount;
    }
  }
}
exports.PayItemData = PayItemData;
//# sourceMappingURL=PayItemDefine.js.map