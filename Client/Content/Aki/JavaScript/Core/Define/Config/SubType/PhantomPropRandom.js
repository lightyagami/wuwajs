"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomPropRandom = undefined;
class PhantomPropRandom {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get RandGroupId() {
    return this.randgroupid();
  }
  get RandNum() {
    return this.randnum();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsPhantomPropRandom(t, r) {
    return (r || new PhantomPropRandom()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  randgroupid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  randnum() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomPropRandom = PhantomPropRandom;
//# sourceMappingURL=PhantomPropRandom.js.map