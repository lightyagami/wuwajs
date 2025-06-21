"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BvbAiSwapData = void 0;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class BvbAiSwapData {
  constructor() {
    this.bb = void 0, this.bb_pos = 0
  }
  __init(a, t) {
    return this.bb_pos = a, this.bb = t, this
  }
  static getRootAsBvbAiSwapData(a, t) {
    return (t || new BvbAiSwapData).__init(a.readInt32(a.position()) + a.position(), a)
  }
  static getSizePrefixedRootAsBvbAiSwapData(a, t) {
    return a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH), (t || new BvbAiSwapData).__init(a.readInt32(a.position()) + a.position(), a)
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, a) : void 0
  }
  boardCard1Type() {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.readUint8(this.bb_pos + a) : union_var_ref_js_1.UnionVarRef.NONE
  }
  boardCard1(a) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(a, this.bb_pos + t) : void 0
  }
  boardCard2Type() {
    var a = this.bb.__offset(this.bb_pos, 10);
    return a ? this.bb.readUint8(this.bb_pos + a) : union_var_ref_js_1.UnionVarRef.NONE
  }
  boardCard2(a) {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__union(a, this.bb_pos + t) : void 0
  }
  static startBvbAiSwapData(a) {
    a.startObject(5)
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0)
  }
  static addBoardCard1Type(a, t) {
    a.addFieldInt8(1, t, union_var_ref_js_1.UnionVarRef.NONE)
  }
  static addBoardCard1(a, t) {
    a.addFieldOffset(2, t, 0)
  }
  static addBoardCard2Type(a, t) {
    a.addFieldInt8(3, t, union_var_ref_js_1.UnionVarRef.NONE)
  }
  static addBoardCard2(a, t) {
    a.addFieldOffset(4, t, 0)
  }
  static endBvbAiSwapData(a) {
    return a.endObject()
  }
  static createBvbAiSwapData(a, t, i, r, s, e) {
    return BvbAiSwapData.startBvbAiSwapData(a), BvbAiSwapData.addType(a, t), BvbAiSwapData.addBoardCard1Type(a, i), BvbAiSwapData.addBoardCard1(a, r), BvbAiSwapData.addBoardCard2Type(a, s), BvbAiSwapData.addBoardCard2(a, e), BvbAiSwapData.endBvbAiSwapData(a)
  }
}
exports.BvbAiSwapData = BvbAiSwapData;
//# sourceMappingURL=bvb-ai-swap-data.js.map