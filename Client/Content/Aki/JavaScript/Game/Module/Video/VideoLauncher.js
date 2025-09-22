"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoLauncher = undefined;
const AudioController_1 = require("../../../Core/Audio/AudioController");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiManager_1 = require("../../Ui/UiManager");
class VideoLauncher {
  static ShowVideoCg(e, i, o, r, a = false) {
    if (e) {
      VideoLauncher.ShowVideoCgAsync(e, i, o, r, a);
    } else {
      i();
    }
  }
  static async ShowVideoCgAsync(e, i, o, r, a) {
    this.PNo = i;
    var n = ConfigManager_1.ConfigManager.VideoConfig.GetVideoData(e);
    if (n) {
      this.pDe = {
        VideoDataConf: n,
        VideoCloseCb: this.Bto,
        BackgroundColor: o,
        RemainViewWhenEnd: r
      };
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Video", 38, "打开视频播放界面", ["视频配置", e]);
      }
      if (UiManager_1.UiManager.IsViewShow("VideoView")) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayVideo, this.pDe);
      } else if (a) {
        const t = new CustomPromise_1.CustomPromise();
        UiManager_1.UiManager.OpenViewByPlot("VideoView", this.pDe, () => {
          t.SetResult();
        });
        await t.Promise;
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
}
exports.VideoLauncher = VideoLauncher;
(_a = VideoLauncher).PNo = undefined;
VideoLauncher.pDe = undefined;
VideoLauncher.Bto = () => {
  var e;
  if (_a.PNo) {
    e = _a.PNo;
    _a.PNo = undefined;
    e();
  }
};
VideoLauncher.AudioEventResult = new AudioController_1.PlayResult(); //# sourceMappingURL=VideoLauncher.js.map