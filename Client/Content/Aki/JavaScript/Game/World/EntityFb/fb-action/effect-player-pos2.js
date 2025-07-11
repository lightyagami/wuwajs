"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectPlayerPos2 = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class EffectPlayerPos2 {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEffectPlayerPos2(t, e) {
    return (e || new EffectPlayerPos2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEffectPlayerPos2(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EffectPlayerPos2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  offset(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  attachSocket(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startEffectPlayerPos2(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addOffset(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addAttachSocket(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endEffectPlayerPos2(t) {
    return t.endObject();
  }
}
exports.EffectPlayerPos2 = EffectPlayerPos2;
//# sourceMappingURL=effect-player-pos2.js.map