"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioPool = undefined;
const UE = require("ue");
const Log_1 = require("../Common/Log");
const Time_1 = require("../Common/Time");
const ResourceSystem_1 = require("../Resource/ResourceSystem");
const StringUtils_1 = require("../Utils/StringUtils");
const AudioPoolItem_1 = require("./AudioPoolItem");
class AudioPool {
  constructor() {
    this.J6 = 10000;
    this.z6 = 120000;
    this.Z6 = new Map();
    this.e8 = 0;
    this.t8 = new Map();
  }
  GetAudioPool(e, o = true) {
    var t = this.Z6.get(e);
    if (t) {
      return t.AudioEvent;
    }
    if (o) {
      this.Z6.set(e, new AudioPoolItem_1.AudioPoolItem(e));
      this.i8(e, o => {
        var t = this.Z6.get(e);
        if (t) {
          t.AudioEvent = o;
          t.DoCallback();
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Audio", 21, "GetAudioPool 没有找到对应路径的音效缓存！", ["path", e]);
        }
      });
    }
  }
  AddCallbackToLoad(o, t) {
    var e = this.Z6.get(o);
    if (e) {
      return e.AddCallback(t);
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Audio", 21, "AddCallbackToLoad 没有找到对应路径的音效缓存！", ["path", o]);
    }
  }
  LoadAndAddCallback(e, o, t) {
    let i = this.Z6.get(e);
    if (!i) {
      i = new AudioPoolItem_1.AudioPoolItem(e);
      this.Z6.set(e, i);
    }
    o = i.AddCallback(o);
    if (t) {
      t.AddCallbackId(o);
    }
    this.i8(e, o => {
      var t = this.Z6.get(e);
      if (t) {
        t.AudioEvent = o;
        t.DoCallback();
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Audio", 33, "LoadAndAddCallback 没有找到对应路径的音效缓存！", ["path", e]);
      }
    });
  }
  DeleteCallback(o, t) {
    var e = this.Z6.get(o);
    if (e) {
      e.DeleteCallback(t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Audio", 21, "DeleteCallback 没有找到对应路径的音效缓存！", ["path", o]);
    }
  }
  SetPlayFlag(o) {
    var t = this.Z6.get(o);
    if (t) {
      t.UseTime = Time_1.Time.Now;
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Audio", 21, "SetPlayFlag 没有找到对应路径的音效缓存！", ["path", o]);
    }
  }
  Tick(o) {
    this.e8 += o;
    if (this.e8 > this.J6) {
      this.e8 = 0;
      var t;
      var e;
      var i;
      var s;
      var a = Time_1.Time.Now;
      for ([t, e] of this.Z6) {
        if (a - e.UseTime >= this.z6) {
          e.Destroy();
          this.Z6.delete(t);
        }
      }
      for ([i, s] of this.t8) {
        if (a - s.UseTime >= this.z6) {
          s.ClearData(i);
          this.t8.delete(i);
        }
      }
    }
  }
  i8(t, e) {
    if (StringUtils_1.StringUtils.IsNothing(t)) {
      e(undefined);
    } else {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AkAudioEvent, o => {
        if (!o?.IsValid()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Audio", 21, "音效加载资源失败：", ["eventPath: ", t], ["time: ", Time_1.Time.Now]);
          }
        }
        e(o);
      });
    }
  }
  AddExternalSources(o, t) {
    if (!this.t8.get(o)) {
      t = new AudioPoolItem_1.ExternalSourcesPoolItem(t);
      this.t8.set(o, t);
    }
  }
  SetExternalSourcesPlayFlag(o) {
    var t = this.t8.get(o);
    if (t) {
      t.UseTime = Time_1.Time.Now;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 21, "SetExternalSourcesPlayFlag 没有找到对应路径的ExternalSources音效缓存！", ["path", o]);
    }
  }
}
exports.AudioPool = AudioPool;
//# sourceMappingURL=AudioPool.js.map