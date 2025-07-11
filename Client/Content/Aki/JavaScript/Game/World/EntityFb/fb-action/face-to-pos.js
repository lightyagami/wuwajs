"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FaceToPos = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class FaceToPos {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsFaceToPos(t, s) {
    return (s || new FaceToPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFaceToPos(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new FaceToPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  pos(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startFaceToPos(t) {
    t.startObject(1);
  }
  static addPos(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static endFaceToPos(t) {
    return t.endObject();
  }
  static createFaceToPos(t, s) {
    FaceToPos.startFaceToPos(t);
    FaceToPos.addPos(t, s);
    return FaceToPos.endFaceToPos(t);
  }
}
exports.FaceToPos = FaceToPos;
//# sourceMappingURL=face-to-pos.js.map