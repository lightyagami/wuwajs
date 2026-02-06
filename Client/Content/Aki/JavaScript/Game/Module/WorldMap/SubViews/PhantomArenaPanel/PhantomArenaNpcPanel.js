"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaNpcPanel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RewardItemBar_1 = require("../RewardItemBar");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class PhantomArenaNpcPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.hyc = 0;
    this.a9f = undefined;
    this.mHf = false;
    this.OnConfirmBtnClick = () => {
      var e;
      if (this.mHf) {
        e = this.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", e);
      } else {
        ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.TryTeleportChallenge(this.hyc, this.YCu);
      }
    };
    this.YCu = () => {
      UiManager_1.UiManager.ResetToBattleView();
    };
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeStartAsync() {
    this.a9f = new RewardItemBar_1.RewardItemBar();
    await this.a9f.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
    return super.OnBeforeStartAsync();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetItem(14).SetUIActive(false);
    this.GetItem(8).SetUIActive(true);
    this.GetItem(32).SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.LayoutContext.MarkItem = e;
    var r;
    var t;
    var a = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallengeByMarkId(e.MarkId);
    if (a) {
      this.hyc = a.Id;
      r = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeData(this.hyc)?.VCf ?? true;
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.LayoutContext.Title, r ? e.MarkConfig?.MarkTitle : "PhantomBattle_1164");
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIcon(this.LayoutContext);
      this.UpdateTopRightIconActive();
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaAndIconByConfigOrDynamicConfigMarkItem(this.LayoutContext);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.LayoutContext.DescriptionText, r ? e.MarkConfig?.MarkDesc : "PhantomBattle_1165");
      r = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentRewardListByChallengeId(this.hyc);
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentChallengeStateById(this.hyc) === 2;
      this.a9f?.RebuildRewardsByData(r);
      this.a9f?.SetTitleNewTxt(t ? "PhantomBattle_1155" : "PhantomBattle_1154");
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
      this.W9g(a);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "获取挑战信息失败", ["MarkId", e.MarkId]);
    }
  }
  W9g(e) {
    var r;
    var t;
    if (e.MapId === 1) {
      this.LayoutContext?.SetConfirmBtnActive(true);
      r = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("TeleportFastMove");
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentChallengeStateById(this.hyc) === 2;
      this.mHf = this.GetUnFinishPreGuideQuestId() > 0 && !t;
      this.LayoutContext?.SetConfirmBtnText(this.mHf ? "PhantomBattle_1183" : r);
      this.MapTipsActivateTipPanel?.SetUiActive(this.mHf);
      if (this.mHf) {
        this.MapTipsActivateTipPanel?.SetActivatedTip("PhantomBattle_1182", false);
      }
    } else if (t = ConfigManager_1.ConfigManager.ConditionConfig?.GetGroupConditionIds(e.OpenConditionGroupId)) {
      r = this.vsf(t);
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentChallengeStateById(this.hyc);
      if (r && t === 0) {
        this.LayoutContext?.SetConfirmBtnActive(false);
        this.MapTipsActivateTipPanel?.SetUiActive(true);
        this.MapTipsActivateTipPanel?.SetActivatedTip(r, false);
      } else {
        this.LayoutContext?.SetConfirmBtnActive(true);
        this.MapTipsActivateTipPanel?.SetUiActive(false);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "获取条件组失败", ["OpenConditionGroupId", e.OpenConditionGroupId]);
    }
  }
  vsf(e) {
    var r = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeData(this.hyc);
    for (const t of e) {
      if (!r?.qS_.includes(t)) {
        return ConfigManager_1.ConfigManager.ConditionConfig?.GetConditionConfig(t)?.Description;
      }
    }
  }
  GetUnFinishPreGuideQuestId() {
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallenge(this.hyc)?.PreGuideQuest;
    if (r) {
      var t = r.length;
      for (let e = 0; e < t; e++) {
        if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(r[e]) < Protocol_1.Aki.Protocol.hTs.a3_) {
          return r[e];
        }
      }
    }
    return 0;
  }
}
exports.PhantomArenaNpcPanel = PhantomArenaNpcPanel;
//# sourceMappingURL=PhantomArenaNpcPanel.js.map