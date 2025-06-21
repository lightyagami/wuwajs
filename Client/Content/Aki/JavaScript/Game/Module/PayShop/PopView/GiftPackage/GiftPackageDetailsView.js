"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GiftPackageDetailsView = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LguiResourceManager_1 = require("../../../../Ui/LguiResourceManager"),
  ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PayShopFlySkinItem_1 = require("../../PayShopTab/TabItem/PayShopFlySkinItem"),
  PayShopItem_1 = require("../../PayShopTab/TabItem/PayShopItem"),
  PayShopSkinItem_1 = require("../../PayShopTab/TabItem/PayShopSkinItem"),
  GiftPackageMonthlyCardItem_1 = require("./GiftPackageMonthlyCardItem"),
  GiftPackageSupplyPackItem_1 = require("./GiftPackageSupplyPackItem");
class GiftPackageDetailsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this._yl = void 0, this.uyl = void 0, this.Data = void 0, this.Goods = void 0, this.GoodsData = void 0, this.ResellTimerId = void 0, this.l4i = ItemDefines_1.EItemFunctionType.ManualOpenGift, this._4i = void 0, this.xe = void 0, this.bAt = () => {
      this.CloseMe()
    }, this.qAt = () => {
      var i;
      this.IsEnoughMoney() && this.GoodsData.IfPayGift() ? (ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(this.GoodsData.Id), this.CloseMe()) : this.IsEnoughMoney() && !this.GoodsData.IfPayGift() ? (ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopBuy(this.GoodsData.Id), this.CloseMe()) : (i = ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency(), this.GoodsData.Price.Id === i ? (ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowFirstCurrencyConfirm(), this.CloseMe()) : (i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(this.GoodsData.Price.Id), i = new LguiUtil_1.TableTextArgNew(i.Name), ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ShopResourceNotEnough", i)))
    }, this.Pgi = () => {
      this.CloseMe()
    }, this.P3i = () => {
      this.RemoveResellTimer();
      var i, e = this.Goods.GetExchangePopViewResellText();
      this.Goods.GetIfNeedExtraLimitText() ? (i = this.Goods.GetExtraLimitText()) && (this.GetItem(7).SetUIActive(!0), this.GetText(8).ShowTextNew(i)) : this.Goods.GetPriceData().Enough ? 2 !== (i = this.Goods.GetCountDownData())[0] ? (this.GetItem(7).SetUIActive(!1), this.GetText(8).SetUIActive(!1)) : (this.GetItem(7).SetUIActive(!0), StringUtils_1.StringUtils.IsEmpty(e) || this.GetText(8).ShowTextNew(e), this.ResellTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(this.P3i, i[2] * CommonDefine_1.MILLIONSECOND_PER_SECOND)) : StringUtils_1.StringUtils.IsEmpty(e) ? (this.GetItem(7).SetUIActive(!0), (i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.Goods.GetPriceData().CurrencyId)) && (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name), LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "CurrencyNotEnough", i))) : this.GetText(8).ShowTextNew(e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIInteractionGroup],
      [8, UE.UIText],
      [7, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [12, UE.UITexture],
      [11, UE.UIText]
    ], this.BtnBindInfo = [
      [4, this.bAt],
      [5, this.qAt]
    ]
  }
  OnBeforeCreate() {
    var i, e, t = this.OpenParam,
      t = (this.Goods = t.PayShopGoods, this.GoodsData = this.Goods.GetGoodsData(), ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.GoodsData.ItemId));
    this.xe = void 0;
    for ([i, e] of t.Parameters) {
      var s = ItemDefines_1.EItemFunctionType[i];
      if (!StringUtils_1.StringUtils.IsEmpty(s)) {
        this.l4i = i, this.xe = e;
        break
      }
    }
    this.xe || Log_1.Log.CheckError() && Log_1.Log.Error("Config", 43, "检查道具ID的参数（Parameters）字段 是否 表示为正确的指向道具id的参数", ["道具ID", this.GoodsData.ItemId])
  }
  async OnCreateAsync() {
    await this.sGe(this.Goods)
  }
  async sGe(i) {
    const e = new CustomPromise_1.CustomPromise;
    var t = i.CheckIfRoleSkinGoods(),
      s = i.CheckIfFlySkinGoods(),
      i = this.cyl(i);
    t || s ? t ? LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(i, void 0, i => {
      this.uyl = new PayShopSkinItem_1.PayShopSkinItem, this.uyl.CreateByActorAsync(i).finally(() => {
        e.SetResult(!0)
      })
    }) : s && LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(i, void 0, i => {
      this.uyl = new PayShopFlySkinItem_1.PayShopFlySkinItem, this.uyl.CreateByActorAsync(i).finally(() => {
        e.SetResult(!0)
      })
    }) : LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(i, void 0, i => {
      this._yl = new PayShopItem_1.PayShopItem, this._yl.CreateByActorAsync(i).finally(() => {
        e.SetResult(!0)
      })
    }), await e.Promise
  }
  cyl(i) {
    var e = i.CheckIfRoleSkinGoods(),
      i = i.CheckIfFlySkinGoods();
    return e || i ? "UiItem_ShopSkinItem" : "UiItem_ShopItem"
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PayShopGoodsBuy, this.bAt)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PayShopGoodsBuy, this.bAt)
  }
  OnStart() {
    var i;
    this.xe && (i = this.GetItem(1), this.l4i === ItemDefines_1.EItemFunctionType.AutoOpenMonthCard ? this._4i = new GiftPackageMonthlyCardItem_1.GiftPackageMonthlyCardItem(this.xe, i) : this.l4i !== ItemDefines_1.EItemFunctionType.AutoOpenGift && this.l4i !== ItemDefines_1.EItemFunctionType.ManualOpenGift || (this._4i = new GiftPackageSupplyPackItem_1.GiftPackageSupplyPackItem(this.xe, i, this.Goods)), this._yl?.GetOriginalItem()?.SetUIParent(this.GetItem(0), !1), this.uyl?.GetOriginalItem()?.SetUIParent(this.GetItem(0), !1), this._yl?.SetActive(!0), this.uyl?.SetActive(!0))
  }
  OnBeforeShow() {
    this._yl?.HidePackageViewElement(), this.myl(), this._yl?.Refresh(this.Goods, !1, 0), this.uyl?.Refresh(this.Goods, !1, 0), this.SetInteractionGroup(), this.P3i(), this.ITt(), this.kV_(), this.PQ1()
  }
  myl() {
    var i = ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId();
    this.Goods?.GetGoodsId() === i && this._yl?.SetLeftTimeTextShowState(!0)
  }
  async ITt() {
    var i;
    this.Goods.IsDirect() || 0 !== this.GoodsData.GetNowPrice() && (0 < this.Goods.GetPriceData().CurrencyId && ((i = new Array).push(this.Goods.GetPriceData().CurrencyId), await this.ChildPopView?.PopItem.SetCurrencyItemList(i)), (this.ChildPopView?.PopItem.GetCurrencyComponent().GetCurrencyItemList()).forEach(i => {
      i.SetBeforeButtonFunction(this.Pgi), i.SetToPayShopFunction()
    }))
  }
  kV_() {
    this.GetItem(9).SetUIActive(this.Goods.HasCloudGameInfo() && !this.Goods.GetIfNeedExtraLimitText())
  }
  PQ1() {
    var i, e = this.GetItem(10),
      t = this.GetTexture(12),
      s = this.GetText(11),
      r = this.Goods.GetAvailableCouponItem();
    !r || this.Goods.IsDirect() || !this.Goods.GetPriceData().Enough || this.Goods.GetIfNeedExtraLimitText() ? e.SetUIActive(!1) : (e.SetUIActive(!0), e = this.Goods.GetAvailableCouponDiscount(), i = this.Goods.GetPriceData().CurrencyId, i = `<texture=${ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(i)?.IconSmall??""},0.6/>`, LguiUtil_1.LguiUtil.SetLocalTextNew(s, "ItemInfo_50020_Tip", e, i), this.SetTextureByPath(r.GetConfig().IconSmall, t))
  }
  OnBeforeDestroy() {
    this._4i && this._4i.Destroy(), this.RemoveResellTimer()
  }
  RemoveResellTimer() {
    void 0 !== this.ResellTimerId && (TimerSystem_1.RealTimeTimerSystem.Remove(this.ResellTimerId), this.ResellTimerId = void 0)
  }
  IsEnoughMoney() {
    return !!this.GoodsData.IsDirect() || this.Goods.GetPriceData().Enough
  }
  SetInteractionGroup() {
    var i = this.GetInteractionGroup(6);
    this.Goods.IsLocked() || this.Goods.IsSoldOut() || !this.Goods.IfCanBuy() || !this.Goods.GetPriceData().Enough ? i.SetInteractable(!1) : i.SetInteractable(!0)
  }
}
exports.GiftPackageDetailsView = GiftPackageDetailsView;
//# sourceMappingURL=GiftPackageDetailsView.js.map