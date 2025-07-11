"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreDownloadView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Time_1 = require("../../../Core/Common/Time");
const NetworkDefine_1 = require("../../../Launcher/NetworkDefine");
const PreDownloadManager_1 = require("../../../Launcher/PreDownload/PreDownloadManager");
const LauncherLog_1 = require("../../../Launcher/Util/LauncherLog");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const PreDownloadDefine_1 = require("./PreDownloadDefine");
const BTN_INTERVAL = 1000;
class PreDownloadView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.L6e = undefined;
    this.Jn1 = 0;
    this.Qz = "";
    this.Zn1 = "";
    this.es1 = "";
    this.I5t = () => {
      var e;
      if (PreDownloadManager_1.PreDownloadManager.Get().IsDownloading()) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(307)).FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.PreDownloadController.ClosePreDownloadView();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        ControllerHolder_1.ControllerHolder.PreDownloadController.ClosePreDownloadView();
      }
    };
    this.qCc = () => {
      var e;
      if (!PreDownloadManager_1.PreDownloadManager.Get().IsComplete() && (e = BTN_INTERVAL, !this.L6e || Time_1.Time.Now - this.L6e >= e)) {
        this.L6e = Time_1.Time.Now;
        ModelManager_1.ModelManager.PreDownloadModel.SwitchResumeOrPause();
      }
    };
    this.GCc = (e = false) => {
      var o = PreDownloadManager_1.PreDownloadManager.Get();
      var r = o.IsComplete();
      var n = this.GetText(7);
      var o = o.IsDownloading();
      LauncherLog_1.LauncherLog.Info("get pre download state update", ["is complete", r], ["is downloading", o]);
      if (r) {
        const i = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(PreDownloadDefine_1.COMPLETE_TXT);
        n?.SetText(i);
        this.UpdatePatchDownProgress(false, this.Jn1, "", "0B/s", this.es1, this.es1).then(() => {
          var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(PreDownloadDefine_1.COMPLETE_TXT);
          this.GetText(6)?.SetText(e);
        });
      } else {
        const i = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(o ? PreDownloadDefine_1.PAUSING_TXT : PreDownloadDefine_1.DOWNLOADING_TXT);
        n?.SetText(i);
        if (!e && !o && !ModelManager_1.ModelManager.PreDownloadModel.IsBinPatching()) {
          this.UpdatePatchDownProgress(false, this.Jn1, this.Qz, "0B/s", this.Zn1, this.es1);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIText]];
    this.BtnBindInfo = [[0, this.I5t], [1, this.qCc]];
  }
  OnStart() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(PreDownloadDefine_1.PREVIEW_BGID);
    this.SetTextureByPath(e, this.GetTexture(5));
    PreDownloadManager_1.PreDownloadManager.Get().SetView(this);
  }
  OnBeforeShow() {
    this.L6e = undefined;
    this.QCc();
  }
  OnAfterShow() {
    if (!PreDownloadManager_1.PreDownloadManager.Get().IsDownloading()) {
      if (UE.KuroLauncherLibrary.GetNetworkConnectionType() === NetworkDefine_1.ENetworkType.Cell) {
        ControllerHolder_1.ControllerHolder.PreDownloadController.OnCellNetTypeChanged();
      } else if (!ModelManager_1.ModelManager.PreDownloadModel.GetHasStartDownload()) {
        ModelManager_1.ModelManager.PreDownloadModel.StartPreDownload();
        this.GCc();
      }
    }
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.PreDownloadModel.ClearView();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PreDownloadStateUpdate, this.GCc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PreDownloadStateUpdate, this.GCc);
  }
  async UpdatePatchDownProgress(e, o, r, n, i, a) {
    var t = PreDownloadManager_1.PreDownloadManager.Get().IsDownloading();
    ModelManager_1.ModelManager.PreDownloadModel?.OnUpdateDownData(e, o, r, t ? n : "0B/s", i, a);
    this.Jn1 = o;
    this.Qz = r;
    this.Zn1 = i;
    this.es1 = a;
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t ? "PreDownload_Downloading" : "PreDownload_IsPausing");
    this.GetText(6)?.SetText(e);
    this.GetTexture(2)?.SetFillAmount(o);
    this.GetText(4)?.SetText(r);
    e = `${t ? n : "0B/s"}(${i}/${a})  ${(o * 100).toFixed(2).toString()}%`;
    this.GetText(3)?.SetText(e);
    return new Promise(e => {
      e();
    });
  }
  async BinPatchProgress(e, o, r, ...n) {
    ModelManager_1.ModelManager.PreDownloadModel?.OnBinPatch(e, o, r, ...n);
    this.Jn1 = o;
    e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("PreDownload_BinPatch");
    this.GetText(6)?.SetText(e);
    this.GetTexture(2)?.SetFillAmount(o);
    this.GetText(4)?.SetText("");
    r = (o * 100).toFixed(2).toString() + "%";
    this.GetText(3)?.SetText(r);
    return new Promise(e => {
      e();
    });
  }
  async ShowDialog(e, o, r, n, i, a, ...t) {
    LauncherLog_1.LauncherLog.Info("PreDownload Get ShowDialog with ", ["contentId", r]);
    LauncherLog_1.LauncherLog.Info("PreDownload Get ShowDialog with Args", ["contentId", t]);
    if (i === "HotFixUseNetworkDownload") {
      return PreDownloadManager_1.PreDownloadManager.Get().IsDownloading();
    }
    o = ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(o);
    t = ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(r, ...t);
    const s = new CustomPromise_1.CustomPromise();
    var r = r === "HotFixNotEnoughSpace";
    ModelManager_1.ModelManager.PreDownloadModel.PausePreDownload(r ? 4 : 3);
    if (a) {
      (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(274)).SetTitle(o);
      r.SetTextArgs(t);
      r.SetBtnText(0, ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(a));
      r.FunctionMap.set(1, () => {
        s.SetResult(true);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
    } else {
      (a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(275)).SetTitle(o);
      a.SetTextArgs(t);
      a.SetBtnText(0, ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(n));
      a.SetBtnText(1, ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(i));
      a.FunctionMap.set(1, () => {
        s.SetResult(false);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreDownloadStateUpdate);
      });
      a.FunctionMap.set(2, () => {
        s.SetResult(true);
        ModelManager_1.ModelManager.PreDownloadModel.ResumePreDownload();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(a);
    }
    return s.Promise;
  }
  QCc() {
    this.GCc(true);
    var e;
    var o = ModelManager_1.ModelManager.PreDownloadModel.IsBinPatching();
    var r = this.GetText(6);
    var n = this.GetTexture(2);
    var i = this.GetText(4);
    var a = this.GetText(3);
    if (o && ModelManager_1.ModelManager.PreDownloadModel.BinPatch) {
      o = ModelManager_1.ModelManager.PreDownloadModel.BinPatch;
      e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("PreDownload_BinPatch");
      r?.SetText(e);
      n?.SetFillAmount(o.Rate);
      i?.SetText("");
      e = (o.Rate * 100).toFixed(2).toString() + "%";
      a?.SetText(e);
    } else if (ModelManager_1.ModelManager.PreDownloadModel.UpdateData) {
      o = ModelManager_1.ModelManager.PreDownloadModel.UpdateData;
      this.UpdatePatchDownProgress(false, o.Rate, o.FileName, o.SpeedText, o.SizeCurrent, o.SizeTotal);
    } else {
      r?.SetText("");
      n?.SetFillAmount(0);
      i?.SetText("");
      a?.SetText("");
    }
  }
}
exports.PreDownloadView = PreDownloadView;
//# sourceMappingURL=PreDownloadView.js.map