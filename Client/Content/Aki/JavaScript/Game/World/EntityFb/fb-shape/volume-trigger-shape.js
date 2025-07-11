"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VolumeTriggerShape = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VolumeTriggerShape {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsVolumeTriggerShape(e, r) {
    return (r || new VolumeTriggerShape()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsVolumeTriggerShape(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new VolumeTriggerShape()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, e);
    } else {
      return undefined;
    }
  }
  volumeKey(e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__string(this.bb_pos + r, e);
    } else {
      return undefined;
    }
  }
  static startVolumeTriggerShape(e) {
    e.startObject(2);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addVolumeKey(e, r) {
    e.addFieldOffset(1, r, 0);
  }
  static endVolumeTriggerShape(e) {
    return e.endObject();
  }
  static createVolumeTriggerShape(e, r, t) {
    VolumeTriggerShape.startVolumeTriggerShape(e);
    VolumeTriggerShape.addType(e, r);
    VolumeTriggerShape.addVolumeKey(e, t);
    return VolumeTriggerShape.endVolumeTriggerShape(e);
  }
}
exports.VolumeTriggerShape = VolumeTriggerShape;
//# sourceMappingURL=volume-trigger-shape.js.map