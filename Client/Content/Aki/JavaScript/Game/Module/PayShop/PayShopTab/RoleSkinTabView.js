"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleShopSkinTabView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const ShopSkinData_1 = require("../../Skin/Data/ShopSkinData");
const SkinBuyDetailViewData_1 = require("../../Skin/Data/SkinBuyDetailViewData");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RoleShopSkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this._3i = 0;
    this.bD = 0;
    this.eGe = undefined;
    this.oWi = () => new SkinItemContent();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this._3i = this.ExtraParams;
    this.bD = this.OpenParam;
    this.eGe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.oWi);
  }
  OnBeforeShow() {
    this.v4e();
  }
  v4e() {
    var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(this._3i, this.bD);
    var t = new Array();
    for (const r of e) {
      var i = new SkinItemContentData();
      var s = ShopSkinData_1.ShopSkinData.Create(r);
      i.ShopSkinData = s;
      i.AllData = e;
      t.push(i);
    }
    this.eGe.RefreshByData(t, undefined, true);
  }
  RefreshView(e) {}
}
exports.RoleShopSkinTabView = RoleShopSkinTabView;
class SkinItemContentData {
  constructor() {
    this.ShopSkinData = undefined;
    this.AllData = [];
  }
}
class SkinItemContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.YSl = undefined;
    this.NOe = 0;
    this.zSl = () => {
      var e = new Array();
      for (const h of this.YSl.AllData) {
        var t = ShopSkinData_1.ShopSkinData.Create(h);
        e.push(t);
      }
      var i = SkinBuyDetailViewData_1.SkinBuyDetailViewData.Create(e);
      i.SetIndex(this.NOe);
      i.SetPreviewTitle("RoleSkinShopTitle_Text");
      var s = e[this.NOe].GetPayShopGoods();
      var r = new LogReportDefine_1.OnClickPayShopItemLogEvent();
      r.i_id = s.GetGoodsId();
      r.i_shop_id = s.PayShopId;
      r.i_tab_id = s.GetGoodsData().TabId;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(r);
      UiManager_1.UiManager.OpenView("SkinBuyDetailView", i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UITexture], [15, UE.UITexture], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIText], [20, UE.UITexture]];
    this.BtnBindInfo = [[0, this.zSl]];
  }
  Refresh(e, t, i) {
    var s = e.ShopSkinData;
    this.YSl = e;
    this.NOe = i;
    this.Zke(s);
    this.ZSl(s);
    this.eyl(s);
    this.tyl(s);
    this.iyl(s);
    this.ryl(s);
    this.oyl(s);
    this.nyl(s);
    this.syl(s);
    this.FEl(s);
    this.VEl(s);
    this.HEl(s);
    this.JSl(s);
    this.nbl(s);
    this.f7l(s);
    this.CK1(s);
  }
  f7l(e) {
    e = e.GetRoleSkinData().GetSuitWeaponSkinId() > 0;
    this.GetItem(17).SetUIActive(e);
    this.GetItem(16).SetUIActive(e);
  }
  HEl(e) {
    e = e.GetCurrentGoodsData().GetIfNeedRemind();
    this.GetItem(13).SetUIActive(e);
  }
  FEl(e) {
    e = e.GetIfCanBuy();
    this.GetItem(11).SetUIActive(e);
  }
  VEl(e) {
    e = !e.GetIfCanBuy();
    this.GetItem(12).SetUIActive(e);
  }
  Zke(e) {
    e = e.GetPayShopPreviewRoleTexturePath();
    this.SetTextureByPath(e, this.GetTexture(1));
  }
  ZSl(e) {
    e = e.GetPayShopPreviewBuyRoleSuitWeaponTexturePath();
    if (e === "") {
      this.GetTexture(2)?.SetUIActive(false);
    } else {
      this.GetTexture(2)?.SetUIActive(true);
      this.SetTextureByPath(e, this.GetTexture(2));
    }
  }
  ryl(e) {
    if (e) {
      if (!e.GetIfDirect() && (e = e.GetPriceData().OriginalPrice)) {
        this.GetText(6).SetUIActive(true);
        this.GetText(6).SetText(`<s>${e.toString()}</s>`);
      } else {
        this.GetText(6).SetUIActive(false);
      }
    } else {
      this.GetText(6).SetText("");
    }
  }
  iyl(e) {
    var t;
    if (e) {
      if (e.GetIfDirect()) {
        t = e.GetDirectPriceText();
        this.GetText(5).SetText(t);
      } else {
        t = e.GetPriceData().NowPrice;
        this.GetText(5).SetText(t.toString());
      }
    } else {
      this.GetText(5).SetText("");
    }
  }
  syl(e) {
    var t;
    if (e) {
      t = e.GetIfDirect();
      this.GetTexture(10).SetUIActive(!t);
      if (!t) {
        t = e.GetPriceData();
        this.SetItemIcon(this.GetTexture(10), t.CurrencyId);
      }
    } else {
      this.GetTexture(10).SetUIActive(false);
    }
  }
  eyl(e) {
    e = e.GetPayShopGoods().GetShopTipsText();
    this.GetText(3).SetText(e);
  }
  tyl(e) {
    e = e.GetRoleSkinData().GetTitleName();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e);
  }
  oyl(e) {
    var t;
    if (e = e && e.GetDiscountTimeData()) {
      this.GetItem(7).SetUIActive(true);
      t = this.GetText(9);
      if (typeof e == "string") {
        t.SetText(e);
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(t, e.TextId, e.TimeValue);
      }
    } else {
      this.GetItem(7).SetUIActive(false);
    }
  }
  nyl(e) {
    if (e) {
      e = e.GetDiscountText();
      this.GetItem(7).SetUIActive(e !== "");
      this.GetText(8).SetText(e);
    } else {
      this.GetItem(7).SetUIActive(false);
    }
  }
  JSl(e) {
    if (e) {
      e = e.GetRoleSkinData().GetSuitWeaponSkinId() > 0 ? "T_ShopRoleItemBg1" : "T_ShopRoleItemBg";
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetTextureByPath(e, this.GetTexture(14));
    } else {
      this.GetTexture(14).SetUIActive(false);
    }
  }
  nbl(e) {
    if (e) {
      e = e.GetRoleSkinData().GetSuitWeaponSkinId() > 0 ? "T_ShopRoleItemTopBg1" : "T_ShopRoleItemTopBg";
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetTextureByPath(e, this.GetTexture(15));
    } else {
      this.GetTexture(15).SetUIActive(false);
    }
  }
  CK1(e) {
    var t;
    if (!e || (t = e.GetCurrentGoodsData().GetAvailableCouponItem()) === undefined) {
      this.GetItem(18).SetUIActive(false);
    } else {
      this.GetItem(18).SetUIActive(true);
      e = e.GetCurrentGoodsData().GetAvailableCouponDiscount();
      this.GetText(19).SetText("-" + e);
      this.SetTextureByPath(t.GetConfig().IconSmall, this.GetTexture(20));
    }
  }
}
//# sourceMappingURL=RoleSkinTabView.js.map