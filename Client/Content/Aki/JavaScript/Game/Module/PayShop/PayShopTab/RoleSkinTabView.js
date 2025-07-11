"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleShopSkinTabView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
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
    var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(this._3i, this.bD);
    var e = new Array();
    for (const r of t) {
      var i = new SkinItemContentData();
      var s = ShopSkinData_1.ShopSkinData.Create(r);
      i.ShopSkinData = s;
      i.AllData = t;
      e.push(i);
    }
    this.eGe.RefreshByData(e, undefined, true);
  }
  RefreshView(t) {}
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
      var t = this.YSl.AllData;
      var e = new Array();
      for (const s of t) {
        var i = ShopSkinData_1.ShopSkinData.Create(s);
        e.push(i);
      }
      t = SkinBuyDetailViewData_1.SkinBuyDetailViewData.Create(e);
      t.SetIndex(this.NOe);
      t.SetPreviewTitle("RoleSkinShopTitle_Text");
      UiManager_1.UiManager.OpenView("SkinBuyDetailView", t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UITexture], [15, UE.UITexture], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIText], [20, UE.UITexture]];
    this.BtnBindInfo = [[0, this.zSl]];
  }
  Refresh(t, e, i) {
    var s = t.ShopSkinData;
    this.YSl = t;
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
    this.dK1(s);
  }
  f7l(t) {
    t = t.GetRoleSkinData().GetSuitWeaponSkinId() > 0;
    this.GetItem(17).SetUIActive(t);
    this.GetItem(16).SetUIActive(t);
  }
  HEl(t) {
    t = t.GetCurrentGoodsData().GetIfNeedRemind();
    this.GetItem(13).SetUIActive(t);
  }
  FEl(t) {
    t = t.GetIfCanBuy();
    this.GetItem(11).SetUIActive(t);
  }
  VEl(t) {
    t = !t.GetIfCanBuy();
    this.GetItem(12).SetUIActive(t);
  }
  Zke(t) {
    t = t.GetPayShopPreviewRoleTexturePath();
    this.SetTextureByPath(t, this.GetTexture(1));
  }
  ZSl(t) {
    t = t.GetPayShopPreviewBuyRoleSuitWeaponTexturePath();
    if (t === "") {
      this.GetTexture(2)?.SetUIActive(false);
    } else {
      this.GetTexture(2)?.SetUIActive(true);
      this.SetTextureByPath(t, this.GetTexture(2));
    }
  }
  ryl(t) {
    if (t) {
      if (!t.GetIfDirect() && (t = t.GetPriceData().OriginalPrice)) {
        this.GetText(6).SetUIActive(true);
        this.GetText(6).SetText(`<s>${t.toString()}</s>`);
      } else {
        this.GetText(6).SetUIActive(false);
      }
    } else {
      this.GetText(6).SetText("");
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
  syl(t) {
    var e;
    if (t) {
      e = t.GetIfDirect();
      this.GetTexture(10).SetUIActive(!e);
      if (!e) {
        e = t.GetPriceData();
        this.SetItemIcon(this.GetTexture(10), e.CurrencyId);
      }
    } else {
      this.GetTexture(10).SetUIActive(false);
    }
  }
  eyl(t) {
    t = t.GetPayShopGoods().GetShopTipsText();
    this.GetText(3).SetText(t);
  }
  tyl(t) {
    t = t.GetRoleSkinData().GetTitleName();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t);
  }
  oyl(t) {
    var e;
    if (t = t && t.GetDiscountTimeData()) {
      this.GetItem(7).SetUIActive(true);
      e = this.GetText(9);
      if (typeof t == "string") {
        e.SetText(t);
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(e, t.TextId, t.TimeValue);
      }
    } else {
      this.GetItem(7).SetUIActive(false);
    }
  }
  nyl(t) {
    if (t) {
      t = t.GetDiscountText();
      this.GetItem(7).SetUIActive(t !== "");
      this.GetText(8).SetText(t);
    } else {
      this.GetItem(7).SetUIActive(false);
    }
  }
  JSl(t) {
    if (t) {
      t = t.GetRoleSkinData().GetSuitWeaponSkinId() > 0 ? "T_ShopRoleItemBg1" : "T_ShopRoleItemBg";
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
      this.SetTextureByPath(t, this.GetTexture(14));
    } else {
      this.GetTexture(14).SetUIActive(false);
    }
  }
  nbl(t) {
    if (t) {
      t = t.GetRoleSkinData().GetSuitWeaponSkinId() > 0 ? "T_ShopRoleItemTopBg1" : "T_ShopRoleItemTopBg";
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
      this.SetTextureByPath(t, this.GetTexture(15));
    } else {
      this.GetTexture(15).SetUIActive(false);
    }
  }
  dK1(t) {
    var e;
    if (!t || (e = t.GetCurrentGoodsData().GetAvailableCouponItem()) === undefined) {
      this.GetItem(18).SetUIActive(false);
    } else {
      this.GetItem(18).SetUIActive(true);
      t = t.GetCurrentGoodsData().GetAvailableCouponDiscount();
      this.GetText(19).SetText("-" + t);
      this.SetTextureByPath(e.GetConfig().IconSmall, this.GetTexture(20));
    }
  }
}
//# sourceMappingURL=RoleSkinTabView.js.map