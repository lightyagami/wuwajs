"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceDiffUpdaterFactory = undefined;
const VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate");
const ResourceUpdateManager_1 = require("../../../Launcher/Update/ResourceDiffUpdate/ResourceUpdateManager");
const ResourceDiffUpdater_1 = require("../../../Launcher/Update/ResourceDiffUpdate/Updater/ResourceDiffUpdater");
const VideoUpdateWrapper_1 = require("../../../Launcher/Update/ResourceDiffUpdate/Updater/VideoUpdateWrapper");
const VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class ResourceDiffUpdaterFactory {
  static async CreateLoginPrepareUpdaters() {
    var e = [];
    var r = ControllerHolder_1.ControllerHolder.ResourceManagerController.GetCoreMapBlocks();
    if (r.length > 0 && (a = await this.GetOrCreateMapBlockUpdater("LoginPrepare_MapBlock", r, 100))) {
      e.push(a);
    }
    var a = ModelManager_1.ModelManager.QuestResourceModel.GetLoginQuestsMp4Ids();
    var t = await this.GetOrCreateVideoUpdater("LoginPrepare_QuestVideo", 100, 6, a);
    e.push(t);
    return [e, r, a];
  }
  static async GetOrCreateMapBlockUpdater(e, t, r) {
    var a;
    if (this.CIr.has(e)) {
      return this.CIr.get(e);
    } else {
      a = ControllerHolder_1.ControllerHolder.ResourceManagerController.GetMapBlockResPackageInfos(t);
      await (r = new ResourceDiffUpdater_1.ResourceDiffUpdater(e, r, a)).Init();
      r.AddOnDownloadFinish(e => {
        if (e === 4) {
          var r = ControllerHolder_1.ControllerHolder.ResourceManagerController;
          for (const a of t) {
            r.UpdateBlockDownloadState(a, true);
          }
        }
      });
      this.CIr.set(e, r);
      return r;
    }
  }
  static async GetOrCreateVideoUpdater(e, r, a, t) {
    if (!VideoResUpdate_1.VideoResUpdate.ManifestInited) {
      await VideoResUpdate_1.VideoResUpdate.AnalyzeVideoManifests(0n, undefined);
    }
    if (this.CIr.has(e)) {
      return this.CIr.get(e);
    }
    var o = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdaterWithName(a, e);
    if (t.length !== 0) {
      let e = VideoResUpdate_1.VideoResUpdate.GetVideoResPakByVideoIds(t);
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      if (t === 1) {
        e = e.filter(e => !e.endsWith("_0"));
      } else if (t === 0) {
        e = e.filter(e => !e.endsWith("_1"));
      }
      o.SetCustomDownloadList(e);
    }
    t = new VideoUpdateWrapper_1.VideoUpdateWrapper(e, r, a, o);
    await t.Init();
    this.CIr.set(e, t);
    return t;
  }
  static AddToDownloadList(e, r) {
    if (e) {
      e = this.CIr.get(e);
      if (e) {
        ResourceUpdateManager_1.ResourceDiffUpdaterManager.AddUpdater(e);
        return true;
      }
    }
    return !!r && (ResourceUpdateManager_1.ResourceDiffUpdaterManager.AddUpdater(r), true);
  }
  static CancelUpdater(e, r) {
    if (e) {
      e = this.CIr.get(e);
      if (e) {
        ResourceUpdateManager_1.ResourceDiffUpdaterManager.RemoveUpdater(e);
        return true;
      }
    }
    return !!r && (ResourceUpdateManager_1.ResourceDiffUpdaterManager.RemoveUpdater(r), true);
  }
}
(exports.ResourceDiffUpdaterFactory = ResourceDiffUpdaterFactory).CIr = new Map();
//# sourceMappingURL=ResUpdateFactory.js.map