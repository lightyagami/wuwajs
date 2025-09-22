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
    this.Q_d = new Map();
  }
  AddFeedbackReason(e, a, s) {
    let o = this.Q_d.get(e);
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
    this.Q_d.set(e, o);
  }
  RemoveFeedbackReason(e) {
    var a = this.Q_d.delete(e);
    if (a && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PsGamepadFeedback", 10, "移除Ps5手柄高级震动", ["reason", e]);
    }
    return a;
  }
  ClearFeedbackReason() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PsGamepadFeedback", 10, "清除Ps5手柄高级震动");
    }
    this.Q_d.clear();
  }
  GetLastFeedbackInfo() {
    var e;
    if (!(this.Q_d.size <= 0)) {
      e = (e = Array.from(this.Q_d.keys()))[e.length - 1];
      return this.Q_d.get(e);
    }
  }
}
exports.GamepadPsFeedbackData = GamepadPsFeedbackData;
//# sourceMappingURL=GamepadPsFeedbackData.js.map