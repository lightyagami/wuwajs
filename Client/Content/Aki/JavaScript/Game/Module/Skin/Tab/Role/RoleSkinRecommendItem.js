"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinRecommendItem = exports.RoleSkinItemContent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ShopSkinData_1 = require("../../Data/ShopSkinData");
const SkinBuyDetailViewData_1 = require("../../Data/SkinBuyDetailViewData");
const SkinRewardItemGrid_1 = require("../../SkinRewardItemGrid");
class RoleSkinItemContent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dFl = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.SpineSkeletonAnimationComponent]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.dFl = new RoleSkinRecommendItem();
    await this.dFl.CreateByActorAsync(this.GetItem(0).GetOwner());
    this.dFl.GetOriginalItem()?.SetUIParent(this.RootItem);
  }
  Refresh(i) {
    this.dFl?.Refresh(i);
    this.dFl?.SetActive(true);
    this.GetSpine(1).SetAnimation(0, "idle", true);
  }
}
exports.RoleSkinItemContent = RoleSkinItemContent;
class RoleSkinRecommendItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Kyl = undefined;
    this.A6i = undefined;
    this.s4e = undefined;
    this.zSl = () => {
      var i = SkinBuyDetailViewData_1.SkinBuyDetailViewData.Create([this.Kyl]);
      i.SetPreviewTitle("RoleSkinPreviewTitle_Text");
      i.SetIndex(0);
      UiManager_1.UiManager.OpenView("SkinBuyDetailView", i);
    };
    this.W2e = () => {
      return new SkinRewardItemGrid_1.SkinRewardItemGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UITexture], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText], [14, UE.UITexture]];
    this.BtnBindInfo = [[7, this.zSl]];
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.W2e);
  }
  Refresh(i) {
    this.A6i = ConfigManager_1.ConfigManager.PayShopConfig.GetRecommendDataById(i);
    var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(this.A6i.RecommendId);
    if (e) {
      this.Kyl = ShopSkinData_1.ShopSkinData.Create(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Shop", 27, "PayShopData is null", ["id", i]);
    }
    this.Og();
  }
  Og() {
    this.sSt(this.Kyl);
    this.$yl(this.Kyl);
    this.jyl(this.Kyl);
    this.syl(this.Kyl);
    this.ryl(this.Kyl);
    this.iyl(this.Kyl);
    this.Oyl(this.Kyl);
    this.Ywn(this.Kyl);
    this.v4e(this.Kyl);
    this.MK1(this.Kyl);
  }
  sSt(i) {
    var e;
    if (i) {
      if (i = i.GetDiscountTimeData()) {
        this.GetText(2).SetUIActive(true);
        this.GetItem(10)?.SetUIActive(true);
        this.GetItem(11)?.SetUIActive(true);
        e = this.GetText(2);
        if (typeof i == "string") {
          e.SetText(i);
        } else {
          LguiUtil_1.LguiUtil.SetLocalText(e, i.TextId, i.TimeValue);
        }
      } else {
        this.GetText(2).SetUIActive(false);
        this.GetItem(10)?.SetUIActive(false);
        this.GetItem(11)?.SetUIActive(false);
      }
    } else {
      this.GetText(2)?.SetText("");
      this.GetItem(10)?.SetUIActive(false);
      this.GetItem(11)?.SetUIActive(false);
    }
  }
  $yl(i) {
    if (i) {
      i = i.GetRoleSkinData().GetTitleName();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i);
    } else {
      this.GetText(3).SetText("");
    }
  }
  jyl(i) {
    if (i) {
      i = i.GetRoleSkinData().GetSubTitle();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i);
    } else {
      this.GetText(4).SetText("");
    }
  }
  syl(i) {
    var e;
    if (i) {
      e = i.GetIfDirect();
      this.GetTexture(9).SetUIActive(!e);
      if (!e) {
        e = i.GetPriceData();
        this.SetItemIcon(this.GetTexture(9), e.CurrencyId);
      }
    } else {
      this.GetTexture(9).SetUIActive(false);
    }
  }
  ryl(i) {
    if (!i || i.GetIfDirect()) {
      this.GetText(6).SetText("");
    } else if (i = i.GetPriceData().OriginalPrice) {
      this.GetText(6).SetUIActive(true);
      this.GetText(6).SetText(`<s>${i.toString()}</s>`);
    } else {
      this.GetText(6).SetUIActive(false);
    }
  }
  iyl(i) {
    var e;
    if (i) {
      if (i.GetIfDirect()) {
        e = i.GetDirectPriceText();
        this.GetText(5).SetText(e);
      } else {
        e = i.GetPriceData().NowPrice;
        this.GetText(5).SetText(e.toString());
      }
    } else {
      this.GetText(5).SetText("");
    }
  }
  Oyl(i) {
    if (i) {
      i = i.GetIfCanBuy();
      this.GetButton(7).RootUIComp.SetUIActive(i);
    } else {
      this.GetButton(7).RootUIComp.SetUIActive(false);
    }
  }
  Ywn(i) {
    if (i) {
      i = i.GetIfCanBuy();
      this.GetItem(8).SetUIActive(!i);
    } else {
      this.GetItem(8).SetUIActive(false);
    }
  }
  v4e(i) {
    if (i) {
      var e = [];
      for (const r of i.GetAllReward()) {
        var t = new SkinRewardItemGrid_1.SkinRewardData();
        var s = [{
          IncId: r[0].IncId,
          ItemId: r[0].ItemId
        }, 0];
        t.ItemData = s;
        t.FinishState = i.GetCurrentGoodsData().IsSoldOut();
        e.push(t);
      }
      this.s4e?.SetActive(e.length !== 0);
      this.s4e?.RefreshByData(e);
    } else {
      this.s4e?.SetActive(false);
    }
  }
  MK1(i) {
    var e;
    if (i && (e = i.GetCurrentGoodsData().GetAvailableCouponItem())) {
      this.GetItem(12).SetUIActive(true);
      i = i.GetCurrentGoodsData().GetAvailableCouponDiscount();
      this.GetText(13).SetText((-i).toString());
      i = this.GetTexture(14);
      this.SetTextureByPath(e.GetConfig().IconSmall, i);
    } else {
      this.GetItem(12).SetUIActive(false);
    }
  }
}
exports.RoleSkinRecommendItem = RoleSkinRecommendItem;
//# sourceMappingURL=RoleSkinRecommendItem.js.map