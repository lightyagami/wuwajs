"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeEntityStateBatchDirectly = undefined;
class FbChangeEntityStateBatchDirectly {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.V1h = false;
    this.j1h = undefined;
    this.Bch = false;
    this.Cbo = undefined;
    this.Gch = false;
    this.Och = false;
  }
  static Create(t) {
    if (t) {
      return new FbChangeEntityStateBatchDirectly(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var i = this.FbDataInternal.entityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get DelayChange() {
    if (!this.Gch) {
      this.Gch = true;
      this.Och = this.FbDataInternal.delayChange();
    }
    return this.Och;
  }
}
exports.FbChangeEntityStateBatchDirectly = FbChangeEntityStateBatchDirectly;
//# sourceMappingURL=FbChangeEntityStateBatchDirectly.js.map