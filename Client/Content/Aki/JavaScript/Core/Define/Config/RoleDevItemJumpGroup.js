"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevItemJumpGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleDevItemJumpGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ItemId() {
    return this.itemid();
  }
  get ItemType() {
    return this.itemtype();
  }
  get JumpGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(this.jumpgroupLength(), this.jumpgroup, this);
  }
  get SpecialJumpGroup() {
    return this.specialjumpgroup();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRoleDevItemJumpGroup(t, s) {
    return (s || new RoleDevItemJumpGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemtype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetJumpgroupAt(t) {
    return this.jumpgroup(t);
  }
  jumpgroup(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  jumpgroupLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  jumpgroupArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  specialjumpgroup() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RoleDevItemJumpGroup = RoleDevItemJumpGroup;
//# sourceMappingURL=RoleDevItemJumpGroup.js.map