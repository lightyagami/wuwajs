"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeNewEnemyTabView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const AdvanceNoticeFetterSuitDetailItem_1 = require("./AdvanceNoticeFetterSuitDetailItem");
const AdvanceNoticeSuitItem_1 = require("./AdvanceNoticeSuitItem");
const AdvanceNoticeTabViewBase_1 = require("./AdvanceNoticeTabViewBase");
class AdvanceNoticeNewEnemyTabView extends AdvanceNoticeTabViewBase_1.AdvanceNoticeTabViewBase {
  constructor() {
    super(...arguments);
    this.IFm = undefined;
    this.TFm = undefined;
    this.bFm = () => {
      return new AdvanceNoticeSuitItem_1.AdvanceNoticeSuitItem();
    };
    this.RFm = () => {
      return new AdvanceNoticeFetterSuitDetailItem_1.AdvanceNoticeFetterSuitDetailItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UITexture], [8, UE.UITexture], [9, UE.UITexture], [10, UE.UINiagara], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIText], [15, UE.UILayoutBase], [16, UE.UIItem], [17, UE.UIText], [18, UE.UILayoutBase], [19, UE.UIText], [20, UE.UIScrollViewWithScrollbarComponent]];
  }
  async OnBeforeStartAsync() {
    this.GetText(19)?.ShowTextNew("Advertising_EnemyTips");
    this.IFm = new GenericLayout_1.GenericLayout(this.GetLayoutBase(15), this.bFm);
    this.TFm = new GenericLayout_1.GenericLayout(this.GetLayoutBase(18), this.RFm);
    return super.OnBeforeStartAsync();
  }
  RefreshView() {
    var i = this.ViewModel.CurrentSubTabId;
    switch (ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabEnemyById(i).Type) {
      case 1:
        this.RefreshEnemyView();
        break;
      case 2:
        this.RefreshVisionView();
        break;
      case 3:
        this.RefreshFetterView();
    }
    this.GetScrollViewWithScrollbar(20).SetScrollProgress(0);
  }
  RefreshEnemyView() {
    this.GetItem(4).SetUIActive(false);
    this.GetTexture(0).SetUIActive(true);
    var i = this.ViewModel.CurrentSubTabId;
    var i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabEnemyById(i);
    this.SetTextureByPath(i.MainPic, this.GetTexture(0));
    this.Bym(i);
    this.GetItem(12).SetUIActive(true);
    this.GetText(11).SetUIActive(true);
    this.GetItem(13).SetUIActive(false);
    this.GetItem(16).SetUIActive(true);
    this.GetLayoutBase(18).RootUIComp.SetUIActive(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), i.EnemyDescription);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(17), "AdvertisingEnemy_Description");
    this.GetText(19)?.SetUIActive(true);
  }
  RefreshVisionView() {
    this.GetItem(4).SetUIActive(false);
    this.GetTexture(0).SetUIActive(true);
    var i = this.ViewModel.CurrentSubTabId;
    var i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabEnemyById(i);
    this.SetTextureByPath(i.MainPic, this.GetTexture(0));
    this.Bym(i);
    var t = [];
    for (const e of i.VisionFetterIconList) {
      t.push(e);
    }
    this.IFm.RefreshByData(t);
    this.GetItem(12).SetUIActive(true);
    this.GetText(11).SetUIActive(true);
    this.GetItem(13).SetUIActive(true);
    this.GetItem(16).SetUIActive(true);
    this.GetLayoutBase(18).RootUIComp.SetUIActive(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), i.VisionDescription);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "AdvertisingEnemy_Fetter");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(17), "AdvertisingEnemy_Skill");
    this.GetText(19)?.SetUIActive(true);
  }
  RefreshFetterView() {
    this.GetItem(4).SetUIActive(true);
    this.GetTexture(0).SetUIActive(false);
    var i;
    var t;
    var e = this.ViewModel.CurrentSubTabId;
    var e = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabEnemyById(e);
    this.Bym(e);
    this.SetSpriteByPath(e.SuitCoreSprite, this.GetSprite(5), false);
    this.SetSpriteByPath(e.SuitCoreBgSprite, this.GetSprite(6), false);
    this.SetTextureByPath(e.SuitOuterBgTexture, this.GetTexture(7));
    var s = new UE.LinearColor(UE.Color.FromHex(e.SuitNiagaraColor));
    this.GetUiNiagara(10).SetNiagaraVarLinearColor("Color", s);
    var s = e.VisionEffectMap;
    var r = [];
    for ([i, t] of s) {
      var h = {
        TitleTextData: {
          TextKey: "AdvertisingEnemy_FetterTitle",
          Params: [i]
        },
        DescTextData: {
          TextKey: t,
          Params: []
        }
      };
      r.push(h);
    }
    this.TFm.RefreshByData(r);
    this.GetItem(12).SetUIActive(false);
    this.GetText(11).SetUIActive(false);
    this.GetLayoutBase(18).RootUIComp.SetUIActive(true);
    this.GetText(19)?.SetUIActive(false);
  }
  Bym(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.SubTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Title);
    if (StringUtils_1.StringUtils.IsEmpty(i.Description)) {
      this.GetText(3).SetUIActive(false);
    } else {
      this.GetText(3).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.Description);
    }
  }
}
exports.AdvanceNoticeNewEnemyTabView = AdvanceNoticeNewEnemyTabView;
//# sourceMappingURL=AdvanceNoticeNewEnemyTabView.js.map