"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbAiRecycleData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class BvbAiRecycleData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsBvbAiRecycleData(t, e) {
    return (e || new BvbAiRecycleData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbAiRecycleData(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new BvbAiRecycleData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  boardCardType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  boardCard(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startBvbAiRecycleData(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBoardCardType(t, e) {
    t.addFieldInt8(1, e, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addBoardCard(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endBvbAiRecycleData(t) {
    return t.endObject();
  }
  static createBvbAiRecycleData(t, e, a, i) {
    BvbAiRecycleData.startBvbAiRecycleData(t);
    BvbAiRecycleData.addType(t, e);
    BvbAiRecycleData.addBoardCardType(t, a);
    BvbAiRecycleData.addBoardCard(t, i);
    return BvbAiRecycleData.endBvbAiRecycleData(t);
  }
}
exports.BvbAiRecycleData = BvbAiRecycleData;
//# sourceMappingURL=bvb-ai-recycle-data.js.map