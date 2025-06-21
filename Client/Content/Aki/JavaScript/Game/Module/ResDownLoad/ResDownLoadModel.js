"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ResDownLoadModel = void 0;
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate"),
  VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager");
class ResDownLoadModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.CurrentDownLoadVideo = -1, this.Rru = void 0, this.OnDownLoadStateChange = e => {
      var a;
      3 === e ? (UiManager_1.UiManager.IsViewOpen("ResDownLoadView") && UiManager_1.UiManager.CloseView("ResDownLoadView"), 0 === (a = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()) && 3 === this.CurrentDownLoadVideo || 1 === a && 4 === this.CurrentDownLoadVideo ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DownloadCompletedTip1") : (1 === a && 3 === this.CurrentDownLoadVideo || 0 === a && 4 === this.CurrentDownLoadVideo) && ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DownloadCompletedTip2"), this.CurrentDownLoadVideo = -1) : 2 === e && (this.CurrentDownLoadVideo = -1), ModelManager_1.ModelManager.QuestResourceModel.RefreshCachePrepareResourceSize(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResDownLoadStateRefresh, e)
    }, this.OnDownLoadFailed = e => {
      e && ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DownLoadTips_NotEnough")
    }
  }
  OnInit() {
    return VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).SetDownLoadStateChangeCallBack(this.OnDownLoadStateChange), VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).SetDownLoadStateChangeCallBack(this.OnDownLoadStateChange), VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).SetDownLoadFailedCallBack(this.OnDownLoadFailed), VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).SetDownLoadFailedCallBack(this.OnDownLoadFailed), !0
  }
  OnClear() {
    return !(this.Rru = void 0)
  }
  DownLoadPercentage() {
    var e, a = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).GetDownLoadState(),
      o = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).GetDownLoadState(),
      o = (1 === a ? this.Rru = 3 : 1 === o ? this.Rru = 4 : void 0 === this.Rru && (a = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender(), this.Rru = 1 === a ? 4 : 3), VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(this.Rru)),
      a = o.GetDownLoadProgress();
    return a[2] && 0 < a[1] ? [Number(a[1]) / Number(a[2]), o.GetDownLoadState()] : (a = VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(this.Rru), e = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.Rru), [Number(a) / Number(e), o.GetDownLoadState()])
  }
  NeedShowBattleViewButton() {
    return ModelManager_1.ModelManager.QuestResourceModel.CalcPrepareResource(), 1 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() && VideoResUpdate_1.VideoResUpdate.GetVideoResSize(4) !== VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(4) || 0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() && VideoResUpdate_1.VideoResUpdate.GetVideoResSize(3) !== VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(3) || !!VideoResUpdate_1.VideoResUpdate.GetIsResPakDownloading(4) || !!VideoResUpdate_1.VideoResUpdate.GetIsResPakDownloading(3) || 1 === VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).GetDownLoadState() || 1 === VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).GetDownLoadState()
  }
}
exports.ResDownLoadModel = ResDownLoadModel;
//# sourceMappingURL=ResDownLoadModel.js.map