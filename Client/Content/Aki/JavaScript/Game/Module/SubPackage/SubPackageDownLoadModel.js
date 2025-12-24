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
    this.wGm = new Map();
    this.LGm = new Map();
    this.PGm = new Map();
    this.wQm = new Map();
    this.AGm = new Map();
    this.KeyPackageState = 4;
    this.KeyPackageStateId = 1;
    this.DownLoadingSubPackageId = 0;
    this.PauseSubPackageId = 0;
    this.SubPackageDownLoadList = [];
    this.KeyIncludeSubPackageList = [];
    this.HaveTipsOutOfSpaceList = [];
    this.UGm = false;
    this.OnDownloadFinish = (e, r) => {
      var a = ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SubPackageDownLoad", 5, "SubPackage-OnDownloadFinish", ["state", e], ["updater", r.Name], ["downLoadingId", a]);
      }
      if (a) {
        if (e !== 4) {
          r.CalculateSizeInfo();
          if (r.ViewInfo?.NotEnoughSpace && !UiManager_1.UiManager.IsViewOpen("SubPackageDownLoadFreeSpaceTipsView")) {
            UiManager_1.UiManager.OpenView("SubPackageDownLoadFreeSpaceTipsView", a);
          }
          if (e !== 2) {
            ControllerHolder_1.ControllerHolder.SubPackageController.StopSubPackageDownLoading(a);
          }
        } else {
          ControllerHolder_1.ControllerHolder.SubPackageController.ReportSubPackageDownLoadLogEvent(a, 2, r);
          if (a === SubPackageDefine_1.KEY_SUBPACKAGE_ID) {
            ControllerHolder_1.ControllerHolder.SubPackageController.ReportSubPackageKeySubPackageLogEvent(r.SpendTime, 2);
          }
          ControllerHolder_1.ControllerHolder.SubPackageController.DownLoadFinish();
        }
      }
    };
    this.kso = undefined;
    this.vpf = 0;
  }
  OnInit() {
    this.KeyIncludeSubPackageList = [];
    this.HaveTipsOutOfSpaceList = [];
    for (const r of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageList() ?? []) {
      this.wGm.set(r.Id, 4);
      if (r.Type === 1) {
        this.KeyPackageStateId = r.Id;
      }
      if (r.Type === 2) {
        this.PGm.set(r.Id, r.Area);
        for (const a of r.Area) {
          this.wQm.set(a, r.Id);
        }
      }
      if (r.Type === 3) {
        var e = [];
        for (const t of ConfigManager_1.ConfigManager.SubPackageConfig.GetVideoDataByBranch(r.BelongBranch) ?? []) {
          e.push(t.CgId);
        }
        this.AGm.set(r.Id, e);
      }
    }
    this.KeyPackageState = 4;
    this.DownLoadingSubPackageId = 0;
    this.SubPackageDownLoadList = [];
    return !(this.UGm = false);
  }
  async InitSubPackageDownLoadItemUpdater() {
    if (!this.UGm && ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      this.gMf();
      this.UGm = true;
      var n = [];
      let t = [];
      let o = [];
      for (const g of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageList() ?? []) {
        var i = g.Id;
        let e = [];
        if (this.LGm.has(i)) {
          e = this.LGm.get(i);
          return;
        }
        let r = false;
        var s = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(i);
        switch (s.Type) {
          case 1:
            [e, t, o] = await ResUpdateFactory_1.ResourceDiffUpdaterFactory.CreateLoginPrepareUpdaters();
            this.LGm.set(i, e);
            break;
          case 2:
            e.push(await ResUpdateFactory_1.ResourceDiffUpdaterFactory.CreateMapBlockUpdater(i.toString(), s.Area, i));
            this.LGm.set(i, e);
            for (const c of s.Area) {
              if (t.includes(c)) {
                r = true;
                break;
              }
            }
            break;
          case 3:
            if (VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo()) {
              var u = [];
              for (const d of ConfigManager_1.ConfigManager.SubPackageConfig.GetVideoDataByBranch(s.BelongBranch) ?? []) {
                if (!o.includes(d.CgId)) {
                  u.push(d.CgId);
                }
              }
              if (u.length <= 0) {
                r = true;
              }
              e.push(await ResUpdateFactory_1.ResourceDiffUpdaterFactory.CreateVideoUpdater(i.toString(), i, 6, u));
              this.LGm.set(i, e);
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
              this.LGm.set(i, e);
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
        var f = r || a ? 5 : 4;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SubPackageDownLoad", 5, "SubPackage-InitSubPackageDownLoadItemUpdater", ["Id", s?.Id], ["isFinish", a], ["isKeyHave", r], ["state", f]);
        }
        if (s.Type === 1 && (a || r)) {
          this.KeyPackageState = f;
          n.push(...s.Area);
        } else if (s.Type === 2 && (a || r)) {
          n.push(...s.Area);
        }
        this.SetSubPackageDownLoadItemStateMap(i, f);
        if (r) {
          this.KeyIncludeSubPackageList.push(s.Id);
        }
      }
      ControllerHolder_1.ControllerHolder.SubPackageController.SceneBlockSplitClientLoginPush(n);
    }
  }
  gMf() {
    this.KeyIncludeSubPackageList = [];
    this.LGm.clear();
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
    this.LGm.set(SubPackageDefine_1.KEY_SUBPACKAGE_ID, e);
    this.KeyPackageState = r ? 5 : 4;
    this.SetSubPackageDownLoadItemStateMap(SubPackageDefine_1.KEY_SUBPACKAGE_ID, this.KeyPackageState);
  }
  GetSubPackageDownLoadItemUpdater(e) {
    var r = this.LGm.get(e);
    return r || (Log_1.Log.CheckInfo() && Log_1.Log.Info("SubPackageDownLoad", 5, "获取分包下载器失败", ["id", e]), []);
  }
  GetSubPackageDownLoadItemStateById(r) {
    let a = this.wGm.get(r);
    if (!a) {
      var t = this.GetSubPackageDownLoadItemUpdater(r);
      if (!t || t.length <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SubPackageDownLoad", 5, "获取分包下载状态失败", ["id", r]);
        }
        return 4;
      }
      let e = true;
      for (const o of t) {
        if (o.ViewInfo.SavedSize !== o.ViewInfo.TotalSize) {
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
    let t = false;
    for (const n of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageListByVersion(e) ?? []) {
      var o = this.wGm.get(n.Id);
      if (o === 1) {
        return 1;
      }
      r = r && o === 5;
      a = a || o === 2;
      t = !a && (t || o === 3);
    }
    if (r) {
      return 5;
    } else if (a) {
      return 2;
    } else if (t) {
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
    for (const t of r) {
      var a = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
      a.VersionId = t.Version;
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
    for (const t of r) {
      var a = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
      a.VersionId = t.Version;
      e.push(a);
    }
    return e;
  }
  SetSubPackageDownLoadItemStateMap(e, r) {
    if (e && (this.wGm.set(e, r), e === this.KeyPackageStateId && (this.KeyPackageState = r), r === 1 && (this.DownLoadingSubPackageId = e), r === 2)) {
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
      for (const t of r) {
        a += t.ViewInfo.SavedSize;
      }
    } else {
      for (const o of r) {
        a += o.ViewInfo.SavedSize;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SubPackageDownLoad", 5, "获取SubPackage对应包已下载大小", ["id", e], ["TotalSize", o.ViewInfo.TotalSize], ["SavedSize", o.ViewInfo.SavedSize], ["updater", o.Name]);
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
      for (const t of r) {
        a += t.ViewInfo.CurProgress;
      }
    } else {
      for (const o of r) {
        a += o.ViewInfo.CurProgress;
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
    if (s && s > 0 && this.vpf > TimeUtil_1.TimeUtil.GetServerTimeStamp()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SubPackageDownLoad", 5, "分包下载确认框CD时间未到");
      }
    } else {
      this.vpf = TimeUtil_1.TimeUtil.GetServerTimeStamp() + (s ?? 0);
      (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(399)).FunctionMap.set(1, () => {
        this.vpf = TimeUtil_1.TimeUtil.GetServerTimeStamp() + (s ?? 0);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
      });
      r.FunctionMap.set(2, () => {
        this.vpf = TimeUtil_1.TimeUtil.GetServerTimeStamp() + (s ?? 0);
        var e;
        var r = [];
        if (i) {
          for (var [a, t] of this.wGm) {
            if (t !== 5 && (t = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(a)) && t.Type === 2) {
              r.push(a);
            }
          }
        } else if (n) {
          for (const o of n) {
            if (!(o <= 0)) {
              e = this.GetBlockBelongToSubPackage(o);
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
    for (var [r, a] of this.PGm) {
      if (a.includes(e)) {
        return r;
      }
    }
    return 0;
  }
  GetBlockBelongToBlockGroup(e) {
    var r = this.wQm.get(e);
    if (r) {
      r = this.PGm.get(r);
      if (r) {
        return r;
      }
    }
    return [e];
  }
  GetVideoBelongToSubPackage(e) {
    for (var [r, a] of this.AGm) {
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
      for (var [e, r] of this.wGm) {
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
    var t = [];
    for ([e, r] of this.wGm) {
      if (r !== 5 && (a = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(e)) && a.Type === 4) {
        t.push(e);
      }
    }
    var o = t.length < 1;
    if (!o) {
      this.OpenSubPackageDownLoadConfirmByExpend("SubPackageDownLoad_GenderLock_Confirm", t);
    }
    return o;
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
      var t = this.GetBlockBelongToSubPackage(n);
      if (t > 0 && !a.includes(t)) {
        a.push(t);
      }
    }
    for (const i of r) {
      var o = this.GetVideoBelongToSubPackage(i);
      if (o > 0 && !a.includes(o)) {
        a.push(o);
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
    for (var [, e] of this.LGm) {
      for (const t of e) {
        var r;
        var a;
        if (t instanceof VideoUpdateWrapper_1.VideoUpdateWrapper && (r = t) && r.VideoIds !== undefined) {
          a = ModelManager_1.ModelManager.QuestResourceModel.FilterVideoByFinishedQuest(r.VideoIds);
          r.SetDownloadVideos(a, ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender());
        }
        t.CalculateSizeInfo();
      }
    }
  }
  UpdaterFinishState() {
    for (var [r, a] of this.LGm) {
      let e = true;
      for (const t of a) {
        if (!t.IsCompleteDownloaded()) {
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