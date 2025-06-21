"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RoleSkinRecommendItem = exports.RoleSkinItemContent = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ShopSkinData_1 = require("../../Data/ShopSkinData"),
  SkinBuyDetailViewData_1 = require("../../Data/SkinBuyDetailViewData"),
  SkinRewardItemGrid_1 = require("../../SkinRewardItemGrid");
class RoleSkinItemContent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.dFl = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.SpineSkeletonAnimationComponent]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), this.dFl = new RoleSkinRecommendItem, await this.dFl.CreateByActorAsync(this.GetItem(0).GetOwner()), this.dFl.GetOriginalItem()?.SetUIParent(this.RootItem)
  }
  Refresh(i) {
    this.dFl?.Refresh(i), this.dFl?.SetActive(!0), this.GetSpine(1).SetAnimation(0, "idle", !0)
  }
}
exports.RoleSkinItemContent = RoleSkinItemContent;
class RoleSkinRecommendItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Kyl = void 0, this.A6i = void 0, this.s4e = void 0, this.zSl = () => {
      var i = SkinBuyDetailViewData_1.SkinBuyDetailViewData.Create([this.Kyl]);
      i.SetPreviewTitle("RoleSkinPreviewTitle_Text"), i.SetIndex(0), UiManager_1.UiManager.OpenView("SkinBuyDetailView", i)
    }, this.W2e = () => {
      return new SkinRewardItemGrid_1.SkinRewardItemGrid
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UITexture],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UITexture]
    ], this.BtnBindInfo = [
      [7, this.zSl]
    ]
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.W2e)
  }
  Refresh(i) {
    this.A6i = ConfigManager_1.ConfigManager.PayShopConfig.GetRecommendDataById(i);
    var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(this.A6i.RecommendId);
    e ? this.Kyl = ShopSkinData_1.ShopSkinData.Create(e) : Log_1.Log.CheckError() && Log_1.Log.Error("Shop", 27, "PayShopData is null", ["id", i]), this.Og()
  }
  Og() {
    this.sSt(this.Kyl), this.$yl(this.Kyl), this.jyl(this.Kyl), this.syl(this.Kyl), this.ryl(this.Kyl), this.iyl(this.Kyl), this.Oyl(this.Kyl), this.Ywn(this.Kyl), this.v4e(this.Kyl), this.BQ1(this.Kyl)
  }
  sSt(i) {
    var e;
    i ? (i = i.GetDiscountTimeData()) ? (this.GetText(2).SetUIActive(!0), this.GetItem(10)?.SetUIActive(!0), this.GetItem(11)?.SetUIActive(!0), e = this.GetText(2), "string" == typeof i ? e.SetText(i) : LguiUtil_1.LguiUtil.SetLocalText(e, i.TextId, i.TimeValue)) : (this.GetText(2).SetUIActive(!1), this.GetItem(10)?.SetUIActive(!1), this.GetItem(11)?.SetUIActive(!1)) : (this.GetText(2)?.SetText(""), this.GetItem(10)?.SetUIActive(!1), this.GetItem(11)?.SetUIActive(!1))
  }
  $yl(i) {
    i ? (i = i.GetRoleSkinData().GetTitleName(), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i)) : this.GetText(3).SetText("")
  }
  jyl(i) {
    i ? (i = i.GetRoleSkinData().GetSubTitle(), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i)) : this.GetText(4).SetText("")
  }
  syl(i) {
    var e;
    i ? (e = i.GetIfDirect(), this.GetTexture(9).SetUIActive(!e), e || (e = i.GetPriceData(), this.SetItemIcon(this.GetTexture(9), e.CurrencyId))) : this.GetTexture(9).SetUIActive(!1)
  }
  ryl(i) {
    !i || i.GetIfDirect() ? this.GetText(6).SetText("") : (i = i.GetPriceData().OriginalPrice) ? (this.GetText(6).SetUIActive(!0), this.GetText(6).SetText(`<s>${i.toString()}</s>`)) : this.GetText(6).SetUIActive(!1)
  }
  iyl(i) {
    var e;
    i ? i.GetIfDirect() ? (e = i.GetDirectPriceText(), this.GetText(5).SetText(e)) : (e = i.GetPriceData().NowPrice, this.GetText(5).SetText(e.toString())) : this.GetText(5).SetText("")
  }
  Oyl(i) {
    i ? (i = i.GetIfCanBuy(), this.GetButton(7).RootUIComp.SetUIActive(i)) : this.GetButton(7).RootUIComp.SetUIActive(!1)
  }
  Ywn(i) {
    i ? (i = i.GetIfCanBuy(), this.GetItem(8).SetUIActive(!i)) : this.GetItem(8).SetUIActive(!1)
  }
  v4e(i) {
    if (i) {
      var e = [];
      for (const r of i.GetAllReward()) {
        var t = new SkinRewardItemGrid_1.SkinRewardData,
          s = [{
            IncId: r[0].IncId,
            ItemId: r[0].ItemId
          }, 0];
        t.ItemData = s, t.FinishState = i.GetCurrentGoodsData().IsSoldOut(), e.push(t)
      }
      this.s4e?.SetActive(0 !== e.length), this.s4e?.RefreshByData(e)
    } else this.s4e?.SetActive(!1)
  }
  BQ1(i) {
    var e;
    i && (e = i.GetCurrentGoodsData().GetAvailableCouponItem()) ? (this.GetItem(12).SetUIActive(!0), i = i.GetCurrentGoodsData().GetAvailableCouponDiscount(), this.GetText(13).SetText((-i).toString()), i = this.GetTexture(14), this.SetTextureByPath(e.GetConfig().IconSmall, i)) : this.GetItem(12).SetUIActive(!1)
  }
}
exports.RoleSkinRecommendItem = RoleSkinRecommendItem;
//# sourceMappingURL=RoleSkinRecommendItem.js.map