"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioEventPool = undefined;
const UE = require("ue");
const Log_1 = require("../Common/Log");
const Time_1 = require("../Common/Time");
const ResourceSystem_1 = require("../Resource/ResourceSystem");
class AudioEventPoolItem {
  constructor(e, i) {
    this.AudioEvent = undefined;
    this.LastActiveTime = 0;
    this.AudioEvent = e;
    this.LastActiveTime = i ?? Time_1.Time.Now;
  }
  UpdateEvent(e) {
    if (e) {
      this.AudioEvent = e;
    }
    this.LastActiveTime = Time_1.Time.Now;
  }
  Destroy() {
    if (this.AudioEvent) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 56, "[Core.AudioSystem] 卸载 AudioEvent", ["Event", this.AudioEvent.GetName()], ["InactiveTime", Time_1.Time.Now - this.LastActiveTime]);
      }
      this.AudioEvent = undefined;
    }
  }
}
class AudioEventPool {
  constructor() {
    this.H6 = 0;
    this.j6 = 10000;
    this.W6 = 60000;
    this.K6 = new Map();
    this.ctl = new Map();
    this.Fta = [];
    this.Vta = false;
    this.Hta = 0;
  }
  PreloadAudioEvent(i) {
    var e;
    if (!this.ctl.has(i)) {
      e = `/Game/Aki/WwiseAudio/Events/${i}.${i}`;
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AkAudioEvent, e => {
        if (e?.IsValid()) {
          if (!this.ctl.has(i)) {
            this.ctl.set(i, e);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 42, "[Core.AudioEventPool] 预加载 AudioEvent", ["Event", i]);
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 42, "[Core.AudioEventPool] AudioEvent 加载失败", ["Event", i]);
        }
      });
    }
  }
  ReleaseAudioEvent(e) {
    if (this.ctl.has(e) && (this.ctl.delete(e), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Audio", 42, "[Core.AudioEventPool] 预加载内容卸载 AudioEvent", ["Event", e]);
    }
  }
  async GetAudioEvent(s) {
    return new Promise((t, e) => {
      const o = this.K6.get(s);
      var i;
      if (o?.AudioEvent?.IsValid()) {
        o.LastActiveTime = Time_1.Time.Now;
        t(o.AudioEvent);
      } else {
        i = `/Game/Aki/WwiseAudio/Events/${s}.${s}`;
        ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.AkAudioEvent, e => {
          var i;
          if (e?.IsValid()) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 56, "[Core.AudioSystem] 加载 AudioEvent", ["Event", s]);
            }
            if (o) {
              o.UpdateEvent(e);
            } else {
              i = new AudioEventPoolItem(e);
              this.K6.set(s, i);
              this.Fta.push(s);
            }
            t(e);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Audio", 56, "[Core.AudioSystem] AudioEvent 加载失败", ["Event", s]);
            }
            t(undefined);
          }
        });
      }
    });
  }
  Tick(e) {
    if (this.Vta) {
      let e = this.Hta;
      while (e >= 0 && e > this.Hta - 5) {
        var i = this.Fta[e];
        var t = this.K6.get(i);
        if (t?.AudioEvent?.IsValid()) {
          if (UE.AkGameplayStatics.IsAudioEventActive(t.AudioEvent)) {
            t.LastActiveTime = Time_1.Time.Now;
          } else if (Time_1.Time.Now - t.LastActiveTime >= this.W6) {
            t.Destroy();
            this.K6.delete(i);
            this.Fta.splice(e, 1);
          }
        } else {
          this.K6.delete(i);
          this.Fta.splice(e, 1);
        }
        e--;
      }
      if (e < 0) {
        this.Vta = false;
      } else {
        this.Hta = e;
      }
    } else {
      this.H6 += e;
      if (this.H6 > this.j6) {
        this.Vta = true;
        this.Hta = this.Fta.length - 1;
        this.H6 = 0;
      }
    }
  }
}
exports.AudioEventPool = AudioEventPool;
//# sourceMappingURL=AudioEventPool.js.map