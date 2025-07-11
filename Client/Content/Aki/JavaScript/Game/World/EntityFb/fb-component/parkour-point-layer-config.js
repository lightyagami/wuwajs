"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParkourPointLayerConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ParkourPointLayerConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsParkourPointLayerConfig(t, r) {
    return (r || new ParkourPointLayerConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsParkourPointLayerConfig(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ParkourPointLayerConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  width() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  length() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startParkourPointLayerConfig(t) {
    t.startObject(2);
  }
  static addWidth(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addLength(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static endParkourPointLayerConfig(t) {
    return t.endObject();
  }
  static createParkourPointLayerConfig(t, r, i) {
    ParkourPointLayerConfig.startParkourPointLayerConfig(t);
    ParkourPointLayerConfig.addWidth(t, r);
    ParkourPointLayerConfig.addLength(t, i);
    return ParkourPointLayerConfig.endParkourPointLayerConfig(t);
  }
}
exports.ParkourPointLayerConfig = ParkourPointLayerConfig;
//# sourceMappingURL=parkour-point-layer-config.js.map