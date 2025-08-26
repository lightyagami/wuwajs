"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestResourceModel = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const QuestRefVideoConfigAll_1 = require("../../../../Core/Define/ConfigQuery/QuestRefVideoConfigAll");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const Net_1 = require("../../../../Core/Net/Net");
const VideoResUpdate_1 = require("../../../../Launcher/DiffPatch/Update/VideoResUpdate");
const AppUtil_1 = require("../../../../Launcher/Update/AppUtil");
const VideoUpdateManager_1 = require("../../../../Launcher/Update/VideoUpdateManager");
const LauncherStorageLib_1 = require("../../../../Launcher/Util/LauncherStorageLib");
const LauncherTextLib_1 = require("../../../../Launcher/Util/LauncherTextLib");
const ProcedureUtil_1 = require("../../../../Launcher/Util/ProcedureUtil");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
class QuestResourceUpdateProxy {
  async ShowNotEnoughSpaceConfirmation(s) {
    var e = new LogReportDefine_1.DownloadVideoResNotEnoughSpaceLogData();
    e.i_popup_type = 2;
    e.b_if_storage_alert = true;
    e.i_required_space = Number(s) / LauncherTextLib_1.NUMBER_MB;
    var o = VideoResUpdate_1.VideoResUpdate.GetFreeSpace();
    e.i_remaining_space = Number(o) / LauncherTextLib_1.NUMBER_MB;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    ModelManager_1.ModelManager.QuestResourceModel.SetIsReportDownloadNotEnoughSpace(true);
    ModelManager_1.ModelManager.QuestResourceModel.SetIsDownloadNotEnoughSpaceError(true);
    return new Promise(e => {
      var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(321);
      var t = () => {
        e(false);
        AppUtil_1.AppUtil.QuitGame("DownloadVideo");
      };
      var r = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(s);
      o.SetTextArgs(r);
      o.FunctionMap.set(2, () => {
        e(true);
      });
      o.FunctionMap.set(1, t);
      o.FunctionMap.set(0, t);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(o);
    });
  }
  UpdatePatchProgress(e, o, t, r) {}
}
class QuestResourceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.GF1 = new Map();
    this.FF1 = new Map();
    this.KQ1 = false;
    this.f1u = 0;
    this.UserClickPromise = undefined;
    this.UserDownloadSucPromise = undefined;
    this.UserClickOutOfMemoryViewPromise = undefined;
    this.UserClickNetWorkErrorPromise = undefined;
    this.Aa1 = new Set();
    this.Qeu = undefined;
    this.Keu = false;
    this.Ypu = undefined;
    this.Gro = () => {
      this.g1u();
      this.UpdateToServerResState();
    };
    this.g1u = () => {
      var e = new Map();
      var o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      for (const s of this.FF1) {
        var t = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(s[0]);
        if (o === 0 && this.Aa1.has(s[0]) || t) {
          for (const i of s[1]) {
            e.set(i, true);
          }
        }
      }
      for (const a of this.GF1) {
        var r = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(a[0]);
        if (o === 1 && this.Aa1.has(a[0]) || r) {
          for (const n of a[1]) {
            e.set(n, true);
          }
        }
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("QuestResource", 38, "本地保存已完成任务资源", ["finishedSave", e]);
      }
      LauncherStorageLib_1.LauncherStorageLib.SetGlobal(LauncherStorageLib_1.ELauncherStorageGlobalKey.UserFinishedVideoList, e);
    };
  }
  get IsSeparateVideo() {
    return VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo();
  }
  OnInit() {
    if (VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("QuestResource", 38, "任务资源初始化");
      }
      var e = QuestRefVideoConfigAll_1.configQuestRefVideoConfigAll.GetConfigList();
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("QuestResource", 38, "找不到任务视频对照配置");
        }
        return false;
      }
      var o;
      var t = new Set();
      var r = new Set();
      for (const s of e) {
        if (s.GirlOrBoy === 0) {
          if (this.FF1.has(s.QuestId)) {
            this.FF1.get(s.QuestId).push(s.PakName);
          } else {
            (o = new Array()).push(s.PakName);
            this.FF1.set(s.QuestId, o);
          }
          if (!s.PakName.endsWith("2")) {
            r.add(s.PakName);
          }
        } else if (s.GirlOrBoy === 1) {
          if (this.GF1.has(s.QuestId)) {
            this.GF1.get(s.QuestId).push(s.PakName);
          } else {
            (o = new Array()).push(s.PakName);
            this.GF1.set(s.QuestId, o);
          }
          if (!s.PakName.endsWith("2")) {
            t.add(s.PakName);
          }
        }
      }
      VideoResUpdate_1.VideoResUpdate.SetAllSpecialVideoResPak(3, [...r]);
      VideoResUpdate_1.VideoResUpdate.SetAllSpecialVideoResPak(4, [...t]);
      VideoResUpdate_1.VideoResUpdate.CheckVideoManifestsData();
      this.f1u = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(LauncherStorageLib_1.ELauncherStorageDeviceKey.UserFirstSelectedVideoUpdate, 0);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("QuestResource", 38, "用户最初选择任务资源状态", ["state", this.f1u]);
      }
      if (this.f1u === 2) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestFinishListNotify, this.Gro);
      }
    }
    return true;
  }
  OnClear() {
    if (VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo() && this.f1u === 2) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestFinishListNotify, this.Gro);
    }
    return true;
  }
  ClearCheckQuests() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("QuestResource", 38, "清理检查数据");
    }
    this.Aa1.clear();
  }
  FillCheckQuests(e) {
    this.Aa1.clear();
    e.forEach(e => {
      this.Aa1.add(e);
    });
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 38, "收到登录任务通知，填充任务视频检查数据", ["questIds", this.Aa1]);
    }
  }
  D51() {
    var e = new Set();
    var o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (o === 0) {
      for (const s of this.Aa1) {
        var t = this.FF1.get(s);
        if (t) {
          for (const i of t) {
            e.add(i);
          }
        }
      }
    } else if (o === 1) {
      for (const a of this.Aa1) {
        var r = this.GF1.get(a);
        if (r) {
          for (const n of r) {
            e.add(n);
          }
        }
      }
    }
    if (e.size > 0) {
      return [...e];
    } else {
      return [];
    }
  }
  NeedCheckQuestResource() {
    var e;
    var o;
    return this.Aa1.size > 0 && (e = this.D51(), [, e, o] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames(e), e !== o);
  }
  UserClicked() {
    if (this.UserClickPromise) {
      this.UserClickPromise.SetResult();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("QuestResource", 38, "检查任务数据点击回调错误");
    }
  }
  UserDownloadSuc() {
    if (this.UserDownloadSucPromise) {
      this.UserDownloadSucPromise.SetResult();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("QuestResource", 38, "检查任务下载回调错误");
    }
  }
  UserClickOutOfMemoryView(e) {
    if (this.UserClickOutOfMemoryViewPromise) {
      this.UserClickOutOfMemoryViewPromise.SetResult(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("QuestResource", 38, "检查任务硬盘不足回调错误");
    }
  }
  UserClickNetWorkError(e) {
    if (this.UserClickNetWorkErrorPromise) {
      this.UserClickNetWorkErrorPromise.SetResult(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("QuestResource", 38, "检查任务网络异常回调错误");
    }
  }
  SetIsDownloadNotEnoughSpaceError(e) {
    this.Keu = e;
  }
  SetIsReportDownloadNotEnoughSpace(e) {
    this.Ypu = e;
  }
  async CheckQuestResource() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 38, "登录后，尝试检查任务数据");
    }
    var e = [];
    this.UserClickPromise = new CustomPromise_1.CustomPromise();
    this.UserDownloadSucPromise = new CustomPromise_1.CustomPromise();
    e.push(this.UserDownloadSucPromise.Promise);
    e.push(this.UserClickPromise.Promise);
    this.TryCheckQuestResource();
    UiManager_1.UiManager.OpenView("ResDownLoadLoadingView");
    await Promise.all(e);
    this.UserClickPromise = undefined;
    this.UserDownloadSucPromise = undefined;
  }
  UpdateServerQuestState() {
    var e;
    if (this.Aa1.size !== 0) {
      e = Protocol_1.Aki.Protocol.uau.create({
        a2s: [...this.Aa1]
      });
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("QuestResource", 38, "通知服务器登录任务下载完成", ["LoginQuests", this.Aa1]);
      }
      Net_1.Net.Call(23114, e, e => {
        if (e && e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 22110);
        }
      });
    }
  }
  async TryCheckQuestResource() {
    if (this.Aa1.size === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("QuestResource", 38, "没有任务需要检查");
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("QuestResource", 38, "尝试检查任务数据，开始检查");
      }
      const n = this.D51();
      if (n.length === 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 38, "没有任务需要检查");
        }
      } else {
        VideoResUpdate_1.VideoResUpdate.SetVideoResPak(5, [...n]);
        const d = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
        let a = undefined;
        a = d === 0 ? VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3) : VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 38, "开始 下载缺失视频");
        }
        if (this.Qeu === undefined) {
          this.Qeu = new QuestResourceUpdateProxy();
        }
        this.SetIsDownloadNotEnoughSpaceError(false);
        await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(async () => {
          var [, e, o] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames([...n]);
          VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(5).SetDownLoadProgress(o, e);
          VideoResUpdate_1.VideoResUpdate.SetVideoResSize(5, e);
          this.SetIsReportDownloadNotEnoughSpace(false);
          var o = await a.Update(5, this.Qeu);
          var e = new LogReportDefine_1.DownloadVideoResLogData();
          e.i_task_id = 0;
          e.b_if_storage_alert = this.Ypu || false;
          if (d === 0) {
            e.i_role_id = 2;
            e.i_resource_type = 2;
          } else {
            e.i_role_id = 1;
            e.i_resource_type = 1;
          }
          var [t, r, s, i] = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(5).GetReportLogData();
          e.i_peak_speed = t;
          e.i_resource_size = r;
          e.i_download_time = s;
          e.b_if_storage_alert = i;
          e.i_download_status = 1;
          ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
          a.ResetDownLoadState();
          if (o) {
            this.UserDownloadSuc();
          }
          return {
            Success: o
          };
        }, async (e, o) => {
          if (this.Keu) {
            this.SetIsDownloadNotEnoughSpaceError(false);
            return o();
          }
          this.UserClickNetWorkErrorPromise = new CustomPromise_1.CustomPromise();
          var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(318);
          t.FunctionMap.set(0, () => {
            this.UserClickNetWorkError(false);
          });
          t.FunctionMap.set(1, () => {
            this.UserClickNetWorkError(false);
          });
          t.FunctionMap.set(2, () => {
            this.UserClickNetWorkError(true);
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(t);
          var t = await this.UserClickNetWorkErrorPromise.Promise;
          this.UserClickNetWorkErrorPromise = undefined;
          if (t) {
            return o();
          } else {
            AppUtil_1.AppUtil.QuitGame("DownloadVideoFailed");
            return {
              Success: true
            };
          }
        });
        this.Qeu = undefined;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 38, "结束 下载缺失视频");
        }
      }
    }
  }
  CalcPrepareResource() {
    if (VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo()) {
      var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      if (!this.KQ1) {
        var o = new Set();
        for (const _ of this.FF1) {
          var t = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(_[0]);
          var r = e === 0 && this.Aa1.has(_[0]);
          if (!t && !r) {
            for (const u of _[1]) {
              o.add(u);
            }
          }
        }
        var [, s, i] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames([...o]);
        VideoResUpdate_1.VideoResUpdate.SetVideoResSize(3, s);
        VideoResUpdate_1.VideoResUpdate.SetVideoResSavedSize(3, i);
        VideoResUpdate_1.VideoResUpdate.SetVideoResPak(3, [...o]);
        if (VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).GetDownLoadState() === 0) {
          VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).SetDownLoadProgress(i, s);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 38, "VideoDown CalcPrepareRes Female", ["needSize", s], ["savedSize", i]);
        }
        var a = new Set();
        for (const h of this.GF1) {
          var n = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(h[0]);
          var d = e === 1 && this.Aa1.has(h[0]);
          if (!n && !d) {
            for (const c of h[1]) {
              a.add(c);
            }
          }
        }
        var [, s, i] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames([...a]);
        VideoResUpdate_1.VideoResUpdate.SetVideoResSize(4, s);
        VideoResUpdate_1.VideoResUpdate.SetVideoResSavedSize(4, i);
        VideoResUpdate_1.VideoResUpdate.SetVideoResPak(4, [...a]);
        if (VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).GetDownLoadState() === 0) {
          VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).SetDownLoadProgress(i, s);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 38, "VideoDown CalcPrepareRes Male", ["needSize", s], ["savedSize", i]);
        }
        this.KQ1 = true;
      }
    }
  }
  RefreshCachePrepareResourceSize() {
    this.KQ1 = false;
  }
  UpdateToServerResState() {
    this.RefreshCachePrepareResourceSize();
    this.CalcPrepareResource();
    var e = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(4);
    var o = VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(4);
    var t = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(3);
    var r = VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(3);
    let s = 2;
    if (e === o && t === r) {
      s = 1;
    } else if (e === o) {
      s = 4;
    } else if (t === r) {
      s = 3;
    }
    LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(LauncherStorageLib_1.ELauncherStorageDeviceKey.UserSelectedVideoUpdate, s);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 38, "登录后上报服务器本地资源状态", ["ResState", s]);
    }
    if (s !== 2) {
      e = Protocol_1.Aki.Protocol.Y61.create({
        l31: s
      });
      Net_1.Net.Call(17531, e, e => {
        if (e && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 38, "计算出新状态后通知服务器任务资源状态改变", ["新状态", s]);
        }
      });
    }
  }
}
exports.QuestResourceModel = QuestResourceModel;
//# sourceMappingURL=QuestResourceModel.js.map