"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceDiffUpdaterFactory = undefined;
const VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate");
const ResourceDiffUpdater_1 = require("../../../Launcher/Update/ResourceDiffUpdate/Updater/ResourceDiffUpdater");
const VideoUpdateWrapper_1 = require("../../../Launcher/Update/ResourceDiffUpdate/Updater/VideoUpdateWrapper");
const VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ResourceUpdateManager_1 = require("../../../Launcher/Update/ResourceDiffUpdate/ResourceUpdateManager");
const LauncherStorageLib_1 = require("../../../Launcher/Util/LauncherStorageLib");
const Log_1 = require("../../../Core/Common/Log");
class ResourceDiffUpdaterFactory {
  static async CreateLoginPrepareUpdaters() {
    var e = [];
    var r = ControllerHolder_1.ControllerHolder.ResourceManagerController.GetCoreMapBlocks();
    if (r.length > 0 && (a = await this.CreateMapBlockUpdater("LoginPrepare_MapBlock", r, 100))) {
      e.push(a);
    }
    var a = ModelManager_1.ModelManager.QuestResourceModel.GetLoginQuestsMp4Ids();
    var t = await this.CreateVideoUpdater("LoginPrepare_QuestVideo", 100, 6, a);
    e.push(t);
    return [e, r, a];
  }
  static async CreateCoreUpdaters() {
    var e = [];
    var [r, a] = ResourceUpdateManager_1.ResourceDiffUpdaterManager.CheckCoreBlockAndVideo();
    if (r.size > 0 && (r = await this.CreateMapBlockUpdater("Core_MapBlock", [...r], 90))) {
      e.push(r);
    }
    if (a.size > 0) {
      r = await this.CreateVideoUpdater("Core_QuestVideo", 90, 6, [...a]);
      e.push(r);
    }
    return e;
  }
  static async CreateMapBlockUpdater(e, t, r) {
    var a = ControllerHolder_1.ControllerHolder.ResourceManagerController.GetMapBlockResPackageInfos(t);
    var e = new ResourceDiffUpdater_1.ResourceDiffUpdater(e, r, a);
    await e.Init();
    e.AddOnDownloadFinish(e => {
      if (e === 4) {
        var r = ControllerHolder_1.ControllerHolder.ResourceManagerController;
        for (const a of t) {
          r.UpdateBlockDownloadState(a, true);
        }
      }
    });
    return e;
  }
  static async CreateVideoUpdater(e, r, a, t) {
    if (!VideoResUpdate_1.VideoResUpdate.ManifestInited) {
      await VideoResUpdate_1.VideoResUpdate.AnalyzeVideoManifests();
    }
    var o = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdaterWithName(a, e);
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    var t = ModelManager_1.ModelManager.QuestResourceModel.FilterVideoByFinishedQuest(this.FXf(t));
    var e = new VideoUpdateWrapper_1.VideoUpdateWrapper(e, r, a, o, t, i);
    await e.Init();
    return e;
  }
  static FXf(e) {
    const r = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(LauncherStorageLib_1.ELauncherStorageGlobalKey.UserFinishedVideoList);
    if (r) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SubPackageDownLoad", 70, "热更阶段已下载视频列表", ["finishedVideoList", r]);
      }
      return e.filter(e => !r.has(e));
    } else {
      return e;
    }
  }
}
exports.ResourceDiffUpdaterFactory = ResourceDiffUpdaterFactory;
//# sourceMappingURL=ResUpdateFactory.js.map