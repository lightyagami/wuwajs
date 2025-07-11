"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeLiftTarget = undefined;
class FbChangeLiftTarget {
  constructor(t) {
    this.FbDataInternal = t;
    this.tIh = false;
    this.iIh = false;
    this.a_h = false;
    this.I9o = 0;
    this.rIh = false;
    this.oIh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbChangeLiftTarget(t);
    }
  }
  get IsSelf() {
    if (!this.tIh) {
      this.tIh = true;
      this.iIh = this.FbDataInternal.isSelf();
    }
    return this.iIh;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get Location() {
    if (!this.rIh) {
      this.rIh = true;
      this.oIh = this.FbDataInternal.location();
    }
    return this.oIh;
  }
}
exports.FbChangeLiftTarget = FbChangeLiftTarget;
//# sourceMappingURL=FbChangeLiftTarget.js.map