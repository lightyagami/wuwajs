"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskMarkItem = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleUiDefine_1 = require("../../../BattleUi/BattleUiDefine");
const HonamiStoryDefine_1 = require("../../../HonamiStory/HonamiStoryDefine");
const LogReportController_1 = require("../../../LogReport/LogReportController");
const LogReportDefine_1 = require("../../../LogReport/LogReportDefine");
const TaskMarkItemView_1 = require("../MarkItemView/TaskMarkItemView");
const ServerMarkItem_1 = require("./ServerMarkItem");
const ONE_HUNDRED = 100;
class TaskMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(t, e, i, r) {
    super(t, e, i, r);
    this.MarkRange = 0;
    this.RangeMarkShowDisUp = 0;
    this.RangeMarkShowDisDown = 0;
    this.RangeMarkShowDis = 0;
    this.BtType = undefined;
    this.TreeIncId = undefined;
    this.TreeConfigId = 0;
    this.Tree = undefined;
    this.NodeId = 0;
    this.iRi = 0;
    this.oRi = false;
    this.rRi = 0;
    this.nRi = undefined;
    this.sRi = true;
    this.aRi = false;
  }
  get MarkType() {
    return 12;
  }
  get CanShowInDistance() {
    return this.sRi;
  }
  set CanShowInDistance(t) {
    if (this.sRi !== t && (this.sRi = t) && this.MapType === 1) {
      this.aRi = false;
    }
  }
  IsMultiMap() {
    return false;
  }
  get InstanceDungeonId() {
    var t = this.ServerMarkInfo.InstanceDungeonId;
    var e = ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(t);
    var i = ModelManager_1.ModelManager.MapModel.CurrentInWorld;
    if (e && !i && this.MapType === 1 && ModelManager_1.ModelManager.GameModeModel.InstanceDungeon !== undefined && this.IsTracked && ModelManager_1.ModelManager.MapModel.GetDungeonEntranceConfig(ModelManager_1.ModelManager.GameModeModel.InstanceDungeon)?.Id === t) {
      return ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    }
    return t;
  }
  get TrackAreaId() {
    return this.ServerMarkInfo.AreaId ?? 0;
  }
  OnInitialize() {
    super.OnInitialize();
    var t = this.ServerMarkInfo;
    this.SetTrackData(t.TrackTarget);
    this.EnableCachePosition = false;
    this.rRi = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(this.ConfigId).IconDistant;
    this.NodeId = t.NodeId;
    if (this.NodeId) {
      this.TreeIncId = t.TreeId;
      this.Tree = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.TreeIncId);
      if (!this.Tree) {
        return;
      }
      this.BtType = this.Tree.BtType;
      this.TreeConfigId = this.Tree.TreeConfigId;
      var e = this.Tree.GetNode(this.NodeId);
      if (e?.TrackTarget && e.TrackTarget.ZaxisViewRange) {
        this.RangeMarkShowDisUp = e.TrackTarget.ZaxisViewRange.Up / ONE_HUNDRED;
        this.RangeMarkShowDisDown = -e.TrackTarget.ZaxisViewRange.Down / ONE_HUNDRED;
      }
      var e = this.Tree.GetRangeMarkSize(this.NodeId);
      if (e) {
        this.MarkItemEntity.GetComponent(11).RangeSize = e / ONE_HUNDRED;
      }
      var e = this.Tree.GetRangeMarkShowDis(this.NodeId);
      if (e) {
        this.RangeMarkShowDis = e / ONE_HUNDRED;
        this.iRi = Math.pow(e, 2);
      } else {
        e = CommonParamById_1.configCommonParamById.GetIntConfig("dailyquest_trackinfo_mini");
        this.iRi = Math.pow(e, 2);
      }
    } else {
      this.BtType = Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest;
      this.TreeConfigId = t.TreeId;
    }
    var e = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(this.ConfigId);
    if (e) {
      t = ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(this.TreeConfigId) === 2 ? e.MarkPic : e.MarkAcceptablePic;
      this.TrackFxScale = e.FxScale;
      this.OnAfterSetConfigId({
        ShowRange: e.ShowRange,
        MarkPic: t,
        ShowPriority: e.ShowPriority,
        Scale: e.Scale
      });
    }
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t && (e = t.Entity.GetComponent(3))) {
      t = e.ActorLocationProxy;
      this.UpdateItemIsInDistance(t);
    }
    this.UpdateVisibleRelativeState();
  }
  OnDestroy() {
    if (this.MapType === 1) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange, this.TreeConfigId, this.NodeId, 1);
    }
  }
  GetMarkItemViewType() {
    return 23;
  }
  CreateView() {
    return new TaskMarkItemView_1.TaskMarkItemView(this);
  }
  OnUpdate(t) {
    this.UpdateItemIsInDistance(t);
    this.UpdateVisibleRelativeState();
    this.hRi(t);
  }
  GetTitleText() {
    if (this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
      return ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.TreeConfigId)?.Name;
    }
  }
  lRi(t) {
    this.nRi ||= Vector_1.Vector.DistSquared2D(t, this.WorldPosition);
  }
  _Ri(t) {
    var e;
    var i;
    if (this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && (e = this.TreeConfigId, i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e)) && i.Type === 4 && (this.lRi(t), this.ServerMarkInfo.InstanceDungeonId === ModelManager_1.ModelManager.CreatureModel.GetInstanceId()) && (!this.oRi && this.nRi && this.nRi <= this.iRi && (this.oRi = true, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange, e, this.NodeId, 0)), this.oRi) && this.nRi && this.nRi > this.iRi) {
      this.oRi = false;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange, e, this.NodeId, 1);
    }
  }
  UpdateItemIsInDistance(t) {
    if (this.NodeId === 0) {
      var e = this.MapType === 1 ? BattleUiDefine_1.CLAMP_RANGE : this.rRi;
      if (!e) {
        return;
      }
      this.lRi(t);
      this.CanShowInDistance = !!this.nRi && this.nRi < e * e * 10000;
    }
    this._Ri(t);
    this.nRi = undefined;
  }
  CheckCanShowView() {
    if (this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
      return this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay && this.InstanceDungeonId === HonamiStoryDefine_1.HONAMI_DUNGEON_ID || this.MapType === 1;
    } else {
      return (typeof this.TrackTarget != "number" || !!ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(this.TrackTarget)) && (!!this.CanShowInDistance || !!this.IsTracked);
    }
  }
  IsTracking() {
    var t = this.TreeConfigId;
    var e = this.NodeId;
    let i = false;
    return i = e !== 0 && this.MapType === 2 ? ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(t) : ModelManager_1.ModelManager.TrackModel.IsTracking(this.TrackSource, this.MarkId);
  }
  hRi(t) {
    var e;
    var i;
    if (this.MapType === 1 && this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && this.NodeId === 0 && this.IsCanShowView && !this.aRi) {
      if (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.TreeConfigId)) {
        (i = new LogReportDefine_1.QuestDiscoverLogData()).i_quest_id = this.TreeConfigId;
        i.i_quest_type = e.Type ?? 0;
        i.i_icon_distance = BattleUiDefine_1.CLAMP_RANGE;
        i.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
        i.i_father_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father;
        i.f_pos_x = t.X;
        i.f_pos_y = t.Y;
        i.f_pos_z = t.Z;
        LogReportController_1.LogReportController.LogReport(i);
        this.aRi = true;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LogReport", 18, "发送任务日志时,找不到任务对象", ["questId", this.TreeConfigId]);
      }
    }
  }
  IsBtTypeQuest() {
    return this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest;
  }
  GetInteractiveFlag() {
    return (this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay || this.InstanceDungeonId !== HonamiStoryDefine_1.HONAMI_DUNGEON_ID) && super.GetInteractiveFlag();
  }
}
exports.TaskMarkItem = TaskMarkItem;
//# sourceMappingURL=TaskMarkItem.js.map