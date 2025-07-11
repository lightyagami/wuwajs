"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbAiDiscardData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class BvbAiDiscardData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbAiDiscardData(t, a) {
    return (a || new BvbAiDiscardData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbAiDiscardData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbAiDiscardData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  reserveHandCardType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  reserveHandCard(t) {
    var a = this.bb.__offset(this.bb_pos, 8);
    if (a) {
      return this.bb.__union(t, this.bb_pos + a);
    } else {
      return undefined;
    }
  }
  strategy(t) {
    var a = this.bb.__offset(this.bb_pos, 10);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startBvbAiDiscardData(t) {
    t.startObject(4);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addReserveHandCardType(t, a) {
    t.addFieldInt8(1, a, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addReserveHandCard(t, a) {
    t.addFieldOffset(2, a, 0);
  }
  static addStrategy(t, a) {
    t.addFieldOffset(3, a, 0);
  }
  static endBvbAiDiscardData(t) {
    return t.endObject();
  }
  static createBvbAiDiscardData(t, a, i, r, s) {
    BvbAiDiscardData.startBvbAiDiscardData(t);
    BvbAiDiscardData.addType(t, a);
    BvbAiDiscardData.addReserveHandCardType(t, i);
    BvbAiDiscardData.addReserveHandCard(t, r);
    BvbAiDiscardData.addStrategy(t, s);
    return BvbAiDiscardData.endBvbAiDiscardData(t);
  }
}
exports.BvbAiDiscardData = BvbAiDiscardData;
//# sourceMappingURL=bvb-ai-discard-data.js.map