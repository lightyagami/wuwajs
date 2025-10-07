"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomJumpGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleDevPhantomJumpGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get PhantomId() {
    return this.phantomid();
  }
  get PhantomJumpId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.phantomjumpidLength(), this.phantomjumpid, this);
  }
  get PriorityLevel() {
    return this.prioritylevel();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRoleDevPhantomJumpGroup(t, i) {
    return (i || new RoleDevPhantomJumpGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  phantomid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPhantomjumpidAt(t) {
    return this.phantomjumpid(t);
  }
  phantomjumpid(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  phantomjumpidLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantomjumpidArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  prioritylevel() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RoleDevPhantomJumpGroup = RoleDevPhantomJumpGroup;
//# sourceMappingURL=RoleDevPhantomJumpGroup.js.map