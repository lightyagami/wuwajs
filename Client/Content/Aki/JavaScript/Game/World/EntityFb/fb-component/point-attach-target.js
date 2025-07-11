"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointAttachTarget = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class PointAttachTarget {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPointAttachTarget(t, e) {
    return (e || new PointAttachTarget()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPointAttachTarget(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PointAttachTarget()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  relativePoint(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startPointAttachTarget(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addRelativePoint(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endPointAttachTarget(t) {
    return t.endObject();
  }
}
exports.PointAttachTarget = PointAttachTarget;
//# sourceMappingURL=point-attach-target.js.map