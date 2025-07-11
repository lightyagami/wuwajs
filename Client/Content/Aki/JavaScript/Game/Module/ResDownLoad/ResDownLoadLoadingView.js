"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResDownLoadLoadingView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const HotFixManager_1 = require("../../../Launcher/Ui/HotFix/HotFixManager");
const VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../Util/LguiUtil");
class ResDownLoadLoadingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TDe = undefined;
    this.U51 = 0n;
    this.AF1 = e => {
      if (e === 3) {
        this.B51();
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(313)).IsEscViewTriggerCallBack = true;
        e.FunctionMap.set(0, () => {
          this.CloseMe();
          ModelManager_1.ModelManager.QuestResourceModel.UserClicked();
        });
        e.FunctionMap.set(1, () => {
          this.CloseMe();
          ModelManager_1.ModelManager.QuestResourceModel.UserClicked();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResDownLoadStateRefresh, this.AF1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResDownLoadStateRefresh, this.AF1);
  }
  OnStart() {
    this.Og();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.Og();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  B51() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "DownLoadText_Downing");
    var e = Number(this.U51) / Number(this.U51);
    var i = HotFixManager_1.HotFixManager.ByteConverter(0) + "/s ";
    var t = "(" + HotFixManager_1.HotFixManager.ByteConverter(this.U51) + "/" + HotFixManager_1.HotFixManager.ByteConverter(this.U51) + ") ";
    this.GetTexture(0).SetFillAmount(e);
    var e = (e * 100).toFixed(2).replace(/\.?0+$/, "") + "%";
    this.GetText(2).SetText(i + t + e);
  }
  Og() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    let i = undefined;
    i = (e === 1 ? VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4) : VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3)).GetDownLoadProgress();
    this.U51 = i[2];
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "DownLoadText_Downing");
    var e = Number(i[1]) / Number(i[2]);
    var t = HotFixManager_1.HotFixManager.ByteConverter(i[3]) + "/s ";
    var r = "(" + HotFixManager_1.HotFixManager.ByteConverter(i[1]) + "/" + HotFixManager_1.HotFixManager.ByteConverter(i[2]) + ") ";
    this.GetTexture(0).SetFillAmount(e);
    var e = (e * 100).toFixed(2).replace(/\.?0+$/, "") + "%";
    this.GetText(2).SetText(t + r + e);
  }
  OnBeforeDestroy() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.ResDownLoadLoadingView = ResDownLoadLoadingView;
//# sourceMappingURL=ResDownLoadLoadingView.js.map