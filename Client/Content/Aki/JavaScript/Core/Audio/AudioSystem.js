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
function instanceOf(t, e) {
  if (t.IsValid() && typeof t.IsA != "function" && Log_1.Log.CheckError()) {
    Log_1.Log.Error("Audio", 56, "[Core.AudioSystem] 排查 Object.IsA 失效问题", ["object", t]);
  }
  return t.IsValid() && t.IsA(e.StaticClass()) && t.GetWorld()?.IsValid();
}
function parseAudioEventPathInConfig(t) {
  var e = /^\/Game\/Aki\/WwiseAudio\/Events\/(?<name>\w+)/.exec(t);
  if (!e) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Audio", 56, "[Core.AudioSystem] 非法的 AudioEvent 路径", ["path", t], ["reason", "未在 /Game/Aki/WwiseAudio/Events/ 路径下或命名不符合规范"]);
    }
  }
  return e?.groups?.name;
}
function parseAudioEventPath(t) {
  t = typeof t == "string" ? t : t.ToAssetPathName();
  if (t) {
    return t.split(".").at(-1)?.toLowerCase();
  } else {
    return undefined;
  }
}
exports.INVALID_AUDIO_EVENT_VALUE = 0;
exports.parseAudioEventPathInConfig = parseAudioEventPathInConfig;
exports.parseAudioEventPath = parseAudioEventPath;
class AudioSystem {
  static Tick(t) {
    this.a8.Tick(t);
  }
  static PostEvent(o, i, s) {
    if (!o || o.length < 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[Core.AudioSystem] 空的音频事件event参数");
      }
      return exports.INVALID_AUDIO_EVENT_VALUE;
    } else if (i instanceof UE.Object && i.IsValid() && typeof i.IsA != "function") {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Audio", 56, "[Core.AudioSystem] 排查 Object.IsA 失效问题", Error("target instanceof UE.Object && target.IsValid() && typeof target.IsA !== \"function\""), ["target", i]);
      }
      return exports.INVALID_AUDIO_EVENT_VALUE;
    } else {
      return this.h8.Enqueue(async t => {
        var e = await this.l8(o, i, s);
        if (e) {
          this._8.set(t, e);
          this.u8.set(e, t);
        }
      });
    }
  }
  static async l8(e, o, i = {}) {
    if (!e || e.length < 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[Core.AudioSystem] 空的音频事件event参数");
      }
    } else {
      var s = await this.a8.GetAudioEvent(e);
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
        var r = this.c8(r);
        let t = undefined;
        if (o === undefined) {
          t = s.PostOnActor(undefined, r, n, false);
        } else if (o instanceof UE.TransformDouble) {
          var a = o.GetLocation();
          var u = o.GetRotation().Rotator();
          t = s.D_PostAtLocation(a, u, r, n, Info_1.Info.World);
        } else if (instanceOf(o, UE.Actor)) {
          var {
            StopWhenOwnerDestroyed: a = false
          } = i;
          t = s.PostOnActor(o, r, n, a);
        } else {
          if (!instanceOf(o, UE.AkComponent)) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Audio", 56, "[Core.AudioSystem] PostEvent 执行失败", ["Event", e], ["Args", i], ["Reason", "目标对象无效"]);
            }
            return;
          }
          var {
            StopWhenOwnerDestroyed: u = false
          } = i;
          t = s.PostOnComponent(o, r, n, u);
        }
        if (t !== INVALID_PLAYING_ID) {
          return t;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 56, "[Core.AudioSystem] PostEvent 执行失败", ["Event", e], ["Target", o === undefined ? "Global" : o instanceof UE.TransformDouble ? o.ToString() : o.GetName()], ["Args", i], ["Reason", "SoundEngine 内部异常"]);
        }
      }
    }
  }
  static c8(o) {
    const i = (t, e) => {
      o?.(t, e);
      if (t === 0 && ((0, puerts_1.releaseManualReleaseDelegate)(i), t = e.PlayingID, e = this.u8.get(t))) {
        this.u8.delete(t);
        this._8.delete(e);
      }
    };
    return (0, puerts_1.toManualReleaseDelegate)(i);
  }
  static ExecuteAction(...t) {
    if (typeof t[0] == "string") {
      const [i, s, n = {}] = t;
      if (!i || i.length < 1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 42, "[Core.AudioSystem] 空的音频事件event参数");
        }
      } else {
        this.h8.Enqueue(() => {
          var {
            Actor: t,
            TransitionDuration: e,
            TransitionFadeCurve: o
          } = n;
          UE.KuroAudioStatics.ExecuteActionOnEventName(i, s, t, e, o);
        });
      }
    } else {
      const [r, a, u = {}] = t;
      if (a !== 0 || !this.h8.Cancel(r)) {
        this.h8.Enqueue(() => {
          var t;
          var e;
          var o = this._8.get(r);
          if (o) {
            ({
              TransitionDuration: t,
              TransitionFadeCurve: e
            } = u);
            UE.KuroAudioStatics.ExecuteActionOnPlayingId(o, a, t, e);
          }
        });
      }
    }
  }
  static SeekOnEvent(e, o, i = {}) {
    if (!e || e.length < 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[Core.AudioSystem] 空的音频事件event参数");
      }
    } else {
      this.h8.Enqueue(() => {
        var t;
        if (i.Handle === undefined) {
          UE.KuroAudioStatics.SeekOnEventName(e, o, i.Actor, undefined, i.SnapToMarker);
        } else if (t = this._8.get(i.Handle)) {
          UE.KuroAudioStatics.SeekOnEventName(e, o, i.Actor, t, i.SnapToMarker);
        }
      });
    }
  }
  static GetSourcePlayPosition(t) {
    var t = this._8.get(t);
    if (!t || (t = UE.KuroAudioStatics.GetSourcePlayPosition(t)) === -1) {
      return undefined;
    } else {
      return t;
    }
  }
  static SetSwitch(t, e, o) {
    this.h8.Enqueue(() => {
      UE.KuroAudioStatics.SetSwitch(t, e, o);
    });
  }
  static SetState(t, e) {
    this.h8.Enqueue(() => {
      UE.KuroAudioStatics.SetState(t, e);
    });
  }
  static SetRtpcValue(i, s, n = {}) {
    this.h8.Enqueue(() => {
      var {
        Actor: t,
        TransitionDuration: e,
        TransitionFadeCurve: o
      } = n;
      UE.KuroAudioStatics.SetRtpcValue(i, s, t, e, o);
    });
  }
  static StopAll(t) {
    this.h8.Enqueue(() => {
      UE.KuroAudioStatics.StopAll(t);
    });
  }
  static GetAkComponent(t, e = {}) {
    var {
      SocketName: e,
      OnCreated: o
    } = e;
    let i = undefined;
    i = typeof e == "string" ? FNameUtil_1.FNameUtil.GetDynamicFName(e.length > 0 ? e : "None") : e && e.toString().length > 0 ? e : FNameUtil_1.FNameUtil.GetDynamicFName("None");
    e = (0, puerts_1.$ref)(false);
    let s = undefined;
    if (instanceOf(t, UE.Actor)) {
      s = UE.KuroAudioStatics.GetAkComponent(t.RootComponent, i, e);
    } else if (instanceOf(t, UE.SceneComponent)) {
      s = UE.KuroAudioStatics.GetAkComponent(t, i, e);
    }
    if ((0, puerts_1.$unref)(e) && (t = s?.GetOwner(), o) && t && s) {
      o(t, s);
    }
    return s;
  }
  static PreloadAudioEvent(t) {
    this.a8.PreloadAudioEvent(t);
  }
  static ReleaseAudioEvent(t) {
    this.a8.ReleaseAudioEvent(t);
  }
}
(exports.AudioSystem = AudioSystem).a8 = new AudioEventPool_1.AudioEventPool();
AudioSystem.h8 = new ExecutionQueue_1.ExecutionQueue();
AudioSystem._8 = new Map();
AudioSystem.u8 = new Map(); //# sourceMappingURL=AudioSystem.js.map