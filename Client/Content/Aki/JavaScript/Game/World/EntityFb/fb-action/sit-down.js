"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SitDown = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SitDown {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsSitDown(t, i) {
    return (i || new SitDown()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSitDown(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new SitDown()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startSitDown(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endSitDown(t) {
    return t.endObject();
  }
  static createSitDown(t, i) {
    SitDown.startSitDown(t);
    SitDown.addType(t, i);
    return SitDown.endSitDown(t);
  }
}
exports.SitDown = SitDown;
//# sourceMappingURL=sit-down.js.map