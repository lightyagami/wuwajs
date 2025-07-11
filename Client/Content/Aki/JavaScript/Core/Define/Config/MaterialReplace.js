"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialReplace = undefined;
class MaterialReplace {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ItemId() {
    return this.itemid();
  }
  get GroupId() {
    return this.groupid();
  }
  get ShowGroupId() {
    return this.showgroupid();
  }
  get SortId() {
    return this.sortid();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsMaterialReplace(t, r) {
    return (r || new MaterialReplace()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showgroupid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MaterialReplace = MaterialReplace;
//# sourceMappingURL=MaterialReplace.js.map