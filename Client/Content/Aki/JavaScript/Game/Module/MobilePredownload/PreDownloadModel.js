"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreDownloadModel = exports.PreDownloadNoView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const NetworkDefine_1 = require("../../../Launcher/NetworkDefine");
const PreDownloadManager_1 = require("../../../Launcher/PreDownload/PreDownloadManager");
const LauncherLog_1 = require("../../../Launcher/Util/LauncherLog");
const LauncherTextLib_1 = require("../../../Launcher/Util/LauncherTextLib");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const PreDownloadDefine_1 = require("./PreDownloadDefine");
class PreDownloadNoView {
  async UpdatePatchDownProgress(e, r, n, o, t, i) {
    ModelManager_1.ModelManager.PreDownloadModel?.OnUpdateDownData(e, r, n, o, t, i);
    return new Promise(e => {
      e();
    });
  }
  async BinPatchProgress(e, r, n, ...o) {
    ModelManager_1.ModelManager.PreDownloadModel?.OnBinPatch(e, r, n, ...o);
    return new Promise(e => {
      e();
    });
  }
  async ShowDialog(e, r, n, o, t, i, ...a) {
    r = ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(r);
    n = ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(n, ...a);
    const s = new CustomPromise_1.CustomPromise();
    if (i) {
      (a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(274)).SetTitle(r);
      a.SetTextArgs(n);
      a.SetBtnText(1, ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(i));
      a.FunctionMap.set(1, () => {
        s.SetResult(true);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(a);
    } else {
      (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(275)).SetTitle(r);
      i.SetTextArgs(n);
      i.SetBtnText(1, ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(o));
      i.SetBtnText(2, ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(t));
      i.FunctionMap.set(1, () => {
        s.SetResult(false);
      });
      i.FunctionMap.set(2, () => {
        s.SetResult(true);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    }
    return s.Promise;
  }
}
exports.PreDownloadNoView = PreDownloadNoView;
class PreDownloadModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.PCc = false;
    this.xCc = 0;
    this.HCc = false;
    this.BinPatch = undefined;
    this.UpdateData = undefined;
    this.Cbc = undefined;
    this.cso = e => {
      var r = PreDownloadManager_1.PreDownloadManager.Get();
      if (this.IsPreDownloadAvailable() && r.IsDownloading() && e === NetworkDefine_1.ENetworkType.Cell) {
        this.PausePreDownload(3);
        ControllerHolder_1.ControllerHolder.PreDownloadController.OnCellNetTypeChanged();
      }
    };
    this.DCc = () => {
      var e = PreDownloadManager_1.PreDownloadManager.Get();
      if (this.IsPreDownloadAvailable() && e.IsDownloading()) {
        this.PausePreDownload(2);
      }
    };
    this.UCc = () => {
      var e = new LogReportDefine_1.PreDownloadDownloadModeSuccessRecord(this.xCc === 1 ? 1 : 2);
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PreDownload_Complete");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate);
      PreDownloadManager_1.PreDownloadManager.Get().RemoveCompleteEvent(this.UCc);
    };
    this.Heu = () => {
      PreDownloadManager_1.PreDownloadManager.Get().TryRemoveTick();
      LauncherLog_1.LauncherLog.Info("OnPreDownloadEnable And RemoveTick");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreDownloadAvailableUpdate);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate);
    };
  }
  GetHasStartDownload() {
    return this.PCc;
  }
  SetDownloadMode(e) {
    this.xCc = e;
  }
  GetDownloadMode() {
    return this.xCc;
  }
  OnInit() {
    this.AddEvents();
    this.Cbc = new PreDownloadNoView();
    return true;
  }
  OnClear() {
    this.RemoveEvents();
    var e = PreDownloadManager_1.PreDownloadManager.Get();
    e.RemoveCompleteEvent(this.UCc);
    e.Stop();
    return !(this.Cbc = undefined);
  }
  AddEvents() {
    ModelManager_1.ModelManager.ReConnectModel.NetworkListener.NetworkChangeDelegate.Add(this.cso);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReConnectSuccess, this.DCc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReConnectFail, this.DCc);
  }
  RemoveEvents() {
    ModelManager_1.ModelManager.ReConnectModel.NetworkListener.NetworkChangeDelegate.Remove(this.cso);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReConnectSuccess, this.DCc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReConnectFail, this.DCc);
  }
  IsPreDownloadAvailable() {
    var e = PreDownloadManager_1.PreDownloadManager.Get();
    return (Info_1.Info.IsMobilePlatform() || Info_1.Info.IsPlayInEditor) && e.IsPreDownloadEnabled();
  }
  IsComplete() {
    return PreDownloadManager_1.PreDownloadManager.Get().IsComplete();
  }
  HasClickBtnCheck() {
    return this.IsPreDownloadAvailable() && !this.PCc;
  }
  StartPreDownload() {
    var e = PreDownloadManager_1.PreDownloadManager.Get();
    if (!this.PCc) {
      e.AddCompleteEvent(this.UCc);
    }
    this.PCc = true;
    var r = this.BCc();
    if (r) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate);
      e.Start(0);
    } else {
      r = e.GetDownloadSize() / BigInt(LauncherTextLib_1.NUMBER_MB);
      e = e.GetNeedSpace() / BigInt(LauncherTextLib_1.NUMBER_MB);
      e = new LogReportDefine_1.PreDownloadDownloadNoSpaceBeforeStartRecord(e + r);
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
      this.kCc();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate);
    }
  }
  ResumePreDownload() {
    var e = PreDownloadManager_1.PreDownloadManager.Get();
    if (this.PCc) {
      this.PCc = true;
      e.Resume();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate);
    } else {
      this.StartPreDownload();
    }
  }
  PausePreDownload(e) {
    if (e > 0) {
      e = new LogReportDefine_1.PreDownloadPauseRecord(e);
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    }
    PreDownloadManager_1.PreDownloadManager.Get().Stop();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate);
  }
  SwitchResumeOrPause() {
    if (PreDownloadManager_1.PreDownloadManager.Get().IsDownloading()) {
      this.PausePreDownload(1);
    } else if (this.BCc()) {
      this.ResumePreDownload();
    } else {
      this.kCc();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate);
    }
  }
  SwitchDownloadMode() {
    var e;
    if (this.xCc === 0) {
      if (UiManager_1.UiManager.IsViewShow("PreDownloadView")) {
        this.SetDownloadMode(1);
      }
    } else {
      this.SetDownloadMode(0);
    }
    if (UiManager_1.UiManager.IsViewShow("PreDownloadView")) {
      e = new LogReportDefine_1.PreDownloadDownloadModeSwitchRecord(this.xCc === 1 ? 1 : 2);
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate);
    }
  }
  BCc() {
    var e = PreDownloadManager_1.PreDownloadManager.Get();
    var r = UE.KuroLauncherLibrary.GameSavedDir();
    var n = (0, puerts_1.$ref)(0n);
    UE.KuroLauncherLibrary.GetTotalAndFreeSpace(r, n);
    var r = (0, puerts_1.$unref)(n);
    return e.GetNeedSpace() + 10n * 1024n * 1024n <= r;
  }
  kCc() {
    var e;
    var r;
    var n = PreDownloadManager_1.PreDownloadManager.Get();
    if (UiManager_1.UiManager.IsViewShow("PreDownloadView")) {
      e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(268);
      r = (n.GetDownloadSize() / BigInt(1048576)).toString() + "MB";
      n = (n.GetNeedSpace() / BigInt(1048576)).toString() + "MB";
      e.SetTextArgs(r, n);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    } else {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PreDownload_NoSpace");
    }
  }
  IsBinPatching() {
    return this.HCc;
  }
  ClearView() {
    PreDownloadManager_1.PreDownloadManager.Get().SetView(this.Cbc);
  }
  OnUpdateDownData(e, r, n, o, t, i) {
    this.HCc = false;
    this.UpdateData ||= new PreDownloadDefine_1.UpdateDownData();
    this.UpdateData.NeedWait = e;
    this.UpdateData.Rate = r;
    this.UpdateData.FileName = n;
    this.UpdateData.SpeedText = o;
    this.UpdateData.SizeCurrent = t;
    this.UpdateData.SizeTotal = i;
  }
  OnBinPatch(e, r, n, ...o) {
    this.BinPatch ||= new PreDownloadDefine_1.BinPatchData();
    this.BinPatch.NeedWait = e;
    this.BinPatch.Rate = r;
    this.BinPatch.TextId = n;
    this.BinPatch.Args = o;
    this.HCc = true;
  }
  AddEnableCheck() {
    PreDownloadManager_1.PreDownloadManager.Get().AddEnabledEvent(this.Heu);
    LauncherLog_1.LauncherLog.Info("On PreDownload AddEnabledEvent");
  }
}
exports.PreDownloadModel = PreDownloadModel;
//# sourceMappingURL=PreDownloadModel.js.map