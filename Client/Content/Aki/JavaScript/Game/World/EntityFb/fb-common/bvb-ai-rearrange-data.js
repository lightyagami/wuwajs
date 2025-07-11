"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbAiRearrangeData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class BvbAiRearrangeData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(a, r) {
    this.bb_pos = a;
    this.bb = r;
    return this;
  }
  static getRootAsBvbAiRearrangeData(a, r) {
    return (r || new BvbAiRearrangeData()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  static getSizePrefixedRootAsBvbAiRearrangeData(a, r) {
    a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new BvbAiRearrangeData()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  type(a) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, a);
    } else {
      return undefined;
    }
  }
  boardCardType() {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.readUint8(this.bb_pos + a);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  boardCard(a) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return this.bb.__union(a, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  boardPosType() {
    var a = this.bb.__offset(this.bb_pos, 10);
    if (a) {
      return this.bb.readUint8(this.bb_pos + a);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  boardPos(a) {
    var r = this.bb.__offset(this.bb_pos, 12);
    if (r) {
      return this.bb.__union(a, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  static startBvbAiRearrangeData(a) {
    a.startObject(5);
  }
  static addType(a, r) {
    a.addFieldOffset(0, r, 0);
  }
  static addBoardCardType(a, r) {
    a.addFieldInt8(1, r, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addBoardCard(a, r) {
    a.addFieldOffset(2, r, 0);
  }
  static addBoardPosType(a, r) {
    a.addFieldInt8(3, r, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addBoardPos(a, r) {
    a.addFieldOffset(4, r, 0);
  }
  static endBvbAiRearrangeData(a) {
    return a.endObject();
  }
  static createBvbAiRearrangeData(a, r, t, e, i, s) {
    BvbAiRearrangeData.startBvbAiRearrangeData(a);
    BvbAiRearrangeData.addType(a, r);
    BvbAiRearrangeData.addBoardCardType(a, t);
    BvbAiRearrangeData.addBoardCard(a, e);
    BvbAiRearrangeData.addBoardPosType(a, i);
    BvbAiRearrangeData.addBoardPos(a, s);
    return BvbAiRearrangeData.endBvbAiRearrangeData(a);
  }
}
exports.BvbAiRearrangeData = BvbAiRearrangeData;
//# sourceMappingURL=bvb-ai-rearrange-data.js.map