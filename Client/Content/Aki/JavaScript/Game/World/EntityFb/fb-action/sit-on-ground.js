"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SitOnGround = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SitOnGround {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsSitOnGround(t, r) {
    return (r || new SitOnGround()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSitOnGround(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new SitOnGround()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  static startSitOnGround(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endSitOnGround(t) {
    return t.endObject();
  }
  static createSitOnGround(t, r) {
    SitOnGround.startSitOnGround(t);
    SitOnGround.addType(t, r);
    return SitOnGround.endSitOnGround(t);
  }
}
exports.SitOnGround = SitOnGround;
//# sourceMappingURL=sit-on-ground.js.map