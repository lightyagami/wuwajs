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
  Dku(t, o) {
    var n = this.ButtonMap.get(t);
    if (n) {
      n.add(o);
      this.Svt(t);
    }
  }
  Bku(t, o) {
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
    this.Dku(t, o);
  }
  ResumeButton(t, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "外部恢复单个按钮", ["Reason", o]);
    }
    this.Bku(t, o);
  }
  BanButtonList(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "外部禁用全部按钮", ["Reason", t]);
    }
    for (const o of this.ButtonMap.keys()) {
      this.Dku(o, t);
    }
  }
  ResumeButtonList(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "外部恢复全部按钮", ["Reason", t]);
    }
    for (const o of this.ButtonMap.keys()) {
      this.Bku(o, t);
    }
  }
}
exports.PhantomArenaBanButtonFunctionModule = PhantomArenaBanButtonFunctionModule;
//# sourceMappingURL=PhantomArenaBanButtonFunctionModule.js.map