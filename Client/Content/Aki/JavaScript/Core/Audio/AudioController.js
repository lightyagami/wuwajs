"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioController = exports.PlayResult = undefined;
const UE = require("ue");
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const ResourceSystem_1 = require("../Resource/ResourceSystem");
const StringBuilder_1 = require("../Utils/StringBuilder");
const StringUtils_1 = require("../Utils/StringUtils");
const AudioPool_1 = require("./AudioPool");
class PlayResult {
  constructor() {
    this.EventPath = "";
    this.PlayingIds = [];
    this.CallbackIds = [];
  }
  Reset() {
    this.PlayingIds = [];
    this.CallbackIds = [];
  }
  AddPlayingId(t) {
    if (t && !this.PlayingIds.includes(t)) {
      this.PlayingIds.push(t);
    }
  }
  AddCallbackId(t) {
    if (t && !this.CallbackIds.includes(t)) {
      this.CallbackIds.push(t);
    }
  }
  RemoveCallbackId(t) {
    t = this.CallbackIds.indexOf(t, 0);
    if (t > -1) {
      this.CallbackIds.splice(t, 1);
    }
  }
}
exports.PlayResult = PlayResult;
class AudioController {
  static PostEventByUi(t, o, e, i) {
    this.PostEvent(t, undefined, o, e, i);
  }
  static PostEvent(t, o, e, i, r, l, s = true, a = "") {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 39, "[AudioController.PostEvent] 播放AkEvent: ", ["eventPath", t], ["callbackMask", i]);
    }
    let n = 0;
    function u() {
      n = AudioController.PlayAudioByEventPath(t, o, i, r, l, s, a);
      if (e) {
        e.AddPlayingId(n);
        e.CallbackIds = [];
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 39, "[AudioController.PostEvent] PlayAudioByEventPath", ["eventPath", t], ["callbackMask", i], ["playingId", n], ["playingIds", e?.PlayingIds]);
      }
    }
    if (e) {
      e.EventPath = t;
    }
    if (AudioController.GetAudioEvent(t, false)) {
      u();
    } else {
      AudioController.LoadAndAddCallback(t, () => {
        u();
      }, e);
    }
  }
  static PostEventByComponent(t, o, e, i, r, l, s = true) {
    let a = 0;
    function n() {
      a = AudioController.P6(t, o, r, l, s);
      if (e) {
        e.AddPlayingId(a);
        e.CallbackIds = [];
      }
      if (i) {
        i();
      }
    }
    if (e) {
      e.EventPath = t;
    }
    if (AudioController.GetAudioEvent(t, false)) {
      n();
    } else {
      AudioController.LoadAndAddCallback(t, () => {
        n();
      }, e);
    }
  }
  static StopEvent(t, o = true, e) {
    if (o && t.PlayingIds.length > 0) {
      for (const i of t.PlayingIds) {
        AudioController.StopAudioByPlayId(i, e);
      }
      t.PlayingIds = [];
    }
    if (t.CallbackIds.length > 0) {
      for (const r of t.CallbackIds) {
        AudioController.x6(t.EventPath, r);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Audio", 33, "停止加载音频", ["eventPath", t.EventPath], ["CallbackId", r]);
        }
      }
      t.CallbackIds = [];
    }
  }
  static LoadAudioEvent(t) {
    if (t && t.length !== 0) {
      return AudioController.w6.GetAudioPool(t) !== undefined;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 21, "没有传入音频事件资源路径");
      }
      return false;
    }
  }
  static AddAudioEventCallback(t, o) {
    return AudioController.w6.AddCallbackToLoad(t, o);
  }
  static LoadAndAddCallback(t, o, e = undefined) {
    AudioController.w6.LoadAndAddCallback(t, o, e);
  }
  static x6(t, o) {
    AudioController.w6.DeleteCallback(t, o);
  }
  static PlayAudioByEventPath(o, e, i, r, l, s = true, a = "") {
    this.B6.Start();
    var n = AudioController.GetAudioEvent(o, false);
    if (o && n) {
      AudioController.w6.SetPlayFlag(o);
      let t = 0;
      t = e ? s ? UE.AkGameplayStatics.PostEvent(n, e, i, r, l, a) : UE.AkGameplayStatics.D_PostEventAtLocation(n, e.D_K2_GetActorLocation(), new UE.Rotator(0, 0, 0), a, e.GetWorld()) : n.PostOnActor(undefined, r, i ?? 0, false);
      this.B6.Stop();
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 21, "没有对应的音频事件资源，请检查是否已经加载！", ["eventPath", o]);
    }
    this.B6.Stop();
  }
  static P6(t, o, e, i, r = true) {
    var l = AudioController.GetAudioEvent(t, false);
    if (l) {
      AudioController.w6.SetPlayFlag(t);
      if (o) {
        if (r) {
          return o.PostAkEvent(l, e, i, l.GetName());
        } else {
          return UE.AkGameplayStatics.D_PostEventAtLocation(l, o.D_K2_GetComponentLocation(), new UE.Rotator(0, 0, 0), "", o.GetWorld());
        }
      } else {
        return l.PostOnActor(undefined, i, e ?? 0, false);
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 21, "没有对应的音频事件资源，请检查是否已经加载！", ["eventPath", t]);
    }
  }
  static StopAudio(t) {
    UE.KuroAudioStatics.StopAll(t);
  }
  static StopAudioByPlayId(t, o) {
    UE.AkGameplayStatics.ExecuteActionOnPlayingID(0, t, o);
  }
  static PauseAudioByPlayId(t) {
    UE.AkGameplayStatics.ExecuteActionOnPlayingID(1, t);
  }
  static ResumeAudioByPlayId(t) {
    UE.AkGameplayStatics.ExecuteActionOnPlayingID(2, t);
  }
  static ExecuteActionOnEvent(t, o, e) {
    UE.AkGameplayStatics.ExecuteActionOnEvent(t, o, e);
  }
  static SetSwitch(t, o, e) {
    UE.KuroAudioStatics.SetSwitch(t, o, e);
  }
  static SetSwitchValue(t, o) {
    UE.AkGameplayStatics.SetSwitch(t, o, undefined, undefined);
  }
  static SetState(t, o) {
    UE.KuroAudioStatics.SetState(t, o);
  }
  static Tick(t) {
    this.w6.Tick(t);
  }
  static SetRTPCValue(t, o, e, i, r) {
    UE.AkGameplayStatics.SetRTPCValue(e, t, i ?? 0, r, new UE.FName(o));
  }
  static GetRTPCValue(t, o, e, i, r = 0) {
    UE.AkGameplayStatics.GetRTPCValue(e, r, 3, t, undefined, i, new UE.FName(o));
  }
  static GetAudioEvent(t, o = true) {
    if (t && t.length !== 0) {
      return AudioController.w6.GetAudioPool(t, o);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 21, "没有传入音频事件资源路径");
    }
  }
  static PostEventNotInputPool(t, e, i, r, l, s, a = true) {
    if (StringUtils_1.StringUtils.IsNothing(t)) {
      if (i) {
        i(undefined);
      }
    } else {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AkAudioEvent, o => {
        if (o?.IsValid()) {
          let t = 0;
          t = e ? a ? UE.AkGameplayStatics.PostEvent(o, e, r, l, s) : UE.AkGameplayStatics.D_PostEventAtLocation(o, e.D_K2_GetActorLocation(), new UE.Rotator(0, 0, 0), "", e.GetWorld()) : o.PostOnActor(undefined, l, r ?? 0, false);
          if (i) {
            i(o, t);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Audio", 21, "不进入缓存池音效加载资源失败：", ["eventPath: ", t]);
          }
          if (i) {
            i(undefined);
          }
        }
      });
    }
  }
  static PostEventByExternalSourcesByUi(t, o, e, i, r, l, s) {
    this.PostEventByExternalSources(t, undefined, o, e, i, r, l, s);
  }
  static PostEventByExternalSources(t, o, e, i, r, l, s, a) {
    if ((StringUtils_1.StringUtils.IsNothing(e) || StringUtils_1.StringUtils.IsNothing(i)) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 21, "输入MediaName 或者 ExternalSourceName 异常", ["MediaName", e], ["ExternalSourceName", i]);
    }
    UE.WwiseExternalSourceStatics.SetExternalSourceMediaByName(i, e);
    AudioController.PostEvent(t, o, r, s, a);
  }
  static SetMultiplePositions(t, o, e) {
    UE.AkGameplayStatics.D_SetMultiplePositions(t, o, e);
  }
  static PostSelectableAudioEvent(t, o) {
    o = this.b6(t, o.GetName());
    o = this.q6(o);
    if (o) {
      AudioController.PostEventByUi(t, o);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 21, "点击声音!!!!!!!!!!!", ["eventPath", t]);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCore", 21, "没有点击声音!!!!!!!!");
    }
  }
  static StopSelectableAudioEventByName(t) {
    t = this.G6(t);
    if (t) {
      this.N6(t);
    }
  }
  static StopSelectableAudioEvent(t) {
    t = this.G6(t.GetName());
    if (t) {
      this.N6(t);
    }
  }
  static N6(t) {
    for (const e of t) {
      var o = this.O6(e);
      if (o) {
        AudioController.StopEvent(o, false);
      }
    }
  }
  static q6(o) {
    if (!StringUtils_1.StringUtils.IsEmpty(o)) {
      let t = this.k6.get(o);
      if (!t) {
        t = new PlayResult();
        this.k6.set(o, t);
      }
      return t;
    }
  }
  static F6() {
    for (const t of this.V6.values()) {
      this.N6(t);
    }
    this.V6.clear();
    this.k6.clear();
  }
  static O6(t) {
    var o = this.k6.get(t);
    if (o) {
      this.k6.delete(t);
    }
    return o;
  }
  static b6(t, o) {
    t = new StringBuilder_1.StringBuilder(t, o).ToString();
    let e = this.V6.get(o);
    if (!e) {
      e = new Set();
      this.V6.set(o, e);
    }
    e.add(t);
    return t;
  }
  static G6(t) {
    return this.V6.get(t);
  }
  static Clear() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCore", 21, "缓存音效数据清除");
    }
    this.F6();
  }
}
(exports.AudioController = AudioController).w6 = new AudioPool_1.AudioPool();
AudioController.V6 = new Map();
AudioController.k6 = new Map();
AudioController.B6 = Stats_1.Stat.Create("PlayAudioByEventPath"); //# sourceMappingURL=AudioController.js.map