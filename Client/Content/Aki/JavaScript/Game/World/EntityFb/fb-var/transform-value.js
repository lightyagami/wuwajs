"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransformValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const pos_and_rot_js_1 = require("../fb-var/pos-and-rot.js");
class TransformValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, s) {
    this.bb_pos = r;
    this.bb = s;
    return this;
  }
  static getRootAsTransformValue(r, s) {
    return (s || new TransformValue()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsTransformValue(r, s) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new TransformValue()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  v(r) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return (r || new pos_and_rot_js_1.PosAndRot()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startTransformValue(r) {
    r.startObject(1);
  }
  static addV(r, s) {
    r.addFieldOffset(0, s, 0);
  }
  static endTransformValue(r) {
    return r.endObject();
  }
  static createTransformValue(r, s) {
    TransformValue.startTransformValue(r);
    TransformValue.addV(r, s);
    return TransformValue.endTransformValue(r);
  }
}
exports.TransformValue = TransformValue;
//# sourceMappingURL=transform-value.js.map