"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadPsFeedbackData = undefined;
const Log_1 = require("../../../Core/Common/Log");
class FeedbackInfo {
  constructor(e, a, s) {
    this.Reason = undefined;
    this.Mode = undefined;
    this.Path = undefined;
    this.Reason = e;
    this.Mode = a;
    this.Path = s;
  }
}
class GamepadPsFeedbackData {
  constructor() {
    this.jsd = new Map();
  }
  AddFeedbackReason(e, a, s) {
    let o = this.jsd.get(e);
    if (o) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PsGamepadFeedback", 10, "刷新Ps5手柄高级震动", ["reason", e], ["mode", a], ["path", s]);
      }
      o.Mode = a;
      o.Path = s;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PsGamepadFeedback", 10, "添加Ps5手柄高级震动", ["reason", e], ["mode", a], ["path", s]);
      }
      o = new FeedbackInfo(e, a, s);
    }
    this.jsd.set(e, o);
  }
  RemoveFeedbackReason(e) {
    var a = this.jsd.delete(e);
    if (a && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PsGamepadFeedback", 10, "移除Ps5手柄高级震动", ["reason", e]);
    }
    return a;
  }
  ClearFeedbackReason() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PsGamepadFeedback", 10, "清除Ps5手柄高级震动");
    }
    this.jsd.clear();
  }
  GetLastFeedbackInfo() {
    var e;
    if (!(this.jsd.size <= 0)) {
      e = (e = Array.from(this.jsd.keys()))[e.length - 1];
      return this.jsd.get(e);
    }
  }
}
exports.GamepadPsFeedbackData = GamepadPsFeedbackData;
//# sourceMappingURL=GamepadPsFeedbackData.js.map