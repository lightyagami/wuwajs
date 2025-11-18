"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceManagerController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const MapBlockInfoByMapId_1 = require("../../../Core/Define/ConfigQuery/MapBlockInfoByMapId");
const QuestRefMapBlockConfigByQuestId_1 = require("../../../Core/Define/ConfigQuery/QuestRefMapBlockConfigByQuestId");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ResPackageInfo_1 = require("../../../Launcher/DiffPatch/Data/ResPackageInfo");
const VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate");
const ResourceUpdateManager_1 = require("../../../Launcher/Update/ResourceDiffUpdate/ResourceUpdateManager");
const LauncherStorageLib_1 = require("../../../Launcher/Util/LauncherStorageLib");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const SubPackageDefine_1 = require("../SubPackage/SubPackageDefine");
const ResUpdateFactory_1 = require("./ResUpdateFactory");
const MapBlockInfoById_1 = require("../../../Core/Define/ConfigQuery/MapBlockInfoById");
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const Http_1 = require("../../../Core/Http/Http");
class ResourceManagerController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestFinishListNotify, this.Gro);
    this.InitBlockDownloadState();
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestFinishListNotify, this.Gro);
    return true;
  }
  static IsBlockResourceDownloaded(e, o) {
    if (!ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit() || (e = this.GetMapBlockFromPosition(e, o)) === -1) {
      return [true, false];
    } else {
      return [(o = ModelManager_1.ModelManager.ResourceManagerModel).GetBlockDownloadState(e), o.BlockNeedReOpenMap.has(e)];
    }
  }
  static GetMapBlockResPackageInfos(e) {
    var o = ModelManager_1.ModelManager.ResourceManagerModel;
    var t = [];
    var r = ResPackageInfo_1.ResPackageInfo.OptionalDownLoadInfo;
    for (const n of e) {
      var a;
      var s = o.MapBlockIdToPackName.get(n);
      if (s) {
        if (a = r.get(s)) {
          t.push(a);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("QuestResource", 70, `地块${n}对应的资源包${s}不存在`);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("QuestResource", 70, `地块${n}没有配置资源包`);
      }
    }
    return t;
  }
  static GetCoreMapBlocks() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SubPackageDownLoad", 70, "开始计算登录场景和任务需要的地块");
    }
    var e = ModelManager_1.ModelManager.ResourceManagerModel;
    var o = new Set();
    for (const n of e.LoginSceneInfos) {
      var t = this.GetMapBlockFromPosition(n.d5n, Vector_1.Vector.Create(n.P5n));
      if (t !== -1 && (o.add(t), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("SubPackageDownLoad", 70, `登陆位置${n.P5n.X},${n.P5n.Y} 依赖地块:${t}`);
      }
    }
    for (const i of e.LoginQuests) {
      var r = QuestRefMapBlockConfigByQuestId_1.configQuestRefMapBlockConfigByQuestId.GetConfig(i, true)?.MapBlockId;
      if (r !== undefined) {
        for (const c of r) {
          o.add(c);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("QuestResource", 70, `任务${i}依赖地块:${c}`);
          }
        }
      }
    }
    var a = new Set();
    for (const _ of o) {
      var s = ModelManager_1.ModelManager.SubPackageDownLoadModel?.GetBlockBelongToBlockGroup(_);
      if (s) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 70, `地块${_}属于地块组,组内地块:${s}`);
        }
        for (const u of s) {
          a.add(u);
        }
      } else {
        a.add(_);
      }
    }
    for (const g of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageList() ?? []) {
      if (g.BelongKey) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 70, "配置强制下载地块:" + g.Area);
        }
        for (const d of g.Area) {
          a.add(d);
        }
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 70, "核心资源中的需要的地块:" + [...a]);
    }
    return [...a];
  }
  static NeedDownloadResources() {
    if (!ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      return false;
    }
    var e = ModelManager_1.ModelManager.ResourceManagerModel;
    for (const o of this.GetCoreMapBlocks()) {
      if (!e.GetBlockDownloadState(o)) {
        return true;
      }
    }
    return ModelManager_1.ModelManager.QuestResourceModel.NeedCheckQuestResource();
  }
  static IsAllOptionalResourceDownloaded() {
    for (const t of ResPackageInfo_1.ResPackageInfo.OptionalDownLoadInfo.values()) {
      if (!t.IsCompleteUpdate()) {
        return false;
      }
      var [e, o] = t.CalculateSavedSizeAndTotalSize();
      if (e < o) {
        return false;
      }
    }
    return true;
  }
  static async CheckOptResDownload() {
    var e;
    this.ChangeHttpTickFrequency();
    await ModelManager_1.ModelManager.SubPackageDownLoadModel.InitSubPackageDownLoadItemUpdater();
    if (this.NeedDownloadResources()) {
      this.LoginPrepareResCheckPromise = new CustomPromise_1.CustomPromise();
      (e = new SubPackageDefine_1.SubPackageDownLoadViewOpenData()).IsShowCloseBtn = false;
      UiManager_1.UiManager.OpenView("SubPackageDownLoadView", e);
      await this.LoginPrepareResCheckPromise.Promise;
    }
    this.RestoreHttpTickFrequency();
    this.UpdateToServerResState();
    this.UpdateServerQuestState();
    this.LoginPrepareResCheckPromise = undefined;
  }
  static GetMapBlockFromPosition(e, o) {
    var t = MapBlockInfoByMapId_1.configMapBlockInfoByMapId.GetConfigList(e, true);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("QuestResource", 70, `找不到地图${e}的地块配置`);
      }
      return -1;
    }
    let r = -1;
    for (const i of t) {
      var a = i.RegionBoxes;
      if (a.length === 0) {
        r = i.BlockId;
      }
      for (let e = 0; e < a.length - 1; e += 2) {
        var s = a[e];
        var n = a[e + 1];
        if (o.X >= s.X && o.X <= n.X && o.Y >= s.Y && o.Y <= n.Y) {
          return i.BlockId;
        }
      }
    }
    return r;
  }
  static GetResourceDownloadStatus(e) {
    var t = ResPackageInfo_1.ResPackageInfo.OptionalDownLoadInfo.get(e);
    if (t) {
      var [r] = t.AnalyzeRequireFiles();
      let e = 0n;
      let o = 0n;
      for (const a of r) {
        e += a.Size;
        o += a.SavedSize;
      }
      return [t.IsCompleteUpdate(), o, e];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("QuestResource", 70, `资源包${e}不存在`);
    }
    return [true, BigInt(0), BigInt(0)];
  }
  static GetUnneededResourceSize(e) {
    var o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    let t = 0n;
    var r = [];
    for (const n of e) {
      for (const i of ModelManager_1.ModelManager.QuestResourceModel.GetQuestRefPakNames(n, o)) {
        var a = VideoResUpdate_1.VideoResUpdate.VideoMap.get(i);
        if (a) {
          r.push(a);
        }
      }
    }
    for (const c of r) {
      var [,,, s] = VideoResUpdate_1.VideoResUpdate.AnalyzeSingle(c);
      t += s;
    }
    return [t, [], r];
  }
  static DeleteUnneededResource(e) {
    var [e, o, t] = this.GetUnneededResourceSize(e);
    if (0n < e) {
      for (const r of o) {
        r.DeleteLocalFiles();
      }
      for (const a of t) {
        VideoResUpdate_1.VideoResUpdate.DeleteSingle(a);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("QuestResource", 70, "删除不需要的资源包,释放空间:" + e);
      }
    }
  }
  static GetQuestRefRes(e) {
    return [QuestRefMapBlockConfigByQuestId_1.configQuestRefMapBlockConfigByQuestId.GetConfig(e, true)?.MapBlockId ?? [], ModelManager_1.ModelManager.QuestResourceModel.GetQuestRefCgIds(e)];
  }
  static GetMp4ResourceDownloadStatus(e) {
    var o = VideoResUpdate_1.VideoResUpdate.GetVideoResPakByVideoIds([e]);
    if (o.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("QuestResource", 70, `视频资源${e}没有配置资源包`);
      }
      return [true, BigInt(0), BigInt(0)];
    } else {
      [, e, o] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames(o);
      return [e === o, e, o];
    }
  }
  static UpdateToServerResState() {
    var e = ModelManager_1.ModelManager.QuestResourceModel;
    e.RefreshCachePrepareResourceSize();
    e.CalcPrepareResource();
    var e = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(4);
    var o = VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(4);
    var t = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(3);
    var r = VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(3);
    var a = this.IsAllOptionalResourceDownloaded();
    let s = 2;
    if (a) {
      if (e === o && t === r) {
        s = 1;
      } else if (e === o) {
        s = 4;
      } else if (t === r) {
        s = 3;
      }
    }
    LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(LauncherStorageLib_1.ELauncherStorageDeviceKey.UserSelectedVideoUpdate, s);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 38, "登录后上报服务器本地资源状态", ["ResState", s]);
    }
    if (s !== 2) {
      const i = Protocol_1.Aki.Protocol.Y61.create({
        l31: s
      });
      Net_1.Net.Call(28715, i, e => {
        if (e && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 38, "计算出新状态后通知服务器任务资源状态改变", ["新状态", s]);
        }
      });
    }
    let n = Protocol_1.Aki.Protocol.QSm.Proto_BStateAll;
    if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      n = a ? Protocol_1.Aki.Protocol.QSm.Proto_BStateComplete : Protocol_1.Aki.Protocol.QSm.Proto_BStateSimple;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 38, "登录后上报服务器地块资源状态", ["BlockState", n]);
    }
    const i = Protocol_1.Aki.Protocol.GSm.create({
      NSm: n
    });
    Net_1.Net.Send(20170, i);
  }
  static UpdateBlockDownloadState(e, o) {
    var t;
    var r = ModelManager_1.ModelManager.ResourceManagerModel;
    if (r.GetBlockDownloadState(e) !== o && (t = MapBlockInfoById_1.configMapBlockInfoById.GetConfig(e, true))) {
      r.SetBlockDownloadState(e, o);
      if (t.MapId === ModelManager_1.ModelManager.GameModeModel.MapId) {
        r.BlockNeedReOpenMap.add(e);
      } else {
        RenderModuleController_1.RenderModuleController.SetWorldPartitionDataLayerState(t.BlockDatalayer, !o);
      }
    }
  }
  static IsNeedReOpenMap(e) {
    return ModelManager_1.ModelManager.ResourceManagerModel.BlockNeedReOpenMap.has(e);
  }
  static UpdateServerQuestState() {
    if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      var e = ModelManager_1.ModelManager.QuestResourceModel;
      var o = new Set();
      var t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      var r = new Set();
      if (t === 0) {
        for (var [a] of e.FemaleQuestIdToPack) {
          r.add(a);
          if (!ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(a)) {
            if (this.IsQuestResourceDownloaded(a, t)) {
              o.add(a);
            }
          }
        }
      } else if (t === 1) {
        for (var [s] of e.MaleQuestIdToPack) {
          r.add(s);
          if (!ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(s)) {
            if (this.IsQuestResourceDownloaded(s, t)) {
              o.add(s);
            }
          }
        }
      }
      for (const n of ModelManager_1.ModelManager.ResourceManagerModel.RefBlockQuests) {
        if (!r.has(n) && !ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(n)) {
          if (this.IsQuestResourceDownloaded(n, t)) {
            o.add(n);
          }
        }
      }
      e = Protocol_1.Aki.Protocol.uau.create({
        a2s: [...o]
      });
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("QuestResource", 38, "通知服务器登录任务下载完成", ["LoginQuests", o]);
      }
      Net_1.Net.Call(18651, e, e => {
        if (e && e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 26131);
        }
      });
    }
  }
  static IsQuestResourceDownloaded(e, o) {
    var t = QuestRefMapBlockConfigByQuestId_1.configQuestRefMapBlockConfigByQuestId.GetConfig(e, true)?.MapBlockId;
    if (t !== undefined) {
      for (const a of t) {
        var r = ModelManager_1.ModelManager.ResourceManagerModel.MapBlockIdToPackName.get(a);
        if (r) {
          r = ResPackageInfo_1.ResPackageInfo.OptionalDownLoadInfo.get(r);
          if (r && !r.IsCompleteDownload()) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("QuestResource", 70, `任务${e}依赖地块${a}资源未下载完成`);
            }
            return false;
          }
        }
      }
    }
    var t = ModelManager_1.ModelManager.QuestResourceModel.GetQuestRefPakNames(e, o);
    var [, o, t] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames(t);
    return o === t;
  }
  static InitBlockDownloadState() {
    var e;
    var o;
    var t = ModelManager_1.ModelManager.ResourceManagerModel;
    for ([e, o] of t.MapBlockIdToPackName) {
      var r;
      var a = ResPackageInfo_1.ResPackageInfo.OptionalDownLoadInfo.get(o);
      if (a) {
        a = a.IsCompleteDownload();
        t.SetBlockDownloadState(e, a);
        if (r = MapBlockInfoById_1.configMapBlockInfoById.GetConfig(e, true)) {
          RenderModuleController_1.RenderModuleController.SetWorldPartitionDataLayerState(r.BlockDatalayer, !a);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("QuestResource", 70, `地块${e},packName:${o}对应的ResPackageInfo不存在`);
      }
    }
  }
  static async TestDownload() {
    const e = await ResUpdateFactory_1.ResourceDiffUpdaterFactory.GetOrCreateMapBlockUpdater("testBlock", [1, 2, 3], 1);
    const o = await ResUpdateFactory_1.ResourceDiffUpdaterFactory.GetOrCreateVideoUpdater("testVideo", 1, 6, [114, 196, 204]);
    let t = 0;
    let r = false;
    var a = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      if ((t += 200) >= 500) {
        t = 0;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 70, `地块资源下载进度:${e?.ViewInfo?.CurProgress}/${e?.ViewInfo?.TotalProgress}`);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("QuestResource", 70, `视频资源下载进度:${o?.ViewInfo?.CurProgress}/${o?.ViewInfo?.TotalProgress}`);
        }
        if (r) {
          o?.UpdateResourceProcedure();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("QuestResource", 70, "继续下载");
          }
          r = false;
        } else {
          r = true;
          o?.Stop();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("QuestResource", 70, "停止下载");
          }
        }
      }
    }, 200);
    await o?.UpdateResourceProcedure();
    await e?.UpdateResourceProcedure();
    await new Promise(e => setTimeout(e, 100000));
    TimerSystem_1.GameplayTimerSystem.Remove(a);
    this.LoginPrepareResCheckPromise?.SetResult();
  }
  static ChangeHttpTickFrequency() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SubPackageDownLoad", 70, "ChangeHttpTickFrequency: set http tick to max");
    }
    Http_1.Http.SetHttpThreadActiveMinimumSleepTimeInSeconds(0);
    Http_1.Http.SetHttpThreadIdleMinimumSleepTimeInSeconds(0);
  }
  static RestoreHttpTickFrequency() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SubPackageDownLoad", 70, "RestoreHttpTickFrequency: restore http tick to game default");
    }
    Http_1.Http.SetHttpThreadActiveMinimumSleepTimeInSeconds(0.005);
    Http_1.Http.SetHttpThreadIdleMinimumSleepTimeInSeconds(0.033);
  }
}
exports.ResourceManagerController = ResourceManagerController;
(_a = ResourceManagerController).LoginPrepareResCheckPromise = undefined;
ResourceManagerController.Gro = () => {
  _a.UpdateToServerResState();
}; //# sourceMappingURL=ResourceManagerController.js.map