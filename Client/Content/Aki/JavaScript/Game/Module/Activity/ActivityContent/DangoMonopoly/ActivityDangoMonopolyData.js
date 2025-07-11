"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDangoMonopolyData = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
const ItemRewardController_1 = require("../../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../../ItemReward/RewardData/RewardItemData");
const NormalLoadingViewGlobalData_1 = require("../../../Loading/Data/NormalLoadingViewGlobalData");
const ActivityData_1 = require("../../ActivityData");
const ActivityManager_1 = require("../../ActivityManager");
const DangoMonopolyBoardData_1 = require("./DangoMonopolyBoardData");
const DangoMonopolyDefine_1 = require("./DangoMonopolyDefine");
const DangoMonopolyGridInfoPanel_1 = require("./DangoMonopolyGridInfoPanel");
const DangoMonopolyTaskData_1 = require("./DangoMonopolyTaskData");
const RollDice_1 = require("./RollDice");
class ActivityDangoMonopolyData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.DiceItemId = ConfigManager_1.ConfigManager.CommonConfig.GetDiceItemId();
    this.DangoMonopolyRangeSpeed = ConfigManager_1.ConfigManager.CommonConfig.GetDangoMonopolyRangeSpeed();
    this.BoardList = [];
    this.BoardMap = new Map();
    this.CurrentBoardData = undefined;
    this.CurrentGridData = undefined;
    this.RunningGridData = undefined;
    this.TargetGridData = undefined;
    this.RewardedGridId = 0;
    this.TaskTypeMap = new Map();
    this.TaskIdMap = new Map();
    this.TaskLookedSet = new Set();
    this.Dango = undefined;
    this.DangoMonopolyInstanceId = 0;
    this.GridToEntityIdMap = new Map();
    this.Speed = 1;
    this.LastEnterBoardId = 0;
    this.MainRoleDangoEntityId = 0;
    this.IsBoardEntityInit = false;
    this.BoardInitPromise = undefined;
    this.IsCanApplySpeed = false;
    this.BoardGridUiInfoMap = new Map();
    this.BoardGridUiInfoPromise = undefined;
    this.ChessPointParamsMap = new Map();
    this.Fa1 = 90;
    this.DangoTipsList = [];
    this.DangoTipsPromise = undefined;
    this.DangoWelcomePromise = undefined;
    this.MoveCameraPromise = undefined;
    this.IsDangoMoveProcess = false;
    this.KismetSettingOutline = undefined;
    this.Na1 = undefined;
  }
  get RollDice() {
    this.Na1 ||= RollDice_1.RollDice.Create({
      DicePoints: [],
      AniNum: 0,
      CameraMode: 1,
      BpDiceCase: "DiceBp"
    });
    return this.Na1;
  }
  GetExDataRedPointShowState() {
    return !!this.IsRedDotDiceTask() || !!this.IsRoundReward() || !!this.IsCanUseDice();
  }
  OnInit(e) {
    this.gVc();
    this.CVc();
    this.pVc();
    this.InitLocalData();
  }
  gVc() {
    var e = this.GetDangoMonopolyInfo();
    if (e) {
      this.DangoMonopolyInstanceId = e.InstId;
    }
  }
  CVc() {
    this.GetDangoMonopolyBoardList().forEach((e, t) => {
      t = DangoMonopolyBoardData_1.DangoMonopolyBoardData.Create(e, t);
      t.SetActivityData(this);
      this.BoardList.push(t);
      this.BoardMap.set(e.BoardId, t);
    });
  }
  pVc() {
    var e = this.GetDangoMonopolyInfo();
    if (e) {
      e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0 ? e.FeMaleDangoId : e.MaleDangoId;
      this.Dango = DangoManager_1.DangoManager.GetDangoData(e);
    }
  }
  GetDangoId() {
    return this.Dango?.Id ?? 0;
  }
  GetMoveDangoId() {
    var e;
    var t = this.GetDangoId();
    if (this.CurrentBoardData && this.RunningGridData && (e = this.RunningGridData.GetPosition(), e = this.CurrentBoardData.GridList.slice(0, e).reverse().find(e => e.IsExistDango()))) {
      return e.Id;
    } else {
      return t;
    }
  }
  PhraseEx(e) {
    e = e.fPc;
    if (e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("DangoMonopoly", 69, "Data PhraseEx", ["", e]);
      }
      this.UpdateRewardGridId(e.p6c);
      this.UpdateCurrentBoard(e.cS_);
      this.CurrentBoardData?.UpdateUnlockTime(e.O11);
      if (!this.IsDangoMoveProcess) {
        this.UpdateCurrentGrid(e.gPc);
      }
      this.AllUpdateTask(e.CJ_);
      this.UpdateTaskEndTime(e.WUc);
      this.UpdateBoardReward(e.CPc);
      for (var [t, i] of Object.entries(e.fv1 ?? [])) {
        var o;
        var a;
        var r = this.BoardMap.get(Number(t));
        r?.UpdateRollDiceTimes(Number(i.B11));
        r?.ClearRecordTriggerBuff();
        for ([o, a] of Object.entries(i.k11 ?? [])) {
          r?.UpdateRecordTriggerBuff(Number(o), Number(a));
        }
        r?.ClearOwnedBuffIdList();
        r?.OwnedBuffIdList.push(...(i.Z3c ?? []));
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateDangoMonopolyNum);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateDangoMonopolyRound);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask);
    }
  }
  IsRedDotDiceTask() {
    return !this.IsFinishAllRound() && (!!this.IsDiceTaskReward() || !!this.IsDiceTaskNewTask());
  }
  IsDiceTaskReward() {
    for (var [, e] of this.TaskIdMap) {
      if (e.TaskState === Protocol_1.Aki.Protocol.IPc.Proto_Completed) {
        return true;
      }
    }
    return false;
  }
  IsDiceTaskNewTask() {
    return this.TaskIdMap.size > this.TaskLookedSet.size;
  }
  IsCanUseDice() {
    return !this.IsRunningBoardLock() && !this.IsFinishAllRound() && this.IsDiceNum();
  }
  IsDiceNum() {
    return this.GetDiceNum() > 0;
  }
  IsRunningBoardLock() {
    return !!this.CurrentBoardData?.IsLock();
  }
  GetBoardUnlockRemainTime() {
    return this.CurrentBoardData?.GetUnlockRemainTime() ?? 0;
  }
  IsRoundReward() {
    return this.BoardList.some(e => e.IsCanReceiveReward());
  }
  IsAllGetRoundReward() {
    return this.BoardList.every(e => e.IsRewarded);
  }
  IsExistGridReward() {
    return this.RewardedGridId < this.GetCurrentGridId();
  }
  UpdateRewardGridId(e) {
    this.RewardedGridId = e;
  }
  GetDiceNum() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.DiceItemId);
  }
  GetDangoMonopolyInfo() {
    return ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.GetInfo(this.Id);
  }
  GetDangoMonopolyBoardList() {
    var e = this.GetDangoMonopolyInfo()?.BoardGroupId;
    if (e) {
      return ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetBoardList(e);
    } else {
      return [];
    }
  }
  UpdateCurrentBoard(e) {
    this.CurrentBoardData = this.BoardMap.get(e);
  }
  UpdateCurrentGrid(e) {
    this.CurrentGridData = this.CurrentBoardData?.GridMap.get(e);
    this.UpdateRunningGrid(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "更新当前格子", ["id", e], ["position", this.CurrentGridData?.GetPosition()]);
    }
  }
  UpdateRunningGrid(e) {
    this.RunningGridData = this.CurrentBoardData?.GridMap.get(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "更新进行中格子", ["id", e], ["position", this.RunningGridData?.GetPosition()]);
    }
  }
  UpdateTargetGrid(e) {
    this.TargetGridData = this.CurrentBoardData?.GridMap.get(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "更新目标格子", ["id", e], ["position", this.TargetGridData?.GetPosition()]);
    }
  }
  async MoveDangoEnd() {
    this.UpdateCurrentGrid(this.TargetGridData?.Id ?? 0);
    await this.RequestReceiveGrid();
    this.IsCanApplySpeed = false;
    this.SetIsDangoMoveProcess(false);
    ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.SetPushHintState(false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyMoveEnd);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyMoveStepStartOrEnd, false);
  }
  GetTotalRoundNum() {
    return this.BoardList.length;
  }
  GetFinishedRoundNum() {
    return this.BoardList.filter(e => e.IsFinish()).length;
  }
  IsFinishAllRound() {
    return this.GetFinishedRoundNum() >= this.GetTotalRoundNum();
  }
  GetCurrentBoardPosition() {
    return this.CurrentBoardData?.GetPosition() ?? 0;
  }
  GetCurrentGridPosition() {
    return this.CurrentGridData?.GetPosition() ?? 0;
  }
  GetCurrentGridId() {
    return this.CurrentGridData?.Id ?? 0;
  }
  GetRunningGridId() {
    return this.RunningGridData?.Id ?? 0;
  }
  UU_() {
    return ActivityManager_1.ActivityManager.GetActivityController(this.Type);
  }
  AllUpdateTask(e) {
    this.TaskIdMap.forEach(e => {
      e.Recycle();
    });
    this.TaskIdMap.clear();
    this.TaskTypeMap.clear();
    e.forEach(e => {
      this.CreateTaskData(e.gps)?.ProtoUpdateData(e);
    });
    this.SortTaskList();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyTaskUpdate, 0);
  }
  CreateTaskData(e) {
    if (this.TaskIdMap.has(e)) {
      return this.TaskIdMap.get(e);
    } else if (e = ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.GetTask(e)) {
      e = DangoMonopolyTaskData_1.DangoMonopolyTaskData.Create(e);
      if (this.TaskTypeMap.has(e.TaskType)) {
        this.TaskTypeMap.get(e.TaskType).push(e);
      } else {
        this.TaskTypeMap.set(e.TaskType, [e]);
      }
      this.TaskIdMap.set(e.Id, e);
      return e;
    } else {
      return undefined;
    }
  }
  SortTaskList() {
    this.TaskTypeMap.forEach(e => {
      e.sort((e, t) => e.GetSortResult(t));
    });
  }
  UpdateTask(e) {
    e.forEach(e => {
      this.TaskIdMap.get(e.gps)?.ProtoUpdateData(e);
    });
    this.SortTaskList();
  }
  UpdateTaskEndTime(e) {
    for (var [t, i] of Object.entries(e)) {
      t = this.TaskTypeMap.get(Number(t));
      const o = MathUtils_1.MathUtils.LongToNumber(i);
      if (t) {
        t.forEach(e => {
          e.SetEndTime(o);
        });
      }
    }
  }
  UpdateBoardReward(e) {
    e.forEach(e => {
      this.BoardMap.get(e)?.SetRewarded(true);
    });
  }
  ProtoDiceResponse(e) {
    this.IsCanApplySpeed = true;
    this.ApplySpeed();
    var t;
    var i = e.Mqc?.Eqc ?? 0;
    var [o, a, r] = this.GetMoveStepByData(e.Mqc, e.Sqc);
    var a = this.CurrentBoardData?.InitStartMoveDango(a) ?? 0;
    if (this.BuffIsWhenMoveFire(i) && this.CurrentGridData && (t = this.CurrentGridData.Index + r, t = this.CurrentBoardData?.GridList[t])) {
      t.UpdateMoveFinishBuffId(i);
    }
    this.CurrentBoardData?.AddRecordTriggerBuff(i);
    this.CurrentBoardData?.AddRollDiceTimes();
    UiManager_1.UiManager.OpenView("DangoMonopolyRollDiceView", {
      BoardId: this.CurrentBoardData.Id,
      DiceResult: r,
      TriggerBuffId: i,
      TriggerBuffResult: o
    });
    if (a !== e.q11 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("DangoMonopoly", 69, "掷骰子结果不一致", ["client", a], ["server", e.q11], ["response", e]);
    }
  }
  GetMoveStepByData(e, t = 0) {
    var i = e?.Mqc;
    if (!i?.length) {
      return [0, t, t];
    }
    var e = e.Eqc;
    var o = ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.GetProperty(e);
    if (!o) {
      return [0, t, t];
    }
    var o = o.PropertyInfo[0];
    var a = i[0] ?? 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "投掷结果特性", ["Id", e], ["Type", o]);
    }
    switch (o) {
      case 4:
        return [a, a, t];
      case 6:
        return [t * Math.max(0, a - 1), t * a, t];
      case 5:
      case 7:
        return [0, a, a];
      default:
        return [a, t + a, t];
    }
  }
  ProtoTaskUpdateNotify(e) {
    this.UpdateTask(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask);
    this.UU_().RefreshActivityRedDot();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyTaskUpdate, 0);
  }
  ProtoTaskAddNotify(e) {
    e.forEach(e => {
      this.CreateTaskData(e.gps)?.ProtoUpdateData(e);
    });
    this.SortTaskList();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask);
    this.UU_().RefreshActivityRedDot();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyTaskUpdate, 1);
  }
  ProtoTaskRemoveNotify(e) {
    e.forEach(t => {
      var e;
      var i;
      var o = this.TaskIdMap.get(t);
      if (o) {
        this.TaskIdMap.delete(t);
        this.TaskLookedSet.delete(t);
        if ((i = (e = this.TaskTypeMap.get(o.TaskType))?.findIndex(e => e.Id === t)) !== undefined && i !== -1 && !(e.splice(i, 1), e.length)) {
          this.TaskTypeMap.delete(o.TaskType);
        }
      }
    });
    this.SortTaskList();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask);
    this.UU_().RefreshActivityRedDot();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyTaskUpdate, 2);
  }
  ProtoSceneGridInfoNotify(e) {
    this.GridToEntityIdMap.clear();
    this.MainRoleDangoEntityId = MathUtils_1.MathUtils.LongToNumber(e.y6c);
    var t;
    var i;
    var e = e.wBc;
    for ([t, i] of Object.entries(e)) {
      var o = Number(t);
      var a = MathUtils_1.MathUtils.LongToNumber(i);
      this.GridToEntityIdMap.set(o, a);
    }
    this.InitBoardEntity();
  }
  async InitBoardEntity() {
    this.IsBoardEntityInit = false;
    await this.BoardInitPromise?.Promise;
    this.BoardInitPromise = new CustomPromise_1.CustomPromise();
    const e = new CustomPromise_1.CustomPromise();
    var t = ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetBattleConfigPath();
    ControllerHolder_1.ControllerHolder.DangoGlobalController.InitGlobalConfig(t, () => {
      e.SetResult();
    });
    await e.Promise;
    var t = this.GetBoardDangoChessList();
    const i = [];
    this.ChessPointParamsMap.clear();
    ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetGridPoint(this.Id).forEach(e => {
      var t = this.GetChessBoardPointParams(e);
      i.push(t);
      this.ChessPointParamsMap.set(e.Id, t);
    });
    await ControllerHolder_1.ControllerHolder.ChessController.InitChessGameAsync(i, t, this.CurrentBoardData.GetEndGridId());
    await NormalLoadingViewGlobalData_1.NormalLoadingViewGlobalData.FinishPromise?.Promise;
    await this.InitBoardGridUiInfoMap();
    this.BoardInitPromise?.SetResult();
    this.BoardInitPromise = undefined;
    this.IsBoardEntityInit = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyEnterNextRound);
  }
  async DelayUpdateCameraMove() {
    await TimerSystem_1.GameplayTimerSystem.Wait(TimerSystem_1.MIN_TIME);
    if (!this.IsShowRoundWelcome(false)) {
      this.LookAtDango();
    }
  }
  GetBoardDangoChessList() {
    const t = [];
    this.CurrentBoardData?.GridList.filter(e => e.IsExistDango())?.reverse()?.forEach(e => {
      e = {
        Id: e.Id,
        CreatureDataId: this.GridToEntityIdMap.get(e.Id) ?? 0,
        InitPointId: e.GetDangoRunningGridId()
      };
      t.push(e);
    });
    var e = this.GetDangoId();
    var i = this.MainRoleDangoEntityId;
    t.push({
      Id: e,
      CreatureDataId: i,
      InitPointId: this.GetRunningGridId()
    });
    return t;
  }
  GetChessBoardPointParams(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e.EntityId)?.Transform;
    var i = t?.Pos.X ?? 0;
    var o = t?.Pos.Y ?? 0;
    var a = t?.Pos.Z ?? 0;
    var r = t?.Rot?.Y ?? 0;
    var s = t?.Rot?.Z ?? 0;
    var t = t?.Rot?.X ?? 0;
    return {
      Id: e.Id,
      Location: Vector_1.Vector.Create(i, o, a),
      Rotation: Rotator_1.Rotator.Create(r, s, t),
      SortIndex: e.SortId
    };
  }
  async InitBoardGridUiInfoMap() {
    await this.BoardGridUiInfoPromise;
    this.ClearBoardGridUiInfoMap();
    var e = this.CurrentBoardData?.GridList;
    if (e) {
      e = e.filter(e => e.IsExistItem());
      const i = [];
      e.forEach(e => {
        var t = new DangoMonopolyGridInfoPanel_1.DangoMonopolyGridInfoPanel();
        i.push(t.Init(e, this));
        this.BoardGridUiInfoMap.set(e.Id, t);
      });
      this.BoardGridUiInfoPromise = Promise.all(i);
      (await this.BoardGridUiInfoPromise).forEach(e => {
        e.UpdateHeight();
      });
      this.BoardGridUiInfoPromise = undefined;
    }
  }
  async UpdateBoardGridUiInfoShow(t) {
    await this.BoardGridUiInfoPromise;
    this.BoardGridUiInfoMap.forEach(e => {
      e.SetActive(t);
    });
  }
  GetGridEntityInfoAddHeight(e, t) {
    if (this.GetRunningGridId() === e && (e = this.GetMainRoleDangoHeight()) > 0) {
      return e;
    } else {
      return this.Fa1 + t;
    }
  }
  GetMainRoleDangoHeight() {
    var e;
    var t = this.MainRoleDangoEntityId;
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (t?.Valid && t.IsInit && t.Entity) {
      e = (t = t.Entity.GetComponent(1)?.SkeletalMesh?.Bounds)?.BoxExtent.Z ?? 0;
      return (t?.Origin.Z ?? 0) + e * 2;
    } else {
      return 0;
    }
  }
  ClearBoardGridUiInfoMap() {
    this.BoardGridUiInfoMap.forEach(e => {
      e.Destroy();
    });
    this.BoardGridUiInfoMap.clear();
  }
  LookAtDango(e, t = 0) {
    var i;
    var o = ModelManager_1.ModelManager.DangoGlobalModel.Config;
    if (o && ModelManager_1.ModelManager.CameraModel.CameraMode === 5 && (e = e ?? this.GetMoveDangoId(), e = this.GridToEntityIdMap.get(e) ?? this.MainRoleDangoEntityId, (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e))?.Valid) && e.IsInit && e.Entity && (e = e.Entity.GetComponent(2)?.ActorLocationProxy) && (i = ControllerHolder_1.ControllerHolder.CameraController.FreeCamera.DisplayComponent.CameraActor)?.IsValid()) {
      Vector_1.Vector.Create().FromUeVector(i.D_K2_GetActorLocation());
      i = o.BeforeMoveCameraArmLength;
      ControllerHolder_1.ControllerHolder.CameraController.FreeCamera.LogicComponent.ApplyCameraBlend(e, undefined, i, t, o.BeforeMoveCameraCurve, o.BeforeMoveCameraFov, undefined);
    }
  }
  SetIsDangoMoveProcess(e) {
    this.IsDangoMoveProcess = e;
  }
  RequestUseDice() {
    return !!this.IsCanUseDice() && (this.SetIsDangoMoveProcess(true), ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.SetPushHintState(true), this.UU_().RequestDice(), true);
  }
  RequestReceiveTask(e, t = false) {
    var i = this.TaskIdMap.get(e);
    if (i?.IsCanReceive()) {
      const o = [];
      if (t) {
        this.TaskTypeMap.get(i.TaskType)?.filter(e => e.IsCanReceive()).forEach(e => o.push(e.Id));
      } else {
        o.push(e);
      }
      this.UU_().RequestReceiveTaskReward(o);
    }
  }
  RequestReceiveBoard(e, t = false) {
    const i = [];
    if (t) {
      this.BoardList.filter(e => e.IsCanReceiveReward()).forEach(e => i.push(e.Id));
    } else {
      i.push(e);
    }
    this.UU_().RequestReceiveBoardReward(i);
  }
  ProtoReceiveBoardRewardResponse(e) {
    this.UpdateBoardReward(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyBoardRewardUpdate);
  }
  async RequestReceiveGrid() {
    await this.UU_().RequestReceiveGridReward();
  }
  ProtoReceiveGridRewardResponse() {
    this.UpdateRewardGridId(this.GetCurrentGridId());
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyGridRewardUpdate);
  }
  RequestEnterDangoMonopoly() {
    var e = Protocol_1.Aki.Protocol.nBc.create();
    e.w6n = this.Id;
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.nBc = e;
    var e = this.DangoMonopolyInstanceId;
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleSystemRoleList().slice(0, 3);
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(e, t, 0, 0);
  }
  async CheckEnterNextRound() {
    return !!this.CurrentBoardData?.IsFinish() && !this.IsFinishAllRound() && (await this.RequestEnterNextRound(), true);
  }
  async RequestEnterNextRound() {
    ModelManager_1.ModelManager.ChessModel.ClearAll();
    await this.UU_().RequestEnterNextBoard();
  }
  ProtoEnterNextBoardResponse(e) {
    this.UpdateCurrentBoard(e.cS_);
    this.CurrentBoardData?.UpdateUnlockTime(e.O11);
    e = this.CurrentBoardData?.GetStartGridId() ?? 0;
    this.UpdateCurrentGrid(e);
    this.UpdateRewardGridId(0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateDangoMonopolyNum);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateDangoMonopolyRound);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask);
  }
  OpenViewDiceTask() {
    UiManager_1.UiManager.OpenView("DangoMonopolyTaskView", {
      TaskList: this.vVc()
    });
  }
  OpenViewDangoMonopolyMain() {
    UiManager_1.UiManager.OpenView("DangoMonopolyMainView");
  }
  OpenViewDangoMonopolyTransition(e) {
    UiManager_1.UiManager.OpenView("DangoMonopolyTransitionView", {
      TransitionCallback: e
    });
  }
  OpenViewDangoTips(e, t = 0) {
    var i = ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.GetProperty(e);
    var o = i?.Title ?? e.toString();
    var o = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(o, o);
    var a = DangoMonopolyDefine_1.dangoMonopolyTextKey.DangoMonopolyBuffTips;
    var a = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(a, o);
    var o = (this.BoardMap.get(t) ?? this.CurrentBoardData)?.GetDangoIdByBuffId(e) ?? 0;
    var o = DangoManager_1.DangoManager.GetDangoData(o)?.IconAttack;
    this.CheckOpenDangoTips({
      Text: a,
      Icon: o
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "添加展示特性", ["Id", e], ["Type", i?.PropertyInfo[0]], ["BoardId", t]);
    }
  }
  async CheckOpenDangoTips(e) {
    this.DangoTipsList.push(e);
    await this.DangoTipsPromise?.Promise;
    if (!UiManager_1.UiManager.IsViewOpen("DangoMonopolyTipsView")) {
      this.DangoTipsPromise = new CustomPromise_1.CustomPromise();
      UiManager_1.UiManager.OpenView("DangoMonopolyTipsView", {
        TipsTextList: this.DangoTipsList,
        ShowTime: DangoMonopolyDefine_1.DANGO_MONOPOLY_TIPS_SHOW_TIME
      }, () => {
        this.DangoTipsPromise?.SetResult();
      });
      await this.DangoTipsPromise?.Promise;
      this.DangoTipsPromise = undefined;
    }
  }
  yVc(e) {
    switch (e) {
      case 0:
        return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(DangoMonopolyDefine_1.dangoMonopolyTextKey.DailyTask, DangoMonopolyDefine_1.dangoMonopolyTextKey.DailyTask);
      case 1:
        return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(DangoMonopolyDefine_1.dangoMonopolyTextKey.WeeklyTask, DangoMonopolyDefine_1.dangoMonopolyTextKey.WeeklyTask);
      default:
        return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(DangoMonopolyDefine_1.dangoMonopolyTextKey.OnceTask, DangoMonopolyDefine_1.dangoMonopolyTextKey.OnceTask);
    }
  }
  vVc() {
    var e;
    var t;
    var i = [];
    for ([e, t] of this.TaskTypeMap) {
      i.push({
        TaskType: e,
        TaskList: t,
        TaskTypeName: this.yVc(e),
        EndTime: t[0]?.EndTime ?? 0
      });
    }
    return i;
  }
  ln1(e) {
    UE.GameplayStatics.SetGlobalTimeDilation(GlobalData_1.GlobalData.World, e ?? this.Speed);
  }
  ResetSpeed() {
    this.ln1(1);
  }
  ApplySpeed() {
    return !!this.IsCanApplySpeed && (this.ln1(), true);
  }
  SetActivitySpeed(e) {
    e = e ? this.SVc(e) : this.MVc();
    this.Speed = e;
    this.ApplySpeed();
  }
  SaveSpeedToLocal(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolySpeed, e ?? this.Speed);
  }
  SaveLastEnterBoardIdToLocal(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolyLastEnterBoard, e ?? this.LastEnterBoardId);
  }
  ReadLocalSpeed() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolySpeed) ?? 1;
  }
  ReadLocalLastEnterBoardId() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolyLastEnterBoard) ?? 0;
  }
  InitLocalData() {
    if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolyActivityId) !== this.Id) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolyActivityId, this.Id);
      this.Speed = 1;
      this.LastEnterBoardId = 0;
      this.SaveSpeedToLocal(this.Speed);
      this.SaveLastEnterBoardIdToLocal(this.LastEnterBoardId);
      this.SaveNewTaskToLocal();
    } else {
      this.Speed = this.ReadLocalSpeed();
      this.LastEnterBoardId = this.ReadLocalLastEnterBoardId();
      this.ReadNewTaskFromLocal();
    }
  }
  SaveLocalData() {
    this.SaveSpeedToLocal();
    this.SaveLastEnterBoardIdToLocal();
  }
  SaveNewTaskToLocal() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolyNewTask, this.TaskLookedSet);
  }
  ReadNewTaskFromLocal() {
    this.TaskLookedSet = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolyNewTask) ?? new Set();
  }
  AddNewTaskIdList(e) {
    e = e.filter(e => !this.TaskLookedSet.has(e));
    if (e.length <= 0) {
      return false;
    }
    for (const t of e) {
      this.TaskLookedSet.add(t);
    }
    this.SaveNewTaskToLocal();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask);
    this.UU_().RefreshActivityRedDot();
    return true;
  }
  SVc(t) {
    return this.DangoMonopolyRangeSpeed.find(e => e === t) ?? 1;
  }
  MVc() {
    var e = this.DangoMonopolyRangeSpeed.findIndex(e => e === this.Speed);
    if (e === -1) {
      return 1;
    } else if (e + 1 >= this.DangoMonopolyRangeSpeed.length) {
      return this.DangoMonopolyRangeSpeed[0];
    } else {
      return this.DangoMonopolyRangeSpeed[e + 1];
    }
  }
  GetSumGridProgress() {
    const t = {
      Finish: 0,
      Total: 0
    };
    this.BoardList.forEach(e => {
      t.Finish += e.GetFinishGridNum();
      t.Total += e.GridList.length;
    });
    return t.Finish / t.Total;
  }
  GetSpeedStr() {
    return "X" + this.Speed.toFixed(1);
  }
  async CheckShowRoundWelcomeProcess() {
    return !!this.IsShowRoundWelcome() && (await this.ShowRoundWelcomeProcess(), true);
  }
  async ShowRoundWelcomeProcess() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyStartShowProcess);
    ControllerHolder_1.ControllerHolder.CameraController.FreeCamera?.LogicComponent?.ResetToInit();
    await this.ShowRoundWelcome();
    AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_spl_rsnt_weapon_cam_in");
    await this.MoveCameraToMainDango();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyEndShowProcess);
  }
  IsShowRoundWelcome(e = true) {
    return !(this.GetCurrentGridPosition() > 1) && this.LastEnterBoardId !== this.CurrentBoardData.Id && !(e && (this.LastEnterBoardId = this.CurrentBoardData.Id), 0);
  }
  async ShowRoundWelcome() {
    await this.DangoWelcomePromise?.Promise;
    var e = this.CurrentBoardData.Id;
    var t = DangoMonopolyDefine_1.dangoMonopolyTextKey.DangoMonopolyRoundSum;
    var i = this.GetCurrentBoardPosition();
    var t = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(t, i.toString());
    this.DangoWelcomePromise = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.OpenView("DangoMonopolyRoundShowView", {
      BoardId: e,
      TipsText: t,
      ShowTime: 5000,
      Promise: this.DangoWelcomePromise
    });
    await this.DangoWelcomePromise?.Promise;
  }
  async MoveCameraToMainDango() {
    await this.MoveCameraPromise?.Promise;
    var e = this.GetMoveDangoId();
    var e = this.GridToEntityIdMap.get(e) ?? this.MainRoleDangoEntityId;
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(e)?.Entity?.GetComponent(1)?.ActorLocationProxy;
    if (e) {
      UiLayer_1.UiLayer.SetShowNormalMaskLayer(true);
      this.MoveCameraPromise = new CustomPromise_1.CustomPromise();
      ControllerHolder_1.ControllerHolder.DangoGlobalController.ApplyDangoBeforeMoveCamera(e, () => {
        this.MoveCameraPromise?.SetResult();
      });
      await this.MoveCameraPromise?.Promise;
      this.MoveCameraPromise = undefined;
      UiLayer_1.UiLayer.SetShowNormalMaskLayer(false);
    }
  }
  async MoveCameraToOverview() {
    var e;
    var t = ModelManager_1.ModelManager.DangoGlobalModel.Config;
    if (t) {
      await this.MoveCameraPromise?.Promise;
      this.MoveCameraPromise = new CustomPromise_1.CustomPromise();
      e = t.BeforeMoveCameraBlendTimeFar;
      t = t.BeforeMoveCameraCurve;
      UiLayer_1.UiLayer.SetShowNormalMaskLayer(true);
      ControllerHolder_1.ControllerHolder.CameraController.FreeCamera?.LogicComponent?.ResetToInit(e, t, () => {
        this.MoveCameraPromise?.SetResult();
      });
      await this.MoveCameraPromise.Promise;
      this.MoveCameraPromise = undefined;
      UiLayer_1.UiLayer.SetShowNormalMaskLayer(false);
    }
  }
  GetBuffShowType(e) {
    if (e <= 0) {
      return 0;
    }
    var t = ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.GetProperty(e);
    var e = t?.PropertyInfo[0];
    if (!e) {
      return 0;
    }
    switch (e) {
      case 3:
        return t?.PropertyInfo[4] ?? 1;
      case 7:
      case 5:
        return 0;
      case 2:
        return 2;
    }
    return 1;
  }
  BuffIsWhenMoveFire(e) {
    return this.GetBuffShowType(e) === 2;
  }
  BuffIsAfterRollDiceFire(e) {
    return this.GetBuffShowType(e) === 1;
  }
  BuffIsImplicit(e) {
    return this.GetBuffShowType(e) === 0;
  }
  GetItemShowList(e) {
    var t = [];
    const i = new Map();
    const o = new Map();
    e.forEach(e => {
      if (e.IsDouble) {
        if (i.has(e.Id)) {
          i.get(e.Id).Count += e.Num;
        } else {
          i.set(e.Id, new RewardItemData_1.RewardItemData(e.Id, e.Num, e.UniqueId, 2));
        }
      }
      if (o.has(e.Id)) {
        o.get(e.Id).Count += e.Num;
      } else {
        o.set(e.Id, new RewardItemData_1.RewardItemData(e.Id, e.Num, e.UniqueId));
      }
    });
    t.push(...i.values(), ...o.values());
    t.sort((e, t) => {
      var i = e.GetDropItemType();
      var o = t.GetDropItemType();
      if (i !== o) {
        return o - i;
      } else {
        return e.ConfigId - t.ConfigId;
      }
    });
    return t;
  }
  ProtoRewardNotify(e) {
    var t = e.x9n;
    if (ControllerHolder_1.ControllerHolder.ItemRewardController.GetRewardViewReasonArray().includes(t)) {
      e = e.Jp1.map(e => ({
        Id: e.L8n,
        Num: e.UVn,
        IsDouble: e.zp1 > 1,
        UniqueId: 0
      }));
      e = this.GetItemShowList(e);
      t = ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(t)?.RewardViewId ?? 0;
      ItemRewardController_1.ItemRewardController.OpenCommonRewardView(t, e);
    }
  }
  IsInTheDungeon() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 35;
  }
  GetBoardRemainTimeStr() {
    var e = DangoMonopolyDefine_1.dangoMonopolyTextKey.DangoMonopolyBoardLockTips;
    var t = this.GetBoardUnlockRemainTime();
    var t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(t);
    return ConfigManager_1.ConfigManager.TextConfig.GetMultiText(e, t.CountDownText);
  }
  RecordKismetSetting() {
    this.KismetSettingOutline = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.NGX.DLSS.Enable");
    if (this.KismetSettingOutline !== 0) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.NGX.DLSS.Enable 0");
    }
  }
  ResetKismetSetting() {
    if (this.KismetSettingOutline) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.NGX.DLSS.Enable " + this.KismetSettingOutline);
    }
  }
  GameplayExit() {
    this.ResetSpeed();
    this.ClearBoardGridUiInfoMap();
    this.SaveLocalData();
    this.ResetKismetSetting();
    this.BoardInitPromise?.SetResult();
    this.DangoTipsPromise?.SetResult();
    this.DangoWelcomePromise?.SetResult();
    this.MoveCameraPromise?.SetResult();
    this.IsCanApplySpeed = false;
    if (this.IsDangoMoveProcess) {
      this.SetIsDangoMoveProcess(false);
      this.UpdateCurrentGrid(this.TargetGridData?.Id ?? 0);
    }
  }
}
exports.ActivityDangoMonopolyData = ActivityDangoMonopolyData;
//# sourceMappingURL=ActivityDangoMonopolyData.js.map