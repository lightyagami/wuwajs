"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopFlySkinTabView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const FlySkinBuyDetailViewData_1 = require("../../Skin/Data/FlySkinBuyDetailViewData");
const ShopFlySkinData_1 = require("../../Skin/Data/ShopFlySkinData");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ShopFlySkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this._3i = 0;
    this.bD = 0;
    this.eGe = undefined;
    this.oWi = () => new FlySkinItemContent();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this._3i = this.ExtraParams;
    this.bD = this.Params;
    this.eGe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.oWi);
  }
  OnBeforeShow() {
    this.v4e();
  }
  v4e() {
    var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(this._3i, this.bD);
    var e = new Array();
    for (const r of t) {
      var i = new FlySkinItemContentData();
      var s = ShopFlySkinData_1.ShopFlySkinData.Create(r);
      i.ShopFlySkinData = s;
      i.AllData = t;
      e.push(i);
    }
    this.eGe.RefreshByData(e, undefined, true);
  }
  RefreshView(t) {}
}
exports.ShopFlySkinTabView = ShopFlySkinTabView;
class FlySkinItemContentData {
  constructor() {
    this.ShopFlySkinData = undefined;
    this.AllData = [];
  }
}
class FlySkinItemContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.g31 = undefined;
    this.NOe = 0;
    this.zSl = () => {
      var t = this.g31.AllData;
      var e = new Array();
      for (const s of t) {
        var i = ShopFlySkinData_1.ShopFlySkinData.Create(s);
        e.push(i);
      }
      t = FlySkinBuyDetailViewData_1.FlySkinBuyDetailViewData.Create(e);
      t.SetIndex(this.NOe);
      t.SetPreviewTitle("FlySkinShopTitle_Text");
      UiManager_1.UiManager.OpenView("FlySkinBuyDetailView", t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UITexture], [15, UE.UITexture], [16, UE.UIItem], [17, UE.UIItem]];
    this.BtnBindInfo = [[0, this.zSl]];
  }
  Refresh(t, e, i) {
    var s = t.ShopFlySkinData;
    this.g31 = t;
    this.NOe = i;
    this.Zke(s);
    this.ZSl();
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
  }
  f7l(t) {
    t = t.GetFlySkinData().GetSkinGrade() === 1;
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
    t = t.GetPreviewTextureInPayShop();
    this.SetTextureByPath(t, this.GetTexture(1));
  }
  ZSl() {
    this.GetTexture(2)?.SetUIActive(false);
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
    t = t.GetPayShopGoods().GetItemData().Name;
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
      t = t.GetFlySkinData().GetSkinGrade() === 1 ? "T_ShopRoleItemBg1" : "T_ShopRoleItemBg";
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
      this.SetTextureByPath(t, this.GetTexture(14));
    } else {
      this.GetTexture(14).SetUIActive(false);
    }
  }
  nbl(t) {
    if (t) {
      t = t.GetFlySkinData().GetSkinGrade() === 1 ? "T_ShopRoleItemTopBg1" : "T_ShopRoleItemTopBg";
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
      this.SetTextureByPath(t, this.GetTexture(15));
    } else {
      this.GetTexture(15).SetUIActive(false);
    }
  }
}
//# sourceMappingURL=ShopFlySkinTabView.js.map