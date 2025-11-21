"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMowingRiskController = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const InstanceDungeonEntranceController_1 = require("../../../../InstanceDungeon/InstanceDungeonEntranceController");
const ActivityControllerBase_1 = require("../../../ActivityControllerBase");
const ActivityManager_1 = require("../../../ActivityManager");
const ActivityMowingRiskSubView_1 = require("../View/ActivityMowingRiskSubView");
var Proto_ErrorCode = Protocol_1.Aki.Protocol.Q4n;
var Proto_RiskHarvestInstRewardRequest = Protocol_1.Aki.Protocol.Om_;
var Proto_RiskHarvestScoreRewardRequest = Protocol_1.Aki.Protocol.Gm_;
var Proto_RiskHarvestStarRewardRequest = Protocol_1.Aki.Protocol.uU_;
const UiManager_1 = require("../../../../../Ui/UiManager");
const ItemRewardController_1 = require("../../../../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../../../../ItemReward/ItemRewardDefine");
var Proto_RiskHarvestSettleRequest = Protocol_1.Aki.Protocol.If_;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const RiskHarvestInstById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestInstById");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class ActivityMowingRiskController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Dnh = new CustomPromise_1.CustomPromise();
    this.gVa = e => {
      this.fVa(e);
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestEndNotify(e);
        this.Anh(e);
      }
    };
    this.pVa = e => {
      this.fVa(e);
      ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestInstUpdateNotify(e);
    };
    this.vVa = e => {
      this.fVa(e);
      ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestArtifactNotify(e);
    };
    this.MVa = e => {
      this.fVa(e);
      var t = ModelManager_1.ModelManager.MowingRiskModel;
      t.SyncProtocolRiskHarvestBuffUpdateNotify(e);
      this.Rnh();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MowingRiskInBattleRootUpdate, t.BuildInBattleRootData());
    };
    this.yVa = e => {
      this.fVa(e);
      ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestBuffUnlockNotify(e);
    };
    this.EVa = e => {
      this.fVa(e);
      var t = ModelManager_1.ModelManager.MowingRiskModel;
      t.SyncProtocolRiskHarvestActivityUpdateNotify(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNeedRefreshByProtocol);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, t.ActivityData.Id);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.ActivityData.Id);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot);
    };
    this.uZs = () => {
      if (this.CheckInInstanceDungeon()) {
        this.RequestRiskHarvestSettleRequest();
      }
    };
    this.lZs = () => {};
    this._Zs = () => {
      if (this.CheckInInstanceDungeon()) {
        ModelManager_1.ModelManager.DeadReviveModel.HandleOnClickGiveUpExternal = undefined;
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.IsSettleExternalProcess = false;
        ModelManager_1.ModelManager.MowingRiskModel.ResetCacheInBattle();
      }
    };
    this.yRa = () => {
      if (this.CheckInInstanceDungeon()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MowingRisk", 64, "局内局内局内的起点");
        }
        ModelManager_1.ModelManager.DeadReviveModel.HandleOnClickGiveUpExternal = () => {
          this.RequestRiskHarvestSettleRequest();
        };
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.IsSettleExternalProcess = true;
        this.Dnh.SetResult();
      }
    };
    this.Unh = () => {
      this.Rnh();
    };
  }
  static get Instance() {
    return ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RiskHarvest);
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityMowingRisk";
  }
  OnCreateSubPageComponent(e) {
    return new ActivityMowingRiskSubView_1.ActivityMowingRiskSubView();
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.MowingRiskModel.ActivityData;
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(27546, this.gVa);
    Net_1.Net.Register(26360, this.pVa);
    Net_1.Net.Register(18221, this.vVa);
    Net_1.Net.Register(25546, this.MVa);
    Net_1.Net.Register(27736, this.yVa);
    Net_1.Net.Register(18911, this.EVa);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27546);
    Net_1.Net.UnRegister(26360);
    Net_1.Net.UnRegister(18221);
    Net_1.Net.UnRegister(25546);
    Net_1.Net.UnRegister(27736);
    Net_1.Net.UnRegister(18911);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterInstanceDungeon, this.lZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, this._Zs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm, this.uZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.yRa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MowingRiskOnBuffTipsAfterDestroy, this.Unh);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterInstanceDungeon, this.lZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, this._Zs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm, this.uZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.yRa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MowingRiskOnBuffTipsAfterDestroy, this.Unh);
  }
  GetActivityLevelUnlockState(e) {
    return ModelManager_1.ModelManager.MowingRiskModel.IsInstanceUnlockedByInstanceId(e);
  }
  async RequestRiskHarvestInstRewardRequest(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MowingRisk", 64, "RequestRiskHarvestInstRewardRequest:" + e);
    }
    var t = Proto_RiskHarvestInstRewardRequest.create();
    t.s5n = e;
    var t = await Net_1.Net.CallAsync(22137, t);
    if (t !== undefined) {
      if (t.Q4n !== Proto_ErrorCode.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MowingRisk", 64, "请求失败，关卡奖励：RiskHarvestInstRewardRequest---" + t.Q4n);
        }
        if (t.Q4n === Proto_ErrorCode.Proto_ErrRiskHarvestActivityNotOpen) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MowingRiskActivityNotOpenForReward");
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 24982);
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MowingRisk", 64, `RequestRiskHarvestInstRewardRequest:${e}--Success`);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ModelManager_1.ModelManager.MowingRiskModel.ActivityData.Id);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MowingRiskOnGetReward);
      }
    }
  }
  async RequestRiskHarvestScoreRewardRequest(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MowingRisk", 64, "RequestRiskHarvestScoreRewardRequest:" + e);
    }
    var t = Proto_RiskHarvestScoreRewardRequest.create();
    t.s5n = e;
    var t = await Net_1.Net.CallAsync(16073, t);
    if (t !== undefined) {
      if (t.Q4n !== Proto_ErrorCode.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MowingRisk", 64, "请求失败，积分奖励：RiskHarvestScoreRewardRequest---" + t.Q4n);
        }
        if (t.Q4n === Proto_ErrorCode.Proto_ErrRiskHarvestActivityNotOpen) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MowingRiskActivityNotOpenForReward");
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 20214);
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MowingRisk", 64, `RequestRiskHarvestScoreRewardRequest:${e}--Success`);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ModelManager_1.ModelManager.MowingRiskModel.ActivityData.Id);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MowingRiskOnGetReward);
      }
    }
  }
  async RequestRiskHarvestStarRewardRequest(e, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MowingRisk", 64, "RequestRiskHarvestStarRewardRequest:" + e);
    }
    var o = Proto_RiskHarvestStarRewardRequest.create();
    o.s5n = e;
    o.c5n = t;
    var t = await Net_1.Net.CallAsync(19583, o);
    if (t !== undefined) {
      if (t.Q4n !== Proto_ErrorCode.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MowingRisk", 43, "请求失败，阶段奖励：RequestRiskHarvestStarRewardRequest---" + t.Q4n);
        }
        if (t.Q4n === Proto_ErrorCode.Proto_ErrRiskHarvestActivityNotOpen) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MowingRiskActivityNotOpenForReward");
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 28042);
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MowingRisk", 43, `请求失败，阶段奖励：RequestRiskHarvestStarRewardRequest:${e}--Success`);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ModelManager_1.ModelManager.MowingRiskModel.ActivityData.Id);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MowingRiskOnGetReward);
      }
    }
  }
  async RequestRiskHarvestSettleRequest() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MowingRisk", 64, "请求请求请求结算");
    }
    var e = Proto_RiskHarvestSettleRequest.create();
    var e = await Net_1.Net.CallAsync(27545, e);
    if (e !== undefined) {
      if (e.Q4n !== Proto_ErrorCode.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MowingRisk", 64, "请求失败，退出请求结算：RequestRiskHarvestSettleRequest---" + e.Q4n);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MowingRisk", 64, "请求请求请求结算--Success");
      }
    }
  }
  fVa(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MowingRisk", 64, "割草冒险Notify:" + e.constructor.name, ["msg", e]);
    }
  }
  Rnh() {
    var e;
    var t;
    var o;
    if (!UiManager_1.UiManager.IsViewOpen("MowingBuffNewBuffTipsView") && this.CheckInInstanceDungeon() && (t = (e = ModelManager_1.ModelManager.MowingRiskModel).NextNewBuffId) && (o = e.BuildNewBuffTipsDataById(t), UiManager_1.UiManager.OpenView("MowingBuffNewBuffTipsView", o), e.IsSuperBuffById(t))) {
      this.xnh(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MowingRiskOnNeedPlayLevelUpSequence);
    }
  }
  xnh(e) {
    var t = ModelManager_1.ModelManager.MowingRiskModel.BuildInBattleBuffDataById(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MowingRisk", 64, `显示场内Buff 中心Tips，buff Id：${e}----${t.TitleTextId}`);
    }
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(21, undefined, undefined, undefined, undefined, undefined, undefined, t);
  }
  async Anh(e) {
    await this.Pnh();
    if (RiskHarvestInstById_1.configRiskHarvestInstById.GetConfig(e.s5n).Accumulate) {
      this.TU_(e);
    } else {
      this.bU_(e);
    }
  }
  TU_(e) {
    var t = {
      ButtonTextId: "riskofrain_UIBacktoworld",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true,
      OnClickedCallback: function () {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }
    };
    var o = {
      ButtonTextId: "ConfirmBox_133_ButtonText_1",
      IsTimeDownCloseView: false,
      IsClickedCloseView: false,
      OnClickedCallback: function () {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon();
      },
      DescriptionTextId: undefined
    };
    var i = ModelManager_1.ModelManager.MowingRiskModel.GetMaxScoreById(e.s5n);
    var i = {
      DetailScoreDataList: [{
        DescTextId: "RiskHarvest_Timepoint",
        ScoreText: e.pM_.toString()
      }, {
        DescTextId: "RiskHarvest_Monsterpoint",
        ScoreText: e.aE_.toString()
      }],
      TotalScoreDataList: [{
        DescTextId: "RiskHarvest_Score",
        ScoreText: e.Yma.toString()
      }],
      CurScore: e.fU_,
      MaxScore: i
    };
    var r = e.pM_ > 0 ? undefined : "riskofrain_UIFinish";
    ItemRewardController_1.ItemRewardController.OpenExploreRewardView(e.eE_ ? ItemRewardDefine_1.MOWING_RESULT : ItemRewardDefine_1.MOWING_ERROR_RESULT, e.eE_, undefined, undefined, undefined, [t, o], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, i, r);
  }
  bU_(e) {
    var t = {
      ButtonTextId: "riskofrain_UIBacktoworld",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true,
      OnClickedCallback: function () {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }
    };
    var o = {
      ButtonTextId: "ConfirmBox_133_ButtonText_1",
      DescriptionTextId: "RiskHarvest_HistoryToppoint",
      DescriptionArgs: [ModelManager_1.ModelManager.MowingRiskModel.GetRecordScoreById(e.s5n).toString()],
      IsTimeDownCloseView: false,
      IsClickedCloseView: false,
      OnClickedCallback: function () {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon();
      }
    };
    var i = ModelManager_1.ModelManager.MowingRiskModel.GetMaxScoreById(e.s5n);
    var r = e.Yma;
    var n = e.pM_ > 0 ? undefined : "riskofrain_UIFinish";
    ItemRewardController_1.ItemRewardController.OpenExploreRewardView(e.eE_ ? ItemRewardDefine_1.MOWING_RESULT : ItemRewardDefine_1.MOWING_ERROR_RESULT, e.eE_, undefined, undefined, undefined, [t, o], undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
      TargetReached: [{
        Target: [e.pM_.toString()],
        DescriptionTextId: "RiskHarvest_Timepoint",
        IsReached: true
      }, {
        Target: [e.aE_.toString()],
        DescriptionTextId: "RiskHarvest_Monsterpoint",
        IsReached: true
      }],
      IfNewRecord: false,
      FullScore: r,
      RecordTextId: r < i ? "RiskHarvest_Score" : "RiskHarvest_Scorelimit"
    }, undefined, undefined, n);
  }
  async Pnh() {
    await this.Dnh.Promise;
    this.Dnh = new CustomPromise_1.CustomPromise();
  }
  CheckInInstanceDungeon() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon) !== undefined && e.InstSubType === 22;
  }
  static IsMowingRiskInstanceDungeon(e) {
    return !!e && ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 22;
  }
}
exports.ActivityMowingRiskController = ActivityMowingRiskController;
(_a = ActivityMowingRiskController).GetInstanceSubtitleTextIdByInstanceId = e => ModelManager_1.ModelManager.MowingRiskModel.BuildInstanceSubtitleTextIdByInstanceId(e);
ActivityMowingRiskController.GetInstanceSubtitleArgsByInstanceId = e => ModelManager_1.ModelManager.MowingRiskModel.BuildInstanceSubtitleTextArgsByInstanceId(e);
ActivityMowingRiskController.CheckInstanceFinishedByInstanceId = e => ModelManager_1.ModelManager.MowingRiskModel.CheckInstanceFinishedByInstanceId(e);
ActivityMowingRiskController.CheckInstanceUnlockByInstanceId = e => ModelManager_1.ModelManager.MowingRiskModel.IsInstanceUnlockedByInstanceId(e);
ActivityMowingRiskController.GetInstanceLockTextIdByInstanceId = e => ModelManager_1.ModelManager.MowingRiskModel.GetInstanceLockTextIdByInstanceId(e);
ActivityMowingRiskController.GetInstanceLockTextArgsByInstanceId = e => ModelManager_1.ModelManager.MowingRiskModel.GetLockTextArgsByInstanceId(e);
ActivityMowingRiskController.GetEntranceViewDefaultSelectData = e => {
  let t = 0;
  let o = 0;
  for (var [i, r] of e) {
    t = i;
    for (const n of r) {
      o = n;
      if (!_a.CheckInstanceFinishedByInstanceId(n)) {
        return {
          InstanceId: o,
          SeriesId: t
        };
      }
    }
  }
  return {
    InstanceId: o,
    SeriesId: t
  };
}; //# sourceMappingURL=ActivityMowingRiskController.js.map