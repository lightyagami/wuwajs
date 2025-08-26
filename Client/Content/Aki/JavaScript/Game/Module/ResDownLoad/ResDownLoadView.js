"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResDownLoadView = undefined;
const UE = require("ue");
const DownLoadTabById_1 = require("../../../Core/Define/ConfigQuery/DownLoadTabById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate");
const HotFixManager_1 = require("../../../Launcher/Ui/HotFix/HotFixManager");
const VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager");
const LauncherTextLib_1 = require("../../../Launcher/Util/LauncherTextLib");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const QuestController_1 = require("../QuestNew/Controller/QuestController");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
class VideoResourceUpdateProxy {
  async ShowNotEnoughSpaceConfirmation(s) {
    return new Promise(e => {
      var t = new LogReportDefine_1.DownloadVideoResNotEnoughSpaceLogData();
      t.i_popup_type = 2;
      t.b_if_storage_alert = true;
      t.i_required_space = Number(s) / LauncherTextLib_1.NUMBER_MB;
      var i = VideoResUpdate_1.VideoResUpdate.GetFreeSpace();
      t.i_remaining_space = Number(i) / LauncherTextLib_1.NUMBER_MB;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
      QuestController_1.QuestNewController.SetIsReportDownloadNotEnoughSpace(true);
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(321);
      var t = () => {
        e(false);
      };
      var o = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(s);
      i.SetTextArgs(o);
      i.FunctionMap.set(2, () => {
        e(true);
      });
      i.FunctionMap.set(1, t);
      i.FunctionMap.set(0, t);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(i);
    });
  }
  UpdatePatchProgress(e, t, i, o) {}
}
class ResDownLoadView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Z31 = -1;
    this.VF1 = 0;
    this.$F1 = undefined;
    this.ebl = undefined;
    this.TDe = undefined;
    this.Qeu = undefined;
    this.AF1 = e => {
      this.VF1 = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(this.Z31).GetDownLoadState();
      this.WF1();
    };
    this.wwe = () => {
      if (this.VF1 === 2) {
        ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo = -1;
        VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(this.Z31).CancelDownload();
      }
    };
    this.Pwe = () => {
      var e;
      if (ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo > 0 && this.Z31 !== ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DownLoadTips_WaitOtherDown");
      } else if (this.VF1 === 0) {
        e = VideoResUpdate_1.VideoResUpdate.GetFreeSpace();
        if (VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.Z31) <= 0) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HaveDownLoadResTips");
        } else if (e < VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.Z31)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DownLoadTips_NotEnough");
        } else {
          QuestController_1.QuestNewController.SetIsReportDownloadNotEnoughSpace(false);
          VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(this.Z31).Update(this.Z31, this.Qeu);
          ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo = this.Z31;
        }
      } else if (this.VF1 === 1) {
        VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(this.Z31).Pause();
        ModelManager_1.ModelManager.QuestResourceModel.CalcPrepareResource();
        ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo = -1;
      } else if (this.VF1 === 2) {
        QuestController_1.QuestNewController.SetIsReportDownloadNotEnoughSpace(false);
        VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(this.Z31).Update(this.Z31, this.Qeu);
        ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo = this.Z31;
      }
    };
    this.kqe = (e, t, i) => {
      this.ebl?.SetToggleState(0);
      this.ebl = i;
      this.Z31 = t;
      this.QF1(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIText], [8, UE.UIButtonComponent], [10, UE.UIButtonComponent], [12, UE.UIText], [9, UE.UIText], [11, UE.UIText], [13, UE.UIItem]];
    this.BtnBindInfo = [[8, this.wwe], [10, this.Pwe]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResDownLoadStateRefresh, this.AF1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResDownLoadStateRefresh, this.AF1);
  }
  OnStart() {
    this.ChildPopView?.PopItem?.SetMaskResponsibleState(false);
    this.$F1 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), () => {
      var e = new ResDownLoadViewTabItem();
      e.OnClickExtendToggleCallBack = this.kqe;
      return e;
    });
    this.VF1 = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(this.Z31).GetDownLoadState();
    if (this.Qeu === undefined) {
      this.Qeu = new VideoResourceUpdateProxy();
    }
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.WF1();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
    this.GetButton(8).RootUIComp.SetUIActive(false);
  }
  OnBeforeDestroy() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    this.Qeu &&= undefined;
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.QuestResourceModel?.CalcPrepareResource();
    var e = [];
    e.push(3);
    e.push(4);
    this.$F1.RefreshByData(e, () => {
      var e;
      (ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo > 0 && ((e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()) === 1 && ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo === 3 || e === 0 && ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo === 4) ? this.$F1.GetLayoutItemByIndex(1) : this.$F1.GetLayoutItemByIndex(0)).SelectToggle();
    });
    this.WF1();
  }
  WF1() {
    switch (this.VF1) {
      case 0:
        this.e41();
        break;
      case 3:
        this.GetItem(13).SetUIActive(true);
        this.GetButton(10).RootUIComp.SetUIActive(false);
        this.GetText(4).SetUIActive(false);
        this.GetItem(5).SetUIActive(false);
        break;
      case 1:
        var e = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(this.Z31).GetDownLoadProgress();
        if (e[2]) {
          this.GetText(7).SetUIActive(true);
          this.GetText(4).SetUIActive(false);
          this.GetItem(5).SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "DownLoadText_Downing");
          t = Number(e[1]) / Number(e[2]);
          i = HotFixManager_1.HotFixManager.ByteConverter(e[3]) + "/s ";
          e = "(" + HotFixManager_1.HotFixManager.ByteConverter(e[1]) + "/" + HotFixManager_1.HotFixManager.ByteConverter(e[2]) + ") ";
          this.GetTexture(6).SetFillAmount(t);
          t = (t * 100).toFixed(2).replace(/\.?0+$/, "") + "%";
          this.GetText(7).SetText(i + e + t);
          this.GetButton(10).RootUIComp.SetUIActive(true);
          this.GetItem(13).SetUIActive(false);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "DownLoadButton_Pause");
        } else {
          this.GetTexture(6).SetFillAmount(0);
        }
        break;
      case 2:
        this.GetText(4).SetUIActive(false);
        this.GetItem(5).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "DownLoadText_Pause");
        this.GetButton(10).RootUIComp.SetUIActive(true);
        this.GetItem(13).SetUIActive(false);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "DownLoadButton_Cancel");
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "DownLoadButton_Continue");
        var t;
        var i = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(this.Z31).GetDownLoadProgress();
        if (i[2]) {
          e = Number(i[1]) / Number(i[2]);
          t = "(" + HotFixManager_1.HotFixManager.ByteConverter(i[1]) + "/" + HotFixManager_1.HotFixManager.ByteConverter(i[2]) + ") ";
          this.GetTexture(6).SetFillAmount(e);
          i = (e * 100).toFixed(2).replace(/\.?0+$/, "") + "%";
          this.GetText(7).SetUIActive(true);
          this.GetText(7).SetText(t + i);
        } else {
          this.GetText(7).SetUIActive(false);
        }
    }
  }
  e41() {
    var e = VideoResUpdate_1.VideoResUpdate.GetFreeSpace();
    if (e > VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.Z31)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "DownLoadText_LeftSpace", `<color=#36cd33>${HotFixManager_1.HotFixManager.ByteConverter(e)}</color>`);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "DownLoadText_LeftSpace", `<color=#c25757>${HotFixManager_1.HotFixManager.ByteConverter(e)}</color>`);
    }
    this.GetText(4).SetUIActive(true);
    this.GetItem(5).SetUIActive(false);
    this.GetButton(10).RootUIComp.SetUIActive(true);
    this.GetItem(13).SetUIActive(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "DownLoadButton_Down");
  }
  QF1(e) {
    e = DownLoadTabById_1.configDownLoadTabById.GetConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.ContentTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.Content);
    this.VF1 = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(this.Z31).GetDownLoadState();
    if (this.VF1 === 0) {
      if (VideoResUpdate_1.VideoResUpdate.GetIsResPakDownloading(this.Z31)) {
        this.VF1 = 2;
      } else if (VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.Z31) === VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(this.Z31)) {
        this.VF1 = 3;
      }
    }
    this.WF1();
  }
  OnBeforeHide() {
    if (this.VF1 === 1) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DownLoadTips_Downing");
    }
  }
}
exports.ResDownLoadView = ResDownLoadView;
class ResDownLoadViewTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.vua = 0;
    this.SIr = 0;
    this.OnClickExtendToggleCallBack = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText]];
  }
  OnStart() {
    const t = this.GetExtendToggle(0);
    t.OnStateChange.Add(e => {
      if (e === 1 && this.OnClickExtendToggleCallBack) {
        this.OnClickExtendToggleCallBack(this.vua, this.SIr, t);
      }
    });
  }
  Refresh(e) {
    this.vua = e;
    e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (this.vua === 3) {
      this.SIr = e === 1 ? 4 : 3;
    } else {
      this.SIr = e === 1 ? 3 : 4;
    }
    e = DownLoadTabById_1.configDownLoadTabById.GetConfig(this.vua);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title);
    e = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.SIr);
    if (e === VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(this.SIr)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "HaveDownLoadRes");
    } else {
      this.GetText(2).SetText(HotFixManager_1.HotFixManager.ByteConverter(e));
    }
  }
  SelectToggle() {
    this.GetExtendToggle(0).SetToggleState(1, true);
  }
}
//# sourceMappingURL=ResDownLoadView.js.map