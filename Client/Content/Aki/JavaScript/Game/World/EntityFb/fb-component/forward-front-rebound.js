"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForwardFrontRebound = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class ForwardFrontRebound {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsForwardFrontRebound(t, r) {
    return (r || new ForwardFrontRebound()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsForwardFrontRebound(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ForwardFrontRebound()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  reboundPoint(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + r), this.bb);
    } else {
      return undefined;
    }
  }
  static startForwardFrontRebound(t) {
    t.startObject(2);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addReboundPoint(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static endForwardFrontRebound(t) {
    return t.endObject();
  }
}
exports.ForwardFrontRebound = ForwardFrontRebound;
//# sourceMappingURL=forward-front-rebound.js.map