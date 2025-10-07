"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelListenerBase = undefined;
class LevelListenerBase {
  constructor() {
    this.ListeningInfo = undefined;
    this.Callback = undefined;
    this.Context = undefined;
    this.IsListeningInternal = false;
  }
  get IsListening() {
    return this.IsListeningInternal;
  }
  Listen(s, t, i, ...e) {
    if (!this.IsListeningInternal) {
      this.IsListeningInternal = true;
      this.ListeningInfo = s;
      this.Callback = t;
      this.Context = i;
      this.OnListen(s, t, i, ...e);
    }
  }
  OnListen(s, t, i) {}
  UnListen() {
    if (this.IsListeningInternal) {
      this.OnUnListen();
      this.IsListeningInternal = false;
      this.ListeningInfo = undefined;
      this.Callback = undefined;
      this.Context = undefined;
    }
  }
  OnUnListen() {}
}
exports.LevelListenerBase = LevelListenerBase;
//# sourceMappingURL=LevelListenerBase.js.map