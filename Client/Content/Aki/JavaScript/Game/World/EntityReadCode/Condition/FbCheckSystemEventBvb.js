"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbCheckSystemEventBvb = void 0;
class FbCheckSystemEventBvb {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.Nuc = !1, this.Vuc = void 0
  }
  static Create(t) {
    if (t) return new FbCheckSystemEventBvb(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get EventName() {
    return this.Nuc || (this.Nuc = !0, this.Vuc = this.FbDataInternal.eventName()), this.Vuc
  }
}
exports.FbCheckSystemEventBvb = FbCheckSystemEventBvb;
//# sourceMappingURL=FbCheckSystemEventBvb.js.map