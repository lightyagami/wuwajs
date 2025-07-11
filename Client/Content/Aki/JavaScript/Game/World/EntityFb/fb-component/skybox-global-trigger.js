"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkyboxGlobalTrigger = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SkyboxGlobalTrigger {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, t) {
    this.bb_pos = r;
    this.bb = t;
    return this;
  }
  static getRootAsSkyboxGlobalTrigger(r, t) {
    return (t || new SkyboxGlobalTrigger()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsSkyboxGlobalTrigger(r, t) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SkyboxGlobalTrigger()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  type() {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.readUint8(this.bb_pos + r);
    } else {
      return 0;
    }
  }
  static startSkyboxGlobalTrigger(r) {
    r.startObject(1);
  }
  static addType(r, t) {
    r.addFieldInt8(0, t, 0);
  }
  static endSkyboxGlobalTrigger(r) {
    return r.endObject();
  }
  static createSkyboxGlobalTrigger(r, t) {
    SkyboxGlobalTrigger.startSkyboxGlobalTrigger(r);
    SkyboxGlobalTrigger.addType(r, t);
    return SkyboxGlobalTrigger.endSkyboxGlobalTrigger(r);
  }
}
exports.SkyboxGlobalTrigger = SkyboxGlobalTrigger;
//# sourceMappingURL=skybox-global-trigger.js.map