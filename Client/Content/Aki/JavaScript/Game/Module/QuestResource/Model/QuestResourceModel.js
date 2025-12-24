"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestResourceModel = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const QuestRefVideoConfigAll_1 = require("../../../../Core/Define/ConfigQuery/QuestRefVideoConfigAll");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const VideoResUpdate_1 = require("../../../../Launcher/DiffPatch/Update/VideoResUpdate");
const AppUtil_1 = require("../../../../Launcher/Update/AppUtil");
const VideoUpdateManager_1 = require("../../../../Launcher/Update/VideoUpdateManager");
const LauncherStorageLib_1 = require("../../../../Launcher/Util/LauncherStorageLib");
const LauncherTextLib_1 = require("../../../../Launcher/Util/LauncherTextLib");
const ProcedureUtil_1 = require("../../../../Launcher/Util/ProcedureUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
class QuestResourceUpdateProxy {
  async ShowNotEnoughSpaceConfirmation(r) {
    var e = new LogReportDefine_1.DownloadVideoResNotEnoughSpaceLogData();
    e.i_popup_type = 2;
    e.b_if_storage_alert = true;
    e.i_required_space = Number(r) / LauncherTextLib_1.NUMBER_MB;
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
      var s = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(r);
      o.SetTextArgs(s);
      o.FunctionMap.set(2, () => {
        e(true);
      });
      o.FunctionMap.set(1, t);
      o.FunctionMap.set(0, t);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(o);
    });
  }
  UpdatePatchProgress(e, o, t, s) {}
}
class QuestResourceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.GF1 = new Map();
    this.FF1 = new Map();
    this.qkm = new Map();
    this.KQ1 = false;
    this.f1u = 0;
    this.UserClickPromise = undefined;
    this.UserDownloadSucPromise = undefined;
    this.UserClickOutOfMemoryViewPromise = undefined;
    this.UserClickNetWorkErrorPromise = undefined;
    this.LoginQuests = new Set();
    this.Qeu = undefined;
    this.uIm = 0;
    this.cIm = undefined;
    this.Keu = false;
    this.Ypu = undefined;
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
      var o = new Set();
      var t = new Set();
      for (const a of e) {
        if (a.GirlOrBoy === 0) {
          if (this.FF1.has(a.QuestId)) {
            this.FF1.get(a.QuestId).push(a.PakName);
          } else {
            (s = new Array()).push(a.PakName);
            this.FF1.set(a.QuestId, s);
          }
          if (!a.PakName.endsWith("2")) {
            t.add(a.PakName);
          }
        } else if (a.GirlOrBoy === 1) {
          if (this.GF1.has(a.QuestId)) {
            this.GF1.get(a.QuestId).push(a.PakName);
          } else {
            (s = new Array()).push(a.PakName);
            this.GF1.set(a.QuestId, s);
          }
          if (!a.PakName.endsWith("2")) {
            o.add(a.PakName);
          }
        }
        var s;
        var r;
        var i = Number(a.PakName.split("_")[0]);
        if (!isNaN(i)) {
          if (this.qkm.has(a.QuestId)) {
            this.qkm.get(a.QuestId).add(i);
          } else {
            (r = new Set()).add(i);
            this.qkm.set(a.QuestId, r);
          }
        }
      }
      VideoResUpdate_1.VideoResUpdate.SetAllSpecialVideoResPak(3, [...t]);
      VideoResUpdate_1.VideoResUpdate.SetAllSpecialVideoResPak(4, [...o]);
      VideoResUpdate_1.VideoResUpdate.CheckVideoManifestsData();
      this.f1u = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(LauncherStorageLib_1.ELauncherStorageDeviceKey.UserFirstSelectedVideoUpdate, 0);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("QuestResource", 38, "用户最初选择任务资源状态", ["state", this.f1u]);
      }
    }
    return true;
  }
  get FemaleQuestIdToPack() {
    return this.FF1;
  }
  get MaleQuestIdToPack() {
    return this.GF1;
  }
  get QuestIdToCgIds() {
    return this.qkm;
  }
  OnClear() {
    VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo();
    return true;
  }
  ClearCheckQuests() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("QuestResource", 38, "清理检查数据");
    }
    this.LoginQuests.clear();
  }
  FillCheckQuests(e) {
    this.LoginQuests.clear();
    e.forEach(e => {
      this.LoginQuests.add(e);
    });
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 38, "收到登录任务通知，填充任务视频检查数据", ["questIds", this.LoginQuests]);
    }
  }
  D51() {
    var e = new Set();
    var o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (o === 0) {
      for (const r of this.LoginQuests) {
        var t = this.FF1.get(r);
        if (t) {
          for (const i of t) {
            e.add(i);
          }
        }
      }
    } else if (o === 1) {
      for (const a of this.LoginQuests) {
        var s = this.GF1.get(a);
        if (s) {
          for (const n of s) {
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
  GetLoginQuestsMp4Ids() {
    var e = this.D51();
    var o = new Set();
    for (const s of e) {
      var t = Number(s.split("_")[0]);
      if (!isNaN(t)) {
        o.add(t);
      }
    }
    return [...o];
  }
  NeedCheckQuestResource() {
    var e;
    var o;
    return this.LoginQuests.size > 0 && (e = this.D51(), [, e, o] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames(e), e !== o);
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
  dIm() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 39, "检查网络: 打开蜂窝网络下载同意弹窗");
    }
    if (this.cIm?.IsPending()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("QuestResource", 39, "检查网络: 已存在蜂窝网络下载同意弹窗的Promise, 不重复打开");
      }
    } else {
      this.cIm = new CustomPromise_1.CustomPromise();
      const t = () => {
        var e;
        this.uIm = 0;
        if (this.cIm?.IsPending()) {
          e = this.cIm;
          this.cIm = undefined;
          e.SetResult(false);
        }
      };
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(396);
      e.FunctionMap.set(0, t);
      e.FunctionMap.set(1, t);
      e.FunctionMap.set(2, () => {
        var e;
        this.uIm = 0;
        if (this.cIm?.IsPending()) {
          VideoResUpdate_1.VideoResUpdate.SetIsAllowCellDownload(true);
          e = this.cIm;
          this.cIm = undefined;
          e.SetResult(true);
        }
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e, (e, o) => {
        if (e) {
          if (this.cIm?.IsPending()) {
            this.uIm = o;
          } else {
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseNetWorkConfirmBoxView(o);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("QuestResource", 39, "检查网络: 蜂窝网络下载同意弹窗打开失败");
          }
          t();
        }
      });
    }
  }
  mIm(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 39, "检查网络: 程序主动关闭蜂窝网络下载同意弹窗", ["bConfirm", e]);
    }
    var o = this.cIm;
    this.cIm = undefined;
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseNetWorkConfirmBoxView(this.uIm);
    o?.SetResult(e);
  }
  async fIm() {
    if (this.cIm) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("QuestResource", 39, "检查网络：等待用户确认蜂窝网络下载");
      }
      if (!(await this.cIm.Promise)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 39, "检查网络：用户拒绝蜂窝网络下载");
        }
        return false;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("QuestResource", 39, "检查网络：用户同意蜂窝网络下载");
      }
    }
    return true;
  }
  async TryCheckQuestResource() {
    if (this.LoginQuests.size === 0) {
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
        const u = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
        let a = undefined;
        a = u === 0 ? VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3) : VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4);
        const d = () => {
          if (this.cIm?.IsPending()) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("QuestResource", 39, "检查网络：已有开启中的蜂窝网络下载同意弹窗，再次检测");
            }
            if (!VideoResUpdate_1.VideoResUpdate.GetIsCellNetworkType() || !!VideoResUpdate_1.VideoResUpdate.GetIsAllowCellDownload()) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("QuestResource", 39, "检查网络：再次检测后可以继续下载，关闭蜂窝网络下载同意弹窗");
              }
              this.mIm(true);
            }
          } else if (VideoResUpdate_1.VideoResUpdate.GetIsCellNetworkType() && !VideoResUpdate_1.VideoResUpdate.GetIsAllowCellDownload()) {
            this.dIm();
            a?.Pause();
          }
        };
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
          d();
          if (this.cIm?.IsPending()) {
            return {
              Success: false
            };
          }
          VideoResUpdate_1.VideoResUpdate.ResetNetworkTypeRecord();
          VideoResUpdate_1.VideoResUpdate.SetCallbackOnNetworkTypeChange(d);
          var o = await a.Update(5, this.Qeu);
          var e = new LogReportDefine_1.DownloadVideoResLogData();
          e.i_task_id = 0;
          e.b_if_storage_alert = this.Ypu || false;
          if (u === 0) {
            e.i_role_id = 2;
            e.i_resource_type = 2;
          } else {
            e.i_role_id = 1;
            e.i_resource_type = 1;
          }
          var [t, s, r, i] = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(5).GetReportLogData();
          e.i_peak_speed = t;
          e.i_resource_size = s;
          e.i_download_time = r;
          e.b_if_storage_alert = i;
          e.i_download_status = 1;
          ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
          VideoResUpdate_1.VideoResUpdate.ResetNetworkTypeRecord();
          a.ResetDownLoadState();
          if (o) {
            this.UserDownloadSuc();
          }
          return {
            Success: o
          };
        }, async (e, o) => {
          if (this.cIm) {
            if (await this.fIm()) {
              return o();
            } else {
              AppUtil_1.AppUtil.QuitGame("DownloadVideoNotAllowedInCellNetwork");
              return {
                Success: true
              };
            }
          }
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
        for (const d of this.FF1) {
          var t = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(d[0]);
          var s = e === 0 && this.LoginQuests.has(d[0]);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("QuestResource", 70, "CalcPrepareResource Female", ["questId", d[0]], ["isQuestFinished", t], ["isLoginFinished", s]);
          }
          if (!t && !s) {
            for (const _ of d[1]) {
              o.add(_);
            }
          }
        }
        var [, r, i] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames([...o]);
        VideoResUpdate_1.VideoResUpdate.SetVideoResSize(3, r);
        VideoResUpdate_1.VideoResUpdate.SetVideoResSavedSize(3, i);
        VideoResUpdate_1.VideoResUpdate.SetVideoResPak(3, [...o]);
        if (VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).GetDownLoadState() === 0) {
          VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).SetDownLoadProgress(i, r);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 38, "VideoDown CalcPrepareRes Female", ["needSize", r], ["savedSize", i]);
        }
        var a = new Set();
        for (const h of this.GF1) {
          var n = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(h[0]);
          var u = e === 1 && this.LoginQuests.has(h[0]);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("QuestResource", 70, "CalcPrepareResource Male", ["questId", h[0]], ["isQuestFinished", n], ["isLoginFinished", u]);
          }
          if (!n && !u) {
            for (const c of h[1]) {
              a.add(c);
            }
          }
        }
        var [, r, i] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames([...a]);
        VideoResUpdate_1.VideoResUpdate.SetVideoResSize(4, r);
        VideoResUpdate_1.VideoResUpdate.SetVideoResSavedSize(4, i);
        VideoResUpdate_1.VideoResUpdate.SetVideoResPak(4, [...a]);
        if (VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).GetDownLoadState() === 0) {
          VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).SetDownLoadProgress(i, r);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 38, "VideoDown CalcPrepareRes Male", ["needSize", r], ["savedSize", i]);
        }
        this.KQ1 = true;
      }
    }
  }
  RefreshCachePrepareResourceSize() {
    this.KQ1 = false;
  }
  GetQuestRefPakNames(e, o) {
    let t = [];
    var s;
    if (o === 0 && (s = this.FF1.get(e))) {
      t = s;
    }
    if (o === 1 && (s = this.GF1.get(e))) {
      t = s;
    }
    if (o === 2 && ((s = this.GF1.get(e)) && (t = s), o = this.FF1.get(e))) {
      t = t.concat(o);
    }
    return Array.from(new Set(t));
  }
  GetQuestRefCgIds(e) {
    e = this.qkm.get(e);
    if (e) {
      return Array.from(e);
    } else {
      return [];
    }
  }
  FilterVideoByFinishedQuest(e) {
    var o;
    var t;
    var s = [];
    var r = new Set();
    for ([o, t] of this.qkm) {
      if (ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(o)) {
        for (const i of t) {
          r.add(i);
        }
      }
    }
    for (const a of e) {
      if (!r.has(a)) {
        s.push(a);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 70, "过滤已完成任务视频", ["inputVideos", e], ["outputVideos", s]);
    }
    return s;
  }
}
exports.QuestResourceModel = QuestResourceModel;
//# sourceMappingURL=QuestResourceModel.js.map