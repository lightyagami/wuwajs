"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogicNodeBase = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const LevelGeneralController_1 = require("../../../../LevelGamePlay/LevelGeneralController");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SneakController_1 = require("../../../../World/Controller/SneakController");
const BehaviorNodeBase_1 = require("../BehaviorNodeBase");
class LogicNodeBase extends BehaviorNodeBase_1.BehaviorNodeBase {
  constructor() {
    super(...arguments);
    this.NodeType = undefined;
    this.Config = undefined;
    this.AddTrackViewMode = false;
  }
  get CustomUiConfig() {
    return this.Config?.UIConfig;
  }
  get SilentAreaInfoViewConfig() {
    return this.Config?.InformationView?.InformationView;
  }
  OnCreate(i) {
    this.Config = i;
    this.TrackTarget = i.UIConfig?.TrackTarget;
    return true;
  }
  OnNodeActive() {
    var i;
    var t = this.Config;
    if (t.DungeonId) {
      this.Blackboard.DungeonId = t.DungeonId;
      this.Blackboard.ChangeDungeonIdNodeId = this.InnerNodeId;
    }
    if (t.DisableOnline) {
      this.L$t(true);
    }
    if (t.DisableTrackAnim && LevelGeneralController_1.LevelGeneralController.CheckConditionNew(t.DisableTrackAnim.Condition, undefined, this.Context)) {
      this.Blackboard?.AddTag(16, this.NodeId.toString());
    }
    if (this.CustomUiConfig) {
      this.AddTag(0);
    }
    if (this.SilentAreaInfoViewConfig) {
      this.Blackboard?.AddSilentShowInfo(this.NodeId, this.SilentAreaInfoViewConfig);
    }
    if (t.CompositeTrackViewMode) {
      this.Blackboard.TrackViewModel = t.CompositeTrackViewMode;
      this.AddTrackViewMode = true;
    }
    if (this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && (i = ModelManager_1.ModelManager.QuestNewModel, t.TidQuestAliasName && !StringUtils_1.StringUtils.IsEmpty(PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidQuestAliasName)) && i.SetQuestStageName(this.TreeConfigId, t.TidQuestAliasName), t.TidQuestAliasDesc && !StringUtils_1.StringUtils.IsEmpty(PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidQuestAliasDesc)) && i.SetQuestStageDesc(this.TreeConfigId, t.TidQuestAliasDesc), t = t.RewardConfig?.RewardId)) {
      i.SetQuestStageReward(this.TreeConfigId, t);
    }
    if (this.Config?.SpecialGamePlayConfig) {
      SneakController_1.SneakController.StartSneaking();
    }
    if (this.Config?.SaveConfig) {
      this.Blackboard.RollbackPoint = this.NodeId;
    }
  }
  OnNodeDeActive(i) {
    var t;
    this.RemoveTag(0);
    this.Blackboard?.RemoveTag(16, this.NodeId.toString());
    if (this.SilentAreaInfoViewConfig) {
      this.Blackboard?.RemoveSilentShowInfo(this.NodeId);
    }
    if (this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && (t = ModelManager_1.ModelManager.QuestNewModel, this.Config.TidQuestAliasName && !StringUtils_1.StringUtils.IsEmpty(PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Config.TidQuestAliasName)) && t.SetQuestStageName(this.TreeConfigId, ""), this.Config.TidQuestAliasDesc && !StringUtils_1.StringUtils.IsEmpty(PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Config.TidQuestAliasDesc)) && t.SetQuestStageDesc(this.TreeConfigId, ""), this.Config.RewardConfig?.RewardId)) {
      t.SetQuestStageReward(this.TreeConfigId, 0);
    }
    if (this.AddTrackViewMode) {
      this.Blackboard.TrackViewModel = "All";
    }
    if (this.Config.DungeonId) {
      if (this.Blackboard.ChangeDungeonIdNodeId !== 0) {
        if (this.Blackboard.ChangeDungeonIdNodeId === this.InnerNodeId) {
          this.Blackboard.DungeonId = undefined;
          this.Blackboard.ChangeDungeonIdNodeId = 0;
        }
      } else {
        this.Blackboard.DungeonId = undefined;
      }
    }
    if (this.Config?.SpecialGamePlayConfig) {
      SneakController_1.SneakController.EndSneaking();
    }
    if (this.Config.DisableOnline) {
      this.L$t(false);
    }
    super.OnNodeDeActive(i);
  }
  L$t(i) {
    switch (this.BtType) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        ModelManager_1.ModelManager.OnlineModel.DisableOnline(0, i, this.TreeConfigId, this.NodeId);
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        ModelManager_1.ModelManager.OnlineModel.DisableOnline(1, i, this.TreeConfigId, this.NodeId);
    }
  }
}
exports.LogicNodeBase = LogicNodeBase;
//# sourceMappingURL=LogicNodeBase.js.map