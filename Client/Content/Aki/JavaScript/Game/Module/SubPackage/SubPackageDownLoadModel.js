"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubPackageDownLoadModel = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate");
const ResourceUpdateManager_1 = require("../../../Launcher/Update/ResourceDiffUpdate/ResourceUpdateManager");
const VideoUpdateWrapper_1 = require("../../../Launcher/Update/ResourceDiffUpdate/Updater/VideoUpdateWrapper");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ReconnectDefine_1 = require("../ReConnect/ReconnectDefine");
const ResUpdateFactory_1 = require("../ResManager/ResUpdateFactory");
const SubPackageDefine_1 = require("./SubPackageDefine");
const GB_BYTES = 1073741824;
const MB_BYTES = 1048576;
class SubPackageDownLoadModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.VFm = new Map();
    this.jFm = new Map();
    this.HFm = new Map();
    this.XXm = new Map();
    this.$Fm = new Map();
    this.KeyPackageState = 4;
    this.KeyPackageStateId = 1;
    this.DownLoadingSubPackageId = 0;
    this.PauseSubPackageId = 0;
    this.SubPackageDownLoadList = [];
    this.KeyIncludeSubPackageList = [];
    this.HaveTipsOutOfSpaceList = [];
    this.QFm = false;
    this.OnDownloadFinish = (e, r) => {
      var a;
      var o = ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SubPackageDownLoad", 5, "SubPackage-OnDownloadFinish", ["state", e], ["updater", r.Name], ["downLoadingId", o]);
      }
      if (o) {
        if (e !== 4) {
          r.CalculateSizeInfo();
          if ((a = r.ViewInfo?.NotEnoughSpace) && !UiManager_1.UiManager.IsViewOpen("SubPackageDownLoadFreeSpaceTipsView")) {
            UiManager_1.UiManager.OpenView("SubPackageDownLoadFreeSpaceTipsView", o);
          }
          if (e !== 2) {
            ControllerHolder_1.ControllerHolder.SubPackageController.StopSubPackageDownLoading(o);
          }
          if (!a && !ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen() && !!UiManager_1.UiManager.IsViewOpen("LoginView")) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SubPackageDownLoad", 5, "在登录界面下载资源失败，原因不为空间不足，且没有打开其他确认框，打开保底确认框");
            }
            ControllerHolder_1.ControllerHolder.SubPackageController.ShowDownloadSubPackageNetFailedConfirm(o);
          }
        } else {
          ControllerHolder_1.ControllerHolder.SubPackageController.ReportSubPackageDownLoadLogEvent(o, 2, r);
          if (o === SubPackageDefine_1.KEY_SUBPACKAGE_ID) {
            ControllerHolder_1.ControllerHolder.SubPackageController.ReportSubPackageKeySubPackageLogEvent(r.SpendTime, 2);
          }
          ControllerHolder_1.ControllerHolder.SubPackageController.DownLoadFinish();
        }
      }
    };
    this.kso = undefined;
    this.iSf = 0;
  }
  OnInit() {
    this.KeyIncludeSubPackageList = [];
    this.HaveTipsOutOfSpaceList = [];
    for (const r of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageList() ?? []) {
      this.VFm.set(r.Id, 4);
      if (r.Type === 1) {
        this.KeyPackageStateId = r.Id;
      }
      if (r.Type === 2) {
        this.HFm.set(r.Id, r.Area);
        for (const a of r.Area) {
          this.XXm.set(a, r.Id);
        }
      }
      if (r.Type === 3) {
        var e = [];
        for (const o of ConfigManager_1.ConfigManager.SubPackageConfig.GetVideoDataByBranch(r.BelongBranch) ?? []) {
          e.push(o.CgId);
        }
        this.$Fm.set(r.Id, e);
      }
    }
    this.KeyPackageState = 4;
    this.DownLoadingSubPackageId = 0;
    this.SubPackageDownLoadList = [];
    return !(this.QFm = false);
  }
  async InitSubPackageDownLoadItemUpdater() {
    if (!this.QFm && ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      this.DTf();
      this.QFm = true;
      var n = [];
      let o = [];
      let t = [];
      for (const f of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageList() ?? []) {
        var i = f.Id;
        let e = [];
        if (this.jFm.has(i)) {
          e = this.jFm.get(i);
          return;
        }
        let r = false;
        var s = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(i);
        switch (s.Type) {
          case 1:
            [e, o, t] = await ResUpdateFactory_1.ResourceDiffUpdaterFactory.CreateLoginPrepareUpdaters();
            this.jFm.set(i, e);
            break;
          case 2:
            e.push(await ResUpdateFactory_1.ResourceDiffUpdaterFactory.CreateMapBlockUpdater(i.toString(), s.Area, i));
            this.jFm.set(i, e);
            for (const c of s.Area) {
              if (o.includes(c)) {
                r = true;
                break;
              }
            }
            break;
          case 3:
            if (VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo()) {
              var u = [];
              for (const d of ConfigManager_1.ConfigManager.SubPackageConfig.GetVideoDataByBranch(s.BelongBranch) ?? []) {
                if (!t.includes(d.CgId)) {
                  u.push(d.CgId);
                }
              }
              if (u.length <= 0) {
                r = true;
              }
              e.push(await ResUpdateFactory_1.ResourceDiffUpdaterFactory.CreateVideoUpdater(i.toString(), i, 6, u));
              this.jFm.set(i, e);
            }
            break;
          case 4:
            if (VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo()) {
              ModelManager_1.ModelManager.QuestResourceModel.CalcPrepareResource();
              if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1) {
                e.push(await ResUpdateFactory_1.ResourceDiffUpdaterFactory.CreateVideoUpdater(i.toString(), i, 3, []));
              } else {
                e.push(await ResUpdateFactory_1.ResourceDiffUpdaterFactory.CreateVideoUpdater(i.toString(), i, 4, []));
              }
              this.jFm.set(i, e);
            }
            break;
          default:
            return;
        }
        let a = true;
        for (const l of e) {
          l.AddOnDownloadFinish(e => {
            this.OnDownloadFinish(e, l);
          });
          if (!l.IsCompleteDownloaded()) {
            a = false;
            break;
          }
        }
        var g = r || a ? 5 : 4;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SubPackageDownLoad", 5, "SubPackage-InitSubPackageDownLoadItemUpdater", ["Id", s?.Id], ["isFinish", a], ["isKeyHave", r], ["state", g]);
        }
        if (s.Type === 1 && (a || r)) {
          this.KeyPackageState = g;
          n.push(...s.Area);
        } else if (s.Type === 2 && (a || r)) {
          n.push(...s.Area);
        }
        this.SetSubPackageDownLoadItemStateMap(i, g);
        if (r) {
          this.KeyIncludeSubPackageList.push(s.Id);
        }
      }
      ControllerHolder_1.ControllerHolder.SubPackageController.SceneBlockSplitClientLoginPush(n);
    }
  }
  DTf() {
    this.KeyIncludeSubPackageList = [];
    this.jFm.clear();
  }
  async InitGameCoreUpdater() {
    var e = await ResUpdateFactory_1.ResourceDiffUpdaterFactory.CreateCoreUpdaters();
    let r = true;
    for (const a of e) {
      a.AddOnDownloadFinish(e => {
        this.OnDownloadFinish(e, a);
      });
      if (!a.IsCompleteDownloaded()) {
        r = false;
        break;
      }
    }
    this.jFm.set(SubPackageDefine_1.KEY_SUBPACKAGE_ID, e);
    this.KeyPackageState = r ? 5 : 4;
    this.SetSubPackageDownLoadItemStateMap(SubPackageDefine_1.KEY_SUBPACKAGE_ID, this.KeyPackageState);
  }
  GetSubPackageDownLoadItemUpdater(e) {
    var r = this.jFm.get(e);
    return r || (Log_1.Log.CheckInfo() && Log_1.Log.Info("SubPackageDownLoad", 5, "获取分包下载器失败", ["id", e]), []);
  }
  GetSubPackageDownLoadItemStateById(r) {
    let a = this.VFm.get(r);
    if (!a) {
      var o = this.GetSubPackageDownLoadItemUpdater(r);
      if (!o || o.length <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SubPackageDownLoad", 5, "获取分包下载状态失败", ["id", r]);
        }
        return 4;
      }
      let e = true;
      for (const t of o) {
        if (t.ViewInfo.SavedSize !== t.ViewInfo.TotalSize) {
          e = false;
          break;
        }
      }
      a = e ? 5 : 4;
      this.SetSubPackageDownLoadItemStateMap(r, a);
    }
    return a;
  }
  GetSubPackageDownLoadVersionStateById(e) {
    let r = true;
    let a = false;
    let o = false;
    for (const n of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageListByVersion(e) ?? []) {
      var t = this.VFm.get(n.Id);
      if (t === 1) {
        return 1;
      }
      r = r && t === 5;
      a = a || t === 2;
      o = !a && (o || t === 3);
    }
    if (r) {
      return 5;
    } else if (a) {
      return 2;
    } else if (o) {
      return 3;
    } else {
      return 4;
    }
  }
  GetVersionShowArrowByType(e) {
    return e === 2;
  }
  IsKeyPackageDownLoading() {
    return this.KeyPackageState === 1;
  }
  IsKeyPackageDownLoadingPause() {
    return this.KeyPackageState === 2;
  }
  IsKeyPackageDownLoadingFinish() {
    return this.KeyPackageState === 5;
  }
  IsKeyPackageDownLoadingNone() {
    return this.KeyPackageState === 4;
  }
  GetKeyPackageDownLoadingFileName() {
    var e = this.GetSubPackageDownLoadItemUpdater(SubPackageDefine_1.KEY_SUBPACKAGE_ID);
    if (e) {
      for (const r of e) {
        if (r.ViewInfo.DownloadSpeed > 0) {
          return r.ViewInfo.FileName;
        }
      }
    }
    return "";
  }
  GetKeySubPackageData() {
    var e = [];
    var r = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
    r.Type = 2;
    e.push(r);
    var r = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadVersionByType(2) ?? [];
    for (const o of r) {
      var a = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
      a.VersionId = o.Version;
      e.push(a);
    }
    return e;
  }
  GetExpendSubPackageData() {
    var e = [];
    var r = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
    r.Type = 3;
    e.push(r);
    var r = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadVersionByType(3) ?? [];
    for (const o of r) {
      var a = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
      a.VersionId = o.Version;
      e.push(a);
    }
    return e;
  }
  SetSubPackageDownLoadItemStateMap(e, r) {
    if (e && (this.VFm.set(e, r), e === this.KeyPackageStateId && (this.KeyPackageState = r), r === 1 && (this.DownLoadingSubPackageId = e), r === 2)) {
      this.PauseSubPackageId = e;
    }
  }
  GetSubPackageSpace(e) {
    e = this.GetSubPackageDownLoadItemUpdater(e);
    if (!e) {
      return BigInt(0);
    }
    let r = BigInt(0);
    for (const a of e) {
      r += a.ViewInfo.TotalSize;
    }
    return r;
  }
  GetSubPackageCurrentTotalSpace(e) {
    e = this.GetSubPackageDownLoadItemUpdater(e);
    if (!e) {
      return BigInt(0);
    }
    let r = BigInt(0);
    for (const a of e) {
      r += a.ViewInfo.TotalProgress;
    }
    return r;
  }
  GetSubPackageHaveDownLoadSpace(e) {
    var r = this.GetSubPackageDownLoadItemUpdater(e);
    if (!r) {
      return BigInt(0);
    }
    let a = BigInt(0);
    if (this.GetSubPackageDownLoadItemStateById(e) === 5) {
      for (const o of r) {
        a += o.ViewInfo.SavedSize;
      }
    } else {
      for (const t of r) {
        a += t.ViewInfo.SavedSize;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SubPackageDownLoad", 5, "获取SubPackage对应包已下载大小", ["id", e], ["TotalSize", t.ViewInfo.TotalSize], ["SavedSize", t.ViewInfo.SavedSize], ["updater", t.Name]);
        }
      }
    }
    return a;
  }
  GetSubPackageCurrentHaveDownLoadSpace(e) {
    var r = this.GetSubPackageDownLoadItemUpdater(e);
    if (!r) {
      return BigInt(0);
    }
    let a = BigInt(0);
    if (this.GetSubPackageDownLoadItemStateById(e) === 5) {
      for (const o of r) {
        a += o.ViewInfo.CurProgress;
      }
    } else {
      for (const t of r) {
        a += t.ViewInfo.CurProgress;
      }
    }
    return a;
  }
  GetSubPackageCanClearSpace() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetFinishQuestList();
    return ControllerHolder_1.ControllerHolder.ResourceManagerController.GetUnneededResourceSize(e)[0];
  }
  GetSubPackageDownLoadSpeed() {
    if (!this.DownLoadingSubPackageId) {
      return BigInt(0);
    }
    var e = this.GetSubPackageDownLoadItemUpdater(this.DownLoadingSubPackageId);
    if (!e) {
      return BigInt(0);
    }
    let r = BigInt(0);
    for (const a of e) {
      r += a.ViewInfo.DownloadSpeed;
    }
    return r;
  }
  ByteConverter(e) {
    if (e < 0) {
      return "<0.01MB";
    } else {
      e = Number(e);
      return (e = +GB_BYTES <= e ? {
        Value: e / GB_BYTES,
        Unit: "GB"
      } : {
        Value: e / MB_BYTES,
        Unit: "MB"
      }).Value.toFixed(2).replace(/\.?0+$/, "") + " " + e.Unit;
    }
  }
  get NetworkListener() {
    this.kso ||= new UE.KuroNetworkChange();
    return this.kso;
  }
  NeedShowBattleViewButton() {
    return !!ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit() && (this.DownLoadingSubPackageId !== 0 || this.PauseSubPackageId !== 0);
  }
  DownLoadPercentage() {
    let e = BigInt(0);
    let r = BigInt(0);
    if (this.DownLoadingSubPackageId) {
      e += this.GetSubPackageHaveDownLoadSpace(this.DownLoadingSubPackageId);
      r += this.GetSubPackageSpace(this.DownLoadingSubPackageId);
      return [Number(e) / Number(r), 1];
    } else {
      if (this.PauseSubPackageId) {
        e += this.GetSubPackageHaveDownLoadSpace(this.PauseSubPackageId);
        r += this.GetSubPackageSpace(this.PauseSubPackageId);
      }
      return [Number(e) / Number(r), 2];
    }
  }
  OpenSubPackageDownLoadConfirm(e, n, i, s) {
    var r;
    if (s && s > 0 && this.iSf > TimeUtil_1.TimeUtil.GetServerTimeStamp()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SubPackageDownLoad", 5, "分包下载确认框CD时间未到");
      }
    } else {
      this.iSf = TimeUtil_1.TimeUtil.GetServerTimeStamp() + (s ?? 0);
      (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(399)).FunctionMap.set(1, () => {
        this.iSf = TimeUtil_1.TimeUtil.GetServerTimeStamp() + (s ?? 0);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
      });
      r.FunctionMap.set(2, () => {
        this.iSf = TimeUtil_1.TimeUtil.GetServerTimeStamp() + (s ?? 0);
        var e;
        var r = [];
        if (i) {
          for (var [a, o] of this.VFm) {
            if (o !== 5 && (o = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(a)) && o.Type === 2) {
              r.push(a);
            }
          }
        } else if (n) {
          for (const t of n) {
            if (!(t <= 0)) {
              e = this.GetBlockBelongToSubPackage(t);
              r.push(e);
            }
          }
        }
        ControllerHolder_1.ControllerHolder.SubPackageController.PrioritySubPackageDownLoading(r);
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SubPackageDownLoad_StartDownload");
      });
      r.SetTextArgs(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "");
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
    }
  }
  GetBlockBelongToSubPackage(e) {
    for (var [r, a] of this.HFm) {
      if (a.includes(e)) {
        return r;
      }
    }
    return 0;
  }
  GetBlockBelongToBlockGroup(e) {
    var r = this.XXm.get(e);
    if (r) {
      r = this.HFm.get(r);
      if (r) {
        return r;
      }
    }
    return [e];
  }
  GetVideoBelongToSubPackage(e) {
    for (var [r, a] of this.$Fm) {
      if (a.includes(e)) {
        return r;
      }
    }
    return 0;
  }
  CheckAdventureTeleportHaveSubPackage(e) {
    var r;
    var a;
    return !ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit() || !e || !(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) || (a = Vector_1.Vector.Create(e.BornPosition[0], e.BornPosition[1], e.BornPosition[2]), (r = ControllerHolder_1.ControllerHolder.ResourceManagerController.GetMapBlockFromPosition(e.MapConfigId, a)) < 0) || ([e, a] = ControllerHolder_1.ControllerHolder.ResourceManagerController.IsBlockResourceDownloaded(e.MapConfigId, a), e ? !a || (this.OpenBlockNeedReLoginConfirm(), false) : (this.OpenSubPackageDownLoadConfirm("SubPackageDownLoad_CommonLock_Confirm", [r]), false));
  }
  CheckActivityTeleportHaveSubPackage(e) {
    if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      e = ConfigManager_1.ConfigManager.ActivityConfig.GetActivityConfig(e);
      if (e) {
        for (const r of e.AreaList) {
          if (this.GetSubPackageDownLoadItemStateById(this.GetBlockBelongToSubPackage(r)) !== 5) {
            return false;
          }
          if (ControllerHolder_1.ControllerHolder.ResourceManagerController.IsNeedReOpenMap(r)) {
            this.OpenBlockNeedReLoginConfirm();
            return false;
          }
        }
      }
    }
    return true;
  }
  CheckOnlineHaveSubPackage() {
    if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      for (var [e, r] of this.VFm) {
        if (ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(e).Type === 2 && r !== 5) {
          this.OpenSubPackageDownLoadConfirm("SubPackageDownLoad_OnlineLock_Confirm", undefined, true);
          return false;
        }
      }
    }
    return true;
  }
  CheckGenderHaveSubPackage() {
    if (!ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      return true;
    }
    var e;
    var r;
    var a;
    var o = [];
    for ([e, r] of this.VFm) {
      if (r !== 5 && (a = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(e)) && a.Type === 4) {
        o.push(e);
      }
    }
    var t = o.length < 1;
    if (!t) {
      this.OpenSubPackageDownLoadConfirmByExpend("SubPackageDownLoad_GenderLock_Confirm", o);
    }
    return t;
  }
  OpenSubPackageDownLoadConfirmByExpend(e, r) {
    var a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(399);
    a.FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
    });
    a.FunctionMap.set(2, () => {
      ControllerHolder_1.ControllerHolder.SubPackageController.PrioritySubPackageDownLoading(r);
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SubPackageDownLoad_StartDownload");
    });
    a.SetTextArgs(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "");
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(a);
  }
  OpenSubPackageByQuest(e) {
    var [e, r] = ControllerHolder_1.ControllerHolder.ResourceManagerController.GetQuestRefRes(e);
    var a = [];
    for (const n of e) {
      var o = this.GetBlockBelongToSubPackage(n);
      if (o > 0 && !a.includes(o)) {
        a.push(o);
      }
    }
    for (const i of r) {
      var t = this.GetVideoBelongToSubPackage(i);
      if (t > 0 && !a.includes(t)) {
        a.push(t);
      }
    }
    ControllerHolder_1.ControllerHolder.SubPackageController.PrioritySubPackageDownLoading(a);
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SubPackageDownLoad_StartDownload");
    return true;
  }
  HaveNotEnoughSpace(e) {
    for (const r of this.GetSubPackageDownLoadItemUpdater(e) ?? []) {
      r.CalculateSizeInfo();
      if (r.ViewInfo?.NotEnoughSpace) {
        return true;
      }
    }
    return false;
  }
  UpdaterDownLoadSize() {
    for (var [, e] of this.jFm) {
      for (const o of e) {
        var r;
        var a;
        if (o instanceof VideoUpdateWrapper_1.VideoUpdateWrapper && (r = o) && r.VideoIds !== undefined) {
          a = ModelManager_1.ModelManager.QuestResourceModel.FilterVideoByFinishedQuest(r.VideoIds);
          r.SetDownloadVideos(a, ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender());
        }
        o.CalculateSizeInfo();
      }
    }
  }
  UpdaterFinishState() {
    for (var [r, a] of this.jFm) {
      let e = true;
      for (const o of a) {
        if (!o.IsCompleteDownloaded()) {
          e = false;
          break;
        }
      }
      if (e) {
        this.SetSubPackageDownLoadItemStateMap(r, 5);
      }
    }
  }
  OpenBlockNeedReLoginConfirm() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(425);
    e.FunctionMap.set(2, () => {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
      ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.SubPackageNeedReLogin);
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e);
  }
}
exports.SubPackageDownLoadModel = SubPackageDownLoadModel;
//# sourceMappingURL=SubPackageDownLoadModel.js.map