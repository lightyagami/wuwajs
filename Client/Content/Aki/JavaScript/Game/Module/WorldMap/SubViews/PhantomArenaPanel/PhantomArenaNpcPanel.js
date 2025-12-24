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
    this.UFf = undefined;
    this.PNf = false;
    this.OnConfirmBtnClick = () => {
      var e;
      if (this.PNf) {
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
    this.UFf = new RewardItemBar_1.RewardItemBar();
    await this.UFf.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
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
    var a = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallengeByMarkId(e.MarkId);
    if (a) {
      this.hyc = a.Id;
      a = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeData(this.hyc)?.qgf ?? true;
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.LayoutContext.Title, a ? e.MarkConfig?.MarkTitle : "PhantomBattle_1164");
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIcon(this.LayoutContext);
      this.UpdateTopRightIconActive();
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaAndIconByConfigOrDynamicConfigMarkItem(this.LayoutContext);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.LayoutContext.DescriptionText, a ? e.MarkConfig?.MarkDesc : "PhantomBattle_1165");
      a = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentRewardListByChallengeId(this.hyc);
      r = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentChallengeStateById(this.hyc) === 2;
      this.UFf?.RebuildRewardsByData(a);
      this.UFf?.SetTitleNewTxt(r ? "PhantomBattle_1155" : "PhantomBattle_1154");
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
      this.LayoutContext?.SetConfirmBtnActive(true);
      a = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("TeleportFastMove");
      this.PNf = this.GetUnFinishPreGuideQuestId() > 0 && !r;
      this.LayoutContext?.SetConfirmBtnText(this.PNf ? "PhantomBattle_1183" : a);
      this.MapTipsActivateTipPanel?.SetUiActive(this.PNf);
      if (this.PNf) {
        this.MapTipsActivateTipPanel?.SetActivatedTip("PhantomBattle_1182", false);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "获取挑战信息失败", ["MarkId", e.MarkId]);
    }
  }
  GetUnFinishPreGuideQuestId() {
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallenge(this.hyc)?.PreGuideQuest;
    if (r) {
      var a = r.length;
      for (let e = 0; e < a; e++) {
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