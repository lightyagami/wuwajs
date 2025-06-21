"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBanButtonFunctionModule = void 0;
const Log_1 = require("../../../../../Core/Common/Log");
class PhantomArenaBanButtonFunctionModule {
  constructor() {
    this.ButtonMap = new Map
  }
  Svt(t) {
    var o = this.ButtonMap.get(t);
    o && 0 < o.size ? t.SetSelfInteractive(!1) : t.SetSelfInteractive(!0)
  }
  Lfu(t, o) {
    var n = this.ButtonMap.get(t);
    n && (n.add(o), this.Svt(t))
  }
  Afu(t, o) {
    var n = this.ButtonMap.get(t);
    n && (n.delete(o), this.Svt(t))
  }
  RegisterButton(t) {
    this.ButtonMap.set(t, new Set)
  }
  BanButton(t, o) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "外部禁用单个按钮", ["Reason", o]), this.Lfu(t, o)
  }
  ResumeButton(t, o) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "外部恢复单个按钮", ["Reason", o]), this.Afu(t, o)
  }
  BanButtonList(t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "外部禁用全部按钮", ["Reason", t]);
    for (const o of this.ButtonMap.keys()) this.Lfu(o, t)
  }
  ResumeButtonList(t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "外部恢复全部按钮", ["Reason", t]);
    for (const o of this.ButtonMap.keys()) this.Afu(o, t)
  }
}
exports.PhantomArenaBanButtonFunctionModule = PhantomArenaBanButtonFunctionModule;
//# sourceMappingURL=PhantomArenaBanButtonFunctionModule.js.map