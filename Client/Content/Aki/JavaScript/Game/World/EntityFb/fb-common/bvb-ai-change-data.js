"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BvbAiChangeData = void 0;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class BvbAiChangeData {
  constructor() {
    this.bb = void 0, this.bb_pos = 0
  }
  __init(a, t) {
    return this.bb_pos = a, this.bb = t, this
  }
  static getRootAsBvbAiChangeData(a, t) {
    return (t || new BvbAiChangeData).__init(a.readInt32(a.position()) + a.position(), a)
  }
  static getSizePrefixedRootAsBvbAiChangeData(a, t) {
    return a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH), (t || new BvbAiChangeData).__init(a.readInt32(a.position()) + a.position(), a)
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, a) : void 0
  }
  handCardType() {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.readUint8(this.bb_pos + a) : union_var_ref_js_1.UnionVarRef.NONE
  }
  handCard(a) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(a, this.bb_pos + t) : void 0
  }
  static startBvbAiChangeData(a) {
    a.startObject(3)
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0)
  }
  static addHandCardType(a, t) {
    a.addFieldInt8(1, t, union_var_ref_js_1.UnionVarRef.NONE)
  }
  static addHandCard(a, t) {
    a.addFieldOffset(2, t, 0)
  }
  static endBvbAiChangeData(a) {
    return a.endObject()
  }
  static createBvbAiChangeData(a, t, e, i) {
    return BvbAiChangeData.startBvbAiChangeData(a), BvbAiChangeData.addType(a, t), BvbAiChangeData.addHandCardType(a, e), BvbAiChangeData.addHandCard(a, i), BvbAiChangeData.endBvbAiChangeData(a)
  }
}
exports.BvbAiChangeData = BvbAiChangeData;
//# sourceMappingURL=bvb-ai-change-data.js.map