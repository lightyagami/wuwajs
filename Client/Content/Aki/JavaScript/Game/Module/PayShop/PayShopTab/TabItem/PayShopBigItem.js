"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PayShopBigItem = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  HelpController_1 = require("../../../Help/HelpController"),
  PayItemController_1 = require("../../../PayItem/PayItemController"),
  PayItemDefine_1 = require("../../../PayItem/PayItemDefine"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PayShopGoods_1 = require("../../PayShopData/PayShopGoods"),
  PayShopDefine_1 = require("../../PayShopDefine"),
  PayShopTagItem_1 = require("./PayShopTagItem"),
  NORMALCOLOR = "000000FF",
  REDCOLOR = "BA5C59FF";
class PayShopBigItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Pe = void 0, this.zj1 = void 0, this.Jj1 = new Map, this.G3i = void 0, this.C3i = !1, this.E3i = 0, this.Zj1 = !0, this.e71 = 0, this.ckn = "", this.t71 = 0, this.R3i = () => {
      this.Pe && this.IsUiActiveInHierarchy() && (this.RefreshCommonItem(), this.RefreshRechargeItem(), this.i71(), this.iFi(), this.r71(), this.RefreshRedDot(), this.Pe instanceof PayShopGoods_1.PayShopGoods) && (this.o71(this.Pe) || this.n71(this.Pe)) && this.TryEmitRefreshTips()
    }, this.USe = t => {
      this.Pe instanceof PayShopGoods_1.PayShopGoods || t.PayItemId !== this.Pe.PayItemId || (this.Pe.CanSpecialBonus = !1, this.Refresh(this.Pe, !1, 0), Log_1.Log.CheckInfo() && Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 充值成功,道具到账", ["订单号", t.OrderId], ["道具id", t.ItemId], ["道具数量", t.ItemCount]))
    }, this.s71 = () => {
      HelpController_1.HelpController.OpenHelpById(PayShopDefine_1.MONTH_CARD_HELP_ID)
    }, this.jbe = () => {
      this.Pe instanceof PayItemDefine_1.PayItemData ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 点击充值", ["Id", this.Pe.PayItemId]), PayItemController_1.PayItemController.SdkPay(this.Pe.PayItemId)) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 点击商品", ["Id", this.Pe.GetGoodsData().Id]), ControllerHolder_1.ControllerHolder.PayShopController.OpenBuyViewByGoodsId(this.Pe))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [12, UE.UIItem],
      [11, UE.UIItem],
      [13, UE.UITexture],
      [14, UE.UINiagara],
      [15, UE.UINiagara],
      [16, UE.UITexture]
    ], this.BtnBindInfo = [
      [7, this.s71],
      [0, this.jbe]
    ]
  }
  OnStart() {
    this.GetButton(0).SetCanClickWhenDisable(!0), this.GetItem(9)?.SetUIActive(!1), this.GetTexture(16).SetUIActive(!1)
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DiscountShopTimerRefresh, this.R3i), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPayItemSuccess, this.USe)
  }
  Refresh(t, i, e) {
    var s;
    t && ((this.Pe = t) instanceof PayShopGoods_1.PayShopGoods ? (this.zj1 = t.ConvertToPayShopBaseSt(), this.Zj1 = 0 !== t.GetCountDownData()[2], this.C3i = t.HasDiscount(), this.E3i = t.GetDiscountNew()) : this.zj1 = ModelManager_1.ModelManager.PayItemModel.ConvertPayItemDataToPayShopItemBaseSt(t), this.GetText(3).SetText(this.zj1.ItemName), t = this.GetTexture(2), "" !== this.zj1.StageImage ? (s = this.zj1.StageImage, this.SetTextureByPath(s, t)) : this.SetItemIcon(t, this.zj1.ItemId), s = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(this.zj1.Quality), this.SetTextureByPath(s.PayShopQualityTexture, this.GetTexture(1)), this.GetUiNiagara(14)?.SetUIActive(this.zj1.Quality === PayShopDefine_1.GOLD_QUALITY), this.GetUiNiagara(15)?.SetUIActive(this.zj1.Quality === PayShopDefine_1.GOLD_QUALITY), t = ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId(), this.GetButton(7).RootUIComp.SetUIActive(this.zj1.Id === t), s = this.GetTexture(13), t = this.zj1.PriceData, this.zj1.IsDirect || 0 === t.NowPrice ? s.SetUIActive(!1) : (s.SetUIActive(!0), this.SetItemIcon(s, t.CurrencyId)), this.i71(), this.iFi(), this.r71(), this.RefreshRedDot(), this.RefreshCommonItem(), this.RefreshRechargeItem())
  }
  RefreshCommonItem() {
    !this.Pe || this.Pe instanceof PayItemDefine_1.PayItemData || (this.h71(this.Pe), this.a71(this.Pe), this.U3i(this.Pe), this.B2t(this.Pe))
  }
  RefreshRechargeItem() {
    !this.Pe || this.Pe instanceof PayShopGoods_1.PayShopGoods || this.l71(this.Pe)
  }
  U3i(e) {
    var t;
    0 !== this.t71 ? this.Jj1.get(11)?.SetUiActive(!1) : (t = e.HasDiscount(), this._71(11, t, () => {
      var t = this.Jj1.get(11),
        i = e.GetDiscountNew(),
        i = (t?.SetText(StringUtils_1.StringUtils.Format("+{0}%", i.toString())), e.IsLimitGoods() && e.IsSoldOut() || !e.IfCanBuy());
      t?.SetMaskVisible(i)
    }))
  }
  B2t(t) {
    var t = t.GetCountDownData(),
      i = (this.e71 = t[0], t[1]);
    0 === t[2] ? (this.GetItem(9).SetUIActive(!1), this.GetTexture(16).SetUIActive(!1)) : this.w6e(i)
  }
  w6e(t) {
    this.GetItem(9).SetUIActive(!0), this.GetTexture(16).SetUIActive(!0);
    var i = this.GetText(10);
    "string" == typeof t ? i.SetText(t) : LguiUtil_1.LguiUtil.SetLocalText(i, t.TextId, t.TimeValue)
  }
  a71(t) {
    var i = t.IsLimitGoods() && t.IsSoldOut(),
      i = (this._71(9, i, () => {
        this.Jj1.get(9)?.SetText(t.GetDownTipsText())
      }, !1), !t.IfCanBuy());
    this._71(10, i, () => {
      this.Jj1.get(10)?.SetText(t.GetDownTipsText())
    }, !1)
  }
  h71(e) {
    const s = e.GetDiscountLabel();
    this.t71 !== s && (this._71(this.t71, !1, () => {}), this.t71 = s);
    var t = 0 < s && e.InLabelShowTime();
    this._71(this.t71, t, () => {
      var t = ConfigManager_1.ConfigManager.PayShopConfig.GetShopDiscountLabel(s),
        i = this.Jj1.get(this.t71),
        t = (i?.SetTextByTextId(t), e.IsLimitGoods() && e.IsSoldOut() || !e.IfCanBuy());
      i?.SetMaskVisible(t)
    })
  }
  l71(t) {
    var i = t.CanSpecialBonus,
      i = (this._71(8, i, () => {
        this.Jj1.get(8)?.SetTextByTextId("Text_FirstBonus2_Text", t.SpecialBonusItemCount)
      }), 0 < t.BonusItemCount && !i);
    this._71(7, i, () => {
      this.Jj1.get(7)?.SetTextByTextId("Text_DefaultBonus_Text", t.BonusItemCount)
    })
  }
  _71(t, i, e, s = !0) {
    var h, r = this.Jj1.get(t);
    i && !r && (h = new PayShopTagItem_1.PayShopTagItem, this.Jj1.set(t, h), t = PayShopDefine_1.payShopTagTypeToResourceId[t], s = s ? this.GetItem(12) : this.GetItem(11), h.CreateThenShowByResourceIdAsync(t, s).then(() => {
      e()
    })), r?.SetUiActive(i), e()
  }
  i71() {
    var t = this.GetText(6),
      i = this.zj1.PriceData;
    i && i.OriginalPrice && i.InDiscountTime ? (t.SetUIActive(!0), t.SetText(`<s>${i.OriginalPrice.toString()}</s>`)) : t.SetUIActive(!1)
  }
  iFi() {
    let t = NORMALCOLOR;
    var i, e;
    !this.zj1.IsDirect && this.zj1.PriceData.OwnNumber() < this.zj1.PriceData.NowPrice && (t = REDCOLOR), this.G3i && this.G3i === this.zj1.PriceData && this.ckn === t || (this.ckn = t, this.G3i = this.zj1?.PriceData, i = this.GetText(5), this.zj1.IsDirect ? (e = this.zj1.GetDirectPriceTextFunc?.()) && (i.SetText(e), i.SetColor(UE.Color.FromHex(t))) : (0 === (e = this.zj1.PriceData).NowPrice ? i.ShowTextNew("ShopDiscountLabel_4") : i.SetText(e.NowPrice.toString()), i.SetColor(UE.Color.FromHex(t))))
  }
  r71() {
    var t = this.GetText(4),
      i = this.zj1.GetShopTipsText?.();
    2 === this.e71 || StringUtils_1.StringUtils.IsEmpty(i) ? t.SetUIActive(!1) : (t.SetUIActive(!0), t.SetText(i))
  }
  RefreshRedDot() {
    this.zj1.RedDotExistFunc ? this.GetItem(8).SetUIActive(this.zj1.RedDotExistFunc()) : this.GetItem(8).SetUIActive(!1)
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DiscountShopTimerRefresh, this.R3i), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPayItemSuccess, this.USe)
  }
  o71(t) {
    t = t.GetCountDownData()[2];
    return 0 === t && this.Zj1 ? !(this.Zj1 = !1) : 0 !== t && !this.Zj1 && (this.Zj1 = !0)
  }
  n71(t) {
    var i = t.HasDiscount();
    return i && !this.C3i ? this.C3i = !0 : !i && this.C3i ? !(this.C3i = !1) : !(!(i = t.GetDiscountNew()) || i === this.E3i || (this.E3i = i, 0))
  }
  TryEmitRefreshTips() {
    ControllerHolder_1.ControllerHolder.PayShopController.ClosePayShopGoodDetailPopView(), ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen() || this.Pe instanceof PayItemDefine_1.PayItemData || EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayShop, this.Pe.PayShopId, !0)
  }
}
exports.PayShopBigItem = PayShopBigItem;
//# sourceMappingURL=PayShopBigItem.js.map