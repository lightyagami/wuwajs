"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonGameplayShopItemProxy = undefined;
const LanguageSystem_1 = require("../../../../../Core/Common/LanguageSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GameplayShopUtil_1 = require("../GameplayShopUtil");
const AbstractGameplayShopItemProxy_1 = require("./AbstractGameplayShopItemProxy");
const NORMALCOLOR = "000000FF";
const REDCOLOR = "BA5C59FF";
class CommonGameplayShopItemProxy extends AbstractGameplayShopItemProxy_1.AbstractGameplayShopItemProxy {
  constructor() {
    super(...arguments);
    this.GoodsData = undefined;
  }
  UpdatePriceData() {
    if (this.GoodsData) {
      var i = this.GoodsData.GetPriceData();
      this.CurrencyId = i.CurrencyId;
      let t = NORMALCOLOR;
      if (i.OwnNumber() < i.NowPrice) {
        t = REDCOLOR;
      }
      this.NowPriceTextColor = t;
      if (i.NowPrice === 0) {
        this.CurrencyIconVisible = false;
        this.NowPriceTextData.SetData(new LguiUtil_1.TableTextArgNew("ShopDiscountLabel_4"));
      } else {
        this.CurrencyIconVisible = true;
        this.NowPriceTextData.SetContent(i.NowPrice.toString());
      }
      var s = i.OriginalPrice;
      this.OriginalPriceVisible = s !== undefined && i.InDiscountTime;
      if (this.OriginalPriceVisible) {
        this.OriginalPriceTextData.SetContent(`<s>${s.toString()}</s>`);
      }
    }
  }
  UpdateItemName() {
    if (this.GoodsData) {
      this.ItemNameTextData.SetContent(this.GoodsData.GetGoodsData().GetGoodsName(LanguageSystem_1.LanguageSystem.PackageLanguage));
    }
  }
  UpdateDiscountData() {
    if (this.GoodsData && (this.DiscountItemVisible = this.GoodsData.HasDiscount(), this.DiscountItemVisible)) {
      this.DiscountTextData.SetContent(StringUtils_1.StringUtils.Format("-{0}%", this.GoodsData.GetDiscount().toString()));
    }
  }
  UpdateLockData() {
    if (this.GoodsData && (this.LockItemVisible = !this.GoodsData.IfCanBuy(), this.LockItemVisible)) {
      this.LockTextData.SetData(new LguiUtil_1.TableTextArgNew(this.GoodsData.GetConditionTextId()));
    }
  }
  UpdateSoldOutData() {
    if (this.GoodsData && (this.SoldOutItemVisible = this.GoodsData.IsLimitGoods() && this.GoodsData.IsSoldOut(), this.SoldOutItemVisible)) {
      this.SoldOutTextData.SetContent(this.GoodsData.GetDownTipsText());
    }
  }
  UpdateQualityData() {
    var t;
    if (this.GoodsData && (t = this.GoodsData.GetItemData())) {
      t = ModelManager_1.ModelManager.PayShopModel.GetPayShopItemQualitySpriteByItemIdAndQuality(t.ItemId, t.Quality);
      this.QualitySpritePath = t;
    }
  }
  UpdateItemIconData() {
    if (this.GoodsData) {
      this.ItemId = this.GoodsData.GetGoodsData().ItemId;
    }
  }
  UpdateBuyLimitCountText() {
    var t;
    if (this.GoodsData) {
      if ((t = this.GoodsData.GetShopTipsText()) && !StringUtils_1.StringUtils.IsEmpty(t)) {
        this.BuyLimitCountTextVisible = true;
        this.BuyLimitCountTextData.SetContent(t);
      } else {
        this.BuyLimitCountTextVisible = false;
      }
    }
  }
  UpdateRedDot() {
    if (this.GoodsData) {
      this.RedDotVisible = this.GoodsData.GetIfNeedRemind();
    }
  }
  UpdateLabel() {
    var t;
    if (this.GoodsData && (t = this.GoodsData.GetDiscountLabel(), this.LabelVisible = t > 0 && this.GoodsData.InLabelShowTime(), this.LabelVisible)) {
      t = ConfigManager_1.ConfigManager.PayShopConfig.GetShopDiscountLabel(t);
      this.LabelTextData.SetData(new LguiUtil_1.TableTextArgNew(t));
    }
  }
  UpdateLeftTime() {
    var t;
    var i;
    if (this.GoodsData && (t = (i = this.GoodsData.GetCountDownData())[0], i = i[1], this.LeftTimeItemVisible = i !== undefined && t !== 2, this.LeftTimeItemVisible)) {
      if (typeof i == "string") {
        this.LeftTimeTextData.SetContent(i);
      } else {
        this.LeftTimeTextData.SetData(new LguiUtil_1.TableTextArgNew(i.TextId, i.TimeValue));
      }
    }
  }
  UpdateReSell() {
    var t;
    if (this.GoodsData && (t = this.GoodsData.GetResellText(), this.ReSellItemVisible = t !== undefined && !StringUtils_1.StringUtils.IsEmpty(t), this.ReSellItemVisible)) {
      t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(t);
      this.ReSellTextData.SetContent(t);
    }
  }
  UpdateRaycastTarget() {
    this.RaycastTarget = true;
  }
  UpdateBottomBgVisible() {
    this.BottomBgVisible = true;
  }
  OnBuyButtonClick() {
    if (this.GoodsData) {
      GameplayShopUtil_1.GameplayShopUtil.OpenExchangePopView(this.GoodsData);
    }
  }
  UpdateFromPayShopGoods(t) {
    this.GoodsData = t;
    this.UpdatePriceData();
    this.UpdateItemName();
    this.UpdateDiscountData();
    this.UpdateLockData();
    this.UpdateSoldOutData();
    this.UpdateQualityData();
    this.UpdateItemIconData();
    this.UpdateBuyLimitCountText();
    this.UpdateRedDot();
    this.UpdateLabel();
    this.UpdateLeftTime();
    this.UpdateReSell();
    this.UpdateRaycastTarget();
    this.UpdateBottomBgVisible();
  }
}
exports.CommonGameplayShopItemProxy = CommonGameplayShopItemProxy;
//# sourceMappingURL=CommonGameplayShopItemProxy.js.map