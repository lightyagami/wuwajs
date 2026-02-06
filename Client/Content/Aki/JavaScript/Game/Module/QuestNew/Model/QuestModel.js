"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestNewModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ActivityQuestConfigAll_1 = require("../../../../Core/Define/ConfigQuery/ActivityQuestConfigAll");
const QuestTrackingConfigAll_1 = require("../../../../Core/Define/ConfigQuery/QuestTrackingConfigAll");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ResourceUpdateManager_1 = require("../../../../Launcher/Update/ResourceDiffUpdate/ResourceUpdateManager");
const IGlobal_1 = require("../../../../UniverseEditor/Interface/IGlobal");
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const EventCSharpBridge_1 = require("../../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GeneralLogicTreeConfigUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeConfigUtil");
const QuestController_1 = require("../Controller/QuestController");
const QuestDefine_1 = require("../QuestDefine");
const QuestTypeDefine_1 = require("./Quest/QuestTypeDefine");
class QuestNewModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.eno = undefined;
    this.tno = undefined;
    this.ino = undefined;
    this.FinishedMainQuests = [];
    this.nVa = undefined;
    this.OF1 = undefined;
    this.j7u = new Set();
    this.TH1 = undefined;
    this.ono = undefined;
    this.rno = undefined;
    this.sno = undefined;
    this.CurShowUpdateTipsQuest = undefined;
    this.bH1 = 0;
    this.ano = undefined;
    this.ActivityIdsByQuestId = undefined;
    this.ActivityStatesByQuestId = new Map();
    this.IsServerNotifyEnd = false;
    this.ServerNotifyEndQuestId = 0;
    this.IsLackQuestVideoResource = false;
    this.QuestVideoResourceDownloadFinished = false;
    this.Zpi = e => {
      for (const t of JSON.parse(e).Quests) {
        this.ono.set(t.Id, t);
        if (t.Tree) {
          GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.InitBehaviorNodeConfig(this.rno, t.Id, t.Tree);
        }
      }
    };
    this.SortQuestInView = (e, t) => {
      var i = [];
      for (const s of [e.Id, t.Id]) {
        let e = this.GetQuestBindingActivityId(s);
        if (e === 0) {
          e = this.GetQuestActivityId(s);
        }
        var r = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
        let t = 0;
        t = r !== undefined ? r.LocalConfig?.IfShowQuestLeftTime && r.CheckIfInOpenTime() && r.EndOpenTime !== 0 ? 0 : 1 : 2;
        i.push(t);
      }
      if (i[0] !== i[1]) {
        return i[0] - i[1];
      } else {
        return e.Id - t.Id;
      }
    };
    this.OKm = new Map();
  }
  OnInit() {
    this.eno = new Map();
    this.tno = new Map();
    this.ino = new Map();
    this.nVa = new Map();
    this.OF1 = new Map();
    this.TH1 = new Map();
    this.ono = new Map();
    this.rno = new Map();
    this.ano = new Map();
    this.ActivityIdsByQuestId = new Map();
    this.ActivityStatesByQuestId = new Map();
    this.FinishedMainQuests = [];
    this.InitQuestConfig();
    this.SetActivityStates();
    PublicUtil_1.PublicUtil.RegisterEditorLocalConfig();
    return true;
  }
  OnClear() {
    if (this.eno) {
      for (var [, e] of this.eno) {
        e.Destroy();
      }
      this.eno.clear();
      this.eno = undefined;
    }
    this.sno = undefined;
    this.ono?.clear();
    this.ono = undefined;
    this.rno?.clear();
    this.rno = undefined;
    this.tno?.clear();
    this.tno = undefined;
    this.ino?.clear();
    this.ino = undefined;
    this.nVa?.clear();
    this.nVa = undefined;
    this.OF1?.clear();
    this.OF1 = undefined;
    this.TH1?.clear();
    this.TH1 = undefined;
    this.ActivityIdsByQuestId?.clear();
    this.ActivityIdsByQuestId = undefined;
    this.ActivityStatesByQuestId?.clear();
    this.IsServerNotifyEnd = false;
    this.ServerNotifyEndQuestId = 0;
    this.FinishedMainQuests = [];
    return true;
  }
  OnLeaveLevel() {
    return true;
  }
  InitQuestConfig() {
    var e;
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.ono.clear();
      this.rno.clear();
      e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.QuestListDir);
      GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.InitConfig(e, this.Zpi);
    }
  }
  AddQuest(e) {
    var t;
    var i = this.GetQuestConfig(e);
    if (i) {
      if (!(t = this.eno.get(e))) {
        t = (0, QuestTypeDefine_1.createQuestObj)(i);
        this.eno.set(e, t);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddNewQuest, t);
      }
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Quest", 18, "添加任务时找不到任务配置", ["配置路径", QuestDefine_1.QUEST_CONFIGPATH], ["任务Id", e]);
    }
  }
  RemoveQuest(e) {
    var t = this.eno.get(e);
    if (t) {
      t.Destroy();
      this.eno.delete(e);
    }
  }
  AddFinishedQuest(e) {
    this.ino.set(e, true);
    if (this.GetQuestConfig(e)?.Type === 1) {
      this.FinishedMainQuests.push(e);
    }
  }
  GetCanAcceptQuest() {
    return this.tno;
  }
  AddCanAcceptQuest(e) {
    this.tno.set(e, true);
  }
  RemoveCanAcceptQuest(e) {
    this.tno.delete(e);
  }
  AddPreShowQuest(e) {
    this.nVa.set(e, true);
    this.AddQuest(e);
  }
  RemovePreShowQuest(e) {
    this.nVa.delete(e);
    if (this.GetQuest(e)?.Status === Protocol_1.Aki.Protocol.hTs.Proto_InActive) {
      this.RemoveQuest(e);
    }
  }
  GetPreShowQuests() {
    return this.nVa;
  }
  IsPreShowQuest(e) {
    return this.nVa.get(e) !== undefined;
  }
  AddLackResourceQuest(e) {
    this.OF1.set(e, true);
    var t = this.AddQuest(e);
    if (t && (t.LockByLackResource = true, this.GetQuestState(e) === 1)) {
      QuestController_1.QuestNewController.RedDotRequest(e, 0);
    }
  }
  RemoveLackResourceQuest(e) {
    this.OF1.delete(e);
    var t = this.GetQuest(e);
    if (t && (t.LockByLackResource = false, this.GetQuestState(e) === 1)) {
      QuestController_1.QuestNewController.RedDotRequest(e, 1);
    }
  }
  IsTrackingQuest(e) {
    return this.GetCurTrackedQuest()?.Id === e;
  }
  GetCurTrackedQuest() {
    return this.sno;
  }
  SetQuestTrackState(e, t, i = 0) {
    if (t) {
      t = this.GetQuest(e);
      if (t?.IsProgressing) {
        if (this.sno) {
          if (this.sno.Id === t.Id) {
            return;
          }
          this.sno.SetTrack(false, i);
        }
        (this.sno = t).SetTrack(true, i);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Quest", 18, "更新任务追踪时,找不到进行中的任务", ["任务Id", e]);
      }
    } else if (this.sno && this.sno.Id === e) {
      this.sno.SetTrack(false, i);
      this.sno = undefined;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CurTrackQuestUnTrackedCheck);
    }
  }
  GetCurQuestTrackPosition(e = 0, t) {
    var i = this.GetCurTrackedQuest();
    if (i) {
      var r = i.GetActiveChildQuestNodesId();
      if (r.length !== 0 && !(e > r.length - 1)) {
        return i.GetNodeTrackPosition(r[e]);
      }
    }
  }
  TryGetMapMarkIdByQuestId(e) {
    var t = this.GetQuest(e);
    if (t) {
      var i = t.TreeId;
      var t = ModelManager_1.ModelManager.MapModel.GetAllDynamicMarks().get(12);
      if (t) {
        for (const s of t.values()) {
          var r = s;
          if (r.TreeId === i || r.TreeId === e) {
            return r.MarkId;
          }
        }
      }
    }
  }
  GetQuestConfig(e) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      return this.ono.get(e);
    }
    let t = this.ono.get(e);
    if (!t) {
      var i = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestConfig(e);
      if (!i) {
        return;
      }
      t = JSON.parse(i.Data);
      this.ono.set(e, t);
    }
    return t;
  }
  GetQuestNodeConfig(e, t) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      return this.rno.get(e)?.get(t);
    }
    let i = this.rno.get(e);
    let r = (i = i || new Map()).get(t);
    if (!r) {
      e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestNodeConfig(e, t);
      if (!e) {
        return;
      }
      r = JSON.parse(e.Data);
      i.set(t, r);
    }
    return r;
  }
  GetCurFocusQuestId() {
    return this.bH1;
  }
  SetFocusQuestId(e) {
    return this.bH1 !== e && (this.bH1 = e, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FocusQuestChange, e), true);
  }
  IsInFocusMode() {
    return this.bH1 !== 0;
  }
  IsInFocusOnQuest(e) {
    return this.bH1 === e;
  }
  AddPendingAcceptQuestOnFocusMode(e) {
    this.TH1.set(e, true);
    var t = this.AddQuest(e);
    if (t) {
      t.LockByFocusMode = true;
      if (this.GetQuestState(e) === 1 && !t.LockByLackResource) {
        QuestController_1.QuestNewController.RedDotRequest(e, 1);
      }
    }
  }
  RemovePendingAcceptQuestOnFocusMode(e) {
    this.TH1.delete(e);
    var t = this.GetQuest(e);
    if (t && (t.LockByFocusMode = false, t = ModelManager_1.ModelManager.QuestTreeModel.GetNodeDataFromQuestId(e))) {
      EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsHandleQuestTreeNodeResponse, 3, t.Id);
    }
  }
  CheckNeedBanQuestPushByFocusMode(e) {
    return !!e && !!this.IsInFocusMode() && !this.IsInFocusOnQuest(e) && !this.GetQuestConfig(e)?.FocusModeSetting?.IsFocusModeWhiteList;
  }
  GetQuest(e) {
    return this.eno.get(e);
  }
  GetQuests() {
    var e = [];
    if (this.eno) {
      for (var [, t] of this.eno) {
        e.push(t);
      }
    }
    return e;
  }
  GetQuestState(e) {
    var t = this.GetQuest(e);
    if (t) {
      return t.Status;
    } else if (this.ino.get(e)) {
      return 3;
    } else if (this.tno.get(e)) {
      return 1;
    } else {
      return 0;
    }
  }
  CheckQuestFinished(e) {
    return this.GetQuestState(e) === 3;
  }
  GetQuestsByType(e) {
    var t;
    var i = [];
    for ([, t] of this.eno) {
      if (t.Type === e) {
        i.push(t);
      }
    }
    return i;
  }
  GetQuestsByTypeAndSubType(e, t) {
    var i;
    var r = [];
    for ([, i] of this.eno) {
      if (i.Type === e && i.SubType === t) {
        r.push(i);
      }
    }
    return r;
  }
  GetFirstShowQuestByType(e) {
    e = this.GetQuestsByType(e);
    e.sort(this.SortQuestInView);
    for (const t of e) {
      if (t.CanShowInUiPanel()) {
        return t;
      }
    }
  }
  GetQuestName(e) {
    e = this.GetQuest(e);
    if (e) {
      return e.Name;
    } else {
      return "";
    }
  }
  SetQuestStageName(e, t) {
    e = this.GetQuest(e);
    if (e) {
      e.SetQuestStageName(t);
    }
  }
  SetQuestStageDesc(e, t) {
    e = this.GetQuest(e);
    if (e) {
      e.SetQuestStageDesc(t);
    }
  }
  SetQuestStageReward(e, t) {
    e = this.GetQuest(e);
    if (e) {
      e.SetQuestStageReward(t);
    }
  }
  GetQuestDetails(e) {
    e = this.GetQuest(e);
    if (e) {
      return e.QuestDescribe;
    } else {
      return "";
    }
  }
  GetShowQuestConditionDescribe(e) {
    e = this.GetQuest(e);
    if (e) {
      return e.QuestShowConditionDescribe;
    } else {
      return "";
    }
  }
  GetUnlockConditions(e) {
    e = this.GetQuest(e);
    if (e) {
      return e.UnlockCondition;
    }
  }
  GetShowQuestChapterIdFromConfig(e) {
    e = this.GetQuestConfig(e);
    if (e) {
      return e.ChapterId;
    } else {
      return 0;
    }
  }
  GetShowQuestConditionFromConfig(e) {
    e = this.GetQuestConfig(e);
    if (!e || !e.PreShowInfo || StringUtils_1.StringUtils.IsBlank(e.PreShowInfo.TidPreShowDesc)) {
      return "";
    } else {
      return PublicUtil_1.PublicUtil.GetConfigTextByKey(e.PreShowInfo.TidPreShowDesc);
    }
  }
  GetDisplayRewardInfo(e) {
    e = this.GetQuest(e);
    if (e) {
      const o = ConfigManager_1.ConfigManager.QuestNewConfig.GetDropConfig(e.RewardId);
      if (o && o.DropPreview.size !== 0) {
        var t;
        var i = [];
        for ([t] of o.DropPreview) {
          var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
          var s = o.DropPreview.get(t);
          if (r) {
            const o = new QuestDefine_1.QuestRewardInfo(t, s);
            i.push(o);
          }
        }
        return i;
      }
    }
  }
  GetDisplayRewardCommonInfo(e) {
    e = this.GetQuest(e);
    if (e) {
      var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetDropConfig(e.RewardId);
      if (t && t.DropPreview.size !== 0) {
        var i;
        var r = [];
        for ([i] of t.DropPreview) {
          var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
          var o = t.DropPreview.get(i);
          if (s) {
            r.push([{
              IncId: 0,
              ItemId: i
            }, o]);
          }
        }
        return r;
      }
    }
  }
  GetDisplayRewardCommonInfoFromQuestConfig(e) {
    e = this.GetQuestConfig(e);
    if (e) {
      var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetDropConfig(e.RewardId);
      if (t && t.DropPreview.size !== 0) {
        var i;
        var r = [];
        for ([i] of t.DropPreview) {
          var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
          var o = t.DropPreview.get(i);
          if (s) {
            r.push([{
              IncId: 0,
              ItemId: i
            }, o]);
          }
        }
        return r;
      }
    }
  }
  GetQuestLockIconPath(t) {
    t = this.GetQuest(t);
    if (t) {
      let e = undefined;
      if (t.IsSuspend()) {
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconOccupy");
      } else if (t.IsQuestCanPreShow()) {
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_FuncLock");
      } else if (t.IsQuestHasRecommendPreQuest()) {
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComExclamation");
      } else if (t.HasRefOccupiedEntity()) {
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconOccupy");
      }
      return e;
    }
  }
  GetQuestSpecialState(e) {
    let t = undefined;
    if (!(t = typeof e == "number" ? this.GetQuest(e) : e)) {
      return 0;
    }
    if (t.IsSuspend()) {
      return 4;
    }
    if (t.HasRefOccupiedEntity()) {
      return 7;
    }
    if (t.LockByLackResource) {
      if (!this.GKm(t.Id)) {
        return 2;
      }
      if (!t.SuspendByOnline) {
        return 3;
      }
    }
    if (t.SuspendByOnline) {
      return 5;
    } else if (t.IsQuestCanPreShow()) {
      return 1;
    } else if (t.IsQuestHasRecommendPreQuest()) {
      return 6;
    } else if (t.LockByFocusMode) {
      if (this.IsInFocusMode()) {
        return 8;
      } else {
        return 9;
      }
    } else if (this.IsInFocusMode() && !this.IsInFocusOnQuest(t.Id)) {
      return 10;
    } else if (this.GetQuestBindingActivityId(t.Id) !== 0) {
      return 11;
    } else if (ModelManager_1.ModelManager.QuestNewModel.GetQuestActivityId(t.Id) !== 0) {
      return 12;
    } else {
      return 0;
    }
  }
  SetQuestRedDot(e, t) {
    if (t) {
      this.ano.set(e, true);
    } else {
      this.ano.delete(e);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Quest", 18, "任务红点状态改变", ["questId", e], ["bAdd", t]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnQuestRedDotStateChange, e);
  }
  CheckQuestRedDotDataState(e) {
    return this.ano.get(e);
  }
  GetAllRedDotData() {
    return this.ano;
  }
  GetCurWorldLevelBreakQuest() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("WorldLevelBreakthroughTask");
    if (e === undefined) {
      return -1;
    }
    let t = -1;
    e.forEach(e => {
      if (this.GetQuest(e) !== undefined) {
        t = e;
      }
    });
    return t;
  }
  SetActivityQuestData(e, t) {
    if (t && t.length !== 0) {
      for (const i of t) {
        this.ActivityIdsByQuestId.set(i, e);
      }
    }
  }
  SetActivityStates() {
    var e = ActivityQuestConfigAll_1.configActivityQuestConfigAll.GetConfigList();
    if (e) {
      for (const t of e) {
        this.ActivityStatesByQuestId.set(t.QuestId, [t.ActivityId, t.IsDisplay]);
      }
    }
  }
  GetQuestBindingActivityId(e) {
    return this.ActivityIdsByQuestId.get(e) ?? 0;
  }
  GetQuestActivityId(e) {
    return this.ActivityStatesByQuestId.get(e)?.[0] ?? 0;
  }
  GetQuestShowQuestLeftTime(e) {
    return this.ActivityStatesByQuestId.get(e)?.[1] ?? false;
  }
  GetActivityGuideQuestRemainTimeText(e, t) {
    var e = Math.max(e, 1);
    var i = this.FOe(e);
    var e = TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, i[0], i[1]).CountDownText ?? "";
    return StringUtils_1.StringUtils.Format(t, e);
  }
  FOe(e) {
    if (e > CommonDefine_1.SECOND_PER_DAY) {
      return [3, 2];
    } else if (e > CommonDefine_1.SECOND_PER_HOUR) {
      return [2, 1];
    } else if (e > CommonDefine_1.SECOND_PER_MINUTE) {
      return [1, 0];
    } else {
      return [0, 0];
    }
  }
  GetSuccessiveQuestId(e) {
    var r = QuestTrackingConfigAll_1.configQuestTrackingConfigAll.GetConfigList();
    if (e !== undefined && r) {
      let t = -1;
      let i = undefined;
      for (const s of r) {
        if (s.PreQuestIds.includes(e)) {
          let e = true;
          for (const o of s.PreQuestIds) {
            if (!this.CheckQuestFinished(o)) {
              e = false;
              break;
            }
          }
          if (e && (s.Priority > t || s.Priority === t && s.TrackQuestId < i)) {
            t = s.Priority;
            i = s.TrackQuestId;
          }
        }
      }
      return i;
    }
  }
  GetHighestPriorityProcessingQuestId() {
    if (this.eno) {
      let e = -1;
      let t = undefined;
      for (var [i] of this.eno) {
        var r = this.GetQuestConfig(i);
        if (r?.RecommendationPriority && !this.CheckQuestFinished(i) && (r?.RecommendationPriority > e || r?.RecommendationPriority === e && i < t)) {
          e = r?.RecommendationPriority;
          t = i;
        }
      }
      return t;
    }
  }
  RefreshResidentQuestMapMark() {
    if (this.eno) {
      for (var [, e] of this.eno) {
        if (e.Tree?.GetMapMarkResident()) {
          e.Tree.Expression?.RefreshMapMark(true);
          e.Tree.Expression?.RefreshMapMark(false);
        }
      }
    }
  }
  CheckBehaviorStepFinishState(e, t) {
    var i = e.QuestScheduleType;
    switch (i.Type) {
      case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
        var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
        if (r) {
          if (!(r = r.GetNode(i.ChildQuestId)) || r.IsProcessing) {
            return 0;
          } else if (r.IsSuccess) {
            return 1;
          } else {
            return 2;
          }
        } else {
          return 0;
        }
      case IQuest_1.EQuestScheduleType.TimeLeft:
        var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
        if (r) {
          s = i.TimerType;
          if (r = r.GetChallengeRemainTime(s)) {
            if (i.TimeLeft <= r) {
              return 1;
            } else {
              return 2;
            }
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      case IQuest_1.EQuestScheduleType.Condition:
        var s = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
        if (s) {
          if (r = i.Condition) {
            s = LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(s.BtType, s.TreeIncId, s.TreeConfigId);
            if (ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(r, undefined, s)) {
              return 1;
            } else {
              return 2;
            }
          } else {
            return 0;
          }
        } else {
          return 0;
        }
    }
    return 0;
  }
  LockQuestSuspendByOnline(e, t) {
    var i = this.GetQuest(e);
    if (i) {
      i.SuspendByOnline = t;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Quest", 18, "QuestModel.锁接取的任务不存在", ["questId", e]);
    }
  }
  AddQuestLockInfo(e) {
    this.j7u.add(e.B5n);
    switch (e.rpu) {
      case Protocol_1.Aki.Protocol.npu.Proto_QuestResource:
      case Protocol_1.Aki.Protocol.npu.Proto_QuestResourceShow:
        this.AddLackResourceQuest(e.B5n);
        break;
      case Protocol_1.Aki.Protocol.npu.Proto_QuestFocus:
        this.AddPendingAcceptQuestOnFocusMode(e.B5n);
    }
    this.LockQuestSuspendByOnline(e.B5n, e.ipu);
  }
  GetAllLockQuests() {
    return this.j7u;
  }
  GKm(e) {
    if (!ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      return true;
    }
    let t = this.OKm.get(e);
    if (!t) {
      var [i, r] = ControllerHolder_1.ControllerHolder.ResourceManagerController.GetQuestRefRes(e);
      for (const n of i) {
        var s = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetBlockBelongToSubPackage(n);
        if (ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(s) !== 5) {
          t = false;
          this.OKm.set(e, t);
          return t;
        }
      }
      for (const u of r) {
        var o = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetVideoBelongToSubPackage(u);
        if (o > 0 && ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(o) !== 5) {
          t = false;
          this.OKm.set(e, t);
          return t;
        }
      }
      t = true;
      this.OKm.set(e, t);
    }
    return t;
  }
  GetFinishQuestList() {
    if (this.ino) {
      return Array.from(this.ino.keys());
    } else {
      return [];
    }
  }
}
exports.QuestNewModel = QuestNewModel;
//# sourceMappingURL=QuestModel.js.map