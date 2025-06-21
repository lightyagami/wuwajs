"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ShopFlySkinTabView = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  FlySkinBuyDetailViewData_1 = require("../../Skin/Data/FlySkinBuyDetailViewData"),
  ShopFlySkinData_1 = require("../../Skin/Data/ShopFlySkinData"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class ShopFlySkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments), this._3i = 0, this.bD = 0, this.eGe = void 0, this.oWi = () => new FlySkinItemContent
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem]
    ]
  }
  OnStart() {
    this._3i = this.ExtraParams, this.bD = this.Params, this.eGe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.oWi)
  }
  OnBeforeShow() {
    this.v4e()
  }
  v4e() {
    var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(this._3i, this.bD),
      e = new Array;
    for (const r of t) {
      var i = new FlySkinItemContentData,
        s = ShopFlySkinData_1.ShopFlySkinData.Create(r);
      i.ShopFlySkinData = s, i.AllData = t, e.push(i)
    }
    this.eGe.RefreshByData(e, void 0, !0)
  }
  RefreshView(t) {}
}
exports.ShopFlySkinTabView = ShopFlySkinTabView;
class FlySkinItemContentData {
  constructor() {
    this.ShopFlySkinData = void 0, this.AllData = []
  }
}
class FlySkinItemContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.qN1 = void 0, this.NOe = 0, this.zSl = () => {
      var t = this.qN1.AllData,
        e = new Array;
      for (const s of t) {
        var i = ShopFlySkinData_1.ShopFlySkinData.Create(s);
        e.push(i)
      }
      t = FlySkinBuyDetailViewData_1.FlySkinBuyDetailViewData.Create(e);
      t.SetIndex(this.NOe), t.SetPreviewTitle("FlySkinShopTitle_Text"), UiManager_1.UiManager.OpenView("FlySkinBuyDetailView", t)
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
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UITexture],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UITexture],
      [15, UE.UITexture],
      [16, UE.UIItem],
      [17, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.zSl]
    ]
  }
  Refresh(t, e, i) {
    var s = t.ShopFlySkinData;
    this.qN1 = t, this.NOe = i, this.Zke(s), this.ZSl(), this.eyl(s), this.tyl(s), this.iyl(s), this.ryl(s), this.oyl(s), this.nyl(s), this.syl(s), this.FEl(s), this.VEl(s), this.HEl(s), this.JSl(s), this.nbl(s), this.f7l(s)
  }
  f7l(t) {
    t = 1 === t.GetFlySkinData().GetSkinGrade();
    this.GetItem(17).SetUIActive(t), this.GetItem(16).SetUIActive(t)
  }
  HEl(t) {
    t = t.GetCurrentGoodsData().GetIfNeedRemind();
    this.GetItem(13).SetUIActive(t)
  }
  FEl(t) {
    t = t.GetIfCanBuy();
    this.GetItem(11).SetUIActive(t)
  }
  VEl(t) {
    t = !t.GetIfCanBuy();
    this.GetItem(12).SetUIActive(t)
  }
  Zke(t) {
    t = t.GetPreviewTextureInPayShop();
    this.SetTextureByPath(t, this.GetTexture(1))
  }
  ZSl() {
    this.GetTexture(2)?.SetUIActive(!1)
  }
  ryl(t) {
    t ? !t.GetIfDirect() && (t = t.GetPriceData().OriginalPrice) ? (this.GetText(6).SetUIActive(!0), this.GetText(6).SetText(`<s>${t.toString()}</s>`)) : this.GetText(6).SetUIActive(!1) : this.GetText(6).SetText("")
  }
  iyl(t) {
    var e;
    t ? t.GetIfDirect() ? (e = t.GetDirectPriceText(), this.GetText(5).SetText(e)) : (e = t.GetPriceData().NowPrice, this.GetText(5).SetText(e.toString())) : this.GetText(5).SetText("")
  }
  syl(t) {
    var e;
    t ? (e = t.GetIfDirect(), this.GetTexture(10).SetUIActive(!e), e || (e = t.GetPriceData(), this.SetItemIcon(this.GetTexture(10), e.CurrencyId))) : this.GetTexture(10).SetUIActive(!1)
  }
  eyl(t) {
    t = t.GetPayShopGoods().GetShopTipsText();
    this.GetText(3).SetText(t)
  }
  tyl(t) {
    t = t.GetPayShopGoods().GetItemData().Name;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t)
  }
  oyl(t) {
    var e;
    (t = t && t.GetDiscountTimeData()) ? (this.GetItem(7).SetUIActive(!0), e = this.GetText(9), "string" == typeof t ? e.SetText(t) : LguiUtil_1.LguiUtil.SetLocalText(e, t.TextId, t.TimeValue)) : this.GetItem(7).SetUIActive(!1)
  }
  nyl(t) {
    t ? (t = t.GetDiscountText(), this.GetItem(7).SetUIActive("" !== t), this.GetText(8).SetText(t)) : this.GetItem(7).SetUIActive(!1)
  }
  JSl(t) {
    t ? (t = 1 === t.GetFlySkinData().GetSkinGrade() ? "T_ShopRoleItemBg1" : "T_ShopRoleItemBg", t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t), this.SetTextureByPath(t, this.GetTexture(14))) : this.GetTexture(14).SetUIActive(!1)
  }
  nbl(t) {
    t ? (t = 1 === t.GetFlySkinData().GetSkinGrade() ? "T_ShopRoleItemTopBg1" : "T_ShopRoleItemTopBg", t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t), this.SetTextureByPath(t, this.GetTexture(15))) : this.GetTexture(15).SetUIActive(!1)
  }
}
//# sourceMappingURL=ShopFlySkinTabView.js.map