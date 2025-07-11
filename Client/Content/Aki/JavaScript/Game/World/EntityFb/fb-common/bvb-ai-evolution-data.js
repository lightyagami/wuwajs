"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbAiEvolutionData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class BvbAiEvolutionData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsBvbAiEvolutionData(t, i) {
    return (i || new BvbAiEvolutionData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbAiEvolutionData(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new BvbAiEvolutionData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  handCardType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  handCard(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  boardCardType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  boardCard(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startBvbAiEvolutionData(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addHandCardType(t, i) {
    t.addFieldInt8(1, i, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addHandCard(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addBoardCardType(t, i) {
    t.addFieldInt8(3, i, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addBoardCard(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endBvbAiEvolutionData(t) {
    return t.endObject();
  }
  static createBvbAiEvolutionData(t, i, a, r, s, o) {
    BvbAiEvolutionData.startBvbAiEvolutionData(t);
    BvbAiEvolutionData.addType(t, i);
    BvbAiEvolutionData.addHandCardType(t, a);
    BvbAiEvolutionData.addHandCard(t, r);
    BvbAiEvolutionData.addBoardCardType(t, s);
    BvbAiEvolutionData.addBoardCard(t, o);
    return BvbAiEvolutionData.endBvbAiEvolutionData(t);
  }
}
exports.BvbAiEvolutionData = BvbAiEvolutionData;
//# sourceMappingURL=bvb-ai-evolution-data.js.map