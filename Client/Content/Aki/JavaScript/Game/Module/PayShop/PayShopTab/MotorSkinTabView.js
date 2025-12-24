"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorSkinTabView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const MotorSkinBuyDetailViewData_1 = require("../../Skin/Data/MotorSkinBuyDetailViewData");
const ShopMotorSkinData_1 = require("../../Skin/Data/ShopMotorSkinData");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class MotorSkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this._3i = 0;
    this.bD = 0;
    this.eGe = undefined;
    this.oWi = () => new SkinItemContent();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this._3i = this.ExtraParams;
    this.bD = this.Params;
    this.eGe = new GenericLayout_1.GenericLayout(this.GetGridLayout(0), this.oWi);
  }
  OnBeforeShow() {
    this.v4e();
  }
  v4e() {
    var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(this._3i, this.bD);
    var i = new Array();
    for (const s of t) {
      var e = new SkinItemContentData();
      var r = ShopMotorSkinData_1.ShopMotorSkinData.Create(s);
      e.ShopMotorSkinData = r;
      e.AllData = t;
      i.push(e);
    }
    this.eGe.RefreshByData(i, undefined, true);
  }
  RefreshView(t) {}
}
exports.MotorSkinTabView = MotorSkinTabView;
class SkinItemContentData {
  constructor() {
    this.ShopMotorSkinData = undefined;
    this.AllData = [];
  }
}
class SkinItemContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.H3e = undefined;
    this.tFf = undefined;
    this.NOe = 0;
    this.d2t = () => new RewardItemGrid();
    this.zSl = () => {
      if (this.tFf) {
        var t = new Array();
        for (const r of this.tFf.AllData) {
          var i = ShopMotorSkinData_1.ShopMotorSkinData.Create(r);
          t.push(i);
        }
        var e = MotorSkinBuyDetailViewData_1.MotorSkinBuyDetailViewData.Create(t);
        e.SetIndex(this.NOe);
        e.SetPreviewTitle("MotorSkinShopTitle_Text");
        UiManager_1.UiManager.OpenView("MotorSkinBuyDetailView", e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UIText], [8, UE.UIHorizontalLayout], [9, UE.UIItem], [10, UE.UITexture], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIText], [15, UE.UIItem], [16, UE.UIItem]];
    this.BtnBindInfo = [[0, this.zSl]];
  }
  async OnBeforeStartAsync() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.d2t);
  }
  Refresh(t, i, e) {
    var r = t.ShopMotorSkinData;
    this.tFf = t;
    this.NOe = e;
    if (r) {
      t = r?.GetMotorSkinData()?.GetMotorSkinShow();
      if (t) {
        this.P5e(t);
        this.Kbe(t);
        this.BGt(t);
        this.iFi(r);
        this.u3e(r);
        this.iFf(r);
        this.rFf(r);
        this.HEl(r);
        const s = [];
        t.ItemCount.forEach((t, i) => {
          s.push({
            IconPath: i,
            Count: t
          });
        });
        this.H3e?.RefreshByData(s);
      }
    }
  }
  P5e(t) {
    this.GetText(7)?.ShowTextNew(t.Name);
  }
  Kbe(t) {
    this.SetTextureByPath(t.Icon, this.GetTexture(3));
  }
  BGt(t) {
    var t = t.QualityId;
    var i = ConfigManager_1.ConfigManager.SkinConfig.GetMotorSkinGiftQualityConfig(t);
    this.SetTextureByPath(i.BgA, this.GetTexture(1));
    this.SetTextureByPath(i.BgBar, this.GetTexture(10));
    this.SetTextureByPath(i.BgType, this.GetTexture(2));
    this.SetTextureByPath(i.BgC, this.GetTexture(4));
    this.GetSprite(5).SetChangeColor(t !== 1);
    this.GetSprite(6).SetChangeColor(t !== 1);
  }
  iFi(t) {
    var i = t.GetPriceData();
    if (t.GetCurrentGoodsData().IsDirect()) {
      this.GetText(11)?.SetText(t.GetDirectPriceText());
    } else if (i) {
      this.GetText(11)?.SetText(i.NowPrice.toString());
    }
  }
  u3e(t) {
    var i;
    if (t) {
      i = (t = t.GetCurrentGoodsData().GetCountDownData())[1];
      if (t[2] === 0) {
        this.GetItem(12).SetUIActive(false);
      } else {
        this.GetItem(12).SetUIActive(true);
        t = this.GetText(13);
        if (typeof i == "string") {
          t.SetText(i);
        } else {
          LguiUtil_1.LguiUtil.SetLocalText(t, i.TextId, i.TimeValue);
        }
      }
    } else {
      this.GetItem(13).SetUIActive(false);
    }
  }
  iFf(t) {
    var i = this.GetText(14);
    if (t.GetIfCanBuy()) {
      t = t.GetCurrentGoodsData().GetShopTipsText();
      i?.SetText(t);
      i?.SetUIActive(true);
    } else {
      i?.SetUIActive(false);
    }
  }
  rFf(t) {
    t = !t.GetIfCanBuy();
    this.GetItem(15)?.SetUIActive(t);
  }
  HEl(t) {
    t = t.GetCurrentGoodsData().GetIfNeedRemind();
    this.GetItem(16).SetUIActive(t);
  }
}
class RewardItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText]];
  }
  Refresh(t) {
    this.SetTextureByPath(t.IconPath, this.GetTexture(1));
    var i = ConfigManager_1.ConfigManager.TextConfig?.GetMultiTextByKey("MotorShop_Xicon", "x");
    this.GetText(2)?.SetText("" + i + t.Count);
  }
}
//# sourceMappingURL=MotorSkinTabView.js.map