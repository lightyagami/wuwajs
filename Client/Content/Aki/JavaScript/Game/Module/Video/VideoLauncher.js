"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoLauncher = undefined;
const AudioController_1 = require("../../../Core/Audio/AudioController");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiManager_1 = require("../../Ui/UiManager");
class VideoLauncher {
  static ShowVideoCg(e, i, o) {
    if (e) {
      VideoLauncher.ShowVideoCgAsync(e, i, o);
    } else {
      i();
    }
  }
  static async ShowVideoCgAsync(e, i, o) {
    this.PNo = i;
    var r = ConfigManager_1.ConfigManager.VideoConfig.GetVideoData(e);
    if (r) {
      this.pDe = {
        VideoDataConf: r,
        VideoCloseCb: this.Bto,
        BackgroundColor: o?.BackgroundFade,
        RemainViewWhenEnd: o?.RemainViewWhenEnd,
        ProgramSpecialConfig: o?.ProgramSpecialConfig,
        Mp4FadeOutTime: o?.Mp4FadeOutTime,
        BlackBorderFadeOutTime: o?.BlackBorderFadeOutTime,
        Mp4BlendAnim: o?.Mp4BlendAnim
      };
      r = o?.InPlot;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Video", 38, "打开视频播放界面", ["视频配置", e]);
      }
      if (UiManager_1.UiManager.IsViewShow("VideoView")) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayVideo, this.pDe);
      } else if (r) {
        const n = new CustomPromise_1.CustomPromise();
        UiManager_1.UiManager.OpenViewByPlot("VideoView", this.pDe, () => {
          n.SetResult();
        });
        await n.Promise;
      } else {
        await UiManager_1.UiManager.OpenViewAsync("VideoView", this.pDe);
      }
    } else {
      i?.();
    }
  }
  static CloseVideoCg(e) {
    this.PNo = undefined;
    UiManager_1.UiManager.CloseView("VideoView", e);
  }
  static SetupFrameEvent(e) {
    if (e) {
      this.FrameEvents = [...e];
      if (this.FrameEvents && this.FrameEvents.length > 0) {
        this.FrameEvents.sort((e, i) => i.Second - e.Second);
      }
    } else {
      this.FrameEvents = undefined;
    }
  }
  static OnCheckFrameEvent(e) {
    if (this.FrameEvents) {
      while (this.FrameEvents.length > 0) {
        if (!(this.FrameEvents[this.FrameEvents.length - 1].Second <= e * CommonDefine_1.SECOND_PER_MILLIONSECOND)) {
          break;
        }
        var i = this.FrameEvents.pop();
        ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(i.EventActions, undefined, true);
      }
    }
  }
}
exports.VideoLauncher = VideoLauncher;
(_a = VideoLauncher).PNo = undefined;
VideoLauncher.pDe = undefined;
VideoLauncher.FrameEvents = undefined;
VideoLauncher.AudioEventResult = new AudioController_1.PlayResult();
VideoLauncher.Bto = () => {
  var e;
  if (_a.PNo) {
    e = _a.PNo;
    _a.PNo = undefined;
    e();
  }
}; //# sourceMappingURL=VideoLauncher.js.map