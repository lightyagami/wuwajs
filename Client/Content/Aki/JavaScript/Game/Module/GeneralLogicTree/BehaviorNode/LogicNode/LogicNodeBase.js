"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LogicNodeBase = void 0;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  LevelGeneralController_1 = require("../../../../LevelGamePlay/LevelGeneralController"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SneakController_1 = require("../../../../World/Controller/SneakController"),
  BehaviorNodeBase_1 = require("../BehaviorNodeBase");
class LogicNodeBase extends BehaviorNodeBase_1.BehaviorNodeBase {
  constructor() {
    super(...arguments), this.NodeType = void 0, this.Config = void 0, this.AddTrackViewMode = !1
  }
  get CustomUiConfig() {
    return this.Config?.UIConfig
  }
  get SilentAreaInfoViewConfig() {
    return this.Config?.InformationView?.InformationView
  }
  OnCreate(i) {
    return this.Config = i, this.TrackTarget = i.UIConfig?.TrackTarget, !0
  }
  OnNodeActive() {
    var i, t = this.Config;
    t.DungeonId && (this.Blackboard.DungeonId = t.DungeonId, this.Blackboard.ChangeDungeonIdNodeId = this.InnerNodeId), t.DisableOnline && this.L$t(!0), t.DisableTrackAnim && LevelGeneralController_1.LevelGeneralController.CheckConditionNew(t.DisableTrackAnim.Condition, void 0, this.Context) && this.Blackboard?.AddTag(16, this.NodeId.toString()), this.CustomUiConfig && this.AddTag(0), this.SilentAreaInfoViewConfig && this.Blackboard?.AddSilentShowInfo(this.NodeId, this.SilentAreaInfoViewConfig), t.CompositeTrackViewMode && (this.Blackboard.TrackViewModel = t.CompositeTrackViewMode, this.AddTrackViewMode = !0), this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && (i = ModelManager_1.ModelManager.QuestNewModel, t.TidQuestAliasName && !StringUtils_1.StringUtils.IsEmpty(PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidQuestAliasName)) && i.SetQuestStageName(this.TreeConfigId, t.TidQuestAliasName), t.TidQuestAliasDesc && !StringUtils_1.StringUtils.IsEmpty(PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidQuestAliasDesc)) && i.SetQuestStageDesc(this.TreeConfigId, t.TidQuestAliasDesc), t = t.RewardConfig?.RewardId) && i.SetQuestStageReward(this.TreeConfigId, t), this.Config?.SpecialGamePlayConfig && SneakController_1.SneakController.StartSneaking(), this.Config?.SaveConfig && (this.Blackboard.RollbackPoint = this.NodeId)
  }
  OnNodeDeActive(i) {
    var t;
    this.RemoveTag(0), this.Blackboard?.RemoveTag(16, this.NodeId.toString()), this.SilentAreaInfoViewConfig && this.Blackboard?.RemoveSilentShowInfo(this.NodeId), this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && (t = ModelManager_1.ModelManager.QuestNewModel, this.Config.TidQuestAliasName && !StringUtils_1.StringUtils.IsEmpty(PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Config.TidQuestAliasName)) && t.SetQuestStageName(this.TreeConfigId, ""), this.Config.TidQuestAliasDesc && !StringUtils_1.StringUtils.IsEmpty(PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Config.TidQuestAliasDesc)) && t.SetQuestStageDesc(this.TreeConfigId, ""), this.Config.RewardConfig?.RewardId) && t.SetQuestStageReward(this.TreeConfigId, 0), this.AddTrackViewMode && (this.Blackboard.TrackViewModel = "All"), this.Config.DungeonId && (0 !== this.Blackboard.ChangeDungeonIdNodeId ? this.Blackboard.ChangeDungeonIdNodeId === this.InnerNodeId && (this.Blackboard.DungeonId = void 0, this.Blackboard.ChangeDungeonIdNodeId = 0) : this.Blackboard.DungeonId = void 0), this.Config?.SpecialGamePlayConfig && SneakController_1.SneakController.EndSneaking(), this.Config.DisableOnline && this.L$t(!1), super.OnNodeDeActive(i)
  }
  L$t(i) {
    switch (this.BtType) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        ModelManager_1.ModelManager.OnlineModel.DisableOnline(0, i, this.TreeConfigId, this.NodeId);
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        ModelManager_1.ModelManager.OnlineModel.DisableOnline(1, i, this.TreeConfigId, this.NodeId)
    }
  }
}
exports.LogicNodeBase = LogicNodeBase;
//# sourceMappingURL=LogicNodeBase.js.map