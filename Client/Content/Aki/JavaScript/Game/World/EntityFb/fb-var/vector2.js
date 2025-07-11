"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector2 = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Vector2 {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsVector2(t, e) {
    return (e || new Vector2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsVector2(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new Vector2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  x() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  y() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startVector2(t) {
    t.startObject(2);
  }
  static addX(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static addY(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static endVector2(t) {
    return t.endObject();
  }
  static createVector2(t, e, r) {
    Vector2.startVector2(t);
    Vector2.addX(t, e);
    Vector2.addY(t, r);
    return Vector2.endVector2(t);
  }
}
exports.Vector2 = Vector2;
//# sourceMappingURL=vector2.js.map