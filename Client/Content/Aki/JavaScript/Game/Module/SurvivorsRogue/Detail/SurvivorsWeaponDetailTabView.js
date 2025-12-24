"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsWeaponDetailTabView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const SurvivorsRogueCardBase_1 = require("../Card/SurvivorsRogueCardBase");
const SurvivorsRogueCardDataFactory_1 = require("../Card/SurvivorsRogueCardDataFactory");
const SurvivorsRogueModel_1 = require("../SurvivorsRogueModel");
const SurvivorsAttributeItem_1 = require("./SurvivorsAttributeItem");
const SurvivorsWeaponAttributeIconItem_1 = require("./SurvivorsWeaponAttributeIconItem");
const SurvivorsWeaponDetailItem_1 = require("./SurvivorsWeaponDetailItem");
const ATTRIBUTE_TOTAL_KILL_COUNT_ID = 267;
const SPECIAL_ATTRIBUTE_COUNT = 5;
class SurvivorsWeaponDetailTabView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.yBr = undefined;
    this.eVi = undefined;
    this.eGd = undefined;
    this.pNd = undefined;
    this.kuo = undefined;
    this.YJd = undefined;
    this.vNd = () => new SurvivorsAttributeItem_1.SurvivorsAttributeItem();
    this.Hqd = () => new SurvivorsWeaponDetailItem_1.SurvivorsWeaponDetailItem();
    this.zJd = () => new SurvivorsWeaponAttributeIconItem_1.SurvivorsWeaponAttributeIconItem();
    this.JJd = () => {
      UiManager_1.UiManager.OpenView("SurvivorsWeaponAttributeView", this.yBr);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UILoopScrollViewComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIHorizontalLayout], [8, UE.UIItem], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.JJd]];
  }
  async OnBeforeStartAsync() {
    this.eVi = new SurvivorsRogueCardBase_1.SurvivorsRogueCardBase();
    await this.eVi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    await this.yNd();
    this.kuo = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(5).GetOwner(), this.vNd);
  }
  async yNd() {
    this.pNd = new SurvivorsAttributeItem_1.SurvivorsAttributeItem();
    var e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(5), this.GetVerticalLayout(3).GetRootSceneComponent());
    await this.pNd.CreateThenShowByActorAsync(e.GetOwner());
    this.pNd.Refresh({
      AttrId: ATTRIBUTE_TOTAL_KILL_COUNT_ID,
      Value: 0,
      IsRecommend: false
    }, false, 0);
  }
  OnStart() {
    this.eGd = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.Hqd);
    this.YJd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), this.zJd);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueWeaponDetailTabViewShow, true);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueWeaponDetailTabViewShow, false);
  }
  RefreshByData(e) {
    var i = (this.yBr = e).ConfigId;
    var t = e.GetCurrentEvolveId();
    this.RefreshWeaponCard(i);
    this.RefreshEvolveInfo(i, t);
    this.FFd(i, e.Data.GTd);
    this.RefreshWeaponTotalList(e.Data.vDd);
    this.ZJd();
  }
  RefreshWeaponCard(e) {
    e = SurvivorsRogueCardDataFactory_1.SurvivorsRogueCardDataFactory.CreateGeneralWeapon(e);
    e.TagVisible = false;
    this.eVi?.Apply(e);
  }
  RefreshEvolveInfo(e, i) {
    e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(e);
    const t = Array.from(e.EvolveIds.keys());
    this.eGd?.RefreshByDataAsync(t, true).then(() => {
      this.RefreshCurrentEvolve(t, t, i);
    });
  }
  RefreshCurrentEvolve(e, r, o) {
    let s = undefined;
    const a = this.eGd.GetScrollItemList();
    e.forEach((e, i) => {
      var t = a[i];
      t.SetIsLocked(!r.includes(e));
      if (e === o) {
        s = this.eGd.GetItemByIndex(i);
        t.SetIsCurrentState(true);
      } else {
        t.SetIsCurrentState(false);
      }
    });
    this.GetScrollViewWithScrollbar(1)?.ScrollTo(s, true);
  }
  RefreshWeaponTotalList(e) {
    this.pNd?.SetValue(e);
  }
  FFd(e, i) {
    const r = new Map();
    i.forEach(e => {
      var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponLv(e);
      var i = r.get(e.PropertyId) ?? 0;
      var t = e.PropertyValue / SurvivorsRogueModel_1.PERMYRIAD_RATIO;
      r.set(e.PropertyId, i + t);
    });
    ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetRoleGainData()?.Data.GTd.forEach(e => {
      var i;
      var t;
      var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRoleLv(e);
      if (e.BuffCategoryType === 2) {
        i = r.get(e.PropertyId) ?? 0;
        t = e.PropertyValue / SurvivorsRogueModel_1.PERMYRIAD_RATIO;
        r.set(e.PropertyId, i + t);
      }
    });
    i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(e);
    const t = new Set(i.RecommendProperty);
    const o = [];
    i.PropertyList.forEach(e => {
      var i = r.get(e);
      if (i) {
        o.push({
          AttrId: e,
          IsRecommend: t.has(e),
          Value: i,
          IsAddition: true
        });
      }
    });
    o.sort((e, i) => e.IsRecommend !== i.IsRecommend ? e.IsRecommend ? -1 : 1 : e.AttrId - i.AttrId);
    this.kuo.RefreshByData(o);
  }
  ZJd() {
    var e = this.yBr.GetWeaponSpecialAttributeList().map(e => e.AttrId);
    if (e.length > 0) {
      this.YJd.RefreshByData(e.slice(0, SPECIAL_ATTRIBUTE_COUNT));
    }
    this.GetItem(6).SetUIActive(e.length > 0);
  }
}
exports.SurvivorsWeaponDetailTabView = SurvivorsWeaponDetailTabView;
//# sourceMappingURL=SurvivorsWeaponDetailTabView.js.map