"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestNewController = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  VideoUpdateManager_1 = require("../../../../Launcher/Update/VideoUpdateManager"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SceneEffectStateManager_1 = require("../../../Render/Effect/PostProcess/SceneEffectStateManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ControllerWithAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase"),
  LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
  LogReportDefine_1 = require("../../LogReport/LogReportDefine"),
  MapDefine_1 = require("../../Map/MapDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  DailyQuestAssistant_1 = require("./DailyQuestAssistant"),
  GuideEffectAssistant_1 = require("./GuideEffectAssistant"),
  GuideLineAssistant_1 = require("./GuideLineAssistant"),
  QuestTrackAssistant_1 = require("./QuestTrackAssistant"),
  TIPS_NAME = "QuestRangeFailWarning",
  assistantMap = {
    [0]: void 0,
    1: void 0,
    2: void 0,
    3: void 0
  };
class QuestNewController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnRegisterNetEvent() {
    super.OnRegisterNetEvent(), Net_1.Net.Register(28526, QuestNewController.wro), Net_1.Net.Register(15917, QuestNewController.Bro), Net_1.Net.Register(20280, QuestNewController.bro), Net_1.Net.Register(19865, QuestNewController.qro), Net_1.Net.Register(17434, QuestNewController.Gro), Net_1.Net.Register(27199, QuestNewController.Nro), Net_1.Net.Register(22231, QuestNewController.kka), Net_1.Net.Register(28177, QuestNewController.Nka), Net_1.Net.Register(21224, QuestNewController.mgl), Net_1.Net.Register(27755, QuestNewController.oF1), Net_1.Net.Register(24439, QuestNewController.U91), Net_1.Net.Register(28837, QuestNewController.B91), Net_1.Net.Register(15969, QuestNewController.g_u), Net_1.Net.Register(27438, QuestNewController.Tmu), Net_1.Net.Register(26331, QuestNewController.Dfu)
  }
  static OnUnRegisterNetEvent() {
    super.OnUnRegisterNetEvent(), Net_1.Net.UnRegister(28526), Net_1.Net.UnRegister(15917), Net_1.Net.UnRegister(20280), Net_1.Net.UnRegister(19865), Net_1.Net.UnRegister(17434), Net_1.Net.UnRegister(22231), Net_1.Net.UnRegister(28177), Net_1.Net.UnRegister(21224), Net_1.Net.UnRegister(27755), Net_1.Net.UnRegister(24439), Net_1.Net.UnRegister(28837), Net_1.Net.UnRegister(15969), Net_1.Net.UnRegister(27438), Net_1.Net.UnRegister(26331)
  }
  static OnInit() {
    return this.InitTickOptimize(30, -1), super.OnInit()
  }
  static OnAddEvents() {
    super.OnAddEvents(), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeWakeUp, QuestNewController.Oro), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeArea, this.kro), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.kro), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.Yht), UiManager_1.UiManager.AddOpenViewCheckFunction("QuestView", QuestNewController.iVe, "QuestNewController.CanOpenView"), VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).SetDownloadFinishCallBack(QuestNewController.nF1), VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).SetDownloadFinishCallBack(QuestNewController.nF1)
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeWakeUp, QuestNewController.Oro), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeArea, this.kro), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.kro), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.Yht), UiManager_1.UiManager.RemoveOpenViewCheckFunction("QuestView", QuestNewController.iVe), super.OnRemoveEvents()
  }
  static OnTick(e) {
    var t;
    ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp && (QuestNewController.cYt(0)?.Tick(e), QuestNewController.cYt(2)?.UpdateQuestGuideEffect(e), this.v6a && (this.M6a += e, t = MathUtils_1.MathUtils.SafeDivide(this.Dih - this.M6a, this.Dih), t = MathUtils_1.MathUtils.Clamp(t, 0, 1), SceneEffectStateManager_1.default.SetSceneEffectState(0, t), this.M6a > this.Dih) && (SceneEffectStateManager_1.default.SetSceneEffectState(0, 0), this.v6a = !1), this.S6a && (this.E6a += e, t = MathUtils_1.MathUtils.SafeDivide(this.E6a, this.Dih), t = MathUtils_1.MathUtils.Clamp(t, 0, 1), SceneEffectStateManager_1.default.SetSceneEffectState(0, t), this.E6a > this.Dih) && (SceneEffectStateManager_1.default.SetSceneEffectState(0, 1), this.S6a = !1), this.Rih) && (this.Uih += e, t = CommonParamById_1.configCommonParamById.GetIntConfig("CloseQuestRangeFailWarningTime") ?? 3e4, this.Uih > t) && this.HideCancelRangeFailWaringEffect()
  }
  static RegisterAssistant() {
    this.AddAssistant(0, new GuideLineAssistant_1.GuideLineAssistant(Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest)), this.AddAssistant(1, new QuestTrackAssistant_1.QuestTrackAssistant), this.AddAssistant(2, new GuideEffectAssistant_1.GuideEffectAssistant), this.AddAssistant(3, new DailyQuestAssistant_1.DailyQuestAssistant)
  }
  static cYt(e) {
    if (this.Assistants) return this.Assistants.get(e)
  }
  static AddQuestTraceEffect(e, t, o) {
    QuestNewController.cYt(2).AddQuestTraceEffect(e, t, o)
  }
  static RemoveQuestTraceEffect(e, t) {
    QuestNewController.cYt(2).RemoveQuestTraceEffect(e, t)
  }
  static ClearQuestTraceEffect(e) {
    QuestNewController.cYt(2).ClearQuestTraceEffect(e)
  }
  static Fro() {
    let e = 0;
    var t = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
    return e = t && (t = ModelManager_1.ModelManager.MapModel.GetMark(t.MarkType, t.MarkId)) instanceof MapDefine_1.QuestMarkCreateInfo ? t.TreeId : e
  }
  static RequestTrackQuest(e, t, o, r = 0, a) {
    return QuestNewController.cYt(1).RequestTrackQuest(e, t, o, r, a)
  }
  static TryTrackAndOpenWorldMap(t) {
    var e = () => {
      var e = {
        MarkId: ModelManager_1.ModelManager.QuestNewModel?.TryGetMapMarkIdByQuestId(t),
        MarkType: 12,
        OpenFogId: 0
      };
      ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, !1, e)
    };
    ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(t) ? e() : QuestNewController.RequestTrackQuest(t, !0, 2, 0, e)
  }
  static TryChangeTrackedQuest(e) {
    return QuestNewController.cYt(1).TryChangeTrackedQuest(e)
  }
  static TryChangeTrackedQuest2(e) {
    return QuestNewController.cYt(1).TryChangeTrackedQuest2(e)
  }
  static RedDotRequest(t, o) {
    var e = Protocol_1.Aki.Protocol.O1s.create({
      B5n: t,
      gHn: o
    });
    Net_1.Net.Call(26654, e, e => {
      e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 15106), ModelManager_1.ModelManager.QuestNewModel.SetQuestRedDot(t, 1 === o)
    })
  }
  static IsTrackPositionOutFailRange(e) {
    var t = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
    return !(!t || void 0 === t.TreeId || !(t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t.TreeId)) || !(t = t.GetProcessingFailedNode()) || t.NeedRequiresSecondConfirmation) && t?.IsOutFailRange(e)
  }
  static SetVideoResourceDownloadTriggerId(e) {
    this.N_u = e
  }
  static SetIsReportDownloadNotEnoughSpace(e) {
    this.V_u = e
  }
  static ConfirmQuestResourceRequest(t, o) {
    var e = Protocol_1.Aki.Protocol.Ds1.create({
      a2s: [t]
    });
    Net_1.Net.Call(29568, e, e => {
      e && (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 19878), ModelManager_1.ModelManager.QuestNewModel.RemoveLackResourceQuest(t), o) && o()
    })
  }
  static RequestSetQuestFocusMode(e, o) {
    e = Protocol_1.Aki.Protocol.l91.create({
      B5n: e
    });
    Net_1.Net.Call(21712, e, e => {
      var t;
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrForcedOccupationResource || e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_InstanceCannotSetQuestFocus || e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_InstanceCannotCancelQuestFocus || e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_DisabledFocusMode ? (t = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.Q4n), ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t)) : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25364)), o) && o(!1)
    })
  }
  static RequestCancelQuestFocusMode(e, t) {
    e = Protocol_1.Aki.Protocol.u91.create({
      B5n: e
    });
    Net_1.Net.Call(25279, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29024), t) && t()
    })
  }
  static RequestAcceptFocusWaitQuest(t, o) {
    var e = Protocol_1.Aki.Protocol.m91.create({
      B5n: t
    });
    Net_1.Net.Call(23447, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26638), ModelManager_1.ModelManager.QuestNewModel.RemovePendingAcceptQuestOnFocusMode(t), o) && o()
    })
  }
  static RequestSetFocusModeDeterCondition(e) {
    e = Protocol_1.Aki.Protocol.Agu.create({
      xgu: e
    });
    Net_1.Net.Call(22627, e, e => {
      e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26638)
    })
  }
}
exports.QuestNewController = QuestNewController, (_a = QuestNewController).Vro = void 0, QuestNewController.QuestRangeFailWarningTreeId = 0, QuestNewController.v6a = !1, QuestNewController.M6a = 0, QuestNewController.S6a = !1, QuestNewController.E6a = 0, QuestNewController.Rih = !1, QuestNewController.Uih = 0, QuestNewController.Dih = 300, QuestNewController.k91 = void 0, QuestNewController.N_u = void 0, QuestNewController.V_u = void 0, QuestNewController.Oro = () => {
  QuestNewController.cYt(1).RefreshCurTrackQuest(), QuestNewController.cYt(3).CreateMarksOnWakeUp(), _a.Vro && (_a.Nro(_a.Vro), _a.Vro = void 0)
}, QuestNewController.wro = e => {
  for (const o of e.JBs) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Quest", 18, "上线下发进行中的任务", ["任务id", o.B5n]);
    var t = ModelManager_1.ModelManager.QuestNewModel.AddQuest(o.B5n);
    t && t.UpdateState(o.H6n, 0)
  }
}, QuestNewController.Bro = e => {
  var t, o, r = QuestNewController.Fro(),
    a = ModelManager_1.ModelManager.QuestNewModel;
  for (const n of e.B5n) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Quest", 18, "下发可接任务", ["任务id", n]);
    let e = a.GetQuest(n);
    e || (t = a.GetQuestConfig(n)) && (t = t.AddInteractOption) && (t && r !== n && (t = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(t.EntityId), t = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(t), o = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(), o = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(o), t) && o && t !== o ? a.AddCanAcceptQuest(n) : (e = a.AddQuest(n))?.UpdateState(Protocol_1.Aki.Protocol.hTs.CTs, 0))
  }
}, QuestNewController.kro = () => {
  var e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(),
    t = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(e);
  if (t) {
    var o, r, a = QuestNewController.Fro(),
      n = ModelManager_1.ModelManager.QuestNewModel;
    for ([o, r] of n.GetCanAcceptQuest())
      if (r) {
        var l = n.GetQuestConfig(o);
        if (l) {
          var s = l.AddInteractOption;
          if (s) {
            s = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(s.EntityId, l?.DungeonId);
            if (ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(s) === t || a === o) {
              if (n.GetQuest(o)) return;
              n.AddQuest(o)?.UpdateState(Protocol_1.Aki.Protocol.hTs.CTs, 0)
            } else n.RemoveQuest(o)
          }
        }
      }
  }
}, QuestNewController.bro = e => {
  var t;
  for ([t] of ModelManager_1.ModelManager.QuestNewModel.GetPreShowQuests()) e.B5n.indexOf(t) < 0 && ModelManager_1.ModelManager.QuestNewModel.RemovePreShowQuest(t);
  for (const o of e.B5n) Log_1.Log.CheckInfo() && Log_1.Log.Info("Quest", 18, "下发提前显示的任务", ["任务id", o]), ModelManager_1.ModelManager.QuestNewModel.AddPreShowQuest(o)
}, QuestNewController.Gro = e => {
  for (const t of e.B5n) ModelManager_1.ModelManager.QuestNewModel.AddFinishedQuest(t);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnQuestFinishListNotify), _a.TryChangeTrackedQuest2(void 0)
}, QuestNewController.qro = e => {
  switch (Log_1.Log.CheckInfo() && Log_1.Log.Info("Quest", 18, "任务状态更新", ["任务Id", e.B5n], ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n]), e.Y4n) {
    case Protocol_1.Aki.Protocol.hTs.Proto_InActive:
    case Protocol_1.Aki.Protocol.hTs.CTs:
    case Protocol_1.Aki.Protocol.hTs.nvs:
      var t = ModelManager_1.ModelManager.QuestNewModel.AddQuest(e.B5n);
      t ? t.UpdateState(e.Y4n, 1) : Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "任务状态更新时：任务不存在", ["任务Id", e.B5n], ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n]);
      break;
    case Protocol_1.Aki.Protocol.hTs.a3_:
      ModelManager_1.ModelManager.QuestNewModel.AddFinishedQuest(e.B5n);
      t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.B5n);
      t ? t.UpdateState(e.Y4n, 1) : Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "任务状态更新时：任务不存在", ["任务Id", e.B5n], ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n]);
      break;
    case Protocol_1.Aki.Protocol.hTs.Proto_Delete:
      t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.B5n);
      t ? (ModelManager_1.ModelManager.QuestNewModel.RemoveQuest(e.B5n), t.UpdateState(e.Y4n, 1)) : Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "任务状态更新时：任务不存在", ["任务Id", e.B5n], ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n])
  }
}, QuestNewController.iVe = e => ModelManager_1.ModelManager.FunctionModel.IsOpen(10004), QuestNewController.DSe = (e, t, o) => {
  var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
  if (r) {
    r = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfig(r.Type);
    if (r && r.NeedRedDot && 1 === o) switch (t) {
      case Protocol_1.Aki.Protocol.hTs.nvs:
        QuestNewController.RedDotRequest(e, 1);
        break;
      case Protocol_1.Aki.Protocol.hTs.a3_:
      case Protocol_1.Aki.Protocol.hTs.Proto_Delete:
        QuestNewController.RedDotRequest(e, 0)
    }
  }
}, QuestNewController.Nro = e => {
  if (ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp)
    for (const t of e.B5n) ModelManager_1.ModelManager.QuestNewModel.SetQuestRedDot(t, !0);
  else _a.Vro = e
}, QuestNewController.kka = e => {
  e = MathUtils_1.MathUtils.LongToBigInt(e.C9n), _a.QuestRangeFailWarningTreeId = e, _a.v6a = !1, _a.S6a = !0, _a.Rih = !0, _a.E6a = 0, _a.Uih = 0, e = ControllerHolder_1.ControllerHolder.GenericPromptController.GetViewNameByPromptId(TIPS_NAME);
  e && !UiManager_1.UiManager.IsViewOpen(e) && ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(TIPS_NAME)
}, QuestNewController.mgl = e => {
  var t = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
    t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
  t && t.StopCurrentActions();
  let o = !1;
  var r = ControllerHolder_1.ControllerHolder.FlowController.GetFlowIncId();
  for (const a of e.YE_)
    if (r === MathUtils_1.MathUtils.LongToNumber(a)) {
      o = !0;
      break
    } ModelManager_1.ModelManager.PlotModel.IsInPlot && o ? (ControllerHolder_1.ControllerHolder.FlowController.FinishFlow("任务结束打断剧情"), ModelManager_1.ModelManager.QuestNewModel.IsServerNotifyEnd = !0, ModelManager_1.ModelManager.QuestNewModel.ServerNotifyEndQuestId = e.B5n) : ((t = new Protocol_1.Aki.Protocol.gg_).B5n = ModelManager_1.ModelManager.QuestNewModel.ServerNotifyEndQuestId, Net_1.Net.Call(25048, t, e => {
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18307)
  }))
}, QuestNewController.Yht = () => {
  var e;
  ModelManager_1.ModelManager.QuestNewModel.IsServerNotifyEnd && (ModelManager_1.ModelManager.QuestNewModel.IsServerNotifyEnd = !1, (e = new Protocol_1.Aki.Protocol.gg_).B5n = ModelManager_1.ModelManager.QuestNewModel.ServerNotifyEndQuestId, Net_1.Net.Call(25048, e, e => {
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18307)
  }))
}, QuestNewController.Nka = e => {
  _a.Rih && _a.HideCancelRangeFailWaringEffect()
}, QuestNewController.HideCancelRangeFailWaringEffect = () => {
  _a.v6a = !0, _a.S6a = !1, _a.M6a = 0, _a.QuestRangeFailWarningTreeId = 0, _a.Rih = !1
}, QuestNewController.oF1 = e => {
  var t = ModelManager_1.ModelManager.QuestNewModel;
  Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "WaitQuestConfirmResource", ["LackResourceQuestIds", e.hou]), t.QuestVideoResourceDownloadFinished || (t.IsLackQuestVideoResource = 0 !== e.hou.length)
}, QuestNewController.nF1 = e => {
  var t, o, r, a, n = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
  switch (n) {
    case 1:
      4 === e && (ModelManager_1.ModelManager.QuestNewModel.IsLackQuestVideoResource = !1, ModelManager_1.ModelManager.QuestNewModel.QuestVideoResourceDownloadFinished = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateQuestListAndDetails));
      break;
    case 0:
      3 === e && (ModelManager_1.ModelManager.QuestNewModel.IsLackQuestVideoResource = !1, ModelManager_1.ModelManager.QuestNewModel.QuestVideoResourceDownloadFinished = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateQuestListAndDetails))
  }
  ModelManager_1.ModelManager.QuestResourceModel.UpdateToServerResState(), 4 !== e && 3 !== e || ((t = new LogReportDefine_1.DownloadVideoResLogData).i_task_id = _a.N_u || 0, t.b_if_storage_alert = _a.V_u || !1, t.i_role_id = 0 === n ? 2 : 1, 3 === e ? (t.i_resource_type = 2, [n, o, r, a] = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).GetReportLogData(), t.i_peak_speed = n, t.i_resource_size = o, t.i_download_time = r, t.b_if_storage_alert = a) : (t.i_resource_type = 1, [n, o, r, a] = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).GetReportLogData(), t.i_peak_speed = n, t.i_resource_size = o, t.i_download_time = r, t.b_if_storage_alert = a), t.i_download_status = 1, ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t))
}, QuestNewController.U91 = e => {
  ModelManager_1.ModelManager.QuestNewModel.SetFocusQuestId(e.C91), e.x9n !== Protocol_1.Aki.Protocol.v91.Proto_Inherit && (LevelLoadingController_1.LevelLoadingController.OpenLoading(19, 0, void 0, "Task_Focus_EnterFocusMode"), _a.k91 = TimerSystem_1.TimerSystem.Delay(() => {
    LevelLoadingController_1.LevelLoadingController.CloseLoading(19)
  }, 5e3))
}, QuestNewController.B91 = e => {
  ModelManager_1.ModelManager.QuestNewModel.SetFocusQuestId(e.C91), TimerSystem_1.TimerSystem.Has(_a.k91) && TimerSystem_1.TimerSystem.Remove(_a.k91), _a.k91 = TimerSystem_1.TimerSystem.Delay(() => {
    LevelLoadingController_1.LevelLoadingController.CloseLoading(19), QuestNewController.RequestTrackQuest(e.C91, !0, 2), TimerSystem_1.TimerSystem.Has(_a.k91) && TimerSystem_1.TimerSystem.Remove(_a.k91)
  }, 2e3)
}, QuestNewController.g_u = e => {
  var t = ModelManager_1.ModelManager.QuestNewModel;
  for (const o of t.GetAllLockQuests()) t.LockQuestSuspendByOnline(o, !1);
  for (const r of e.h_u) t.AddQuestLockInfo(r)
}, QuestNewController.Tmu = e => {
  var t, e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.B5n);
  e && (t = "Text_TaskSuspendedInteractionDisabled_Text", e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)?.replace("{0}", e.Name) ?? t, ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, void 0, void 0, [e]))
}, QuestNewController.Dfu = e => {
  let t = void 0;
  switch (e.x9n) {
    case Protocol_1.Aki.Protocol.ffu.Proto_ForceOccupyFail:
      t = "Task_Focus_Tips04";
      break;
    case Protocol_1.Aki.Protocol.ffu.Proto_EnterSealedArea:
      t = "Task_Focus_Tips03"
  }
  t && (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? t, ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, void 0, void 0, [e]))
};
//# sourceMappingURL=QuestController.js.map