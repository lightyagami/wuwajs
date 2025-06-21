"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestResourceModel = void 0;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  QuestRefVideoConfigAll_1 = require("../../../../Core/Define/ConfigQuery/QuestRefVideoConfigAll"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  Net_1 = require("../../../../Core/Net/Net"),
  VideoResUpdate_1 = require("../../../../Launcher/DiffPatch/Update/VideoResUpdate"),
  AppUtil_1 = require("../../../../Launcher/Update/AppUtil"),
  VideoUpdateManager_1 = require("../../../../Launcher/Update/VideoUpdateManager"),
  LauncherStorageLib_1 = require("../../../../Launcher/Util/LauncherStorageLib"),
  LauncherTextLib_1 = require("../../../../Launcher/Util/LauncherTextLib"),
  ProcedureUtil_1 = require("../../../../Launcher/Util/ProcedureUtil"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  LogReportDefine_1 = require("../../LogReport/LogReportDefine");
class QuestResourceUpdateProxy {
  async ShowNotEnoughSpaceConfirmation(s) {
    var e = new LogReportDefine_1.DownloadVideoResNotEnoughSpaceLogData,
      o = (e.i_popup_type = 2, e.b_if_storage_alert = !0, e.i_required_space = Number(s) / LauncherTextLib_1.NUMBER_MB, VideoResUpdate_1.VideoResUpdate.GetFreeSpace());
    return e.i_remaining_space = Number(o) / LauncherTextLib_1.NUMBER_MB, ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e), ModelManager_1.ModelManager.QuestResourceModel.SetIsReportDownloadNotEnoughSpace(!0), ModelManager_1.ModelManager.QuestResourceModel.SetIsDownloadNotEnoughSpaceError(!0), new Promise(e => {
      var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(321),
        t = () => {
          e(!1), AppUtil_1.AppUtil.QuitGame("DownloadVideo")
        },
        r = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(s);
      o.SetTextArgs(r), o.FunctionMap.set(2, () => {
        e(!0)
      }), o.FunctionMap.set(1, t), o.FunctionMap.set(0, t), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(o)
    })
  }
  UpdatePatchProgress(e, o, t, r) {}
}
class QuestResourceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.hF1 = new Map, this.lF1 = new Map, this.aQ1 = !1, this.Mnu = 0, this.UserClickPromise = void 0, this.UserDownloadSucPromise = void 0, this.UserClickOutOfMemoryViewPromise = void 0, this.UserClickNetWorkErrorPromise = void 0, this.aa1 = new Set, this.bZ1 = void 0, this.RZ1 = !1, this.V_u = void 0, this.Gro = () => {
      this.Enu(), this.UpdateToServerResState()
    }, this.Enu = () => {
      var e = new Map,
        o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      for (const s of this.lF1) {
        var t = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(s[0]);
        if (0 === o && this.aa1.has(s[0]) || t)
          for (const i of s[1]) e.set(i, !0)
      }
      for (const a of this.hF1) {
        var r = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(a[0]);
        if (1 === o && this.aa1.has(a[0]) || r)
          for (const n of a[1]) e.set(n, !0)
      }
      Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "本地保存已完成任务资源", ["finishedSave", e]), LauncherStorageLib_1.LauncherStorageLib.SetGlobal(LauncherStorageLib_1.ELauncherStorageGlobalKey.UserFinishedVideoList, e)
    }
  }
  get IsSeparateVideo() {
    return VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo()
  }
  OnInit() {
    if (VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo()) {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("QuestResource", 38, "任务资源初始化");
      var e = QuestRefVideoConfigAll_1.configQuestRefVideoConfigAll.GetConfigList();
      if (!e) return Log_1.Log.CheckError() && Log_1.Log.Error("QuestResource", 38, "找不到任务视频对照配置"), !1;
      var o, t = new Set,
        r = new Set;
      for (const s of e) 0 === s.GirlOrBoy ? (this.lF1.has(s.QuestId) ? this.lF1.get(s.QuestId).push(s.PakName) : ((o = new Array).push(s.PakName), this.lF1.set(s.QuestId, o)), s.PakName.endsWith("2") || r.add(s.PakName)) : 1 === s.GirlOrBoy && (this.hF1.has(s.QuestId) ? this.hF1.get(s.QuestId).push(s.PakName) : ((o = new Array).push(s.PakName), this.hF1.set(s.QuestId, o)), s.PakName.endsWith("2") || t.add(s.PakName));
      VideoResUpdate_1.VideoResUpdate.SetAllSpecialVideoResPak(3, [...r]), VideoResUpdate_1.VideoResUpdate.SetAllSpecialVideoResPak(4, [...t]), VideoResUpdate_1.VideoResUpdate.CheckVideoManifestsData(), this.Mnu = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(LauncherStorageLib_1.ELauncherStorageDeviceKey.UserFirstSelectedVideoUpdate, 0), Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "用户最初选择任务资源状态", ["state", this.Mnu]), 2 === this.Mnu && EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestFinishListNotify, this.Gro)
    }
    return !0
  }
  OnClear() {
    return VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo() && 2 === this.Mnu && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestFinishListNotify, this.Gro), !0
  }
  ClearCheckQuests() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("QuestResource", 38, "清理检查数据"), this.aa1.clear()
  }
  FillCheckQuests(e) {
    this.aa1.clear(), e.forEach(e => {
      this.aa1.add(e)
    }), Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "收到登录任务通知，填充任务视频检查数据", ["questIds", this.aa1])
  }
  J61() {
    var e = new Set,
      o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (0 === o)
      for (const s of this.aa1) {
        var t = this.lF1.get(s);
        if (t)
          for (const i of t) e.add(i)
      } else if (1 === o)
        for (const a of this.aa1) {
          var r = this.hF1.get(a);
          if (r)
            for (const n of r) e.add(n)
        }
    return 0 < e.size ? [...e] : []
  }
  NeedCheckQuestResource() {
    var e, o;
    return 0 < this.aa1.size && (e = this.J61(), [, e, o] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames(e), e !== o)
  }
  UserClicked() {
    this.UserClickPromise ? this.UserClickPromise.SetResult() : Log_1.Log.CheckError() && Log_1.Log.Error("QuestResource", 38, "检查任务数据点击回调错误")
  }
  UserDownloadSuc() {
    this.UserDownloadSucPromise ? this.UserDownloadSucPromise.SetResult() : Log_1.Log.CheckError() && Log_1.Log.Error("QuestResource", 38, "检查任务下载回调错误")
  }
  UserClickOutOfMemoryView(e) {
    this.UserClickOutOfMemoryViewPromise ? this.UserClickOutOfMemoryViewPromise.SetResult(e) : Log_1.Log.CheckError() && Log_1.Log.Error("QuestResource", 38, "检查任务硬盘不足回调错误")
  }
  UserClickNetWorkError(e) {
    this.UserClickNetWorkErrorPromise ? this.UserClickNetWorkErrorPromise.SetResult(e) : Log_1.Log.CheckError() && Log_1.Log.Error("QuestResource", 38, "检查任务网络异常回调错误")
  }
  SetIsDownloadNotEnoughSpaceError(e) {
    this.RZ1 = e
  }
  SetIsReportDownloadNotEnoughSpace(e) {
    this.V_u = e
  }
  async CheckQuestResource() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "登录后，尝试检查任务数据");
    var e = [];
    this.UserClickPromise = new CustomPromise_1.CustomPromise, this.UserDownloadSucPromise = new CustomPromise_1.CustomPromise, e.push(this.UserDownloadSucPromise.Promise), e.push(this.UserClickPromise.Promise), this.TryCheckQuestResource(), UiManager_1.UiManager.OpenView("ResDownLoadLoadingView"), await Promise.all(e), this.UserClickPromise = void 0, this.UserDownloadSucPromise = void 0
  }
  UpdateServerQuestState() {
    var e;
    0 !== this.aa1.size && (e = Protocol_1.Aki.Protocol.lru.create({
      a2s: [...this.aa1]
    }), Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "通知服务器登录任务下载完成", ["LoginQuests", this.aa1]), Net_1.Net.Call(18651, e, e => {
      e && e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 26131)
    }))
  }
  async TryCheckQuestResource() {
    if (0 === this.aa1.size) Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "没有任务需要检查");
    else {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("QuestResource", 38, "尝试检查任务数据，开始检查");
      const n = this.J61();
      if (0 === n.length) Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "没有任务需要检查");
      else {
        VideoResUpdate_1.VideoResUpdate.SetVideoResPak(5, [...n]);
        const d = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
        let a = void 0;
        a = 0 === d ? VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3) : VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4);
        Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "开始 下载缺失视频"), void 0 === this.bZ1 && (this.bZ1 = new QuestResourceUpdateProxy), this.SetIsDownloadNotEnoughSpaceError(!1), await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(async () => {
          var [, e, o] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames([...n]), o = (VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(5).SetDownLoadProgress(o, e), VideoResUpdate_1.VideoResUpdate.SetVideoResSize(5, e), this.SetIsReportDownloadNotEnoughSpace(!1), await a.Update(5, this.bZ1)), e = new LogReportDefine_1.DownloadVideoResLogData, [t, r, s, i] = (e.i_task_id = 0, e.b_if_storage_alert = this.V_u || !1, 0 === d ? (e.i_role_id = 2, e.i_resource_type = 2) : (e.i_role_id = 1, e.i_resource_type = 1), VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(5).GetReportLogData());
          return e.i_peak_speed = t, e.i_resource_size = r, e.i_download_time = s, e.b_if_storage_alert = i, e.i_download_status = 1, ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e), a.ResetDownLoadState(), o && this.UserDownloadSuc(), {
            Success: o
          }
        }, async (e, o) => {
          if (this.RZ1) return this.SetIsDownloadNotEnoughSpaceError(!1), o();
          this.UserClickNetWorkErrorPromise = new CustomPromise_1.CustomPromise;
          var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(318),
            t = (t.FunctionMap.set(0, () => {
              this.UserClickNetWorkError(!1)
            }), t.FunctionMap.set(1, () => {
              this.UserClickNetWorkError(!1)
            }), t.FunctionMap.set(2, () => {
              this.UserClickNetWorkError(!0)
            }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(t), await this.UserClickNetWorkErrorPromise.Promise);
          return this.UserClickNetWorkErrorPromise = void 0, t ? o() : (AppUtil_1.AppUtil.QuitGame("DownloadVideoFailed"), {
            Success: !0
          })
        }), this.bZ1 = void 0, Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "结束 下载缺失视频")
      }
    }
  }
  CalcPrepareResource() {
    if (VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo()) {
      var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      if (!this.aQ1) {
        var o = new Set;
        for (const _ of this.lF1) {
          var t = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(_[0]),
            r = 0 === e && this.aa1.has(_[0]);
          if (!t && !r)
            for (const u of _[1]) o.add(u)
        }
        var [, s, i] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames([...o]), a = (VideoResUpdate_1.VideoResUpdate.SetVideoResSize(3, s), VideoResUpdate_1.VideoResUpdate.SetVideoResSavedSize(3, i), VideoResUpdate_1.VideoResUpdate.SetVideoResPak(3, [...o]), 0 === VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).GetDownLoadState() && VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).SetDownLoadProgress(i, s), Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "VideoDown CalcPrepareRes Female", ["needSize", s], ["savedSize", i]), new Set);
        for (const h of this.hF1) {
          var n = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(h[0]),
            d = 1 === e && this.aa1.has(h[0]);
          if (!n && !d)
            for (const c of h[1]) a.add(c)
        }
        var [, s, i] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames([...a]);
        VideoResUpdate_1.VideoResUpdate.SetVideoResSize(4, s), VideoResUpdate_1.VideoResUpdate.SetVideoResSavedSize(4, i), VideoResUpdate_1.VideoResUpdate.SetVideoResPak(4, [...a]), 0 === VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).GetDownLoadState() && VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).SetDownLoadProgress(i, s), Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "VideoDown CalcPrepareRes Male", ["needSize", s], ["savedSize", i]), this.aQ1 = !0
      }
    }
  }
  RefreshCachePrepareResourceSize() {
    this.aQ1 = !1
  }
  UpdateToServerResState() {
    this.RefreshCachePrepareResourceSize(), this.CalcPrepareResource();
    var e = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(4),
      o = VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(4),
      t = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(3),
      r = VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(3);
    let s = 2;
    e === o && t === r ? s = 1 : e === o ? s = 4 : t === r && (s = 3), LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(LauncherStorageLib_1.ELauncherStorageDeviceKey.UserSelectedVideoUpdate, s), Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "登录后上报服务器本地资源状态", ["ResState", s]), 2 !== s && (e = Protocol_1.Aki.Protocol.g61.create({
      xN1: s
    }), Net_1.Net.Call(28715, e, e => {
      e && Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "计算出新状态后通知服务器任务资源状态改变", ["新状态", s])
    }))
  }
}
exports.QuestResourceModel = QuestResourceModel;
//# sourceMappingURL=QuestResourceModel.js.map