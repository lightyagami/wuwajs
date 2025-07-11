"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestroyAllChild = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DestroyAllChild {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsDestroyAllChild(t, e) {
    return (e || new DestroyAllChild()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDestroyAllChild(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new DestroyAllChild()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startDestroyAllChild(t) {
    t.startObject(0);
  }
  static endDestroyAllChild(t) {
    return t.endObject();
  }
  static createDestroyAllChild(t) {
    DestroyAllChild.startDestroyAllChild(t);
    return DestroyAllChild.endDestroyAllChild(t);
  }
}
exports.DestroyAllChild = DestroyAllChild;
//# sourceMappingURL=destroy-all-child.js.map