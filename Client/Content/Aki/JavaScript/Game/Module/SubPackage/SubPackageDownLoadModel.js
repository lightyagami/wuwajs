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
    this.uTm = new Map();
    this.cTm = new Map();
    this.dTm = new Map();
    this.TRm = new Map();
    this.mTm = new Map();
    this.KeyPackageState = 4;
    this.KeyPackageStateId = 1;
    this.DownLoadingSubPackageId = 0;
    this.PauseSubPackageId = 0;
    this.SubPackageDownLoadList = [];
    this.fTm = undefined;
    this.KeyIncludeSubPackageList = [];
    this.HaveTipsOutOfSpaceList = [];
    this.gTm = false;
    this.OnDownloadFinish = (e, r) => {
      var o = ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId;
      if (o) {
        if (e !== 4) {
          r.CalculateSizeInfo();
          if (r.ViewInfo?.NotEnoughSpace && !UiManager_1.UiManager.IsViewOpen("SubPackageDownLoadFreeSpaceTipsView")) {
            UiManager_1.UiManager.OpenView("SubPackageDownLoadFreeSpaceTipsView", o);
          }
          if (e !== 2) {
            ControllerHolder_1.ControllerHolder.SubPackageController.StopSubPackageDownLoading(o);
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
    this.vLm = 0;
  }
  OnInit() {
    this.KeyIncludeSubPackageList = [];
    this.HaveTipsOutOfSpaceList = [];
    for (const r of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageList() ?? []) {
      this.uTm.set(r.Id, 4);
      if (r.Type === 1) {
        this.KeyPackageStateId = r.Id;
      }
      if (r.Type === 2) {
        this.dTm.set(r.Id, r.Area);
        for (const o of r.Area) {
          this.TRm.set(o, r.Id);
        }
      }
      if (r.Type === 3) {
        var e = [];
        for (const a of ConfigManager_1.ConfigManager.SubPackageConfig.GetVideoDataByBranch(r.BelongBranch) ?? []) {
          e.push(a.CgId);
        }
        this.mTm.set(r.Id, e);
      }
    }
    this.KeyPackageState = 4;
    this.DownLoadingSubPackageId = 0;
    this.SubPackageDownLoadList = [];
    return !(this.gTm = false);
  }
  async InitSubPackageDownLoadItemUpdater() {
    if (!this.gTm && ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      this.gTm = true;
      var n = [];
      let a = [];
      let t = [];
      for (const g of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageList() ?? []) {
        var i = g.Id;
        let e = [];
        if (this.cTm.has(i)) {
          e = this.cTm.get(i);
          return;
        }
        let r = false;
        var s = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(i);
        switch (s.Type) {
          case 1:
            [e, a, t] = await ResUpdateFactory_1.ResourceDiffUpdaterFactory.CreateLoginPrepareUpdaters();
            this.cTm.set(i, e);
            break;
          case 2:
            e.push(await ResUpdateFactory_1.ResourceDiffUpdaterFactory.GetOrCreateMapBlockUpdater(i.toString(), s.Area, i));
            this.cTm.set(i, e);
            for (const c of s.Area) {
              if (a.includes(c)) {
                r = true;
                break;
              }
            }
            break;
          case 3:
            if (VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo()) {
              var f = [];
              for (const l of ConfigManager_1.ConfigManager.SubPackageConfig.GetVideoDataByBranch(s.BelongBranch) ?? []) {
                if (!t.includes(l.CgId)) {
                  f.push(l.CgId);
                }
              }
              if (f.length <= 0) {
                r = true;
              }
              e.push(await ResUpdateFactory_1.ResourceDiffUpdaterFactory.GetOrCreateVideoUpdater(i.toString(), i, 6, f));
              this.cTm.set(i, e);
            }
            break;
          case 4:
            if (VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo()) {
              ModelManager_1.ModelManager.QuestResourceModel.CalcPrepareResource();
              if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1) {
                e.push(await ResUpdateFactory_1.ResourceDiffUpdaterFactory.GetOrCreateVideoUpdater(i.toString(), i, 3, []));
              } else {
                e.push(await ResUpdateFactory_1.ResourceDiffUpdaterFactory.GetOrCreateVideoUpdater(i.toString(), i, 4, []));
              }
              this.cTm.set(i, e);
            }
            break;
          default:
            return;
        }
        let o = true;
        for (const d of e) {
          d.AddOnDownloadFinish(e => {
            this.OnDownloadFinish(e, d);
          });
          if (!d.IsCompleteDownloaded()) {
            o = false;
            break;
          }
        }
        var u = r || o ? 5 : 4;
        if (s.Type === 1 && (o || r)) {
          this.KeyPackageState = u;
          n.push(...s.Area);
        } else if (s.Type === 2 && (o || r)) {
          n.push(...s.Area);
        }
        this.SetSubPackageDownLoadItemStateMap(i, u);
        if (r) {
          this.KeyIncludeSubPackageList.push(s.Id);
        }
      }
      ControllerHolder_1.ControllerHolder.SubPackageController.SceneBlockSplitClientLoginPush(n);
    }
  }
  GetSubPackageDownLoadItemUpdater(e) {
    var r = this.cTm.get(e);
    return r || (Log_1.Log.CheckInfo() && Log_1.Log.Info("SubPackageDownLoad", 5, "获取分包下载器失败", ["id", e]), []);
  }
  GetSubPackageDownLoadItemStateById(r) {
    let o = this.uTm.get(r);
    if (!o) {
      var a = this.GetSubPackageDownLoadItemUpdater(r);
      if (!a || a.length <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SubPackageDownLoad", 5, "获取分包下载状态失败", ["id", r]);
        }
        return 4;
      }
      let e = true;
      for (const t of a) {
        if (t.ViewInfo.SavedSize !== t.ViewInfo.TotalSize) {
          e = false;
          break;
        }
      }
      o = e ? 5 : 4;
      this.SetSubPackageDownLoadItemStateMap(r, o);
    }
    return o;
  }
  GetSubPackageDownLoadVersionStateById(e) {
    let r = true;
    let o = false;
    let a = false;
    for (const n of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageListByVersion(e) ?? []) {
      var t = this.uTm.get(n.Id);
      if (t === 1) {
        return 1;
      }
      r = r && t === 5;
      o = o || t === 2;
      a = !o && (a || t === 3);
    }
    if (r) {
      return 5;
    } else if (o) {
      return 2;
    } else if (a) {
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
  GetKeySubPackageData() {
    var e = [];
    var r = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
    r.Type = 1;
    e.push(r);
    var r = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadVersionByType(1) ?? [];
    for (const t of r) {
      var o = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
      o.VersionId = t.Version;
      e.push(o);
    }
    r = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
    r.Type = 2;
    e.push(r);
    r = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadVersionByType(2) ?? [];
    for (const n of r) {
      var a = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
      a.VersionId = n.Version;
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
    for (const a of r) {
      var o = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
      o.VersionId = a.Version;
      e.push(o);
    }
    return e;
  }
  SetSubPackageDownLoadItemStateMap(e, r) {
    if (e && (this.uTm.set(e, r), e === this.KeyPackageStateId && (this.KeyPackageState = r), r === 1 && (this.DownLoadingSubPackageId = e), r === 2)) {
      this.PauseSubPackageId = e;
    }
  }
  GetSubPackageSpace(e) {
    e = this.GetSubPackageDownLoadItemUpdater(e);
    if (!e) {
      return BigInt(0);
    }
    let r = BigInt(0);
    for (const o of e) {
      r += o.ViewInfo.TotalSize;
    }
    return r;
  }
  GetSubPackageHaveDownLoadSpace(e) {
    var r = this.GetSubPackageDownLoadItemUpdater(e);
    if (!r) {
      return BigInt(0);
    }
    let o = BigInt(0);
    if (this.GetSubPackageDownLoadItemStateById(e) === 5) {
      for (const a of r) {
        o += a.ViewInfo.SavedSize;
      }
    } else {
      for (const t of r) {
        o += t.ViewInfo.SavedSize;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SubPackageDownLoad", 5, "获取SubPackage对应包已下载大小", ["id", e], ["TotalSize", t.ViewInfo.TotalSize], ["SavedSize", t.ViewInfo.SavedSize], ["updater", t.Name]);
        }
      }
    }
    return o;
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
    for (const o of e) {
      r += o.ViewInfo.DownloadSpeed;
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
  GetSubPackageList() {
    if (!this.fTm) {
      this.fTm = [];
      for (const e of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadVersionByType(2) ?? []) {
        if (e.IsRecommend) {
          for (const r of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageListByVersion(e.Version) ?? []) {
            this.fTm.push(r.Id);
          }
        }
      }
    }
    return this.fTm;
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
    if (s && s > 0 && this.vLm > TimeUtil_1.TimeUtil.GetServerTimeStamp()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SubPackageDownLoad", 5, "分包下载确认框CD时间未到");
      }
    } else {
      this.vLm = TimeUtil_1.TimeUtil.GetServerTimeStamp() + (s ?? 0);
      (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(399)).FunctionMap.set(1, () => {
        this.vLm = TimeUtil_1.TimeUtil.GetServerTimeStamp() + (s ?? 0);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
      });
      r.FunctionMap.set(2, () => {
        this.vLm = TimeUtil_1.TimeUtil.GetServerTimeStamp() + (s ?? 0);
        var e;
        var r = [];
        if (i) {
          for (var [o, a] of this.uTm) {
            if (a !== 5 && (a = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(o)) && a.Type === 2) {
              r.push(o);
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
    for (var [r, o] of this.dTm) {
      if (o.includes(e)) {
        return r;
      }
    }
    return 0;
  }
  GetBlockBelongToBlockGroup(e) {
    var r = this.TRm.get(e);
    if (r) {
      r = this.dTm.get(r);
      if (r) {
        return r;
      }
    }
    return [e];
  }
  GetVideoBelongToSubPackage(e) {
    for (var [r, o] of this.mTm) {
      if (o.includes(e)) {
        return r;
      }
    }
    return 0;
  }
  CheckAdventureTeleportHaveSubPackage(e) {
    var r;
    var o;
    return !ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit() || !e || !(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) || (o = Vector_1.Vector.Create(e.BornPosition[0], e.BornPosition[1], e.BornPosition[2]), (r = ControllerHolder_1.ControllerHolder.ResourceManagerController.GetMapBlockFromPosition(e.MapConfigId, o)) < 0) || ([e, o] = ControllerHolder_1.ControllerHolder.ResourceManagerController.IsBlockResourceDownloaded(e.MapConfigId, o), e ? !o || (this.OpenBlockNeedReLoginConfirm(), false) : (this.OpenSubPackageDownLoadConfirm("SubPackageDownLoad_CommonLock_Confirm", [r]), false));
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
      for (var [e, r] of this.uTm) {
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
    var o;
    var a = [];
    for ([e, r] of this.uTm) {
      if (r !== 5 && (o = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(e)) && o.Type === 4) {
        a.push(e);
      }
    }
    var t = a.length < 1;
    if (!t) {
      this.OpenSubPackageDownLoadConfirmByExpend("SubPackageDownLoad_GenderLock_Confirm", a);
    }
    return t;
  }
  OpenSubPackageDownLoadConfirmByExpend(e, r) {
    var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(399);
    o.FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
    });
    o.FunctionMap.set(2, () => {
      ControllerHolder_1.ControllerHolder.SubPackageController.PrioritySubPackageDownLoading(r);
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SubPackageDownLoad_StartDownload");
    });
    o.SetTextArgs(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "");
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
  }
  OpenSubPackageByQuest(e) {
    var [e, r] = ControllerHolder_1.ControllerHolder.ResourceManagerController.GetQuestRefRes(e);
    var o = [];
    for (const n of e) {
      var a = this.GetBlockBelongToSubPackage(n);
      if (a > 0 && !o.includes(a)) {
        o.push(a);
      }
    }
    for (const i of r) {
      var t = this.GetVideoBelongToSubPackage(i);
      if (t > 0 && !o.includes(t)) {
        o.push(t);
      }
    }
    ControllerHolder_1.ControllerHolder.SubPackageController.PrioritySubPackageDownLoading(o);
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
    for (var [, e] of this.cTm) {
      for (const r of e) {
        r.CalculateSizeInfo();
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