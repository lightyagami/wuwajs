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
    this.kkd = undefined;
    this.$Od = undefined;
    this.kuo = undefined;
    this.F7d = undefined;
    this.WOd = () => new SurvivorsAttributeItem_1.SurvivorsAttributeItem();
    this.bkd = () => new SurvivorsWeaponDetailItem_1.SurvivorsWeaponDetailItem();
    this.N7d = () => new SurvivorsWeaponAttributeIconItem_1.SurvivorsWeaponAttributeIconItem();
    this.V7d = () => {
      UiManager_1.UiManager.OpenView("SurvivorsWeaponAttributeView", this.yBr);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UILoopScrollViewComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIHorizontalLayout], [8, UE.UIItem], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.V7d]];
  }
  async OnBeforeStartAsync() {
    this.eVi = new SurvivorsRogueCardBase_1.SurvivorsRogueCardBase();
    await this.eVi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    await this.QOd();
    this.kuo = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(5).GetOwner(), this.WOd);
  }
  async QOd() {
    this.$Od = new SurvivorsAttributeItem_1.SurvivorsAttributeItem();
    var e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(5), this.GetVerticalLayout(3).GetRootSceneComponent());
    await this.$Od.CreateThenShowByActorAsync(e.GetOwner());
    this.$Od.Refresh({
      AttrId: ATTRIBUTE_TOTAL_KILL_COUNT_ID,
      Value: 0,
      IsRecommend: false
    }, false, 0);
  }
  OnStart() {
    this.kkd = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.bkd);
    this.F7d = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), this.N7d);
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
    this.dOd(i, e.Data.cEd);
    this.RefreshWeaponTotalList(e.Data.qLd);
    this.j7d();
  }
  RefreshWeaponCard(e) {
    e = SurvivorsRogueCardDataFactory_1.SurvivorsRogueCardDataFactory.CreateGeneralWeapon(e);
    e.TagVisible = false;
    this.eVi?.Apply(e);
  }
  RefreshEvolveInfo(e, i) {
    e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(e);
    const t = Array.from(e.EvolveIds.keys());
    this.kkd?.RefreshByDataAsync(t, true).then(() => {
      this.RefreshCurrentEvolve(t, t, i);
    });
  }
  RefreshCurrentEvolve(e, r, o) {
    let s = undefined;
    const a = this.kkd.GetScrollItemList();
    e.forEach((e, i) => {
      var t = a[i];
      t.SetIsLocked(!r.includes(e));
      if (e === o) {
        s = this.kkd.GetItemByIndex(i);
        t.SetIsCurrentState(true);
      } else {
        t.SetIsCurrentState(false);
      }
    });
    this.GetScrollViewWithScrollbar(1)?.ScrollTo(s, true);
  }
  RefreshWeaponTotalList(e) {
    this.$Od?.SetValue(e);
  }
  dOd(e, i) {
    const r = new Map();
    i.forEach(e => {
      var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponLv(e);
      var i = r.get(e.PropertyId) ?? 0;
      var t = e.PropertyValue / SurvivorsRogueModel_1.PERMYRIAD_RATIO;
      r.set(e.PropertyId, i + t);
    });
    ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetRoleGainData()?.Data.cEd.forEach(e => {
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
  j7d() {
    var e = this.yBr.GetWeaponSpecialAttributeList().map(e => e.AttrId);
    if (e.length > 0) {
      this.F7d.RefreshByData(e.slice(0, SPECIAL_ATTRIBUTE_COUNT));
    }
    this.GetItem(6).SetUIActive(e.length > 0);
  }
}
exports.SurvivorsWeaponDetailTabView = SurvivorsWeaponDetailTabView;
//# sourceMappingURL=SurvivorsWeaponDetailTabView.js.map