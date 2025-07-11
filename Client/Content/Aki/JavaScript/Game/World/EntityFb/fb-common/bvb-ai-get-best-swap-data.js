"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbAiGetBestSwapData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class BvbAiGetBestSwapData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbAiGetBestSwapData(t, a) {
    return (a || new BvbAiGetBestSwapData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbAiGetBestSwapData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbAiGetBestSwapData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  handCard1StoredType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  handCard1Stored(t) {
    var a = this.bb.__offset(this.bb_pos, 8);
    if (a) {
      return this.bb.__union(t, this.bb_pos + a);
    } else {
      return undefined;
    }
  }
  handCard2StoredType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  handCard2Stored(t) {
    var a = this.bb.__offset(this.bb_pos, 12);
    if (a) {
      return this.bb.__union(t, this.bb_pos + a);
    } else {
      return undefined;
    }
  }
  static startBvbAiGetBestSwapData(t) {
    t.startObject(5);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addHandCard1StoredType(t, a) {
    t.addFieldInt8(1, a, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addHandCard1Stored(t, a) {
    t.addFieldOffset(2, a, 0);
  }
  static addHandCard2StoredType(t, a) {
    t.addFieldInt8(3, a, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addHandCard2Stored(t, a) {
    t.addFieldOffset(4, a, 0);
  }
  static endBvbAiGetBestSwapData(t) {
    return t.endObject();
  }
  static createBvbAiGetBestSwapData(t, a, e, s, i, r) {
    BvbAiGetBestSwapData.startBvbAiGetBestSwapData(t);
    BvbAiGetBestSwapData.addType(t, a);
    BvbAiGetBestSwapData.addHandCard1StoredType(t, e);
    BvbAiGetBestSwapData.addHandCard1Stored(t, s);
    BvbAiGetBestSwapData.addHandCard2StoredType(t, i);
    BvbAiGetBestSwapData.addHandCard2Stored(t, r);
    return BvbAiGetBestSwapData.endBvbAiGetBestSwapData(t);
  }
}
exports.BvbAiGetBestSwapData = BvbAiGetBestSwapData;
//# sourceMappingURL=bvb-ai-get-best-swap-data.js.map