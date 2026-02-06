"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogicNodeBase = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const GlobalData_1 = require("../../../../GlobalData");
const LevelGeneralController_1 = require("../../../../LevelGamePlay/LevelGeneralController");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SneakController_1 = require("../../../../World/Controller/SneakController");
const AnimController_1 = require("../../../Anim/AnimController");
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
  get ModifyTrackAreaTextConfig() {
    return this.Config?.ModifyTrackAreaText;
  }
  get TrackLevelPlay() {
    if (this.TrackTarget?.TrackType.Type === "LevelPlay") {
      return this.TrackTarget.TrackType;
    }
  }
  OnCreate(t) {
    this.Config = t;
    this.TrackTarget = t.UIConfig?.TrackTarget;
    return true;
  }
  OnNodeActive() {
    var t;
    var i = this.Config;
    if (i.DungeonId) {
      this.Blackboard.DungeonId = i.DungeonId;
      this.Blackboard.ChangeDungeonIdNodeId = this.InnerNodeId;
    }
    if (i.DisableOnline) {
      this.L$t(true);
    }
    if (i.DisableTrackAnim && LevelGeneralController_1.LevelGeneralController.CheckConditionNew(i.DisableTrackAnim.Condition, undefined, this.Context)) {
      this.Blackboard?.AddTag(16, this.NodeId.toString());
    }
    if (i.DisableSkeletalAnimationCheck) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.Animation.AnimSeqSkeletonCheck false");
    }
    if (this.Config.LogicProgramSpecialProcess) {
      this.Lam(true);
    }
    if (this.CustomUiConfig) {
      this.AddTag(0);
    }
    if (this.SilentAreaInfoViewConfig) {
      this.Blackboard?.AddSilentShowInfo(this.NodeId, this.SilentAreaInfoViewConfig);
    }
    if (this.ModifyTrackAreaTextConfig) {
      this.Blackboard?.AddModifyTrackAreaConfig(this.NodeId, this.ModifyTrackAreaTextConfig);
    }
    if (i.CompositeTrackViewMode) {
      this.Blackboard.TrackViewModel = i.CompositeTrackViewMode;
      this.AddTrackViewMode = true;
    }
    if (this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && (t = ModelManager_1.ModelManager.QuestNewModel, i.TidQuestAliasName && !StringUtils_1.StringUtils.IsEmpty(PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TidQuestAliasName)) && t.SetQuestStageName(this.TreeConfigId, i.TidQuestAliasName), i.TidQuestAliasDesc && !StringUtils_1.StringUtils.IsEmpty(PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TidQuestAliasDesc)) && t.SetQuestStageDesc(this.TreeConfigId, i.TidQuestAliasDesc), i = i.RewardConfig?.RewardId)) {
      t.SetQuestStageReward(this.TreeConfigId, i);
    }
    if (this.Config?.SpecialGamePlayConfig) {
      SneakController_1.SneakController.StartSneaking();
    }
    if (this.Config?.SaveConfig) {
      this.Blackboard.RollbackPoint = this.NodeId;
    }
    if (this.TrackLevelPlay) {
      ModelManager_1.ModelManager.GeneralLogicTreeModel.AddLevelPlayTrackBinding(this.NodeId, this.TreeIncId, this.TrackLevelPlay.LevelPlayId);
      this.Blackboard?.AddTag(17, this.NodeId.toString());
    }
    if (this.Config?.DisableSystemPrompt && this.Config.DisableSystemPrompt.length > 0) {
      this.a8g(true);
    }
  }
  OnNodeDeActive(t) {
    var i;
    this.RemoveTag(0);
    this.Blackboard?.RemoveTag(16, this.NodeId.toString());
    if (this.SilentAreaInfoViewConfig) {
      this.Blackboard?.RemoveSilentShowInfo(this.NodeId);
    }
    if (this.ModifyTrackAreaTextConfig) {
      this.Blackboard?.RemoveModifyTrackAreaConfig(this.NodeId);
    }
    if (this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && (i = ModelManager_1.ModelManager.QuestNewModel, this.Config.TidQuestAliasName && !StringUtils_1.StringUtils.IsEmpty(PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Config.TidQuestAliasName)) && i.SetQuestStageName(this.TreeConfigId, ""), this.Config.TidQuestAliasDesc && !StringUtils_1.StringUtils.IsEmpty(PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Config.TidQuestAliasDesc)) && i.SetQuestStageDesc(this.TreeConfigId, ""), this.Config.RewardConfig?.RewardId)) {
      i.SetQuestStageReward(this.TreeConfigId, 0);
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
    if (this.Config.DisableSkeletalAnimationCheck) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.Animation.AnimSeqSkeletonCheck true");
    }
    if (this.Config.LogicProgramSpecialProcess) {
      this.Lam(false);
    }
    if (this.TrackLevelPlay) {
      ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveLevelPlayTrackBinding(this.TreeIncId, this.TrackLevelPlay.LevelPlayId);
      this.Blackboard?.RemoveTag(17, this.NodeId.toString());
    }
    if (this.Config?.DisableSystemPrompt && this.Config.DisableSystemPrompt.length > 0) {
      this.a8g(false);
    }
    super.OnNodeDeActive(t);
  }
  Lam(t) {
    for (const e of this.Config.LogicProgramSpecialProcess.SpecialProcessList) {
      if (e.Type === IQuest_1.ELogicProgramSpecialProcess.DisableURO) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("World", 35, "程序特殊处理节点", ["Ids", e.EntityIds]);
        }
        for (const s of e.EntityIds) {
          var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s)?.Entity;
          if (i?.Valid) {
            i = i.GetComponent(47);
            if (t) {
              i?.StartForceDisableAnimOptimization(0, false);
            } else {
              i?.CancelForceDisableAnimOptimization(0);
            }
          } else if (t) {
            AnimController_1.AnimController.CacheForceDisableAnimOptimization(s);
          }
        }
      }
    }
    if (!t) {
      AnimController_1.AnimController.ClearForceDisableAnimOptimizationCache();
    }
  }
  L$t(t) {
    switch (this.BtType) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        ModelManager_1.ModelManager.OnlineModel.DisableOnline(0, t, this.TreeConfigId, this.NodeId);
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        ModelManager_1.ModelManager.OnlineModel.DisableOnline(1, t, this.TreeConfigId, this.NodeId);
    }
  }
  a8g(t) {
    for (const i of this.Config.DisableSystemPrompt) {
      if (i.Type === IQuest_1.ESystemPromptType.AreaName && (ModelManager_1.ModelManager.AreaModel.SetEnableAreaNamePrompt(t), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Temp", 31, "屏蔽地区弹窗", ["Disable", t]);
      }
    }
  }
}
exports.LogicNodeBase = LogicNodeBase;
//# sourceMappingURL=LogicNodeBase.js.map