"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeInfo = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TypeInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TypeDescription() {
    return this.typedescription();
  }
  get Lock() {
    return this.lock();
  }
  get Deprecate() {
    return this.deprecate();
  }
  get ShowStock() {
    return this.showstock();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get ItemInfoDisplayType() {
    return this.iteminfodisplaytype();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsTypeInfo(t, s) {
    return (s || new TypeInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  typedescription(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  lock() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  deprecate() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  showstock() {
    var t = this.J7.__offset(this.z7, 12);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  iteminfodisplaytype() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TypeInfo = TypeInfo;
//# sourceMappingURL=TypeInfo.js.map