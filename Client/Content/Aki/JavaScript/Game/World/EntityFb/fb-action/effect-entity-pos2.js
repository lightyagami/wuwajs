"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectEntityPos2 = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class EffectEntityPos2 {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsEffectEntityPos2(t, s) {
    return (s || new EffectEntityPos2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEffectEntityPos2(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new EffectEntityPos2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  offset(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  attachSocket(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  static startEffectEntityPos2(t) {
    t.startObject(4);
  }
  static addType(t, s) {
    t.addFieldInt8(0, s, 0);
  }
  static addEntityId(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addOffset(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static addAttachSocket(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static endEffectEntityPos2(t) {
    return t.endObject();
  }
}
exports.EffectEntityPos2 = EffectEntityPos2;
//# sourceMappingURL=effect-entity-pos2.js.map