"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaPlayer = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
class MediaPlayer {
  constructor(i) {
    this.CgTexture = undefined;
    this.MediaPlayer = undefined;
    this.VideoName = undefined;
    this.MUe = ResourceSystem_1.ResourceSystem.InvalidId;
    this.Jja = undefined;
    this.KNo = () => {
      this.Jja?.(this.VideoName);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Video", 37, "[MediaPlayer] 视频播放结束", ["视频名称", this.VideoName]);
      }
    };
    this.QNo = () => {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Video", 37, "[MediaPlayer] 视频文件打开失败", ["视频名称", this.VideoName]);
      }
    };
    this.CgTexture = i;
    i = this.CgTexture.GetTexture();
    this.MediaPlayer = i?.GetMediaPlayer();
    if (this.MediaPlayer) {
      this.MediaPlayer.OnEndReached.Add(this.KNo);
      this.MediaPlayer.OnMediaOpenFailed.Add(this.QNo);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Video", 37, "[MediaPlayer] 获取MediaPlayer异常");
    }
  }
  Clear() {
    this.bra();
    this.MediaPlayer?.OnEndReached.Remove(this.KNo);
    this.MediaPlayer?.OnMediaOpenFailed.Remove(this.QNo);
    this.MediaPlayer?.Close();
    this.MediaPlayer = undefined;
  }
  bra() {
    if (this.MUe !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.MUe);
      this.MUe = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (this.MediaPlayer?.IsPlaying() ?? this.MediaPlayer?.IsPaused()) {
      this.MediaPlayer?.Close();
    }
    this.VideoName = undefined;
  }
  PlayVideo(e, s, t = false) {
    if (s && (this.VideoName && this.bra(), this.MUe = ResourceSystem_1.ResourceSystem.LoadAsync(s, UE.MediaSource, i => {
      if (i) {
        this.MUe = ResourceSystem_1.ResourceSystem.InvalidId;
        if (this.MediaPlayer.OpenSource(i)) {
          this.MediaPlayer.SetLooping(t);
          this.VideoName = e;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Video", 37, "[MediaPlayer] 打开视频失败", ["配置名称", e], ["视频路径", s]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Video", 37, "[MediaPlayer] mediaSource加载失败", ["配置名称", e], ["视频路径", s]);
      }
    }, 100, "Ui.UiVideo"), this.MUe < 0) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Video", 37, "[MediaPlayer] mediaSource加载失败", ["配置名称", e], ["视频路径", s]);
    }
  }
  async LoadVideoAndPlay(e, s, t = false) {
    if (s) {
      if (this.VideoName) {
        this.bra();
      }
      const o = new CustomPromise_1.CustomPromise();
      this.MUe = ResourceSystem_1.ResourceSystem.LoadAsync(s, UE.MediaSource, i => {
        if (i) {
          this.MUe = ResourceSystem_1.ResourceSystem.InvalidId;
          if (this.MediaPlayer.OpenSource(i)) {
            this.MediaPlayer.SetLooping(t);
            this.VideoName = e;
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Video", 37, "[MediaPlayer] 打开视频失败", ["配置名称", e], ["视频路径", s]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Video", 37, "[MediaPlayer] mediaSource加载失败", ["配置名称", e], ["视频路径", s]);
        }
        o.SetResult();
      }, 100, "Ui.UiVideo");
      await o.Promise;
    }
  }
  StopVideo(i) {
    if (this.VideoName === i) {
      if (this.MediaPlayer.IsPlaying() || this.MediaPlayer.IsPaused()) {
        this.MediaPlayer.Close();
      }
      this.VideoName = undefined;
    }
  }
  PauseVideo(i) {
    if (this.VideoName === i && this.MediaPlayer.IsPlaying()) {
      this.MediaPlayer.Pause();
    }
  }
  ResumeVideo(i) {
    if (this.VideoName === i && this.MediaPlayer.IsPaused()) {
      this.MediaPlayer.Play();
    }
  }
  BindCallbackOnVideoEnd(i) {
    this.Jja = i;
  }
  GetVideoAspect(i = 0, e = 0) {
    return this.MediaPlayer.GetVideoTrackAspectRatio(i, e);
  }
}
exports.MediaPlayer = MediaPlayer;
//# sourceMappingURL=MediaPlayer.js.map