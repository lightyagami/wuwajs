"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRoleDetailTabView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const SurvivorsRogueModel_1 = require("../SurvivorsRogueModel");
const SurvivorsRogueUiDefine_1 = require("../SurvivorsRogueUiDefine");
const SurvivorsAttributeItem_1 = require("./SurvivorsAttributeItem");
class SurvivorsRoleDetailTabView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OFd = undefined;
    this.kuo = undefined;
    this.qFd = () => new SurvivorsAttributeItem_1.SurvivorsAttributeItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIText], [5, UE.UILoopScrollViewComponent], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIText], [9, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.OFd = new RoleCardItem();
    await this.OFd.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.kuo = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(5), this.GetItem(6).GetOwner(), this.qFd);
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetRoleGainData();
    var i = e.ConfigId;
    var r = e.Data.F6n;
    var e = e.GetCurrentEvolveId();
    var t = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.KscPlayerEntity.GetSkillComp().AttrSet_.Attrs_;
    this.U5t(i, r);
    this.GFd(t.Get(3), t.Get(2), t.Get(4));
    this.FFd(i, t);
    this.Jlo(e);
    var r = {
      UiText: this.GetText(9),
      ViewType: 0,
      ReportType: 10
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(r);
  }
  U5t(e, i) {
    this.OFd?.RefreshBySurvivorRoleId(e);
    this.OFd?.SetLevel(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), SurvivorsRogueUiDefine_1.SURVIVORS_LV_KEY, i);
  }
  GFd(e, i, r) {
    var t = i !== 0 ? e / i : 0;
    var r = i !== 0 ? r / i : 0;
    this.GetSprite(2)?.SetFillAmount(t);
    this.GetSprite(3)?.SetFillAmount(r);
    this.GetText(4)?.SetText(e + "/" + i);
  }
  Jlo(e) {
    e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRoleEvolve(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.Describe);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.EvolveName);
    this.SetTextureByPath(e.Icon, this.GetTexture(7));
  }
  FFd(e, o) {
    e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e);
    const s = new Set(e.RecommendProperty);
    const a = [];
    e.PropertyList.forEach(e => {
      var i;
      var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetPropertyConfig(e);
      let t = 0;
      if ((t = r.IsSpecial ? ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetRoleSpecialPropertyValue(e) : o.Get(e) ?? 0) !== 0) {
        i = r.IsBasePermyriad;
        e = {
          AttrId: e,
          IsRecommend: s.has(e),
          Value: i ? t / SurvivorsRogueModel_1.PERMYRIAD_RATIO : t,
          IsAddition: r.IsSpecial
        };
        a.push(e);
      }
    });
    a.sort((e, i) => e.IsRecommend !== i.IsRecommend ? e.IsRecommend ? -1 : 1 : e.AttrId - i.AttrId);
    this.kuo.RefreshByData(a);
  }
}
exports.SurvivorsRoleDetailTabView = SurvivorsRoleDetailTabView;
class RoleCardItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText]];
  }
  RefreshBySurvivorRoleId(e) {
    e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e).TrialRoleId;
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
    this.SetTextureShowUntilLoaded(e.FormationRoleCard, this.GetTexture(0));
  }
  SetLevel(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), SurvivorsRogueUiDefine_1.SURVIVORS_LV_KEY, e);
  }
}
//# sourceMappingURL=SurvivorsRoleDetailTabView.js.map