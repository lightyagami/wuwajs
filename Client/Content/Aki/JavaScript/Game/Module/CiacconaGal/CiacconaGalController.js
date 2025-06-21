"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalController = void 0;
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  CiacoonaGalPlayer_1 = require("./CiacoonaGalPlayer");
class CiacconaGalController extends ControllerBase_1.ControllerBase {
  constructor() {
    super()
  }
  static get GalPlayer() {
    return CiacconaGalController.qbc
  }
  static OnInit() {
    return CiacconaGalController.qbc = CiacoonaGalPlayer_1.CiacconaGalPlayer.Instance, this.q4c(), !0
  }
  static OnClear() {
    return CiacconaGalController.G4c = [], CiacconaGalController.qbc.Release(), this.F4c(), !0
  }
  static OnTick(a) {
    this.N4c(a), this.V4c(a)
  }
  static N4c(a) {
    this.h$i && (ModelManager_1.ModelManager.CiacconaGalModel.IsCurStepDataListDirty && CiacconaGalController.Fbc(), 0 !== CiacconaGalController.qbc.StatePendingToSwitch) && CiacconaGalController.qbc.SwitchState()
  }
  static V4c(a) {
    0 !== ModelManager_1.ModelManager.CiacconaGalModel.DataUpdateMask && (CiacconaGalController.j4c(ModelManager_1.ModelManager.CiacconaGalModel.DataUpdateMask), ModelManager_1.ModelManager.CiacconaGalModel.DataUpdateMask = 0)
  }
  static q4c() {
    Net_1.Net.Register(21602, CiacconaGalController.H4c), Net_1.Net.Register(25673, CiacconaGalController.$4c), Net_1.Net.Register(18508, CiacconaGalController.W4c), Net_1.Net.Register(20323, CiacconaGalController.Q4c), Net_1.Net.Register(15361, CiacconaGalController.K4c)
  }
  static F4c() {
    Net_1.Net.UnRegister(21602), Net_1.Net.UnRegister(25673), Net_1.Net.UnRegister(18508), Net_1.Net.UnRegister(20323), Net_1.Net.UnRegister(15361)
  }
  static j4c(a) {
    1 & a && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaChapterDataUpdate), 2 & a && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaInspirationDataUpdate), 4 & a && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaRewardDataUpdate), 8 & a && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaEndingDataUpdate), 16 & a && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaActivityStateUpdate);
    a = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData;
    a && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, a.Id)
  }
  static OpenGalViewByChapterId(a, e) {
    var t = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(a);
    t && (t = t.StepIds[0], CiacconaGalController.GalPlayer.CurHandlingChapterId = a, CiacconaGalController.OpenGalViewByStepId(t, a, e))
  }
  static OpenGalViewByStepId(a, e, t) {
    a = CiacconaGalController.Nbc(a);
    e && (CiacconaGalController.GalPlayer.CurHandlingChapterId = e), a && UiManager_1.UiManager.OpenView("CiacconaGalView", void 0, () => {
      t && UiManager_1.UiManager.CloseView(t)
    })
  }
  static OpenChapterViewById(a, e) {
    var t = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(a);
    t && (CiacconaGalController.GalPlayer.CurHandlingChapterId = a, UiManager_1.UiManager.OpenView("CiacconaGalChapterView", t, () => {
      e && UiManager_1.UiManager.CloseView(e)
    }))
  }
  static async OpenChapterViewAsync(a) {
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(a);
    return !!e && (CiacconaGalController.GalPlayer.CurHandlingChapterId = a, !!await UiManager_1.UiManager.OpenViewAsync("CiacconaGalChapterView", e))
  }
  static OpenEndingView() {
    UiManager_1.UiManager.OpenView("CiacconaGalEndingView")
  }
  static OpenEndingDetailView(a, e) {
    var a = ModelManager_1.ModelManager.CiacconaGalModel.GetEndingDataById(a);
    a && a.IsFinished && (a = {
      EndingData: a,
      LabelTextId: e
    }, UiManager_1.UiManager.OpenView("CiacconaGalEndingDetailView", a))
  }
  static OpenChapterEntryView(a, e = 0) {
    a = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(a);
    a && (UiManager_1.UiManager.OpenView("CiacconaGalChapterEntryView", a), this.ReportEnterChapterEntryView(e))
  }
  static async OpenChapterEntryViewAsync(a, e = 0) {
    var a = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(a);
    return !!a && (a = await UiManager_1.UiManager.OpenViewAsync("CiacconaGalChapterEntryView", a), this.ReportEnterChapterEntryView(e), !!a)
  }
  static OpenRewardViewByActivityId(a) {
    a = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(a);
    a && a.IsInRewardTime && UiManager_1.UiManager.OpenView("CiacconaActivityRewardView", a)
  }
  static async ExitAvg() {
    var a = this.GalPlayer.CurHandlingChapterId,
      e = this.GalPlayer.CurHandlingStepId,
      e = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e).SubEndingId;
    const t = ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(e);
    if (!t.IsFinished || t.IsFaked) {
      var r = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.Id;
      await this.RequestFinishChapterSubEnding(r, a, e);
      const t = ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(e);
      t?.ShouldExitOnFirstFinish ? ((r = []).push(UiManager_1.UiManager.CloseViewAsync("CiacconaGalChapterView")), r.push(UiManager_1.UiManager.CloseViewAsync("CiacconaGalChapterEntryView")), await Promise.all(r), await UiManager_1.UiManager.CloseViewAsync("CiacconaGalView")) : this.OpenChapterViewById(a, "CiacconaGalView")
    } else this.OpenChapterViewById(a, "CiacconaGalView");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyBtCiacconaChapterFinish, a, e)
  }
  static AddOnStepDataUpdate(a) {
    CiacconaGalController.G4c.push(a)
  }
  static RemoveOnStepDataUpdate(a) {
    a = CiacconaGalController.G4c.indexOf(a); - 1 !== a && CiacconaGalController.G4c.splice(a, 1)
  }
  static SetGalViewReady(a) {
    (CiacconaGalController.h$i = a) || CiacconaGalController.qbc.Reset()
  }
  static Fbc() {
    for (const a of CiacconaGalController.G4c) a(this.GalPlayer.CurHandlingStepId);
    ModelManager_1.ModelManager.CiacconaGalModel.IsCurStepDataListDirty = !1
  }
  static Nbc(e) {
    if (!ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e)) return !1;
    ModelManager_1.ModelManager.CiacconaGalModel.ClearCurStepData();
    var a = ModelManager_1.ModelManager.CiacconaGalModel.GetAllChapterData();
    if (!a) return !1;
    a = a.find(a => a.StepIds.includes(e));
    if (!a) return !1;
    for (const r of a.StepIds) {
      if (r === e) break;
      var t = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(r);
      2 === t.Type && (t.ChosenId = t.ChoiceIds[0]), ModelManager_1.ModelManager.CiacconaGalModel.PushCurStepData(t)
    }
    return CiacconaGalController.qbc.TryContinue(e), !0
  }
  static async RequestFinishChapterSubEnding(a, e, t) {
    var r = new Protocol_1.Aki.Protocol.O3c,
      a = (r.w6n = a, r.g4c = e, r.u4c = t, await Net_1.Net.CallAsync(19763, r));
    a && a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Q4n, 29083)
  }
  static async RequestUnlockChoice(a, e, t) {
    var r = ModelManager_1.ModelManager.CiacconaGalModel.GetChoiceDataById(t);
    !r || !r.NeedInspiration || ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(a).InspirationCount < r.RequiredInspiration || ((r = new Protocol_1.Aki.Protocol.N3c).w6n = a, r.g4c = e, r.l4c = t, (a = await Net_1.Net.CallAsync(16728, r)) && a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Q4n, 26333))
  }
  static async RequestGetSubEndingReward(a, e, t) {
    var r = new Protocol_1.Aki.Protocol.G3c,
      a = (r.w6n = a, r.g4c = e, r.u4c = t, await Net_1.Net.CallAsync(24338, r));
    a && a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Q4n, 15644)
  }
  static async RequestGetActivityEndingReward(a, e) {
    var t = new Protocol_1.Aki.Protocol.j3c,
      a = (t.w6n = a, t.u4c = e, await Net_1.Net.CallAsync(21243, t));
    a && a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Q4n, 17208)
  }
  static async RequestGetActivityProgressReward(a, e) {
    var t = new Protocol_1.Aki.Protocol.$3c,
      a = (t.w6n = a, t.N6n = e, await Net_1.Net.CallAsync(18001, t));
    a && a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Q4n, 19130)
  }
  static ReportEnterChapterEntryView(a) {
    a && (a = new LogReportDefine_1.CiacconaEnterMainViewLogEvent(a), ControllerHolder_1.ControllerHolder.LogReportController.LogReport(a))
  }
}(exports.CiacconaGalController = CiacconaGalController).IsTickEvenPausedInternal = !0, CiacconaGalController.qbc = void 0, CiacconaGalController.h$i = !1, CiacconaGalController.G4c = [], CiacconaGalController.H4c = a => {
  ModelManager_1.ModelManager.CiacconaGalModel.UpdateAllChapterData(a.e4c)
}, CiacconaGalController.$4c = a => {
  ModelManager_1.ModelManager.CiacconaGalModel.UpdateInspirationData(a.r4c)
}, CiacconaGalController.W4c = a => {
  ModelManager_1.ModelManager.CiacconaGalModel.UpdateProgressRewardData(a.t4c)
}, CiacconaGalController.Q4c = a => {
  ModelManager_1.ModelManager.CiacconaGalModel.UpdateAllEndingData(a.i4c)
}, CiacconaGalController.K4c = a => {
  ModelManager_1.ModelManager.CiacconaGalModel.UpdateActivityState(a)
};
//# sourceMappingURL=CiacconaGalController.js.map