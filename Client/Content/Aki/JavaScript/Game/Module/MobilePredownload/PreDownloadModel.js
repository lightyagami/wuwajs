"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PreDownloadModel = exports.PreDownloadNoView = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../Core/Common/Info"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  NetworkDefine_1 = require("../../../Launcher/NetworkDefine"),
  PreDownloadManager_1 = require("../../../Launcher/PreDownload/PreDownloadManager"),
  LauncherLog_1 = require("../../../Launcher/Util/LauncherLog"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  PreDownloadDefine_1 = require("./PreDownloadDefine");
class PreDownloadNoView {
  async UpdatePatchDownProgress(e, r, o, n, t, i) {
    return ModelManager_1.ModelManager.PreDownloadModel?.OnUpdateDownData(e, r, o, n, t, i), new Promise(e => {
      e()
    })
  }
  async BinPatchProgress(e, r, o, ...n) {
    return ModelManager_1.ModelManager.PreDownloadModel?.OnBinPatch(e, r, o, ...n), new Promise(e => {
      e()
    })
  }
  async ShowDialog(e, r, o, n, t, i, ...a) {
    r = ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(r), o = ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(o, ...a);
    const s = new CustomPromise_1.CustomPromise;
    return i ? ((a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(274)).SetTitle(r), a.SetTextArgs(o), a.SetBtnText(1, ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(i)), a.FunctionMap.set(1, () => {
      s.SetResult(!0)
    }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(a)) : ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(275)).SetTitle(r), i.SetTextArgs(o), i.SetBtnText(1, ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(n)), i.SetBtnText(2, ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(t)), i.FunctionMap.set(1, () => {
      s.SetResult(!1)
    }), i.FunctionMap.set(2, () => {
      s.SetResult(!0)
    }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i)), s.Promise
  }
}
exports.PreDownloadNoView = PreDownloadNoView;
class PreDownloadModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.PCc = !1, this.xCc = 0, this.HCc = !1, this.BinPatch = void 0, this.UpdateData = void 0, this.Cbc = void 0, this.cso = e => {
      var r = PreDownloadManager_1.PreDownloadManager.Get();
      this.IsPreDownloadAvailable() && r.IsDownloading() && e === NetworkDefine_1.ENetworkType.Cell && (this.PausePreDownload(3), ControllerHolder_1.ControllerHolder.PreDownloadController.OnCellNetTypeChanged())
    }, this.DCc = () => {
      this.PausePreDownload(2)
    }, this.UCc = () => {
      var e = new LogReportDefine_1.PreDownloadDownloadModeSuccessRecord(1 === this.xCc ? 1 : 2);
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e), ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PreDownload_Complete"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate), PreDownloadManager_1.PreDownloadManager.Get().RemoveCompleteEvent(this.UCc)
    }, this.EZ1 = () => {
      PreDownloadManager_1.PreDownloadManager.Get().TryRemoveTick(), LauncherLog_1.LauncherLog.Info("OnPreDownloadEnable And RemoveTick"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreDownloadAvailableUpdate), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate)
    }
  }
  GetHasStartDownload() {
    return this.PCc
  }
  SetDownloadMode(e) {
    this.xCc = e
  }
  GetDownloadMode() {
    return this.xCc
  }
  OnInit() {
    return this.AddEvents(), this.Cbc = new PreDownloadNoView, !0
  }
  OnClear() {
    this.RemoveEvents();
    var e = PreDownloadManager_1.PreDownloadManager.Get();
    return e.RemoveCompleteEvent(this.UCc), e.Stop(), !(this.Cbc = void 0)
  }
  AddEvents() {
    ModelManager_1.ModelManager.ReConnectModel.NetworkListener.NetworkChangeDelegate.Add(this.cso), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReConnectSuccess, this.DCc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReConnectFail, this.DCc)
  }
  RemoveEvents() {
    ModelManager_1.ModelManager.ReConnectModel.NetworkListener.NetworkChangeDelegate.Remove(this.cso), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReConnectSuccess, this.DCc), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReConnectFail, this.DCc)
  }
  IsPreDownloadAvailable() {
    var e = PreDownloadManager_1.PreDownloadManager.Get();
    return (Info_1.Info.IsMobilePlatform() || Info_1.Info.IsPlayInEditor) && e.IsPreDownloadEnabled()
  }
  IsComplete() {
    return PreDownloadManager_1.PreDownloadManager.Get().IsComplete()
  }
  HasClickBtnCheck() {
    return this.IsPreDownloadAvailable() && !this.PCc
  }
  StartPreDownload() {
    var e = PreDownloadManager_1.PreDownloadManager.Get(),
      r = (this.PCc || e.AddCompleteEvent(this.UCc), this.PCc = !0, this.BCc());
    r ? (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate), e.Start(0)) : (this.kCc(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate))
  }
  ResumePreDownload() {
    var e = PreDownloadManager_1.PreDownloadManager.Get();
    this.PCc ? (this.PCc = !0, e.Resume(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate)) : this.StartPreDownload()
  }
  PausePreDownload(e) {
    0 < e && (e = new LogReportDefine_1.PreDownloadPauseRecord(e), ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e)), PreDownloadManager_1.PreDownloadManager.Get().Stop(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate)
  }
  SwitchResumeOrPause() {
    PreDownloadManager_1.PreDownloadManager.Get().IsDownloading() ? this.PausePreDownload(1) : this.BCc() ? this.ResumePreDownload() : (this.kCc(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate))
  }
  SwitchDownloadMode() {
    var e;
    0 === this.xCc ? UiManager_1.UiManager.IsViewShow("PreDownloadView") && this.SetDownloadMode(1) : this.SetDownloadMode(0), UiManager_1.UiManager.IsViewShow("PreDownloadView") && (e = new LogReportDefine_1.PreDownloadDownloadModeSwitchRecord(1 === this.xCc ? 1 : 2), ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate))
  }
  BCc() {
    var e = PreDownloadManager_1.PreDownloadManager.Get(),
      r = UE.KuroLauncherLibrary.GameSavedDir(),
      o = (0, puerts_1.$ref)(0n),
      r = (UE.KuroLauncherLibrary.GetTotalAndFreeSpace(r, o), (0, puerts_1.$unref)(o));
    return e.GetNeedSpace() + e.GetDownloadSize() + 10n * 1024n * 1024n <= r
  }
  kCc() {
    var e, r = PreDownloadManager_1.PreDownloadManager.Get();
    UiManager_1.UiManager.IsViewShow("PreDownloadView") ? (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(268), r = ((r.GetNeedSpace() + r.GetDownloadSize()) / BigInt(1048576)).toString() + "MB", e.SetTextArgs(r), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e)) : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PreDownload_NoSpace")
  }
  IsBinPatching() {
    return this.HCc
  }
  ClearView() {
    PreDownloadManager_1.PreDownloadManager.Get().SetView(this.Cbc)
  }
  OnUpdateDownData(e, r, o, n, t, i) {
    this.HCc = !1, this.UpdateData || (this.UpdateData = new PreDownloadDefine_1.UpdateDownData), this.UpdateData.NeedWait = e, this.UpdateData.Rate = r, this.UpdateData.FileName = o, this.UpdateData.SpeedText = n, this.UpdateData.SizeCurrent = t, this.UpdateData.SizeTotal = i
  }
  OnBinPatch(e, r, o, ...n) {
    this.BinPatch || (this.BinPatch = new PreDownloadDefine_1.BinPatchData), this.BinPatch.NeedWait = e, this.BinPatch.Rate = r, this.BinPatch.TextId = o, this.BinPatch.Args = n, this.HCc = !0
  }
  AddEnableCheck() {
    PreDownloadManager_1.PreDownloadManager.Get().AddEnabledEvent(this.EZ1), LauncherLog_1.LauncherLog.Info("On PreDownload AddEnabledEvent")
  }
}
exports.PreDownloadModel = PreDownloadModel;
//# sourceMappingURL=PreDownloadModel.js.map