"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioFilterController = undefined;
const Log_1 = require("../Common/Log");
const PriorityQueue_1 = require("../Container/PriorityQueue");
const AudioSystem_1 = require("./AudioSystem");
class AudioFilterState {
  constructor(t, e, i) {
    this.State = "none";
    this.Priority = 0;
    this.Uid = 0;
    this.Uid = t;
    this.State = e;
    this.Priority = i ?? 0;
  }
}
AudioFilterState.Compare = (t, e) => {
  let i = e.Priority - t.Priority;
  if (i === 0) {
    i--;
  }
  return i;
};
class AudioFilterController {
  static set zyi(t) {
    if (this.I$_ !== t) {
      if (this.I$_.State !== t.State) {
        if (!t.State) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Audio", 42, "[FilterState] [SetCurrent] 传入异常的State", ["State", t.State]);
          }
          return;
        }
        AudioSystem_1.AudioSystem.SetState("filter", t.State);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[FilterState] [SetCurrent]", ["State", t.State]);
        }
      }
      this.I$_ = t;
    }
  }
  static get zyi() {
    return this.I$_;
  }
  static T$_() {
    if (this.b$_.Empty || this.b$_.Top.State === "none") {
      if (this.L$_.Empty) {
        this.zyi = AudioFilterController.E$_;
      } else {
        this.zyi = this.L$_.Top;
      }
    } else {
      this.zyi = this.b$_.Top;
    }
  }
  static PushFilterState(t, e, i = "", r = 0) {
    var o = ++this._A;
    var t = AudioFilterController.CreateFilterState(o, t, r);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[FilterState] [Push]", ["uid", o], ["State", t], ["Context", i]);
    }
    e.Push(t);
    this.w$_.set(o, t);
    this.T$_();
    return o;
  }
  static RemoveFilterState(t, e, i) {
    var r;
    if (t <= 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Audio", 42, "[FilterState] [Remove] uid不大于零,跳过", ["Context", i]);
      }
    } else {
      r = this.w$_.get(t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[FilterState] [Remove]", ["uid", t], ["State", r], ["Context", i]);
      }
      if (r) {
        e.Remove(r);
        this.w$_.delete(t);
        this.T$_();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[FilterState] [Remove] 传入异常的uid", ["uid", t]);
      }
    }
  }
  static PushUiFilterState(t, e) {
    return this.PushFilterState(t, this.b$_, "[UI] " + e);
  }
  static RemoveUiFilterState(t, e) {
    this.RemoveFilterState(t, this.b$_, "[UI] " + e);
  }
  static PushSceneFilterState(t, e, i = 0) {
    return this.PushFilterState(t, this.L$_, "[Scene]" + e, i);
  }
  static RemoveSceneFilterState(t, e) {
    this.RemoveFilterState(t, this.L$_, "[Scene] " + e);
  }
  static CreateFilterState(t, e, i) {
    if (e) {
      return new AudioFilterState(t, e, i);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[FilterState] [Create] 传入异常的State", ["State", e], ["priority", i]);
      }
      return this.E$_;
    }
  }
}
(exports.AudioFilterController = AudioFilterController)._A = 0;
AudioFilterController.w$_ = new Map();
AudioFilterController.b$_ = new PriorityQueue_1.PriorityQueue(AudioFilterState.Compare);
AudioFilterController.L$_ = new PriorityQueue_1.PriorityQueue(AudioFilterState.Compare);
AudioFilterController.E$_ = new AudioFilterState(0, "none");
AudioFilterController.I$_ = AudioFilterController.E$_; //# sourceMappingURL=AudioFilterController.js.map