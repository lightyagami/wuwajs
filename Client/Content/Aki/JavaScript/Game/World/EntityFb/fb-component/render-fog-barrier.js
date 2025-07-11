"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderFogBarrier = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class RenderFogBarrier {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsRenderFogBarrier(t, e) {
    return (e || new RenderFogBarrier()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRenderFogBarrier(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new RenderFogBarrier()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  centerTargetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  centerTarget(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  center(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  size(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  rotator(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startRenderFogBarrier(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCenterTargetType(t, e) {
    t.addFieldInt8(1, e, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addCenterTarget(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addCenter(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addSize(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addRotator(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static endRenderFogBarrier(t) {
    return t.endObject();
  }
}
exports.RenderFogBarrier = RenderFogBarrier;
//# sourceMappingURL=render-fog-barrier.js.map