"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinRecommendItem = exports.RoleSkinItemContent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LogReportDefine_1 = require("../../../LogReport/LogReportDefine");
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
  Refresh(e) {
    this.dFl?.Refresh(e);
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
      var e = SkinBuyDetailViewData_1.SkinBuyDetailViewData.Create([this.Kyl]);
      e.SetPreviewTitle("RoleSkinPreviewTitle_Text");
      e.SetIndex(0);
      UiManager_1.UiManager.OpenView("SkinBuyDetailView", e);
      var e = new LogReportDefine_1.OnClickRecommendSkinButtonLogEvent();
      e.i_operation_type = 1;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    };
    this.W2e = () => {
      var e = new SkinRewardItemGrid_1.SkinRewardItemGrid();
      e.OnClickRecommendSkinButtonCallback = e => {
        var i = new LogReportDefine_1.OnClickRecommendSkinButtonLogEvent();
        i.i_operation_type = 0;
        i.i_item_id = e;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i);
      };
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UITexture], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText], [14, UE.UITexture]];
    this.BtnBindInfo = [[7, this.zSl]];
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.W2e);
  }
  Refresh(e) {
    this.A6i = ModelManager_1.ModelManager.PayShopModel.GetRecommendDataById(e);
    var i = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(this.A6i.RecommendId);
    if (i) {
      this.Kyl = ShopSkinData_1.ShopSkinData.Create(i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Shop", 27, "PayShopData is null", ["id", e]);
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
  sSt(e) {
    var i;
    if (e) {
      if (e = e.GetDiscountTimeData()) {
        this.GetText(2).SetUIActive(true);
        this.GetItem(10)?.SetUIActive(true);
        this.GetItem(11)?.SetUIActive(true);
        i = this.GetText(2);
        if (typeof e == "string") {
          i.SetText(e);
        } else {
          LguiUtil_1.LguiUtil.SetLocalText(i, e.TextId, e.TimeValue);
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
  $yl(e) {
    if (e) {
      e = e.GetRoleSkinData().GetTitleName();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e);
    } else {
      this.GetText(3).SetText("");
    }
  }
  jyl(e) {
    if (e) {
      e = e.GetRoleSkinData().GetSubTitle();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e);
    } else {
      this.GetText(4).SetText("");
    }
  }
  syl(e) {
    var i;
    if (e) {
      i = e.GetIfDirect();
      this.GetTexture(9).SetUIActive(!i);
      if (!i) {
        i = e.GetPriceData();
        this.SetItemIcon(this.GetTexture(9), i.CurrencyId);
      }
    } else {
      this.GetTexture(9).SetUIActive(false);
    }
  }
  ryl(e) {
    if (!e || e.GetIfDirect()) {
      this.GetText(6).SetText("");
    } else if (e = e.GetPriceData().OriginalPrice) {
      this.GetText(6).SetUIActive(true);
      this.GetText(6).SetText(`<s>${e.toString()}</s>`);
    } else {
      this.GetText(6).SetUIActive(false);
    }
  }
  iyl(e) {
    var i;
    if (e) {
      if (e.GetIfDirect()) {
        i = e.GetDirectPriceText();
        this.GetText(5).SetText(i);
      } else {
        i = e.GetPriceData().NowPrice;
        this.GetText(5).SetText(i.toString());
      }
    } else {
      this.GetText(5).SetText("");
    }
  }
  Oyl(e) {
    if (e) {
      e = e.GetIfCanBuy();
      this.GetButton(7).RootUIComp.SetUIActive(e);
    } else {
      this.GetButton(7).RootUIComp.SetUIActive(false);
    }
  }
  Ywn(e) {
    if (e) {
      e = e.GetIfCanBuy();
      this.GetItem(8).SetUIActive(!e);
    } else {
      this.GetItem(8).SetUIActive(false);
    }
  }
  v4e(e) {
    if (e) {
      var i = [];
      for (const r of e.GetAllReward()) {
        var t = new SkinRewardItemGrid_1.SkinRewardData();
        var s = [{
          IncId: r[0].IncId,
          ItemId: r[0].ItemId
        }, 0];
        t.ItemData = s;
        t.FinishState = e.GetCurrentGoodsData().IsSoldOut();
        i.push(t);
      }
      this.s4e?.SetActive(i.length !== 0);
      this.s4e?.RefreshByData(i);
    } else {
      this.s4e?.SetActive(false);
    }
  }
  MK1(e) {
    var i;
    if (e && (i = e.GetCurrentGoodsData().GetAvailableCouponItem())) {
      this.GetItem(12).SetUIActive(true);
      e = e.GetCurrentGoodsData().GetAvailableCouponDiscount();
      this.GetText(13).SetText((-e).toString());
      e = this.GetTexture(14);
      this.SetTextureByPath(i.GetConfig().IconSmall, e);
    } else {
      this.GetItem(12).SetUIActive(false);
    }
  }
}
exports.RoleSkinRecommendItem = RoleSkinRecommendItem;
//# sourceMappingURL=RoleSkinRecommendItem.js.map