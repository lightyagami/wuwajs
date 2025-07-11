"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpawnChild = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const transform_js_1 = require("../fb-action/transform.js");
class SpawnChild {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsSpawnChild(t, s) {
    return (s || new SpawnChild()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSpawnChild(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new SpawnChild()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  templateGuid(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  transform(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (t || new transform_js_1.Transform()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startSpawnChild(t) {
    t.startObject(2);
  }
  static addTemplateGuid(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addTransform(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endSpawnChild(t) {
    return t.endObject();
  }
}
exports.SpawnChild = SpawnChild;
//# sourceMappingURL=spawn-child.js.map