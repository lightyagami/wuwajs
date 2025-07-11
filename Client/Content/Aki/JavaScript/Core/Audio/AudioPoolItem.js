"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExternalSourcesPoolItem = exports.AudioPoolItem = undefined;
const Log_1 = require("../Common/Log");
const Time_1 = require("../Common/Time");
class AudioPoolItem {
  constructor(t) {
    this.AudioEvent = undefined;
    this.UseTime = -0;
    this.o8 = new Map();
    this.r8 = 0;
    this.n8 = t;
    this.UseTime = Time_1.Time.Now;
  }
  AddCallback(t) {
    this.o8 ||= new Map();
    this.r8++;
    this.o8.set(this.r8, t);
    return this.r8;
  }
  DeleteCallback(t) {
    if (this.o8) {
      if (this.o8.has(t)) {
        this.o8.delete(t);
        return true;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 21, "没有找到对应paramFlag的回调注册！", ["callbackFlag", t], ["Path", this.n8]);
      }
    }
    return false;
  }
  DoCallback() {
    if (this.o8) {
      for (var [, t] of this.o8) {
        t();
      }
      this.o8.clear();
    }
  }
  Destroy() {
    if (this.AudioEvent) {
      this.AudioEvent = undefined;
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Audio", 21, "Destroy 没有找到对应AudioEvent对象！", ["Path", this.n8]);
    }
  }
}
exports.AudioPoolItem = AudioPoolItem;
class ExternalSourcesPoolItem {
  constructor(t) {
    this.UseTime = -0;
    this.s8 = undefined;
    this.s8 = t;
    this.UseTime = Time_1.Time.Now;
  }
  ClearData(t) {
    if (this.s8) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 21, "ExternalSources资源存在，现在进行销毁", ["Path", t]);
      }
      this.s8 = undefined;
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 21, "ExternalSources资源已经不存在", ["Path", t]);
    }
  }
}
exports.ExternalSourcesPoolItem = ExternalSourcesPoolItem;
//# sourceMappingURL=AudioPoolItem.js.map