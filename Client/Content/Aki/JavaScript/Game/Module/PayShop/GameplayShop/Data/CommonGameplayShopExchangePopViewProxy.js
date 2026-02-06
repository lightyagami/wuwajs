"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonGameplayShopExchangePopViewProxy = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GameplayShopItem_1 = require("../ShopItem/GameplayShopItem");
const AbstractGameplayShopExchangePopViewProxy_1 = require("./AbstractGameplayShopExchangePopViewProxy");
const CommonGameplayExchangeShopItemProxy_1 = require("./CommonGameplayExchangeShopItemProxy");
class CommonGameplayShopExchangePopViewProxy extends AbstractGameplayShopExchangePopViewProxy_1.AbstractGameplayShopExchangePopViewProxy {
  constructor() {
    super(...arguments);
    this.GoodsData = undefined;
    this.ShopItemProxy = undefined;
    this.ShopItem = undefined;
  }
  UpdateShopItemData() {
    var t;
    if (this.GoodsData) {
      (t = new CommonGameplayExchangeShopItemProxy_1.CommonGameplayExchangeShopItemProxy()).UpdateFromPayShopGoods(this.GoodsData);
      this.ShopItemProxy = t;
    }
  }
  UpdateShopItemResource() {
    this.ShopItemResource = "UiItem_ShopItem";
  }
  UpdateTipTitleItem() {
    var t;
    if (this.GoodsData) {
      t = this.GoodsData.GetBuyLimitText();
      this.TipTitleItemVisible = !StringUtils_1.StringUtils.IsEmpty(t);
    }
  }
  UpdateCurrency() {
    var t;
    if (this.GoodsData) {
      t = this.GoodsData.GetPriceData().CurrencyId;
      this.CurrencyId = t;
      this.CurrencyIdList = [t];
    }
  }
  UpdatePrice() {
    var t;
    if (this.GoodsData) {
      t = this.GoodsData.GetGoodsData().GetNowPrice();
      this.Price = t;
    }
  }
  UpdateDescribeText() {
    var t;
    if (this.GoodsData) {
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.GoodsData.GetGoodsData().ItemId).AttributesDescription;
      t = new LguiUtil_1.TableTextArgNew(t);
      this.DescribeTextData.SetData(t);
    }
  }
  UpdateLeftTime() {
    var t;
    if (this.GoodsData) {
      if ((t = this.GoodsData.GetCountDownData())[2] === 0) {
        this.LeftTimeItemVisible = false;
      } else {
        this.LeftTimeTextVisible = t[0] === 3;
        if (this.LeftTimeTextVisible) {
          this.LeftTimeTextData.SetData(new LguiUtil_1.TableTextArgNew("DownShopItem"));
        }
        t = t[1];
        if (this.LeftTimeItemVisible = t !== undefined) {
          if (typeof t == "string") {
            this.LeftTimeTextData.SetContent(t);
          } else {
            this.LeftTimeTextData.SetData(new LguiUtil_1.TableTextArgNew(t.TextId, t.TimeValue));
          }
        }
      }
    }
  }
  UpdateLockData() {
    var t;
    if (this.GoodsData) {
      if (this.GoodsData.GetIfNeedExtraLimitText()) {
        if (t = this.GoodsData.GetExtraLimitText()) {
          this.LockItemVisible = true;
          this.LockTextData.SetData(new LguiUtil_1.TableTextArgNew(t));
        } else {
          this.LockItemVisible = false;
        }
      } else if (this.CheckMoneyEnough()) {
        if (this.GoodsData.GetCountDownData()[1]) {
          const e = this.GoodsData.GetExchangePopViewResellText();
          if (StringUtils_1.StringUtils.IsEmpty(e)) {
            this.LockItemVisible = false;
          } else {
            this.LockItemVisible = true;
            this.LockTextData.SetData(new LguiUtil_1.TableTextArgNew(e));
          }
        } else {
          this.LockItemVisible = false;
        }
      } else {
        this.LockItemVisible = true;
        const e = this.GoodsData.GetExchangePopViewResellText();
        if (StringUtils_1.StringUtils.IsEmpty(e)) {
          t = this.FDg();
          this.LockTextData.SetData(new LguiUtil_1.TableTextArgNew("CurrencyNotEnough", t));
        } else {
          this.LockTextData.SetData(new LguiUtil_1.TableTextArgNew(e));
        }
      }
    }
  }
  FDg() {
    var t;
    if (this.GoodsData) {
      t = this.GoodsData.GetPriceData().CurrencyId;
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name) ?? "";
    } else {
      return "";
    }
  }
  UpdateFromPayShopGoods(t) {
    this.GoodsData = t;
    this.UpdateShopItemData();
    this.UpdateShopItemResource();
    this.UpdateTipTitleItem();
    this.UpdateCurrency();
    this.UpdatePrice();
    this.UpdateDescribeText();
    this.UpdateLeftTime();
    this.UpdateLockData();
  }
  OnConfirmButtonClick(i) {
    var t;
    if (this.GoodsData) {
      if (this.CheckMoneyEnough()) {
        this.SendBuyRequest((t, e) => {
          if (t) {
            UiManager_1.UiManager.CloseViewById(i);
          }
        });
      } else {
        t = this.GoodsData.GetGoodsData();
        t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.Price.Id);
        t = new LguiUtil_1.TableTextArgNew(t.Name);
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ShopResourceNotEnough", t);
      }
    }
  }
  SendBuyRequest(t) {
    var e;
    var i;
    if (this.GoodsData) {
      e = this.GoodsData.GetGoodsData();
      (i = new Array()).push(new Protocol_1.Aki.Protocol.EIg({
        s5n: e.Id,
        m9n: this.BuyCount
      }));
      ControllerHolder_1.ControllerHolder.PayShopController.ActivityPayShopBuyRequest(i, t);
    }
  }
  CheckConfirmButtonCanInteract() {
    var t;
    var e;
    var i;
    var r;
    return !!this.GoodsData && (t = this.GoodsData.IfCanBuy(), e = this.GoodsData.GetPriceData().Enough, i = this.GoodsData.IsLocked(), r = this.GoodsData.IsSoldOut(), t) && e && !i && !r;
  }
  ShopItemCreate() {
    this.ShopItem = new GameplayShopItem_1.GameplayShopItem();
    return this.ShopItem;
  }
  ShopItemRefresh() {
    var t = this.ShopItem;
    var e = this.ShopItemProxy;
    if (t && e) {
      t.RefreshByData(e);
    }
  }
  CheckMoneyEnough() {
    var t;
    var e;
    return !!this.GoodsData && (e = (t = this.GoodsData.GetGoodsData()).Price.Id, ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) >= t.GetNowPrice() * this.BuyCount);
  }
  OnResellTimeRefresh() {}
}
exports.CommonGameplayShopExchangePopViewProxy = CommonGameplayShopExchangePopViewProxy;
//# sourceMappingURL=CommonGameplayShopExchangePopViewProxy.js.map