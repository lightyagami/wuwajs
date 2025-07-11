"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomMainProperty = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomMainProperty {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RandGroupId() {
    return this.randgroupid();
  }
  get PropGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(this.propgroupLength(), this.propgroup, this);
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsPhantomMainProperty(t, r) {
    return (r || new PhantomMainProperty()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  randgroupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPropgroupAt(t) {
    return this.propgroup(t);
  }
  propgroup(t) {
    var r = this.J7.__offset(this.z7, 8);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  propgroupLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  propgroupArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.PhantomMainProperty = PhantomMainProperty;
//# sourceMappingURL=PhantomMainProperty.js.map