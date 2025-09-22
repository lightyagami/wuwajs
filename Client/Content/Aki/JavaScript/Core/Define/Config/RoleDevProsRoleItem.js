"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevProsRoleItem = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntPair_1 = require("./SubType/IntPair");
class RoleDevProsRoleItem {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ItemGroupId() {
    return this.itemgroupid();
  }
  get ItemTypeId() {
    return this.itemtypeid();
  }
  get ItemGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(this.itemgroupLength(), this.itemgroup, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRoleDevProsRoleItem(t, e) {
    return (e || new RoleDevProsRoleItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  itemgroupid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemtypeid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetItemgroupAt(t, e) {
    return this.itemgroup(t);
  }
  itemgroup(t, e) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return (e || new IntPair_1.IntPair()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  itemgroupLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RoleDevProsRoleItem = RoleDevProsRoleItem;
//# sourceMappingURL=RoleDevProsRoleItem.js.map