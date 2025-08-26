"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Quest = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LogicTreeContainer_1 = require("../../../GeneralLogicTree/LogicTreeContainer");
const MapDefine_1 = require("../../../Map/MapDefine");
const QuestController_1 = require("../../Controller/QuestController");
const QuestDefine_1 = require("../../QuestDefine");
const QuestUtil_1 = require("../../QuestUtil");
class Quest extends LogicTreeContainer_1.LogicTreeContainer {
  constructor(t, e) {
    super();
    this.InnerId = 0;
    this.InnerType = undefined;
    this.InnerSubType = undefined;
    this.InnerMainType = 0;
    this.InnerStatus = undefined;
    this.Finished = false;
    this.IsNewQuest = false;
    this.Lo = undefined;
    this.uno = "";
    this.Kro = "";
    this.Qro = "";
    this.Xro = "";
    this.$ro = 0;
    this.StageRewardId = 0;
    this.Yro = undefined;
    this.IH1 = undefined;
    this.OnlineType = "SingleHangUpOnline";
    this.AutoTrack = false;
    this.AutoCoverCurTrack = false;
    this.AutoHideTrackMark = true;
    this.IsHideInTaskList = false;
    this.DungeonId = 0;
    this.FunctionId = 0;
    this.TagId = 0;
    this.DistributeType = undefined;
    this.ActiveActions = undefined;
    this.AcceptActions = undefined;
    this.FinishActions = undefined;
    this.TerminateActions = undefined;
    this.AcceptQuestOptionConfig = undefined;
    this.Jro = 0;
    this.LockByLackResource = false;
    this.LockByFocusMode = false;
    this.SuspendByOnline = false;
    if (e) {
      this.InnerId = e.Id;
      this.InnerStatus = Protocol_1.Aki.Protocol.hTs.Proto_InActive;
      this.InnerType = t;
      this.Lo = e;
      this.InnerSubType = e.SubType;
      this.uno = e.TidName;
      this.Kro = e.TidDesc;
      this.$ro = e.RewardId;
      this.DungeonId = e.DungeonId;
      this.FunctionId = e.FunctionId;
      this.DistributeType = e.DistributeType;
      this.OnlineType = e.OnlineType ?? "SingleHangUpOnline";
      this.AcceptQuestOptionConfig = e.AddInteractOption;
      this.AutoTrack = e.IsAutoTrack ?? false;
      this.AutoCoverCurTrack = e.IsAutoCoverCurTrack ?? false;
      this.Yro = e.RecommendPreQuest;
      this.TagId = e.TagId ?? 0;
      this.IsHideInTaskList = e.IsHideInTaskList ?? false;
      this.IH1 = e.FocusModeSetting;
      if (t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfig(this.Type)) {
        this.InnerMainType = t.MainId;
      }
      if (this.MainTypeId && (t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(this.MainTypeId))) {
        this.AutoHideTrackMark = t.AutoHideTrack;
      }
      this.ActiveActions = e.ActiveActions;
      this.AcceptActions = e.AcceptActions;
      this.FinishActions = e.FinishActions;
      this.TerminateActions = e.TerminateActions;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Quest", 18, "找不到任务配置数据", ["任务Id", this.InnerId], ["配置路径", QuestDefine_1.QUEST_CONFIGPATH]);
    }
  }
  get Id() {
    return this.InnerId ?? QuestDefine_1.INVALID_QUEST_ID;
  }
  get Type() {
    return this.InnerType;
  }
  get MainTypeId() {
    return this.InnerMainType;
  }
  get ChapterId() {
    return this.Lo.ChapterId;
  }
  get HideAcceptQuestMark() {
    return this.Lo.IsHideAcceptMarkOnNpc;
  }
  get Status() {
    return this.InnerStatus;
  }
  get IsProgressing() {
    return this.Status === Protocol_1.Aki.Protocol.hTs.nvs;
  }
  get IsInteractValid() {
    return !ModelManager_1.ModelManager.GameModeModel.IsMulti || this.OnlineType !== "SingleHangUpOnline";
  }
  get SubType() {
    return this.InnerSubType;
  }
  get RewardId() {
    if (this.StageRewardId !== 0) {
      return this.StageRewardId;
    } else {
      return this.$ro;
    }
  }
  get NameKey() {
    let t = this.Qro;
    return t = t !== undefined && t.length !== 0 ? t : this.uno;
  }
  get Name() {
    return PublicUtil_1.PublicUtil.GetConfigTextByKey(this.NameKey);
  }
  get QuestDescribe() {
    let t = this.Xro;
    if (t === undefined || t.length === 0) {
      t = this.Kro;
    }
    return PublicUtil_1.PublicUtil.GetConfigTextByKey(t);
  }
  get QuestShowConditionDescribe() {
    return PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Lo.PreShowInfo?.TidPreShowDesc ?? "");
  }
  get QuestShowCondition() {
    return this.Lo.PreShowInfo?.PreShowCondition?.Conditions;
  }
  get UnlockCondition() {
    return this.Lo.ProvideType?.Conditions;
  }
  get QuestMarkId() {
    return QuestUtil_1.QuestUtil.GetQuestMarkId(this.MainTypeId, this.Id);
  }
  get FocusSetting() {
    return this.IH1;
  }
  Destroy() {
    this.Lo = undefined;
    if (this.AcceptQuestOptionConfig) {
      ModelManager_1.ModelManager.MapModel.RemoveMapMark(12, this.Jro);
      this.Jro = 0;
    }
    super.Destroy();
  }
  UpdateState(t, e) {
    var i = this.InnerStatus;
    this.InnerStatus = t;
    var i = i !== this.InnerStatus;
    if (i) {
      switch (t) {
        case Protocol_1.Aki.Protocol.hTs.CTs:
          this.OnQuestStateToReady();
          break;
        case Protocol_1.Aki.Protocol.hTs.nvs:
          this.IsNewQuest = e === 1;
          this.OnQuestToProgress();
          break;
        case Protocol_1.Aki.Protocol.hTs.a3_:
          this.OnQuestToFinish();
          break;
        case Protocol_1.Aki.Protocol.hTs.Proto_Delete:
          this.OnQuestToDelete();
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnQuestStateChange, this.Id, this.Status, e);
    }
  }
  OnQuestStateToReady() {
    switch (this.DistributeType) {
      case "Interact":
        ModelManager_1.ModelManager.QuestNewModel.AddCanAcceptQuest(this.Id);
        this.AddAcceptQuestMark();
        break;
      case "System":
      case "UseItem":
      case "InformationViewCheck":
        break;
      default:
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Quest", 26, "未支持的任务派发类型：", ["this.DistributeType", this.DistributeType]);
        }
    }
  }
  AddAcceptQuestMark() {
    var t;
    if (!this.HideAcceptQuestMark) {
      if (t = this.AcceptQuestOptionConfig) {
        this.Zro(t.EntityId, this.DungeonId);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "交互接取的任务没有配交互选项", ["任务Id", this.Id]);
      }
    }
  }
  OnQuestToProgress() {
    ModelManager_1.ModelManager.QuestNewModel.RemoveCanAcceptQuest(this.Id);
    if (this.AcceptQuestOptionConfig) {
      ModelManager_1.ModelManager.MapModel.RemoveMapMark(12, this.Jro);
      this.Jro = 0;
    }
  }
  OnQuestToFinish() {
    this.Finished = true;
    QuestController_1.QuestNewController.TryChangeTrackedQuest2(this.Id);
    if (QuestController_1.QuestNewController.QuestRangeFailWarningTreeId === this.TreeId) {
      QuestController_1.QuestNewController.HideCancelRangeFailWaringEffect();
    }
  }
  OnQuestToDelete() {
    var t;
    if (ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id === this.Id) {
      t = this.Finished ? 1 : 0;
      QuestController_1.QuestNewController.RequestTrackQuest(this.Id, false, 2, t);
    }
    if (QuestController_1.QuestNewController.QuestRangeFailWarningTreeId === this.TreeId) {
      QuestController_1.QuestNewController.HideCancelRangeFailWaringEffect();
    }
  }
  Zro(t, e) {
    if (ModelManager_1.ModelManager.CreatureModel.GetEntityData(t, e)) {
      if ((e = this.QuestMarkId) && this.IsInteractValid && this.Jro === 0) {
        e = new MapDefine_1.QuestMarkCreateInfo({
          TrackTarget: t,
          MarkConfigId: e,
          MarkType: 12,
          TrackSource: 5,
          TreeId: this.Id,
          NodeId: 0,
          EntityConfigId: t,
          MapAndDungeonInfo: {
            DungeonId: this.DungeonId
          }
        });
        this.Jro = ModelManager_1.ModelManager.MapModel.CreateMapMark(e);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Quest", 49, "给任务添加地图标记时,找不到对应的实体", ["任务Id:", this.Id], ["实体Id", t]);
    }
  }
  CanShowInUiPanel() {
    if (this.IsQuestCanPreShow()) {
      return true;
    }
    if ((this.Status === Protocol_1.Aki.Protocol.hTs.Proto_InActive || this.Status === Protocol_1.Aki.Protocol.hTs.CTs) && (this.LockByLackResource || this.LockByFocusMode)) {
      return !this.IsHideInTaskList && this.Type !== 11;
    }
    if (this.Status !== Protocol_1.Aki.Protocol.hTs.nvs) {
      return false;
    }
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestBindingActivityId(this.Id);
    if (t && !ModelManager_1.ModelManager.ActivityModel.GetActivityById(t)?.CheckIfInOpenTime()) {
      return false;
    }
    return super.CanShowInUiPanel();
  }
  IsQuestCanPreShow() {
    return ModelManager_1.ModelManager.QuestNewModel.IsPreShowQuest(this.Id);
  }
  IsQuestHasRecommendPreQuest() {
    return this.Yro !== undefined;
  }
  GetRecommendPreQuest() {
    return this.Yro;
  }
  SetQuestStageName(t) {
    this.Qro = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnQuestStageNameChange, this.Id);
  }
  SetQuestStageDesc(t) {
    this.Xro = t;
  }
  SetQuestStageReward(t) {
    this.StageRewardId = t;
  }
  SetTrack(t, e = 0) {
    super.SetTrack(t, e);
    if (t) {
      QuestController_1.QuestNewController.RedDotRequest(this.Id, 0);
    }
  }
}
exports.Quest = Quest;
//# sourceMappingURL=Quest.js.map