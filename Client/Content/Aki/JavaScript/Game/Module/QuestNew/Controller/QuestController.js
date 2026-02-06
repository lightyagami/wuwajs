"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestNewController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const VideoUpdateManager_1 = require("../../../../Launcher/Update/VideoUpdateManager");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SceneEffectStateManager_1 = require("../../../Render/Effect/PostProcess/SceneEffectStateManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ControllerWithAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const MapDefine_1 = require("../../Map/MapDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const DailyQuestAssistant_1 = require("./DailyQuestAssistant");
const GuideEffectAssistant_1 = require("./GuideEffectAssistant");
const GuideLineAssistant_1 = require("./GuideLineAssistant");
const QuestTrackAssistant_1 = require("./QuestTrackAssistant");
const TIPS_NAME = "QuestRangeFailWarning";
const assistantMap = {
  [0]: undefined,
  1: undefined,
  2: undefined,
  3: undefined
};
class QuestNewController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnRegisterNetEvent() {
    super.OnRegisterNetEvent();
    Net_1.Net.Register(25945, QuestNewController.wro);
    Net_1.Net.Register(28673, QuestNewController.Bro);
    Net_1.Net.Register(15343, QuestNewController.bro);
    Net_1.Net.Register(18904, QuestNewController.qro);
    Net_1.Net.Register(15463, QuestNewController.Gro);
    Net_1.Net.Register(23196, QuestNewController.Nro);
    Net_1.Net.Register(19491, QuestNewController.kka);
    Net_1.Net.Register(27301, QuestNewController.Nka);
    Net_1.Net.Register(20449, QuestNewController.mgl);
    Net_1.Net.Register(23366, QuestNewController.BF1);
    Net_1.Net.Register(20738, QuestNewController.SH1);
    Net_1.Net.Register(28490, QuestNewController.MH1);
    Net_1.Net.Register(17758, QuestNewController._pu);
    Net_1.Net.Register(18742, QuestNewController.aDu);
    Net_1.Net.Register(29363, QuestNewController.J2u);
  }
  static OnUnRegisterNetEvent() {
    super.OnUnRegisterNetEvent();
    Net_1.Net.UnRegister(25945);
    Net_1.Net.UnRegister(28673);
    Net_1.Net.UnRegister(15343);
    Net_1.Net.UnRegister(18904);
    Net_1.Net.UnRegister(15463);
    Net_1.Net.UnRegister(19491);
    Net_1.Net.UnRegister(27301);
    Net_1.Net.UnRegister(20449);
    Net_1.Net.UnRegister(23366);
    Net_1.Net.UnRegister(20738);
    Net_1.Net.UnRegister(28490);
    Net_1.Net.UnRegister(17758);
    Net_1.Net.UnRegister(18742);
    Net_1.Net.UnRegister(29363);
  }
  static OnInit() {
    this.InitTickOptimize(30, -1);
    return super.OnInit();
  }
  static OnAddEvents() {
    super.OnAddEvents();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeWakeUp, QuestNewController.Oro);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeArea, this.kro);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.kro);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.Yht);
    UiManager_1.UiManager.AddOpenViewCheckFunction("QuestView", QuestNewController.iVe, "QuestNewController.CanOpenView");
    VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).SetDownloadFinishCallBack(QuestNewController.kF1);
    VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).SetDownloadFinishCallBack(QuestNewController.kF1);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeWakeUp, QuestNewController.Oro);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeArea, this.kro);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.kro);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.Yht);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("QuestView", QuestNewController.iVe);
    super.OnRemoveEvents();
  }
  static OnTick(e) {
    var t;
    if (ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp && (QuestNewController.cYt(0)?.Tick(e), QuestNewController.cYt(2)?.UpdateQuestGuideEffect(e), this.v6a && (this.M6a += e, t = MathUtils_1.MathUtils.SafeDivide(this.Dih - this.M6a, this.Dih), t = MathUtils_1.MathUtils.Clamp(t, 0, 1), SceneEffectStateManager_1.default.SetSceneEffectState(0, t), this.M6a > this.Dih) && (SceneEffectStateManager_1.default.SetSceneEffectState(0, 0), this.v6a = false), this.S6a && (this.E6a += e, t = MathUtils_1.MathUtils.SafeDivide(this.E6a, this.Dih), t = MathUtils_1.MathUtils.Clamp(t, 0, 1), SceneEffectStateManager_1.default.SetSceneEffectState(0, t), this.E6a > this.Dih) && (SceneEffectStateManager_1.default.SetSceneEffectState(0, 1), this.S6a = false), this.Rih) && (this.Uih += e, t = CommonParamById_1.configCommonParamById.GetIntConfig("CloseQuestRangeFailWarningTime") ?? 30000, this.Uih > t)) {
      this.HideCancelRangeFailWaringEffect();
    }
  }
  static RegisterAssistant() {
    this.AddAssistant(0, new GuideLineAssistant_1.GuideLineAssistant(Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest));
    this.AddAssistant(1, new QuestTrackAssistant_1.QuestTrackAssistant());
    this.AddAssistant(2, new GuideEffectAssistant_1.GuideEffectAssistant());
    this.AddAssistant(3, new DailyQuestAssistant_1.DailyQuestAssistant());
  }
  static cYt(e) {
    if (this.Assistants) {
      return this.Assistants.get(e);
    }
  }
  static AddQuestTraceEffect(e, t, o) {
    QuestNewController.cYt(2).AddQuestTraceEffect(e, t, o);
  }
  static RemoveQuestTraceEffect(e, t) {
    QuestNewController.cYt(2).RemoveQuestTraceEffect(e, t);
  }
  static ClearQuestTraceEffect(e) {
    QuestNewController.cYt(2).ClearQuestTraceEffect(e);
  }
  static Fro() {
    let e = 0;
    var t = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
    return e = t && (t = ModelManager_1.ModelManager.MapModel.GetMark(t.MarkType, t.MarkId)) instanceof MapDefine_1.QuestMarkCreateInfo ? t.TreeId : e;
  }
  static RequestTrackQuest(e, t, o, r = 0, a) {
    return QuestNewController.cYt(1).RequestTrackQuest(e, t, o, r, a);
  }
  static TryTrackAndOpenWorldMap(t) {
    var e = () => {
      var e = {
        MarkId: ModelManager_1.ModelManager.QuestNewModel?.TryGetMapMarkIdByQuestId(t),
        MarkType: 12,
        OpenFogId: 0
      };
      ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, e);
    };
    if (ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(t)) {
      e();
    } else {
      QuestNewController.RequestTrackQuest(t, true, 2, 0, e);
    }
  }
  static TryChangeTrackedQuest(e) {
    return QuestNewController.cYt(1).TryChangeTrackedQuest(e);
  }
  static TryChangeTrackedQuest2(e) {
    return QuestNewController.cYt(1).TryChangeTrackedQuest2(e);
  }
  static RedDotRequest(t, o) {
    var e = Protocol_1.Aki.Protocol.O1s.create({
      B5n: t,
      gHn: o
    });
    Net_1.Net.Call(21210, e, e => {
      if (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 22826);
      }
      ModelManager_1.ModelManager.QuestNewModel.SetQuestRedDot(t, o === 1);
    });
  }
  static IsTrackPositionOutFailRange(e) {
    var t = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
    return !!t && t.TreeId !== undefined && !!(t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t.TreeId)) && !!(t = t.GetProcessingFailedNode()) && !t.NeedRequiresSecondConfirmation && t?.IsOutFailRange(e);
  }
  static SetVideoResourceDownloadTriggerId(e) {
    this.Xpu = e;
  }
  static SetIsReportDownloadNotEnoughSpace(e) {
    this.Ypu = e;
  }
  static ConfirmQuestResourceRequest(t, o) {
    var e = Protocol_1.Aki.Protocol.Zs1.create({
      a2s: [t]
    });
    Net_1.Net.Call(24469, e, e => {
      if (e && (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 25973), ModelManager_1.ModelManager.QuestNewModel.RemoveLackResourceQuest(t), o)) {
        o();
      }
    });
  }
  static RequestSetQuestFocusMode(e, o) {
    e = Protocol_1.Aki.Protocol.W91.create({
      B5n: e
    });
    Net_1.Net.Call(25322, e, e => {
      var t;
      if (e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrForcedOccupationResource || e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_InstanceCannotSetQuestFocus || e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_InstanceCannotCancelQuestFocus || e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_DisabledFocusMode ? (t = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.Q4n), ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t)) : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27001)), o)) {
        o(false);
      }
    });
  }
  static RequestCancelQuestFocusMode(e, t) {
    e = Protocol_1.Aki.Protocol.K91.create({
      B5n: e
    });
    Net_1.Net.Call(23803, e, e => {
      if (e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27803), t)) {
        t();
      }
    });
  }
  static RequestAcceptFocusWaitQuest(t, o) {
    var e = Protocol_1.Aki.Protocol.z91.create({
      B5n: t
    });
    Net_1.Net.Call(21116, e, e => {
      if (e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27064), ModelManager_1.ModelManager.QuestNewModel.RemovePendingAcceptQuestOnFocusMode(t), o)) {
        o();
      }
    });
  }
  static RequestSetFocusModeDeterCondition(e) {
    e = Protocol_1.Aki.Protocol.g6u.create({
      p6u: e
    });
    Net_1.Net.Call(15865, e, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27064);
      }
    });
  }
}
exports.QuestNewController = QuestNewController;
(_a = QuestNewController).Vro = undefined;
QuestNewController.QuestRangeFailWarningTreeId = 0;
QuestNewController.v6a = false;
QuestNewController.M6a = 0;
QuestNewController.S6a = false;
QuestNewController.E6a = 0;
QuestNewController.Rih = false;
QuestNewController.Uih = 0;
QuestNewController.Dih = 300;
QuestNewController.EH1 = undefined;
QuestNewController.Xpu = undefined;
QuestNewController.Ypu = undefined;
QuestNewController.Oro = () => {
  QuestNewController.cYt(1).RefreshCurTrackQuest();
  QuestNewController.cYt(3).CreateMarksOnWakeUp();
  if (_a.Vro) {
    _a.Nro(_a.Vro);
    _a.Vro = undefined;
  }
};
QuestNewController.wro = e => {
  for (const o of e.JBs) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Quest", 18, "上线下发进行中的任务", ["任务id", o.B5n]);
    }
    var t = ModelManager_1.ModelManager.QuestNewModel.AddQuest(o.B5n);
    if (t) {
      t.UpdateState(o.H6n, 0);
    }
  }
};
QuestNewController.Bro = e => {
  var t;
  var o;
  var r = QuestNewController.Fro();
  var a = ModelManager_1.ModelManager.QuestNewModel;
  for (const n of e.B5n) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Quest", 18, "下发可接任务", ["任务id", n]);
    }
    let e = a.GetQuest(n);
    if (!e) {
      if ((t = a.GetQuestConfig(n)) && (t = t.AddInteractOption)) {
        if (t && r !== n && (t = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(t.EntityId), t = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(t), o = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(), o = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(o), t) && o && t !== o) {
          a.AddCanAcceptQuest(n);
        } else {
          (e = a.AddQuest(n))?.UpdateState(Protocol_1.Aki.Protocol.hTs.CTs, 0);
        }
      }
    }
  }
};
QuestNewController.kro = () => {
  var e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
  var t = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(e);
  if (t) {
    var o;
    var r;
    var a = QuestNewController.Fro();
    var n = ModelManager_1.ModelManager.QuestNewModel;
    for ([o, r] of n.GetCanAcceptQuest()) {
      if (r) {
        var l = n.GetQuestConfig(o);
        if (l) {
          var s = l.AddInteractOption;
          if (s) {
            s = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(s.EntityId, l?.DungeonId);
            if (ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(s) === t || a === o) {
              if (n.GetQuest(o)) {
                return;
              }
              n.AddQuest(o)?.UpdateState(Protocol_1.Aki.Protocol.hTs.CTs, 0);
            } else {
              n.RemoveQuest(o);
            }
          }
        }
      }
    }
  }
};
QuestNewController.bro = e => {
  var t;
  for ([t] of ModelManager_1.ModelManager.QuestNewModel.GetPreShowQuests()) {
    if (e.B5n.indexOf(t) < 0) {
      ModelManager_1.ModelManager.QuestNewModel.RemovePreShowQuest(t);
    }
  }
  for (const o of e.B5n) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Quest", 18, "下发提前显示的任务", ["任务id", o]);
    }
    ModelManager_1.ModelManager.QuestNewModel.AddPreShowQuest(o);
  }
};
QuestNewController.Gro = e => {
  for (const t of e.B5n) {
    ModelManager_1.ModelManager.QuestNewModel.AddFinishedQuest(t);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnQuestFinishListNotify);
  _a.TryChangeTrackedQuest2(undefined);
};
QuestNewController.qro = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Quest", 18, "任务状态更新", ["任务Id", e.B5n], ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n]);
  }
  switch (e.Y4n) {
    case Protocol_1.Aki.Protocol.hTs.Proto_InActive:
    case Protocol_1.Aki.Protocol.hTs.CTs:
    case Protocol_1.Aki.Protocol.hTs.nvs:
      var t = ModelManager_1.ModelManager.QuestNewModel.AddQuest(e.B5n);
      if (t) {
        t.UpdateState(e.Y4n, 1);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "任务状态更新时：任务不存在", ["任务Id", e.B5n], ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n]);
      }
      break;
    case Protocol_1.Aki.Protocol.hTs.a3_:
      ModelManager_1.ModelManager.QuestNewModel.AddFinishedQuest(e.B5n);
      t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.B5n);
      if (t) {
        t.UpdateState(e.Y4n, 1);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "任务状态更新时：任务不存在", ["任务Id", e.B5n], ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n]);
      }
      break;
    case Protocol_1.Aki.Protocol.hTs.Proto_Delete:
      t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.B5n);
      if (t) {
        ModelManager_1.ModelManager.QuestNewModel.RemoveQuest(e.B5n);
        t.UpdateState(e.Y4n, 1);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "任务状态更新时：任务不存在", ["任务Id", e.B5n], ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n]);
      }
  }
};
QuestNewController.iVe = e => ModelManager_1.ModelManager.FunctionModel.IsOpen(10004);
QuestNewController.DSe = (e, t, o) => {
  var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
  if (r) {
    r = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfig(r.Type);
    if (r && r.NeedRedDot && o === 1) {
      switch (t) {
        case Protocol_1.Aki.Protocol.hTs.nvs:
          QuestNewController.RedDotRequest(e, 1);
          break;
        case Protocol_1.Aki.Protocol.hTs.a3_:
        case Protocol_1.Aki.Protocol.hTs.Proto_Delete:
          QuestNewController.RedDotRequest(e, 0);
      }
    }
  }
};
QuestNewController.Nro = e => {
  if (ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp) {
    for (const t of e.B5n) {
      ModelManager_1.ModelManager.QuestNewModel.SetQuestRedDot(t, true);
    }
  } else {
    _a.Vro = e;
  }
};
QuestNewController.kka = e => {
  e = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
  _a.QuestRangeFailWarningTreeId = e;
  _a.v6a = false;
  _a.S6a = true;
  _a.Rih = true;
  _a.E6a = 0;
  _a.Uih = 0;
  e = ControllerHolder_1.ControllerHolder.GenericPromptController.GetViewNameByPromptId(TIPS_NAME);
  if (e && !UiManager_1.UiManager.IsViewOpen(e)) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(TIPS_NAME);
  }
};
QuestNewController.mgl = e => {
  var t = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
  var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
  if (t) {
    t.StopCurrentActions();
  }
  let o = false;
  var r = ControllerHolder_1.ControllerHolder.FlowController.GetFlowIncId();
  for (const a of e.YE_) {
    if (r === MathUtils_1.MathUtils.LongToNumber(a)) {
      o = true;
      break;
    }
  }
  if (ModelManager_1.ModelManager.PlotModel.IsInPlot && o) {
    ControllerHolder_1.ControllerHolder.FlowController.FinishFlow("任务结束打断剧情");
    ModelManager_1.ModelManager.QuestNewModel.IsServerNotifyEnd = true;
    ModelManager_1.ModelManager.QuestNewModel.ServerNotifyEndQuestId = e.B5n;
  } else {
    (t = new Protocol_1.Aki.Protocol.gg_()).B5n = ModelManager_1.ModelManager.QuestNewModel.ServerNotifyEndQuestId;
    Net_1.Net.Call(23984, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27017);
      }
    });
  }
};
QuestNewController.Yht = () => {
  var e;
  if (ModelManager_1.ModelManager.QuestNewModel.IsServerNotifyEnd) {
    ModelManager_1.ModelManager.QuestNewModel.IsServerNotifyEnd = false;
    (e = new Protocol_1.Aki.Protocol.gg_()).B5n = ModelManager_1.ModelManager.QuestNewModel.ServerNotifyEndQuestId;
    Net_1.Net.Call(23984, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27017);
      }
    });
  }
};
QuestNewController.Nka = e => {
  if (_a.Rih) {
    _a.HideCancelRangeFailWaringEffect();
  }
};
QuestNewController.HideCancelRangeFailWaringEffect = () => {
  _a.v6a = true;
  _a.S6a = false;
  _a.M6a = 0;
  _a.QuestRangeFailWarningTreeId = 0;
  _a.Rih = false;
};
QuestNewController.BF1 = e => {
  var t = ModelManager_1.ModelManager.QuestNewModel;
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("QuestResource", 38, "WaitQuestConfirmResource", ["LackResourceQuestIds", e.bhu]);
  }
  if (!t.QuestVideoResourceDownloadFinished) {
    t.IsLackQuestVideoResource = e.bhu.length !== 0;
  }
};
QuestNewController.kF1 = e => {
  var t;
  var o;
  var r;
  var a;
  var n = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
  switch (n) {
    case 1:
      if (e === 4) {
        ModelManager_1.ModelManager.QuestNewModel.IsLackQuestVideoResource = false;
        ModelManager_1.ModelManager.QuestNewModel.QuestVideoResourceDownloadFinished = true;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateQuestListAndDetails);
      }
      break;
    case 0:
      if (e === 3) {
        ModelManager_1.ModelManager.QuestNewModel.IsLackQuestVideoResource = false;
        ModelManager_1.ModelManager.QuestNewModel.QuestVideoResourceDownloadFinished = true;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateQuestListAndDetails);
      }
  }
  if (e === 4 || e === 3) {
    (t = new LogReportDefine_1.DownloadVideoResLogData()).i_task_id = _a.Xpu || 0;
    t.b_if_storage_alert = _a.Ypu || false;
    t.i_role_id = n === 0 ? 2 : 1;
    if (e === 3) {
      t.i_resource_type = 2;
      [n, o, r, a] = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).GetReportLogData();
      t.i_peak_speed = n;
      t.i_resource_size = o;
      t.i_download_time = r;
      t.b_if_storage_alert = a;
    } else {
      t.i_resource_type = 1;
      [n, o, r, a] = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).GetReportLogData();
      t.i_peak_speed = n;
      t.i_resource_size = o;
      t.i_download_time = r;
      t.b_if_storage_alert = a;
    }
    t.i_download_status = 1;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
  }
};
QuestNewController.SH1 = e => {
  ModelManager_1.ModelManager.QuestNewModel.SetFocusQuestId(e.eH1);
  if (e.x9n !== Protocol_1.Aki.Protocol.iH1.Proto_Inherit) {
    LevelLoadingController_1.LevelLoadingController.OpenLoading(19, 0, undefined, "Task_Focus_EnterFocusMode");
    _a.EH1 = TimerSystem_1.TimerSystem.Delay(() => {
      LevelLoadingController_1.LevelLoadingController.CloseLoading(19);
    }, 5000);
  }
};
QuestNewController.MH1 = e => {
  ModelManager_1.ModelManager.QuestNewModel.SetFocusQuestId(e.eH1);
  if (TimerSystem_1.TimerSystem.Has(_a.EH1)) {
    TimerSystem_1.TimerSystem.Remove(_a.EH1);
  }
  _a.EH1 = TimerSystem_1.TimerSystem.Delay(() => {
    LevelLoadingController_1.LevelLoadingController.CloseLoading(19);
    if (e.eH1) {
      QuestNewController.RequestTrackQuest(e.eH1, true, 2);
    }
    if (TimerSystem_1.TimerSystem.Has(_a.EH1)) {
      TimerSystem_1.TimerSystem.Remove(_a.EH1);
    }
  }, 2000);
};
QuestNewController._pu = e => {
  var t = ModelManager_1.ModelManager.QuestNewModel;
  for (const o of t.GetAllLockQuests()) {
    t.LockQuestSuspendByOnline(o, false);
  }
  for (const r of e.tpu) {
    t.AddQuestLockInfo(r);
  }
};
QuestNewController.aDu = e => {
  var t;
  var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.B5n);
  if (e) {
    t = "Text_TaskSuspendedInteractionDisabled_Text";
    e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)?.replace("{0}", e.Name) ?? t;
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [e]);
  }
};
QuestNewController.J2u = e => {
  let t = undefined;
  switch (e.x9n) {
    case Protocol_1.Aki.Protocol.A2u.Proto_ForceOccupyFail:
      t = "Task_Focus_Tips04";
      break;
    case Protocol_1.Aki.Protocol.A2u.Proto_EnterSealedArea:
      t = "Task_Focus_Tips03";
  }
  if (t) {
    e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? t;
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [e]);
  }
}; //# sourceMappingURL=QuestController.js.map