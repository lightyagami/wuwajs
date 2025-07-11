"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PhotographConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsPhotographConfig(t, o) {
    return (o || new PhotographConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPhotographConfig(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new PhotographConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  photoTargets(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + o) + t * 4);
    } else {
      return 0;
    }
  }
  photoTargetsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  photoTargetsArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startPhotographConfig(t) {
    t.startObject(1);
  }
  static addPhotoTargets(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static createPhotoTargetsVector(o, r) {
    o.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      o.addInt32(r[t]);
    }
    return o.endVector();
  }
  static startPhotoTargetsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static endPhotographConfig(t) {
    return t.endObject();
  }
  static createPhotographConfig(t, o) {
    PhotographConfig.startPhotographConfig(t);
    PhotographConfig.addPhotoTargets(t, o);
    return PhotographConfig.endPhotographConfig(t);
  }
}
exports.PhotographConfig = PhotographConfig;
//# sourceMappingURL=photograph-config.js.map