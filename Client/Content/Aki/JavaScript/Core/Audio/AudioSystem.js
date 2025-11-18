"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSystem = exports.parseAudioEventPath = exports.parseAudioEventPathInConfig = exports.INVALID_AUDIO_EVENT_VALUE = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../Common/Info");
const Log_1 = require("../Common/Log");
const FNameUtil_1 = require("../Utils/FNameUtil");
const AudioEventPool_1 = require("./AudioEventPool");
const ExecutionQueue_1 = require("./ExecutionQueue");
const INVALID_PLAYING_ID = 0;
function instanceOf(e, t) {
  if (e.IsValid() && typeof e.IsA != "function" && Log_1.Log.CheckError()) {
    Log_1.Log.Error("Audio", 56, "[Core.AudioSystem] 排查 Object.IsA 失效问题", ["object", e]);
  }
  return e.IsValid() && e.IsA(t.StaticClass()) && e.GetWorld()?.IsValid();
}
function parseAudioEventPathInConfig(e) {
  var t = /^\/Game\/Aki\/WwiseAudio\/Events\/(?<name>\w+)/.exec(e);
  if (!t) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Audio", 56, "[Core.AudioSystem] 非法的 AudioEvent 路径", ["path", e], ["reason", "未在 /Game/Aki/WwiseAudio/Events/ 路径下或命名不符合规范"]);
    }
  }
  return t?.groups?.name;
}
function parseAudioEventPath(e) {
  e = typeof e == "string" ? e : e.ToAssetPathName();
  if (e) {
    return e.split(".").at(-1)?.toLowerCase();
  } else {
    return undefined;
  }
}
exports.INVALID_AUDIO_EVENT_VALUE = 0;
exports.parseAudioEventPathInConfig = parseAudioEventPathInConfig;
exports.parseAudioEventPath = parseAudioEventPath;
class AudioSystem {
  static Tick(e) {
    this.a8.Tick(e);
  }
  static PostEvent(o, i, s) {
    if (!o || o.length < 1 || o === "None" || o === "none") {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[Core.AudioSystem] 空的音频事件event参数", ["Event", o]);
      }
      return exports.INVALID_AUDIO_EVENT_VALUE;
    } else if (i instanceof UE.Object && i.IsValid() && typeof i.IsA != "function") {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Audio", 56, "[Core.AudioSystem] 排查 Object.IsA 失效问题", Error("target instanceof UE.Object && target.IsValid() && typeof target.IsA !== \"function\""), ["target", i]);
      }
      return exports.INVALID_AUDIO_EVENT_VALUE;
    } else {
      return this.h8.Enqueue(async e => {
        var t = await this.l8(o, i, s);
        if (t) {
          this._8.set(e, t);
          this.u8.set(t, e);
        }
      });
    }
  }
  static async l8(t, o, i = {}) {
    if (!t || t.length < 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[Core.AudioSystem] 空的音频事件event参数");
      }
    } else {
      var s = await this.a8.GetAudioEvent(t);
      if (s) {
        var {
          ExternalSourceName: n,
          ExternalSourceMediaName: r
        } = i;
        if (n && r) {
          UE.WwiseExternalSourceStatics.SetExternalSourceMediaByName(n, r);
        }
        var {
          CallbackMask: n = 1,
          CallbackHandler: r
        } = i;
        var n = n | 1;
        var a = t.toLowerCase();
        var r = this.c8(a, r);
        let e = undefined;
        if (o === undefined) {
          e = s.PostOnActor(undefined, r, n, false);
        } else if (o instanceof UE.TransformDouble) {
          var u = o.GetLocation();
          var d = o.GetRotation().Rotator();
          e = s.D_PostAtLocation(u, d, r, n, Info_1.Info.World);
        } else if (instanceOf(o, UE.Actor)) {
          var {
            StopWhenOwnerDestroyed: u = false
          } = i;
          e = s.PostOnActor(o, r, n, u);
        } else {
          if (!instanceOf(o, UE.AkComponent)) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Audio", 56, "[Core.AudioSystem] PostEvent 执行失败", ["Event", t], ["Args", i], ["Reason", "目标对象无效"]);
            }
            return;
          }
          var {
            StopWhenOwnerDestroyed: d = false
          } = i;
          e = s.PostOnComponent(o, r, n, d);
        }
        if (e !== INVALID_PLAYING_ID) {
          if (a === "play_external_vo_subtitle_assist" && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Audio", 56, "[Core.AudioSystem] EndOfEvent 回调注册", ["PlayingId", e], ["Event", t]);
          }
          return e;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 56, "[Core.AudioSystem] PostEvent 执行失败", ["Event", t], ["Target", o === undefined ? "Global" : o instanceof UE.TransformDouble ? o.ToString() : o.GetName()], ["Args", i], ["Reason", "SoundEngine 内部异常"]);
        }
      }
    }
  }
  static c8(o, i) {
    const s = (e, t) => {
      i?.(e, t);
      if (e === 0 && ((0, puerts_1.releaseManualReleaseDelegate)(s), e = t.PlayingID, (t = this.u8.get(e)) && (this.u8.delete(e), this._8.delete(t)), o === "play_external_vo_subtitle_assist") && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 56, "[Core.AudioSystem] EndOfEvent 回调执行", ["PlayingId", e], ["Event", o]);
      }
    };
    return (0, puerts_1.toManualReleaseDelegate)(s);
  }
  static ExecuteAction(...e) {
    if (typeof e[0] == "string") {
      const [i, s, n = {}] = e;
      if (!i || i.length < 1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 42, "[Core.AudioSystem] 空的音频事件event参数");
        }
      } else {
        this.h8.Enqueue(() => {
          var {
            Actor: e,
            TransitionDuration: t,
            TransitionFadeCurve: o
          } = n;
          UE.KuroAudioStatics.ExecuteActionOnEventName(i, s, e, t, o);
        });
      }
    } else {
      const [r, a, u = {}] = e;
      if (a !== 0 || !this.h8.Cancel(r)) {
        this.h8.Enqueue(() => {
          var e;
          var t;
          var o = this._8.get(r);
          if (o) {
            ({
              TransitionDuration: e,
              TransitionFadeCurve: t
            } = u);
            UE.KuroAudioStatics.ExecuteActionOnPlayingId(o, a, e, t);
          }
        });
      }
    }
  }
  static SeekOnEvent(t, o, i = {}) {
    if (!t || t.length < 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[Core.AudioSystem] 空的音频事件event参数");
      }
    } else {
      this.h8.Enqueue(() => {
        var e;
        if (i.Handle === undefined) {
          UE.KuroAudioStatics.SeekOnEventName(t, o, i.Actor, undefined, i.SnapToMarker);
        } else if (e = this._8.get(i.Handle)) {
          UE.KuroAudioStatics.SeekOnEventName(t, o, i.Actor, e, i.SnapToMarker);
        }
      });
    }
  }
  static GetSourcePlayPosition(e) {
    var e = this._8.get(e);
    if (!e || (e = UE.KuroAudioStatics.GetSourcePlayPosition(e)) === -1) {
      return undefined;
    } else {
      return e;
    }
  }
  static SetSwitch(e, t, o) {
    this.h8.Enqueue(() => {
      UE.KuroAudioStatics.SetSwitch(e, t, o);
    });
  }
  static SetState(e, t) {
    this.h8.Enqueue(() => {
      UE.KuroAudioStatics.SetState(e, t);
    });
  }
  static SetRtpcValue(i, s, n = {}) {
    this.h8.Enqueue(() => {
      var {
        Actor: e,
        TransitionDuration: t,
        TransitionFadeCurve: o
      } = n;
      UE.KuroAudioStatics.SetRtpcValue(i, s, e, t, o);
    });
  }
  static StopAll(e) {
    this.h8.Enqueue(() => {
      UE.KuroAudioStatics.StopAll(e);
    });
  }
  static GetAkComponent(e, t = {}) {
    var {
      SocketName: t,
      OnCreated: o
    } = t;
    let i = undefined;
    i = typeof t == "string" ? FNameUtil_1.FNameUtil.GetDynamicFName(t.length > 0 ? t : "None") : t && t.toString().length > 0 ? t : FNameUtil_1.FNameUtil.GetDynamicFName("None");
    t = (0, puerts_1.$ref)(false);
    let s = undefined;
    if (instanceOf(e, UE.Actor)) {
      s = UE.KuroAudioStatics.GetAkComponent(e.RootComponent, i, t);
    } else if (instanceOf(e, UE.SceneComponent)) {
      s = UE.KuroAudioStatics.GetAkComponent(e, i, t);
    }
    if ((0, puerts_1.$unref)(t) && (e = s?.GetOwner(), o) && e && s) {
      o(e, s);
    }
    return s;
  }
  static PreloadAudioEvent(e) {
    this.a8.PreloadAudioEvent(e);
  }
  static ReleaseAudioEvent(e) {
    this.a8.ReleaseAudioEvent(e);
  }
}
(exports.AudioSystem = AudioSystem).a8 = new AudioEventPool_1.AudioEventPool();
AudioSystem.h8 = new ExecutionQueue_1.ExecutionQueue();
AudioSystem._8 = new Map();
AudioSystem.u8 = new Map(); //# sourceMappingURL=AudioSystem.js.map