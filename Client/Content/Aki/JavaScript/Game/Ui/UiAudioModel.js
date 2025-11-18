"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiAudioModel = undefined;
const AudioDefine_1 = require("../../Core/Audio/AudioDefine");
const AudioSystem_1 = require("../../Core/Audio/AudioSystem");
const Log_1 = require("../../Core/Common/Log");
class UiAudioModel {
  static AddAudioStateData(i) {
    this.nCr.add(i);
  }
  static RemoveAudioStateData(i) {
    return this.nCr.delete(i);
  }
  static sCr() {
    let i = 0;
    for (const e of this.nCr.values()) {
      if (i < e.Level) {
        i = e.Level;
      }
    }
    return i;
  }
  static aCr() {
    let i = 0;
    for (const e of this.nCr.values()) {
      i = i + e.Alpha - i * e.Alpha;
    }
    return i;
  }
  static SetLoopAudioEventShow(i, e, o) {
    if (this.LastLoopAudio[0] === 0) {
      this.LastLoopAudio = [i, o];
      AudioSystem_1.AudioSystem.PostEvent(o);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 75, "Audio BGM, New View", ["viewId", i], ["event", o]);
      }
    } else if (i !== this.LastLoopAudio[0] && o !== this.LastLoopAudio[1]) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.LastLoopAudio[1], 0);
      this.LastLoopAudio = [i, o];
      AudioSystem_1.AudioSystem.PostEvent(o);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 75, "Audio BGM, New BGM", ["viewId", i], ["event", o]);
      }
    } else {
      this.LastLoopAudio = [i, o];
      AudioSystem_1.AudioSystem.ExecuteAction(this.LastLoopAudio[1], 2);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 75, "Audio BGM, Show Same", ["viewId", i], ["event", o]);
      }
    }
  }
  static SetLoopAudioEventHide(i, e, o) {
    if (i === this.LastLoopAudio[0] && (AudioSystem_1.AudioSystem.ExecuteAction(this.LastLoopAudio[1], 1), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Audio", 75, "Audio BGM, Hide", ["viewId", i], ["event", o]);
    }
  }
  static SetLoopAudioEventDestroy(i, e, o) {
    if (i === this.LastLoopAudio[0]) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.LastLoopAudio[1], 0);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 75, "Audio BGM, Destroy", ["viewId", i], ["event", o]);
      }
      this.LastLoopAudio = [0, ""];
    }
  }
  static KeepLoopAudioEventShow(i, e) {
    var o;
    if (this.LastLoopAudio[0] !== 0) {
      o = this.LastLoopAudio[1];
      UiAudioModel.SetLoopAudioEventShow(i, e, o);
    }
  }
  static KeepLoopAudioEventHide(i, e) {
    var o;
    if (this.LastLoopAudio[0] === i) {
      o = this.LastLoopAudio[1];
      UiAudioModel.SetLoopAudioEventHide(i, e, o);
    }
  }
  static KeepLoopAudioEventDestroy(i, e) {
    var o;
    if (this.LastLoopAudio[0] === i) {
      o = this.LastLoopAudio[1];
      UiAudioModel.SetLoopAudioEventDestroy(i, e, o);
    }
  }
  static SetRtpcLevelOpening(i) {
    AudioSystem_1.AudioSystem.SetRtpcValue(AudioDefine_1.RPTC_COVER_LEVEL_OPENING, i);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Audio", 10, "Audio计算结果", [AudioDefine_1.RPTC_COVER_LEVEL_OPENING, i]);
    }
  }
  static SetRtpcLevelClosing(i) {
    AudioSystem_1.AudioSystem.SetRtpcValue(AudioDefine_1.RPTC_COVER_LEVEL_CLOSING, i);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Audio", 10, "Audio计算结果", [AudioDefine_1.RPTC_COVER_LEVEL_CLOSING, i]);
    }
  }
  static CalculateRtpcValueAndApply() {
    var i = this.sCr();
    AudioSystem_1.AudioSystem.SetRtpcValue(AudioDefine_1.RTPC_COVER_LEVEL, i);
    var e = this.aCr();
    AudioSystem_1.AudioSystem.SetRtpcValue(AudioDefine_1.RTPC_COVER_ALPHA, i);
    var o = i - this.hCr;
    this.hCr = i;
    AudioSystem_1.AudioSystem.SetRtpcValue(AudioDefine_1.RTPC_COVER_LEVEL_DELTA, i);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Audio", 10, "Audio计算结果", [AudioDefine_1.RTPC_COVER_LEVEL, i], [AudioDefine_1.RTPC_COVER_ALPHA, e], [AudioDefine_1.RTPC_COVER_LEVEL_DELTA, o]);
    }
  }
}
(exports.UiAudioModel = UiAudioModel).nCr = new Set();
UiAudioModel.hCr = 0;
UiAudioModel.LastLoopAudio = [0, ""]; //# sourceMappingURL=UiAudioModel.js.map