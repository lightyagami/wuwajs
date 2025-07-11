"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPointAkEvent = undefined;
class FbPointAkEvent {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.F8h = false;
    this.N8h = undefined;
    this.V8h = false;
    this.j8h = false;
    this.NP_ = false;
    this.VP_ = false;
  }
  static Create(t) {
    if (t) {
      return new FbPointAkEvent(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PointIds() {
    if (!this.F8h) {
      this.F8h = true;
      this.N8h = new Array();
      var i = this.FbDataInternal.pointIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.N8h.push(this.FbDataInternal.pointIds(t));
        }
      }
    }
    return this.N8h;
  }
  get UseListenerCone() {
    if (!this.V8h) {
      this.V8h = true;
      this.j8h = this.FbDataInternal.useListenerCone();
    }
    return this.j8h;
  }
  get EnableOcclusion() {
    if (!this.NP_) {
      this.NP_ = true;
      this.VP_ = this.FbDataInternal.enableOcclusion();
    }
    return this.VP_;
  }
}
exports.FbPointAkEvent = FbPointAkEvent;
//# sourceMappingURL=FbPointAkEvent.js.map