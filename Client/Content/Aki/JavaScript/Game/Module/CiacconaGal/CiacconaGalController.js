"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const CiacoonaGalPlayer_1 = require("./CiacoonaGalPlayer");
class CiacconaGalController extends ControllerBase_1.ControllerBase {
  constructor() {
    super();
  }
  static get GalPlayer() {
    return CiacconaGalController.qbc;
  }
  static OnInit() {
    CiacconaGalController.qbc = CiacoonaGalPlayer_1.CiacconaGalPlayer.Instance;
    this.q4c();
    return true;
  }
  static OnClear() {
    CiacconaGalController.G4c = [];
    CiacconaGalController.qbc.Release();
    this.F4c();
    return true;
  }
  static OnTick(a) {
    this.N4c(a);
    this.V4c(a);
  }
  static N4c(a) {
    if (this.h$i && (ModelManager_1.ModelManager.CiacconaGalModel.IsCurStepDataListDirty && CiacconaGalController.Fbc(), CiacconaGalController.qbc.StatePendingToSwitch !== 0)) {
      CiacconaGalController.qbc.SwitchState();
    }
  }
  static V4c(a) {
    if (ModelManager_1.ModelManager.CiacconaGalModel.DataUpdateMask !== 0) {
      CiacconaGalController.j4c(ModelManager_1.ModelManager.CiacconaGalModel.DataUpdateMask);
      ModelManager_1.ModelManager.CiacconaGalModel.DataUpdateMask = 0;
    }
  }
  static q4c() {
    Net_1.Net.Register(22800, CiacconaGalController.H4c);
    Net_1.Net.Register(28892, CiacconaGalController.$4c);
    Net_1.Net.Register(21123, CiacconaGalController.W4c);
    Net_1.Net.Register(24049, CiacconaGalController.Q4c);
    Net_1.Net.Register(27097, CiacconaGalController.K4c);
  }
  static F4c() {
    Net_1.Net.UnRegister(22800);
    Net_1.Net.UnRegister(28892);
    Net_1.Net.UnRegister(21123);
    Net_1.Net.UnRegister(24049);
    Net_1.Net.UnRegister(27097);
  }
  static j4c(a) {
    if (a & 1) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaChapterDataUpdate);
    }
    if (a & 2) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaInspirationDataUpdate);
    }
    if (a & 4) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaRewardDataUpdate);
    }
    if (a & 8) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaEndingDataUpdate);
    }
    if (a & 16) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaActivityStateUpdate);
    }
    a = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData;
    if (a) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, a.Id);
    }
  }
  static OpenGalViewByChapterId(a, e) {
    var t = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(a);
    if (t) {
      t = t.StepIds[0];
      CiacconaGalController.GalPlayer.CurHandlingChapterId = a;
      CiacconaGalController.OpenGalViewByStepId(t, a, e);
    }
  }
  static OpenGalViewByStepId(a, e, t) {
    a = CiacconaGalController.Nbc(a);
    if (e) {
      CiacconaGalController.GalPlayer.CurHandlingChapterId = e;
    }
    if (a) {
      UiManager_1.UiManager.OpenView("CiacconaGalView", undefined, () => {
        if (t) {
          UiManager_1.UiManager.CloseView(t);
        }
      });
    }
  }
  static OpenChapterViewById(a, e) {
    var t = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(a);
    if (t) {
      CiacconaGalController.GalPlayer.CurHandlingChapterId = a;
      UiManager_1.UiManager.OpenView("CiacconaGalChapterView", t, () => {
        if (e) {
          UiManager_1.UiManager.CloseView(e);
        }
      });
    }
  }
  static async OpenChapterViewAsync(a) {
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(a);
    return !!e && (CiacconaGalController.GalPlayer.CurHandlingChapterId = a, !!(await UiManager_1.UiManager.OpenViewAsync("CiacconaGalChapterView", e)));
  }
  static OpenEndingView() {
    UiManager_1.UiManager.OpenView("CiacconaGalEndingView");
  }
  static OpenEndingDetailView(a, e) {
    var a = ModelManager_1.ModelManager.CiacconaGalModel.GetEndingDataById(a);
    if (a && a.IsFinished) {
      a = {
        EndingData: a,
        LabelTextId: e
      };
      UiManager_1.UiManager.OpenView("CiacconaGalEndingDetailView", a);
    }
  }
  static OpenChapterEntryView(a, e = 0) {
    a = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(a);
    if (a) {
      UiManager_1.UiManager.OpenView("CiacconaGalChapterEntryView", a);
      this.ReportEnterChapterEntryView(e);
    }
  }
  static async OpenChapterEntryViewAsync(a, e = 0) {
    var a = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(a);
    return !!a && (a = await UiManager_1.UiManager.OpenViewAsync("CiacconaGalChapterEntryView", a), this.ReportEnterChapterEntryView(e), !!a);
  }
  static OpenRewardViewByActivityId(a) {
    a = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(a);
    if (a && a.IsInRewardTime) {
      UiManager_1.UiManager.OpenView("CiacconaActivityRewardView", a);
    }
  }
  static async ExitAvg() {
    var a = this.GalPlayer.CurHandlingChapterId;
    var e = this.GalPlayer.CurHandlingStepId;
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e).SubEndingId;
    const t = ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(e);
    if (!t.IsFinished || t.IsFaked) {
      var r = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.Id;
      await this.RequestFinishChapterSubEnding(r, a, e);
      const t = ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(e);
      if (t?.ShouldExitOnFirstFinish) {
        (r = []).push(UiManager_1.UiManager.CloseViewAsync("CiacconaGalChapterView"));
        r.push(UiManager_1.UiManager.CloseViewAsync("CiacconaGalChapterEntryView"));
        await Promise.all(r);
        await UiManager_1.UiManager.CloseViewAsync("CiacconaGalView");
      } else {
        this.OpenChapterViewById(a, "CiacconaGalView");
      }
    } else {
      this.OpenChapterViewById(a, "CiacconaGalView");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyBtCiacconaChapterFinish, a, e);
  }
  static AddOnStepDataUpdate(a) {
    CiacconaGalController.G4c.push(a);
  }
  static RemoveOnStepDataUpdate(a) {
    a = CiacconaGalController.G4c.indexOf(a);
    if (a !== -1) {
      CiacconaGalController.G4c.splice(a, 1);
    }
  }
  static SetGalViewReady(a) {
    if (!(CiacconaGalController.h$i = a)) {
      CiacconaGalController.qbc.Reset();
    }
  }
  static Fbc() {
    for (const a of CiacconaGalController.G4c) {
      a(this.GalPlayer.CurHandlingStepId);
    }
    ModelManager_1.ModelManager.CiacconaGalModel.IsCurStepDataListDirty = false;
  }
  static Nbc(e) {
    if (!ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e)) {
      return false;
    }
    ModelManager_1.ModelManager.CiacconaGalModel.ClearCurStepData();
    var a = ModelManager_1.ModelManager.CiacconaGalModel.GetAllChapterData();
    if (!a) {
      return false;
    }
    a = a.find(a => a.StepIds.includes(e));
    if (!a) {
      return false;
    }
    for (const r of a.StepIds) {
      if (r === e) {
        break;
      }
      var t = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(r);
      if (t.Type === 2) {
        t.ChosenId = t.ChoiceIds[0];
      }
      ModelManager_1.ModelManager.CiacconaGalModel.PushCurStepData(t);
    }
    CiacconaGalController.qbc.TryContinue(e);
    return true;
  }
  static async RequestFinishChapterSubEnding(a, e, t) {
    var r = new Protocol_1.Aki.Protocol.O3c();
    r.w6n = a;
    r.g4c = e;
    r.u4c = t;
    var a = await Net_1.Net.CallAsync(28629, r);
    if (a && a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Q4n, 17691);
    }
  }
  static async RequestUnlockChoice(a, e, t) {
    var r = ModelManager_1.ModelManager.CiacconaGalModel.GetChoiceDataById(t);
    if (!!r && !!r.NeedInspiration && !(ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(a).InspirationCount < r.RequiredInspiration)) {
      (r = new Protocol_1.Aki.Protocol.N3c()).w6n = a;
      r.g4c = e;
      r.l4c = t;
      if ((a = await Net_1.Net.CallAsync(22125, r)) && a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Q4n, 24729);
      }
    }
  }
  static async RequestGetSubEndingReward(a, e, t) {
    var r = new Protocol_1.Aki.Protocol.G3c();
    r.w6n = a;
    r.g4c = e;
    r.u4c = t;
    var a = await Net_1.Net.CallAsync(28188, r);
    if (a && a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Q4n, 27697);
    }
  }
  static async RequestGetActivityEndingReward(a, e) {
    var t = new Protocol_1.Aki.Protocol.j3c();
    t.w6n = a;
    t.u4c = e;
    var a = await Net_1.Net.CallAsync(25491, t);
    if (a && a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Q4n, 25007);
    }
  }
  static async RequestGetActivityProgressReward(a, e) {
    var t = new Protocol_1.Aki.Protocol.$3c();
    t.w6n = a;
    t.N6n = e;
    var a = await Net_1.Net.CallAsync(26224, t);
    if (a && a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Q4n, 21562);
    }
  }
  static ReportEnterChapterEntryView(a) {
    if (a) {
      a = new LogReportDefine_1.CiacconaEnterMainViewLogEvent(a);
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(a);
    }
  }
}
(exports.CiacconaGalController = CiacconaGalController).IsTickEvenPausedInternal = true;
CiacconaGalController.qbc = undefined;
CiacconaGalController.h$i = false;
CiacconaGalController.G4c = [];
CiacconaGalController.H4c = a => {
  ModelManager_1.ModelManager.CiacconaGalModel.UpdateAllChapterData(a.e4c);
};
CiacconaGalController.$4c = a => {
  ModelManager_1.ModelManager.CiacconaGalModel.UpdateInspirationData(a.r4c);
};
CiacconaGalController.W4c = a => {
  ModelManager_1.ModelManager.CiacconaGalModel.UpdateProgressRewardData(a.t4c);
};
CiacconaGalController.Q4c = a => {
  ModelManager_1.ModelManager.CiacconaGalModel.UpdateAllEndingData(a.i4c);
};
CiacconaGalController.K4c = a => {
  ModelManager_1.ModelManager.CiacconaGalModel.UpdateActivityState(a);
}; //# sourceMappingURL=CiacconaGalController.js.map