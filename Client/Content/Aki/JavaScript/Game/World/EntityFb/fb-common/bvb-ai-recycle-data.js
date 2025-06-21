"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BvbAiRecycleData = void 0;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class BvbAiRecycleData {
  constructor() {
    this.bb = void 0, this.bb_pos = 0
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this
  }
  static getRootAsBvbAiRecycleData(t, e) {
    return (e || new BvbAiRecycleData).__init(t.readInt32(t.position()) + t.position(), t)
  }
  static getSizePrefixedRootAsBvbAiRecycleData(t, e) {
    return t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH), (e || new BvbAiRecycleData).__init(t.readInt32(t.position()) + t.position(), t)
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0
  }
  boardCardType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : union_var_ref_js_1.UnionVarRef.NONE
  }
  boardCard(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0
  }
  static startBvbAiRecycleData(t) {
    t.startObject(3)
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0)
  }
  static addBoardCardType(t, e) {
    t.addFieldInt8(1, e, union_var_ref_js_1.UnionVarRef.NONE)
  }
  static addBoardCard(t, e) {
    t.addFieldOffset(2, e, 0)
  }
  static endBvbAiRecycleData(t) {
    return t.endObject()
  }
  static createBvbAiRecycleData(t, e, a, i) {
    return BvbAiRecycleData.startBvbAiRecycleData(t), BvbAiRecycleData.addType(t, e), BvbAiRecycleData.addBoardCardType(t, a), BvbAiRecycleData.addBoardCard(t, i), BvbAiRecycleData.endBvbAiRecycleData(t)
  }
}
exports.BvbAiRecycleData = BvbAiRecycleData;
//# sourceMappingURL=bvb-ai-recycle-data.js.map