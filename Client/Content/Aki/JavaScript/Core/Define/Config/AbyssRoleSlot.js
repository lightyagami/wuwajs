"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbyssRoleSlot = undefined;
class AbyssRoleSlot {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SlotType() {
    return this.slottype();
  }
  get Index() {
    return this.index();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsAbyssRoleSlot(t, s) {
    return (s || new AbyssRoleSlot()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  slottype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  index() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.AbyssRoleSlot = AbyssRoleSlot;
//# sourceMappingURL=AbyssRoleSlot.js.map