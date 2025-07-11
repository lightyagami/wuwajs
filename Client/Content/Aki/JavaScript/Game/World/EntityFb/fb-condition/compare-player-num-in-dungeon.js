"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComparePlayerNumInDungeon = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class ComparePlayerNumInDungeon {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsComparePlayerNumInDungeon(e, r) {
    return (r || new ComparePlayerNumInDungeon()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsComparePlayerNumInDungeon(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ComparePlayerNumInDungeon()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, e);
    } else {
      return undefined;
    }
  }
  compareType(e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__string(this.bb_pos + r, e);
    } else {
      return undefined;
    }
  }
  compareValueType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  compareValue(e) {
    var r = this.bb.__offset(this.bb_pos, 10);
    if (r) {
      return this.bb.__union(e, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  static startComparePlayerNumInDungeon(e) {
    e.startObject(4);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addCompareType(e, r) {
    e.addFieldOffset(1, r, 0);
  }
  static addCompareValueType(e, r) {
    e.addFieldInt8(2, r, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addCompareValue(e, r) {
    e.addFieldOffset(3, r, 0);
  }
  static endComparePlayerNumInDungeon(e) {
    return e.endObject();
  }
  static createComparePlayerNumInDungeon(e, r, a, t, n) {
    ComparePlayerNumInDungeon.startComparePlayerNumInDungeon(e);
    ComparePlayerNumInDungeon.addType(e, r);
    ComparePlayerNumInDungeon.addCompareType(e, a);
    ComparePlayerNumInDungeon.addCompareValueType(e, t);
    ComparePlayerNumInDungeon.addCompareValue(e, n);
    return ComparePlayerNumInDungeon.endComparePlayerNumInDungeon(e);
  }
}
exports.ComparePlayerNumInDungeon = ComparePlayerNumInDungeon;
//# sourceMappingURL=compare-player-num-in-dungeon.js.map