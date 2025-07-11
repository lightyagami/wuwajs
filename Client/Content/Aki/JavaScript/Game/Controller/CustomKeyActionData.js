"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomKeyActionData = undefined;
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const InputSettings_1 = require("../InputSettings/InputSettings");
class CustomKeyActionData {
  constructor() {
    this.l$a = new Map();
    this.dq1 = new Set();
    this._$a = new Set();
  }
  SetCustomAction(t, o) {
    let e = this.l$a.get(t);
    if (!e) {
      e = new Set();
      this.l$a.set(t, e);
    }
    e.add(o);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InputSettings", 10, "[CustomAction]设置临时Action输入按键", ["keyName", t], ["actionName", o], ["CustomKeyActionMap", this.l$a]);
    }
  }
  ResetAllCustomAction(t) {
    this.l$a.delete(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InputSettings", 10, "[CustomAction]还原所有临时Action输入按键", ["keyName", t], ["CustomKeyActionMap", this.l$a]);
    }
  }
  ResetCustomAction(t, o) {
    var e = this.l$a.get(t);
    if (e && (e.delete(o), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("InputSettings", 10, "[CustomAction]还原临时Action输入按键", ["keyName", t], ["CustomKeyActionMap", this.l$a]);
    }
  }
  GetCustomActionName(t) {
    if (!(this.dq1.size > 0)) {
      t = this.l$a?.get(t);
      if (t) {
        return t;
      }
    }
  }
  GetCurrentPlatformCustomActionKeyNameList(t) {
    if (this.l$a) {
      var o;
      var e;
      var s = Info_1.Info.IsInKeyBoard();
      var i = Info_1.Info.IsInGamepad();
      var n = [];
      for ([o, e] of this.l$a) {
        if (e.has(t) && (s && InputSettings_1.InputSettings.IsKeyboardKey(o) || i && InputSettings_1.InputSettings.IsGamepadKey(o))) {
          n.push(o);
        }
      }
      if (!(n.length <= 0)) {
        return n;
      }
    }
  }
  SetActionEnable(t, o) {
    if (o) {
      this._$a.delete(t);
    } else {
      this._$a.add(t);
    }
  }
  IsActionEnable(t) {
    return this.dq1.size > 0 || !this._$a.has(t);
  }
  DisableCustomInputData(t) {
    this.dq1.add(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "[CustomAction]临时禁用自定义输入数据", ["reason", t], ["CacheReasonSet", this.dq1]);
    }
  }
  EnableCustomInputData(t) {
    this.dq1.delete(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "[CustomAction]恢复使用自定义输入数据", ["reason", t], ["CacheReasonSet", this.dq1]);
    }
  }
  Clear() {
    this.l$a.clear();
    this.dq1.clear();
    this._$a.clear();
  }
}
exports.CustomKeyActionData = CustomKeyActionData;
//# sourceMappingURL=CustomKeyActionData.js.map