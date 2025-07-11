"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPasserbyNpcFixIntervalSpawn = undefined;
class FbPasserbyNpcFixIntervalSpawn {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.DQh = false;
    this.BQh = 0;
    this.qQh = false;
    this.kQh = 0;
    this.W6h = false;
    this.e6o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbPasserbyNpcFixIntervalSpawn(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MaxSpawnCount() {
    if (!this.DQh) {
      this.DQh = true;
      this.BQh = this.FbDataInternal.maxSpawnCount();
    }
    return this.BQh;
  }
  get MinDistance() {
    if (!this.qQh) {
      this.qQh = true;
      this.kQh = this.FbDataInternal.minDistance();
    }
    return this.kQh;
  }
  get Interval() {
    if (!this.W6h) {
      this.W6h = true;
      this.e6o = this.FbDataInternal.interval();
    }
    return this.e6o;
  }
}
exports.FbPasserbyNpcFixIntervalSpawn = FbPasserbyNpcFixIntervalSpawn;
//# sourceMappingURL=FbPasserbyNpcFixIntervalSpawn.js.map