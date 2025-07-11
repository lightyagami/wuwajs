"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSignalBreakGameplay = undefined;
class FbSignalBreakGameplay {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.GTh = false;
    this.OTh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSignalBreakGameplay(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get SignalBreakId() {
    if (!this.GTh) {
      this.GTh = true;
      this.OTh = this.FbDataInternal.signalBreakId();
    }
    return this.OTh;
  }
}
exports.FbSignalBreakGameplay = FbSignalBreakGameplay;
//# sourceMappingURL=FbSignalBreakGameplay.js.map