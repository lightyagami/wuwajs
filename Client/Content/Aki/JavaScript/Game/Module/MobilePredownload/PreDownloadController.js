"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreDownloadController = undefined;
const LauncherConfigLib_1 = require("../../../Launcher/Define/LauncherConfigLib");
const PreDownloadManager_1 = require("../../../Launcher/PreDownload/PreDownloadManager");
const RemoteConfig_1 = require("../../../Launcher/RemoteConfig");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
class PreDownloadController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return true;
  }
  static OnClear() {
    return true;
  }
  static OnAddEvents() {}
  static OnRemoveEvents() {}
  static OnPreDownloadBtnClick(e) {
    if (PreDownloadManager_1.PreDownloadManager.Get().IsComplete()) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PreDownload_Complete");
    } else {
      e = new LogReportDefine_1.PreDownloadEntranceRecord(e ? 1 : 2);
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
      if (ModelManager_1.ModelManager.PreDownloadModel.GetHasStartDownload()) {
        PreDownloadController.RCc();
      } else {
        PreDownloadController.ACc();
      }
    }
  }
  static ACc() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(264);
    var o = PreDownloadManager_1.PreDownloadManager.Get();
    var r = o.GetDownloadSize();
    var n = (r / BigInt(1048576)).toString() + "MB";
    var o = ((o.GetNeedSpace() + r) / BigInt(1048576)).toString() + "MB";
    e.FunctionMap.set(2, () => {
      PreDownloadController.RCc();
    });
    e.SetTextArgs(n, o);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  static RCc() {
    var e;
    if (RemoteConfig_1.RemoteInfo.PreVerConfig) {
      e = RemoteConfig_1.RemoteInfo.PreVerConfig.PackageVersion;
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.PreDownloadVersionRecord, e);
    }
    UiManager_1.UiManager.OpenView("PreDownloadView");
  }
  static ClosePreDownloadView() {
    UiManager_1.UiManager.CloseView("PreDownloadView");
    if (PreDownloadManager_1.PreDownloadManager.Get().IsDownloading()) {
      ModelManager_1.ModelManager.PreDownloadModel.SetDownloadMode(0);
    }
  }
  static OnCellNetTypeChanged() {
    var e;
    if (UiManager_1.UiManager.IsViewShow("PreDownloadView")) {
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(267)).FunctionMap.set(1, () => {
        if (!ModelManager_1.ModelManager.PreDownloadModel.GetHasStartDownload() && UiManager_1.UiManager.IsViewShow("PreDownloadView")) {
          UiManager_1.UiManager.CloseView("PreDownloadView");
        }
      });
      e.FunctionMap.set(2, () => {
        ModelManager_1.ModelManager.PreDownloadModel.ResumePreDownload();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    } else {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PreDownload_ChangeCellNet");
    }
  }
  static GetLocalText(e, ...o) {
    e = LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(e);
    if (e === undefined) {
      return "";
    }
    let r = e;
    if (o) {
      for (let e = 0; e < o.length; e++) {
        var n = o[e];
        var a = `{${e}}`;
        r = r.split(a).join(n);
      }
    }
    return r;
  }
}
exports.PreDownloadController = PreDownloadController;
//# sourceMappingURL=PreDownloadController.js.map