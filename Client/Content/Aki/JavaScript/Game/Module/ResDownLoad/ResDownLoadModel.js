"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResDownLoadModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate");
const VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
class ResDownLoadModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CurrentDownLoadVideo = -1;
    this.fau = undefined;
    this.OnDownLoadStateChange = e => {
      var a;
      if (e === 3) {
        if (UiManager_1.UiManager.IsViewOpen("ResDownLoadView")) {
          UiManager_1.UiManager.CloseView("ResDownLoadView");
        }
        if ((a = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()) === 0 && this.CurrentDownLoadVideo === 3 || a === 1 && this.CurrentDownLoadVideo === 4) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DownloadCompletedTip1");
        } else if (a === 1 && this.CurrentDownLoadVideo === 3 || a === 0 && this.CurrentDownLoadVideo === 4) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DownloadCompletedTip2");
        }
        this.CurrentDownLoadVideo = -1;
      } else if (e === 2) {
        this.CurrentDownLoadVideo = -1;
      }
      ModelManager_1.ModelManager.QuestResourceModel.RefreshCachePrepareResourceSize();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResDownLoadStateRefresh, e);
    };
    this.OnDownLoadFailed = e => {
      if (e) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DownLoadTips_NotEnough");
      }
    };
  }
  OnInit() {
    VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).SetDownLoadStateChangeCallBack(this.OnDownLoadStateChange);
    VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).SetDownLoadStateChangeCallBack(this.OnDownLoadStateChange);
    VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).SetDownLoadFailedCallBack(this.OnDownLoadFailed);
    VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).SetDownLoadFailedCallBack(this.OnDownLoadFailed);
    return true;
  }
  OnClear() {
    return !(this.fau = undefined);
  }
  DownLoadPercentage() {
    var e;
    var a = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).GetDownLoadState();
    var o = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).GetDownLoadState();
    if (a === 1) {
      this.fau = 3;
    } else if (o === 1) {
      this.fau = 4;
    } else if (this.fau === undefined) {
      a = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      this.fau = a === 1 ? 4 : 3;
    }
    var o = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(this.fau);
    var a = o.GetDownLoadProgress();
    if (a[2] && a[1] > 0) {
      return [Number(a[1]) / Number(a[2]), o.GetDownLoadState()];
    } else {
      a = VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(this.fau);
      e = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.fau);
      return [Number(a) / Number(e), o.GetDownLoadState()];
    }
  }
  NeedShowBattleViewButton() {
    ModelManager_1.ModelManager.QuestResourceModel.CalcPrepareResource();
    return ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 && VideoResUpdate_1.VideoResUpdate.GetVideoResSize(4) !== VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(4) || ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0 && VideoResUpdate_1.VideoResUpdate.GetVideoResSize(3) !== VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(3) || !!VideoResUpdate_1.VideoResUpdate.GetIsResPakDownloading(4) || !!VideoResUpdate_1.VideoResUpdate.GetIsResPakDownloading(3) || VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).GetDownLoadState() === 1 || VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).GetDownLoadState() === 1;
  }
}
exports.ResDownLoadModel = ResDownLoadModel;
//# sourceMappingURL=ResDownLoadModel.js.map