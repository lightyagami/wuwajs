"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayPackageData = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PayShopGoods_1 = require("./PayShopGoods");
const PayShopGoodsData_1 = require("./PayShopGoodsData");
class PayPackageData {
  constructor() {
    this.he = "";
    this.vFi = undefined;
    this.Id = 0;
    this.PayId = 0;
    this.ItemId = 0;
    this.ItemCount = 0;
    this.Sort = 0;
    this.BuyLimit = 0;
    this.BoughtCount = 0;
    this.StageImage = "";
    this.ShowStageImage = "";
    this.BeginTime = 0;
    this.EndTime = 0;
    this.UpdateTime = 0;
    this.UpdateType = 0;
    this.ProductId = "";
    this.Amount = "";
    this.TabId = 0;
    this.Type = 3;
    this.IsLock = false;
    this.IsCanBuy = true;
    this.IsRemind = false;
    this.BuyCondition = 0;
    this.CloudGameTime = 0;
    this.CloudGameIcon = "";
    this.CloudGameDesc = "";
    this.LabelId = 0;
    this.LastUpdateTime = 0;
    this.PromotionShow = 0;
    this.vFi = new PayShopGoods_1.PayShopGoods(3);
  }
  Phrase(t) {
    this.Id = t.s5n ?? 0;
    this.PayId = t.sBs ?? 0;
    this.ItemId = t.L8n ?? 0;
    this.ItemCount = t.n9n ?? 0;
    this.Sort = t.cBs ?? 0;
    this.BuyLimit = t.dBs ?? 0;
    this.BoughtCount = t.X7n ?? 0;
    this.StageImage = t._Bs ?? "";
    this.ShowStageImage = t.Mku ?? "";
    this.BeginTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.cps));
    this.EndTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.dps));
    this.UpdateTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.Lxs));
    this.LastUpdateTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.JT_));
    this.UpdateType = Number(t.OAs);
    this.ProductId = t.uBs ?? "";
    this.Amount = t.$6n ?? "";
    this.TabId = t.mBs ?? 0;
    this.Type = t.h5n ?? 3;
    this.IsLock = t.pBs ?? false;
    this.IsCanBuy = t.Yb_ ?? true;
    this.IsRemind = t.zb_ ?? false;
    this.BuyCondition = t.Jb_ ?? [];
    this.CloudGameTime = t.b2_ ?? 0;
    this.CloudGameIcon = t.L2_ ?? "";
    this.CloudGameDesc = t.gxs ?? "";
    this.LabelId = t.VRu ?? 0;
    this.PromotionShow = t.jRu ?? 0;
    this.MFi();
    this.vFi.SetGoodsData(this.pql());
    this.vFi.SetPayGiftId(this.Id);
    if (this.ShowInSkinShop() || this.ShowInFlySkinShop()) {
      this.vFi.GetGoodsData().SetShowAfterSoldOut(true);
    }
  }
  MFi() {
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ItemId);
    this.he = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
    if (this.ItemCount > 1) {
      t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("GoodsName");
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
      this.he = StringUtils_1.StringUtils.Format(t, this.he, this.ItemCount.toString());
    }
  }
  ShowInShop() {
    return this.Type !== 2 && !this.ShowInSkinShop() && !this.ShowInFlySkinShop();
  }
  ShowInSkinShop() {
    return this.vFi?.CheckIfRoleSkinGoods() ?? false;
  }
  ShowInFlySkinShop() {
    return this.vFi?.CheckIfFlySkinGoods() ?? false;
  }
  GetName() {
    return this.he;
  }
  GetPayShopGoods() {
    return this.vFi;
  }
  pql() {
    var t = new PayShopGoodsData_1.PayShopGoodsData();
    t.PhraseFromPayPackageData(this);
    return t;
  }
  CanShowInShopTab() {
    var t = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedConfirmSdkProductInfo();
    if (t && !ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(this.ProductId)) {
      return false;
    }
    return true;
  }
}
exports.PayPackageData = PayPackageData;
//# sourceMappingURL=PayPackageData.js.map