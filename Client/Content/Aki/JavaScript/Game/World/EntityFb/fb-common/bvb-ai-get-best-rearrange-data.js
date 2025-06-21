"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BvbAiGetBestRearrangeData = void 0;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class BvbAiGetBestRearrangeData {
  constructor() {
    this.bb = void 0, this.bb_pos = 0
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this
  }
  static getRootAsBvbAiGetBestRearrangeData(t, e) {
    return (e || new BvbAiGetBestRearrangeData).__init(t.readInt32(t.position()) + t.position(), t)
  }
  static getSizePrefixedRootAsBvbAiGetBestRearrangeData(t, e) {
    return t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH), (e || new BvbAiGetBestRearrangeData).__init(t.readInt32(t.position()) + t.position(), t)
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0
  }
  handCardStoredType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : union_var_ref_js_1.UnionVarRef.NONE
  }
  handCardStored(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0
  }
  boardPosStoredType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readUint8(this.bb_pos + t) : union_var_ref_js_1.UnionVarRef.NONE
  }
  boardPosStored(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0
  }
  static startBvbAiGetBestRearrangeData(t) {
    t.startObject(5)
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0)
  }
  static addHandCardStoredType(t, e) {
    t.addFieldInt8(1, e, union_var_ref_js_1.UnionVarRef.NONE)
  }
  static addHandCardStored(t, e) {
    t.addFieldOffset(2, e, 0)
  }
  static addBoardPosStoredType(t, e) {
    t.addFieldInt8(3, e, union_var_ref_js_1.UnionVarRef.NONE)
  }
  static addBoardPosStored(t, e) {
    t.addFieldOffset(4, e, 0)
  }
  static endBvbAiGetBestRearrangeData(t) {
    return t.endObject()
  }
  static createBvbAiGetBestRearrangeData(t, e, a, r, s, i) {
    return BvbAiGetBestRearrangeData.startBvbAiGetBestRearrangeData(t), BvbAiGetBestRearrangeData.addType(t, e), BvbAiGetBestRearrangeData.addHandCardStoredType(t, a), BvbAiGetBestRearrangeData.addHandCardStored(t, r), BvbAiGetBestRearrangeData.addBoardPosStoredType(t, s), BvbAiGetBestRearrangeData.addBoardPosStored(t, i), BvbAiGetBestRearrangeData.endBvbAiGetBestRearrangeData(t)
  }
}
exports.BvbAiGetBestRearrangeData = BvbAiGetBestRearrangeData;
//# sourceMappingURL=bvb-ai-get-best-rearrange-data.js.map