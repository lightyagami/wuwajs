"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RollBlockGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RollBlockGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Grids() {
    return GameUtils_1.GameUtils.ConvertToArray(this.gridsLength(), this.grids, this);
  }
  get Description() {
    return this.description();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRollBlockGroup(t, s) {
    return (s || new RollBlockGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetGridsAt(t) {
    return this.grids(t);
  }
  grids(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  gridsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  gridsArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  description(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.RollBlockGroup = RollBlockGroup;
//# sourceMappingURL=RollBlockGroup.js.map