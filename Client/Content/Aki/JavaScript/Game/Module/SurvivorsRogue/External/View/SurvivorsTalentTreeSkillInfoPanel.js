"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsTalentTreeSkillInfoPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const CommonCostItem_1 = require("../../../Common/PropItem/CommonCostItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SurvivorsActivityController_1 = require("../../Activity/SurvivorsActivityController");
const SurvivorsActivityDefine_1 = require("../../Activity/SurvivorsActivityDefine");
const SurvivorsTalentTreeMediumItemGrid_1 = require("./SurvivorsTalentTreeMediumItemGrid");
class SurvivorsTalentTreeSkillInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.hGd = undefined;
    this.ucc = undefined;
    this.U1a = undefined;
    this.s4e = undefined;
    this.lGd = undefined;
    this.W2e = () => new SurvivorsTalentTreeMediumItemGrid_1.SurvivorsTalentTreeMediumItemGrid();
    this.L3e = () => {
      if (this.U1a.IsEnough) {
        const i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetTalentTreeEffect(this.hGd.EffectId);
        if (i) {
          SurvivorsActivityController_1.SurvivorsActivityController.SurvivorsTalentLevelUpRequest(this.hGd.NodeId, () => {
            if (i.ShowType === 1) {
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsTalentTreeUnlocked");
            } else {
              UiManager_1.UiManager.OpenView("SurvivorsTalentUnlockView", i);
            }
          });
        }
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsTalentTreeNotEnough");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [15, UE.UISprite], [1, UE.UIText], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIHorizontalLayout], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.U1a = new CommonCostItem_1.CommonCostItem();
    this.ucc = new ButtonItem_1.ButtonItem();
    this.lGd = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    var i = [this.U1a.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()), this.ucc.CreateThenShowByActorAsync(this.GetItem(14).GetOwner()), this.lGd.CreateThenShowByActorAsync(this.GetItem(12).GetOwner())];
    await Promise.all(i);
    this.ucc.SetFunction(this.L3e);
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(9), this.W2e);
  }
  async RefreshAsync(i) {
    this.hGd = i;
    var e;
    var t;
    var r;
    var o;
    var s;
    var n;
    var a = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetTalentTreeNode(i.NodeId);
    if (a && (e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetTalentTreeEffect(i.EffectId))) {
      o = [this.SetSpriteAsync(a.Icon, this.GetSprite(4), false), this.s4e.RefreshByDataAsync(e.UnlockItem ?? [])];
      await Promise.all(o);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Title);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Desc, e.DescParams);
      e.Consume.forEach((i, e) => {
        this.U1a.UpdateItem(e, i);
        this.U1a.RefreshCountEnableState();
      });
      t = (o = i.Status) === -1;
      r = o === 1;
      o = o === 0;
      s = (n = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData).IsEnoughUpgradeNode(i);
      n = n.IsPreNodeUpgraded(i);
      this.GetItem(12).SetUIActive(!n || t);
      this.GetItem(13).SetUIActive(r);
      this.GetItem(14).SetUIActive(n && o);
      this.GetSprite(2).SetUIActive(r);
      this.GetSprite(3).SetUIActive(!r);
      this.lGd.SetTextByTextId("SurvivorsTalentTreePreLock");
      if (t) {
        this.lGd.SetTextByTextId(a.UnlockConditionDesc);
      }
      this.GetSprite(15).SetColor(UE.Color.FromHex(SurvivorsActivityDefine_1.effectShowTypeColorRecord[e.ShowType]));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Tag);
      this.ucc.SetEnableClick(s);
      if (a.Type === 3) {
        this.GetItem(6).SetUIActive(false);
        this.GetItem(8).SetUIActive(true);
      } else {
        this.GetItem(6).SetUIActive(true);
        this.GetItem(8).SetUIActive(false);
      }
    }
  }
}
exports.SurvivorsTalentTreeSkillInfoPanel = SurvivorsTalentTreeSkillInfoPanel;
//# sourceMappingURL=SurvivorsTalentTreeSkillInfoPanel.js.map