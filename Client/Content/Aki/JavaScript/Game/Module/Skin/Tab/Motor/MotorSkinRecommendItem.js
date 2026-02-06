"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorSkinRecommendItem = exports.MotorSkinItemContent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const TotalTopUpPayAdditiveTagItem_1 = require("../../../Activity/ActivityContent/TotalTopUp/View/TotalTopUpPayAdditiveTagItem");
const LogReportDefine_1 = require("../../../LogReport/LogReportDefine");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MotorSkinBuyDetailViewData_1 = require("../../Data/MotorSkinBuyDetailViewData");
const ShopMotorSkinData_1 = require("../../Data/ShopMotorSkinData");
const SkinRewardItemGrid_1 = require("../../SkinRewardItemGrid");
class MotorSkinItemContent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.zkg = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.SpineSkeletonAnimationComponent]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.zkg = new MotorSkinRecommendItem();
    await this.zkg.CreateByActorAsync(this.GetItem(0).GetOwner());
    this.zkg.GetOriginalItem()?.SetUIParent(this.RootItem);
  }
  Refresh(t) {
    this.zkg?.Refresh(t);
    this.zkg?.SetActive(true);
    this.GetSpine(1).SetAnimation(0, "idle", true);
  }
}
exports.MotorSkinItemContent = MotorSkinItemContent;
class MotorSkinRecommendItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Kyl = undefined;
    this.A6i = undefined;
    this.s4e = undefined;
    this.DNg = undefined;
    this.zSl = () => {
      var t = MotorSkinBuyDetailViewData_1.MotorSkinBuyDetailViewData.Create([this.Kyl]);
      t.SetIndex(0);
      t.SetPreviewTitle("MotorSkinShopTitle_Text");
      UiManager_1.UiManager.OpenView("MotorSkinBuyDetailView", t);
      var t = new LogReportDefine_1.OnClickRecommendSkinButtonLogEvent();
      t.i_operation_type = 1;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
    };
    this.W2e = () => {
      var t = new SkinRewardItemGrid_1.SkinRewardItemGrid();
      t.OnClickRecommendSkinButtonCallback = t => {
        var e = new LogReportDefine_1.OnClickRecommendSkinButtonLogEvent();
        e.i_operation_type = 0;
        e.i_item_id = t;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
      };
      return t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UITexture], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText], [14, UE.UITexture], [15, UE.UIItem]];
    this.BtnBindInfo = [[7, this.zSl]];
  }
  async OnBeforeStartAsync() {
    this.DNg = new TotalTopUpPayAdditiveTagItem_1.TotalTopUpPayAdditiveTagItem();
    await this.DNg.CreateByResourceIdAsync("UiItem_CumulativeRechargeScoreTag", this.GetItem(15));
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.W2e);
  }
  Refresh(t) {
    this.A6i = ModelManager_1.ModelManager.PayShopModel.GetRecommendDataById(t);
    var e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(this.A6i.RecommendId);
    if (e) {
      this.Kyl = ShopMotorSkinData_1.ShopMotorSkinData.Create(e);
      this.DNg?.RefreshByGoodsId(e.GetGoodsId());
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Shop", 5, "PayShopData is null", ["id", t]);
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
  sSt(t) {
    var e;
    if (t) {
      if (t = t.GetDiscountTimeData()) {
        this.GetText(2).SetUIActive(true);
        this.GetItem(10)?.SetUIActive(true);
        this.GetItem(11)?.SetUIActive(true);
        e = this.GetText(2);
        if (typeof t == "string") {
          e.SetText(t);
        } else {
          LguiUtil_1.LguiUtil.SetLocalText(e, t.TextId, t.TimeValue);
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
  $yl(t) {
    if (t) {
      t = t.GetMotorSkinData().GetName();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t);
    } else {
      this.GetText(3).SetText("");
    }
  }
  jyl(t) {
    if (t) {
      t = t.GetMotorSkinData().GetName();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t);
    } else {
      this.GetText(4).SetText("");
    }
  }
  syl(t) {
    var e;
    if (t) {
      e = t.GetIfDirect();
      this.GetTexture(9).SetUIActive(!e);
      if (!e) {
        e = t.GetPriceData();
        this.SetItemIcon(this.GetTexture(9), e.CurrencyId);
      }
    } else {
      this.GetTexture(9).SetUIActive(false);
    }
  }
  ryl(t) {
    if (!t || t.GetIfDirect()) {
      this.GetText(6).SetText("");
    } else if (t = t.GetPriceData().OriginalPrice) {
      this.GetText(6).SetUIActive(true);
      this.GetText(6).SetText(`<s>${t.toString()}</s>`);
    } else {
      this.GetText(6).SetUIActive(false);
    }
  }
  iyl(t) {
    var e;
    if (t) {
      if (t.GetIfDirect()) {
        e = t.GetDirectPriceText();
        this.GetText(5).SetText(e);
      } else {
        e = t.GetPriceData().NowPrice;
        this.GetText(5).SetText(e.toString());
      }
    } else {
      this.GetText(5).SetText("");
    }
  }
  Oyl(t) {
    if (t) {
      t = t.GetIfCanBuy();
      this.GetButton(7).RootUIComp.SetUIActive(t);
      this.GetItem(15).SetUIActive(t);
    } else {
      this.GetButton(7).RootUIComp.SetUIActive(false);
    }
  }
  Ywn(t) {
    if (t) {
      t = t.GetIfCanBuy();
      this.GetItem(8).SetUIActive(!t);
    } else {
      this.GetItem(8).SetUIActive(false);
    }
  }
  v4e(t) {
    if (t) {
      var e = [];
      for (const s of t.GetAllReward()) {
        var i = new SkinRewardItemGrid_1.SkinRewardData();
        var r = [{
          IncId: s[0].IncId,
          ItemId: s[0].ItemId
        }, 0];
        i.ItemData = r;
        i.FinishState = t.GetCurrentGoodsData().IsSoldOut();
        e.push(i);
      }
      this.s4e?.SetActive(e.length !== 0);
      this.s4e?.RefreshByData(e);
    } else {
      this.s4e?.SetActive(false);
    }
  }
  MK1(t) {
    var e;
    if (t && (e = t.GetCurrentGoodsData().GetAvailableCouponItem())) {
      this.GetItem(12).SetUIActive(true);
      t = t.GetCurrentGoodsData().GetAvailableCouponDiscount();
      this.GetText(13).SetText((-t).toString());
      t = this.GetTexture(14);
      this.SetTextureByPath(e.GetConfig().IconSmall, t);
    } else {
      this.GetItem(12).SetUIActive(false);
    }
  }
}
exports.MotorSkinRecommendItem = MotorSkinRecommendItem;
//# sourceMappingURL=MotorSkinRecommendItem.js.map