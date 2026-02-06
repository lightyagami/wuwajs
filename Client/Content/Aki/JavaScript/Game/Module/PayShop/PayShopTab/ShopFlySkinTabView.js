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
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
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
    var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(this._3i, this.bD);
    var t = new Array();
    for (const s of e) {
      var i = new FlySkinItemContentData();
      var r = ShopFlySkinData_1.ShopFlySkinData.Create(s);
      i.ShopFlySkinData = r;
      i.AllData = e;
      t.push(i);
    }
    this.eGe.RefreshByData(t, undefined, true);
  }
  RefreshView(e) {}
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
      var e = this.g31.AllData;
      var t = new Array();
      for (const h of e) {
        var i = ShopFlySkinData_1.ShopFlySkinData.Create(h);
        t.push(i);
      }
      var e = FlySkinBuyDetailViewData_1.FlySkinBuyDetailViewData.Create(t);
      e.SetIndex(this.NOe);
      e.SetPreviewTitle("FlySkinShopTitle_Text");
      var r = t[this.NOe].GetPayShopGoods();
      var s = new LogReportDefine_1.OnClickPayShopItemLogEvent();
      s.i_id = r.GetGoodsId();
      s.i_shop_id = r.PayShopId;
      s.i_tab_id = r.GetGoodsData().TabId;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(s);
      UiManager_1.UiManager.OpenView("FlySkinBuyDetailView", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UITexture], [15, UE.UITexture], [16, UE.UIItem], [17, UE.UIItem]];
    this.BtnBindInfo = [[0, this.zSl]];
  }
  Refresh(e, t, i) {
    var r = e.ShopFlySkinData;
    this.g31 = e;
    this.NOe = i;
    this.Zke(r);
    this.ZSl();
    this.eyl(r);
    this.tyl(r);
    this.iyl(r);
    this.ryl(r);
    this.oyl(r);
    this.nyl(r);
    this.syl(r);
    this.FEl(r);
    this.VEl(r);
    this.HEl(r);
    this.JSl(r);
    this.nbl(r);
    this.f7l(r);
  }
  f7l(e) {
    e = e.GetFlySkinData().GetSkinGrade() === 1;
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
    e = e.GetPreviewTextureInPayShop();
    this.SetTextureByPath(e, this.GetTexture(1));
  }
  ZSl() {
    this.GetTexture(2)?.SetUIActive(false);
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
    e = e.GetPayShopGoods().GetItemData().Name;
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
      e = e.GetFlySkinData().GetSkinGrade() === 1 ? "T_ShopRoleItemBg1" : "T_ShopRoleItemBg";
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetTextureByPath(e, this.GetTexture(14));
    } else {
      this.GetTexture(14).SetUIActive(false);
    }
  }
  nbl(e) {
    if (e) {
      e = e.GetFlySkinData().GetSkinGrade() === 1 ? "T_ShopRoleItemTopBg1" : "T_ShopRoleItemTopBg";
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetTextureByPath(e, this.GetTexture(15));
    } else {
      this.GetTexture(15).SetUIActive(false);
    }
  }
}
//# sourceMappingURL=ShopFlySkinTabView.js.map