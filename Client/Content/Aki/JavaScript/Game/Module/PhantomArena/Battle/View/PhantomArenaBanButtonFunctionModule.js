"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBanButtonFunctionModule = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
class PhantomArenaBanButtonFunctionModule {
  constructor() {
    this.ButtonMap = new Map();
  }
  Svt(t) {
    var o = this.ButtonMap.get(t);
    if (o && o.size > 0) {
      t.SetSelfInteractive(false);
    } else {
      t.SetSelfInteractive(true);
    }
  }
  S2u(t, o) {
    var n = this.ButtonMap.get(t);
    if (n) {
      n.add(o);
      this.Svt(t);
    }
  }
  M2u(t, o) {
    var n = this.ButtonMap.get(t);
    if (n) {
      n.delete(o);
      this.Svt(t);
    }
  }
  RegisterButton(t) {
    this.ButtonMap.set(t, new Set());
  }
  BanButton(t, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "外部禁用单个按钮", ["Reason", o]);
    }
    this.S2u(t, o);
  }
  ResumeButton(t, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "外部恢复单个按钮", ["Reason", o]);
    }
    this.M2u(t, o);
  }
  BanButtonList(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "外部禁用全部按钮", ["Reason", t]);
    }
    for (const o of this.ButtonMap.keys()) {
      this.S2u(o, t);
    }
  }
  ResumeButtonList(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "外部恢复全部按钮", ["Reason", t]);
    }
    for (const o of this.ButtonMap.keys()) {
      this.M2u(o, t);
    }
  }
}
exports.PhantomArenaBanButtonFunctionModule = PhantomArenaBanButtonFunctionModule;
//# sourceMappingURL=PhantomArenaBanButtonFunctionModule.js.map