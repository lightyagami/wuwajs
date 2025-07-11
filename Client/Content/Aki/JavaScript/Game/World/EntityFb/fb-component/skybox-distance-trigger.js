"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkyboxDistanceTrigger = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SkyboxDistanceTrigger {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSkyboxDistanceTrigger(t, e) {
    return (e || new SkyboxDistanceTrigger()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSkyboxDistanceTrigger(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SkyboxDistanceTrigger()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  distance() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSkyboxDistanceTrigger(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addDistance(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static endSkyboxDistanceTrigger(t) {
    return t.endObject();
  }
  static createSkyboxDistanceTrigger(t, e, i) {
    SkyboxDistanceTrigger.startSkyboxDistanceTrigger(t);
    SkyboxDistanceTrigger.addType(t, e);
    SkyboxDistanceTrigger.addDistance(t, i);
    return SkyboxDistanceTrigger.endSkyboxDistanceTrigger(t);
  }
}
exports.SkyboxDistanceTrigger = SkyboxDistanceTrigger;
//# sourceMappingURL=skybox-distance-trigger.js.map